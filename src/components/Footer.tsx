import Link from "next/link";
import { GraduationCap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-lg font-bold text-blue-800">
              <GraduationCap className="h-6 w-6" />
              <span>OET<span className="text-teal-600">Prep</span></span>
            </Link>
            <p className="mt-3 text-sm text-gray-600">
              The complete OET preparation platform for doctors. Curated resources, randomized practice tests, and intelligent progress tracking.
            </p>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">Resources</h3>
            <ul className="mt-4 space-y-2">
              {["Listening", "Reading", "Writing", "Speaking", "General"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/resources/${item.toLowerCase()}`}
                    className="text-sm text-gray-600 hover:text-blue-800"
                  >
                    {item} Resources
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Practice */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">Practice</h3>
            <ul className="mt-4 space-y-2">
              {["Full Test", "Listening", "Reading", "Writing", "Speaking"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/practice/${item.toLowerCase().replace(" ", "-")}`}
                    className="text-sm text-gray-600 hover:text-blue-800"
                  >
                    {item} Practice
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">Company</h3>
            <ul className="mt-4 space-y-2">
              {[
                { label: "About", href: "/about" },
                { label: "FAQ", href: "/faq" },
                { label: "Community", href: "/community" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-gray-600 hover:text-blue-800">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6">
          <p className="text-center text-xs text-gray-500">
            © {new Date().getFullYear()} OETPrep. All rights reserved. This platform is not affiliated with or endorsed by Cambridge Boxhill Language Assessment (OET). OET is a registered trademark of Cambridge Boxhill Language Assessment.
          </p>
        </div>
      </div>
    </footer>
  );
}
