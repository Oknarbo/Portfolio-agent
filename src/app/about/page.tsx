import { Container } from "@/components/Container";
import { profile } from "@/data/profile";

export const metadata = { title: "About" };

export default function AboutPage() {
  const { summary, timeline, education, languages, skills, identity } = profile;

  return (
    <Container className="py-20">
      <header className="mb-14 flex flex-col gap-8 sm:flex-row sm:items-start">
        {identity.photo ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={identity.photo}
            alt={identity.name}
            className="h-32 w-32 flex-shrink-0 rounded-2xl object-cover shadow-[0_8px_30px_rgba(0,0,0,0.12)] sm:h-40 sm:w-40"
          />
        ) : null}
        <div className="max-w-2xl">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            About
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-[var(--color-subtle)]">
            {summary}
          </p>
        </div>
      </header>

      <section className="mb-16">
        <h2 className="mb-8 text-2xl font-semibold tracking-tight">Career</h2>
        <ol className="relative border-l border-[var(--color-hairline)]">
          {timeline.map((item, i) => (
            <li key={i} className="mb-10 ml-6">
              <span className="absolute -left-[5px] mt-2 h-2.5 w-2.5 rounded-full bg-[var(--color-accent)]" />
              <p className="text-[13px] font-medium text-[var(--color-subtle)]">
                {item.period}
              </p>
              <h3 className="mt-1 text-xl font-semibold tracking-tight">
                {item.role} · {item.company}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-ink)]">
                {item.summary}
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-[15px] text-[var(--color-subtle)]">
                {item.highlights.map((h, j) => (
                  <li key={j}>{h}</li>
                ))}
              </ul>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.stack.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-[var(--color-canvas)] px-3 py-1 text-[12px] text-[var(--color-subtle)] ring-1 ring-inset ring-[var(--color-hairline)]/70"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mb-16">
        <h2 className="mb-8 text-2xl font-semibold tracking-tight">Skills</h2>
        <div className="grid gap-8 sm:grid-cols-2">
          {skills.map((s) => (
            <div key={s.group}>
              <h3 className="text-[13px] font-semibold uppercase tracking-wider text-[var(--color-subtle)]">
                {s.group}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {s.items.map((i) => (
                  <span
                    key={i}
                    className="rounded-full bg-[var(--color-surface)] px-3 py-1 text-[14px] text-[var(--color-ink)] ring-1 ring-inset ring-[var(--color-hairline)]/70"
                  >
                    {i}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-12 sm:grid-cols-2">
        <div>
          <h2 className="mb-6 text-2xl font-semibold tracking-tight">
            Education
          </h2>
          <div className="space-y-5">
            {education.map((e, i) => (
              <div key={i}>
                <p className="text-[13px] font-medium text-[var(--color-subtle)]">
                  {e.period}
                </p>
                <h3 className="mt-1 text-[17px] font-semibold">{e.title}</h3>
                <p className="text-[15px] text-[var(--color-subtle)]">
                  {e.institution}
                </p>
                {e.detail ? (
                  <p className="mt-1 text-[14px] text-[var(--color-subtle)]">
                    {e.detail}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-6 text-2xl font-semibold tracking-tight">
            Languages
          </h2>
          <div className="space-y-3">
            {languages.map((l) => (
              <div
                key={l.name}
                className="flex items-center justify-between border-b border-[var(--color-hairline)]/60 pb-3"
              >
                <span className="text-[15px] font-medium">{l.name}</span>
                <span className="text-[14px] text-[var(--color-subtle)]">
                  {l.level}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <a
              href={`mailto:${identity.email}`}
              className="text-[15px] font-medium text-[var(--color-accent)] hover:underline"
            >
              {identity.email}
            </a>
          </div>
        </div>
      </section>
    </Container>
  );
}
