"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { readingPartB, readingPartC } from "@/lib/data";
import { useAuth } from "@/context/AuthContext";
import { ArrowLeft, ArrowRight, BookOpenCheck, Clock, CheckCircle, XCircle, RotateCcw } from "lucide-react";

type Phase = "intro" | "test" | "results";

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function ReadingPracticePage() {
  const { addTestResult } = useAuth();
  const [phase, setPhase] = useState<Phase>("intro");
  const [questions, setQuestions] = useState<typeof readingPartB>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(900); // 15 min for Part B
  const [showExplanation, setShowExplanation] = useState(false);

  const startTest = useCallback(() => {
    const allQuestions = shuffleArray([...readingPartB, ...readingPartC]);
    setQuestions(allQuestions);
    setAnswers(new Array(allQuestions.length).fill(null));
    setCurrentQ(0);
    setTimeLeft(900);
    setShowExplanation(false);
    setPhase("test");
  }, []);

  // Timer
  useEffect(() => {
    if (phase !== "test") return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setPhase("results");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [phase]);

  const selectAnswer = (idx: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQ] = idx;
    setAnswers(newAnswers);
  };

  const finishTest = () => {
    setPhase("results");
    const score = questions.reduce((acc, q, i) => {
      return acc + (answers[i] === q.questions[0].correctAnswer ? 1 : 0);
    }, 0);
    const pct = Math.round((score / questions.length) * 100);
    addTestResult({
      sessionId: "s-reading-" + Date.now(),
      subTest: "reading",
      part: "B+C",
      score: pct,
      maxScore: 100,
      bandEstimate: pct >= 80 ? "A" : pct >= 65 ? "B" : pct >= 50 ? "C+" : "C",
    });
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  // Results calculations
  const totalCorrect = questions.reduce((acc, q, i) => acc + (answers[i] === q.questions[0].correctAnswer ? 1 : 0), 0);
  const score = questions.length > 0 ? Math.round((totalCorrect / questions.length) * 100) : 0;

  if (phase === "intro") {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <Link href="/practice" className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-blue-800">
          <ArrowLeft className="h-4 w-4" /> All Practice Tests
        </Link>
        <div className="mt-6 flex items-center gap-3">
          <div className="rounded-xl bg-blue-100 p-3 text-blue-700"><BookOpenCheck className="h-6 w-6" /></div>
          <h1 className="text-2xl font-bold text-gray-900">Reading Practice Test</h1>
        </div>
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-gray-900">Test Overview</h2>
          <div className="mt-4 space-y-2 text-sm text-gray-600">
            <p>• <strong>Part B:</strong> Short workplace texts with MCQ questions</p>
            <p>• <strong>Part C:</strong> Longer passages with comprehension questions</p>
            <p>• <strong>Time limit:</strong> 15 minutes (can be extended in practice mode)</p>
            <p>• <strong>Questions:</strong> Randomized from our question bank</p>
          </div>
          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm text-amber-800"><strong>Tip:</strong> Speed matters in Reading! Practice managing your time effectively.</p>
          </div>
          <button onClick={startTest} className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-800 px-6 py-3 font-semibold text-white hover:bg-blue-900">
            Start Test <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    );
  }

  if (phase === "results") {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900">Reading Test Results</h1>
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-blue-100">
            <span className="text-3xl font-bold text-blue-800">{score}%</span>
          </div>
          <p className="mt-4 text-lg font-semibold text-gray-900">
            Band Estimate: <span className="text-blue-700">{score >= 80 ? "A" : score >= 65 ? "B" : score >= 50 ? "C+" : "C"}</span>
          </p>
          <p className="mt-2 text-gray-600">{totalCorrect} of {questions.length} correct</p>
        </div>

        <div className="mt-8 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Question Review</h2>
          {questions.map((q, i) => {
            const correct = answers[i] === q.questions[0].correctAnswer;
            return (
              <div key={q.id} className={`rounded-xl border p-5 ${correct ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}>
                <div className="flex items-start gap-2">
                  {correct ? <CheckCircle className="mt-0.5 h-5 w-5 text-green-600" /> : <XCircle className="mt-0.5 h-5 w-5 text-red-600" />}
                  <div>
                    <p className="text-sm font-medium text-gray-900">{q.questions[0].questionText}</p>
                    <p className="mt-1 text-sm text-gray-600">Your answer: {answers[i] !== null ? q.questions[0].options[answers[i]!] : "Not answered"}</p>
                    {!correct && <p className="mt-1 text-sm text-green-700">Correct: {q.questions[0].options[q.questions[0].correctAnswer]}</p>}
                    <p className="mt-2 text-xs text-gray-500">{q.questions[0].explanation}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex gap-4">
          <button onClick={startTest} className="inline-flex items-center gap-2 rounded-lg bg-blue-800 px-6 py-3 font-semibold text-white hover:bg-blue-900">
            <RotateCcw className="h-5 w-5" /> Take New Test
          </button>
          <Link href="/practice" className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50">
            All Practice Tests
          </Link>
        </div>
      </div>
    );
  }

  const q = questions[currentQ];
  const question = q.questions[0];

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Timer Bar */}
      <div className="flex items-center justify-between rounded-xl bg-gray-100 px-4 py-3">
        <span className="text-sm font-medium text-gray-600">
          Question {currentQ + 1} of {questions.length}
        </span>
        <span className={`flex items-center gap-1.5 text-sm font-semibold ${timeLeft < 60 ? "text-red-600" : "text-gray-700"}`}>
          <Clock className="h-4 w-4" /> {formatTime(timeLeft)}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mt-3 h-2 rounded-full bg-gray-200">
        <div className="h-2 rounded-full bg-blue-600 transition-all" style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }} />
      </div>

      {/* Passage */}
      <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-6">
        <p className="text-sm font-medium text-gray-500 uppercase mb-2">Part {q.part} — Read the following:</p>
        <p className="text-sm leading-relaxed text-gray-800 whitespace-pre-line">{q.passage}</p>
      </div>

      {/* Question */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-900">{question.questionText}</h3>
        <div className="mt-4 space-y-3">
          {question.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => selectAnswer(idx)}
              className={`w-full rounded-xl border-2 p-4 text-left text-sm transition ${
                answers[currentQ] === idx
                  ? "border-blue-600 bg-blue-50 text-blue-900"
                  : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <span className="font-semibold mr-2">{String.fromCharCode(65 + idx)}.</span>
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
          disabled={currentQ === 0}
          className="inline-flex items-center gap-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          <ArrowLeft className="h-4 w-4" /> Previous
        </button>
        {currentQ < questions.length - 1 ? (
          <button
            onClick={() => setCurrentQ(currentQ + 1)}
            className="inline-flex items-center gap-1 rounded-lg bg-blue-800 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-900"
          >
            Next <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={finishTest}
            className="inline-flex items-center gap-1 rounded-lg bg-green-700 px-6 py-2.5 text-sm font-medium text-white hover:bg-green-800"
          >
            <CheckCircle className="h-4 w-4" /> Finish Test
          </button>
        )}
      </div>
    </div>
  );
}
