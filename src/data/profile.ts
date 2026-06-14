/**
 * SINGLE SOURCE OF TRUTH for the whole portfolio.
 *
 * Everything the website shows AND everything the AI Career Assistant knows
 * comes from this file. Edit this file with your real data, then run
 * `npm run ingest` to (re)build the embeddings for the assistant.
 *
 * Rule of thumb: if it's not written here, the assistant will say it does
 * not have that information (it never invents experience).
 */

export type Identity = {
  name: string;
  title: string;
  positioning: string; // one strong sentence shown on the landing page
  location: string;
  email: string;
  github: string;
  linkedin: string;
  website?: string;
  upwork?: string;
  malt?: string;
  gumroad?: string;
  photo?: string; // path under /public
};

export type TimelineItem = {
  period: string; // e.g. "2023 — Present"
  role: string;
  company: string;
  summary: string;
  highlights: string[];
  stack: string[];
};

export type Video = { id: string; title: string };

export type Metric = { value: string; label: string };

// Factual "impact layer" for shipped projects with real users.
export type ProductionImpact = {
  note: string; // one-line, factual usage signal (no inflated scale)
  usage: string; // who uses it and what they actually do in their workflow
  impactSignals: string[]; // engineering work framed as production value
  iteration: string; // how real usage feedback shapes the product
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  // Maturity / delivery classification:
  // "production" = shipped, deployed, and maintained systems.
  // "wip"        = actively in development, not yet shipped.
  // "experiment" = proof-of-concept, exploration, or reference work.
  maturity: "production" | "wip" | "experiment";
  category: "AI" | "Automation" | "Blockchain" | "Agent Systems" | "Other";
  stack: string[];
  problem: string;
  solution: string;
  impact: string;
  architecture?: string;
  challenges?: string[];
  outcome?: string;
  production?: ProductionImpact;
  videos?: Video[];
  metrics?: Metric[];
  featured?: boolean;
  links?: { label: string; url: string }[];
};

export type SkillGroup = {
  group: string;
  items: string[];
};

export type Capability = { title: string; description: string };

export type WhyHire = { title: string; detail: string };

export type GithubSummary = {
  repo: string;
  description: string;
  stack: string[];
  highlights: string[];
};

export type Profile = {
  identity: Identity;
  summary: string; // longer professional summary used on /about and in RAG
  capabilities: Capability[]; // "What I build" — services / technical capabilities
  whyHire: WhyHire[]; // "Why companies hire me"
  transition: string[]; // "Why I switched careers" — concise bullets
  timeline: TimelineItem[];
  projects: Project[];
  skills: SkillGroup[];
  github: GithubSummary[];
  education: { period: string; title: string; institution: string; detail?: string }[];
  languages: { name: string; level: string }[];
};

// ─────────────────────────────────────────────────────────────────────────────
// Real profile data for Branimir Antičević.
// ─────────────────────────────────────────────────────────────────────────────

