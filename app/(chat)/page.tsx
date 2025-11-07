// app/(chat)/page.tsx
import LessonCards from "@/components/LessonCards";

export default function Page() {
  return (
    <main className="p-6 space-y-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold">Vuga — Kinyarwanda A1</h1>
      <p className="opacity-80">Choose a lesson to begin or continue.</p>
      <LessonCards />
    </main>
  );
}