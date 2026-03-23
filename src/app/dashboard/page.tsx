"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {
  BarChart3,
  Calendar,
  Clock,
  Flame,
  Target,
  TrendingUp,
  Headphones,
  BookOpenCheck,
  PenTool,
  MessageSquare,
  ArrowRight,
  AlertCircle,
  ClipboardCheck,
} from "lucide-react";

const subTestIcons = {
  listening: Headphones,
  reading: BookOpenCheck,
  writing: PenTool,
  speaking: MessageSquare,
};

const subTestColors = {
  listening: "text-purple-700 bg-purple-100",
  reading: "text-blue-700 bg-blue-100",
  writing: "text-teal-700 bg-teal-100",
  speaking: "text-amber-700 bg-amber-100",
};

function getBandColor(band: string) {
  if (band === "A") return "text-green-700 bg-green-100";
  if (band === "B") return "text-blue-700 bg-blue-100";
  if (band === "C+") return "text-amber-700 bg-amber-100";
  return "text-red-700 bg-red-100";
}

export default function DashboardPage() {
  const { user, isLoggedIn, progress } = useAuth();

  if (!isLoggedIn) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
          <h2 className="mt-4 text-xl font-semibold text-gray-900">Please log in to view your dashboard</h2>
          <p className="mt-2 text-gray-600">Track your progress and continue your OET preparation.</p>
          <Link href="/auth/login" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-800 px-6 py-3 text-white hover:bg-blue-900">
            Log In <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  const daysUntilExam = user?.targetDate
    ? Math.max(0, Math.ceil((new Date(user.targetDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : null;

  const latestScores = {
    listening: progress.subTestScores.listening.slice(-1)[0] || 0,
    reading: progress.subTestScores.reading.slice(-1)[0] || 0,
    writing: progress.subTestScores.writing.slice(-1)[0] || 0,
    speaking: progress.subTestScores.speaking.slice(-1)[0] || 0,
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Welcome back, {user?.name?.split(" ")[0]} 👋
          </h1>
          <p className="mt-1 text-gray-600">Here&apos;s your OET preparation overview</p>
        </div>
        <div className="flex gap-3">
          <Link href="/practice" className="inline-flex items-center gap-2 rounded-lg bg-blue-800 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-900">
            <ClipboardCheck className="h-4 w-4" /> Take Practice Test
          </Link>
          <Link href="/dashboard/progress" className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <BarChart3 className="h-4 w-4" /> View Progress
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-5">
        {/* Readiness Score */}
        <div className="col-span-2 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-1">
          <p className="text-sm font-medium text-gray-500">Readiness Score</p>
          <div className="mt-3 flex items-center justify-center">
            <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-8 border-blue-200">
              <div className="absolute inset-0 rounded-full" style={{
                background: `conic-gradient(#1E40AF ${progress.averageScore * 3.6}deg, #e5e7eb ${progress.averageScore * 3.6}deg)`,
                mask: "radial-gradient(farthest-side, transparent calc(100% - 8px), black calc(100% - 8px))",
                WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 8px), black calc(100% - 8px))",
                borderRadius: "50%",
              }} />
              <span className="text-2xl font-bold text-blue-800">{progress.averageScore}%</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        {[
          { label: "Tests Completed", value: progress.totalTests, icon: ClipboardCheck, color: "text-blue-700" },
          { label: "Study Streak", value: `${progress.studyStreak} days`, icon: Flame, color: "text-orange-600" },
          { label: "Study Hours", value: progress.totalStudyHours, icon: Clock, color: "text-teal-700" },
          { label: daysUntilExam !== null ? "Days to Exam" : "Set Exam Date", value: daysUntilExam ?? "—", icon: Calendar, color: "text-purple-700" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
            </div>
            <p className="mt-2 text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Sub-test Scores + Recent Activity */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Sub-test Score Cards */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900">Sub-test Performance</h2>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {(["listening", "reading", "writing", "speaking"] as const).map((st) => {
              const Icon = subTestIcons[st];
              const scores = progress.subTestScores[st];
              const latest = scores[scores.length - 1] || 0;
              const prev = scores[scores.length - 2] || 0;
              const trend = latest - prev;
              return (
                <div key={st} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className={`rounded-lg p-2 ${subTestColors[st]}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium capitalize text-gray-700">{st}</span>
                  </div>
                  <div className="mt-3 flex items-end gap-2">
                    <span className="text-2xl font-bold text-gray-900">{latest}%</span>
                    {trend !== 0 && (
                      <span className={`flex items-center gap-0.5 text-sm font-medium ${trend > 0 ? "text-green-600" : "text-red-600"}`}>
                        <TrendingUp className={`h-4 w-4 ${trend < 0 ? "rotate-180" : ""}`} />
                        {Math.abs(trend)}%
                      </span>
                    )}
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-gray-100">
                    <div
                      className="h-2 rounded-full bg-blue-600 transition-all"
                      style={{ width: `${latest}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          <div className="mt-4 space-y-3">
            {progress.recentResults.slice(0, 5).map((result) => {
              const Icon = subTestIcons[result.subTest];
              return (
                <div key={result.id} className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                  <div className={`rounded-lg p-2 ${subTestColors[result.subTest]}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium capitalize text-gray-900">
                      {result.subTest} Part {result.part}
                    </p>
                    <p className="text-xs text-gray-500">{result.date}</p>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getBandColor(result.bandEstimate)}`}>
                    {result.bandEstimate}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Weak Areas */}
      <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-6">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-amber-700" />
          <h2 className="text-lg font-semibold text-amber-900">Areas to Focus On</h2>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {progress.weakAreas.map((area) => (
            <span key={area} className="rounded-full bg-amber-100 px-4 py-1.5 text-sm font-medium text-amber-800">
              {area}
            </span>
          ))}
        </div>
        <Link href="/resources" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-amber-800 hover:text-amber-900">
          Find targeted resources <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Quick Links */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Link href="/dashboard/progress" className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md hover:border-blue-300">
          <BarChart3 className="h-6 w-6 text-blue-700" />
          <h3 className="mt-3 font-semibold text-gray-900">Detailed Progress</h3>
          <p className="mt-1 text-sm text-gray-600">View charts, trends, and complete test history.</p>
        </Link>
        <Link href="/dashboard/settings" className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md hover:border-blue-300">
          <Target className="h-6 w-6 text-teal-700" />
          <h3 className="mt-3 font-semibold text-gray-900">Study Goals</h3>
          <p className="mt-1 text-sm text-gray-600">Set targets and configure your study plan.</p>
        </Link>
        <Link href="/resources" className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md hover:border-blue-300">
          <Target className="h-6 w-6 text-purple-700" />
          <h3 className="mt-3 font-semibold text-gray-900">Recommended Resources</h3>
          <p className="mt-1 text-sm text-gray-600">Materials tailored to your weak areas.</p>
        </Link>
      </div>
    </div>
  );
}
