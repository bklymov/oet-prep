import { Resource, WritingCase, SpeakingRoleplay, ReadingPartBC, ListeningPartBC, MCQuestion, SubTest, ResourceType } from "./types";

// ── Resources (from Reddit post) ──
export const resources: Resource[] = [
  {
    id: "r1",
    title: "OET Official Sample Tests",
    description: "Practice with official sample tests from the OET website to familiarize yourself with the exam format. The gold standard for preparation.",
    url: "https://www.oet.com/preparation/free-sample-tests",
    subTests: ["listening", "reading", "writing", "speaking"],
    resourceType: "practice",
    source: "Official OET",
    difficulty: "intermediate",
    rating: 5.0,
    tags: ["official", "sample-test", "all-subtests"],
  },
  {
    id: "r2",
    title: "OET Free Preparation Course",
    description: "Utilize the free course the OET offers covering Days 1-2 format overview and strategies. Includes 4 free practice tests.",
    url: "https://www.oet.com/preparation",
    subTests: ["listening", "reading", "writing", "speaking"],
    resourceType: "guide",
    source: "Official OET",
    difficulty: "beginner",
    rating: 4.8,
    tags: ["official", "free", "course", "beginner-friendly"],
  },
  {
    id: "r3",
    title: "Comprehensive Google Drive Collection",
    description: "Extensive community-compiled folder with reading passages, writing cases, listening audio, and speaking role-plays shared by Reddit users.",
    url: "https://drive.google.com/drive/folders/1NVdBFWSqnswl58pr96BVwTkH1ceT6P-j",
    subTests: ["listening", "reading", "writing", "speaking"],
    resourceType: "pdf",
    source: "Reddit Community",
    difficulty: "intermediate",
    rating: 4.7,
    tags: ["community", "comprehensive", "google-drive"],
  },
  {
    id: "r4",
    title: "Official OET YouTube Channel",
    description: "Official OET YouTube channel providing valuable insights, exam walkthroughs, and practice material demonstrations.",
    url: "https://www.youtube.com/@OfficialOET",
    subTests: ["listening", "reading", "writing", "speaking"],
    resourceType: "video",
    source: "YouTube",
    difficulty: "beginner",
    rating: 4.6,
    tags: ["official", "video", "youtube", "tips"],
  },
  {
    id: "r5",
    title: "E2 Language — OET Preparation",
    description: "Offers helpful tips, practice tests, and live classes. Highly recommended by multiple Reddit users for all sub-tests.",
    url: "https://www.youtube.com/@E2Language",
    subTests: ["listening", "reading", "writing", "speaking"],
    resourceType: "video",
    source: "YouTube",
    difficulty: "intermediate",
    rating: 4.8,
    tags: ["youtube", "tips", "practice", "live-classes"],
  },
  {
    id: "r6",
    title: "Mission OET YouTube Channel",
    description: "Great resource for understanding the exam format with detailed sub-test breakdowns and practice sessions.",
    url: "https://www.youtube.com/@MissionOET",
    subTests: ["listening", "reading", "writing", "speaking"],
    resourceType: "video",
    source: "YouTube",
    difficulty: "intermediate",
    rating: 4.5,
    tags: ["youtube", "format", "breakdown", "practice"],
  },
  {
    id: "r7",
    title: "Maggie Ryan's OET Listening Practice",
    description: "OET Listening practice materials that closely mirror the real exam. Highly praised by Redditors for realistic difficulty level.",
    url: "https://www.youtube.com/results?search_query=maggie+ryan+oet+listening",
    subTests: ["listening"],
    resourceType: "audio",
    source: "YouTube",
    difficulty: "intermediate",
    rating: 4.9,
    tags: ["listening", "realistic", "practice", "audio"],
  },
  {
    id: "r8",
    title: "E2 Language Subscription Platform",
    description: "Premium subscription offering full practice tests, video lessons, and personalized feedback. Recommended alongside Benchmark.",
    url: "https://www.e2language.com",
    subTests: ["listening", "reading", "writing", "speaking"],
    resourceType: "tool",
    source: "E2 Language",
    difficulty: "intermediate",
    rating: 4.5,
    tags: ["premium", "subscription", "full-practice"],
  },
  {
    id: "r9",
    title: "Benchmark OET Practice",
    description: "Comprehensive practice platform recommended by Reddit users for thorough OET preparation across all sub-tests.",
    url: "https://www.benchmarkplatform.com",
    subTests: ["listening", "reading", "writing", "speaking"],
    resourceType: "tool",
    source: "Benchmark",
    difficulty: "intermediate",
    rating: 4.4,
    tags: ["premium", "comprehensive", "practice"],
  },
  {
    id: "r10",
    title: "ChatGPT for Writing & Speaking Practice",
    description: "Use ChatGPT to practice writing referral letters and get instant feedback. Also useful as a speaking role-play partner.",
    url: "https://chat.openai.com",
    subTests: ["writing", "speaking"],
    resourceType: "tool",
    source: "OpenAI",
    difficulty: "intermediate",
    rating: 4.3,
    tags: ["ai", "feedback", "writing", "speaking", "practice"],
  },
  {
    id: "r11",
    title: "r/OETforECFMG Subreddit",
    description: "Dedicated Reddit community for OET preparation, especially for ECFMG pathway. Active discussions, tips, and shared materials.",
    url: "https://www.reddit.com/r/OETforECFMG/",
    subTests: ["listening", "reading", "writing", "speaking"],
    resourceType: "guide",
    source: "Reddit",
    difficulty: "beginner",
    rating: 4.6,
    tags: ["community", "reddit", "ecfmg", "tips"],
  },
  {
    id: "r12",
    title: "OET Reading Speed Drills",
    description: "Timed reading exercises focusing on skimming and scanning — critical skills for Part A. Speed matters a lot in the Reading sub-test.",
    url: "https://www.oet.com/preparation",
    subTests: ["reading"],
    resourceType: "practice",
    source: "Various",
    difficulty: "advanced",
    rating: 4.4,
    tags: ["reading", "speed", "timed", "drills"],
  },
  {
    id: "r13",
    title: "OET Writing Letter Templates",
    description: "Templates for referral, discharge, transfer, and request letters with structure guides and key phrases for each type.",
    url: "https://drive.google.com/drive/folders/1NVdBFWSqnswl58pr96BVwTkH1ceT6P-j",
    subTests: ["writing"],
    resourceType: "pdf",
    source: "Reddit Community",
    difficulty: "beginner",
    rating: 4.7,
    tags: ["writing", "templates", "letters", "structure"],
  },
  {
    id: "r14",
    title: "OET Speaking Role-play Collection",
    description: "Collection of 50+ speaking role-play scenarios organized by medical specialty with candidate and interlocutor cards.",
    url: "https://drive.google.com/drive/folders/1NVdBFWSqnswl58pr96BVwTkH1ceT6P-j",
    subTests: ["speaking"],
    resourceType: "practice",
    source: "Reddit Community",
    difficulty: "intermediate",
    rating: 4.6,
    tags: ["speaking", "role-play", "scenarios", "practice"],
  },
  {
    id: "r15",
    title: "Medical Vocabulary for OET",
    description: "Core medical terms, abbreviations, and collocations frequently tested in the OET exam across all sub-tests.",
    url: "https://www.oet.com/preparation",
    subTests: ["listening", "reading", "writing", "speaking"],
    resourceType: "guide",
    source: "Various",
    difficulty: "beginner",
    rating: 4.3,
    tags: ["vocabulary", "medical-terms", "abbreviations"],
  },
];

