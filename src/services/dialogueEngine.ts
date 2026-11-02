import { CounselingCase, ChatMessage, EmotionalMood } from '../types';

export interface DialogueMatchResult {
  patientResponse: string;
  moodReaction: EmotionalMood;
  matchedCompetency?: string;
  revealedHiddenKey?: string;
  revealedNotification?: string;
  marksChecklistItemId?: string;
}

export function processPharmacistInput(
  rawInput: string,
  counselingCase: CounselingCase,
  revealedKeysState: Record<string, boolean>,
  transcriptHistory: ChatMessage[]
): DialogueMatchResult {
  const input = rawInput.trim().toLowerCase();

  // Score candidate rules based on keyword hits and intent
  let bestMatchRule: (typeof counselingCase.dialogueRules)[0] | null = null;
  let highestScore = 0;

  for (const rule of counselingCase.dialogueRules) {
    let score = 0;
    for (const kw of rule.triggerKeywords) {
      const lowerKw = kw.toLowerCase();
      if (input.includes(lowerKw)) {
        // Longer matching phrases carry higher semantic weight
        score += lowerKw.split(' ').length * 3;
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatchRule = rule;
    }
  }

  // If a strong rule match was found (threshold >= 3)
  if (bestMatchRule && highestScore >= 3) {
    let notification: string | undefined = undefined;
    if (bestMatchRule.revealsHiddenKey && !revealedKeysState[bestMatchRule.revealsHiddenKey]) {
      notification = `Clinical Fact Discovered: ${getFactLabel(bestMatchRule.revealsHiddenKey, counselingCase)}`;
    }

    return {
      patientResponse: bestMatchRule.patientResponse,
      moodReaction: bestMatchRule.moodReaction || 'reassured',
      matchedCompetency: bestMatchRule.competencyTarget,
      revealedHiddenKey: bestMatchRule.revealsHiddenKey,
      revealedNotification: notification,
      marksChecklistItemId: bestMatchRule.marksChecklistItemId
    };
  }

  // Generic in-character fallbacks based on patient personality
  return generateContextualFallback(input, counselingCase, transcriptHistory);
}

function getFactLabel(key: string, counselingCase: CounselingCase): string {
  switch (key) {
    case 'allergies':
      return `Allergy History (${counselingCase.hiddenInfo.allergies[0] || 'NKDA'})`;
    case 'ibuprofen':
      return 'Regular OTC Ibuprofen Use for Headaches';
    case 'diet':
      return 'Dietary Trigger: High Sodium Road Snacks & Sweet Coffee';
    case 'fearKidney':
      return 'Debunked Misconception: Medication Kidney Safety';
    case 'canIStop':
      return 'Adherence Established: Chronic Nature of Hypertension';
    case 'wine':
      return 'Alcohol Habit: Weekend Wine with Dinner';
    case 'insulinFear':
      return 'Fear Relieved: Metformin as Oral First-Line';
    case 'coffee':
      return 'Acid Trigger: 4 Morning Espresso Shots on Empty Stomach';
    case 'birthControl':
      return 'Drug Interaction Identified: Oral Contraceptive Interaction Risk';
    case 'stopEarlyHabit':
      return 'High-Risk Habit Corrected: Stopping Antibiotics Early';
    case 'grapefruit':
      return 'Severe Food-Drug Interaction: Daily Pink Grapefruit Juice Avoidance';
    case 'muscleFear':
      return 'Statin Hesitancy Addressed: Real Evidence vs Online Myths';
    default:
      return 'Patient Disclosed Hidden Background Information';
  }
}

function generateContextualFallback(
  input: string,
  counselingCase: CounselingCase,
  history: ChatMessage[]
): DialogueMatchResult {
  const patient = counselingCase.patient;

  // 1. Consent / Time Availability / Permission to counsel
  const isAskingConsentOrTime = 
    (input.includes('minute') || input.includes('time') || input.includes('counsel') || input.includes('discuss') || input.includes('speak') || input.includes('talk') || input.includes('chat') || input.includes('consult') || input.includes('review') || input.includes('go over')) &&
    (input.includes('have') || input.includes('do you') || input.includes('can i') || input.includes('may i') || input.includes('ready') || input.includes('got a') || input.includes('spare') || input.includes('able to') || input.includes('ok to') || input.includes('okay to'));

  if (isAskingConsentOrTime || input === 'do you have a minute' || input === 'do you have time' || input.includes('have a minute to counsel')) {
    const consentResponses: Record<string, string> = {
      'patient-budi': 'Yes, absolutely! I have plenty of time. Between my taxi shifts, I want to make sure I understand how to take this blood pressure medicine safely. What should I know?',
      'patient-sarah': 'Yes, certainly! I\'m actually very glad you offered, because I have several questions and concerns about this Metformin. Please go ahead.',
      'patient-david': 'Yes, definitely! Please walk me through it. I really need to get this acid reflux under control so I can sleep normally again.',
      'patient-maya': 'Yes, sure! I have a few minutes before my next graduate seminar. Please tell me how I should take these antibiotics.',
      'patient-robert': 'Yes, of course. I do have time, and I would appreciate hearing your professional perspective on this Simvastatin before I begin.'
    };

    return {
      patientResponse: consentResponses[patient.id] || 'Yes, absolutely! I have a few minutes. I would appreciate you explaining how to take this properly.',
      moodReaction: 'reassured',
      matchedCompetency: 'intro_identification'
    };
  }

  // 2. Patient Well-being / "How are you feeling today?"
  if (input.includes('how are you') || input.includes('how do you feel') || input.includes('how have you been') || input.includes('how is your day') || input.includes('feeling today')) {
    const feelingResponses: Record<string, string> = {
      'patient-budi': 'I\'m doing pretty well today, thank you for asking! I feel totally normal, which is why having high blood pressure was such a surprise to me.',
      'patient-sarah': 'I\'m feeling a bit anxious today, to be honest. Being diagnosed with diabetes and handed this prescription has been somewhat overwhelming.',
      'patient-david': 'Honestly, I\'m exhausted. My chest and throat were burning all night long, so I\'m really hoping this medicine helps quickly.',
      'patient-maya': 'My throat is still very inflamed and it hurts to swallow, but I\'m hanging in there. Hoping these antibiotics kick in soon!',
      'patient-robert': 'I\'m doing well, thank you. Just feeling cautious and a bit skeptical because of all the horror stories I read online about statins.'
    };

    return {
      patientResponse: feelingResponses[patient.id] || 'I\'m doing alright today, thank you for asking!',
      moodReaction: 'curious',
      matchedCompetency: 'gathering_info'
    };
  }

  // 3. Name & Identity Checks
  if (input.includes('name') || input.includes('identity') || input.includes('who are you') || input.includes('confirm') || input.includes('date of birth') || input.includes('dob')) {
    const dobMap: Record<string, string> = {
      'patient-budi': 'August 14, 1974',
      'patient-sarah': 'November 3, 1980',
      'patient-david': 'May 22, 1988',
      'patient-maya': 'April 9, 2002',
      'patient-robert': 'July 17, 1967'
    };
    return {
      patientResponse: `Yes, my name is ${patient.name}, born ${dobMap[patient.id] || '1980'}. That matches my prescription!`,
      moodReaction: 'neutral',
      matchedCompetency: 'intro_identification'
    };
  }

  // 4. Affirmative / Ready to proceed
  if (input === 'yes' || input === 'okay' || input === 'sure' || input === 'sounds good' || input.startsWith('let\'s begin') || input.startsWith('shall we')) {
    return {
      patientResponse: 'Great, I\'m all ears! What should I know about this medicine?',
      moodReaction: 'curious',
      matchedCompetency: 'intro_identification'
    };
  }

  // 5. Greetings
  if (input.includes('hello') || input.includes('good morning') || input.includes('good afternoon') || input.includes('good evening') || input.includes('hi')) {
    return {
      patientResponse: `Hello Pharmacist! Yes, I am ${patient.name}. Thank you for taking the time to speak with me today.`,
      moodReaction: 'neutral',
      matchedCompetency: 'intro_identification'
    };
  }

  // 6. Administration basics (water, swallow)
  if (input.includes('water') || input.includes('swallow') || input.includes('drink')) {
    return {
      patientResponse: 'Understood, I will make sure to take it with a full glass of plain water as you recommended.',
      moodReaction: 'reassured',
      matchedCompetency: 'med_instructions'
    };
  }

  // 7. Appreciation / Thanks
  if (input.includes('thank') || input.includes('appreciate') || input.includes('welcome')) {
    return {
      patientResponse: 'Thank you as well, Pharmacist! I truly appreciate how patient and caring you are with me.',
      moodReaction: 'grateful',
      matchedCompetency: 'closing'
    };
  }

  // 8. General Question Detection (avoid robotic answers)
  const isQuestion = input.includes('?') || input.startsWith('do you') || input.startsWith('can you') || input.startsWith('how') || input.startsWith('what') || input.startsWith('why') || input.startsWith('is there');

  if (isQuestion) {
    return {
      patientResponse: `I\'m not entirely sure about that. Could you explain what you mean, or what I should do?`,
      moodReaction: 'curious',
      matchedCompetency: 'gathering_info'
    };
  }

  // 9. Conversational statement fallback
  return {
    patientResponse: `I see. Could you explain a little more about what that means for me taking ${counselingCase.prescription.medicationName}? I want to make sure I do everything right.`,
    moodReaction: 'curious',
    matchedCompetency: 'communication_skills'
  };
}

