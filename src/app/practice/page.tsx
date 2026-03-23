import Link from "next/link";
import {
  Headphones,
  BookOpenCheck,
  PenTool,
  MessageSquare,
  Clock,
  ArrowRight,
  FileQuestion,
} from "lucide-react";

const practiceTests = [
  {
    name: "Full Practice Test",
    description: "Complete all 4 sub-tests in sequence, simulating the real OET exam experience.",
    icon: FileQuestion,
    color: "bg-blue-800 text-white",
    href: "/practice/full-test",
    duration: "~3 hours",
    questions: "All sections",
  },
  {
    name: "Listening",
    description: "Part A consultation notes, Part B short extracts, Part C longer extracts — with MCQ auto-scoring.",
    icon: Headphones,
    color: "bg-purple-100 text-purple-700",
    href: "/practice/listening",
    duration: "~40 min",
    questions: "36 items",
  },
  {
    name: "Reading",
    description: "Part A summary completion, Part B workplace texts, Part C comprehension — timed with speed analysis.",
    icon: BookOpenCheck,
    color: "bg-blue-100 text-blue-700",
    href: "/practice/reading",
    duration: "~60 min",
    questions: "34 items",
  },
  {
    name: "Writing",
    description: "Case notes to letter writing with model answers, self-assessment rubrics, and AI feedback option.",
    icon: PenTool,
    color: "bg-teal-100 text-teal-700",
    href: "/practice/writing",
    duration: "45 min",
    questions: "1 letter",
  },
  {
    name: "Speaking",
    description: "Role-play scenarios with candidate/interlocutor cards, recording tools, and self-assessment.",
    icon: MessageSquare,
    color: "bg-amber-100 text-amber-700",
    href: "/practice/speaking",
    duration: "~15 min",
    questions: "2 role-plays",
  },
];

export default function PracticePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Practice Tests</h1>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-600">
          Choose a full practice test or focus on a specific sub-test. Every test is randomized — no two tests are the same.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-4xl space-y-6">
        {practiceTests.map((test) => (
          <Link
            key={test.name}
            href={test.href}
            className="group flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-blue-300 sm:flex-row sm:items-center"
          >
            <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${test.color}`}>
              <test.icon className="h-7 w-7" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-800">{test.name}</h2>
              <p className="mt-1 text-sm text-gray-600">{test.description}</p>
              <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {test.duration}</span>
                <span>{test.questions}</span>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 shrink-0 text-gray-400 group-hover:text-blue-700 transition" />
          </Link>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-blue-200 bg-blue-50 p-6 text-center">
        <h3 className="text-lg font-semibold text-blue-900">How Our Practice Tests Work</h3>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3 text-left">
          <div>
            <p className="font-medium text-blue-900">🎲 Randomized</p>
            <p className="mt-1 text-sm text-blue-800">Questions are drawn randomly from our question bank. You won&apos;t see the same test twice.</p>
          </div>
          <div>
            <p className="font-medium text-blue-900">⏱️ Timed</p>
            <p className="mt-1 text-sm text-blue-800">Tests mirror real OET timing. Toggle between strict and practice mode.</p>
          </div>
          <div>
            <p className="font-medium text-blue-900">📊 Scored</p>
            <p className="mt-1 text-sm text-blue-800">Instant scoring with band estimates, explanations, and progress tracking.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
