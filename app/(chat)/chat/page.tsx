// app/(chat)/chat/page.tsx
"use client";

import { useChat } from "ai/react";
import { useEffect, useMemo, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

const LSN = "vuga.lessonId";
const LSI = "vuga.stepIndex";
const LSM = (id: string) => `vuga.msgs:${id}`;

export default function ChatPage() {
  const [lessonId, setLessonId] = useState(
    () => (typeof window !== "undefined" && localStorage.getItem(LSN)) || "market-a1"
  );
  const [stepIndex, setStepIndex] = useState(
    () => Number((typeof window !== "undefined" && localStorage.getItem(LSI)) || 0)
  );

  const initialMessages: Msg[] = useMemo(() => {
    try {
      if (typeof window === "undefined") return [];
      return JSON.parse(localStorage.getItem(LSM(lessonId)) || "[]");
    } catch {
      return [];
    }
  }, [lessonId]);

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
    body: { lessonId, stepIndex },
    initialMessages,
    onResponse: (res) => {
      const hdr = res.headers.get("x-step-index");
      if (hdr !== null) setStepIndex(Number(hdr));
    },
  });

  useEffect(() => { if (typeof window !== "undefined") localStorage.setItem(LSN, lessonId); }, [lessonId]);
  useEffect(() => { if (typeof window !== "undefined") localStorage.setItem(LSI, String(stepIndex)); }, [stepIndex]);
  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem(LSM(lessonId), JSON.stringify(messages));
  }, [lessonId, messages]);

  const sendHelper = (word: string) => {
    const form = new FormData();
    form.set("input", word);
    handleSubmit(new Event("submit") as any, { data: form });
  };

  return (
    <main className="max-w-3xl mx-auto p-4 flex flex-col h-[calc(100vh-2rem)]">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm opacity-80">Lesson: {lessonId} • Step {stepIndex}</div>
        <div className="flex gap-2 text-sm">
          {["help", "answer", "explain", "new"].map(h => (
            <button key={h} onClick={() => sendHelper(h)} className="underline">{h}</button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto border rounded p-3">
        {messages.map((m, i) => (
          <div key={i} className={`my-1 ${m.role === "user" ? "text-right" : ""}`}>
            <span className={`inline-block px-3 py-2 rounded ${m.role === "user" ? "bg-gray-200" : "bg-gray-100"}`}>
              {m.content}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-2 flex gap-2">
        <input
          name="input"
          value={input}
          onChange={handleInputChange}
          placeholder="Andika hano… (Type here…)"
          className="flex-1 border rounded px-3 py-2"
        />
        <button type="submit" className="px-4 rounded bg-black text-white">Send</button>
      </form>
    </main>
  );
}
