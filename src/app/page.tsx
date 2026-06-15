import { Container } from "@/components/Container";
import { ButtonLink, ButtonAnchor } from "@/components/Button";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";
import { FeaturedVideo } from "@/components/FeaturedVideo";
import { profile } from "@/data/profile";

// Instant credibility layer — max 3 signals, shown directly under the hero.
const CREDIBILITY = [
  "1 production AI product shipped",
  "Real-time LLM systems with API integrations",
  "Active users in real-world workflows",
];

const PROOF_ONELINER =
  "Real-time AI system integrated into Ableton Live, used in production workflows.";

// Services shown in the post-proof CTA — kept concrete and engineering-focused.
const AVAILABILITY = [
  "AI Automation Engineering",
  "Agent Systems",
  "API Integrations",
  "LLM Applications",
  "Technical Consulting",
];

export default function Home() {
  const { identity, capabilities, whyHire, transition, skills, projects } =
    profile;
  const featured = projects.find((p) => p.featured) ?? projects[0];
  const primaryVideo = featured?.videos?.[0];
  const secondaryVideos = featured?.videos?.slice(1) ?? [];

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <Container className="flex flex-col items-center justify-center py-16 text-center sm:py-24">
          <p className="animate-fade mb-5 text-[15px] font-medium text-[var(--color-subtle)]">
            {identity.title}
          </p>
          <h1 className="animate-rise text-balance text-5xl font-semibold tracking-tight sm:text-7xl">
            {identity.name}
          </h1>
          <p
            className="animate-rise mt-6 max-w-2xl text-balance text-lg leading-relaxed text-[var(--color-subtle)] sm:text-xl"
            style={{ animationDelay: "0.08s" }}
          >
            {identity.positioning}
          </p>
          <div
            className="animate-rise mt-10 flex flex-wrap items-center justify-center gap-3"
            style={{ animationDelay: "0.16s" }}
          >
            <ButtonLink href="/projects">View Projects</ButtonLink>
            <ButtonLink href="/assistant" variant="secondary">
              Open Career Assistant →
            </ButtonLink>
          </div>

          {/* Instant credibility layer */}
          <ul
            className="animate-fade mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-2"
            style={{ animationDelay: "0.24s" }}
          >
            {CREDIBILITY.map((c) => (
              <li
                key={c}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-surface)] px-3.5 py-1.5 text-[13px] font-medium text-[var(--color-ink)] ring-1 ring-inset ring-[var(--color-hairline)]/70"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                {c}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── Proof of work (first evidence layer — video dominant) ─── */}
      {featured ? (
        <section className="pb-12 pt-4">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-[13px] font-semibold uppercase tracking-wider text-[var(--color-accent)]">
                Proof of work
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                Real systems, real implementations, real users.
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-[17px] leading-relaxed text-[var(--color-subtle)]">
                {PROOF_ONELINER}
              </p>
            </div>

            {/* Dominant demo video + CTA */}
            {primaryVideo ? (
              <div className="mx-auto mt-8 max-w-3xl">
                <FeaturedVideo
                  id={primaryVideo.id}
                  title={primaryVideo.title}
                  cta="Watch 50s demo"
                />
              </div>
            ) : null}

            {/* Supporting evidence */}
            <article className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-3xl border border-[var(--color-hairline)]/70 bg-[var(--color-surface)] shadow-[0_8px_40px_rgba(0,0,0,0.05)]">
              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-accent)]/10 px-3 py-1 text-[12px] font-semibold text-[var(--color-accent)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                    Commercially launched · v2.0.1
                  </span>
                  <span className="text-[12px] font-semibold uppercase tracking-wider text-[var(--color-subtle)]">
                    {featured.category}
                  </span>
                </div>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                  {featured.title}
                </h3>
                <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-[var(--color-subtle)]">
                  {featured.tagline}
                </p>
                {featured.production?.note ? (
                  <p className="mt-4 flex gap-2.5 rounded-xl bg-[var(--color-accent)]/[0.06] px-3.5 py-2.5 text-[14px] leading-relaxed text-[var(--color-ink)]">
                    <span className="relative mt-1.5 flex h-2 w-2 flex-shrink-0">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent)] opacity-60" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-accent)]" />
                    </span>
                    <span>{featured.production.note}</span>
                  </p>
                ) : null}

                <div className="mt-6 grid gap-8 lg:grid-cols-2">
                  {featured.challenges?.length ? (
                    <ul className="space-y-2">
                      {featured.challenges.map((ch) => (
                        <li
                          key={ch}
                          className="flex gap-2.5 text-[14px] leading-relaxed text-[var(--color-ink)]"
                        >
                          <Check />
                          <span>{ch}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {secondaryVideos.length ? (
                    <div className="grid grid-cols-2 gap-3 self-start">
                      {secondaryVideos.map((v) => (
                        <YouTubeEmbed key={v.id} id={v.id} title={v.title} />
                      ))}
                    </div>
                  ) : null}
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {featured.stack.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-[var(--color-canvas)] px-2.5 py-1 text-[12px] text-[var(--color-subtle)] ring-1 ring-inset ring-[var(--color-hairline)]/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {featured.links?.length ? (
                  <div className="mt-6 flex flex-wrap gap-4">
                    {featured.links.map((l) => (
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

              {featured.metrics?.length ? (
                <div className="grid grid-cols-2 gap-px border-t border-[var(--color-hairline)]/70 bg-[var(--color-hairline)]/70 sm:grid-cols-3 lg:grid-cols-6">
                  {featured.metrics.map((m) => (
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

          </Container>
        </section>
      ) : null}

      {/* ── Immediate CTA after proof of work (decision moment) ───── */}
      <section className="py-12">
        <Container>
          <div className="mx-auto max-w-4xl rounded-3xl border border-[var(--color-accent)]/25 bg-[var(--color-accent)]/[0.05] p-8 sm:p-12">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-[13px] font-semibold uppercase tracking-wider text-[var(--color-accent)]">
                Production systems, not demos.
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                Ready to build something similar?
              </h2>
              <p className="mx-auto mt-4 text-[16px] leading-relaxed text-[var(--color-subtle)]">
                I help companies build AI agents, workflow automations, API
                integrations, and production-grade AI applications. Whether you
                need an AI copilot, internal automation system, intelligent
                workflow orchestration, or a custom LLM-powered tool, I can help
                design and implement it.
              </p>
            </div>

            {/* Availability — scannable service pills */}
            <div className="mt-7">
              <p className="text-center text-[12px] font-semibold uppercase tracking-wider text-[var(--color-subtle)]">
                Available for
              </p>
              <ul className="mt-3 flex flex-wrap items-center justify-center gap-2">
                {AVAILABILITY.map((a) => (
                  <li
                    key={a}
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--color-surface)] px-3.5 py-1.5 text-[13px] font-medium text-[var(--color-ink)] ring-1 ring-inset ring-[var(--color-hairline)]/70"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>

            {/* Primary + secondary CTA */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <ButtonAnchor href={`mailto:${identity.email}`}>
                Contact me
              </ButtonAnchor>
              <ButtonAnchor href={identity.github} variant="secondary">
                View GitHub ↗
              </ButtonAnchor>
            </div>
          </div>
        </Container>
      </section>

      {/* ── What I build (technical breakdown) ───────────────────── */}
      <section className="py-12">
        <Container>
          <SectionHeader
            eyebrow="What I build"
            title="Services & technical capabilities"
            subtitle="The kinds of systems I design and ship — end to end."
          />
          <div className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-[var(--color-hairline)]/70 bg-[var(--color-hairline)]/70 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c) => (
              <div key={c.title} className="bg-[var(--color-surface)] p-6">
                <h3 className="text-[15px] font-semibold tracking-tight">
                  {c.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[var(--color-subtle)]">
                  {c.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Why companies hire me ────────────────────────────────── */}
      <section className="py-12">
        <Container>
          <SectionHeader
            eyebrow="Why companies hire me"
            title="Built to ship, not just to demo."
            subtitle="What founders, CTOs, and clients get when they work with me."
          />
          <div className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-[var(--color-hairline)]/70 bg-[var(--color-hairline)]/70 sm:grid-cols-2 lg:grid-cols-3">
            {whyHire.map((w) => (
              <div key={w.title} className="bg-[var(--color-surface)] p-6">
                <h3 className="text-[15px] font-semibold tracking-tight">
                  {w.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[var(--color-subtle)]">
                  {w.detail}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Why I switched careers ───────────────────────────────── */}
      <section className="py-12">
        <Container>
          <div className="rounded-3xl border border-[var(--color-hairline)]/70 bg-[var(--color-surface)] p-8 sm:p-12">
            <SectionHeader
              eyebrow="Why I switched careers"
              title="From newsroom to shipped AI products."
            />
            <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {transition.map((step, i) => (
                <li key={i} className="relative">
                  <span className="text-[13px] font-semibold text-[var(--color-accent)]">
                    0{i + 1}
                  </span>
                  <p className="mt-2 text-[14px] leading-relaxed text-[var(--color-ink)]">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
            <div className="mt-8">
              <ButtonLink href="/about" variant="secondary">
                Read the full story →
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Stack & skills ───────────────────────────────────────── */}
      <section className="py-12">
        <Container>
          <SectionHeader eyebrow="Stack & skills" title="Technologies I work with" />
          <div className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-[var(--color-hairline)]/70 bg-[var(--color-hairline)]/70 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map((s) => (
              <div key={s.group} className="bg-[var(--color-surface)] p-7">
                <h3 className="text-[13px] font-semibold uppercase tracking-wider text-[var(--color-subtle)]">
                  {s.group}
                </h3>
                <ul className="mt-3 space-y-1.5">
                  {s.items.slice(0, 6).map((i) => (
                    <li key={i} className="text-[15px] text-[var(--color-ink)]">
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────── */}
      <section className="py-16">
        <Container className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Ask anything about my work.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-[var(--color-subtle)]">
            A grounded assistant answers recruiter questions and evaluates role
            fit — based strictly on my real experience.
          </p>
          <div className="mt-8 flex justify-center">
            <ButtonLink href="/assistant">Open Career Assistant →</ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-[13px] font-semibold uppercase tracking-wider text-[var(--color-accent)]">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 text-[17px] leading-relaxed text-[var(--color-subtle)]">
          {subtitle}
        </p>
      ) : null}
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
