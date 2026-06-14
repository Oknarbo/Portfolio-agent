"use client";

import { useState } from "react";

/**
 * Lightweight YouTube embed (facade pattern).
 *
 * Renders only the thumbnail until the user clicks play, then swaps in the
 * iframe. This keeps the page fast — no third-party iframe/JS is loaded on
 * first paint, even with several videos on screen.
 */
export function YouTubeEmbed({
  id,
  title,
  className = "",
  active: activeProp,
  onActivate,
}: {
  id: string;
  title: string;
  className?: string;
  /** Optional controlled mode: when provided, the parent owns play state. */
  active?: boolean;
  onActivate?: () => void;
}) {
  const [activeState, setActiveState] = useState(false);
  const active = activeProp ?? activeState;
  const activate = () => {
    setActiveState(true);
    onActivate?.();
  };
  const thumb = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

  return (
    <div
      className={`relative aspect-video w-full overflow-hidden rounded-2xl bg-black ring-1 ring-inset ring-[var(--color-hairline)]/70 ${className}`}
    >
      {active ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={activate}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 h-full w-full cursor-pointer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumb}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
          <span className="absolute inset-0 bg-black/15 transition-colors group-hover:bg-black/25" />
          <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow-lg transition-transform duration-200 group-hover:scale-110">
            <svg
              viewBox="0 0 24 24"
              className="ml-0.5 h-6 w-6 fill-[var(--color-ink)]"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          {title ? (
            <span className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-left text-[13px] font-medium text-white">
              {title}
            </span>
          ) : null}
        </button>
      )}
    </div>
  );
}
