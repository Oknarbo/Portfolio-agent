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

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  category: "AI" | "Automation" | "Blockchain" | "Agent Systems" | "Other";
  stack: string[];
  problem: string;
  solution: string;
  impact: string;
  links?: { label: string; url: string }[];
};

export type SkillGroup = {
  group: string;
  items: string[];
};

export type GithubSummary = {
  repo: string;
  description: string;
  stack: string[];
  highlights: string[];
};

export type Profile = {
  identity: Identity;
  summary: string; // longer professional summary used on /about and in RAG
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
      "I build production-grade agentic AI systems — from Profesor Abelton, a commercially launched AI copilot for Ableton Live, to autonomous automation tooling. Self-taught, shipped, and real.",
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
    "I didn't start my career in software. After years in journalism, digital marketing, and customer-facing roles, I taught myself Python, agentic workflows, LLM systems, real-time integrations, and production AI development while working full-time. That journey led to Profesor Abelton — a commercially launched AI copilot for Ableton Live that I designed and built from scratch, combining a custom Model Context Protocol (MCP) with 35 schema-validated tools, a dual-LLM architecture (Claude + Groq), real-time session awareness, production security controls, licensing infrastructure, and automated onboarding. Today I focus on building practical, production-grade AI systems that solve real-world problems through intelligent automation, agentic workflows, and seamless software integration.",

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
      category: "Agent Systems",
      stack: ["Python", "MCP", "Claude", "Groq", "WebSockets", "Fernet", "PyInstaller"],
      problem:
        "Ableton Live has a steep learning curve and most learning resources are cold, slow, and abstract — beginners get stuck Googling basics and watching 45-minute tutorials for 30-second questions.",
      solution:
        "A local desktop copilot connected to Ableton via an official Control Surface Remote Script. It streams full session state (tracks, clips, devices, tempo) to a dual-LLM engine (Claude with a custom MCP of 35 schema-validated tools, plus Groq for sub-second responses). A hardened command pipeline enforces a 40-action allowlist, parameter sanitization, and a 12-command batch limit. A 5-step First Launch Wizard auto-installs the Remote Script, encrypts API keys (Fernet), and activates a machine-bound Gumroad license.",
      impact:
        "Commercially launched (v2.0.1) and distributed via Gumroad for Windows and macOS. Passed independent AI security reviews (88/100 GPT-4o, 80/100 Grok) and Bandit static analysis with zero medium/high findings.",
      links: [
        { label: "Gumroad", url: "https://oknarbo.gumroad.com/l/nyhfbr" },
        { label: "GitHub", url: "https://github.com/Oknarbo/profesor-abelton-ai" },
      ],
    },
    {
      slug: "career-assistant",
      title: "AI Career Assistant (this site)",
      tagline: "A grounded RAG assistant that answers recruiter questions about my work.",
      category: "AI",
      stack: ["Next.js", "TypeScript", "OpenAI", "Supabase", "pgvector"],
      problem:
        "Static CVs don't let recruiters ask questions or evaluate role fit — they have to infer everything from a flat document.",
      solution:
        "A retrieval-augmented assistant grounded strictly in my profile data: questions are embedded, relevant chunks are retrieved via vector search, and the LLM answers only from that context. A dedicated Job Fit mode analyzes a pasted job description and returns a fit score, experience mapping, gaps, and interview positioning.",
      impact:
        "Turns a static portfolio into an interactive, queryable career interface — and demonstrates real AI systems engineering (RAG, embeddings, grounding).",
      links: [{ label: "GitHub", url: "https://github.com/Oknarbo" }],
    },
    {
      slug: "profesor-david",
      title: "Profesor David — AI Companion for Avid Pro Tools",
      tagline: "The Profesor Abelton architecture, adapted for Pro Tools and xAI Grok.",
      category: "Agent Systems",
      stack: ["Python", "FastAPI", "xAI Grok", "PTSL (gRPC)", "Tkinter"],
      problem:
        "Pro Tools users need contextual, conversational help without leaving their session — but no local, session-aware assistant existed.",
      solution:
        "A local AI companion using a FastAPI server (127.0.0.1:8766) and the Pro Tools PTSL gRPC connector, powered by the xAI Grok API. It receives live session state and answers conversationally, reusing the proven Profesor Abelton architecture.",
      impact:
        "Working v1.0.0 (read-only), demonstrating the MCP/session-aware architecture generalizes across professional audio software. Write actions (inserts, plugin params, transport) planned next.",
    },
    {
      slug: "profesorica-volca",
      title: "Profesorica Volca — AI Tutor for Korg Volca Hardware",
      tagline: "Extending the agentic copilot concept from software to hardware synthesizers.",
      category: "Agent Systems",
      stack: ["Python", "PySide6", "OpenAI", "Anthropic"],
      problem:
        "Hardware synths like the Korg Volca series have deep, non-obvious workflows and no interactive, guided tutor.",
      solution:
        "A desktop tutor for Volca Bass, Drum, and Sample with original vector panel renderers driven by JSON control maps and glow highlighting. It offers a deterministic recipe mode (no LLM) and an LLM-backed chat/explain mode bound by a strict JSON schema contract.",
      impact:
        "MVP demonstrating the agentic-tutor pattern applied to physical hardware via structured, schema-validated outputs.",
    },
    {
      slug: "solana-automation",
      title: "Solana Automation Tools",
      tagline: "A suite of Python tools for the Solana ecosystem: trading, tokens, and real-time events.",
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
