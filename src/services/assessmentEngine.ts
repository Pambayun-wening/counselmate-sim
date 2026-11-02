import { CounselingCase, ChatMessage, SimulationAssessment, CompetencyEvaluation } from '../types';

export function evaluateCounselingSession(
  counselingCase: CounselingCase,
  transcript: ChatMessage[],
  durationSeconds: number,
  revealedKeys: Record<string, boolean>
): SimulationAssessment {
  const pharmacistMessages = transcript.filter(m => m.sender === 'pharmacist');
  const fullText = pharmacistMessages.map(m => m.text.toLowerCase()).join(' ');

  // 1. Introduction and Patient Identification
  const hasGreeting = containsAny(fullText, ['hello', 'hi', 'good morning', 'good afternoon', 'pharmacist']);
  const hasIdentityCheck = containsAny(fullText, ['name', 'date of birth', 'confirm', 'identify', 'budi', 'sarah', 'david', 'maya', 'robert']);
  const hasTimeConsent = containsAny(fullText, ['minute', 'time', 'discuss', 'speak with you', 'consultation']);
  const introScore = calculateScore([hasGreeting, hasIdentityCheck, hasTimeConsent], [35, 45, 20]);

  // 2. Gathering Patient Information
  const hasPrimeQuestion = containsAny(fullText, ['what did the doctor tell you', 'what is this for', 'reason for prescription', 'doctor explain', 'bring you in']);
  const hasSymptomsCheck = containsAny(fullText, ['feel', 'symptom', 'pain', 'pressure', 'how are you', 'bothering']);
  const gatheringScore = calculateScore([hasPrimeQuestion, hasSymptomsCheck], [60, 40]);

  // 3. Medication History Assessment
  const hasAllergyCheck = containsAny(fullText, ['allergy', 'allergic', 'reaction', 'bad reaction']);
  const hasConcurrentMeds = containsAny(fullText, ['other medicine', 'other medication', 'supplements', 'vitamins', 'herbal', 'over the counter', 'pain reliever', 'otc', 'aspirin', 'ibuprofen', 'contraceptive']);
  const medHistoryScore = calculateScore([hasAllergyCheck, hasConcurrentMeds], [50, 50]);

  // 4. Understanding of Medication Instructions
  const hasDoseInfo = containsAny(fullText, ['take 1', 'one tablet', 'one capsule', '5 mg', '500 mg', '20 mg', 'dose']);
  const hasFrequencyTiming = containsAny(fullText, ['once daily', 'twice daily', 'every 8 hours', 'evening', 'bedtime', 'morning', 'before breakfast', 'with food', 'with meals']);
  const hasMissedDose = containsAny(fullText, ['missed dose', 'forget', 'forgot', 'double up', 'skip']);
  const instructionsScore = calculateScore([hasDoseInfo, hasFrequencyTiming, hasMissedDose], [35, 40, 25]);

  // 5. Explanation of Medication Benefits & Mechanism
  const hasMechanism = containsAny(fullText, ['works by', 'relaxes blood vessels', 'insulin', 'acid pumps', 'kill bacteria', 'cholesterol', 'liver', 'protect']);
  const hasGoalExplanation = containsAny(fullText, ['blood pressure', 'heart', 'kidney', 'sugar', 'healing', 'strep', 'stroke']);
  const benefitsScore = calculateScore([hasMechanism, hasGoalExplanation], [50, 50]);

  // 6. Explanation of Potential Side Effects
  const hasSideEffects = containsAny(fullText, ['side effect', 'ankle', 'swelling', 'nausea', 'diarrhea', 'cramp', 'muscle pain', 'rash', 'dizzy', 'dizziness']);
  const hasManagementTips = containsAny(fullText, ['stand up slowly', 'take with meals', 'paracetamol', 'water', 'stop', 'contact us', 'call']);
  const sideEffectsScore = calculateScore([hasSideEffects, hasManagementTips], [55, 45]);

  // 7. Lifestyle Counseling
  const hasDietAdvice = containsAny(fullText, ['salt', 'sodium', 'diet', 'food', 'wine', 'alcohol', 'coffee', 'espresso', 'grapefruit']);
  const hasActivityOrHabit = containsAny(fullText, ['exercise', 'smoking', 'cigarette', 'sleep', 'rest', 'bed', 'stress']);
  const lifestyleScore = calculateScore([hasDietAdvice, hasActivityOrHabit], [50, 50]);

  // 8. Patient Understanding and Teach-Back
  const hasTeachBackPrompt = containsAny(fullText, ['teach back', 'repeat', 'explain back', 'how will you take', 'in your own words', 'make sure i explained', 'summarize']);
  const teachBackScore = calculateScore([hasTeachBackPrompt, pharmacistMessages.length >= 4], [70, 30]);

  // 9. Communication Skills
  const turnCount = pharmacistMessages.length;
  const isPoliteAndEmpathetic = containsAny(fullText, ['please', 'thank', 'understand', 'glad', 'worry', 'help', 'reassure', 'feel']);
  const avoidsSevereJargon = !containsAny(fullText, ['dihydropyridine antagonist', 'h recirculation', 'microsomal clearance']);
  const commScore = calculateScore([turnCount >= 5, isPoliteAndEmpathetic, avoidsSevereJargon], [35, 35, 30]);

  // 10. Closing the Counseling Session
  const hasClosingOffer = containsAny(fullText, ['any question', 'anything else', 'help with', 'questions for me']);
  const hasFollowUpContact = containsAny(fullText, ['call us', 'contact', 'refill', 'pharmacy', 'phone number', 'have a good day', 'take care']);
  const closingScore = calculateScore([hasClosingOffer, hasFollowUpContact], [50, 50]);

  // Competency Definitions
  const competencies: CompetencyEvaluation[] = [
    {
      id: 'c1',
      code: 'INTRO',
      name: 'Introduction & Patient Identification',
      description: 'Confirming patient identity with 2 identifiers, introducing pharmacist role, and seeking counseling consent.',
      score: introScore,
      weight: 10,
      grade: getGradeTier(introScore),
      whatYouDidWell: introScore >= 70 ? 'Politely greeted patient and verified identity.' : 'Initiated conversation with the patient.',
      whatYouMissed: introScore < 80 ? 'Ensure you consistently confirm two identifiers (Full Name & DOB) and state estimated counseling duration.' : 'Consistently maintain this high standard.',
      betterPhrasingExample: '"Hello Mr. Budi, I am your pharmacist today. May I confirm your full name and date of birth before we review your new prescription?"',
      matchedRulesCount: hasGreeting && hasIdentityCheck ? 2 : 1
    },
    {
      id: 'c2',
      code: 'GATHER',
      name: 'Gathering Patient Information',
      description: 'Using open-ended Prime Questions to assess patient baseline knowledge and current symptoms.',
      score: gatheringScore,
      weight: 10,
      grade: getGradeTier(gatheringScore),
      whatYouDidWell: gatheringScore >= 60 ? 'Asked about the patient’s doctor visit and reason for prescription.' : 'Engaged in preliminary dialogue.',
      whatYouMissed: gatheringScore < 70 ? 'Use the first IHS Prime Question: "What did the doctor tell you this medication is for?"' : 'Keep prime questions conversational and open-ended.',
      betterPhrasingExample: '"What did your doctor explain regarding the purpose of this medication and what to expect?"',
      matchedRulesCount: hasPrimeQuestion ? 1 : 0
    },
    {
      id: 'c3',
      code: 'MED_HIST',
      name: 'Medication History & Allergy Screening',
      description: 'Screening for drug/food allergies, OTC products, herbal supplements, and potential interactions.',
      score: medHistoryScore,
      weight: 10,
      grade: getGradeTier(medHistoryScore),
      whatYouDidWell: medHistoryScore >= 50 ? 'Inquired about allergies or other products the patient takes.' : 'Addressed medication usage.',
      whatYouMissed: medHistoryScore < 75 ? 'Always ask specifically about over-the-counter painkillers (like Ibuprofen) and herbal supplements.' : 'Excellent thoroughness in interaction screening.',
      betterPhrasingExample: '"Are you currently taking any other prescription medications, over-the-counter pain relievers, or herbal supplements?"',
      matchedRulesCount: hasAllergyCheck ? 1 : 0
    },
    {
      id: 'c4',
      code: 'INSTR',
      name: 'Understanding of Medication Instructions',
      description: 'Providing precise dose, frequency, timing (morning/evening, with food), and missed-dose rules.',
      score: instructionsScore,
      weight: 15,
      grade: getGradeTier(instructionsScore),
      whatYouDidWell: instructionsScore >= 60 ? 'Explained dose administration and daily schedule clearly.' : 'Mentioned the prescription regimen.',
      whatYouMissed: instructionsScore < 75 ? 'Remember to explicitly teach what to do if a dose is accidentally forgotten (never double up).' : 'Clear and actionable administration instructions.',
      betterPhrasingExample: '"Take one tablet once daily in the evening. If you forget, take it when you remember, but never take two pills at once."',
      matchedRulesCount: hasDoseInfo ? 2 : 1
    },
    {
      id: 'c5',
      code: 'BENEFIT',
      name: 'Explanation of Medication Benefits',
      description: 'Explaining physiological mechanism in plain language and connecting it to long-term health protection.',
      score: benefitsScore,
      weight: 10,
      grade: getGradeTier(benefitsScore),
      whatYouDidWell: benefitsScore >= 60 ? 'Described how the medication works to protect health.' : 'Highlighted positive outcomes.',
      whatYouMissed: benefitsScore < 70 ? 'Use everyday metaphors (e.g. relaxing the pipes of the body) to demystify complex pharmacology.' : 'Great job connecting drug action to patient health.',
      betterPhrasingExample: '"Amlodipine works by relaxing your blood vessels so your heart doesn’t have to work as hard, protecting your kidneys and brain."',
      matchedRulesCount: hasMechanism ? 1 : 0
    },
    {
      id: 'c6',
      code: 'SIDE_FX',
      name: 'Explanation of Potential Side Effects',
      description: 'Preparing the patient for common benign adverse effects and identifying red flags requiring urgent care.',
      score: sideEffectsScore,
      weight: 10,
      grade: getGradeTier(sideEffectsScore),
      whatYouDidWell: sideEffectsScore >= 60 ? 'Alerted the patient to potential side effects and management tips.' : 'Discussed safety precautions.',
      whatYouMissed: sideEffectsScore < 70 ? 'Highlight the difference between expected mild symptoms vs red flags that require calling the pharmacy.' : 'Balanced safety information without causing unnecessary alarm.',
      betterPhrasingExample: '"You may notice mild ankle swelling or slight dizziness when standing up fast. If swelling becomes severe, please call our clinic."',
      matchedRulesCount: hasSideEffects ? 1 : 0
    },
    {
      id: 'c7',
      code: 'LIFESTYLE',
      name: 'Lifestyle & Non-Pharmacological Counseling',
      description: 'Advising on dietary modifications, exercise, smoking cessation, and food-drug interactions.',
      score: lifestyleScore,
      weight: 10,
      grade: getGradeTier(lifestyleScore),
      whatYouDidWell: lifestyleScore >= 50 ? 'Gave practical lifestyle and dietary recommendations.' : 'Addressed wellness factors.',
      whatYouMissed: lifestyleScore < 70 ? 'Identify specific triggers relevant to the patient’s occupation and daily routine (e.g., sodium, caffeine, grapefruit).' : 'Comprehensive holistic patient counseling.',
      betterPhrasingExample: '"Cutting back slightly on salty snacks and drinking more water while driving will help your medication work at its best."',
      matchedRulesCount: hasDietAdvice ? 1 : 0
    },
    {
      id: 'c8',
      code: 'TEACHBACK',
      name: 'Patient Understanding & Teach-Back',
      description: 'Using supportive, open-ended verification to assess comprehension rather than asking "Do you understand?".',
      score: teachBackScore,
      weight: 10,
      grade: getGradeTier(teachBackScore),
      whatYouDidWell: teachBackScore >= 70 ? 'Asked the patient to summarize or repeat key instructions.' : 'Checked patient agreement.',
      whatYouMissed: teachBackScore < 70 ? 'Avoid the "yes/no" trap. Frame teach-back as: "To ensure I explained clearly, could you tell me how you will take this tablet?"' : 'Outstanding use of evidence-based Teach-Back technique.',
      betterPhrasingExample: '"Just to make sure I explained everything clearly and didn\'t leave anything out, how do you plan to take this medication starting tonight?"',
      matchedRulesCount: hasTeachBackPrompt ? 1 : 0
    },
    {
      id: 'c9',
      code: 'COMM_SKILLS',
      name: 'Communication Skills & Empathy',
      description: 'Maintaining a warm, professional demeanor, active listening, and avoiding clinical jargon.',
      score: commScore,
      weight: 10,
      grade: getGradeTier(commScore),
      whatYouDidWell: commScore >= 70 ? 'Maintained an encouraging, empathetic tone with clear language.' : 'Communicated professionally.',
      whatYouMissed: commScore < 70 ? 'Acknowledge patient emotions (e.g. fears of dependency or needle anxiety) before explaining clinical facts.' : 'Demonstrated top-tier clinical empathy and warmth.',
      betterPhrasingExample: '"I completely understand why you feel hesitant about taking a daily medication. Let’s talk through your concerns together."',
      matchedRulesCount: isPoliteAndEmpathetic ? 1 : 0
    },
    {
      id: 'c10',
      code: 'CLOSE',
      name: 'Closing the Counseling Session',
      description: 'Inviting final questions, providing pharmacy contact info, and arranging follow-up.',
      score: closingScore,
      weight: 5,
      grade: getGradeTier(closingScore),
      whatYouDidWell: closingScore >= 60 ? 'Concluded with an open invitation for future questions.' : 'Provided courteous conclusion.',
      whatYouMissed: closingScore < 70 ? 'Always remind the patient that the pharmacy phone number is printed on the medication label and they can call anytime.' : 'Polite, supportive closing.',
      betterPhrasingExample: '"What questions do you still have for me today? Here is our pharmacy contact number in case you need anything at all."',
      matchedRulesCount: hasClosingOffer ? 1 : 0
    }
  ];

  // Weighted overall score
  const totalWeight = competencies.reduce((acc, c) => acc + c.weight, 0);
  const weightedSum = competencies.reduce((acc, c) => acc + (c.score * c.weight), 0);
  const overallScore = Math.round(weightedSum / totalWeight);

  let overallGrade: SimulationAssessment['overallGrade'] = 'Needs Practice';
  if (overallScore >= 90) overallGrade = 'Distinction';
  else if (overallScore >= 75) overallGrade = 'Proficient';
  else if (overallScore >= 60) overallGrade = 'Developing';

  // Strengths and Improvements
  const strengths: string[] = [];
  const areasForImprovement: string[] = [];
  const recommendations: string[] = [];
  const missedCrucialPoints: string[] = [];

  competencies.forEach(comp => {
    if (comp.score >= 75) {
      strengths.push(`${comp.name}: ${comp.whatYouDidWell}`);
    } else {
      areasForImprovement.push(`${comp.name}: ${comp.whatYouMissed}`);
      recommendations.push(`Practice "${comp.name}" using phrasing such as: ${comp.betterPhrasingExample}`);
    }
  });

  if (!hasTeachBackPrompt) {
    missedCrucialPoints.push('Missed formal Teach-Back verification of medication regimen.');
  }
  if (!hasAllergyCheck) {
    missedCrucialPoints.push('Omitted routine allergy verification before dispensing.');
  }
  if (!hasMissedDose) {
    missedCrucialPoints.push('Did not clarify missed-dose instructions (never double up).');
  }

  if (strengths.length === 0) {
    strengths.push('Completed the simulation and engaged directly with the virtual patient.');
  }

  return {
    id: 'eval-' + Date.now(),
    caseId: counselingCase.id,
    caseTitle: counselingCase.title,
    patientName: counselingCase.patient.name,
    timestamp: new Date().toISOString(),
    durationSeconds,
    overallScore,
    overallGrade,
    competencies,
    strengths,
    areasForImprovement,
    recommendations,
    missedCrucialPoints,
    transcript
  };
}

function containsAny(text: string, substrings: string[]): boolean {
  return substrings.some(sub => text.includes(sub.toLowerCase()));
}

function calculateScore(checks: boolean[], weights: number[]): number {
  let score = 0;
  for (let i = 0; i < checks.length; i++) {
    if (checks[i]) {
      score += weights[i];
    }
  }
  return Math.min(100, Math.max(25, score));
}

function getGradeTier(score: number): CompetencyEvaluation['grade'] {
  if (score >= 85) return 'Excellent';
  if (score >= 70) return 'Good';
  if (score >= 50) return 'Fair';
  return 'Needs Improvement';
}
