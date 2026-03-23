"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import type { User, TestResult, ProgressData, SubTest } from "@/lib/types";

// ── DEMO MODE ──
// This is a client-side demo authentication system. No real backend exists.
// Passwords are NEVER stored. All data lives in localStorage for demo purposes.
// For production, replace with a proper auth provider (NextAuth.js, Supabase Auth, etc.).

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => boolean;
  register: (data: Partial<User> & { email: string; password: string; name: string }) => boolean;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  progress: ProgressData;
  addTestResult: (result: Omit<TestResult, "id" | "date">) => void;
}

const defaultProgress: ProgressData = {
  totalTests: 12,
  averageScore: 74,
  studyStreak: 5,
  totalStudyHours: 32,
  subTestScores: {
    listening: [68, 72, 75, 78, 80],
    reading: [62, 65, 70, 72, 74],
    writing: [70, 72, 74, 76, 78],
    speaking: [65, 68, 70, 72, 75],
  },
  recentResults: [
    { id: "tr1", sessionId: "s1", subTest: "listening", part: "B", score: 80, maxScore: 100, bandEstimate: "B", date: "2026-03-20" },
    { id: "tr2", sessionId: "s2", subTest: "reading", part: "C", score: 74, maxScore: 100, bandEstimate: "B", date: "2026-03-19" },
    { id: "tr3", sessionId: "s3", subTest: "writing", part: "A", score: 78, maxScore: 100, bandEstimate: "B", date: "2026-03-18" },
    { id: "tr4", sessionId: "s4", subTest: "speaking", part: "A", score: 75, maxScore: 100, bandEstimate: "B", date: "2026-03-17" },
    { id: "tr5", sessionId: "s5", subTest: "listening", part: "A", score: 70, maxScore: 100, bandEstimate: "C+", date: "2026-03-15" },
  ],
  weakAreas: ["Reading Part A — Speed", "Listening Part C — Inference", "Writing — Conciseness"],
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function isValidUser(obj: unknown): obj is User {
  if (!obj || typeof obj !== "object") return false;
  const u = obj as Record<string, unknown>;
  return (
    typeof u.id === "string" &&
    typeof u.email === "string" &&
    typeof u.name === "string" &&
    typeof u.createdAt === "string"
  );
}

function safeParseUsers(raw: string | null): User[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isValidUser);
  } catch {
    return [];
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [progress, setProgress] = useState<ProgressData>(defaultProgress);

  useEffect(() => {
    const stored = localStorage.getItem("oet_user");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (isValidUser(parsed)) {
          setUser(parsed);
        } else {
          localStorage.removeItem("oet_user");
        }
      } catch {
        localStorage.removeItem("oet_user");
      }
    }
  }, []);

  const login = useCallback((email: string, _password: string): boolean => {
    // Check if the email was previously registered (passwords are not stored)
    const storedUsers = safeParseUsers(localStorage.getItem("oet_users"));
    const found = storedUsers.find((u) => u.email === email);
    if (found) {
      setUser(found);
      localStorage.setItem("oet_user", JSON.stringify(found));
      return true;
    }
    // Demo fallback — create a session for any email so users can explore the app
    const demoUser: User = {
      id: uuidv4(),
      name: email.split("@")[0],
      email,
      specialty: "General Medicine",
      country: "United Kingdom",
      targetDate: "2026-06-15",
      weeklyGoalHours: 10,
      createdAt: new Date().toISOString(),
    };
    setUser(demoUser);
    localStorage.setItem("oet_user", JSON.stringify(demoUser));
    return true;
  }, []);

  const register = useCallback((data: Partial<User> & { email: string; password: string; name: string }): boolean => {
    // Only profile data is persisted — passwords are never stored
    const newUser: User = {
      id: uuidv4(),
      name: data.name,
      email: data.email,
      specialty: data.specialty || "",
      country: data.country || "",
      targetDate: data.targetDate || "",
      weeklyGoalHours: data.weeklyGoalHours || 10,
      createdAt: new Date().toISOString(),
    };
    const storedUsers = safeParseUsers(localStorage.getItem("oet_users"));
    if (storedUsers.some((u) => u.email === data.email)) {
      return false; // Email already registered
    }
    storedUsers.push(newUser);
    localStorage.setItem("oet_users", JSON.stringify(storedUsers));
    setUser(newUser);
    localStorage.setItem("oet_user", JSON.stringify(newUser));
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("oet_user");
  }, []);

  const updateProfile = useCallback((data: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...data };
      localStorage.setItem("oet_user", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const addTestResult = useCallback((result: Omit<TestResult, "id" | "date">) => {
    const newResult: TestResult = {
      ...result,
      id: uuidv4(),
      date: new Date().toISOString().split("T")[0],
    };
    setProgress((prev) => ({
      ...prev,
      totalTests: prev.totalTests + 1,
      recentResults: [newResult, ...prev.recentResults.slice(0, 9)],
      subTestScores: {
        ...prev.subTestScores,
        [result.subTest]: [...prev.subTestScores[result.subTest as SubTest], result.score],
      },
    }));
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn: !!user, login, register, logout, updateProfile, progress, addTestResult }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
