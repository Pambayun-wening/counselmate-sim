export interface CounselingStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  description: string;
  keyGoals: string[];
  sampleQuestions: {
    pharmacistPhrase: string;
    context: string;
    proTip: string;
  }[];
  commonPitfalls: string[];
}

export const COUNSELING_GUIDE_STEPS: CounselingStep[] = [
  {
    stepNumber: 1,
    title: 'Opening & Introduction',
    subtitle: 'Establish identity, professional rapport, and patient consent',
    description: 'The opening sets the professional tone, verifies the patient’s identity to prevent medication dispensing errors, and gains permission to conduct a consultation in a respectful, non-threatening manner.',
    keyGoals: [
      'Confirm 2 unique patient identifiers (Full Name, Date of Birth / Address).',
      'Introduce yourself clearly as the pharmacist.',
      'State the purpose of the counseling session and request consent.',
      'Estimate the time required (e.g., "This will take about 3-5 minutes").'
    ],
    sampleQuestions: [
      {
        pharmacistPhrase: '"Hello Mr. Budi, my name is Alex and I am your pharmacist today. May I confirm your full name and date of birth before we review your prescription?"',
        context: 'Initial verification',
        proTip: 'Always ask the patient to state their name and birthdate rather than saying "Are you Mr. Budi?", to prevent accidental misidentification.'
      },
      {
        pharmacistPhrase: '"Do you have about 3 to 5 minutes so we can discuss how this medication works and how to take it safely?"',
        context: 'Gaining consent and setting expectations',
        proTip: 'Specifying a short, realistic duration reduces patient anxiety about being delayed.'
      }
    ],
    commonPitfalls: [
      'Assuming the person picking up the prescription is the patient without verifying.',
      'Rushing directly into directions without introducing yourself.',
      'Failing to establish privacy or asking sensitive questions within earshot of other customers.'
    ]
  },
  {
    stepNumber: 2,
    title: 'Patient Assessment & Prime Questions',
    subtitle: 'Assess baseline understanding, allergies, concurrent meds, and special needs',
    description: 'Use the Indian Health Service (IHS) Three Prime Questions to evaluate what the prescriber communicated, saving time and avoiding redundant explanations.',
    keyGoals: [
      'Assess what the doctor told the patient the medication is for.',
      'Screen for drug/food allergies and past adverse reactions.',
      'Review concurrent medications, OTC analgesics, herbals, and dietary habits.',
      'Screen for pregnancy, lactation, renal/hepatic impairment, or chronic conditions.'
    ],
    sampleQuestions: [
      {
        pharmacistPhrase: '"What did Dr. Hendra tell you this new medication is for?"',
        context: 'First Prime Question (Indication)',
        proTip: 'Uncovers whether the patient knows their diagnosis and prevents you from assuming they know why it was prescribed.'
      },
      {
        pharmacistPhrase: '"Are you currently taking any other daily medications, over-the-counter pain relievers, vitamins, or herbal remedies?"',
        context: 'Drug-drug and OTC interaction screening',
        proTip: 'Patients often do not consider vitamins, herbal teas, or OTC ibuprofen as "real medicines" unless specifically prompted.'
      },
      {
        pharmacistPhrase: '"Have you ever experienced an allergic reaction or bad side effect from medications in the past?"',
        context: 'Allergy screening',
        proTip: 'If a patient reports an allergy, follow up with: "What kind of reaction did you have?" to distinguish intolerance (nausea) from true allergy (anaphylaxis/hives).'
      }
    ],
    commonPitfalls: [
      'Asking leading or closed questions ("You take this for high blood pressure, right?").',
      'Failing to screen for OTC pain relievers (e.g. NSAIDs that elevate blood pressure or interact with anticoagulants).'
    ]
  },
  {
    stepNumber: 3,
    title: 'Medication Information & Show-and-Tell',
    subtitle: 'Clear, jargon-free instructions on dosage, timing, and administration',
    description: 'Visually present the medication container to the patient ("Show and Tell") and provide concise, practical instructions tailored to the patient’s daily routine.',
    keyGoals: [
      'Show the physical medication container, color, and tablet appearance.',
      'State the brand and generic names clearly.',
      'Specify exact dosage, route, frequency, and timing (e.g., morning vs bedtime, with or without food).',
      'Explain missed dose protocol with explicit safety boundaries.'
    ],
    sampleQuestions: [
      {
        pharmacistPhrase: '"This is Amlodipine 5 mg, a small white tablet. You will take one tablet once a day in the evening with a glass of water."',
        context: 'Show-and-tell administration instructions',
        proTip: 'Tying medication timing to an established habit (e.g., "right after brushing teeth at night") dramatically boosts adherence.'
      },
      {
        pharmacistPhrase: '"If you ever forget a dose in the evening, take it as soon as you remember the next morning. However, if it is already close to your next scheduled dose, skip the missed one. Never take two tablets at the same time to make up for a missed dose."',
        context: 'Missed dose protocol',
        proTip: 'Clear boundary rules give patients confidence and prevent dangerous double-dosing.'
      }
    ],
    commonPitfalls: [
      'Using vague phrases like "take as directed" or "take three times a day" without specifying 8-hour intervals or meal timing.',
      'Leaving out storage instructions (e.g., room temperature, away from bathroom humidity, out of reach of children).'
    ]
  },
  {
    stepNumber: 4,
    title: 'Patient Education & Safety Counseling',
    subtitle: 'Mechanism in plain language, expected benefits, side effects, and lifestyle tips',
    description: 'Empower the patient by connecting the drug’s mechanism to tangible health benefits, differentiating common benign side effects from emergency red flags, and addressing lifestyle modifications.',
    keyGoals: [
      'Explain how the medication helps in simple, non-medical terms.',
      'Set realistic expectations regarding onset of action (immediate vs days/weeks).',
      'Describe common, manageable side effects and how to minimize them.',
      'Identify "red flag" symptoms that require immediate medical attention.',
      'Provide non-pharmacological and dietary counseling.'
    ],
    sampleQuestions: [
      {
        pharmacistPhrase: '"Amlodipine works by gently relaxing your blood vessels so your blood flows more easily, which protects your heart and kidneys from high pressure damage."',
        context: 'Explaining mechanism of action in plain language',
        proTip: 'Avoid medical jargon like "dihydropyridine calcium channel antagonist". Use mechanical metaphors like "gentle widening of pipes".'
      },
      {
        pharmacistPhrase: '"You might occasionally feel mild dizziness when standing up quickly, or notice slight puffiness in your ankles. Standing up slowly helps with dizziness. If the ankle swelling becomes uncomfortable or you feel short of breath, give us or your doctor a call right away."',
        context: 'Differentiating expected side effects from red flags',
        proTip: 'Framing side effects alongside practical coping strategies reduces patient panic.'
      }
    ],
    commonPitfalls: [
      'Listing dozens of terrifying rare side effects without context, causing patient non-adherence.',
      'Failing to mention that chronic medications (e.g., blood pressure, statins) must be continued even when feeling well.'
    ]
  },
  {
    stepNumber: 5,
    title: 'Teach-Back & Verification',
    subtitle: 'Confirm patient comprehension without placing them on the defensive',
    description: 'Teach-Back is the gold standard for clinical communication. The pharmacist frames the check as a test of their own communication skills, inviting the patient to demonstrate or verbalize the plan.',
    keyGoals: [
      'Frame the teach-back non-judgmentally ("To make sure I was clear...").',
      'Verify patient knows dose, frequency, timing, and missed dose protocol.',
      'Clarify and gently re-teach any misunderstood elements ("Chunk and Check").'
    ],
    sampleQuestions: [
      {
        pharmacistPhrase: '"Just to make sure I explained everything clearly and didn\'t miss anything important, could you tell me how and when you plan to take this tablet starting tonight?"',
        context: 'Initiating Teach-Back',
        proTip: 'Notice the phrase "to make sure I explained clearly"—this takes the pressure off the patient completely.'
      },
      {
        pharmacistPhrase: '"What would you do if you forgot your dose on Saturday night?"',
        context: 'Scenario-based comprehension check',
        proTip: 'Using a concrete hypothetical scenario reveals whether the patient truly understands the missed-dose instructions.'
      }
    ],
    commonPitfalls: [
      'Asking "Do you have any questions?" or "Do you understand?" instead of requesting an active teach-back.',
      'Acting like a teacher administering an exam; keep the tone collaborative and supportive.'
    ]
  },
  {
    stepNumber: 6,
    title: 'Closing & Follow-Up',
    subtitle: 'Refills, contact information, documentation, and reassuring parting words',
    description: 'Ensure the patient leaves with an open door to reach the pharmacy team, clear refill instructions, written resources, and a feeling of genuine clinical care.',
    keyGoals: [
      'Inform the patient about remaining authorized refills and prescription expiration.',
      'Provide pharmacy contact number, operating hours, and consultation availability.',
      'Provide written patient medication leaflets.',
      'End with genuine, caring closing remarks.'
    ],
    sampleQuestions: [
      {
        pharmacistPhrase: '"Your prescription includes 2 authorized refills. We recommend calling us about 3 to 4 days before you run out so we can prepare your next batch smoothly."',
        context: 'Refill coordination',
        proTip: 'Explaining refill lead-time prevents missed doses caused by last-minute pharmacy visits.'
      },
      {
        pharmacistPhrase: '"Here is our pharmacy phone number on your bottle. If you have any questions tonight or if anything feels unusual, please never hesitate to call us. Take care, Mr. Budi!"',
        context: 'Open-door professional parting',
        proTip: 'Reassuring patients that they are welcome to call reinforces adherence and trust.'
      }
    ],
    commonPitfalls: [
      'Ending abruptly without providing contact information.',
      'Forgetting to mention authorized refills or how to request the next supply.'
    ]
  }
];
