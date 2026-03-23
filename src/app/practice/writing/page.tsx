"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { writingCases } from "@/lib/data";
import { useAuth } from "@/context/AuthContext";
import { ArrowLeft, PenTool, Clock, CheckCircle, RotateCcw, FileText } from "lucide-react";

type Phase = "intro" | "writing" | "self-assess" | "model";

export default function WritingPracticePage() {
  const { addTestResult } = useAuth();
  const [phase, setPhase] = useState<Phase>("intro");
  const [caseIdx, setCaseIdx] = useState(0);
  const [letter, setLetter] = useState("");
  const [timeLeft, setTimeLeft] = useState(2700); // 45 min
  const [selfScores, setSelfScores] = useState<Record<string, string>>({});

  const currentCase = writingCases[caseIdx];
  const wordCount = letter.trim().split(/\s+/).filter(Boolean).length;

  const startTest = useCallback(() => {
    const idx = Math.floor(Math.random() * writingCases.length);
    setCaseIdx(idx);
    setLetter("");
    setTimeLeft(2700);
    setSelfScores({});
    setPhase("writing");
  }, []);

  useEffect(() => {
    if (phase !== "writing") return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) { clearInterval(timer); setPhase("self-assess"); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [phase]);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  const criteria = [
    "Overall Task Fulfillment",
    "Appropriateness of Language & Tone",
    "Organization & Layout",
    "Grammar & Vocabulary Range",
    "Spelling & Punctuation",
  ];

  const submitSelfAssessment = () => {
    const scoreMap: Record<string, number> = { Excellent: 90, Good: 75, Adequate: 60, "Needs Improvement": 40 };
    const scores = Object.values(selfScores).map((s) => scoreMap[s] || 60);
    const avg = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 60;
    addTestResult({
      sessionId: "s-writing-" + Date.now(),
      subTest: "writing",
      part: "A",
      score: avg,
      maxScore: 100,
      bandEstimate: avg >= 80 ? "A" : avg >= 65 ? "B" : avg >= 50 ? "C+" : "C",
    });
    setPhase("model");
  };

  if (phase === "intro") {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <Link href="/practice" className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-blue-800">
          <ArrowLeft className="h-4 w-4" /> All Practice Tests
        </Link>
        <div className="mt-6 flex items-center gap-3">
          <div className="rounded-xl bg-teal-100 p-3 text-teal-700"><PenTool className="h-6 w-6" /></div>
          <h1 className="text-2xl font-bold text-gray-900">Writing Practice Test</h1>
        </div>
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-gray-900">Test Overview</h2>
          <div className="mt-4 space-y-2 text-sm text-gray-600">
            <p>• Read the case notes carefully</p>
            <p>• Write a letter (referral, discharge, or transfer) in 45 minutes</p>
            <p>• Target word count: 180-200 words</p>
            <p>• After writing, complete a self-assessment using OET criteria</p>
            <p>• Compare your letter with the model answer</p>
          </div>
          <button onClick={startTest} className="mt-6 inline-flex items-center gap-2 rounded-lg bg-teal-700 px-6 py-3 font-semibold text-white hover:bg-teal-800">
            Start Writing Task <PenTool className="h-5 w-5" />
          </button>
        </div>
      </div>
    );
  }

  if (phase === "writing") {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Timer */}
        <div className="flex items-center justify-between rounded-xl bg-gray-100 px-4 py-3">
          <span className="text-sm font-medium text-gray-600">Writing Task — {currentCase.letterType.charAt(0).toUpperCase() + currentCase.letterType.slice(1)} Letter</span>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Words: <strong className={wordCount >= 180 && wordCount <= 200 ? "text-green-700" : wordCount > 200 ? "text-amber-700" : "text-gray-700"}>{wordCount}</strong></span>
            <span className={`flex items-center gap-1.5 text-sm font-semibold ${timeLeft < 300 ? "text-red-600" : "text-gray-700"}`}>
              <Clock className="h-4 w-4" /> {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Case Notes */}
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
            <h2 className="flex items-center gap-2 font-semibold text-gray-900">
              <FileText className="h-5 w-5" /> Case Notes
            </h2>
            <div className="mt-4 space-y-3 font-mono text-sm">
              <div><span className="font-semibold text-gray-700">Patient:</span> <span className="text-gray-800">{currentCase.caseNotes.patient}</span></div>
              <div><span className="font-semibold text-gray-700">Age:</span> <span className="text-gray-800">{currentCase.caseNotes.age}</span></div>
              <div><span className="font-semibold text-gray-700">Diagnosis:</span> <span className="text-gray-800">{currentCase.caseNotes.diagnosis}</span></div>
              <div><span className="font-semibold text-gray-700">History:</span> <span className="text-gray-800">{currentCase.caseNotes.history}</span></div>
              <div><span className="font-semibold text-gray-700">Medications:</span> <span className="text-gray-800">{currentCase.caseNotes.medications}</span></div>
              <div><span className="font-semibold text-gray-700">Social History:</span> <span className="text-gray-800">{currentCase.caseNotes.socialHistory}</span></div>
              <div><span className="font-semibold text-gray-700">Plan:</span> <span className="text-gray-800">{currentCase.caseNotes.plan}</span></div>
            </div>
            <div className="mt-4 rounded-lg bg-teal-100 p-3">
              <p className="text-sm font-medium text-teal-800">Task: Write a {currentCase.letterType} letter</p>
            </div>
          </div>

          {/* Writing Area */}
          <div>
            <h2 className="font-semibold text-gray-900">Your Letter</h2>
            <textarea
              value={letter}
              onChange={(e) => setLetter(e.target.value)}
              className="mt-3 h-96 w-full rounded-xl border border-gray-300 p-4 text-sm leading-relaxed text-gray-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 resize-none"
              placeholder="Dear Dr. ...&#10;&#10;Re: [Patient Name], aged [XX] years&#10;&#10;I am writing to..."
            />
            <button
              onClick={() => setPhase("self-assess")}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-teal-700 px-6 py-3 font-semibold text-white hover:bg-teal-800"
            >
              <CheckCircle className="h-5 w-5" /> Submit Letter
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "self-assess") {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900">Self-Assessment</h1>
        <p className="mt-2 text-gray-600">Rate your letter against the OET writing criteria:</p>
        <div className="mt-6 space-y-4">
          {criteria.map((c) => (
            <div key={c} className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="font-medium text-gray-900">{c}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Excellent", "Good", "Adequate", "Needs Improvement"].map((level) => (
                  <button
                    key={level}
                    onClick={() => setSelfScores({ ...selfScores, [c]: level })}
                    className={`rounded-lg border px-4 py-2 text-sm transition ${
                      selfScores[c] === level
                        ? "border-teal-600 bg-teal-50 text-teal-800 font-semibold"
                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button onClick={submitSelfAssessment}
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-teal-700 px-6 py-3 font-semibold text-white hover:bg-teal-800">
          View Model Answer <CheckCircle className="h-5 w-5" />
        </button>
      </div>
    );
  }

  // Model answer phase
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-gray-900">Compare with Model Answer</h1>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-gray-900">Your Letter</h2>
          <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-gray-700">{letter || "(No letter written)"}</p>
        </div>
        <div className="rounded-2xl border border-teal-200 bg-teal-50 p-6 shadow-sm">
          <h2 className="font-semibold text-teal-900">Model Answer</h2>
          <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-teal-800">{currentCase.modelAnswer}</p>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="font-semibold text-gray-900">Key Points Checklist</h2>
        <div className="mt-3 space-y-2">
          {currentCase.keyPoints.map((point, i) => (
            <label key={i} className="flex items-start gap-2">
              <input type="checkbox" className="mt-1 h-4 w-4 rounded border-gray-300 text-teal-600" />
              <span className="text-sm text-gray-700">{point}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <button onClick={startTest} className="inline-flex items-center gap-2 rounded-lg bg-teal-700 px-6 py-3 font-semibold text-white hover:bg-teal-800">
          <RotateCcw className="h-5 w-5" /> New Writing Task
        </button>
        <Link href="/practice" className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50">All Practice Tests</Link>
      </div>
    </div>
  );
}
