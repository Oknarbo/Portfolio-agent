import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "secondary";

const base =
  "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-[15px] font-medium transition-all duration-200 active:scale-[0.98]";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] shadow-sm",
  secondary:
    "bg-transparent text-[var(--color-accent)] hover:bg-[var(--color-accent)]/8",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
}) {
  return (
    <Link href={href} className={`${base} ${variants[variant]}`}>
      {children}
    </Link>
  );
}

// For external URLs and mailto: links (plain anchor, not a Next.js route).
export function ButtonAnchor({
  href,
  children,
  variant = "primary",
  external = true,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
}) {
  const isMailto = href.startsWith("mailto:");
  return (
    <a
      href={href}
      className={`${base} ${variants[variant]}`}
      {...(external && !isMailto
        ? { target: "_blank", rel: "noreferrer" }
        : {})}
    >
      {children}
    </a>
  );
}
