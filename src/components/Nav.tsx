"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { profile } from "@/data/profile";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/assistant", label: "Assistant" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-hairline)]/60 bg-[var(--color-canvas)]/80 backdrop-blur-xl backdrop-saturate-150">
      <nav className="mx-auto flex h-12 max-w-5xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link
          href="/"
          className="min-w-0 truncate text-[15px] font-semibold tracking-tight text-[var(--color-ink)]"
        >
          {profile.identity.name}
        </Link>
        <ul className="flex shrink-0 items-center gap-0.5 sm:gap-1">
          {links.map((l) => {
            const active =
              l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`rounded-full px-2.5 py-1.5 text-[13px] transition-colors sm:px-3 ${
                    active
                      ? "text-[var(--color-ink)]"
                      : "text-[var(--color-subtle)] hover:text-[var(--color-ink)]"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
