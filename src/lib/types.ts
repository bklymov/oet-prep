export interface User {
  id: string;
  name: string;
  email: string;
  specialty: string;
  country: string;
  targetDate: string;
  weeklyGoalHours: number;
  createdAt: string;
}

export type SubTest = "listening" | "reading" | "writing" | "speaking";
export type Difficulty = "easy" | "medium" | "hard";
export type ResourceType = "video" | "pdf" | "practice" | "guide" | "audio" | "tool";
export type LetterType = "referral" | "discharge" | "transfer" | "request";

export interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  subTests: SubTest[];
  resourceType: ResourceType;
  source: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  rating: number;
  tags: string[];
}

export interface MCQuestion {
  id: string;
  questionText: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface ListeningPartA {
  id: string;
  audioUrl: string;
  noteTemplate: string;
  blanks: { index: number; answer: string }[];
  difficulty: Difficulty;
  tags: string[];
}

export interface ListeningPartBC {
  id: string;
  audioUrl: string;
  questions: MCQuestion[];
  difficulty: Difficulty;
  tags: string[];
  part: "B" | "C";
}

export interface ReadingPartA {
  id: string;
  texts: string[];
  summaryWithBlanks: string;
  answers: string[];
  difficulty: Difficulty;
  tags: string[];
}

export interface ReadingPartBC {
  id: string;
  passage: string;
  questions: MCQuestion[];
  difficulty: Difficulty;
  tags: string[];
  part: "B" | "C";
}

export interface WritingCase {
  id: string;
  caseNotes: {
    patient: string;
    age: string;
    diagnosis: string;
    history: string;
    medications: string;
    socialHistory: string;
    plan: string;
  };
  letterType: LetterType;
  modelAnswer: string;
  keyPoints: string[];
  difficulty: Difficulty;
  tags: string[];
}

export interface SpeakingRoleplay {
  id: string;
  candidateCard: string;
  interlocutorCard: string;
  communicationObjectives: string[];
  setting: string;
  difficulty: Difficulty;
  tags: string[];
}

export interface TestSession {
  id: string;
  userId: string;
  testType: "full" | SubTest;
  status: "in_progress" | "completed" | "abandoned";
  startedAt: string;
  completedAt?: string;
  timeSpentSeconds: number;
}

export interface TestResult {
  id: string;
  sessionId: string;
  subTest: SubTest;
  part: string;
  score: number;
  maxScore: number;
  bandEstimate: string;
  date: string;
}

export interface ProgressData {
  totalTests: number;
  averageScore: number;
  studyStreak: number;
  totalStudyHours: number;
  subTestScores: Record<SubTest, number[]>;
  recentResults: TestResult[];
  weakAreas: string[];
}