// ── Writing Cases (sample question bank) ──
export const writingCases: WritingCase[] = [
  {
    id: "wc1",
    caseNotes: {
      patient: "Mrs. Margaret Thompson",
      age: "72 years old",
      diagnosis: "Type 2 Diabetes Mellitus with peripheral neuropathy",
      history: "Diagnosed with T2DM 15 years ago. Recent HbA1c: 9.2% (target <7%). Complains of tingling and numbness in both feet for 3 months. No foot ulcers on examination. BMI: 32.",
      medications: "Metformin 1g BD, Gliclazide 80mg BD, Atorvastatin 20mg ON, Ramipril 5mg OD",
      socialHistory: "Lives alone. Retired teacher. Limited mobility due to osteoarthritis of knees. Non-smoker. Minimal alcohol intake.",
      plan: "Refer to diabetic specialist for medication review and possible insulin initiation. Needs diabetic foot care assessment. Dietitian referral for weight management.",
    },
    letterType: "referral",
    modelAnswer: `Dear Dr. Harrison,

Re: Mrs. Margaret Thompson, aged 72 years

I am writing to refer Mrs. Thompson for specialist review of her poorly controlled Type 2 Diabetes Mellitus with emerging peripheral neuropathy.

Mrs. Thompson was diagnosed with T2DM fifteen years ago and has been managed in primary care. Despite maximum oral therapy with Metformin 1g twice daily and Gliclazide 80mg twice daily, her most recent HbA1c remains elevated at 9.2%, significantly above the target of less than 7%.

Over the past three months, she has developed progressive tingling and numbness in both feet, suggestive of diabetic peripheral neuropathy. Physical examination revealed reduced sensation to light touch bilaterally, though no foot ulcers were identified. Her BMI is 32.

Mrs. Thompson lives independently, is a retired teacher, and her mobility is limited by concurrent osteoarthritis of both knees. She is a non-smoker with minimal alcohol intake. Her current medications also include Atorvastatin 20mg at night and Ramipril 5mg daily.

I would be grateful if you could review her glycaemic management with consideration of insulin initiation, arrange a comprehensive diabetic foot assessment, and advise on further management of her neuropathic symptoms.

I have also arranged a dietitian referral for weight management support.

Yours sincerely,`,
    keyPoints: [
      "Patient identification with age",
      "Reason for referral clearly stated",
      "Relevant medical history with specific values (HbA1c, BMI)",
      "Current symptoms described with duration",
      "Complete medication list",
      "Social circumstances relevant to care",
      "Specific requests for specialist action",
      "Appropriate tone and format",
    ],
    difficulty: "medium",
    tags: ["diabetes", "referral", "endocrinology"],
  },
  {
    id: "wc2",
    caseNotes: {
      patient: "Mr. James O'Brien",
      age: "45 years old",
      diagnosis: "Community-acquired pneumonia — right lower lobe",
      history: "Presented to ED 5 days ago with 3-day history of productive cough, fever (39.1°C), right-sided pleuritic chest pain. CXR confirmed right lower lobe consolidation. CURB-65 score: 2. Treated with IV Amoxicillin + Clarithromycin for 3 days, stepped down to oral. Improving — afebrile for 48 hours, CRP trending down (180 → 45).",
      medications: "Amoxicillin 500mg TDS (day 5/7), Clarithromycin 500mg BD (day 5/7), Paracetamol PRN",
      socialHistory: "Smoker — 20 pack-years. Works as a construction foreman. Lives with wife and two children. No known drug allergies.",
      plan: "Discharge home today. Complete 7-day antibiotic course. GP follow-up in 1 week. Repeat CXR at 6 weeks. Smoking cessation advice given.",
    },
    letterType: "discharge",
    modelAnswer: `Dear Dr. Patel,

Re: Mr. James O'Brien, aged 45 years — Discharge Summary

I am writing to inform you of the recent admission and discharge of Mr. O'Brien, who was treated for community-acquired pneumonia affecting the right lower lobe.

Mr. O'Brien presented to our Emergency Department five days ago with a three-day history of productive cough, fever of 39.1°C, and right-sided pleuritic chest pain. Chest X-ray confirmed right lower lobe consolidation, and his CURB-65 score was 2, warranting inpatient management.

He was initially treated with intravenous Amoxicillin and Clarithromycin for three days, after which he was stepped down to oral antibiotics given his clinical improvement. He has been afebrile for the past 48 hours and his CRP has decreased significantly from 180 to 45.

Mr. O'Brien is being discharged today to complete a seven-day course of oral Amoxicillin 500mg three times daily and Clarithromycin 500mg twice daily, along with Paracetamol as needed for pain relief. He has no known drug allergies.

I would be grateful if you could arrange a follow-up appointment within one week to assess his recovery and a repeat chest X-ray at six weeks to confirm radiological resolution. Smoking cessation advice has been provided, as Mr. O'Brien has a 20 pack-year smoking history, and ongoing support would be appreciated.

Yours sincerely,`,
    keyPoints: [
      "Clear discharge summary header",
      "Reason for admission",
      "Key investigation results (CXR, CURB-65, CRP trend)",
      "Treatment given during admission",
      "Discharge medications with doses and duration",
      "Follow-up plan with specific timeframes",
      "Request for GP actions (repeat CXR, smoking cessation)",
      "Allergy status mentioned",
    ],
    difficulty: "medium",
    tags: ["pneumonia", "discharge", "respiratory"],
  },
  {
    id: "wc3",
    caseNotes: {
      patient: "Ms. Sarah Kim",
      age: "28 years old",
      diagnosis: "Major depressive disorder — moderate severity",
      history: "6-month history of low mood, anhedonia, poor concentration, insomnia (early morning waking), reduced appetite with 5kg weight loss. PHQ-9 score: 18 (moderately severe). No suicidal ideation. No psychotic features. First episode. Previously well with no psychiatric history.",
      medications: "Sertraline 50mg OD — started 2 weeks ago. No side effects reported so far.",
      socialHistory: "Graduate student — struggling with thesis completion. Relationship breakdown 7 months ago. Supportive family but they live overseas. Non-smoker. Occasional alcohol (2-3 units/week).",
      plan: "Refer for psychological therapy (CBT). Continue Sertraline, review dose at 4 weeks. Encourage self-care, exercise, social engagement. Safety-netting advice given.",
    },
    letterType: "referral",
    modelAnswer: `Dear Colleague,

Re: Ms. Sarah Kim, aged 28 years

I am writing to refer Ms. Kim for cognitive behavioural therapy for a first episode of major depressive disorder of moderate severity.

Ms. Kim has experienced a six-month history of persistent low mood, anhedonia, poor concentration, early morning waking, and reduced appetite resulting in 5kg of weight loss. Her PHQ-9 score is 18, indicating moderately severe depression. Importantly, she denies any suicidal ideation and there are no psychotic features. This is her first depressive episode with no prior psychiatric history.

The onset of her symptoms appears to coincide with a relationship breakdown approximately seven months ago. She is currently a graduate student experiencing difficulties with thesis completion, which is adding to her distress. Her family is supportive but resides overseas, limiting her immediate social support network. She is a non-smoker and consumes alcohol minimally.

Ms. Kim was commenced on Sertraline 50mg daily two weeks ago and has tolerated this well without reported side effects. A dose review is planned at four weeks.

I would appreciate it if she could be assessed for a course of CBT to complement her pharmacological treatment. Self-care strategies, regular exercise, and social engagement have been discussed with her, and safety-netting advice has been provided.

Yours sincerely,`,
    keyPoints: [
      "Clear reason for referral (CBT)",
      "Symptom history with duration and specifics",
      "PHQ-9 score included",
      "Risk assessment mentioned (no suicidal ideation)",
      "Precipitating factors identified",
      "Social context relevant to management",
      "Current medication and tolerability",
      "Specific therapy request",
    ],
    difficulty: "medium",
    tags: ["psychiatry", "referral", "depression", "CBT"],
  },
];

