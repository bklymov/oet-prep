import Link from "next/link";
import { resources } from "@/lib/data";
import { BookOpen, Star, ExternalLink, ArrowLeft, Calendar, BookOpenCheck, Globe, Users } from "lucide-react";

export default function GeneralResourcesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/resources" className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-blue-800">
        <ArrowLeft className="h-4 w-4" /> All Resources
      </Link>
      <div className="mt-4 flex items-center gap-3">
        <div className="rounded-xl bg-gray-100 p-3 text-gray-700"><BookOpen className="h-6 w-6" /></div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">General Resources</h1>
          <p className="mt-1 text-gray-600">OET overview, study plans, vocabulary, and community links</p>
        </div>
      </div>

      {/* Study Plans */}
      <div className="mt-8">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900"><Calendar className="h-5 w-5 text-blue-700" /> Suggested Study Plans</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { weeks: "2 Weeks", description: "Intensive plan for those close to their exam date. 3-4 hours daily, focus on practice tests.", level: "Advanced" },
            { weeks: "4 Weeks", description: "Balanced plan with resource study and regular practice tests. 2-3 hours daily.", level: "Intermediate" },
            { weeks: "8 Weeks", description: "Comprehensive plan for thorough preparation. 1-2 hours daily with gradual difficulty increase.", level: "Beginner" },
          ].map((plan) => (
            <div key={plan.weeks} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">{plan.level}</span>
              <h3 className="mt-3 text-xl font-bold text-gray-900">{plan.weeks} Plan</h3>
              <p className="mt-2 text-sm text-gray-600">{plan.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Community */}
      <div className="mt-10">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900"><Users className="h-5 w-5 text-teal-700" /> Community Resources</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { name: "r/OETforECFMG", url: "https://www.reddit.com/r/OETforECFMG/", desc: "Dedicated OET subreddit for ECFMG pathway" },
            { name: "r/IMGreddit", url: "https://www.reddit.com/r/IMGreddit/", desc: "International Medical Graduate community" },
            { name: "OET Facebook Groups", url: "https://www.facebook.com/groups/", desc: "Peer support and shared materials" },
          ].map((c) => (
            <a key={c.name} href={c.url} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition">
              <Globe className="h-5 w-5 text-blue-700" />
              <h3 className="mt-3 font-semibold text-gray-900">{c.name}</h3>
              <p className="mt-1 text-sm text-gray-600">{c.desc}</p>
            </a>
          ))}
        </div>
      </div>

      {/* Vocabulary & Grammar */}
      <div className="mt-10">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900"><BookOpenCheck className="h-5 w-5 text-purple-700" /> Medical Vocabulary & Grammar</h2>
        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {resources.filter((r) => r.tags.includes("vocabulary") || r.id === "r15").map((r) => (
            <div key={r.id} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">{r.resourceType}</span>
                <div className="flex items-center gap-1 text-amber-500"><Star className="h-4 w-4 fill-current" /><span className="text-sm font-medium text-gray-700">{r.rating}</span></div>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">{r.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{r.description}</p>
              <a href={r.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-blue-700 hover:text-blue-800">Open <ExternalLink className="h-3.5 w-3.5" /></a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
