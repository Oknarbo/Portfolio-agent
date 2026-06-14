import { Container } from "@/components/Container";
import { ButtonLink } from "@/components/Button";
import { profile } from "@/data/profile";

export default function Home() {
  const { identity, skills } = profile;

  return (
    <>
      <section className="relative overflow-hidden">
        <Container className="flex min-h-[78vh] flex-col items-center justify-center py-24 text-center">
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
        </Container>
      </section>

      <section className="pb-12">
        <Container>
          <div className="grid gap-px overflow-hidden rounded-3xl border border-[var(--color-hairline)]/70 bg-[var(--color-hairline)]/70 sm:grid-cols-2 lg:grid-cols-4">
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

      <section className="py-16">
        <Container className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Ask anything about my work.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-[var(--color-subtle)]">
            A grounded AI assistant answers recruiter questions and evaluates
            role fit — based strictly on my real experience.
          </p>
          <div className="mt-8 flex justify-center">
            <ButtonLink href="/assistant">Open Career Assistant →</ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
