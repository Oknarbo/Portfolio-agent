import { Container } from "@/components/Container";
import { profile } from "@/data/profile";

export const metadata = { title: "Projects" };

export default function ProjectsPage() {
  const { projects } = profile;

  return (
    <Container className="py-20">
      <header className="mb-14 max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Projects
        </h1>
        <p className="mt-4 text-lg text-[var(--color-subtle)]">
          Selected case studies in AI systems, automation, and agents — framed
          as Problem → Solution → Impact.
        </p>
      </header>

      <div className="space-y-6">
        {projects.map((p) => (
          <article
            key={p.slug}
            className="rounded-3xl border border-[var(--color-hairline)]/70 bg-[var(--color-surface)] p-8 transition-shadow hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)]"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <span className="text-[12px] font-semibold uppercase tracking-wider text-[var(--color-accent)]">
                  {p.category}
                </span>
                <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                  {p.title}
                </h2>
                <p className="mt-1 text-[var(--color-subtle)]">{p.tagline}</p>
              </div>
              {p.links?.length ? (
                <div className="flex gap-3">
                  {p.links.map((l) => (
                    <a
                      key={l.url}
                      href={l.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[14px] font-medium text-[var(--color-accent)] hover:underline"
                    >
                      {l.label} ↗
                    </a>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              <Field label="Problem" value={p.problem} />
              <Field label="Solution" value={p.solution} />
              <Field label="Impact" value={p.impact} />
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {p.stack.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-[var(--color-canvas)] px-3 py-1 text-[13px] text-[var(--color-subtle)] ring-1 ring-inset ring-[var(--color-hairline)]/70"
                >
                  {t}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Container>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <h3 className="text-[12px] font-semibold uppercase tracking-wider text-[var(--color-subtle)]">
        {label}
      </h3>
      <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-ink)]">
        {value}
      </p>
    </div>
  );
}
