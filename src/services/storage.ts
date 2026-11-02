import { UserStats, SimulationAssessment, QuizResult } from '../types';

const STORAGE_KEY = 'counselmate_user_data_v1';

const INITIAL_SAMPLE_ASSESSMENTS: SimulationAssessment[] = [
  {
    id: 'eval-sample-1',
    caseId: 'case-hypertension-amlodipine',
    caseTitle: 'First-time Hypertension Regimen',
    patientName: 'Budi Santoso',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(),
    durationSeconds: 420,
    overallScore: 88,
    overallGrade: 'Proficient',
    competencies: [
      { id: 'c1', code: 'INTRO', name: 'Introduction & Patient Identification', description: 'Confirm identity and introduce role.', score: 95, weight: 10, grade: 'Excellent', whatYouDidWell: 'Verified 2 patient identifiers smoothly.', whatYouMissed: 'None.', betterPhrasingExample: 'Good phrasing.', matchedRulesCount: 2 },
      { id: 'c2', code: 'GATHER', name: 'Gathering Patient Information', description: 'Used IHS Prime Questions.', score: 90, weight: 10, grade: 'Excellent', whatYouDidWell: 'Asked what doctor told patient.', whatYouMissed: 'None.', betterPhrasingExample: 'Good phrasing.', matchedRulesCount: 1 },
      { id: 'c3', code: 'MED_HIST', name: 'Medication History & Allergy Screening', description: 'Screened allergies and OTCs.', score: 85, weight: 10, grade: 'Good', whatYouDidWell: 'Discovered OTC Ibuprofen use.', whatYouMissed: 'Prompt about herbal remedies.', betterPhrasingExample: 'Ask about herbals.', matchedRulesCount: 1 },
      { id: 'c4', code: 'INSTR', name: 'Understanding of Medication Instructions', description: 'Explained dose, frequency, timing.', score: 90, weight: 15, grade: 'Excellent', whatYouDidWell: 'Specified once daily in evening.', whatYouMissed: 'None.', betterPhrasingExample: 'Good phrasing.', matchedRulesCount: 2 },
      { id: 'c5', code: 'BENEFIT', name: 'Explanation of Medication Benefits', description: 'Physiological mechanism.', score: 85, weight: 10, grade: 'Good', whatYouDidWell: 'Explained blood vessel relaxation.', whatYouMissed: 'Explain kidney protection explicitly.', betterPhrasingExample: 'Mention kidney protection.', matchedRulesCount: 1 },
      { id: 'c6', code: 'SIDE_FX', name: 'Explanation of Potential Side Effects', description: 'Ankle edema, orthostatic dizziness.', score: 85, weight: 10, grade: 'Good', whatYouDidWell: 'Explained ankle edema and slow standing.', whatYouMissed: 'Check for shortness of breath.', betterPhrasingExample: 'Ask about SOB.', matchedRulesCount: 1 },
      { id: 'c7', code: 'LIFESTYLE', name: 'Lifestyle & Non-Pharmacological Counseling', description: 'Low sodium, smoking reduction.', score: 85, weight: 10, grade: 'Good', whatYouDidWell: 'Addressed salted road snacks.', whatYouMissed: 'Reinforce hydration.', betterPhrasingExample: 'Drink plain water.', matchedRulesCount: 1 },
      { id: 'c8', code: 'TEACHBACK', name: 'Patient Understanding & Teach-Back', description: 'Conducted open teach-back.', score: 90, weight: 10, grade: 'Excellent', whatYouDidWell: 'Asked patient to explain evening routine.', whatYouMissed: 'None.', betterPhrasingExample: 'Good phrasing.', matchedRulesCount: 1 },
      { id: 'c9', code: 'COMM_SKILLS', name: 'Communication Skills & Empathy', description: 'Tone and jargon avoidance.', score: 85, weight: 10, grade: 'Good', whatYouDidWell: 'Empathetic and reassuring demeanor.', whatYouMissed: 'Avoid clinical terms.', betterPhrasingExample: 'Plain language.', matchedRulesCount: 1 },
      { id: 'c10', code: 'CLOSE', name: 'Closing the Counseling Session', description: 'Invited questions and provided contacts.', score: 90, weight: 5, grade: 'Excellent', whatYouDidWell: 'Provided pharmacy phone number.', whatYouMissed: 'None.', betterPhrasingExample: 'Good phrasing.', matchedRulesCount: 1 }
    ],
    strengths: [
      'Outstanding rapport and respectful identity verification.',
      'Successfully identified hidden OTC Ibuprofen use and recommended Paracetamol.',
      'Clear, supportive Teach-Back verification.'
    ],
    areasForImprovement: [
      'Explicitly emphasize kidney-protective benefits to dismantle persistent patient myths.'
    ],
    recommendations: [
      'Remind patients that high blood pressure is asymptomatic and must be managed continuously.'
    ],
    missedCrucialPoints: [],
    transcript: []
  },
  {
    id: 'eval-sample-2',
    caseId: 'case-gastritis-omeprazole',
    caseTitle: 'Chronic GERD & Acid Reflux',
    patientName: 'David Chen',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 68).toISOString(),
    durationSeconds: 380,
    overallScore: 84,
    overallGrade: 'Proficient',
    competencies: [
      { id: 'c1', code: 'INTRO', name: 'Introduction & Patient Identification', description: 'Patient verification.', score: 90, weight: 10, grade: 'Excellent', whatYouDidWell: 'Strong opening.', whatYouMissed: 'None.', betterPhrasingExample: '', matchedRulesCount: 2 },
      { id: 'c2', code: 'GATHER', name: 'Gathering Patient Information', description: 'Prime questions.', score: 80, weight: 10, grade: 'Good', whatYouDidWell: 'Asked about nighttime heartburn.', whatYouMissed: 'Inquire about antacid frequency.', betterPhrasingExample: '', matchedRulesCount: 1 },
      { id: 'c3', code: 'MED_HIST', name: 'Medication History & Allergy Screening', description: 'Allergies and OTCs.', score: 80, weight: 10, grade: 'Good', whatYouDidWell: 'Screened allergies.', whatYouMissed: 'Screen for OTC Tums.', betterPhrasingExample: '', matchedRulesCount: 1 },
      { id: 'c4', code: 'INSTR', name: 'Understanding of Medication Instructions', description: 'Morning before breakfast timing.', score: 95, weight: 15, grade: 'Excellent', whatYouDidWell: 'Emphasized 30-60 mins before breakfast.', whatYouMissed: 'None.', betterPhrasingExample: '', matchedRulesCount: 2 },
      { id: 'c5', code: 'BENEFIT', name: 'Explanation of Medication Benefits', description: 'PPI mechanism and delayed onset.', score: 85, weight: 10, grade: 'Good', whatYouDidWell: 'Explained takes 1-4 days for peak effect.', whatYouMissed: 'None.', betterPhrasingExample: '', matchedRulesCount: 1 },
      { id: 'c6', code: 'SIDE_FX', name: 'Explanation of Potential Side Effects', description: 'Headache and rebound hyperacidity.', score: 75, weight: 10, grade: 'Good', whatYouDidWell: 'Mentioned mild headache.', whatYouMissed: 'Discuss 4-week course completion.', betterPhrasingExample: '', matchedRulesCount: 1 },
      { id: 'c7', code: 'LIFESTYLE', name: 'Lifestyle & Non-Pharmacological Counseling', description: 'Espresso reduction & elevated sleep.', score: 90, weight: 10, grade: 'Excellent', whatYouDidWell: 'Addressed late-night dining and caffeine.', whatYouMissed: 'None.', betterPhrasingExample: '', matchedRulesCount: 1 },
      { id: 'c8', code: 'TEACHBACK', name: 'Patient Understanding & Teach-Back', description: 'Verification of timing.', score: 85, weight: 10, grade: 'Good', whatYouDidWell: 'Patient verified swallowing whole with water.', whatYouMissed: 'None.', betterPhrasingExample: '', matchedRulesCount: 1 },
      { id: 'c9', code: 'COMM_SKILLS', name: 'Communication Skills & Empathy', description: 'Tone and clarity.', score: 80, weight: 10, grade: 'Good', whatYouDidWell: 'Clear and structured explanation.', whatYouMissed: 'Acknowledge pain distress.', betterPhrasingExample: '', matchedRulesCount: 1 },
      { id: 'c10', code: 'CLOSE', name: 'Closing the Counseling Session', description: 'Closing and follow-up.', score: 85, weight: 5, grade: 'Good', whatYouDidWell: 'Provided contact details.', whatYouMissed: 'None.', betterPhrasingExample: '', matchedRulesCount: 1 }
    ],
    strengths: [
      'Mastered the strict pre-breakfast administration timing rule (30-60 mins).',
      'Educated on swallowing capsule whole without chewing beads.',
      'Comprehensive lifestyle recommendations tailored to software engineer schedule.'
    ],
    areasForImprovement: [
      'Brief patient on the difference between emergency antacid relief vs mucosal healing.'
    ],
    recommendations: [
      'Practice acknowledging patient acute discomfort with deeper initial empathy.'
    ],
    missedCrucialPoints: [],
    transcript: []
  }
];