// ── Speaking Role-plays ──
export const speakingRoleplays: SpeakingRoleplay[] = [
  {
    id: "sp1",
    candidateCard: `**Setting:** General Practice Clinic

**Patient:** Mr. David Chen, 55 years old

You have just diagnosed Mr. Chen with Type 2 Diabetes based on his recent blood test results (fasting glucose: 8.5 mmol/L, HbA1c: 7.8%).

**Task:**
- Explain the diagnosis to the patient
- Discuss what Type 2 Diabetes means for his health
- Outline the initial management plan (lifestyle changes, possible medication)
- Address any concerns the patient may have
- Arrange follow-up`,
    interlocutorCard: `**You are Mr. David Chen, 55 years old.**

You have come for your blood test results. You are worried because your father died of complications from diabetes.

**Responses:**
- You are shocked and anxious about the diagnosis
- Ask if this means you will need insulin injections
- Express concern about your father's experience with diabetes
- Ask about diet — you enjoy eating out frequently
- You are willing to make changes but want reassurance`,
    communicationObjectives: [
      "Break bad news sensitively",
      "Explain diagnosis in accessible language",
      "Provide reassurance while being realistic",
      "Discuss lifestyle modifications",
      "Address patient's specific concerns about family history",
      "Demonstrate empathy",
    ],
    setting: "GP Clinic",
    difficulty: "medium",
    tags: ["diabetes", "breaking-bad-news", "GP"],
  },
  {
    id: "sp2",
    candidateCard: `**Setting:** Hospital Ward

**Patient:** Mrs. Helen Murray, 68 years old

Mrs. Murray is due to be discharged tomorrow after a hip replacement surgery 5 days ago. She lives alone in a two-storey house.

**Task:**
- Discuss the discharge plan with the patient
- Explain post-operative care and precautions
- Address mobility and home safety concerns
- Discuss medication changes
- Arrange community support and follow-up`,
    interlocutorCard: `**You are Mrs. Helen Murray, 68 years old.**

You are nervous about going home because you live alone and your house has stairs. Your daughter lives 2 hours away.

**Responses:**
- Express worry about managing stairs at home
- Ask about when you can drive again
- Concerned about pain management after discharge
- Ask about physiotherapy
- You want to know when you can return to bowls (lawn bowling)`,
    communicationObjectives: [
      "Provide clear discharge instructions",
      "Address safety concerns empathetically",
      "Discuss pain management plan",
      "Explain activity restrictions and timeline",
      "Arrange appropriate community support",
      "Ensure patient feels supported",
    ],
    setting: "Hospital Ward",
    difficulty: "medium",
    tags: ["discharge", "orthopaedics", "elderly-care"],
  },
  {
    id: "sp3",
    candidateCard: `**Setting:** Emergency Department

**Patient:** Parent of 4-year-old Lily, who has been brought in with a febrile seizure.

Lily had a 2-minute generalized tonic-clonic seizure at home associated with a temperature of 39.5°C. She has now stopped seizing and is recovering. Examination is normal. Likely viral URTI.

**Task:**
- Explain what happened (febrile seizure)
- Reassure the parent about the benign nature
- Explain when to seek urgent medical help
- Discuss fever management at home
- Address the parent's concerns about epilepsy`,
    interlocutorCard: `**You are the parent of 4-year-old Lily.**

You witnessed your child having a seizure and are extremely frightened. You called an ambulance.

**Responses:**
- You are very distressed and tearful
- Ask repeatedly if your child has epilepsy
- Ask if the seizure has caused brain damage
- Want to know if it will happen again
- Ask what you should do if it happens again at home`,
    communicationObjectives: [
      "Manage highly anxious parent",
      "Explain febrile seizures in simple terms",
      "Provide clear reassurance with evidence",
      "Give safety-netting advice",
      "Demonstrate compassion under pressure",
      "Provide written information offer",
    ],
    setting: "Emergency Department",
    difficulty: "hard",
    tags: ["paediatrics", "emergency", "seizure", "anxious-parent"],
  },
];

