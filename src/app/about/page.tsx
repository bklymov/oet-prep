import { GraduationCap, Heart, Shield, BookOpen } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <GraduationCap className="mx-auto h-12 w-12 text-blue-800" />
        <h1 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">About OETPrep</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
          Built by doctors, for doctors — helping medical professionals worldwide pass the OET exam.
        </p>
      </div>

      <div className="mt-12 space-y-10">
        {/* Mission */}
        <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="flex items-center gap-3">
            <Heart className="h-6 w-6 text-red-500" />
            <h2 className="text-xl font-semibold text-gray-900">Our Mission</h2>
          </div>
          <p className="mt-4 text-gray-700 leading-relaxed">
            OETPrep was created to solve a simple problem: OET preparation resources are scattered across dozens of websites, Google Drive folders, Reddit posts, and YouTube channels. We bring everything together into one organized, intelligent platform.
          </p>
          <p className="mt-3 text-gray-700 leading-relaxed">
            Our goal is to make OET preparation accessible, efficient, and effective for every doctor — whether you&apos;re an IMG pursuing the ECFMG pathway, or a graduate seeking registration in the UK, Australia, or New Zealand.
          </p>
        </section>

        {/* How Resources Are Curated */}
        <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-blue-700" />
            <h2 className="text-xl font-semibold text-gray-900">How We Curate Resources</h2>
          </div>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Our resource library is built from the OET community itself. We analyze recommendations from Reddit communities like r/OETforECFMG and r/IMGreddit, cross-reference success stories, and organize the most consistently recommended materials by sub-test and type.
          </p>
          <p className="mt-3 text-gray-700 leading-relaxed">
            Key sources include the original Reddit compilation &ldquo;All OET Study Material You&apos;ll Ever Need&rdquo; and ongoing community discussions. We link to external resources rather than hosting copyrighted content, ensuring proper attribution.
          </p>
        </section>

        {/* Disclaimer */}
        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-8">
          <div className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-amber-700" />
            <h2 className="text-xl font-semibold text-amber-900">Important Disclaimer</h2>
          </div>
          <div className="mt-4 space-y-3 text-sm text-amber-800">
            <p>• OETPrep is <strong>not affiliated with or endorsed by</strong> Cambridge Boxhill Language Assessment (CBLA), the organization that administers the OET exam.</p>
            <p>• OET® is a registered trademark of Cambridge Boxhill Language Assessment.</p>
            <p>• This platform provides language test preparation resources only — it does not provide medical advice.</p>
            <p>• All external resources are linked rather than hosted, and original creators retain full copyright.</p>
            <p>• Practice test questions are original creations designed to approximate OET format and difficulty — they are not official OET materials.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