const INITIAL_SAMPLE_QUIZZES: QuizResult[] = [
  { id: 'qr-1', category: 'Framework', date: 'Yesterday', score: 2, total: 2, percentage: 100 },
  { id: 'qr-2', category: 'Administration', date: '3 days ago', score: 2, total: 2, percentage: 100 },
  { id: 'qr-3', category: 'Side Effects', date: '5 days ago', score: 1, total: 2, percentage: 50 },
  { id: 'qr-4', category: 'Pharmacology', date: '1 week ago', score: 2, total: 2, percentage: 100 }
];

export function getUserStats(): UserStats {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to load user stats from localStorage', e);
  }

  // Initial rich sample stats
  const defaultStats: UserStats = {
    sessionsCompleted: 14,
    totalTimeMinutes: 128,
    averageScore: 86,
    streakDays: 5,
    completedCaseIds: ['case-hypertension-amlodipine', 'case-gastritis-omeprazole'],
    savedAssessments: INITIAL_SAMPLE_ASSESSMENTS,
    quizResults: INITIAL_SAMPLE_QUIZZES
  };

  saveUserStats(defaultStats);
  return defaultStats;
}

export function saveUserStats(stats: UserStats): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch (e) {
    console.error('Failed to save user stats to localStorage', e);
  }
}

export function recordNewAssessment(assessment: SimulationAssessment): UserStats {
  const current = getUserStats();
  const updatedAssessments = [assessment, ...current.savedAssessments];
  const totalScore = updatedAssessments.reduce((sum, item) => sum + item.overallScore, 0);
  const newAverage = Math.round(totalScore / updatedAssessments.length);

  const completedIds = Array.from(new Set([...current.completedCaseIds, assessment.caseId]));

  const updated: UserStats = {
    ...current,
    sessionsCompleted: current.sessionsCompleted + 1,
    totalTimeMinutes: current.totalTimeMinutes + Math.round(assessment.durationSeconds / 60),
    averageScore: newAverage,
    completedCaseIds: completedIds,
    savedAssessments: updatedAssessments
  };

  saveUserStats(updated);
  return updated;
}

export function recordQuizCompletion(result: QuizResult): UserStats {
  const current = getUserStats();
  const updatedQuizzes = [result, ...current.quizResults];
  const updated: UserStats = {
    ...current,
    quizResults: updatedQuizzes
  };
  saveUserStats(updated);
  return updated;
}
