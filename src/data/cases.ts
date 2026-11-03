import { CounselingCase } from '../types';

export const COUNSELING_CASES: CounselingCase[] = [
  {
    id: 'case-hypertension-amlodipine',
    title: 'First-time Hypertension Regimen',
    subtitle: 'Amlodipine 5 mg counseling for an anxious newly diagnosed patient',
    difficulty: 'Beginner',
    diseaseCategory: 'Cardiovascular',
    estimatedMinutes: 8,
    tags: ['Hypertension', 'CCB', 'First-time Rx', 'Adherence', 'Lifestyle'],
    patient: {
      id: 'patient-budi',
      name: 'Budi Santoso',
      age: 52,
      gender: 'Male',
      occupation: 'Ride-share / Taxi Driver',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      diagnosis: 'Primary Essential Hypertension (Stage 1)',
      diseaseCategory: 'Cardiovascular',
      chiefComplaint: 'Blood pressure was 154/96 mmHg at a company checkup. Doctor gave me this prescription, but I feel totally fine and have never taken daily medications.',
      isFirstTimeUser: true,
      baselineMood: 'anxious',
      communicationStyle: 'Polite, slightly nervous, concerned about lifelong dependency and kidney safety.',
    },
    prescription: {
      medicationName: 'Amlodipine Besylate',
      genericName: 'Amlodipine',
      brandName: 'Norvasc',
      strength: '5 mg',
      dosageForm: 'Oral Tablet',
      directions: 'Take 1 tablet once daily in the evening',
      frequency: 'Once daily',
      timing: 'Evening / bedtime',
      duration: '30-day supply (with 2 authorized refills)',
      quantity: '30 tablets',
      refills: 2,
      prescriber: 'Dr. Hendra Wijaya, Sp.PD',
      prescribedFor: 'Blood pressure control & cardiovascular risk reduction',
    },
    hiddenInfo: {
      allergies: ['No known drug allergies (NKDA)'],
      concurrentMedications: ['None regularly'],
      otcAndSupplements: ['Takes OTC Ibuprofen 400 mg 2-3 times a week for tension headaches from long driving hours'],
      lifestyleDiet: [
        'Eats salted fish, fried tempeh, and salty instant soup often while on the road',
        'Drinks 2-3 cups of sweetened coffee daily to stay awake',
        'Smokes about half a pack of cigarettes a day'
      ],
      vitalSignsOrLabs: 'BP 154/96 mmHg, HR 78 bpm, Serum Creatinine 0.9 mg/dL (Normal)',
      hiddenMisconceptionsOrFears: [
        'Believes blood pressure medications destroy the kidneys if taken continuously',
        'Thinks he can stop taking the medicine whenever he feels healthy or has no headache',
        'Worries taking it at night might cause him to wake up to urinate constantly'
      ],
      revealedMap: {
        allergies: false,
        ibuprofen: false,
        diet: false,
        fearKidney: false,
        canIStop: false,
      }
    },
    learningObjectives: [
      'Confirm patient identity and establish professional, empathetic rapport.',
      'Explain how Amlodipine works to relax blood vessels without causing kidney failure.',
      'Provide clear instructions: 1 tablet once daily, preferably at the same time each evening.',
      'Counsel on missed dose management: Take as soon as remembered, unless close to next dose (never double up).',
      'Explain potential side effects: mild ankle swelling (peripheral edema), lightheadedness when standing up quickly.',
      'Identify OTC Ibuprofen use and advise safer alternatives (Paracetamol) due to NSAID-induced blood pressure elevation.',
      'Provide practical lifestyle advice: lower sodium intake, reduce smoking, stay hydrated.',
      'Perform Teach-Back to confirm patient understanding and address emotional concerns.'
    ],
    suggestedPromptCategories: [
      {
        categoryName: '1. Introduction & Verification',
        prompts: [
          'Hello Mr. Budi, I am the pharmacist on duty today. May I confirm your full name and date of birth?',
          'Do you have a few minutes for me to explain your new medication and make sure you feel confident taking it?',
          'What did Dr. Hendra tell you regarding what this medication is for?'
        ]
      },
      {
        categoryName: '2. History & Lifestyle Check',
        prompts: [
          'Do you have any known allergies to medications or food?',
          'Are you currently taking any other medications, over-the-counter pain relievers, or herbal supplements?',
          'Could you tell me a little about your daily routine, diet, or caffeine habits while driving?'
        ]
      },
      {
        categoryName: '3. Directions & Timing',
        prompts: [
          'Your doctor prescribed Amlodipine 5 mg, to be taken once daily in the evening with or without food.',
          'Try to take it at the same time every night so it becomes part of your routine.',
          'If you ever forget a dose, take it as soon as you remember, but never double up two pills at once.'
        ]
      },
      {
        categoryName: '4. Benefits & Side Effects',
        prompts: [
          'Amlodipine works gently by relaxing your blood vessels so your heart does not have to pump as hard.',
          'You might occasionally notice mild ankle puffiness or lightheadedness when getting up too quickly.',
          'Contrary to common myths, taking this medication actually protects your kidneys and heart from high pressure damage.'
        ]
      },
      {
        categoryName: '5. Lifestyle & Interactions',
        prompts: [
          'I noticed you take Ibuprofen for headaches; did you know NSAIDs can raise your blood pressure? Paracetamol is much safer.',
          'Cutting back slightly on salty road snacks and sweetened coffee will help your blood pressure significantly.'
        ]
      },
      {
        categoryName: '6. Teach-Back & Closing',
        prompts: [
          'Just to make sure I explained everything clearly, could you tell me how and when you will take this tablet?',
          'What questions or worries do you still have for me today, Mr. Budi?'
        ]
      }
    ],
    dialogueRules: [
     {
  id: 'rule-greet-identify',
  triggerKeywords: [
    'hello',
    'good morning',
    'good afternoon',
    'good evening',
    'nice to meet you',
    'how are you today'
  ],
  intent: 'Greeting and initial introduction',
  competencyTarget: 'intro_identification',
  patientResponse: 'Hello Pharmacist! Yes, my name is Budi Santoso, born August 14, 1974. Dr. Hendra told me to bring this paper here to get my blood pressure tablets.',
  moodReaction: 'neutral',
  marksChecklistItemId: 'check-intro'
},
      {
        id: 'rule-budi-time-consent',
        triggerKeywords: ['few minutes', 'have a minute', 'have time', 'minute to counsel', 'counsel', 'discuss', 'time to talk', 'speak with you', 'consultation', 'talk to you', 'go over', 'can i talk', 'can we discuss'],
        intent: 'Gaining consent and establishing counseling time',
        competencyTarget: 'intro_identification',
        patientResponse: 'Yes, absolutely! I have plenty of time. Between my taxi shifts, I want to make sure I understand how to take this blood pressure medicine safely. What should I know?',
        moodReaction: 'reassured',
        marksChecklistItemId: 'check-consent'
      },
      {
        id: 'rule-purpose-inquiry',
        triggerKeywords: ['what did the doctor tell you', 'what is this for', 'doctor explain', 'know why', 'reason for prescription'],
        intent: 'Assessing patient understanding of medication purpose',
        competencyTarget: 'gathering_info',
        patientResponse: 'Well, the doctor said my blood pressure was high, 154 over 96. To be honest, I feel completely healthy! I don’t feel dizzy or sick, so I was a bit surprised he gave me daily medicine.',
        moodReaction: 'curious',
        marksChecklistItemId: 'check-purpose'
      },
      {
        id: 'rule-allergy-check',
        triggerKeywords: ['allergy', 'allergic', 'reactions', 'bad reaction'],
        intent: 'Checking for drug and food allergies',
        competencyTarget: 'med_history',
        patientResponse: 'No, I don\'t have any allergies to medicine or food that I know of. I’ve taken paracetamol or cough syrups before without any issues.',
        revealsHiddenKey: 'allergies',
        moodReaction: 'neutral',
        marksChecklistItemId: 'check-allergy'
      },
      {
        id: 'rule-other-meds-otc',
        triggerKeywords: ['other medicine', 'other medication', 'supplements', 'herbs', 'over the counter', 'otc', 'painkiller', 'vitamins'],
        intent: 'Screening for OTC medications, supplements, and herbals',
        competencyTarget: 'med_history',
        patientResponse: 'I don’t take routine medicines. But since I drive a taxi for 10-12 hours a day, I often get bad neck and head tension, so I buy Ibuprofen 400 mg from the convenience store and take it 2 or 3 times a week.',
        revealsHiddenKey: 'ibuprofen',
        moodReaction: 'neutral',
        marksChecklistItemId: 'check-otc'
      },
      {
        id: 'rule-ibuprofen-interaction',
        triggerKeywords: ['ibuprofen', 'nsaid', 'paracetamol', 'headache', 'painkiller raise', 'blood pressure'],
        intent: 'Counseling on NSAID-induced hypertension and safer alternatives',
        competencyTarget: 'side_effects',
        patientResponse: 'Oh really?! I had no idea Ibuprofen could raise my blood pressure! Thank you for telling me, I will switch to regular Paracetamol for my headaches instead.',
        moodReaction: 'surprised',
        marksChecklistItemId: 'check-ibuprofen-advice'
      },
      {
        id: 'rule-how-to-take-timing',
        triggerKeywords: ['take 1', 'one tablet', 'once daily', 'evening', 'night', 'how to take', 'directions', 'bedtime', 'water'],
        intent: 'Explaining dosage, frequency, and timing of administration',
        competencyTarget: 'med_instructions',
        patientResponse: 'I see, take one 5 mg tablet once a day in the evening. Can I take it with dinner or right before going to bed? And will it make me wake up to pee at night?',
        moodReaction: 'curious',
        marksChecklistItemId: 'check-timing'
      },
      {
        id: 'rule-diuretic-clarification',
        triggerKeywords: ['pee', 'urinate', 'water pill', 'not a diuretic', 'calcium channel', 'relax vessels', 'sleep'],
        intent: 'Clarifying drug class and nocturnal urination myth',
        competencyTarget: 'med_benefits',
        patientResponse: 'Ah, wonderful! So Amlodipine is not a water pill, it just relaxes my blood vessels. That\'s a huge relief because I need my full uninterrupted sleep to drive safely!',
        moodReaction: 'relieved',
        marksChecklistItemId: 'check-mechanism'
      },
      {
        id: 'rule-kidney-fear',
        triggerKeywords: ['kidney', 'destroy', 'damage', 'lifelong', 'dependent', 'protect your kidneys', 'filter'],
        intent: 'Debunking kidney damage myth and explaining organ protection',
        competencyTarget: 'med_benefits',
        patientResponse: 'My neighbor told me taking blood pressure pills every day will destroy my kidneys and make me do dialysis! Hearing from you that untreated high blood pressure is what actually damages the kidneys makes so much sense. I feel much less scared now.',
        revealsHiddenKey: 'fearKidney',
        moodReaction: 'reassured',
        marksChecklistItemId: 'check-kidney-myth'
      },
      {
        id: 'rule-missed-dose',
        triggerKeywords: ['missed dose', 'forget', 'forgot', 'double up', 'next dose', 'skip'],
        intent: 'Counseling on missed dose protocols',
        competencyTarget: 'med_instructions',
        patientResponse: 'Got it. If I forget in the evening, take it the next morning if I remember. But if it\'s already near evening time, skip it and never take two pills at once. Understood!',
        moodReaction: 'reassured',
        marksChecklistItemId: 'check-missed-dose'
      },
      {
        id: 'rule-side-effects-edema',
        triggerKeywords: ['side effect', 'ankle', 'swelling', 'edema', 'dizziness', 'dizzy', 'standing', 'lightheaded'],
        intent: 'Explaining common side effects and when to contact healthcare team',
        competencyTarget: 'side_effects',
        patientResponse: 'Mild ankle puffiness or mild dizziness if I jump out of the car too fast. I\'ll keep an eye out for that. If my feet swell up noticeably, I should let you or Dr. Hendra know, right?',
        moodReaction: 'reassured',
        marksChecklistItemId: 'check-side-effects'
      },
      {
        id: 'rule-can-i-stop',
        triggerKeywords: ['stop', 'feel better', 'discontinue', 'cure', 'normal', 'lifetime', 'asymptomatic', 'silent killer'],
        intent: 'Addressing adherence and chronic nature of hypertension (silent killer)',
        competencyTarget: 'lifestyle_counseling',
        patientResponse: 'So hypertension is often called the "silent killer" because I might feel fine while damage is happening silently. That makes sense why I shouldn\'t stop just because I don\'t feel sick. I will keep taking it regularly.',
        revealsHiddenKey: 'canIStop',
        moodReaction: 'reassured',
        marksChecklistItemId: 'check-silent-killer'
      },
      {
  id: 'rule-lifestyle-diet',
  triggerKeywords: [
    'salted fish',
    'salty food',
    'salty snacks',
    'food during work',
    'food during shifts',
    'what do you eat',
    'eating habits',
    'diet'
  ],
  intent: 'Dietary habits and sodium intake',
  competencyTarget: 'lifestyle_counseling',
  patientResponse: 'Well, I often eat salted fish, fried tempeh, and instant soup while driving. They are convenient to buy on the road. I guess those foods are quite salty, arent they?',
  revealsHiddenKey: 'diet',
  moodReaction: 'curious',
  marksChecklistItemId: 'check-lifestyle'
},
{
  id: 'rule-lifestyle-coffee',
  triggerKeywords: [
    'coffee',
    'caffeine',
    'sweetened drinks',
    'how much coffee',
    'drink every day'
  ],
  intent: 'Coffee and caffeine consumption',
  competencyTarget: 'lifestyle_counseling',
  patientResponse: 'I drink around two or three cups of sweetened coffee every day to stay awake during my long taxi shifts. Is that bad for my blood pressure?',
  revealsHiddenKey: 'diet',
  moodReaction: 'curious',
  marksChecklistItemId: 'check-lifestyle'
},
{
  id: 'rule-lifestyle-smoking',
  triggerKeywords: [
    'smoke',
    'smoking',
    'cigarette',
    'tobacco',
    'how many cigarettes'
  ],
  intent: 'Smoking habits',
  competencyTarget: 'lifestyle_counseling',
  patientResponse: 'I smoke about half a pack of cigarettes a day. I know it is probably not good for my health, but quitting sounds difficult. Do you have any advice?',
  revealsHiddenKey: 'diet',
  moodReaction: 'curious',
  marksChecklistItemId: 'check-lifestyle'
},
      {
        id: 'rule-teach-back',
        triggerKeywords: ['repeat', 'teach back', 'explain back', 'how will you take', 'make sure i explained', 'in your own words', 'summary'],
        intent: 'Verifying patient comprehension via Teach-Back method',
        competencyTarget: 'teach_back',
        patientResponse: 'Sure! I will take one 5 mg Amlodipine tablet every evening with water. It relaxes my blood vessels to protect my heart and kidneys. If I miss a dose, I won\'t double up. I\'ll watch out for ankle swelling, avoid taking Ibuprofen for my headaches, and cut down on salty road snacks!',
        moodReaction: 'reassured',
        marksChecklistItemId: 'check-teachback'
      },
      {
        id: 'rule-closing-questions',
        triggerKeywords: ['any question', 'anything else', 'help you with', 'contact', 'call us', 'follow up', 'refill', 'have a good day'],
        intent: 'Professional closing, offering support and follow-up',
        competencyTarget: 'closing',
        patientResponse: 'You have answered all my questions so clearly, Pharmacist. I was very nervous when I first walked in, but now I feel confident about my treatment. Thank you so much for your care!',
        moodReaction: 'grateful',
        marksChecklistItemId: 'check-closing'
      }
    ]
  },
  {
    id: 'case-diabetes-metformin',
    title: 'New Onset Type 2 Diabetes',
    subtitle: 'Metformin 500 mg counseling with GI distress prevention & lifestyle integration',
    difficulty: 'Intermediate',
    diseaseCategory: 'Endocrine',
    estimatedMinutes: 10,
    tags: ['Diabetes', 'Metformin', 'GI Distress', 'Diet', 'Adherence'],
    patient: {
      id: 'patient-sarah',
      name: 'Sarah Jenkins',
      age: 46,
      gender: 'Female',
      occupation: 'Middle School Science Teacher',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      diagnosis: 'Type 2 Diabetes Mellitus (HbA1c 7.6%)',
      diseaseCategory: 'Endocrine',
      chiefComplaint: 'Doctor gave me Metformin. I have a very sensitive stomach and easily get nauseous. A coworker told me Metformin gave her terrible diarrhea. I am terrified of taking it.',
      isFirstTimeUser: true,
      baselineMood: 'anxious',
      communicationStyle: 'Articulate, inquisitive, anxious about gastrointestinal upset and insulin progression.',
    },
    prescription: {
      medicationName: 'Metformin Hydrochloride',
      genericName: 'Metformin',
      brandName: 'Glucophage',
      strength: '500 mg',
      dosageForm: 'Film-coated Tablet',
      directions: 'Take 1 tablet once daily with the evening meal for 1 week, then increase to 1 tablet twice daily with meals',
      frequency: 'Initially once daily, titrating to twice daily',
      timing: 'With or immediately after meals',
      duration: '30-day starter supply',
      quantity: '60 tablets',
      refills: 3,
      prescriber: 'Dr. Clara Miller, Endocrinologist',
      prescribedFor: 'Glycemic control and insulin sensitivity improvement',
    },
    hiddenInfo: {
      allergies: ['Sulfonamides (gives skin hives)'],
      concurrentMedications: ['Multivitamin once daily in the morning'],
      otcAndSupplements: ['Takes occasional antacid chews for indigestion'],
      lifestyleDiet: [
        'Enjoys 1-2 glasses of dry wine on Friday and Saturday evenings',
        'Loves carbohydrate-heavy comfort foods (pasta, bakery items) due to grading stress',
        'Sedentary lifestyle with minimal exercise'
      ],
      vitalSignsOrLabs: 'HbA1c 7.6%, Fasting Blood Glucose 148 mg/dL, eGFR 85 mL/min (Normal)',
      hiddenMisconceptionsOrFears: [
        'Worries that starting medication means her diabetes is severe and she will need insulin injections soon',
        'Considers skipping doses on school teaching days if she feels any stomach cramping',
        'Unaware that taking it with substantial food drastically reduces stomach side effects'
      ],
      revealedMap: {
        allergies: false,
        wine: false,
        giFear: false,
        insulinFear: false,
      }
    },
    learningObjectives: [
      'Empathize with patient fears regarding stomach upset and validate concerns.',
      'Explain the rationale for gradual dose titration: start once daily with dinner, then increase after 7 days.',
      'Emphasize the golden rule: ALWAYS take Metformin with or immediately after a substantial meal.',
      'Reassure that gastrointestinal symptoms are usually mild and subside within 1-2 weeks.',
      'Advise on alcohol moderation: excessive alcohol increases the rare risk of lactic acidosis.',
      'Debunk the fear of immediate insulin need: explain Metformin helps her own body use insulin effectively.',
      'Encourage self-monitoring of blood glucose and healthy dietary adjustments.',
      'Use the Teach-Back method to verify understanding of meal timing and dose escalation.'
    ],
    suggestedPromptCategories: [
      {
        categoryName: '1. Introduction & Empathy',
        prompts: [
          'Hello Ms. Jenkins, I understand you are here to pick up your Metformin prescription. How are you feeling today?',
          'I hear you have some concerns about stomach upset with Metformin. Let\'s walk through easy ways to prevent that completely.'
        ]
      },
      {
        categoryName: '2. Timing & GI Protection',
        prompts: [
          'The key secret to Metformin is taking it right in the middle or immediately after your heaviest meal, never on an empty stomach.',
          'Your doctor has you starting with just 1 tablet once daily for the first week so your digestive system adapts smoothly.'
        ]
      },
      {
        categoryName: '3. Alcohol & Safety',
        prompts: [
          'Do you occasionally drink alcoholic beverages like wine? Excessive alcohol can interact with Metformin and stress the body.',
          'Mild loose stools or nausea usually resolve within 1 to 2 weeks as your body gets accustomed to the medicine.'
        ]
      },
      {
        categoryName: '4. Reassurance & Teach-Back',
        prompts: [
          'Taking Metformin does not mean you will need insulin; it actually keeps your natural insulin working smoothly for many years.',
          'Could you describe how you plan to start your medication this evening with dinner?'
        ]
      }
    ],
    dialogueRules: [
      {
        id: 'rule-sarah-greet',
        triggerKeywords: ['hello', 'hi', 'ms jenkins', 'sarah', 'pharmacist', 'confirm identity'],
        intent: 'Introduction and verification',
        competencyTarget: 'intro_identification',
        patientResponse: 'Hello! Yes, I\'m Sarah Jenkins. I just came from Dr. Miller\'s clinic. I have to admit, seeing "Metformin" on the prescription really scared me.',
        moodReaction: 'anxious',
        marksChecklistItemId: 'check-sarah-intro'
      },
      {
        id: 'rule-sarah-time-consent',
        triggerKeywords: ['few minutes', 'have a minute', 'have time', 'minute to counsel', 'counsel', 'discuss', 'time to talk', 'speak with you', 'consultation', 'talk to you', 'go over', 'can i talk', 'can we discuss'],
        intent: 'Gaining consent and establishing counseling time',
        competencyTarget: 'intro_identification',
        patientResponse: 'Yes, certainly! I\'m actually very glad you offered, because I have several questions and concerns about this Metformin. Please go ahead.',
        moodReaction: 'reassured',
        marksChecklistItemId: 'check-sarah-consent'
      },
      {
        id: 'rule-sarah-gi-concern',
        triggerKeywords: ['stomach', 'nausea', 'diarrhea', 'cramp', 'side effect', 'upset', 'sensitive', 'meal', 'food'],
        intent: 'Addressing GI side effects and meal timing',
        competencyTarget: 'med_instructions',
        patientResponse: 'That is my biggest nightmare. As a teacher, I can\'t just run out of the classroom to the restroom! So you are saying if I take it right after a full meal, it cushions the stomach?',
        moodReaction: 'curious',
        marksChecklistItemId: 'check-sarah-meal'
      },
      {
        id: 'rule-sarah-titration',
        triggerKeywords: ['titrate', 'titration', 'increase', 'one week', 'start slow', '500', 'twice daily', 'starter'],
        intent: 'Explaining dosage titration schedule',
        competencyTarget: 'med_instructions',
        patientResponse: 'Oh! So Dr. Miller specifically started me on just one pill at dinner for the first 7 days, and only then moving to twice a day. That makes so much more sense. I thought I had to jump straight into two pills immediately.',
        moodReaction: 'relieved',
        marksChecklistItemId: 'check-sarah-titration'
      },
      {
        id: 'rule-sarah-alcohol',
        triggerKeywords: ['wine', 'alcohol', 'drink', 'beer', 'lactic acidosis', 'weekend'],
        intent: 'Counseling on alcohol interaction and lactic acidosis risk',
        competencyTarget: 'lifestyle_counseling',
        patientResponse: 'I do love a glass or two of wine on Friday evenings after teaching all week. So heavy drinking or binging is dangerous with Metformin due to lactic acidosis? I will definitely stick to water or at most one small glass with plenty of food.',
        revealsHiddenKey: 'wine',
        moodReaction: 'reassured',
        marksChecklistItemId: 'check-sarah-alcohol'
      },
      {
        id: 'rule-sarah-insulin-fear',
        triggerKeywords: ['insulin', 'needle', 'failing', 'pancreas', 'severe', 'manageable', 'lifestyle', 'first line'],
        intent: 'Reassuring patient regarding diabetes prognosis and medication purpose',
        competencyTarget: 'med_benefits',
        patientResponse: 'Thank you for saying that. I cried in the car thinking this meant my body was giving up and I\'d be on insulin within months. Hearing that Metformin is standard first-line protection gives me so much peace of mind.',
        revealsHiddenKey: 'insulinFear',
        moodReaction: 'grateful',
        marksChecklistItemId: 'check-sarah-reassurance'
      },
      {
        id: 'rule-sarah-allergy',
        triggerKeywords: ['allergy', 'allergic', 'sulfa', 'sulfonamide', 'reaction'],
        intent: 'Checking allergies',
        competencyTarget: 'med_history',
        patientResponse: 'I am allergic to Sulfa antibiotics like Bactrim—I broke out in bad hives as a teenager. Metformin doesn\'t contain sulfa, does it?',
        revealsHiddenKey: 'allergies',
        moodReaction: 'neutral',
        marksChecklistItemId: 'check-sarah-allergy'
      },
      {
        id: 'rule-sarah-teachback',
        triggerKeywords: ['teach back', 'repeat', 'in your own words', 'summarize', 'show me how', 'how will you take'],
        intent: 'Teach-back verification',
        competencyTarget: 'teach_back',
        patientResponse: 'To recap: for the first week, I take 1 tablet once daily with my evening dinner. After one week, if my stomach is happy, I increase to 1 tablet with breakfast and 1 with dinner. Never take on an empty stomach. Limit wine, and call you if nausea doesn\'t settle down after 10-14 days!',
        moodReaction: 'reassured',
        marksChecklistItemId: 'check-sarah-teachback'
      },
      {
        id: 'rule-sarah-closing',
        triggerKeywords: ['question', 'anything else', 'call us', 'contact', 'follow up', 'good luck', 'welcome'],
        intent: 'Professional closing and encouragement',
        competencyTarget: 'closing',
        patientResponse: 'You are so kind and knowledgeable. I feel prepared instead of terrified now. I will start tonight with my roast chicken dinner. Have a wonderful evening!',
        moodReaction: 'grateful',
        marksChecklistItemId: 'check-sarah-closing'
      }
    ]
  },
  {
    id: 'case-gastritis-omeprazole',
    title: 'Chronic GERD & Acid Reflux',
    subtitle: 'Omeprazole 20 mg counseling on crucial pre-meal timing & lifestyle triggers',
    difficulty: 'Intermediate',
    diseaseCategory: 'Gastrointestinal',
    estimatedMinutes: 8,
    tags: ['GERD', 'PPI', 'Timing', 'Coffee', 'Antacids'],
    patient: {
      id: 'patient-david',
      name: 'David Chen',
      age: 38,
      gender: 'Male',
      occupation: 'Software Engineer',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      diagnosis: 'Gastroesophageal Reflux Disease (GERD) & Erosive Gastritis',
      diseaseCategory: 'Gastrointestinal',
      chiefComplaint: 'Severe burning chest pain and sour throat regurgitation at night for 3 weeks. Chewable antacids aren\'t working anymore.',
      isFirstTimeUser: true,
      baselineMood: 'curious',
      communicationStyle: 'Direct, logical, busy, wants quick fixes and asks technical questions on how it works.',
    },
    prescription: {
      medicationName: 'Omeprazole Delayed-Release Capsules',
      genericName: 'Omeprazole',
      brandName: 'Prilosec',
      strength: '20 mg',
      dosageForm: 'Enteric-Coated Capsule',
      directions: 'Take 1 capsule once daily 30 to 60 minutes before breakfast with a full glass of water',
      frequency: 'Once daily in the morning',
      timing: '30-60 minutes before morning breakfast',
      duration: '4-week course',
      quantity: '28 capsules',
      refills: 1,
      prescriber: 'Dr. Kevin Tan, Gastroenterologist',
      prescribedFor: 'Acid suppression and mucosal healing',
    },
    hiddenInfo: {
      allergies: ['No known allergies'],
      concurrentMedications: ['Chews Calcium Carbonate (Tums) 4-6 tablets whenever symptoms strike'],
      otcAndSupplements: ['None'],
      lifestyleDiet: [
        'Drinks 4 shots of dark espresso every morning on an empty stomach',
        'Works late and eats heavy spicy takeout dinners at 10:30 PM, then sleeps at 11:30 PM',
        'Lies flat on a single low pillow'
      ],
      vitalSignsOrLabs: 'Endoscopy revealed mild lower esophageal mucosal inflammation',
      hiddenMisconceptionsOrFears: [
        'Expects Omeprazole to relieve pain immediately within 10 minutes like an antacid',
        'Was planning to take the capsule right before bed whenever he feels heartburn',
        'Sometimes breaks open capsules or chews pills if they are too big'
      ],
      revealedMap: {
        coffee: false,
        bedtimeSnack: false,
        immediateRelief: false,
        swallowWhole: false
      }
    },
    learningObjectives: [
      'Clarify that Omeprazole is a Proton Pump Inhibitor (PPI), NOT an immediate on-demand antacid.',
      'Explain that peak acid suppression takes 1 to 4 days of consistent daily use.',
      'Emphasize the strict administration timing: 30 to 60 minutes BEFORE the first meal of the day.',
      'Instruct to swallow the capsule WHOLE with water; do not crush, open, or chew the enteric-coated beads.',
      'Counsel on lifestyle changes: avoid eating within 3 hours of sleep, elevate head of bed, moderate espresso.',
      'Explain course duration: 4 weeks for tissue healing, avoid abrupt cessation without medical guidance.',
      'Teach-back method to verify patient will take it 30 mins before breakfast rather than at bedtime.'
    ],
    suggestedPromptCategories: [
      {
        categoryName: '1. Timing & Administration',
        prompts: [
          'Mr. Chen, timing is everything with Omeprazole: you must take it 30 to 60 minutes BEFORE breakfast.',
          'Always swallow the capsule whole with water—never crush, chew, or open it.',
          'Unlike chewable antacids, Omeprazole is a preventative healer that takes 1 to 4 days for full effect.'
        ]
      },
      {
        categoryName: '2. Lifestyle & Acid Triggers',
        prompts: [
          'What are your eating and sleeping habits at night? Eating late heavily aggravates acid reflux.',
          'Do you consume coffee, citrus, or spicy foods on an empty stomach?'
        ]
      },
      {
        categoryName: '3. Verification & Teach-Back',
        prompts: [
          'Can you tell me how you will take this capsule tomorrow morning?',
          'What will you do if you experience mild breakthrough heartburn during the first 2 days?'
        ]
      }
    ],
    dialogueRules: [
      {
        id: 'rule-david-greet',
        triggerKeywords: ['hello', 'hi', 'mr chen', 'david', 'pharmacist', 'confirm'],
        intent: 'Introduction',
        competencyTarget: 'intro_identification',
        patientResponse: 'Hey Pharmacist! David Chen here. I need this Omeprazole so I can stop feeling like my chest is on fire every night.',
        moodReaction: 'neutral',
        marksChecklistItemId: 'check-david-intro'
      },
      {
        id: 'rule-david-time-consent',
        triggerKeywords: ['few minutes', 'have a minute', 'have time', 'minute to counsel', 'counsel', 'discuss', 'time to talk', 'speak with you', 'consultation', 'talk to you', 'go over', 'can i talk', 'can we discuss'],
        intent: 'Gaining consent and establishing counseling time',
        competencyTarget: 'intro_identification',
        patientResponse: 'Yes, definitely! Please walk me through it. I really need to get this acid reflux under control so I can sleep normally again. What do I need to know?',
        moodReaction: 'reassured',
        marksChecklistItemId: 'check-david-consent'
      },
      {
        id: 'rule-david-timing-morning',
        triggerKeywords: ['30 minutes', 'before breakfast', 'empty stomach', 'morning', 'before meal', 'full glass of water'],
        intent: 'Explaining pre-meal timing requirement',
        competencyTarget: 'med_instructions',
        patientResponse: 'Wait, 30 to 60 minutes BEFORE breakfast? Honestly, I was planning on keeping the bottle on my nightstand and popping one right before bed when my heartburn starts! Why does it have to be before breakfast?',
        moodReaction: 'surprised',
        marksChecklistItemId: 'check-david-timing'
      },
      {
        id: 'rule-david-mechanism-proton-pumps',
        triggerKeywords: ['proton pumps', 'acid pumps', 'activated by food', 'meal activates', 'circulate', 'delayed release'],
        intent: 'Explaining physiological mechanism of PPI activation',
        competencyTarget: 'med_benefits',
        patientResponse: 'Fascinating. So the medication needs to be in my bloodstream right when the stomach acid pumps are stimulated by breakfast to shut them down effectively. That engineering logic makes total sense.',
        moodReaction: 'reassured',
        marksChecklistItemId: 'check-david-mechanism'
      },
      {
        id: 'rule-david-onset-not-instant',
        triggerKeywords: ['not instant', '1 to 4 days', 'takes time', 'full effect', 'not an antacid', 'healing'],
        intent: 'Clarifying delayed onset vs immediate antacids',
        competencyTarget: 'med_benefits',
        patientResponse: 'Good thing you told me, because if it didn\'t soothe my heartburn in 15 minutes, I would have assumed it was a dud. Can I still use a chewable antacid for temporary relief during the first 2-3 days?',
        moodReaction: 'curious',
        marksChecklistItemId: 'check-david-onset'
      },
      {
        id: 'rule-david-swallow-whole',
        triggerKeywords: ['swallow whole', 'do not crush', 'do not chew', 'enteric', 'beads', 'capsule'],
        intent: 'Administration technique: intact capsule',
        competencyTarget: 'med_instructions',
        patientResponse: 'Got it: swallow the capsule whole with water. No chewing or opening it because the coating protects the medicine from stomach acid.',
        moodReaction: 'reassured',
        marksChecklistItemId: 'check-david-swallow'
      },
      {
        id: 'rule-david-lifestyle',
        triggerKeywords: ['coffee', 'espresso', 'late dinner', 'sleep', 'pillow', 'elevate', 'spicy', 'trigger'],
        intent: 'Lifestyle modifications for GERD',
        competencyTarget: 'lifestyle_counseling',
        patientResponse: 'Guilty as charged. I drink 4 espressos daily and eat spicy food at 10:30 PM before sleeping. I\'ll switch to morning oatmeal, elevate my head, and stop eating at least 3 hours before bed.',
        revealsHiddenKey: 'coffee',
        moodReaction: 'grateful',
        marksChecklistItemId: 'check-david-lifestyle'
      },
      {
        id: 'rule-david-teachback',
        triggerKeywords: ['teach back', 'repeat', 'in your own words', 'summarize', 'confirm how'],
        intent: 'Teach-back verification',
        competencyTarget: 'teach_back',
        patientResponse: 'Understood: 1 capsule every morning, 30-60 minutes before breakfast with water. Swallow whole. It takes 1-4 days to reach maximum healing power. No late dinners or caffeine on an empty stomach. 4-week course.',
        moodReaction: 'reassured',
        marksChecklistItemId: 'check-david-teachback'
      },
      {
        id: 'rule-david-closing',
        triggerKeywords: ['questions', 'help', 'anything else', 'call us', 'goodbye', 'take care'],
        intent: 'Closing',
        competencyTarget: 'closing',
        patientResponse: 'You just saved me from weeks of misuse and frustration. High five, Pharmacist! Thanks a lot!',
        moodReaction: 'grateful',
        marksChecklistItemId: 'check-david-closing'
      }
    ]
  },
  {
    id: 'case-antibiotic-amoxicillin',
    title: 'Acute Bacterial Infection & Resistance',
    subtitle: 'Amoxicillin 500 mg counseling on completing the full course & allergy differentiation',
    difficulty: 'Intermediate',
    diseaseCategory: 'Infectious Disease',
    estimatedMinutes: 9,
    tags: ['Antibiotics', 'Amoxicillin', 'Adherence', 'Resistance', 'Contraceptives'],
    patient: {
      id: 'patient-maya',
      name: 'Maya Pratama',
      age: 24,
      gender: 'Female',
      occupation: 'Graduate Student & Teaching Assistant',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      diagnosis: 'Acute Streptococcal Tonsillopharyngitis (Strep Throat)',
      diseaseCategory: 'Infectious Disease',
      chiefComplaint: 'Severe painful throat, fever of 38.6°C, swollen tonsils with white exudates. Prescribed Amoxicillin.',
      isFirstTimeUser: false,
      baselineMood: 'anxious',
      communicationStyle: 'Polite, in a hurry, eager to feel better quickly for upcoming thesis presentation.',
    },
    prescription: {
      medicationName: 'Amoxicillin Capsules',
      genericName: 'Amoxicillin',
      brandName: 'Amoxil',
      strength: '500 mg',
      dosageForm: 'Hard Gelatin Capsule',
      directions: 'Take 1 capsule every 8 hours (3 times daily) for a full 7 days',
      frequency: 'Every 8 hours (Three times a day)',
      timing: 'Evenly spaced throughout the day, with or without food',
      duration: 'Full 7-day course',
      quantity: '21 capsules',
      refills: 0,
      prescriber: 'Dr. Anita Kusuma, Sp.THT',
      prescribedFor: 'Bacterial streptococcal infection',
    },
    hiddenInfo: {
      allergies: ['Thinks she might have had a childhood viral rash with penicillin, but parents aren\'t sure'],
      concurrentMedications: ['Combined Oral Contraceptive Pill (Ethinylestradiol/Levonorgestrel) taken daily'],
      otcAndSupplements: ['Paracetamol 500 mg for throat pain and fever'],
      lifestyleDiet: [
        'Busy student schedule, often forgets midday doses when on campus',
        'Admits she usually stops antibiotics after 2 or 3 days once her fever drops to save pills'
      ],
      vitalSignsOrLabs: 'Rapid Strep Antigen Test Positive, Temp 38.6°C',
      hiddenMisconceptionsOrFears: [
        'Believes stopping early when feeling healthy is "better for the body and builds natural immunity"',
        'Does not know that missing doses or stopping early causes bacterial rebound and antibiotic resistance',
        'Unaware that severe vomiting or diarrhea from antibiotics can impair oral contraceptive absorption'
      ],
      revealedMap: {
        birthControl: false,
        stopEarlyHabit: false,
        allergyHistory: false
      }
    },
    learningObjectives: [
      'Investigate reported penicillin allergy history (differentiate mild viral rash vs true IgE-mediated anaphylaxis).',
      'Explain the critical necessity of completing the ENTIRE 7-day course (21 capsules), even when symptoms vanish.',
      'Explain antibiotic resistance and the risk of recurrent or complicated rheumatic infection if stopped prematurely.',
      'Instruct on spacing doses evenly: every 8 hours (e.g. 7 AM, 3 PM, 11 PM) to maintain therapeutic blood levels.',
      'Screen for drug interactions: oral contraceptives and advising backup barrier methods if diarrhea/vomiting occurs.',
      'Review common side effects (mild diarrhea, nausea) vs red flag signs (severe watery diarrhea/C. diff, rash, wheezing).',
      'Conduct teach-back to ensure adherence to course duration and dose spacing.'
    ],
    suggestedPromptCategories: [
      {
        categoryName: '1. Allergy & Identity Check',
        prompts: [
          'Hi Maya, before we begin, have you ever experienced an allergic reaction such as swelling or hives to penicillin or amoxicillin?',
          'Do you take any daily medications such as oral contraceptives or supplements?'
        ]
      },
      {
        categoryName: '2. Spacing & Full Course Adherence',
        prompts: [
          'You need to take 1 capsule every 8 hours, for example around 7 AM, 3 PM, and 11 PM.',
          'The most vital point is finishing all 21 capsules for the full 7 days, even if your throat feels 100% healed by day 3.',
          'Stopping early leaves the strongest bacteria alive, which can cause a worse rebound infection and resistance.'
        ]
      },
      {
        categoryName: '3. Red Flags & Back-up Contraception',
        prompts: [
          'If you experience severe vomiting or diarrhea, your birth control pill might not absorb properly, so use backup protection.',
          'Call our pharmacy immediately if you notice an unexpected skin rash or breathing difficulty.'
        ]
      }
    ],
    dialogueRules: [
      {
        id: 'rule-maya-greet',
        triggerKeywords: ['hello', 'hi', 'maya', 'confirm name', 'pharmacist'],
        intent: 'Introduction',
        competencyTarget: 'intro_identification',
        patientResponse: 'Hello Pharmacist! Yes, I\'m Maya Pratama. My throat is so inflamed I can barely swallow, and I have a thesis presentation in 5 days!',
        moodReaction: 'anxious',
        marksChecklistItemId: 'check-maya-intro'
      },
      {
        id: 'rule-maya-time-consent',
        triggerKeywords: ['few minutes', 'have a minute', 'have time', 'minute to counsel', 'counsel', 'discuss', 'time to talk', 'speak with you', 'consultation', 'talk to you', 'go over', 'can i talk', 'can we discuss'],
        intent: 'Gaining consent and establishing counseling time',
        competencyTarget: 'intro_identification',
        patientResponse: 'Yes, sure! I have a few minutes before my next graduate seminar. Please tell me how I should take these antibiotics.',
        moodReaction: 'reassured',
        marksChecklistItemId: 'check-maya-consent'
      },
      {
        id: 'rule-maya-allergy',
        triggerKeywords: ['allergy', 'allergic', 'penicillin', 'rash', 'hives', 'swelling', 'reaction'],
        intent: 'Allergy screening and history clarification',
        competencyTarget: 'med_history',
        patientResponse: 'My mom once said I had a mild pink rash when I was 3 during an ear infection, but my doctor tested me last year and said it wasn\'t a true allergy, just a viral rash. I\'ve taken amoxicillin since without any problem.',
        revealsHiddenKey: 'allergyHistory',
        moodReaction: 'neutral',
        marksChecklistItemId: 'check-maya-allergy'
      },
      {
        id: 'rule-maya-contraceptive',
        triggerKeywords: ['other medications', 'birth control', 'contraceptive', 'supplements', 'daily pills'],
        intent: 'Identifying concurrent medications and contraceptive counseling',
        competencyTarget: 'med_history',
        patientResponse: 'I take a daily combination birth control pill every morning. Does Amoxicillin interfere with that?',
        revealsHiddenKey: 'birthControl',
        moodReaction: 'curious',
        marksChecklistItemId: 'check-maya-contraceptive'
      },
      {
        id: 'rule-maya-contraceptive-advice',
        triggerKeywords: ['vomit', 'diarrhea', 'backup', 'barrier', 'condom', 'absorption', 'effectiveness'],
        intent: 'Counseling on contraceptive absorption during GI upset',
        competencyTarget: 'side_effects',
        patientResponse: 'Understood. If I get severe diarrhea or vomiting from the antibiotic, my birth control pill might not absorb fully, so I should use backup protection like condoms for that cycle. Good to know!',
        moodReaction: 'reassured',
        marksChecklistItemId: 'check-maya-contraceptive-advice'
      },
      {
        id: 'rule-maya-stop-early-habit',
        triggerKeywords: ['finish all', '7 days', 'complete course', 'stop early', 'day 3', 'all 21', 'resistance', 'rebound'],
        intent: 'Counseling on complete antibiotic adherence and resistance',
        competencyTarget: 'med_instructions',
        patientResponse: 'I have to confess: in the past, whenever my fever broke after 2 or 3 days, I stopped taking antibiotics to save them for emergencies. You\'re saying doing that actually breeds superbug resistance and could bring my strep throat back with a vengeance?',
        revealsHiddenKey: 'stopEarlyHabit',
        moodReaction: 'surprised',
        marksChecklistItemId: 'check-maya-resistance'
      },
      {
        id: 'rule-maya-spacing-schedule',
        triggerKeywords: ['every 8 hours', '3 times a day', 'schedule', '7 am', 'alarm', 'spaced'],
        intent: 'Explaining dosage schedule',
        competencyTarget: 'med_instructions',
        patientResponse: 'Every 8 hours: 7 AM when I wake up, 3 PM between classes, and 11 PM before bed. I\'ll set alarms on my phone right now so I don\'t miss any doses on campus.',
        moodReaction: 'reassured',
        marksChecklistItemId: 'check-maya-spacing'
      },
      {
        id: 'rule-maya-teachback',
        triggerKeywords: ['teach back', 'repeat', 'in your own words', 'summarize', 'confirm understanding'],
        intent: 'Teach-back verification',
        competencyTarget: 'teach_back',
        patientResponse: 'Sure! I will take 1 capsule every 8 hours with water. I MUST finish all 21 capsules across the entire 7 days, even when I feel great on day 3. If I have severe diarrhea, use backup contraception. And call immediately if I develop an allergic rash.',
        moodReaction: 'reassured',
        marksChecklistItemId: 'check-maya-teachback'
      },
      {
        id: 'rule-maya-closing',
        triggerKeywords: ['questions', 'help', 'feel better', 'good luck', 'take care', 'closing'],
        intent: 'Closing and well-wishes',
        competencyTarget: 'closing',
        patientResponse: 'Thank you so much, Pharmacist! You explained that so clearly and without judging my past habits. I will take all 7 days without fail!',
        moodReaction: 'grateful',
        marksChecklistItemId: 'check-maya-closing'
      }
    ]
  },
  {
    id: 'case-dyslipidemia-simvastatin',
    title: 'Elevated Cholesterol & Statin Safety',
    subtitle: 'Simvastatin 20 mg counseling with grapefruit interaction & myopathy awareness',
    difficulty: 'Advanced',
    diseaseCategory: 'Dyslipidemia',
    estimatedMinutes: 9,
    tags: ['Dyslipidemia', 'Simvastatin', 'Grapefruit', 'Myopathy', 'Night Dosing'],
    patient: {
      id: 'patient-robert',
      name: 'Robert Hayes',
      age: 59,
      gender: 'Male',
      occupation: 'Senior Corporate Accountant',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      diagnosis: 'Primary Hypercholesterolemia (LDL 168 mg/dL)',
      diseaseCategory: 'Dyslipidemia',
      chiefComplaint: 'Doctor gave me Simvastatin because my LDL is 168. I read terrifying articles on the internet about statins destroying muscles and causing dementia. Is this safe?',
      isFirstTimeUser: true,
      baselineMood: 'skeptical',
      communicationStyle: 'Analytical, questioning, skeptical due to online health forums, likes detailed medical evidence.',
    },
    prescription: {
      medicationName: 'Simvastatin Tablets',
      genericName: 'Simvastatin',
      brandName: 'Zocor',
      strength: '20 mg',
      dosageForm: 'Oral Film-coated Tablet',
      directions: 'Take 1 tablet once daily in the evening at bedtime',
      frequency: 'Once daily',
      timing: 'Evening / bedtime',
      duration: '30-day supply with 5 authorized refills',
      quantity: '30 tablets',
      refills: 5,
      prescriber: 'Dr. Arthur Vance, Cardiologist',
      prescribedFor: 'Cardiovascular event prevention & LDL reduction',
    },
    hiddenInfo: {
      allergies: ['No drug allergies'],
      concurrentMedications: ['Aspirin 81 mg daily with breakfast for heart protection'],
      otcAndSupplements: ['Coenzyme Q10 supplement (started last week after reading online)'],
      lifestyleDiet: [
        'Drinks a large glass of freshly squeezed pink grapefruit juice every morning with breakfast',
        'Follows a diet high in red meat and aged cheeses',
        'Enjoys moderate weekend golf'
      ],
      vitalSignsOrLabs: 'Total Chol 248 mg/dL, LDL 168 mg/dL, HDL 42 mg/dL, Triglycerides 190 mg/dL, AST/ALT normal',
      hiddenMisconceptionsOrFears: [
        'Believes statins cause widespread permanent muscle melting in most people',
        'Has no idea that grapefruit juice heavily inhibits CYP3A4 metabolism of Simvastatin, multiplying blood levels by up to 300%',
        'Wonders why the doctor specified "at bedtime" instead of taking it in the morning with his aspirin'
      ],
      revealedMap: {
        grapefruit: false,
        bedtimeReason: false,
        muscleFear: false,
        coq10: false
      }
    },
    learningObjectives: [
      'Acknowledge and systematically de-escalate internet-fueled fears regarding statin safety with clinical facts.',
      'Explain why Simvastatin is taken in the evening: the liver produces the majority of cholesterol while sleeping.',
      'Identify the high-risk food interaction: STRICTLY avoid grapefruit and grapefruit juice due to CYP3A4 inhibition.',
      'Differentiate normal exercise soreness from true statin-induced myopathy (unexplained bilateral proximal muscle ache, weakness, dark cola-colored urine).',
      'Discuss co-supplementation with CoQ10 if raised by patient and advise transparent communication with the doctor.',
      'Emphasize heart attack and stroke prevention benefits backed by decades of clinical trial evidence.',
      'Conduct teach-back on bedtime administration, grapefruit avoidance, and reporting unusual muscle symptoms.'
    ],
    suggestedPromptCategories: [
      {
        categoryName: '1. Reassurance & Online Myths',
        prompts: [
          'Hello Mr. Hayes. I appreciate you bringing up what you read online. Let\'s look at the actual clinical evidence together.',
          'Statins are among the most rigorously studied medications in history, preventing thousands of heart attacks and strokes.'
        ]
      },
      {
        categoryName: '2. Timing & Grapefruit Warning',
        prompts: [
          'Simvastatin is specifically taken at bedtime because your liver synthesizes most cholesterol during the nighttime hours.',
          'Do you consume grapefruit or grapefruit juice? It severely blocks the enzyme that clears simvastatin, which can lead to high drug toxicity.',
          'You must avoid grapefruit while taking Simvastatin; other fruits like oranges, lemons, and apples are completely safe.'
        ]
      },
      {
        categoryName: '3. Muscle Symptoms & Teach-Back',
        prompts: [
          'Severe muscle damage is very rare (less than 0.1%). If you ever experience unexplained muscle soreness or dark brown urine, notify us immediately.',
          'Could you tell me what you will do regarding your morning fruit juice and when you will take this tablet?'
        ]
      }
    ],
    dialogueRules: [
      {
        id: 'rule-robert-greet',
        triggerKeywords: ['hello', 'hi', 'mr hayes', 'robert', 'pharmacist', 'confirm identity'],
        intent: 'Introduction',
        competencyTarget: 'intro_identification',
        patientResponse: 'Good day, Pharmacist. I\'m Robert Hayes. I must tell you upfront, I am very hesitant about this Simvastatin prescription after reading several alarming posts online.',
        moodReaction: 'skeptical',
        marksChecklistItemId: 'check-robert-intro'
      },
      {
        id: 'rule-robert-time-consent',
        triggerKeywords: ['few minutes', 'have a minute', 'have time', 'minute to counsel', 'counsel', 'discuss', 'time to talk', 'speak with you', 'consultation', 'talk to you', 'go over', 'can i talk', 'can we discuss'],
        intent: 'Gaining consent and establishing counseling time',
        competencyTarget: 'intro_identification',
        patientResponse: 'Yes, of course. I do have time, and I would appreciate hearing your professional perspective on this Simvastatin before I begin.',
        moodReaction: 'reassured',
        marksChecklistItemId: 'check-robert-consent'
      },
      {
        id: 'rule-robert-statin-fear',
        triggerKeywords: ['myth', 'internet', 'evidence', 'clinical trial', 'safety', 'benefit', 'stroke', 'heart attack', 'cholesterol', 'protect'],
        intent: 'De-escalating statin safety concerns with clinical evidence',
        competencyTarget: 'med_benefits',
        patientResponse: 'Hearing that serious muscle issues occur in less than 1 in 10,000 patients puts things in perspective. The internet tends to magnify horror stories while ignoring the millions of people who avoid heart attacks because of statins.',
        revealsHiddenKey: 'muscleFear',
        moodReaction: 'reassured',
        marksChecklistItemId: 'check-robert-safety'
      },
      {
        id: 'rule-robert-evening-timing',
        triggerKeywords: ['evening', 'bedtime', 'night', 'why at night', 'liver', 'synthesis', 'timing', 'sleep'],
        intent: 'Explaining bedtime administration rationales',
        competencyTarget: 'med_instructions',
        patientResponse: 'Ah, so the enzyme in the liver that produces cholesterol is most active at night while I am sleeping! That explains why Dr. Vance emphasized taking it at bedtime rather than morning with my coffee.',
        revealsHiddenKey: 'bedtimeReason',
        moodReaction: 'reassured',
        marksChecklistItemId: 'check-robert-bedtime'
      },
      {
        id: 'rule-robert-grapefruit-interaction',
        triggerKeywords: ['grapefruit', 'grapefruit juice', 'citrus', 'cyp3a4', 'enzyme', 'interaction', 'food'],
        intent: 'Critical counseling on grapefruit-induced toxicity',
        competencyTarget: 'lifestyle_counseling',
        patientResponse: 'Good heavens! I drink a full glass of fresh pink grapefruit juice every single morning! You are saying grapefruit inhibits the CYP3A4 enzyme and can boost Simvastatin levels in my blood by multiple times?! I am tossing the grapefruits out today.',
        revealsHiddenKey: 'grapefruit',
        moodReaction: 'surprised',
        marksChecklistItemId: 'check-robert-grapefruit'
      },
      {
        id: 'rule-robert-muscle-symptoms',
        triggerKeywords: ['muscle pain', 'myopathy', 'rhabdomyolysis', 'dark urine', 'cola', 'weakness', 'soreness', 'unexplained'],
        intent: 'Counseling on myopathy detection and red flags',
        competencyTarget: 'side_effects',
        patientResponse: 'Understood: general golf stiffness is normal, but if I get severe, unexplained muscle weakness, soreness across both legs, or dark tea-colored urine, I should stop the medication and call my doctor immediately.',
        moodReaction: 'reassured',
        marksChecklistItemId: 'check-robert-myopathy'
      },
      {
        id: 'rule-robert-teachback',
        triggerKeywords: ['teach back', 'repeat', 'in your own words', 'summarize', 'confirm how'],
        intent: 'Teach-back verification',
        competencyTarget: 'teach_back',
        patientResponse: 'Let me confirm: I take 1 tablet of Simvastatin 20 mg every night at bedtime with water. I will completely cut out grapefruit juice and switch to orange juice. I will watch out for any unusual severe muscle pain or dark urine, and keep up my cholesterol diet.',
        moodReaction: 'reassured',
        marksChecklistItemId: 'check-robert-teachback'
      },
      {
        id: 'rule-robert-closing',
        triggerKeywords: ['questions', 'help', 'anything else', 'call us', 'closing', 'goodbye', 'have a nice day'],
        intent: 'Closing',
        competencyTarget: 'closing',
        patientResponse: 'Thank you for your thoroughness, Pharmacist. Your scientific explanation completely dispelled my skepticism. I appreciate your high standard of care.',
        moodReaction: 'grateful',
        marksChecklistItemId: 'check-robert-closing'
      }
    ]
  }
];
