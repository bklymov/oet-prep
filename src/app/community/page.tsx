import Link from "next/link";
import { Users, ExternalLink, MessageCircle, Heart, Globe } from "lucide-react";

const communities = [
  {
    name: "r/OETforECFMG",
    description: "Dedicated subreddit for OET preparation, especially for the ECFMG English pathway. Active discussions, study tips, score reports, and shared materials.",
    url: "https://www.reddit.com/r/OETforECFMG/",
    members: "5K+",
    platform: "Reddit",
  },
  {
    name: "r/IMGreddit",
    description: "The largest International Medical Graduate community on Reddit. General IMG advice including OET preparation strategies and resource sharing.",
    url: "https://www.reddit.com/r/IMGreddit/",
    members: "30K+",
    platform: "Reddit",
  },
  {
    name: "OET Preparation Facebook Groups",
    description: "Multiple active Facebook groups dedicated to OET study, peer support, practice partners, and shared materials.",
    url: "https://www.facebook.com/groups/",
    members: "Various",
    platform: "Facebook",
  },
];

const tips = [
  { title: "Share Your Score Report", desc: "Posting your score breakdown helps others learn what to focus on." },
  { title: "Find a Speaking Partner", desc: "Many community members look for practice partners for the Speaking sub-test." },
  { title: "Ask Specific Questions", desc: "Instead of 'How do I prepare?', ask about specific sub-tests or question types." },
  { title: "Give Back", desc: "Once you pass, share what worked for you to help the next cohort." },
];

export default function CommunityPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <Users className="h-8 w-8 text-blue-800" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">OET Community</h1>
          <p className="mt-1 text-gray-600">Connect with fellow doctors preparing for the OET exam</p>
        </div>
      </div>

      {/* Communities */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        {communities.map((c) => (
          <a key={c.name} href={c.url} target="_blank" rel="noopener noreferrer"
            className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-blue-300">
            <div className="flex items-center justify-between">
              <Globe className="h-6 w-6 text-blue-700" />
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">{c.platform}</span>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900 group-hover:text-blue-800">{c.name}</h3>
            <p className="mt-2 text-sm text-gray-600">{c.description}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-gray-500">{c.members} members</span>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-blue-700">
                Visit <ExternalLink className="h-3.5 w-3.5" />
              </span>
            </div>
          </a>
        ))}
      </div>

      {/* Community Tips */}
      <div className="mt-12 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-red-500" />
          <h2 className="text-xl font-semibold text-gray-900">Community Tips</h2>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {tips.map((tip) => (
            <div key={tip.title} className="rounded-xl bg-gray-50 p-5">
              <h3 className="font-medium text-gray-900">{tip.title}</h3>
              <p className="mt-1 text-sm text-gray-600">{tip.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Success Stories CTA */}
      <div className="mt-12 rounded-2xl bg-gradient-to-r from-blue-800 to-teal-700 p-8 text-center text-white">
        <MessageCircle className="mx-auto h-8 w-8" />
        <h2 className="mt-4 text-2xl font-bold">Passed the OET?</h2>
        <p className="mt-2 text-blue-100">Share your success story and help inspire other doctors on their journey.</p>
        <Link href="/about" className="mt-6 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-blue-800 transition hover:bg-blue-50">
          Share Your Story
        </Link>
      </div>
    </div>
  );
}
