"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { UserPlus, Eye, EyeOff, GraduationCap, Info } from "lucide-react";

const specialties = [
  "General Medicine", "Surgery", "Paediatrics", "Psychiatry", "Obstetrics & Gynaecology",
  "Emergency Medicine", "Anaesthetics", "Radiology", "Pathology", "Ophthalmology",
  "ENT", "Orthopaedics", "Cardiology", "Neurology", "Dermatology", "Other",
];

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({
    name: "", email: "", password: "", confirmPassword: "", specialty: "", country: "", targetDate: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.password) {
      setError("Please fill in all required fields.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    const success = register({
      name: form.name,
      email: form.email,
      password: form.password,
      specialty: form.specialty,
      country: form.country,
      targetDate: form.targetDate,
    });
    if (success) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="text-center">
          <GraduationCap className="mx-auto h-12 w-12 text-blue-800" />
          <h1 className="mt-4 text-3xl font-bold text-gray-900">Create Your Account</h1>
          <p className="mt-2 text-gray-600">Start your OET preparation journey today</p>
        </div>

        <div className="mt-6 flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
          <p className="text-sm text-amber-800">
            <strong>Demo Mode:</strong> This is a client-side prototype. Passwords are <strong>not stored</strong> — only your profile information is saved locally for the demo experience.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>
          )}

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name *</label>
              <input
                id="name" name="name" type="text" value={form.name} onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="Dr. Jane Smith"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address *</label>
              <input
                id="email" name="email" type="email" value={form.email} onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password *</label>
              <div className="relative mt-1">
                <input
                  id="password" name="password" type={showPassword ? "text" : "password"} value={form.password} onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="••••••••"
                />
                <button
                  type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password *</label>
              <input
                id="confirmPassword" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label htmlFor="specialty" className="block text-sm font-medium text-gray-700">Medical Specialty</label>
              <select
                id="specialty" name="specialty" value={form.specialty} onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="">Select specialty...</option>
                {specialties.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label htmlFor="targetDate" className="block text-sm font-medium text-gray-700">Target OET Date</label>
              <input
                id="targetDate" name="targetDate" type="date" value={form.targetDate} onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          <label className="flex items-start gap-2">
            <input type="checkbox" className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600" required />
            <span className="text-sm text-gray-600">
              I agree to the{" "}
              <button type="button" className="text-blue-700 hover:underline">Terms of Service</button>
              {" "}and{" "}
              <button type="button" className="text-blue-700 hover:underline">Privacy Policy</button>
            </span>
          </label>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-800 px-4 py-3 text-base font-semibold text-white transition hover:bg-blue-900"
          >
            <UserPlus className="h-5 w-5" />
            Create Account
          </button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/auth/login" className="font-semibold text-blue-700 hover:text-blue-800">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