// ── Reading Part B Questions ──
export const readingPartB: ReadingPartBC[] = [
  {
    id: "rpb1",
    passage: `STAFF NOTICE — HAND HYGIENE AUDIT RESULTS

The quarterly hand hygiene audit conducted across all wards last month revealed an overall compliance rate of 78%, which falls below our target of 90%. ICU achieved the highest compliance at 92%, while the surgical ward recorded the lowest at 65%. The main areas of non-compliance were failure to perform hand hygiene before patient contact (Moment 1) and after touching patient surroundings (Moment 5). All staff are reminded that the WHO "5 Moments for Hand Hygiene" must be followed at all times. Mandatory refresher training sessions will be held next week — please check your departmental noticeboard for schedule details. Non-attendance will be escalated to line managers.`,
    questions: [
      {
        id: "rpb1q1",
        questionText: "What is the purpose of this notice?",
        options: [
          "To announce a new hand hygiene policy",
          "To report audit findings and mandate refresher training",
          "To congratulate ICU on their performance",
          "To introduce the WHO hand hygiene framework",
        ],
        correctAnswer: 1,
        explanation: "The notice reports the results of a hand hygiene audit (78% compliance, below 90% target) and announces mandatory refresher training sessions.",
      },
    ],
    difficulty: "easy",
    tags: ["infection-control", "workplace-notice"],
    part: "B",
  },
  {
    id: "rpb2",
    passage: `MEDICATION SAFETY ALERT

All prescribers are advised that a national shortage of Amoxicillin 500mg capsules is expected to last until the end of next month. During this period, the pharmacy department will automatically substitute with Amoxicillin 250mg capsules (two capsules to be dispensed per dose) where 500mg is prescribed. No change to prescribing practice is required. For patients who are unable to swallow capsules, Amoxicillin 250mg/5ml oral suspension remains available but stock is limited — please prescribe this formulation only when clinically necessary. Any concerns should be directed to the Chief Pharmacist on ext. 4421.`,
    questions: [
      {
        id: "rpb2q1",
        questionText: "What action should prescribers take regarding Amoxicillin 500mg prescriptions?",
        options: [
          "Switch all patients to oral suspension",
          "Contact the Chief Pharmacist before prescribing",
          "Continue prescribing as usual — pharmacy will substitute",
          "Prescribe an alternative antibiotic",
        ],
        correctAnswer: 2,
        explanation: "The alert states 'No change to prescribing practice is required' — pharmacy will automatically substitute 2x 250mg capsules for each 500mg dose.",
      },
    ],
    difficulty: "easy",
    tags: ["pharmacy", "medication-safety"],
    part: "B",
  },
  {
    id: "rpb3",
    passage: `UPDATED VISITING HOURS POLICY

Effective immediately, visiting hours on all general wards will be extended from 2:00–4:00 PM and 6:00–8:00 PM to 10:00 AM–8:00 PM daily. This change follows patient feedback indicating that restricted visiting times caused significant distress, particularly for elderly patients and those with cognitive impairment. A maximum of two visitors per patient at any one time remains in effect. Visitors displaying symptoms of respiratory illness will be asked to postpone their visit. Paediatric and ICU wards will maintain their existing visiting arrangements, which are managed at the discretion of the ward sister/charge nurse. Staff should direct any visitor queries to the Patient Experience Team on ext. 3350.`,
    questions: [
      {
        id: "rpb3q1",
        questionText: "Which of the following is true about the new visiting policy?",
        options: [
          "ICU visiting hours have also been extended",
          "There is no limit on the number of visitors",
          "General ward visiting is now available for 10 hours daily",
          "The change was prompted by staff feedback",
        ],
        correctAnswer: 2,
        explanation: "The new hours are 10:00 AM–8:00 PM = 10 hours daily. ICU maintains existing arrangements, visitor limit is 2, and the change followed patient (not staff) feedback.",
      },
    ],
    difficulty: "easy",
    tags: ["hospital-policy", "visiting"],
    part: "B",
  },
];

