import { NextRequest } from "next/server";
import { retrieve } from "@/lib/rag";
import { qaSystemPrompt, jobFitSystemPrompt } from "@/lib/prompts";
import { config, resolveChatProvider } from "@/lib/config";
import { streamChat, ChatMessage } from "@/lib/chat";
import { checkRateLimit, getClientIp } from "@/lib/ratelimit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Body = { messages: ChatMessage[]; mode?: "qa" | "jobfit" };

export async function POST(req: NextRequest) {
  if (!resolveChatProvider()) {
    return Response.json(
      {
        error:
          "The assistant is not configured yet. Add ANTHROPIC_API_KEY (Claude), GROQ_API_KEY, or OPENAI_API_KEY to .env.local, then run `npm run ingest`.",
      },
      { status: 503 }
    );
  }

  // ── Abuse / cost protection: per-IP + global daily rate limit ──────
  const ip = getClientIp(req);
  const rl = checkRateLimit(ip);
  if (!rl.ok) {
    const msg =
      rl.reason === "daily"
        ? "The assistant has reached today's usage limit. Please try again tomorrow."
        : "Too many requests. Please wait a moment before asking again.";
    return Response.json(
      { error: msg },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } }
    );
  }

  let body: Body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const allMessages = (body.messages ?? []).slice(-config.maxHistoryMessages);
  const mode = body.mode === "jobfit" ? "jobfit" : "qa";
  const lastUser = [...allMessages].reverse().find((m) => m.role === "user");

  if (!lastUser?.content?.trim()) {
    return Response.json({ error: "No user message provided." }, { status: 400 });
  }

  const messages: ChatMessage[] = allMessages.map((m) => ({
    role: m.role,
    content: m.content.slice(0, config.maxInputChars),
  }));
  const query = lastUser.content.slice(0, config.maxInputChars);

  let chunks;
  try {
    chunks = await retrieve(query);
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : "Retrieval failed." },
      { status: 500 }
    );
  }

  const systemPrompt =
    mode === "jobfit" ? jobFitSystemPrompt(chunks) : qaSystemPrompt(chunks);

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const delta of streamChat({ system: systemPrompt, messages })) {
          controller.enqueue(encoder.encode(delta));
        }
      } catch (err) {
        controller.enqueue(
          encoder.encode(
            `\n\n[stream error: ${err instanceof Error ? err.message : "unknown"}]`
          )
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}
