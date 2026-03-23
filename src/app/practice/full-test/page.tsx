import Link from "next/link";
import { ClipboardCheck, ArrowRight } from "lucide-react";

export default function FullTestPage() {
  const sections = [
    { name: "Listening", duration: "~40 min", href: "/practice/listening", color: "bg-purple-100 text-purple-700" },
    { name: "Reading", duration: "~60 min", href: "/practice/reading", color: "bg-blue-100 text-blue-700" },
    { name: "Writing", duration: "45 min", href: "/practice/writing", color: "bg-teal-100 text-teal-700" },
    { name: "Speaking", duration: "~15 min", href: "/practice/speaking", color: "bg-amber-100 text-amber-700" },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/practice" className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-blue-800">
        ← All Practice Tests
      </Link>
      <div className="mt-6 flex items-center gap-3">
        <div className="rounded-xl bg-blue-800 p-3 text-white"><ClipboardCheck className="h-6 w-6" /></div>
        <h1 className="text-2xl font-bold text-gray-900">Full Practice Test</h1>
      </div>

      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="font-semibold text-gray-900">Simulate the Complete OET Exam</h2>
        <p className="mt-2 text-sm text-gray-600">
          Complete all four sub-tests in sequence to simulate the real OET experience. Total estimated time: approximately 2.5-3 hours.
        </p>

        <div className="mt-6 space-y-3">
          {sections.map((s, i) => (
            <Link key={s.name} href={s.href}
              className="flex items-center gap-4 rounded-xl border border-gray-200 p-4 transition hover:border-blue-300 hover:bg-blue-50">
              <span className={`flex h-10 w-10 items-center justify-center rounded-lg font-bold ${s.color}`}>{i + 1}</span>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{s.name}</p>
                <p className="text-sm text-gray-500">{s.duration}</p>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400" />
            </Link>
          ))}
        </div>

        <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-4">
          <p className="text-sm text-blue-800">
            <strong>Tip:</strong> Take each section one at a time. Complete one before moving to the next, just like the real exam.
          </p>
        </div>
      </div>
    </div>
  );
}
