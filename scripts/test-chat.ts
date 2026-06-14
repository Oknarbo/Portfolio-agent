import { config as loadEnv } from "dotenv";
// override:true so .env.local beats any stale machine-level env vars.
loadEnv({ path: ".env.local", override: true });
loadEnv({ override: true });

async function ask(
  label: string,
  mode: "qa" | "jobfit",
  q: string,
  deps: Awaited<ReturnType<typeof load>>
) {
  const { retrieve, qaSystemPrompt, jobFitSystemPrompt, streamChat } = deps;
  const chunks = await retrieve(q);
  const system =
    mode === "jobfit" ? jobFitSystemPrompt(chunks) : qaSystemPrompt(chunks);
  process.stdout.write(`\n=== ${label} ===\n`);
  for await (const delta of streamChat({
    system,
    messages: [{ role: "user", content: q }],
  })) {
    process.stdout.write(delta);
  }
  process.stdout.write("\n");
}

async function load() {
  const { retrieve } = await import("../src/lib/rag");
  const { qaSystemPrompt, jobFitSystemPrompt } = await import("../src/lib/prompts");
  const { streamChat } = await import("../src/lib/chat");
  const { resolveChatProvider, config } = await import("../src/lib/config");
  return { retrieve, qaSystemPrompt, jobFitSystemPrompt, streamChat, resolveChatProvider, config };
}

async function main() {
  const deps = await load();
  console.log(
    "Chat provider:",
    deps.resolveChatProvider(),
    "| model:",
    deps.config.anthropicModel
  );
  await ask("Q&A", "qa", "What is Profesor Abelton and which AI models does it use?", deps);
  await ask(
    "JOB FIT",
    "jobfit",
    "Job: Senior AI Engineer building RAG and agent systems in Python and TypeScript, integrating LLM APIs. Remote.",
    deps
  );
  console.log("\n--- done ---");
}

main().catch((e) => {
  console.error("ERROR:", e?.message || e);
  process.exit(1);
});
