# AI Career Portfolio

A production-quality, Apple-inspired personal portfolio with an **AI Career Assistant** — a retrieval-augmented (RAG) system that answers recruiter questions and evaluates role fit, grounded strictly in your real profile data.

## Features

- **Minimal Apple-style UI** — large typography, whitespace, calm colors.
- **Structured pages** — landing, projects (Problem → Solution → Impact), about (career timeline).
- **AI Career Assistant** — RAG over your CV, projects, GitHub, and about data.
  - Answers **only** from retrieved context; never invents experience.
  - **Job Fit mode** — paste a job description to get a fit score, experience mapping, gaps, and interview positioning.
- **Single source of truth** — everything lives in `src/data/profile.ts`.
- **Works without a database** — uses a local embeddings cache; optionally upgrades to Supabase + pgvector.

## Tech stack

Next.js (App Router) · TypeScript · Tailwind CSS · OpenAI (embeddings + chat) · Supabase (Postgres + pgvector, optional).

## Quick start

```bash
# 1. Install
npm install

# 2. Configure environment
cp .env.example .env.local      # then edit it (at minimum: OPENAI_API_KEY)

# 3. Add your data
#    Edit src/data/profile.ts with your real CV, projects, skills, GitHub.

# 4. Build the assistant's knowledge (embeddings)
npm run ingest

# 5. Run
npm run dev                     # http://localhost:3000
```

## Editing your content

All content comes from **`src/data/profile.ts`**:

- `identity` — name, title, one-line positioning, contact links
- `summary` — longer professional summary
- `timeline` — career history (role, company, highlights, stack)
- `projects` — case studies (problem / solution / impact)
- `skills`, `github`, `education`, `languages`

After any edit, re-run `npm run ingest` so the assistant learns the changes.

## Using Supabase (optional)

By default the assistant uses a local embeddings cache (`src/data/embeddings.local.json`). To use Supabase + pgvector:

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the SQL editor.
3. Add `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` to `.env.local`.
4. Run `npm run ingest` again (it will push embeddings to the DB).

## Cost & abuse protection

The `OPENAI_API_KEY` is **server-side only** — it is never sent to the browser, so visitors cannot read or steal it. The real risk is abuse of the public `/api/chat` endpoint (running up token usage). Built-in protections:

- **Groq for chat** — set `GROQ_API_KEY` to run chat completions on Groq (fast + cheap). OpenAI is then used only for embeddings (a negligible per-query cost).
- **Per-IP rate limit** + **global daily cap** (`RATE_LIMIT_MAX`, `DAILY_GLOBAL_CAP`).
- **Input/output caps** — `MAX_INPUT_CHARS`, `MAX_HISTORY_MESSAGES`, `MAX_OUTPUT_TOKENS`.
- **Recommended:** set a hard monthly **usage limit** in the OpenAI dashboard as a final safety net.

> The rate limiter is in-memory (per server instance). For strict, persistent limits across serverless instances, swap `src/lib/ratelimit.ts` for Upstash Redis.

## How the RAG pipeline works

1. The user's question is embedded with OpenAI.
2. A vector similarity search retrieves the top relevant profile chunks (Supabase pgvector, or local cosine search).
3. The LLM answers **only** from those chunks, following strict grounding rules.
4. If the answer isn't in the data, it replies: _"This information is not available in the profile data."_

## Deploy

Deploy to Vercel. Set the environment variables in the project settings. The local embeddings cache is committed, so the assistant works even without Supabase.

## License

MIT
