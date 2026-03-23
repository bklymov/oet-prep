"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { ArrowLeft, Save, CheckCircle } from "lucide-react";

const specialties = [
  "General Medicine", "Surgery", "Paediatrics", "Psychiatry", "Obstetrics & Gynaecology",
  "Emergency Medicine", "Anaesthetics", "Radiology", "Pathology", "Ophthalmology",
  "ENT", "Orthopaedics", "Cardiology", "Neurology", "Dermatology", "Other",
];

export default function SettingsPage() {
  const { user, isLoggedIn, updateProfile } = useAuth();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    specialty: user?.specialty || "",
    country: user?.country || "",
    targetDate: user?.targetDate || "",
    weeklyGoalHours: user?.weeklyGoalHours || 10,
  });

  if (!isLoggedIn) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-gray-600">Please <Link href="/auth/login" className="text-blue-700 underline">log in</Link> to access settings.</p>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSaved(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/dashboard" className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-blue-800">
        <ArrowLeft className="h-4 w-4" /> Back to Dashboard
      </Link>

      <h1 className="mt-4 text-2xl font-bold text-gray-900">Profile Settings</h1>
      <p className="mt-1 text-gray-600">Manage your account and study preferences.</p>

      <form onSubmit={handleSave} className="mt-8 space-y-8">
        {/* Profile Section */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input id="name" name="name" value={form.name} onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input id="email" value={user?.email || ""} disabled
                className="mt-1 block w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-500" />
              <p className="mt-1 text-xs text-gray-400">Email cannot be changed</p>
            </div>
            <div>
              <label htmlFor="specialty" className="block text-sm font-medium text-gray-700">Medical Specialty</label>
              <select id="specialty" name="specialty" value={form.specialty} onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                <option value="">Select specialty...</option>
                {specialties.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
              <input id="country" name="country" value={form.country} onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="e.g. United Kingdom" />
            </div>
          </div>
        </div>

        {/* Study Goals */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">Study Goals</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="targetDate" className="block text-sm font-medium text-gray-700">Target OET Date</label>
              <input id="targetDate" name="targetDate" type="date" value={form.targetDate} onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
            </div>
            <div>
              <label htmlFor="weeklyGoalHours" className="block text-sm font-medium text-gray-700">Weekly Study Goal (hours)</label>
              <input id="weeklyGoalHours" name="weeklyGoalHours" type="number" min="1" max="40" value={form.weeklyGoalHours} onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center gap-4">
          <button type="submit"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-800 px-6 py-3 font-semibold text-white transition hover:bg-blue-900">
            <Save className="h-5 w-5" /> Save Changes
          </button>
          {saved && (
            <span className="inline-flex items-center gap-1 text-sm font-medium text-green-700">
              <CheckCircle className="h-4 w-4" /> Saved successfully!
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
