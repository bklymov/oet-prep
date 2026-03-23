"use client";

import Link from "next/link";
import { resources } from "@/lib/data";
import { Headphones, Star, ExternalLink, ArrowLeft } from "lucide-react";

export default function ListeningResourcesPage() {
  const filtered = resources.filter((r) => r.subTests.includes("listening"));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/resources" className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-blue-800">
        <ArrowLeft className="h-4 w-4" /> All Resources
      </Link>

      <div className="mt-4 flex items-center gap-3">
        <div className="rounded-xl bg-purple-100 p-3 text-purple-700">
          <Headphones className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Listening Resources</h1>
          <p className="mt-1 text-gray-600">Materials for OET Listening sub-test preparation</p>
        </div>
      </div>

      {/* Format Reference */}
      <div className="mt-8 rounded-2xl border border-purple-200 bg-purple-50 p-6">
        <h2 className="font-semibold text-purple-900">OET Listening Format</h2>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-lg bg-white p-4">
            <p className="font-medium text-gray-900">Part A</p>
            <p className="mt-1 text-sm text-gray-600">Consultation extract — note-taking (~24 blanks)</p>
          </div>
          <div className="rounded-lg bg-white p-4">
            <p className="font-medium text-gray-900">Part B</p>
            <p className="mt-1 text-sm text-gray-600">6 short workplace extracts — MCQ</p>
          </div>
          <div className="rounded-lg bg-white p-4">
            <p className="font-medium text-gray-900">Part C</p>
            <p className="mt-1 text-sm text-gray-600">2 longer extracts — MCQ (3 questions each)</p>
          </div>
        </div>
      </div>

      {/* Tip */}
      <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm text-amber-800">
          <strong>💡 Reddit Tip:</strong> &ldquo;I felt OET listening by Maggie Ryan was pretty close to the real exam.&rdquo; — r/OETforECFMG user
        </p>
      </div>

      {/* Resources */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((r) => (
          <div key={r.id} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold capitalize text-purple-700">{r.resourceType}</span>
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-sm font-medium text-gray-700">{r.rating}</span>
              </div>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">{r.title}</h3>
            <p className="mt-2 text-sm text-gray-600 line-clamp-3">{r.description}</p>
            <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
              <span className="text-xs text-gray-500">{r.source}</span>
              <a href={r.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-medium text-blue-700 hover:text-blue-800">
                Open <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link href="/practice/listening" className="inline-flex items-center gap-2 rounded-lg bg-purple-700 px-6 py-3 font-semibold text-white hover:bg-purple-800">
          Start Listening Practice →
        </Link>
      </div>
    </div>
  );
}
