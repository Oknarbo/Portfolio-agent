import { Container } from "@/components/Container";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";
import { profile, type Project } from "@/data/profile";

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
          Selected case studies in AI systems, automation, and agents — each
          framed as Problem → Solution → Architecture → Outcome.
        </p>
      </header>

      <div className="space-y-8">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </Container>
  );
}

function ProjectCard({ project: p }: { project: Project }) {
  const outcome = p.outcome ?? p.impact;

  return (
    <article className="overflow-hidden rounded-3xl border border-[var(--color-hairline)]/70 bg-[var(--color-surface)] transition-shadow hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)]">
      <div className="p-8">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[12px] font-semibold uppercase tracking-wider text-[var(--color-accent)]">
                {p.category}
              </span>
              {p.featured ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-accent)]/10 px-2.5 py-0.5 text-[11px] font-semibold text-[var(--color-accent)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                  Commercially launched
                </span>
              ) : null}
            </div>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight">
              {p.title}
            </h2>
            <p className="mt-1 max-w-2xl text-[var(--color-subtle)]">
              {p.tagline}
            </p>
          </div>
          {p.links?.length ? (
            <div className="flex flex-wrap gap-3">
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

        {/* Videos */}
        {p.videos?.length ? (
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {p.videos.map((v) => (
              <YouTubeEmbed key={v.id} id={v.id} title={v.title} />
            ))}
          </div>
        ) : null}

        {/* Problem / Solution */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <Field label="Problem" value={p.problem} />
          <Field label="Solution" value={p.solution} />
        </div>

        {/* Architecture */}
        {p.architecture ? (
          <div className="mt-6">
            <Field label="Architecture" value={p.architecture} />
          </div>
        ) : null}

        {/* Challenges */}
        {p.challenges?.length ? (
          <div className="mt-6">
            <FieldLabel>Engineering challenges</FieldLabel>
            <ul className="mt-2 space-y-2">
              {p.challenges.map((ch) => (
                <li
                  key={ch}
                  className="flex gap-2.5 text-[15px] leading-relaxed text-[var(--color-ink)]"
                >
                  <Check />
                  <span>{ch}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {/* Outcome */}
        <div className="mt-6 rounded-2xl bg-[var(--color-canvas)] p-5 ring-1 ring-inset ring-[var(--color-hairline)]/60">
          <FieldLabel>Outcome</FieldLabel>
          <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-ink)]">
            {outcome}
          </p>
        </div>

        {/* Production usage / impact layer */}
        {p.production ? (
          <div className="mt-6 rounded-2xl border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/[0.04] p-5 sm:p-6">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent)] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-accent)]" />
              </span>
              <FieldLabel>In production</FieldLabel>
            </div>
            <p className="mt-2 text-[15px] font-medium leading-relaxed text-[var(--color-ink)]">
              {p.production.note}
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-subtle)]">
              {p.production.usage}
            </p>

            <h4 className="mt-5 text-[12px] font-semibold uppercase tracking-wider text-[var(--color-subtle)]">
              Engineering impact
            </h4>
            <ul className="mt-2 space-y-2">
              {p.production.impactSignals.map((s) => (
                <li
                  key={s}
                  className="flex gap-2.5 text-[14px] leading-relaxed text-[var(--color-ink)]"
                >
                  <Check />
                  <span>{s}</span>
                </li>
              ))}
            </ul>

            <h4 className="mt-5 text-[12px] font-semibold uppercase tracking-wider text-[var(--color-subtle)]">
              Iteration loop
            </h4>
            <p className="mt-2 text-[14px] leading-relaxed text-[var(--color-subtle)]">
              {p.production.iteration}
            </p>
          </div>
        ) : null}

        {/* Tech stack */}
        <div className="mt-6">
          <FieldLabel>Tech stack</FieldLabel>
          <div className="mt-2 flex flex-wrap gap-2">
            {p.stack.map((t) => (
              <span
                key={t}
                className="rounded-full bg-[var(--color-canvas)] px-3 py-1 text-[13px] text-[var(--color-subtle)] ring-1 ring-inset ring-[var(--color-hairline)]/70"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Metrics */}
      {p.metrics?.length ? (
        <div className="grid grid-cols-2 gap-px border-t border-[var(--color-hairline)]/70 bg-[var(--color-hairline)]/70 sm:grid-cols-3 lg:grid-cols-6">
          {p.metrics.map((m) => (
            <div
              key={m.label}
              className="bg-[var(--color-surface)] px-4 py-5 text-center"
            >
              <div className="text-xl font-semibold tracking-tight text-[var(--color-ink)]">
                {m.value}
              </div>
              <div className="mt-1 text-[12px] leading-snug text-[var(--color-subtle)]">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </article>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[12px] font-semibold uppercase tracking-wider text-[var(--color-subtle)]">
      {children}
    </h3>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-ink)]">
        {value}
      </p>
    </div>
  );
}

function Check() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="mt-0.5 h-4 w-4 flex-shrink-0 fill-[var(--color-accent)]"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0l-3.5-3.5a1 1 0 1 1 1.4-1.4l2.8 2.8 6.8-6.8a1 1 0 0 1 1.4 0Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
