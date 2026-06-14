import { profile } from "@/data/profile";

export function Footer() {
  const { identity } = profile;
  return (
    <footer className="mt-24 border-t border-[var(--color-hairline)]/60">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-6 py-8 text-[13px] text-[var(--color-subtle)] sm:flex-row">
        <p>
          © {new Date().getFullYear()} {identity.name}. All rights reserved.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <a href={identity.github} className="hover:text-[var(--color-ink)]" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={identity.linkedin} className="hover:text-[var(--color-ink)]" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          {identity.upwork ? (
            <a href={identity.upwork} className="hover:text-[var(--color-ink)]" target="_blank" rel="noreferrer">
              Upwork
            </a>
          ) : null}
          {identity.malt ? (
            <a href={identity.malt} className="hover:text-[var(--color-ink)]" target="_blank" rel="noreferrer">
              Malt
            </a>
          ) : null}
          {identity.gumroad ? (
            <a href={identity.gumroad} className="hover:text-[var(--color-ink)]" target="_blank" rel="noreferrer">
              Gumroad
            </a>
          ) : null}
          <a href={`mailto:${identity.email}`} className="hover:text-[var(--color-ink)]">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
