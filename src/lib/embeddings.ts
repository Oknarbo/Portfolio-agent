import { config } from "./config";

/**
 * Provider-agnostic embeddings.
 *
 * Default ("local") runs a small sentence-transformer on-device via
 * @xenova/transformers — no API key, no cost. Set EMBEDDING_PROVIDER=openai
 * to use OpenAI instead.
 *
 * The corpus and the query MUST be embedded with the same provider/model,
 * so re-run `npm run ingest` after changing this setting.
 */

// ── Local (Transformers.js) ──────────────────────────────────────────
type FeatureExtractor = (
  text: string,
  opts: { pooling: "mean"; normalize: boolean }
) => Promise<{ data: Float32Array | number[] }>;

let extractorPromise: Promise<FeatureExtractor> | null = null;

async function getLocalExtractor(): Promise<FeatureExtractor> {
  if (!extractorPromise) {
    extractorPromise = (async () => {
      // Optional dependency — only installed when EMBEDDING_PROVIDER=local.
      // webpackIgnore keeps the bundler from resolving it at build time when it
      // isn't installed; it's loaded natively at runtime only in local mode.
      // @ts-expect-error no types unless @xenova/transformers is installed
      const { pipeline, env } = await import(/* webpackIgnore: true */ "@xenova/transformers");
      // Allow downloading the model from the Hugging Face hub on first run,
      // then cache it locally.
      env.allowLocalModels = true;
      const pipe = await pipeline(
        "feature-extraction",
        config.localEmbeddingModel
      );
      return pipe as unknown as FeatureExtractor;
    })();
  }
  return extractorPromise;
}

async function embedLocal(text: string): Promise<number[]> {
  const extractor = await getLocalExtractor();
  const output = await extractor(text.replace(/\n/g, " "), {
    pooling: "mean",
    normalize: true,
  });
  return Array.from(output.data as ArrayLike<number>);
}

// ── OpenAI (optional) ────────────────────────────────────────────────
async function embedOpenAI(texts: string[]): Promise<number[][]> {
  const { getOpenAI } = await import("./openai");
  const openai = getOpenAI();
  const res = await openai.embeddings.create({
    model: config.openaiEmbeddingModel,
    input: texts.map((t) => t.replace(/\n/g, " ")),
  });
  return res.data.map((d) => d.embedding);
}

// ── Public API ───────────────────────────────────────────────────────
export async function embed(text: string): Promise<number[]> {
  if (config.embeddingProvider === "openai") {
    const [v] = await embedOpenAI([text]);
    return v;
  }
  return embedLocal(text);
}

export async function embedMany(texts: string[]): Promise<number[][]> {
  if (config.embeddingProvider === "openai") {
    return embedOpenAI(texts);
  }
  const out: number[][] = [];
  for (const t of texts) out.push(await embedLocal(t));
  return out;
}
