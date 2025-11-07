// app/(chat)/api/chat/route.ts
import { NextResponse } from "next/server";
import { lessons, type Lesson } from "@/lib/lessons";

export const runtime = "nodejs";

type Msg = { role: "user" | "assistant"; content: string };
type Body = { messages?: Msg[]; lessonId?: string; stepIndex?: number };

function normalize(s: string) {
  return s.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "");
}
function matchAny(user: string, expect: string[]) {
  const u = normalize(user);
  return expect.some(k => u.includes(normalize(k)));
}

function tutorReply(lesson: Lesson, stepIndex: number, history: Msg[]) {
  const steps = lesson.steps;
  const userMsgs = history.filter(m => m.role === "user");
  const i = Math.min(stepIndex, steps.length - 1);
  const current = steps[i];

  if (userMsgs.length === 0) {
    return { text: `${lesson.title} — ${lesson.scene}\n\n${current.prompt}`, next: i };
  }

  const lastUser = userMsgs[userMsgs.length - 1]?.content || "";
  const u = normalize(lastUser);

  if (u === "help")     return { text: `Hint: ${current.suggest ?? current.kw}`, next: i };
  if (u === "answer")   return { text: `Say: “${current.kw}” (${current.en})`, next: i };
  if (u === "explain" || u.includes("why"))
                        return { text: current.note ?? "A polite morning form is expected here.", next: i };
  if (u === "new")      return { text: `${steps[0].prompt}`, next: 0 };

  if (matchAny(lastUser, current.expectAnyOf)) {
    const n = i + 1;
    if (n >= steps.length) {
      return {
        text: `Neza cyane! ✅ Warangije isomo.\nRecap:\n- ${steps.map(s => `• ${s.kw} — ${s.en}`).join("\n")}\nAndika “new” kugirango utangire bundi bushya.`,
        next: n
      };
    }
    return { text: `✅ Byiza! ${steps[n].prompt}`, next: n };
  }

  return { text: `Ndabikunze, gerageza kongera. Hint: ${current.suggest ?? current.kw}\n(type “help” or “answer”)`, next: i };
}

export async function POST(req: Request) {
  const { messages = [], lessonId = "market-a1", stepIndex = 0 } = (await req.json()) as Body;
  const lesson = lessons.find(l => l.id === lessonId) ?? lessons[0];
  const { text, next } = tutorReply(lesson, stepIndex, messages);
  const res = NextResponse.json({ role: "assistant", content: text, lessonId: lesson.id });
  res.headers.set("x-step-index", String(next));
  return res;
}
