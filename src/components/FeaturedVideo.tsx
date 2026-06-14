"use client";

import { useState } from "react";
import { YouTubeEmbed } from "./YouTubeEmbed";

/**
 * Dominant, conversion-focused demo video: a clear CTA sits directly above a
 * large embedded video. The CTA and the video share play state, so either one
 * starts playback. Used as the first evidence layer on the home page.
 */
export function FeaturedVideo({
  id,
  title,
  cta = "Watch the demo",
}: {
  id: string;
  title: string;
  cta?: string;
}) {
  const [active, setActive] = useState(false);

  return (
    <div>
      {!active ? (
        <div className="mb-4 flex justify-center">
          <button
            type="button"
            onClick={() => setActive(true)}
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-5 py-2.5 text-[15px] font-medium text-white shadow-sm transition-all duration-200 hover:bg-[var(--color-accent-hover)] active:scale-[0.98]"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
            {cta}
          </button>
        </div>
      ) : null}
      <YouTubeEmbed
        id={id}
        title={title}
        active={active}
        onActivate={() => setActive(true)}
        className="shadow-[0_12px_50px_rgba(0,0,0,0.10)]"
      />
    </div>
  );
}
