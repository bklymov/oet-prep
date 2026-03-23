"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {
  ArrowLeft,
  TrendingUp,
  Headphones,
  BookOpenCheck,
  PenTool,
  MessageSquare,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  Legend,
} from "recharts";

const subTestIcons = {
  listening: Headphones,
  reading: BookOpenCheck,
  writing: PenTool,
  speaking: MessageSquare,
};

function getBandColor(band: string) {
  if (band === "A") return "text-green-700 bg-green-100";
  if (band === "B") return "text-blue-700 bg-blue-100";
  if (band === "C+") return "text-amber-700 bg-amber-100";
  return "text-red-700 bg-red-100";
}

export default function ProgressPage() {
  const { progress, isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-gray-600">Please <Link href="/auth/login" className="text-blue-700 underline">log in</Link> to view progress.</p>
      </div>
    );
  }

  // Prepare line chart data
  const maxLen = Math.max(
    progress.subTestScores.listening.length,
    progress.subTestScores.reading.length,
    progress.subTestScores.writing.length,
    progress.subTestScores.speaking.length
  );
  const lineData = Array.from({ length: maxLen }, (_, i) => ({
    test: `Test ${i + 1}`,
    Listening: progress.subTestScores.listening[i] ?? null,
    Reading: progress.subTestScores.reading[i] ?? null,
    Writing: progress.subTestScores.writing[i] ?? null,
    Speaking: progress.subTestScores.speaking[i] ?? null,
  }));

  // Radar chart data
  const radarData = [
    { subject: "Listening", score: progress.subTestScores.listening.slice(-1)[0] || 0 },
    { subject: "Reading", score: progress.subTestScores.reading.slice(-1)[0] || 0 },
    { subject: "Writing", score: progress.subTestScores.writing.slice(-1)[0] || 0 },
    { subject: "Speaking", score: progress.subTestScores.speaking.slice(-1)[0] || 0 },
  ];

  // Study time bar data (simulated)
  const studyTimeData = [
    { name: "Listening", hours: 10 },
    { name: "Reading", hours: 8 },
    { name: "Writing", hours: 9 },
    { name: "Speaking", hours: 5 },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/dashboard" className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-blue-800">
        <ArrowLeft className="h-4 w-4" /> Back to Dashboard
      </Link>

      <h1 className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl">Progress & Analytics</h1>
      <p className="mt-1 text-gray-600">Track your improvement over time across all sub-tests.</p>

      {/* Score Trends */}
      <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
          <TrendingUp className="h-5 w-5 text-blue-700" /> Score Trends Over Time
        </h2>
        <div className="mt-4 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="test" tick={{ fontSize: 12 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Listening" stroke="#7c3aed" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="Reading" stroke="#1d4ed8" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="Writing" stroke="#0d9488" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="Speaking" stroke="#d97706" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Radar Chart */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">Sub-test Proficiency</h2>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
                <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
                <Radar name="Score" dataKey="score" stroke="#1E40AF" fill="#1E40AF" fillOpacity={0.2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Study Time */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">Study Time by Sub-test</h2>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={studyTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="hours" fill="#0d9488" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Test History Table */}
      <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Complete Test History</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="pb-3 font-semibold text-gray-600">Date</th>
                <th className="pb-3 font-semibold text-gray-600">Sub-test</th>
                <th className="pb-3 font-semibold text-gray-600">Part</th>
                <th className="pb-3 font-semibold text-gray-600">Score</th>
                <th className="pb-3 font-semibold text-gray-600">Band</th>
              </tr>
            </thead>
            <tbody>
              {progress.recentResults.map((r) => {
                const Icon = subTestIcons[r.subTest];
                return (
                  <tr key={r.id} className="border-b border-gray-100">
                    <td className="py-3 text-gray-700">{r.date}</td>
                    <td className="py-3">
                      <span className="inline-flex items-center gap-1.5 capitalize text-gray-900">
                        <Icon className="h-4 w-4" /> {r.subTest}
                      </span>
                    </td>
                    <td className="py-3 text-gray-700">Part {r.part}</td>
                    <td className="py-3 text-gray-900 font-medium">{r.score}/{r.maxScore}</td>
                    <td className="py-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getBandColor(r.bandEstimate)}`}>
                        {r.bandEstimate}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
