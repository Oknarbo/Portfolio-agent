import { Container } from "@/components/Container";
import { Chat } from "@/components/Chat";

export const metadata = { title: "Career Assistant" };

export default function AssistantPage() {
  return (
    <Container className="py-12">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Career Assistant
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-[var(--color-subtle)]">
          A retrieval-based assistant grounded strictly in real profile data.
          Ask about experience, or switch to Job Fit to evaluate a role.
        </p>
      </header>
      <Chat />
      <p className="mx-auto mt-6 max-w-xl text-center text-[13px] text-[var(--color-subtle)]">
        Answers are generated from retrieved profile context only. If something
        isn&apos;t in the profile, the assistant will say so.
      </p>
    </Container>
  );
}
