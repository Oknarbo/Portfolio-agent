import { profile } from "@/data/profile";

export type SourceDocument = {
  id: string;
  source: string; // "cv" | "project" | "about" | "github" | "skills"
  title: string;
  content: string;
};

/**
 * Flatten the structured profile into discrete, retrievable text chunks.
 * Each chunk is self-contained so the LLM can use it without extra context.
 */
export function buildDocuments(): SourceDocument[] {
  const docs: SourceDocument[] = [];
  const { identity, summary, timeline, projects, skills, github, education, languages } =
    profile;

  docs.push({
    id: "about-summary",
    source: "about",
    title: "Professional summary",
    content: `${identity.name} — ${identity.title}, based in ${identity.location}. ${summary} Positioning: ${identity.positioning}`,
  });

  docs.push({
    id: "about-contact",
    source: "about",
    title: "Contact and links",
    content: `Email: ${identity.email}. GitHub: ${identity.github}. LinkedIn: ${identity.linkedin}.${identity.website ? ` Website: ${identity.website}.` : ""}`,
  });

  timeline.forEach((item, i) => {
    docs.push({
      id: `cv-${i}`,
      source: "cv",
      title: `${item.role} at ${item.company} (${item.period})`,
      content: `Role: ${item.role} at ${item.company}. Period: ${item.period}. ${item.summary} Highlights: ${item.highlights.join("; ")}. Tech stack: ${item.stack.join(", ")}.`,
    });
  });

  projects.forEach((p) => {
    docs.push({
      id: `project-${p.slug}`,
      source: "project",
      title: p.title,
      content: `Project: ${p.title} (${p.category}). ${p.tagline} Problem: ${p.problem} Solution: ${p.solution} Impact: ${p.impact} Tech stack: ${p.stack.join(", ")}.`,
    });
  });

  github.forEach((g, i) => {
    docs.push({
      id: `github-${i}`,
      source: "github",
      title: g.repo,
      content: `GitHub repository ${g.repo}: ${g.description} Tech stack: ${g.stack.join(", ")}. Highlights: ${g.highlights.join("; ")}.`,
    });
  });

  docs.push({
    id: "skills",
    source: "skills",
    title: "Skills",
    content: skills
      .map((s) => `${s.group}: ${s.items.join(", ")}.`)
      .join(" "),
  });

  if (education.length) {
    docs.push({
      id: "education",
      source: "cv",
      title: "Education",
      content: education
        .map((e) => `${e.title}, ${e.institution} (${e.period}).${e.detail ? ` ${e.detail}` : ""}`)
        .join(" "),
    });
  }

  if (languages.length) {
    docs.push({
      id: "languages",
      source: "about",
      title: "Languages",
      content: `Spoken languages: ${languages.map((l) => `${l.name} (${l.level})`).join(", ")}.`,
    });
  }

  return docs;
}