// ── Reading Part C Questions ──
export const readingPartC: ReadingPartBC[] = [
  {
    id: "rpc1",
    passage: `The concept of diagnostic overshadowing in healthcare refers to the tendency of clinicians to attribute physical symptoms to a patient's pre-existing mental health condition, rather than investigating potential physical causes. This phenomenon has been increasingly recognized as a significant contributor to health inequalities experienced by people with mental illness.

Research published in the British Journal of Psychiatry found that patients with schizophrenia were 2.5 times less likely to receive appropriate cardiovascular investigations compared to matched controls without mental illness, even when presenting with identical symptoms. The authors argued that implicit bias, rather than overt discrimination, was the primary driver of this disparity.

The consequences of diagnostic overshadowing can be severe. A systematic review of unexpected deaths in psychiatric inpatients revealed that in 25% of cases, a physical health condition had been either undiagnosed or inadequately treated. Common missed diagnoses included pulmonary embolism, myocardial infarction, and diabetic ketoacidosis.

Several interventions have been proposed to combat diagnostic overshadowing. These include mandatory physical health assessments for all psychiatric admissions, training programs focused on unconscious bias, and the integration of physical health specialists within mental health teams. However, implementation remains patchy, and cultural change within healthcare organizations is recognized as the most challenging but essential component of any lasting solution.`,
    questions: [
      {
        id: "rpc1q1",
        questionText: "According to the passage, diagnostic overshadowing primarily occurs because:",
        options: [
          "Clinicians deliberately ignore physical symptoms in psychiatric patients",
          "Mental health patients rarely present with physical complaints",
          "Clinicians unconsciously attribute physical symptoms to existing mental illness",
          "Physical health specialists refuse to treat psychiatric patients",
        ],
        correctAnswer: 2,
        explanation: "The passage states that 'implicit bias, rather than overt discrimination' drives the disparity, and defines diagnostic overshadowing as the tendency to attribute physical symptoms to pre-existing mental health conditions.",
      },
      {
        id: "rpc1q2",
        questionText: "The systematic review of unexpected deaths found that:",
        options: [
          "Most deaths were caused by medication side effects",
          "A quarter of cases involved undiagnosed or undertreated physical conditions",
          "Pulmonary embolism was the leading cause of death",
          "Deaths could have been prevented with better psychiatric treatment",
        ],
        correctAnswer: 1,
        explanation: "The passage states that 'in 25% of cases, a physical health condition had been either undiagnosed or inadequately treated.'",
      },
      {
        id: "rpc1q3",
        questionText: "What does the author suggest is the most important factor in addressing diagnostic overshadowing?",
        options: [
          "Hiring more physical health specialists",
          "Mandatory physical health assessments",
          "Cultural change within healthcare organizations",
          "Better training in mental health diagnosis",
        ],
        correctAnswer: 2,
        explanation: "The final paragraph identifies 'cultural change within healthcare organizations' as 'the most challenging but essential component of any lasting solution.'",
      },
    ],
    difficulty: "hard",
    tags: ["psychiatry", "health-inequalities", "diagnostic-bias"],
    part: "C",
  },
];

