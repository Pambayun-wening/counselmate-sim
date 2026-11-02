export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type EmotionalMood = 'neutral' | 'curious' | 'anxious' | 'confused' | 'reassured' | 'relieved' | 'skeptical' | 'grateful' | 'surprised';

export interface Prescription {
  medicationName: string;
  genericName: string;
  brandName?: string;
  strength: string;
  dosageForm: string; // e.g. "Tablet", "Capsule", "Oral Solution"
  directions: string; // e.g. "Take 1 tablet once daily at night"
  frequency: string;
  timing: string;
  duration?: string;
  quantity: string;
  refills: number;
  prescriber: string;
  prescribedFor: string;
}

export interface PatientProfile {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female';
  occupation: string;
  avatarUrl: string;
  diagnosis: string;
  diseaseCategory: 'Cardiovascular' | 'Endocrine' | 'Gastrointestinal' | 'Infectious Disease' | 'Dyslipidemia';
  chiefComplaint: string;
  isFirstTimeUser: boolean;
  baselineMood: EmotionalMood;
  communicationStyle: string; // e.g., "Polite but slightly anxious and rushed"
}

export interface HiddenPatientInfo {
  allergies: string[];
  concurrentMedications: string[];
  otcAndSupplements: string[];
  lifestyleDiet: string[];
  vitalSignsOrLabs: string;
  hiddenMisconceptionsOrFears: string[];
  revealedMap: Record<string, boolean>; // e.g., { 'allergies': false, 'nsaid': false, 'grapefruit': false }
}

export interface CounselingChecklist {
  id: string;
  competencyId: string;
  label: string;
  description: string;
  keywords: string[];
  completed: boolean;
}

export interface CounselingCase {
  id: string;
  title: string;
  subtitle: string;
  difficulty: DifficultyLevel;
  diseaseCategory: 'Cardiovascular' | 'Endocrine' | 'Gastrointestinal' | 'Infectious Disease' | 'Dyslipidemia';
  estimatedMinutes: number;
  tags: string[];
  patient: PatientProfile;
  prescription: Prescription;
  hiddenInfo: HiddenPatientInfo;
  learningObjectives: string[];
  suggestedPromptCategories: {
    categoryName: string;
    prompts: string[];
  }[];
  dialogueRules: DialogueRule[];
}

export interface DialogueRule {
  id: string;
  triggerKeywords: string[];
  intent: string;
  competencyTarget: string;
  patientResponse: string;
  moodReaction?: EmotionalMood;
  revealsHiddenKey?: string;
  marksChecklistItemId?: string;
  followUpPromptSuggestion?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'pharmacist' | 'patient' | 'system';
  text: string;
  timestamp: string;
  mood?: EmotionalMood;
  matchedCompetency?: string;
  revealedInfoNotification?: string;
}

export interface CompetencyEvaluation {
  id: string;
  code: string;
  name: string;
  description: string;
  score: number; // 0-100
  weight: number;
  grade: 'Excellent' | 'Good' | 'Fair' | 'Needs Improvement';
  whatYouDidWell: string;
  whatYouMissed: string;
  betterPhrasingExample: string;
  matchedRulesCount: number;
}

export interface SimulationAssessment {
  id: string;
  caseId: string;
  caseTitle: string;
  patientName: string;
  timestamp: string;
  durationSeconds: number;
  overallScore: number;
  overallGrade: 'Distinction' | 'Proficient' | 'Developing' | 'Needs Practice';
  competencies: CompetencyEvaluation[];
  strengths: string[];
  areasForImprovement: string[];
  recommendations: string[];
  missedCrucialPoints: string[];
  transcript: ChatMessage[];
}

export interface QuizQuestion {
  id: string;
  category: 'Framework' | 'Administration' | 'Side Effects' | 'Communication' | 'Pharmacology';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  clinicalPearl: string;
}

export interface QuizResult {
  id: string;
  category: string;
  date: string;
  score: number;
  total: number;
  percentage: number;
}

export interface UserStats {
  sessionsCompleted: number;
  totalTimeMinutes: number;
  averageScore: number;
  streakDays: number;
  completedCaseIds: string[];
  savedAssessments: SimulationAssessment[];
  quizResults: QuizResult[];
}
