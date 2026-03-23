"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { speakingRoleplays } from "@/lib/data";
import { useAuth } from "@/context/AuthContext";
import { ArrowLeft, MessageSquare, Mic, MicOff, Timer, CheckCircle, RotateCcw, User, UserCheck } from "lucide-react";

type Phase = "intro" | "prep" | "speaking" | "self-assess" | "results";

export default function SpeakingPracticePage() {
  const { addTestResult } = useAuth();
  const [phase, setPhase] = useState<Phase>("intro");
  const [roleplayIdx, setRoleplayIdx] = useState(0);
  const [showInterlocutor, setShowInterlocutor] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [selfScores, setSelfScores] = useState<Record<string, string>>({});

  const currentRoleplay = speakingRoleplays[roleplayIdx];

  const startTest = useCallback(() => {
    const idx = Math.floor(Math.random() * speakingRoleplays.length);
    setRoleplayIdx(idx);
    setShowInterlocutor(false);
    setIsRecording(false);
    setSelfScores({});
    setPhase("prep");
  }, []);

  const criteria = [
    "Intelligibility",
    "Fluency",
    "Appropriateness of Language",
    "Resources of Grammar & Expression",
    "Discourse Management",
  ];

  const submitAssessment = () => {
    const scoreMap: Record<string, number> = { Excellent: 90, Good: 75, Adequate: 60, "Needs Improvement": 40 };
    const scores = Object.values(selfScores).map((s) => scoreMap[s] || 60);
    const avg = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 60;
    addTestResult({
      sessionId: "s-speaking-" + Date.now(),
      subTest: "speaking",
      part: "A",
      score: avg,
      maxScore: 100,
      bandEstimate: avg >= 80 ? "A" : avg >= 65 ? "B" : avg >= 50 ? "C+" : "C",
    });
    setPhase("results");
  };

  if (phase === "intro") {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <Link href="/practice" className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-blue-800">
          <ArrowLeft className="h-4 w-4" /> All Practice Tests
        </Link>
        <div className="mt-6 flex items-center gap-3">
          <div className="rounded-xl bg-amber-100 p-3 text-amber-700"><MessageSquare className="h-6 w-6" /></div>
          <h1 className="text-2xl font-bold text-gray-900">Speaking Practice Test</h1>
        </div>
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-gray-900">How It Works</h2>
          <div className="mt-4 space-y-2 text-sm text-gray-600">
            <p>1. You&apos;ll receive a role-play card with a clinical scenario</p>
            <p>2. Take 2-3 minutes to prepare (just like the real exam)</p>
            <p>3. Practice your speaking response (record yourself if possible)</p>
            <p>4. Complete a self-assessment using OET speaking criteria</p>
            <p>5. Review the communication objectives and interlocutor card</p>
          </div>
          <button onClick={startTest} className="mt-6 inline-flex items-center gap-2 rounded-lg bg-amber-600 px-6 py-3 font-semibold text-white hover:bg-amber-700">
            Start Role-play <MessageSquare className="h-5 w-5" />
          </button>
        </div>
      </div>
    );
  }

  if (phase === "prep") {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-xl bg-amber-100 px-4 py-3 text-center">
          <span className="flex items-center justify-center gap-2 text-sm font-semibold text-amber-800">
            <Timer className="h-4 w-4" /> Preparation Time — Read your card carefully
          </span>
        </div>

        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 text-amber-700">
            <User className="h-5 w-5" />
            <h2 className="font-semibold text-gray-900">Candidate Card</h2>
          </div>
          <div className="mt-4 prose prose-sm max-w-none text-gray-800 whitespace-pre-line">
            {currentRoleplay.candidateCard}
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-4">
          <p className="text-sm text-blue-800"><strong>Setting:</strong> {currentRoleplay.setting}</p>
          <p className="mt-1 text-sm text-blue-800"><strong>Difficulty:</strong> {currentRoleplay.difficulty}</p>
        </div>

        <button onClick={() => setPhase("speaking")}
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-amber-600 px-6 py-3 font-semibold text-white hover:bg-amber-700">
          I&apos;m Ready — Start Speaking <Mic className="h-5 w-5" />
        </button>
      </div>
    );
  }

  if (phase === "speaking") {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-xl bg-red-100 px-4 py-3 text-center">
          <span className="flex items-center justify-center gap-2 text-sm font-semibold text-red-800">
            <Mic className="h-4 w-4" /> Speaking Time — 5 minutes
          </span>
        </div>

        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 text-amber-700">
            <User className="h-5 w-5" />
            <h2 className="font-semibold text-gray-900">Your Card (Reference)</h2>
          </div>
          <div className="mt-4 text-sm text-gray-800 whitespace-pre-line">
            {currentRoleplay.candidateCard}
          </div>
        </div>

        {/* Recording Controls */}
        <div className="mt-6 flex flex-col items-center gap-4">
          <button
            onClick={() => setIsRecording(!isRecording)}
            className={`flex h-20 w-20 items-center justify-center rounded-full transition ${
              isRecording ? "bg-red-600 text-white animate-pulse" : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
          >
            {isRecording ? <MicOff className="h-8 w-8" /> : <Mic className="h-8 w-8" />}
          </button>
          <p className="text-sm text-gray-600">{isRecording ? "Recording... Click to stop" : "Click to start recording (simulated)"}</p>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => setShowInterlocutor(!showInterlocutor)}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <UserCheck className="h-4 w-4" /> {showInterlocutor ? "Hide" : "Show"} Interlocutor Card
          </button>
          <button onClick={() => setPhase("self-assess")}
            className="inline-flex items-center gap-2 rounded-lg bg-amber-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-amber-700">
            Finish Speaking <CheckCircle className="h-4 w-4" />
          </button>
        </div>

        {showInterlocutor && (
          <div className="mt-6 rounded-2xl border border-purple-200 bg-purple-50 p-6">
            <div className="flex items-center gap-2 text-purple-700">
              <UserCheck className="h-5 w-5" />
              <h2 className="font-semibold text-gray-900">Interlocutor Card</h2>
            </div>
            <div className="mt-4 text-sm text-gray-800 whitespace-pre-line">
              {currentRoleplay.interlocutorCard}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (phase === "self-assess") {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900">Self-Assessment</h1>
        <p className="mt-2 text-gray-600">Rate your speaking performance against OET criteria:</p>
        <div className="mt-6 space-y-4">
          {criteria.map((c) => (
            <div key={c} className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="font-medium text-gray-900">{c}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Excellent", "Good", "Adequate", "Needs Improvement"].map((level) => (
                  <button key={level}
                    onClick={() => setSelfScores({ ...selfScores, [c]: level })}
                    className={`rounded-lg border px-4 py-2 text-sm transition ${
                      selfScores[c] === level ? "border-amber-600 bg-amber-50 text-amber-800 font-semibold" : "border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}>
                    {level}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button onClick={submitAssessment}
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-amber-600 px-6 py-3 font-semibold text-white hover:bg-amber-700">
          Submit Assessment <CheckCircle className="h-5 w-5" />
        </button>
      </div>
    );
  }

  // Results
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-gray-900">Speaking Practice Complete</h1>

      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="font-semibold text-gray-900">Communication Objectives</h2>
        <p className="mt-1 text-sm text-gray-600">Check how many objectives you covered:</p>
        <div className="mt-4 space-y-2">
          {currentRoleplay.communicationObjectives.map((obj, i) => (
            <label key={i} className="flex items-start gap-2">
              <input type="checkbox" className="mt-1 h-4 w-4 rounded border-gray-300 text-amber-600" />
              <span className="text-sm text-gray-700">{obj}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-purple-200 bg-purple-50 p-6">
        <h2 className="font-semibold text-purple-900">Interlocutor Card (for reference)</h2>
        <div className="mt-3 text-sm text-gray-800 whitespace-pre-line">{currentRoleplay.interlocutorCard}</div>
      </div>

      <div className="mt-8 flex gap-4">
        <button onClick={startTest} className="inline-flex items-center gap-2 rounded-lg bg-amber-600 px-6 py-3 font-semibold text-white hover:bg-amber-700">
          <RotateCcw className="h-5 w-5" /> New Role-play
        </button>
        <Link href="/practice" className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50">All Practice Tests</Link>
      </div>
    </div>
  );
}
