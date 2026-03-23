"use client";

import Link from "next/link";
import { resources } from "@/lib/data";
import { MessageSquare, Star, ExternalLink, ArrowLeft } from "lucide-react";

export default function SpeakingResourcesPage() {
  const filtered = resources.filter((r) => r.subTests.includes("speaking"));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/resources" className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-blue-800">
        <ArrowLeft className="h-4 w-4" /> All Resources
      </Link>
      <div className="mt-4 flex items-center gap-3">
        <div className="rounded-xl bg-amber-100 p-3 text-amber-700"><MessageSquare className="h-6 w-6" /></div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Speaking Resources</h1>
          <p className="mt-1 text-gray-600">Materials for OET Speaking sub-test preparation</p>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-6">
        <h2 className="font-semibold text-amber-900">OET Speaking Format</h2>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-lg bg-white p-4">
            <p className="font-medium text-gray-900">Role-play 1 (5 min)</p>
            <p className="mt-1 text-sm text-gray-600">Professional role-play scenario with 2-3 min prep time</p>
          </div>
          <div className="rounded-lg bg-white p-4">
            <p className="font-medium text-gray-900">Role-play 2 (5 min)</p>
            <p className="mt-1 text-sm text-gray-600">Second professional role-play scenario</p>
          </div>
        </div>
        <div className="mt-3 rounded-lg bg-white p-4">
          <p className="text-sm text-gray-700"><strong>Assessment criteria:</strong> Intelligibility &amp; Fluency, Appropriateness of Language, Resources of Grammar &amp; Expression, Discourse Management, Pronunciation</p>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-4">
        <p className="text-sm text-blue-800">
          <strong>💡 Reddit Tip:</strong> Practice speaking role-plays with a partner or use ChatGPT as an AI interlocutor for realistic practice.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((r) => (
          <div key={r.id} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold capitalize text-amber-700">{r.resourceType}</span>
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="h-4 w-4 fill-current" /><span className="text-sm font-medium text-gray-700">{r.rating}</span>
              </div>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">{r.title}</h3>
            <p className="mt-2 text-sm text-gray-600 line-clamp-3">{r.description}</p>
            <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
              <span className="text-xs text-gray-500">{r.source}</span>
              <a href={r.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-medium text-blue-700 hover:text-blue-800">Open <ExternalLink className="h-3.5 w-3.5" /></a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link href="/practice/speaking" className="inline-flex items-center gap-2 rounded-lg bg-amber-600 px-6 py-3 font-semibold text-white hover:bg-amber-700">Start Speaking Practice →</Link>
      </div>
    </div>
  );
}
