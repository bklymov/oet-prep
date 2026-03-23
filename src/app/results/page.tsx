import Link from "next/link";
import { BarChart3, ArrowRight, RotateCcw } from "lucide-react";

export default function ResultsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 text-center">
      <BarChart3 className="mx-auto h-12 w-12 text-blue-800" />
      <h1 className="mt-4 text-2xl font-bold text-gray-900">Test Results</h1>
      <p className="mt-2 text-gray-600">
        Your detailed results are displayed immediately after completing each practice test.
        Visit your dashboard to see your complete test history and progress analytics.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Link href="/dashboard/progress" className="inline-flex items-center gap-2 rounded-lg bg-blue-800 px-6 py-3 font-semibold text-white hover:bg-blue-900">
          View Progress <ArrowRight className="h-5 w-5" />
        </Link>
        <Link href="/practice" className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50">
          <RotateCcw className="h-5 w-5" /> Take Another Test
        </Link>
      </div>
    </div>
  );
}
