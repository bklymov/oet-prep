"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What is the OET?",
    answer: "The Occupational English Test (OET) is an international English language test that assesses the language communication skills of healthcare professionals who wish to register and practise in an English-speaking environment. It is available for 12 healthcare professions including medicine, nursing, pharmacy, and dentistry. The test covers four sub-tests: Listening, Reading, Writing, and Speaking.",
  },
  {
    question: "How is the OET scored?",
    answer: "OET uses a grading scale from A (highest) to E (lowest). For most regulatory bodies, a minimum grade of B in each sub-test is required (equivalent to approximately IELTS 7.0). The scores reflect: A (450-500), B (350-440), C+ (300-340), C (200-290), D (100-190), E (0-90). Results are typically available 16 business days after the test.",
  },
  {
    question: "How does this platform differ from official OET practice?",
    answer: "OETPrep is a community-curated preparation platform. Our practice tests are original creations designed to approximate OET format and difficulty — they are not official OET materials. We complement the official OET preparation resources by providing additional practice, progress tracking, and organized access to community-recommended materials. We strongly recommend also using the official free practice tests from oet.com.",
  },
  {
    question: "Is this platform free?",
    answer: "The core features are free: browsing the resource library, taking practice tests, and basic progress tracking. We curate and organize freely available resources from the OET community. Some advanced features like AI-powered writing feedback may be offered as premium features in the future.",
  },
  {
    question: "How are practice tests randomized?",
    answer: "Our randomization engine draws questions from a question bank for each sub-test. Questions are selected randomly with a staleness filter (avoiding recently seen questions), difficulty balancing (mix of easy, medium, and hard), and option shuffling for MCQs. This means you can take multiple practice tests without repetition.",
  },
  {
    question: "Can I use this on my mobile phone?",
    answer: "Yes! OETPrep is built with a mobile-first, responsive design. All features work on phones, tablets, and desktops. We know many doctors study during breaks, commutes, and between shifts — the interface is optimized for quick study sessions on any device.",
  },
  {
    question: "How is my data stored and protected?",
    answer: "Your account data, progress, and test results are stored securely. We do not share your personal information with third parties. You can export your data or delete your account at any time from your profile settings. We comply with GDPR and standard data protection practices.",
  },
  {
    question: "What OET sub-tests does the platform cover?",
    answer: "We cover all four OET sub-tests: Listening (Parts A, B, C with MCQ auto-scoring), Reading (Parts A, B, C with timed practice), Writing (case notes with model answers, self-assessment, and AI feedback), and Speaking (role-play scenarios with recording tools and self-assessment rubrics).",
  },
  {
    question: "Where do the study resources come from?",
    answer: "Our resource library is curated from recommendations by the Reddit OET community, primarily from r/OETforECFMG and r/IMGreddit. Resources include official OET materials, YouTube channels (Official OET, E2 Language, Mission OET), Google Drive collections shared by the community, and third-party platforms. We link to resources rather than hosting them.",
  },
  {
    question: "How can I contribute to the platform?",
    answer: "We welcome community contributions! You can rate and review resources in the library, share your study tips and success stories in the community section, and suggest new resources or report broken links. If you've passed the OET, consider sharing your preparation strategy to help others.",
  },
];

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <HelpCircle className="mx-auto h-12 w-12 text-blue-800" />
        <h1 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">Frequently Asked Questions</h1>
        <p className="mt-3 text-lg text-gray-600">Everything you need to know about OETPrep and the OET exam.</p>
      </div>

      <div className="mt-12 space-y-3">
        {faqs.map((faq, i) => (
          <div key={i} className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <button
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              className="flex w-full items-center justify-between px-6 py-5 text-left"
            >
              <span className="pr-4 text-base font-medium text-gray-900">{faq.question}</span>
              {openIdx === i ? (
                <ChevronUp className="h-5 w-5 shrink-0 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 shrink-0 text-gray-400" />
              )}
            </button>
            {openIdx === i && (
              <div className="border-t border-gray-100 px-6 pb-5 pt-3">
                <p className="text-sm leading-relaxed text-gray-700">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl bg-gray-50 p-8 text-center">
        <h2 className="text-lg font-semibold text-gray-900">Still have questions?</h2>
        <p className="mt-2 text-sm text-gray-600">
          Check the community forums or reach out to fellow OET candidates for advice.
        </p>
      </div>
    </div>
  );
}
