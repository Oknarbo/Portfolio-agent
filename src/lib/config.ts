export const config = {
  // ── Embeddings ──────────────────────────────────────────────────
  // "none"   -> no vectors; pass the full (small) profile as context
  // "local"  -> free on-device model (requires @xenova/transformers)
  // "openai" -> OpenAI embeddings (requires OPENAI_API_KEY)
  embeddingProvider: (process.env.EMBEDDING_PROVIDER ?? "none") as
    | "none"
    | "local"
    | "openai",
  localEmbeddingModel:
    process.env.LOCAL_EMBEDDING_MODEL ?? "Xenova/all-MiniLM-L6-v2",
  openaiApiKey: process.env.OPENAI_API_KEY ?? "",
  openaiEmbeddingModel:
    process.env.OPENAI_EMBEDDING_MODEL ?? "text-embedding-3-small",

  // ── Chat completions ────────────────────────────────────────────
  // Provider priority when CHAT_PROVIDER=auto: anthropic > groq > openai.
  chatProviderSetting: (process.env.CHAT_PROVIDER ?? "auto") as
    | "auto"
    | "anthropic"
    | "groq"
    | "openai",
  anthropicApiKey: process.env.ANTHROPIC_API_KEY ?? "",
  anthropicModel: process.env.ANTHROPIC_MODEL ?? "claude-haiku-4-5",
  groqApiKey: process.env.GROQ_API_KEY ?? "",
  groqModel: process.env.GROQ_MODEL ?? "llama-3.3-70b-versatile",
  openaiChatModel: process.env.OPENAI_CHAT_MODEL ?? "gpt-4o-mini",

  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",

  // How many context chunks to retrieve per query.
  topK: 6,

  // ── Abuse / cost protection ─────────────────────────────────────
  maxOutputTokens: Number(process.env.MAX_OUTPUT_TOKENS ?? 3000),
  maxInputChars: Number(process.env.MAX_INPUT_CHARS ?? 6000),
  maxHistoryMessages: Number(process.env.MAX_HISTORY_MESSAGES ?? 12),
  rateLimitWindowMs: Number(process.env.RATE_LIMIT_WINDOW_MS ?? 10 * 60 * 1000),
  rateLimitMax: Number(process.env.RATE_LIMIT_MAX ?? 8),
  dailyGlobalCap: Number(process.env.DAILY_GLOBAL_CAP ?? 300),
};

export const hasOpenAI = () => Boolean(config.openaiApiKey);
export const hasGroq = () => Boolean(config.groqApiKey);
export const hasAnthropic = () => Boolean(config.anthropicApiKey);
export const hasSupabase = () =>
  Boolean(config.supabaseUrl && config.supabaseServiceKey);

export type ChatProvider = "anthropic" | "groq" | "openai";

/** Resolve which chat provider to use based on settings + available keys. */
export function resolveChatProvider(): ChatProvider | null {
  const s = config.chatProviderSetting;
  if (s === "anthropic") return hasAnthropic() ? "anthropic" : null;
  if (s === "groq") return hasGroq() ? "groq" : null;
  if (s === "openai") return hasOpenAI() ? "openai" : null;
  // auto
  if (hasAnthropic()) return "anthropic";
  if (hasGroq()) return "groq";
  if (hasOpenAI()) return "openai";
  return null;
}
