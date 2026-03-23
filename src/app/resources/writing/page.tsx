"use client";

import Link from "next/link";
import { resources } from "@/lib/data";
import { PenTool, Star, ExternalLink, ArrowLeft } from "lucide-react";

export default function WritingResourcesPage() {
  const filtered = resources.filter((r) => r.subTests.includes("writing"));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/resources" className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-blue-800">
        <ArrowLeft className="h-4 w-4" /> All Resources
      </Link>
      <div className="mt-4 flex items-center gap-3">
        <div className="rounded-xl bg-teal-100 p-3 text-teal-700"><PenTool className="h-6 w-6" /></div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Writing Resources</h1>
          <p className="mt-1 text-gray-600">Materials for OET Writing sub-test preparation</p>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-teal-200 bg-teal-50 p-6">
        <h2 className="font-semibold text-teal-900">OET Writing Format</h2>
        <div className="mt-3 rounded-lg bg-white p-4">
          <p className="font-medium text-gray-900">Letter Writing (45 min)</p>
          <p className="mt-1 text-sm text-gray-600">Read case notes → Write a letter (referral, discharge, transfer, or request). Target: 180-200 words.</p>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {["Referral", "Discharge", "Transfer", "Request"].map((type) => (
            <div key={type} className="rounded-lg bg-white p-3 text-center">
              <p className="text-sm font-medium text-teal-800">{type} Letter</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm text-amber-800">
          <strong>💡 Reddit Tip:</strong> Use ChatGPT for writing practice and instant feedback on your referral letters.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((r) => (
          <div key={r.id} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold capitalize text-teal-700">{r.resourceType}</span>
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
        <Link href="/practice/writing" className="inline-flex items-center gap-2 rounded-lg bg-teal-700 px-6 py-3 font-semibold text-white hover:bg-teal-800">Start Writing Practice →</Link>
      </div>
    </div>
  );
}