export const profile: Profile = {
  identity: {
    name: "Branimir Antičević",
    title: "AI Engineer · Agentic AI & LLM Applications",
    positioning:
      "I design and ship agentic AI systems and LLM tools — including Profesor Abelton, a commercially launched AI copilot for Ableton Live. Self-taught, shipped, and in production.",
    location: "Zagreb, Croatia",
    email: "branimir.anticevic@gmail.com",
    github: "https://github.com/Oknarbo",
    linkedin: "https://www.linkedin.com/in/branimir-anticevic/",
    website: "",
    upwork: "https://www.upwork.com/freelancers/branx",
    malt: "https://www.malt.com/profile/branimiranticevic",
    gumroad: "https://oknarbo.gumroad.com/l/nyhfbr",
    photo: "/branimir.png",
  },

  summary:
    "I didn't start my career in software. After years in journalism, digital marketing, and customer-facing roles, I taught myself Python, agentic workflows, LLM systems, real-time integrations, and production AI development while working full-time. That journey led to Profesor Abelton — a commercially launched AI copilot for Ableton Live that I designed and built from scratch, combining a custom Model Context Protocol (MCP) with 35 schema-validated tools, a dual-LLM architecture (Claude + Groq), real-time session awareness, production security controls, licensing infrastructure, and automated onboarding. Today I build practical AI systems that solve real problems through agentic workflows, tool-calling, and software integration.",

  capabilities: [
    {
      title: "AI Agents",
      description:
        "Agents that read live state, reason over it, and take actions through validated tools.",
    },
    {
      title: "Agentic Workflows",
      description:
        "Multi-step LLM workflows with tool-calling, guardrails, and deterministic fallbacks.",
    },
    {
      title: "MCP Integrations",
      description:
        "Custom Model Context Protocol servers exposing schema-validated tools to LLMs.",
    },
    {
      title: "RAG Systems",
      description:
        "Retrieval-augmented assistants grounded strictly in your data — like the one on this site.",
    },
    {
      title: "API Integrations",
      description:
        "Real-time integrations with local and third-party APIs over REST and WebSockets.",
    },
    {
      title: "Full-Stack AI Apps",
      description:
        "Next.js + TypeScript front ends backed by Python AI services.",
    },
    {
      title: "Python Backends",
      description:
        "Async Python services with FastAPI, WebSockets, and careful error handling.",
    },
    {
      title: "Workflow Automation",
      description:
        "Python automation for trading, on-chain workflows, and data pipelines.",
    },
    {
      title: "LLM-Powered Tools",
      description:
        "Desktop and web tools built on Claude, Groq, OpenAI, and xAI Grok.",
    },
  ],

  whyHire: [
    {
      title: "Ships from minimal specs",
      detail:
        "Comfortable turning a one-line brief or rough idea into a working, shipped product.",
    },
    {
      title: "Production-minded",
      detail:
        "Licensing, encryption, command allowlists, and security reviews — not just demos.",
    },
    {
      title: "Fast implementation",
      detail:
        "Solo-designed, built, and commercially launched a full AI product end to end.",
    },
    {
      title: "Business-first thinking",
      detail:
        "Years in media and marketing mean I build for outcomes, not just clean code.",
    },
    {
      title: "Clear communication",
      detail:
        "I bridge technical and non-technical stakeholders in plain language.",
    },
    {
      title: "Remote-ready & bilingual",
      detail:
        "Native Croatian, professional English, experienced working independently.",
    },
  ],

  transition: [
    "16 years as a journalist and editor across Croatian print, radio, TV, and online media.",
    "Moved into digital marketing — closer to products, data, and the web.",
    "Got obsessed with AI and automation, and taught myself Python while working full-time.",
    "Designed, built, and commercially launched Profesor Abelton — a real, shipped AI product.",
  ],

  timeline: [
    {
      period: "Jul 2025 — Present",
      role: "Independent AI & Automation Developer",
      company: "Self-employed (Freelance)",
      summary:
        "Design and ship production-grade AI products end to end — from concept and architecture to deployment, licensing, and onboarding.",
      highlights: [
        "Designed and commercially launched production AI products from concept to deployment.",
        "Built agentic systems using LLM APIs, custom MCP architectures, tool-calling, and real-time integrations.",
        "Developed complete licensing, deployment, onboarding, and security infrastructure for desktop AI apps.",
        "Expanding MCP-based architectures into additional software and hardware domains.",
      ],
      stack: ["Python", "Claude API", "Groq", "MCP", "FastAPI", "WebSockets", "PyInstaller"],
    },
    {
      period: "Nov 2022 — Jul 2025",
      role: "Customer Service Representative (self-directed transition into software)",
      company: "McDonald's",
      summary:
        "Worked a full-time customer-facing role while teaching myself Python, agentic systems, and production AI development.",
      highlights: [
        "Self-taught Python, LLM systems, and agentic workflows while working full-time.",
        "Built first real AI products during this period, transitioning into software development.",
        "Later designed an AI onboarding assistant concept grounded in real operational experience.",
      ],
      stack: ["Python", "Self-directed learning"],
    },
    {
      period: "Aug 2017 — May 2022",
      role: "Digital Marketing",
      company: "Mikologika",
      summary:
        "Planning and execution of digital marketing activities for a mushroom-cultivation business.",
      highlights: [
        "Owned digital marketing planning and execution.",
        "Customer-facing and commercial experience that later informed product thinking.",
      ],
      stack: ["Digital marketing", "Content"],
    },
    {
      period: "2004 — 2016",
      role: "Journalist / Editor",
      company: "Advance.hr, Vjesnik, Radio 101, net.hr, Z1, Javno.hr, Večernji list",
      summary:
        "Long career in Croatian media as a journalist and editor across print, radio, TV, and online outlets.",
      highlights: [
        "Reported and edited across multiple major Croatian media organizations.",
        "Strong communication, research, and storytelling foundation now applied to AI products.",
      ],
      stack: ["Journalism", "Editing", "Research"],
    },
  ],

  projects: [
    {
      slug: "profesor-abelton",
      title: "Profesor Abelton — AI Copilot for Ableton Live",
      tagline:
        "A standalone desktop AI that turns natural language into Ableton Live actions — built to feel like a friend who actually knows Ableton.",
      maturity: "production",
      category: "Agent Systems",
      stack: ["Python", "MCP", "Claude", "Groq", "WebSockets", "Fernet", "PyInstaller"],
      problem:
        "Ableton Live has a steep learning curve and most learning resources are cold, slow, and abstract — beginners get stuck Googling basics and watching 45-minute tutorials for 30-second questions.",
      solution:
        "A local desktop copilot connected to Ableton via an official Control Surface Remote Script. It streams full session state (tracks, clips, devices, tempo) to a dual-LLM engine (Claude with a custom MCP of 35 schema-validated tools, plus Groq for sub-second responses). A hardened command pipeline enforces a 40-action allowlist, parameter sanitization, and a 12-command batch limit. A 5-step First Launch Wizard auto-installs the Remote Script, encrypts API keys (Fernet), and activates a machine-bound Gumroad license.",
      impact:
        "Commercially launched (v2.0.1) and distributed via Gumroad for Windows and macOS. Passed independent AI security reviews (88/100 GPT-4o, 80/100 Grok) and Bandit static analysis with zero medium/high findings.",
      architecture:
        "A desktop app (PyInstaller) talks to a local FastAPI + WebSocket engine, which connects to Ableton through an official Control Surface Remote Script. A dual-LLM router sends complex reasoning to Claude — over a custom MCP of 35 schema-validated tools — and quick queries to Groq for sub-second responses. Every requested action passes a hardened command pipeline before it ever reaches Ableton.",
      challenges: [
        "Streaming full Ableton session state (tracks, clips, devices, tempo) in real time without blocking the UI.",
        "Designing 35 schema-validated MCP tools so the LLM can act safely and predictably.",
        "Hardening the command pipeline: a 40-action allowlist, parameter sanitization, and a 12-command batch limit.",
        "Making it a real product: Fernet-encrypted API keys, machine-bound Gumroad licensing, and a 5-step first-launch wizard.",
      ],
      outcome:
        "A commercially launched (v2.0.1) desktop product on Windows and macOS that passed independent AI security reviews (88/100 GPT-4o, 80/100 Grok) and Bandit static analysis with zero medium/high findings.",
      production: {
        note: "Small but real: ~14 early production users — music producers running it inside their day-to-day Ableton Live sessions.",
        usage:
          "The users are music producers who keep Profesor Abelton open next to Ableton Live while they work. Instead of pausing to search forums or watch tutorials, they ask it in plain language — \u201Cadd a MIDI track\u201D, \u201Chow do I add a device\u201D, \u201Canalyse my session\u201D — and it reads the live session state and either answers or performs the action directly in the project. The assistant sits inside the creative loop rather than in a separate tab.",
        impactSignals: [
          "Real-time session sync: full Ableton state (tracks, clips, devices, tempo) streams over WebSockets, so answers reflect the project as it is right now — not a stale snapshot.",
          "Stays usable mid-session: a Groq fast-path answers quick queries in under a second while Claude handles complex reasoning.",
          "Safe to run in a live project: a 40-action allowlist, parameter sanitization, and a 12-command batch limit stop the AI from damaging a producer's work.",
          "Resilient in real use: failures from Ableton, the LLM APIs, or the network are caught and surfaced instead of crashing the session.",
          "Local-first and private: it runs on the user's machine with Fernet-encrypted API keys — nothing about their projects leaves the device except the LLM calls they trigger.",
        ],
        iteration:
          "The product is shaped by how this small group actually uses it. Real sessions surface edge cases demos never do — unusual project layouts, unexpected phrasings, device combinations — and those drive the fixes and new tools in each release. It evolves through live usage feedback, not a roadmap written in isolation.",
      },
      metrics: [
        { value: "v2.0.1", label: "Commercially launched" },
        { value: "35", label: "Schema-validated MCP tools" },
        { value: "2 LLMs", label: "Claude + Groq routing" },
        { value: "88/100", label: "Independent AI security review" },
        { value: "Win + macOS", label: "Distributed via Gumroad" },
        { value: "0", label: "Bandit medium/high findings" },
      ],
      videos: [
        { id: "m0WbmGFnUec", title: "Analyse my session" },
        { id: "iqlSgbPJB8M", title: "Add a MIDI track" },
        { id: "0SQJ4q6kbPQ", title: "How do I add a device?" },
      ],
      featured: true,
      links: [
        { label: "Gumroad", url: "https://oknarbo.gumroad.com/l/nyhfbr" },
        { label: "GitHub", url: "https://github.com/Oknarbo/profesor-abelton-ai" },
      ],
    },
    {
      slug: "career-assistant",
      title: "AI Career Assistant (this site)",
      tagline: "A grounded RAG assistant that answers recruiter questions about my work.",
      maturity: "production",
      category: "AI",
      stack: ["Next.js", "TypeScript", "OpenAI", "Supabase", "pgvector"],
      problem:
        "Static CVs don't let recruiters ask questions or evaluate role fit — they have to infer everything from a flat document.",
      solution:
        "A retrieval-augmented assistant grounded strictly in my profile data: questions are embedded, relevant chunks are retrieved via vector search, and the LLM answers only from that context. A dedicated Job Fit mode analyzes a pasted job description and returns a fit score, experience mapping, gaps, and interview positioning.",
      impact:
        "Turns a static portfolio into an interactive, queryable career interface — and demonstrates real AI systems engineering (RAG, embeddings, grounding).",
      architecture:
        "Next.js 15 App Router (TypeScript) with an API route that streams responses token by token. A provider-agnostic layer routes chat to Claude, Groq, or OpenAI; a retrieval layer either passes the full profile as context or runs vector search. Per-IP and global rate limits cap abuse and cost.",
      challenges: [
        "Keeping answers strictly grounded so the assistant never invents experience.",
        "Streaming responses while rendering Markdown (tables, lists) incrementally.",
        "Staying provider-agnostic so it runs on Claude, Groq, or OpenAI without code changes.",
      ],
      outcome:
        "A live, queryable career interface with a Q&A mode and a Job Fit mode that scores a pasted job description against real profile data.",
      links: [{ label: "GitHub", url: "https://github.com/Oknarbo" }],
    },
    {
      slug: "profesor-david",
      title: "Profesor David — AI Companion for Avid Pro Tools",
      tagline: "The Profesor Abelton architecture, adapted for Pro Tools and xAI Grok.",
      maturity: "wip",
      category: "Agent Systems",
      stack: ["Python", "FastAPI", "xAI Grok", "PTSL (gRPC)", "Tkinter"],
      problem:
        "Pro Tools users need contextual, conversational help without leaving their session — but no local, session-aware assistant existed.",
      solution:
        "A local AI companion using a FastAPI server (127.0.0.1:8766) and the Pro Tools PTSL gRPC connector, powered by the xAI Grok API. It receives live session state and answers conversationally, reusing the proven Profesor Abelton architecture.",
      impact:
        "Working v1.0.0 (read-only), demonstrating the MCP/session-aware architecture generalizes across professional audio software. Write actions (inserts, plugin params, transport) planned next.",
      architecture:
        "A local FastAPI server (127.0.0.1:8766) bridges the Pro Tools PTSL gRPC connector and the xAI Grok API, reusing the session-aware pattern proven in Profesor Abelton.",
      challenges: [
        "Adapting the MCP/session-aware architecture to a different DAW and a different LLM provider (xAI Grok).",
        "Speaking Pro Tools' PTSL gRPC protocol to read live session state.",
      ],
      outcome:
        "Working v1.0.0 (read-only); write actions (inserts, plugin params, transport) are the next milestone.",
    },
    {
      slug: "profesorica-volca",
      title: "Profesorica Volca — AI Tutor for Korg Volca Hardware",
      tagline: "Extending the agentic copilot concept from software to hardware synthesizers.",
      maturity: "wip",
      category: "Agent Systems",
      stack: ["Python", "PySide6", "OpenAI", "Anthropic"],
      problem:
        "Hardware synths like the Korg Volca series have deep, non-obvious workflows and no interactive, guided tutor.",
      solution:
        "A desktop tutor for Volca Bass, Drum, and Sample with original vector panel renderers driven by JSON control maps and glow highlighting. It offers a deterministic recipe mode (no LLM) and an LLM-backed chat/explain mode bound by a strict JSON schema contract.",
      impact:
        "MVP demonstrating the agentic-tutor pattern applied to physical hardware via structured, schema-validated outputs.",
      architecture:
        "A PySide6 desktop tutor with original vector panel renderers driven by JSON control maps. A deterministic recipe mode needs no LLM; an LLM-backed chat/explain mode is bound by a strict JSON schema contract.",
      challenges: [
        "Rendering accurate, interactive hardware panels from JSON control maps.",
        "Constraining LLM output to a strict JSON schema so explanations map to real controls.",
      ],
      outcome:
        "An MVP showing the agentic-tutor pattern works for physical hardware via structured outputs.",
    },
    {
      slug: "solana-automation",
      title: "Solana Automation Tools",
      tagline: "A suite of Python tools for the Solana ecosystem: trading, tokens, and real-time events.",
      maturity: "experiment",
      category: "Blockchain",
      stack: ["Python", "Solana", "SPL", "WebSockets", "REST APIs"],
      problem:
        "On-chain Solana workflows — sniping new tokens, creating SPL tokens, converting wSOL, monitoring pools — are manual, fast-moving, and error-prone.",
      solution:
        "A collection of automation tools and bots: new-token snipers (Raydium, Orca, Meteora, pump.fun), an SPL token creator with configurable parameters and multi-network support, wSOL converters, wallet tools, and real-time event processing.",
      impact:
        "Hands-on, production-style experience with blockchain RPCs, real-time event streams, and secure keypair handling across the Solana stack. Published as educational, open-source reference implementations.",
      links: [
        { label: "Token Creator", url: "https://github.com/Oknarbo/token-creator-widget" },
        { label: "DexScreener Sniper", url: "https://github.com/Oknarbo/Dexscreener-sniper" },
        { label: "OpenBook Sniper", url: "https://github.com/Oknarbo/open-book-sniper" },
        { label: "All repos", url: "https://github.com/Oknarbo?tab=repositories" },
      ],
    },
    {
      slug: "forex-automation",
      title: "Forex Automation System",
      tagline: "Automated trading and risk-management tooling in C#.",
      maturity: "experiment",
      category: "Automation",
      stack: ["C#", "cTrader / cAlgo"],
      problem:
        "Discretionary forex trading is hard to execute consistently and to keep within disciplined risk limits.",
      solution:
        "Automated trading and risk-management tooling built on the cTrader / cAlgo platform, encoding entry logic and risk controls as a deployable algorithm.",
      impact:
        "Demonstrates cross-language engineering (C#) and applied automation beyond the Python/AI stack.",
    },
    {
      slug: "x-trending-monitor",
      title: "X Trending Monitor",
      tagline: "A live dashboard for the top 30 trending topics on X (Twitter).",
      maturity: "experiment",
      category: "Automation",
      stack: ["Node.js", "WebSockets", "X API", "Electron"],
      problem:
        "Tracking what's trending on X in real time requires constant manual checking.",
      solution:
        "A live web dashboard (and desktop widget) that polls the X API, pushes updates over WebSockets, supports search filtering and tweet-volume stats, and auto-refreshes every 5 minutes.",
      impact:
        "Real-time data pipeline with a responsive UI and a packaged desktop widget build.",
    },
    {
      slug: "unimatrix",
      title: "Unimatrix — Modular Synthesizer (Rust)",
      tagline: "A real-time modular synthesizer engine built in Rust. In active development.",
      maturity: "experiment",
      category: "Other",
      stack: ["Rust", "CPAL", "midir", "rodio"],
      problem:
        "Building a low-latency, modular synthesis engine requires real-time audio and tight MIDI integration.",
      solution:
        "A Rust audio engine with multiple waveforms, ADSR envelopes, a filter system, polyphony, and MIDI controller integration (CC mapping, note on/off) via CPAL and midir.",
      impact:
        "Systems-level engineering in Rust with real-time audio constraints — an in-progress project showing range beyond AI/web work.",
      links: [
        { label: "GitHub", url: "https://github.com/Oknarbo/Synthesiser-rust-notfinished" },
      ],
    },
    {
      slug: "branksy",
      title: "Branksy — The Non-Artist",
      tagline: "A tongue-in-cheek 'degen coin' website for an artist who makes no art.",
      maturity: "experiment",
      category: "Other",
      stack: ["HTML", "CSS", "JavaScript", "Firebase"],
      problem:
        "A fun creative outlet — a satirical landing page with meme-coin aesthetics.",
      solution:
        "A playful single-page site with neon/retro styling, a Firebase Firestore real-time visit counter, Buy-Me-a-Coffee donation tiers, and animated hero elements.",
      impact:
        "Shows front-end range and a sense of humour — plus practical Firebase integration.",
      links: [
        { label: "GitHub", url: "https://github.com/Oknarbo/branksy-non-art" },
      ],
    },
  ],

  skills: [
    {
      group: "AI & LLM Systems",
      items: [
        "Model Context Protocol (MCP)",
        "Tool / Function Calling",
        "Agentic Workflows",
        "RAG & Embeddings",
        "Claude API",
        "Groq API",
        "OpenAI API",
        "xAI Grok API",
        "Structured Outputs",
        "Prompt Engineering",
        "Session State Management",
      ],
    },
    {
      group: "Languages",
      items: ["Python", "C#", "JavaScript / TypeScript", "Node.js", "Rust"],
    },
    {
      group: "Software Engineering",
      items: [
        "Async Python",
        "WebSockets",
        "REST APIs",
        "FastAPI",
        "Real-Time Integrations",
        "Next.js",
        "PyInstaller",
        "Desktop App Development",
      ],
    },
    {
      group: "Security & Production",
      items: [
        "Fernet Encryption",
        "Command Allowlisting",
        "Parameter Validation",
        "License Systems",
        "Static Analysis (Bandit)",
        "Secure Local Deployments",
      ],
    },
  ],

  github: [
    {
      repo: "Oknarbo/profesor-abelton-ai",
      description:
        "Public showcase of Profesor Abelton — an AI agent for natural-language control of Ableton Live (Croatian & English). Custom Ableton Remote Script, MCP tool-calling (Claude + Groq), desktop GUI, and one-click installer. Full source private; access available to recruiters on request.",
      stack: ["Python", "Claude", "Groq", "MCP", "PyQt", "OSC/MIDI"],
      highlights: [
        "Natural language → Ableton action parser and executor",
        "Custom Remote Script for deep DAW integration",
        "Secure agent ↔ Ableton communication with robust error handling",
      ],
    },
    {
      repo: "Oknarbo/token-creator-widget",
      description:
        "Web-based Solana token creation suite with real on-chain integration: create/mint/transfer/burn SPL tokens, wallet management, multi-network support, and an automatic backup system.",
      stack: ["JavaScript", "Node.js", "Python", "Solana SDK"],
      highlights: [
        "On-chain SPL token deployment across devnet/testnet/mainnet",
        "Express server + Python blockchain scripts",
        "Automatic backups and transaction history",
      ],
    },
    {
      repo: "Oknarbo/Dexscreener-sniper",
      description:
        "Educational multi-DEX sniper bot using the DexScreener API, with intelligent filtering/scoring, Jupiter swaps, and position tracking with trailing stops. Reference implementation only.",
      stack: ["Python", "asyncio", "DexScreener API", "Jupiter API"],
      highlights: [
        "Multi-DEX (Raydium, Orca, Jupiter, Meteora, OpenBook)",
        "Async real-time pool detection and filtering",
        "Risk controls: TP/SL and trailing stops",
      ],
    },
    {
      repo: "Oknarbo (17 repositories)",
      description:
        "Other notable repos: open-book-sniper, orca-sniper-bot, Raydium-sniper-bot, Solana-trading-tools-python, sol-wsol-converter, Synthesiser-rust-notfinished (Unimatrix), branksy-non-art, crypto_app, job-sniper-blockchain, mcdaidemo.",
      stack: ["Python", "JavaScript", "Rust", "CSS"],
      highlights: [
        "Breadth across AI, blockchain automation, systems (Rust), and web",
        "Most Solana tools published as educational reference code",
      ],
    },
  ],

  education: [
    {
      period: "1998 — 2011",
      title: "Master of Journalism",
      institution: "Faculty of Political Science, University of Zagreb",
    },
    {
      period: "2022 — Present",
      title: "Self-Directed Education — AI Engineering, Agentic Systems, Software Development",
      institution: "Independent study while working full-time",
      detail:
        "Taught myself Python, LLM systems, agentic workflows, and production AI development, culminating in a commercially launched product.",
    },
  ],

  languages: [
    { name: "Croatian", level: "Native" },
    { name: "English", level: "C1 — Professional Working Proficiency" },
  ],
};
