import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: `${profile.identity.name} — ${profile.identity.title}`,
  description:
    "AI Engineer who commercially shipped a production agentic app with real users. MCP, Claude API, Python, agentic workflows. Open to remote AI engineering roles.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
