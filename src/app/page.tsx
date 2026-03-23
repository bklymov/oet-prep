import Link from "next/link";
import {
  BookOpen,
  ClipboardCheck,
  BarChart3,
  Headphones,
  BookOpenCheck,
  PenTool,
  MessageSquare,
  ArrowRight,
  Star,
  Users,
  FileQuestion,
  CheckCircle2,
} from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Curated Resource Library",
    description: "Community-vetted study materials organized by sub-test, sourced from Reddit's top OET communities.",
  },
  {
    icon: ClipboardCheck,
    title: "Randomized Practice Tests",
    description: "No two tests are the same — our engine generates unique tests that mirror the real OET format.",
  },
  {
    icon: BarChart3,
    title: "Smart Progress Tracking",
    description: "Know exactly where you stand with detailed analytics, score trends, and weakness identification.",
  },
];

const subTests = [
  { icon: Headphones, name: "Listening", color: "bg-purple-100 text-purple-700", description: "Part A consultation notes, Part B & C multiple choice — with realistic audio practice." },
  { icon: BookOpenCheck, name: "Reading", color: "bg-blue-100 text-blue-700", description: "Speed drills for Part A, workplace texts for Part B, and comprehension passages for Part C." },
  { icon: PenTool, name: "Writing", color: "bg-teal-100 text-teal-700", description: "Case note practice with model answers, self-assessment rubrics, and AI-powered feedback." },
  { icon: MessageSquare, name: "Speaking", color: "bg-amber-100 text-amber-700", description: "50+ role-play scenarios with recording tools, self-assessment, and AI practice partner." },
];

const stats = [
  { value: "500+", label: "Curated Resources" },
  { value: "1,000+", label: "Practice Questions" },
  { value: "4", label: "Sub-tests Covered" },
  { value: "50+", label: "Role-play Scenarios" },
];

const testimonials = [
  { quote: "I passed OET on my first attempt using these exact resources. The practice tests were incredibly close to the real thing.", author: "Verified Reddit User", source: "r/OETforECFMG" },
  { quote: "The progress tracking helped me identify that Reading was my weakest area. I focused my study time there and went from C+ to B.", author: "IMG Doctor", source: "r/IMGreddit" },
  { quote: "Having all the resources in one place saved me weeks of searching. The writing feedback feature is a game-changer.", author: "OET Candidate", source: "r/OETforECFMG" },
];

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700">
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Ace Your <span className="text-amber-400">OET Exam</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-blue-100 sm:text-xl">
              The complete preparation platform for doctors. Curated resources, randomized practice tests, and intelligent progress tracking — everything you need in one place.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/practice"
                className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-8 py-4 text-lg font-semibold text-gray-900 shadow-lg transition hover:bg-amber-400 hover:shadow-xl"
              >
                Start Free Practice
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/auth/register"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 px-8 py-4 text-lg font-semibold text-white transition hover:border-white hover:bg-white/10"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-blue-800">{stat.value}</p>
                <p className="mt-1 text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Everything You Need to Succeed</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">Built by doctors, for doctors — with resources curated from the OET community.</p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition hover:shadow-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-800">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-gray-900">{feature.title}</h3>
                <p className="mt-3 text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-gray-900 sm:text-4xl">How It Works</h2>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              { step: "1", title: "Create Your Profile", desc: "Set your exam date, specialty, and study goals. We personalize your experience from day one.", icon: Users },
              { step: "2", title: "Study & Practice", desc: "Access curated resources and take randomized practice tests that mirror the real OET format.", icon: FileQuestion },
              { step: "3", title: "Track & Improve", desc: "Monitor your progress, identify weak areas, and get recommendations to optimize your study time.", icon: CheckCircle2 },
            ].map((item) => (
              <div key={item.step} className="relative text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-800 text-2xl font-bold text-white">{item.step}</div>
                <h3 className="mt-6 text-xl font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-3 text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sub-test Cards */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-gray-900 sm:text-4xl">Prepare for Every Sub-test</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-gray-600">Comprehensive coverage of all four OET sub-tests with targeted resources and practice.</p>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {subTests.map((st) => (
              <Link key={st.name} href={`/resources/${st.name.toLowerCase()}`} className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-blue-300">
                <div className={`inline-flex rounded-xl p-3 ${st.color}`}>
                  <st.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900 group-hover:text-blue-800">{st.name}</h3>
                <p className="mt-2 text-sm text-gray-600">{st.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-700">Explore <ArrowRight className="h-4 w-4" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-gray-900 sm:text-4xl">Trusted by Doctors Worldwide</h2>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <div key={i} className="rounded-2xl border border-gray-200 bg-white p-8">
                <div className="flex gap-1 text-amber-400">
                  {[...Array(5)].map((_, j) => <Star key={j} className="h-5 w-5 fill-current" />)}
                </div>
                <p className="mt-4 text-gray-700">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-6">
                  <p className="text-sm font-semibold text-gray-900">{t.author}</p>
                  <p className="text-sm text-gray-500">{t.source}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-800 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Ready to Start Your OET Journey?</h2>
          <p className="mt-4 text-lg text-blue-100">Join thousands of doctors who are preparing smarter, not harder.</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/auth/register" className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-8 py-4 text-lg font-semibold text-gray-900 transition hover:bg-amber-400">
              Get Started Free <ArrowRight className="h-5 w-5" />
            </Link>
            <Link href="/resources" className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 px-8 py-4 text-lg font-semibold text-white transition hover:border-white hover:bg-white/10">
              Browse Resources
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
