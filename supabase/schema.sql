-- Supabase schema for the AI Career Assistant (pgvector RAG store).
-- Run this in the Supabase SQL editor.

-- 1. Enable pgvector.
create extension if not exists vector;

-- 2. Documents table. Embedding dim 1536 matches text-embedding-3-small.
create table if not exists documents (
  id text primary key,
  source text not null,
  title text not null,
  content text not null,
  embedding vector(1536),
  created_at timestamptz default now()
);

-- 3. Similarity search function (cosine distance).
create or replace function match_documents (
  query_embedding vector(1536),
  match_count int default 6
)
returns table (
  id text,
  source text,
  title text,
  content text,
  similarity float
)
language sql stable
as $$
  select
    documents.id,
    documents.source,
    documents.title,
    documents.content,
    1 - (documents.embedding <=> query_embedding) as similarity
  from documents
  where documents.embedding is not null
  order by documents.embedding <=> query_embedding
  limit match_count;
$$;

-- 4. (Optional) approximate index for larger corpora.
-- create index on documents using ivfflat (embedding vector_cosine_ops) with (lists = 100);

-- 5. Row Level Security: keep it locked. The server uses the service role key,
--    which bypasses RLS. No anon access is needed.
alter table documents enable row level security;
