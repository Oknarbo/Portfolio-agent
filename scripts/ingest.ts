/**
 * Build embeddings for the assistant.
 *
 * Usage:  npm run ingest
 *
 * - Reads the structured profile (src/data/profile.ts)
 * - Splits it into retrievable chunks
 * - Creates embeddings (local on-device model by default; no API key needed)
 * - Writes a local fallback cache (src/data/embeddings.local.json)
 * - If Supabase env vars are present, also upserts into the `documents` table
 *
 * Run this every time you edit profile.ts (or change the embedding provider).
 */
import { config as loadEnv } from "dotenv";
loadEnv({ path: ".env.local" });
loadEnv(); // also allow plain .env

import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { buildDocuments } from "../src/lib/documents";
import { embedMany } from "../src/lib/embeddings";
import { config } from "../src/lib/config";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

async function main() {
  const docs = buildDocuments();
  console.log(`• Built ${docs.length} document chunks from profile.`);
  console.log(
    `• Embedding provider: ${config.embeddingProvider}` +
      (config.embeddingProvider === "local"
        ? ` (${config.localEmbeddingModel}, first run downloads the model)`
        : ` (${config.openaiEmbeddingModel})`)
  );

  const embeddings = await embedMany(docs.map((d) => d.content));
  console.log(
    `• Created ${embeddings.length} embeddings (dim ${embeddings[0]?.length}).`
  );

  const records = docs.map((d, i) => ({ ...d, embedding: embeddings[i] }));

  const outPath = resolve("src/data/embeddings.local.json");
  writeFileSync(outPath, JSON.stringify(records, null, 2));
  console.log(`• Wrote local cache → ${outPath}`);

  if (SUPABASE_URL && SUPABASE_KEY) {
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: { persistSession: false },
    });
    const del = await supabase.from("documents").delete().neq("id", "");
    if (del.error) {
      console.error("✗ Supabase delete failed:", del.error.message);
      process.exit(1);
    }
    const { error } = await supabase.from("documents").insert(
      records.map((r) => ({
        id: r.id,
        source: r.source,
        title: r.title,
        content: r.content,
        embedding: r.embedding,
      }))
    );
    if (error) {
      console.error("✗ Supabase insert failed:", error.message);
      console.error(
        "  (Make sure the `documents.embedding` vector dimension matches " +
          `${embeddings[0]?.length}.)`
      );
      process.exit(1);
    }
    console.log(`• Upserted ${records.length} rows into Supabase.documents.`);
  } else {
    console.log("• Supabase not configured — using local cache.");
  }

  console.log("✓ Ingest complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
