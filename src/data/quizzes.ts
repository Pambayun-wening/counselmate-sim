import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q-principles-1',
    category: 'Framework',
    question: 'According to the Indian Health Service (IHS) counseling model, what is the primary purpose of the "Three Prime Questions"?',
    options: [
      'To verify the patient’s insurance eligibility and payment method',
      'To discover what the prescriber already told the patient regarding medication purpose, directions, and expectations',
      'To test if the patient remembers their prescription refill numbers',
      'To diagnose secondary diseases that the physician missed'
    ],
    correctIndex: 1,
    explanation: 'The Three Prime Questions determine what the prescriber told the patient about: 1) What the medication is for, 2) How to take it, and 3) What to expect. This prevents redundant explanations and establishes a baseline for counseling.',
    clinicalPearl: 'Asking open-ended prime questions saves time and keeps the conversation patient-centered rather than lecture-style.'
  },
  {
    id: 'q-principles-2',
    category: 'Framework',
    question: 'Which of the following phrases is the most effective implementation of the "Teach-Back" technique?',
    options: [
      '"Do you understand everything I just told you?"',
      '"Does all of that make sense to you, Mr. Smith?"',
      '"Just to make sure I explained everything clearly, could you share with me how you plan to take this medication tomorrow?"',
      '"Please sign here to verify that you understood our counseling session."'
    ],
    correctIndex: 2,
    explanation: 'Teach-back places the responsibility on the healthcare provider ("to make sure I explained everything clearly") rather than putting the patient on the defensive, and requires an open-ended explanation instead of a simple yes/no response.',
    clinicalPearl: 'Never ask "Do you understand?". Patients almost always nod "Yes" out of politeness or embarrassment.'
  },
  {
    id: 'q-admin-1',
    category: 'Administration',
    question: 'Why should Omeprazole delayed-release capsules be taken 30 to 60 minutes before breakfast rather than at bedtime?',
    options: [
      'To prevent insomnia caused by central nervous system excitation',
      'Because proton pumps are maximally stimulated after a meal, so the active drug must be in circulation right as acid secretion begins',
      'To avoid chemical degradation by bile acids present only at night',
      'Because omeprazole binds irreversibly to dietary calcium in the stomach'
    ],
    correctIndex: 1,
    explanation: 'PPIs only inhibit active (stimulated) proton pumps. Taking omeprazole 30-60 minutes before a meal ensures that peak blood concentrations coincide with food-stimulated proton pump activation.',
    clinicalPearl: 'Taking a PPI at bedtime or without subsequent food decreases its clinical efficacy by up to 50%.'
  },
  {
    id: 'q-admin-2',
    category: 'Administration',
    question: 'Why is Simvastatin recommended to be administered specifically in the evening or at bedtime?',
    options: [
      'Hepatic HMG-CoA reductase and endogenous cholesterol synthesis peak during nighttime fasting hours',
      'To prevent severe daytime sedation and cognitive impairment',
      'Because statins bind to morning sunlight, causing systemic photosensitivity',
      'To allow rapid absorption during active gastric motility'
    ],
    correctIndex: 0,
    explanation: 'Endogenous hepatic cholesterol synthesis primarily occurs overnight between midnight and 5:00 AM. Since Simvastatin has a short elimination half-life (~2-3 hours), evening administration ensures optimal enzyme inhibition.',
    clinicalPearl: 'Longer-acting statins like Atorvastatin and Rosuvastatin can be taken at any time of day, but short-acting statins (Simvastatin, Lovastatin) should always be taken in the evening.'
  },
  {
    id: 'q-side-effects-1',
    category: 'Side Effects',
    question: 'A patient starting Amlodipine 5 mg calls the pharmacy 3 weeks later reporting swollen ankles. What is the pharmacological mechanism causing this effect?',
    options: [
      'Acute proximal renal tubular injury resulting in sodium and water retention',
      'Preferential arteriolar dilation causing increased capillary hydrostatic pressure and fluid transudation into interstitial tissue',
      'Allergic IgE-mediated angioedema of the lower extremities',
      'Decreased hepatic albumin synthesis leading to reduced oncotic pressure'
    ],
    correctIndex: 1,
    explanation: 'Dihydropyridine calcium channel blockers (like Amlodipine) cause selective pre-capillary arteriolar vasodilation without equivalent venodilation, resulting in increased hydrostatic pressure in capillaries and fluid leaking into dependent interstitial spaces (ankle edema).',
    clinicalPearl: 'This is not renal fluid overload; diuretics are ineffective. Adding an ACE-inhibitor or ARB causes post-capillary venodilation and frequently relieves the edema.'
  },
  {
    id: 'q-side-effects-2',
    category: 'Side Effects',
    question: 'A 59-year-old patient on Simvastatin 20 mg reports taking pink grapefruit juice every morning. What clinical complication is this patient at highest risk for developing?',
    options: [
      'Statin-induced myopathy and potential rhabdomyolysis due to CYP3A4 inhibition',
      'Hyperglycemic hyperosmolar state due to insulin resistance',
      'Severe gastrointestinal hemorrhage due to platelet inhibition',
      'Kidney stone formation due to increased urinary calcium excretion'
    ],
    correctIndex: 0,
    explanation: 'Grapefruit contains furanocoumarins that irreversibly inhibit intestinal CYP3A4 enzymes. Simvastatin is extensively metabolized by CYP3A4; blocking this pathway increases systemic bioavailability and plasma concentration significantly, greatly increasing the risk of muscle toxicity and rhabdomyolysis.',
    clinicalPearl: 'Even a single glass of grapefruit juice (200 mL) can inhibit intestinal CYP3A4 for 24-48 hours.'
  },
  {
    id: 'q-comm-1',
    category: 'Communication',
    question: 'When counseling a patient with low health literacy or a newly diagnosed chronic illness, which communication strategy is most recommended?',
    options: [
      'Use formal medical terminology like "hyperlipidemia" and "pharmacokinetics" to sound authoritative',
      'Provide a 10-page printed medical journal article for independent study at home',
      '"Chunk and Check": break information into small, digestible units and verify comprehension after each key concept',
      'Avoid telling the patient about side effects so they do not feel frightened'
    ],
    correctIndex: 2,
    explanation: '"Chunk and Check" involves presenting one or two key pieces of information at a time and verifying patient comprehension before moving on. This prevents cognitive overload and enhances retention.',
    clinicalPearl: 'Use conversational, plain-language terms: say "blood pressure" instead of "vascular tension", and "kidney filter" instead of "glomerular filtration".'
  },
  {
    id: 'q-pharma-1',
    category: 'Pharmacology',
    question: 'What is the most effective counseling recommendation to minimize the gastrointestinal adverse effects (nausea, abdominal cramping, diarrhea) of immediate-release Metformin?',
    options: [
      'Take the medication at least 2 hours before food on an empty stomach with acidic fruit juice',
      'Take the medication with or immediately after a substantial meal, and utilize slow upward dose titration',
      'Chew the tablets thoroughly before swallowing',
      'Take the medication with high doses of magnesium hydroxide'
    ],
    correctIndex: 1,
    explanation: 'Taking Metformin with or immediately following meals significantly decreases local gastric irritation. Furthermore, starting at a low dose (e.g. 500 mg once daily) and titrating upward over 2-4 weeks allows the GI tract to adapt.',
    clinicalPearl: 'Extended-release (XR) formulations of Metformin can also be recommended if immediate-release causes persistent GI intolerance.'
  },
  {
    id: 'q-pharma-2',
    category: 'Pharmacology',
    question: 'A 24-year-old female patient prescribed Amoxicillin 500 mg for strep throat states: "I usually stop taking antibiotics as soon as my fever breaks so I don’t take extra chemicals." How should the pharmacist respond?',
    options: [
      '"That is a great idea to save money and keep the extra pills for next time."',
      '"You can stop if you want, but you must double your dose for the first 2 days."',
      '"Premature discontinuation leaves the most resilient bacteria alive, risking recurrent infection, complications, and microbial resistance."',
      '"Antibiotics only work if taken continuously for at least 6 months."'
    ],
    correctIndex: 2,
    explanation: 'Stopping antibiotic therapy prematurely eradicates only the most susceptible bacteria while allowing partially resistant strains to survive, multiply, and cause a more severe rebound infection with reduced susceptibility.',
    clinicalPearl: 'For streptococcal pharyngitis, completing the full course is also essential to prevent nonsuppurative complications such as acute rheumatic fever.'
  }
];
