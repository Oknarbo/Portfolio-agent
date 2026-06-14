import OpenAI from "openai";
import { config, resolveChatProvider, ChatProvider } from "./config";

export type ChatMessage = { role: "user" | "assistant"; content: string };

/**
 * Stream a grounded chat completion as plain text deltas, regardless of the
 * underlying provider (Anthropic / Groq / OpenAI).
 *
 * Anthropic is called via plain fetch (no SDK dependency); Groq/OpenAI use the
 * OpenAI-compatible client.
 */
export async function* streamChat(args: {
  system: string;
  messages: ChatMessage[];
}): AsyncGenerator<string> {
  const provider: ChatProvider | null = resolveChatProvider();
  if (!provider) {
    throw new Error(
      "No chat provider configured. Set ANTHROPIC_API_KEY (Claude), GROQ_API_KEY, or OPENAI_API_KEY."
    );
  }

  if (provider === "anthropic") {
    yield* streamAnthropic(args);
    return;
  }

  // OpenAI-compatible path (Groq or OpenAI).
  const model = provider === "groq" ? config.groqModel : config.openaiChatModel;
  const apiKey = provider === "groq" ? config.groqApiKey : config.openaiApiKey;
  const baseURL =
    provider === "groq" ? "https://api.groq.com/openai/v1" : undefined;

  const client = new OpenAI({ apiKey, baseURL });
  const completion = await client.chat.completions.create({
    model,
    temperature: 0.2,
    max_tokens: config.maxOutputTokens,
    stream: true,
    messages: [{ role: "system", content: args.system }, ...args.messages],
  });
  for await (const part of completion) {
    const delta = part.choices[0]?.delta?.content;
    if (delta) yield delta;
  }
}

/** Anthropic Messages API streaming via SSE (no SDK needed). */
async function* streamAnthropic(args: {
  system: string;
  messages: ChatMessage[];
}): AsyncGenerator<string> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": config.anthropicApiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: config.anthropicModel,
      max_tokens: config.maxOutputTokens,
      temperature: 0.2,
      system: args.system,
      messages: args.messages.map((m) => ({ role: m.role, content: m.content })),
      stream: true,
    }),
  });

  if (!res.ok || !res.body) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Anthropic request failed (${res.status}). ${detail}`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    // SSE events are separated by a blank line.
    const events = buffer.split("\n\n");
    buffer = events.pop() ?? "";

    for (const evt of events) {
      const dataLine = evt
        .split("\n")
        .find((l) => l.startsWith("data:"));
      if (!dataLine) continue;
      const json = dataLine.slice(5).trim();
      if (!json || json === "[DONE]") continue;
      try {
        const parsed = JSON.parse(json);
        if (
          parsed.type === "content_block_delta" &&
          parsed.delta?.type === "text_delta"
        ) {
          yield parsed.delta.text as string;
        }
      } catch {
        // ignore keep-alive / non-JSON lines
      }
    }
  }
}
