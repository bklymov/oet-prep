"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { listeningPartB } from "@/lib/data";
import { useAuth } from "@/context/AuthContext";
import { ArrowLeft, ArrowRight, Headphones, Clock, CheckCircle, XCircle, RotateCcw, Volume2 } from "lucide-react";

type Phase = "intro" | "test" | "results";

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function ListeningPracticePage() {
  const { addTestResult } = useAuth();
  const [phase, setPhase] = useState<Phase>("intro");
  const [questions, setQuestions] = useState<typeof listeningPartB>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(600);

  const startTest = useCallback(() => {
    const shuffled = shuffleArray([...listeningPartB]);
    setQuestions(shuffled);
    setAnswers(new Array(shuffled.length).fill(null));
    setCurrentQ(0);
    setTimeLeft(600);
    setPhase("test");
  }, []);

  useEffect(() => {
    if (phase !== "test") return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) { clearInterval(timer); setPhase("results"); return 0; }
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
    const score = questions.reduce((acc, q, i) => acc + (answers[i] === q.questions[0].correctAnswer ? 1 : 0), 0);
    const pct = Math.round((score / questions.length) * 100);
    addTestResult({
      sessionId: "s-listening-" + Date.now(),
      subTest: "listening",
      part: "B",
      score: pct,
      maxScore: 100,
      bandEstimate: pct >= 80 ? "A" : pct >= 65 ? "B" : pct >= 50 ? "C+" : "C",
    });
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;
  const totalCorrect = questions.reduce((acc, q, i) => acc + (answers[i] === q.questions[0].correctAnswer ? 1 : 0), 0);
  const score = questions.length > 0 ? Math.round((totalCorrect / questions.length) * 100) : 0;

  if (phase === "intro") {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <Link href="/practice" className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-blue-800">
          <ArrowLeft className="h-4 w-4" /> All Practice Tests
        </Link>
        <div className="mt-6 flex items-center gap-3">
          <div className="rounded-xl bg-purple-100 p-3 text-purple-700"><Headphones className="h-6 w-6" /></div>
          <h1 className="text-2xl font-bold text-gray-900">Listening Practice Test</h1>
        </div>
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-gray-900">Test Overview</h2>
          <div className="mt-4 space-y-2 text-sm text-gray-600">
            <p>• <strong>Part B:</strong> Short workplace extracts with MCQ questions</p>
            <p>• <strong>Time limit:</strong> 10 minutes</p>
            <p>• <strong>Questions:</strong> Randomized from our question bank</p>
            <p>• <strong>Note:</strong> In the real OET, you would listen to audio recordings. In this practice, the question context is provided as text.</p>
          </div>
          <button onClick={startTest} className="mt-6 inline-flex items-center gap-2 rounded-lg bg-purple-700 px-6 py-3 font-semibold text-white hover:bg-purple-800">
            Start Test <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    );
  }

  if (phase === "results") {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900">Listening Test Results</h1>
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-purple-100">
            <span className="text-3xl font-bold text-purple-800">{score}%</span>
          </div>
          <p className="mt-4 text-lg font-semibold text-gray-900">
            Band Estimate: <span className="text-purple-700">{score >= 80 ? "A" : score >= 65 ? "B" : score >= 50 ? "C+" : "C"}</span>
          </p>
          <p className="mt-2 text-gray-600">{totalCorrect} of {questions.length} correct</p>
        </div>

        <div className="mt-8 space-y-4">
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
          <button onClick={startTest} className="inline-flex items-center gap-2 rounded-lg bg-purple-700 px-6 py-3 font-semibold text-white hover:bg-purple-800">
            <RotateCcw className="h-5 w-5" /> Take New Test
          </button>
          <Link href="/practice" className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50">All Practice Tests</Link>
        </div>
      </div>
    );
  }

  const q = questions[currentQ];
  const question = q.questions[0];

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between rounded-xl bg-gray-100 px-4 py-3">
        <span className="text-sm font-medium text-gray-600">Question {currentQ + 1} of {questions.length}</span>
        <span className={`flex items-center gap-1.5 text-sm font-semibold ${timeLeft < 60 ? "text-red-600" : "text-gray-700"}`}>
          <Clock className="h-4 w-4" /> {formatTime(timeLeft)}
        </span>
      </div>
      <div className="mt-3 h-2 rounded-full bg-gray-200">
        <div className="h-2 rounded-full bg-purple-600 transition-all" style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }} />
      </div>

      {/* Audio placeholder */}
      <div className="mt-6 flex items-center gap-3 rounded-xl border border-purple-200 bg-purple-50 p-4">
        <Volume2 className="h-6 w-6 text-purple-600" />
        <div>
          <p className="text-sm font-medium text-purple-900">Audio Extract (Part {q.part})</p>
          <p className="text-xs text-purple-700">In the real exam, you would listen to an audio recording here.</p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-900">{question.questionText}</h3>
        <div className="mt-4 space-y-3">
          {question.options.map((opt, idx) => (
            <button key={idx} onClick={() => selectAnswer(idx)}
              className={`w-full rounded-xl border-2 p-4 text-left text-sm transition ${
                answers[currentQ] === idx ? "border-purple-600 bg-purple-50 text-purple-900" : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
              }`}>
              <span className="font-semibold mr-2">{String.fromCharCode(65 + idx)}.</span>{opt}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <button onClick={() => setCurrentQ(Math.max(0, currentQ - 1))} disabled={currentQ === 0}
          className="inline-flex items-center gap-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50">
          <ArrowLeft className="h-4 w-4" /> Previous
        </button>
        {currentQ < questions.length - 1 ? (
          <button onClick={() => setCurrentQ(currentQ + 1)}
            className="inline-flex items-center gap-1 rounded-lg bg-purple-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-purple-800">
            Next <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button onClick={finishTest}
            className="inline-flex items-center gap-1 rounded-lg bg-green-700 px-6 py-2.5 text-sm font-medium text-white hover:bg-green-800">
            <CheckCircle className="h-4 w-4" /> Finish Test
          </button>
        )}
      </div>
    </div>
  );
}