// ── Listening Part B Questions ──
export const listeningPartB: ListeningPartBC[] = [
  {
    id: "lpb1",
    audioUrl: "/audio/placeholder.mp3",
    questions: [
      {
        id: "lpb1q1",
        questionText: "The nurse is explaining the medication schedule. What should the patient do?",
        options: [
          "Take all medications in the morning",
          "Take the antibiotic before meals and the pain relief after",
          "Skip the evening dose if feeling better",
          "Double the dose if a dose is missed",
        ],
        correctAnswer: 1,
        explanation: "The nurse clearly states that the antibiotic should be taken before meals and the pain relief medication after meals.",
      },
    ],
    difficulty: "easy",
    tags: ["medication", "nursing"],
    part: "B",
  },
  {
    id: "lpb2",
    audioUrl: "/audio/placeholder.mp3",
    questions: [
      {
        id: "lpb2q1",
        questionText: "What is the main concern the physiotherapist raises about the patient's recovery?",
        options: [
          "The patient is not attending therapy sessions",
          "The patient is doing too much physical activity too soon",
          "The patient refuses to use walking aids",
          "The patient's wound is not healing properly",
        ],
        correctAnswer: 1,
        explanation: "The physiotherapist expresses concern that the patient is being too active and risking re-injury by not following the gradual return-to-activity plan.",
      },
    ],
    difficulty: "easy",
    tags: ["physiotherapy", "rehabilitation"],
    part: "B",
  },
];

// ── Utility: Get resources by sub-test ──
export function getResourcesBySubTest(subTest: SubTest): Resource[] {
  return resources.filter((r) => r.subTests.includes(subTest));
}

export function getResourcesByType(type: ResourceType): Resource[] {
  return resources.filter((r) => r.resourceType === type);
}

export function searchResources(query: string): Resource[] {
  const lower = query.toLowerCase();
  return resources.filter(
    (r) =>
      r.title.toLowerCase().includes(lower) ||
      r.description.toLowerCase().includes(lower) ||
      r.tags.some((t) => t.toLowerCase().includes(lower))
  );
}
