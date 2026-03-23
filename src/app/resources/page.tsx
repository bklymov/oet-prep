"use client";

import { useState } from "react";
import Link from "next/link";
import { resources } from "@/lib/data";
import type { SubTest, ResourceType } from "@/lib/types";
import {
  Search,
  Star,
  ExternalLink,
  Headphones,
  BookOpenCheck,
  PenTool,
  MessageSquare,
  Filter,
  BookOpen,
} from "lucide-react";

const subTestFilters: { value: SubTest | "all"; label: string }[] = [
  { value: "all", label: "All Sub-tests" },
  { value: "listening", label: "Listening" },
  { value: "reading", label: "Reading" },
  { value: "writing", label: "Writing" },
  { value: "speaking", label: "Speaking" },
];

const typeFilters: { value: ResourceType | "all"; label: string }[] = [
  { value: "all", label: "All Types" },
  { value: "video", label: "Video" },
  { value: "pdf", label: "PDF / Document" },
  { value: "practice", label: "Practice" },
  { value: "guide", label: "Guide" },
  { value: "audio", label: "Audio" },
  { value: "tool", label: "Tool / Platform" },
];

const subTestIcon = {
  listening: Headphones,
  reading: BookOpenCheck,
  writing: PenTool,
  speaking: MessageSquare,
};

const typeColors: Record<string, string> = {
  video: "bg-red-100 text-red-700",
  pdf: "bg-blue-100 text-blue-700",
  practice: "bg-green-100 text-green-700",
  guide: "bg-purple-100 text-purple-700",
  audio: "bg-amber-100 text-amber-700",
  tool: "bg-teal-100 text-teal-700",
};

export default function ResourcesPage() {
  const [search, setSearch] = useState("");
  const [subTestFilter, setSubTestFilter] = useState<SubTest | "all">("all");
  const [typeFilter, setTypeFilter] = useState<ResourceType | "all">("all");

  const filtered = resources.filter((r) => {
    const matchSearch = search === "" ||
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase());
    const matchSubTest = subTestFilter === "all" || r.subTests.includes(subTestFilter);
    const matchType = typeFilter === "all" || r.resourceType === typeFilter;
    return matchSearch && matchSubTest && matchType;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <BookOpen className="h-8 w-8 text-blue-800" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Resource Library</h1>
          <p className="mt-1 text-gray-600">Community-curated OET preparation materials</p>
        </div>
      </div>

      {/* Sub-test Quick Links */}
      <div className="mt-6 flex flex-wrap gap-3">
        {["listening", "reading", "writing", "speaking", "general"].map((st) => (
          <Link
            key={st}
            href={`/resources/${st}`}
            className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium capitalize text-gray-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-800"
          >
            {st} Resources →
          </Link>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search resources..."
            className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <select
              value={subTestFilter}
              onChange={(e) => setSubTestFilter(e.target.value as SubTest | "all")}
              className="rounded-lg border border-gray-300 pl-9 pr-8 py-3 text-sm text-gray-700 focus:border-blue-500 focus:outline-none"
            >
              {subTestFilters.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
            </select>
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as ResourceType | "all")}
            className="rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-700 focus:border-blue-500 focus:outline-none"
          >
            {typeFilters.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
          </select>
        </div>
      </div>

      {/* Results Count */}
      <p className="mt-4 text-sm text-gray-500">{filtered.length} resource{filtered.length !== 1 ? "s" : ""} found</p>

      {/* Resource Grid */}
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((resource) => (
          <div key={resource.id} className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            {/* Type Badge */}
            <div className="flex items-center justify-between">
              <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${typeColors[resource.resourceType] || "bg-gray-100 text-gray-700"}`}>
                {resource.resourceType}
              </span>
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-sm font-medium text-gray-700">{resource.rating}</span>
              </div>
            </div>

            {/* Title & Description */}
            <h3 className="mt-4 text-lg font-semibold text-gray-900">{resource.title}</h3>
            <p className="mt-2 flex-1 text-sm text-gray-600 line-clamp-3">{resource.description}</p>

            {/* Sub-test Tags */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {resource.subTests.map((st) => {
                const Icon = subTestIcon[st];
                return (
                  <span key={st} className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium capitalize text-gray-600">
                    <Icon className="h-3 w-3" /> {st}
                  </span>
                );
              })}
            </div>

            {/* Source & Link */}
            <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
              <span className="text-xs text-gray-500">{resource.source}</span>
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-blue-700 hover:text-blue-800"
              >
                Open <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-12 text-center">
          <p className="text-lg text-gray-500">No resources match your filters.</p>
          <button onClick={() => { setSearch(""); setSubTestFilter("all"); setTypeFilter("all"); }}
            className="mt-4 text-sm font-medium text-blue-700 hover:text-blue-800">
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
