import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ClientProviders from "./providers";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OETPrep — Ace Your OET Exam",
  description:
    "The complete OET preparation platform for doctors. Curated resources, randomized practice tests, and intelligent progress tracking — everything you need to pass the Occupational English Test.",
  keywords: ["OET", "OET preparation", "OET practice test", "medical English", "IMG", "ECFMG", "doctor exam"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
