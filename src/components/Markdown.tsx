import { Fragment, ReactNode } from "react";

/**
 * Minimal, dependency-free Markdown renderer for assistant output.
 * Supports: ## / ### headings, "- " / "* " bullet lists, "1." ordered lists,
 * GFM pipe tables, --- horizontal rules, **bold**, `code`, and [links](url).
 */
function renderInline(text: string): ReactNode[] {
  // Split on bold, inline code, and markdown links while keeping delimiters.
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={i}
          className="rounded bg-[var(--color-canvas)] px-1.5 py-0.5 text-[13px] ring-1 ring-inset ring-[var(--color-hairline)]/60"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      return (
        <a
          key={i}
          href={link[2]}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-[var(--color-accent)] hover:underline"
        >
          {link[1]}
        </a>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

function splitRow(line: string): string[] {
  return line
    .trim()
    .replace(/^\||\|$/g, "")
    .split("|")
    .map((c) => c.trim());
}

const isTableSeparator = (line: string) =>
  /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)+\|?\s*$/.test(line);

const isHorizontalRule = (line: string) => /^\s*-{3,}\s*$/.test(line);

export function Markdown({ content }: { content: string }) {
  const lines = content.split("\n");
  const blocks: ReactNode[] = [];
  let list: string[] = [];
  let ordered = false;

  const flushList = (key: number) => {
    if (!list.length) return;
    const items = list.map((item, i) => <li key={i}>{renderInline(item)}</li>);
    blocks.push(
      ordered ? (
        <ol key={`ol-${key}`} className="my-2 list-decimal space-y-1 pl-5">
          {items}
        </ol>
      ) : (
        <ul key={`ul-${key}`} className="my-2 list-disc space-y-1 pl-5">
          {items}
        </ul>
      )
    );
    list = [];
  };

  for (let idx = 0; idx < lines.length; idx++) {
    const line = lines[idx];

    // ── Table ──────────────────────────────────────────────────────
    if (
      line.includes("|") &&
      idx + 1 < lines.length &&
      isTableSeparator(lines[idx + 1])
    ) {
      flushList(idx);
      const header = splitRow(line);
      const rows: string[][] = [];
      let j = idx + 2;
      while (j < lines.length && lines[j].includes("|")) {
        rows.push(splitRow(lines[j]));
        j++;
      }
      blocks.push(
        <div key={`tbl-${idx}`} className="my-3 overflow-x-auto">
          <table className="w-full border-collapse text-[14px]">
            <thead>
              <tr className="border-b border-[var(--color-hairline)]">
                {header.map((h, i) => (
                  <th
                    key={i}
                    className="px-3 py-2 text-left font-semibold text-[var(--color-ink)]"
                  >
                    {renderInline(h)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr
                  key={ri}
                  className="border-b border-[var(--color-hairline)]/50 align-top"
                >
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className="px-3 py-2 text-[var(--color-subtle)]"
                    >
                      {renderInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      idx = j - 1;
      continue;
    }

    if (isHorizontalRule(line)) {
      flushList(idx);
      blocks.push(
        <hr key={idx} className="my-4 border-[var(--color-hairline)]/70" />
      );
    } else if (line.startsWith("### ")) {
      flushList(idx);
      blocks.push(
        <h4 key={idx} className="mt-4 mb-1 text-[15px] font-semibold">
          {renderInline(line.slice(4))}
        </h4>
      );
    } else if (line.startsWith("## ")) {
      flushList(idx);
      blocks.push(
        <h3
          key={idx}
          className="mt-5 mb-1.5 text-[17px] font-semibold tracking-tight"
        >
          {renderInline(line.slice(3))}
        </h3>
      );
    } else if (/^\s*\d+\.\s+/.test(line)) {
      if (!ordered) flushList(idx);
      ordered = true;
      list.push(line.replace(/^\s*\d+\.\s+/, ""));
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      if (ordered) flushList(idx);
      ordered = false;
      list.push(line.slice(2));
    } else if (line.trim() === "") {
      flushList(idx);
    } else {
      flushList(idx);
      blocks.push(
        <p key={idx} className="my-1.5 leading-relaxed">
          {renderInline(line)}
        </p>
      );
    }
  }
  flushList(lines.length);

  return <div className="text-[15px] text-[var(--color-ink)]">{blocks}</div>;
}
