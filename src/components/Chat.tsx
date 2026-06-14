"use client";

import { useRef, useState, useEffect } from "react";
import { Markdown } from "./Markdown";

type Message = { role: "user" | "assistant"; content: string };
type Mode = "qa" | "jobfit";

const SUGGESTIONS = [
  "Tell me about Profesor Abelton and how it works.",
  "What is the candidate's experience with agentic AI and MCP?",
  "How did he transition from journalism into AI engineering?",
  "What kind of roles is this candidate a good fit for?",
];

export function Chat() {
  const [mode, setMode] = useState<Mode>("qa");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || loading) return;

    const next: Message[] = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setLoading(true);
    setMessages((m) => [...m, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, mode }),
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Request failed (${res.status}).`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", content: acc };
          return copy;
        });
      }
    } catch (err) {
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = {
          role: "assistant",
          content: `⚠️ ${err instanceof Error ? err.message : "Something went wrong."}`,
        };
        return copy;
      });
    } finally {
      setLoading(false);
    }
  }

  const empty = messages.length === 0;

  return (
    <div className="flex h-[72vh] min-h-[520px] flex-col overflow-hidden rounded-3xl border border-[var(--color-hairline)]/70 bg-[var(--color-surface)] shadow-[0_8px_40px_rgba(0,0,0,0.05)]">
      {/* Mode toggle */}
      <div className="flex items-center gap-1 border-b border-[var(--color-hairline)]/60 p-3">
        <ModeButton active={mode === "qa"} onClick={() => setMode("qa")}>
          Ask
        </ModeButton>
        <ModeButton active={mode === "jobfit"} onClick={() => setMode("jobfit")}>
          Job Fit
        </ModeButton>
        <span className="ml-auto pr-2 text-[12px] text-[var(--color-subtle)]">
          {mode === "jobfit"
            ? "Paste a job description for a fit analysis"
            : "Grounded in real profile data"}
        </span>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 space-y-5 overflow-y-auto p-5 sm:p-6">
        {empty ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <h2 className="text-2xl font-semibold tracking-tight">
              {mode === "jobfit"
                ? "Paste a job description"
                : "Ask anything about my experience"}
            </h2>
            <p className="mt-2 max-w-md text-[15px] text-[var(--color-subtle)]">
              {mode === "jobfit"
                ? "I'll evaluate fit, map relevant experience, flag gaps, and suggest interview positioning — strictly from profile data."
                : "Answers are grounded in real profile data. If something isn't in the profile, I'll say so."}
            </p>
            {mode === "qa" && (
              <div className="mt-7 grid w-full max-w-lg gap-2 sm:grid-cols-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-2xl border border-[var(--color-hairline)]/70 bg-[var(--color-canvas)] px-4 py-3 text-left text-[14px] text-[var(--color-ink)] transition-colors hover:border-[var(--color-accent)]/40"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          messages.map((m, i) => <Bubble key={i} message={m} />)
        )}
        {loading &&
          messages[messages.length - 1]?.content === "" && (
            <div className="flex gap-1.5 pl-1">
              <Dot /> <Dot delay="0.15s" /> <Dot delay="0.3s" />
            </div>
          )}
      </div>

      {/* Composer */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="border-t border-[var(--color-hairline)]/60 p-3"
      >
        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(input);
              }
            }}
            rows={mode === "jobfit" ? 3 : 1}
            placeholder={
              mode === "jobfit"
                ? "Paste the full job description here…"
                : "Ask about experience, projects, or role fit…"
            }
            className="max-h-40 flex-1 resize-none rounded-2xl bg-[var(--color-canvas)] px-4 py-2.5 text-[15px] outline-none ring-1 ring-inset ring-[var(--color-hairline)]/70 focus:ring-[var(--color-accent)]/50"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="rounded-full bg-[var(--color-accent)] px-4 py-2.5 text-[15px] font-medium text-white transition-all hover:bg-[var(--color-accent-hover)] active:scale-[0.98] disabled:opacity-40"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

function ModeButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-1.5 text-[14px] font-medium transition-colors ${
        active
          ? "bg-[var(--color-ink)] text-white"
          : "text-[var(--color-subtle)] hover:text-[var(--color-ink)]"
      }`}
    >
      {children}
    </button>
  );
}

function Bubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-3xl px-4 py-3 ${
          isUser
            ? "bg-[var(--color-accent)] text-white"
            : "bg-[var(--color-canvas)] text-[var(--color-ink)] ring-1 ring-inset ring-[var(--color-hairline)]/60"
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap text-[15px]">{message.content}</p>
        ) : (
          <Markdown content={message.content} />
        )}
      </div>
    </div>
  );
}

function Dot({ delay = "0s" }: { delay?: string }) {
  return (
    <span
      className="h-2 w-2 animate-bounce rounded-full bg-[var(--color-subtle)]"
      style={{ animationDelay: delay }}
    />
  );
}
