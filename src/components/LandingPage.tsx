import React from 'react';
import { 
  Pill, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  MessageSquare, 
  HeartPulse, 
  Award, 
  Activity, 
  ChevronRight,
  BookOpen,
  HelpCircle,
  Users
} from 'lucide-react';
import { PageId } from './Navbar';
import { COUNSELING_CASES } from '../data/cases';

interface LandingPageProps {
  onNavigate: (page: PageId) => void;
  onSelectCase: (caseId: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, onSelectCase }) => {
  return (
    <div className="flex-1 flex flex-col bg-gradient-to-b from-slate-50 via-white to-slate-50">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        {/* Soft background accents */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-teal-100/50 via-sky-100/40 to-mint-100/40 blur-3xl -z-10 rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs sm:text-sm font-semibold shadow-sm animate-pulse-glow">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>Pharmacy Counseling Simulation Platform</span>
              <span className="text-teal-400">•</span>
              <span className="text-teal-700 font-bold">Practice. Communicate. Care.</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy-900 tracking-tight leading-[1.15]">
              Become a Better Pharmacist, <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-teal-600 to-navy-700 bg-clip-text text-transparent">
                One Conversation at a Time.
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
              CounselMate gives pharmacy students and aspiring clinical pharmacists a realistic, risk-free space to master patient communication, uncover hidden clinical interactions, and receive objective 10-competency feedback.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
              <button
                onClick={() => {
                  onSelectCase(COUNSELING_CASES[0].id);
                  onNavigate('simulation');
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-500 hover:to-teal-600 text-white font-bold text-base shadow-lg shadow-teal-600/25 hover:shadow-teal-600/35 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Pill className="w-5 h-5 -rotate-45" />
                <span>Start Practicing Now</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={() => onNavigate('cases')}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-navy-900 font-bold text-base border border-slate-200/90 shadow-sm hover:border-slate-300 transition-all"
              >
                <span>Explore All Cases</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Trust and Clinical Framework Chips */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-medium">
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>IHS Three Prime Questions</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>Teach-Back Verification Model</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>Objective 10-Competency Rubric</span>
              </div>
            </div>

            {/* Hero Visual Card */}
            <div className="pt-8 max-w-4xl mx-auto">
              <div className="relative rounded-3xl overflow-hidden shadow-elevated border border-slate-200/80 group">
                <img 
                  src="/hero_banner.jpg" 
                  alt="CounselMate Pharmacy Counseling Simulation Station" 
                  className="w-full h-auto object-cover max-h-[460px] transform group-hover:scale-[1.01] transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent flex items-end p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full text-white gap-4">
                    <div>
                      <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-teal-500/30 text-teal-300 text-xs font-bold backdrop-blur-sm border border-teal-400/40 mb-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>High-Fidelity Outpatient Clinical Simulation</span>
                      </div>
                      <p className="text-sm font-semibold text-slate-200">
                        Bridging classroom pharmacology and empathetic outpatient care.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        onSelectCase(COUNSELING_CASES[0].id);
                        onNavigate('simulation');
                      }}
                      className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-navy-950 font-bold text-xs shadow-md transition-all self-start sm:self-auto shrink-0"
                    >
                      Try Pak Budi Scenario (Amlodipine) →
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Feature Highlights Section */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl font-bold text-navy-900 tracking-tight">
              Engineered for Clinical Excellence
            </h2>
            <p className="mt-3 text-slate-600 text-base">
              CounselMate merges real clinical pharmacology with behavioral communication science so students transition seamlessly from textbook to patient counter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Feature 1 */}
            <div className="bg-slate-50/80 rounded-2xl p-7 border border-slate-200/70 hover:shadow-card hover:bg-white transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-teal-100/70 text-teal-700 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-navy-900 mb-2">
                Realistic Virtual Patients
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Interact with lifelike personas carrying unique emotional states, misconceptions, and hidden medical histories that only reveal when you ask the right questions.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-50/80 rounded-2xl p-7 border border-slate-200/70 hover:shadow-card hover:bg-white transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-sky-100/70 text-sky-700 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-navy-900 mb-2">
                10-Point Competency Evaluation
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Get scored instantly across 10 core clinical counseling competencies with personalized strengths, areas for improvement, and golden-standard question rephrasing.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-50/80 rounded-2xl p-7 border border-slate-200/70 hover:shadow-card hover:bg-white transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-mint-100/70 text-mint-600 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-navy-900 mb-2">
                Evidence-Based Drug Safety
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Cases reflect real-world outpatient scenarios: NSAID-hypertension interactions, grapefruit-statin toxicity, PPI pre-breakfast timing, and antibiotic resistance.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              Interactive Workflow
            </span>
            <h2 className="text-3xl font-bold text-navy-900 tracking-tight mt-3">
              How CounselMate Works
            </h2>
            <p className="text-slate-600 text-base mt-2">
              Three seamless steps designed to replicate the outpatient pharmacy consultation counter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative">
              <div className="w-10 h-10 rounded-full bg-navy-900 text-white font-extrabold flex items-center justify-center text-sm mb-4">
                1
              </div>
              <h3 className="text-base font-bold text-navy-900 mb-1.5">
                Select a Clinical Case
              </h3>
              <p className="text-sm text-slate-600 mb-4">
                Choose from hypertension, diabetes, GERD, antibiotic therapy, or dyslipidemia. Review patient demographics and prescription details.
              </p>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-500">
                <span className="font-semibold text-navy-800">Example:</span> Pak Budi (52y), Amlodipine 5 mg first-time prescription.
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-6 border border-teal-200 shadow-sm relative ring-2 ring-teal-500/20">
              <div className="w-10 h-10 rounded-full bg-teal-600 text-white font-extrabold flex items-center justify-center text-sm mb-4">
                2
              </div>
              <h3 className="text-base font-bold text-navy-900 mb-1.5">
                Simulate the Consultation
              </h3>
              <p className="text-sm text-slate-600 mb-4">
                Communicate naturally via interactive chat. Screen allergies, explain dosage and timing, debunk fears, and verify comprehension using teach-back.
              </p>
              <div className="p-3 bg-teal-50/70 rounded-xl border border-teal-100 text-xs text-teal-800">
                <span className="font-semibold text-teal-900">Feature:</span> Live suggested prompts + unrestricted free typed messages.
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative">
              <div className="w-10 h-10 rounded-full bg-navy-900 text-white font-extrabold flex items-center justify-center text-sm mb-4">
                3
              </div>
              <h3 className="text-base font-bold text-navy-900 mb-1.5">
                Review Automated Assessment
              </h3>
              <p className="text-sm text-slate-600 mb-4">
                End the session to view detailed competency scores, identified hidden clinical factors, strengths, and specific question recommendations.
              </p>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-500">
                <span className="font-semibold text-navy-800">Outcome:</span> 0-100 score on 10 competencies saved to your learning portfolio.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Scenarios Carousel / Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
                Curated Practice Scenarios
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 tracking-tight mt-1">
                Featured Clinical Cases
              </h2>
            </div>
            <button
              onClick={() => onNavigate('cases')}
              className="mt-3 sm:mt-0 inline-flex items-center text-sm font-bold text-teal-700 hover:text-teal-800 group"
            >
              <span>View all 5 cases</span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COUNSELING_CASES.slice(0, 3).map((c) => (
              <div
                key={c.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-card hover:border-teal-300 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-navy-800">
                      {c.diseaseCategory}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      c.difficulty === 'Beginner' ? 'bg-mint-50 text-mint-600 border border-mint-200' :
                      c.difficulty === 'Intermediate' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                      'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}>
                      {c.difficulty}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-navy-900 mb-1">{c.title}</h3>
                  <p className="text-xs text-slate-500 mb-4">{c.subtitle}</p>

                  <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl mb-4">
                    <img 
                      src={c.patient.avatarUrl} 
                      alt={c.patient.name} 
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm"
                    />
                    <div className="text-xs">
                      <div className="font-bold text-navy-900">{c.patient.name}, {c.patient.age}y</div>
                      <div className="text-slate-500">{c.prescription.medicationName} {c.prescription.strength}</div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onSelectCase(c.id);
                    onNavigate('simulation');
                  }}
                  className="w-full inline-flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl bg-teal-50 hover:bg-teal-600 text-teal-700 hover:text-white font-bold text-xs transition-colors"
                >
                  <span>Start Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-navy-950 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center text-white font-bold">
                  <Pill className="w-4 h-4 -rotate-45" />
                </div>
                <span className="text-lg font-bold text-white tracking-tight">CounselMate</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Empowering pharmacy students and clinical educators through high-fidelity, interactive patient counseling simulations.
              </p>
              <p className="text-[11px] text-teal-400 font-semibold">
                Tagline: "Practice. Communicate. Care."
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Simulation Cases</h4>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => { onSelectCase('case-hypertension-amlodipine'); onNavigate('simulation'); }} className="hover:text-teal-400">Hypertension (Amlodipine)</button></li>
                <li><button onClick={() => { onSelectCase('case-diabetes-metformin'); onNavigate('simulation'); }} className="hover:text-teal-400">Type 2 Diabetes (Metformin)</button></li>
                <li><button onClick={() => { onSelectCase('case-gastritis-omeprazole'); onNavigate('simulation'); }} className="hover:text-teal-400">Acid Reflux (Omeprazole)</button></li>
                <li><button onClick={() => { onSelectCase('case-antibiotic-amoxicillin'); onNavigate('simulation'); }} className="hover:text-teal-400">Antibiotics (Amoxicillin)</button></li>
                <li><button onClick={() => { onSelectCase('case-dyslipidemia-simvastatin'); onNavigate('simulation'); }} className="hover:text-teal-400">Dyslipidemia (Simvastatin)</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Clinical Resources</h4>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => onNavigate('guide')} className="hover:text-teal-400">6-Step Counseling Guide</button></li>
                <li><button onClick={() => onNavigate('guide')} className="hover:text-teal-400">Three Prime Questions</button></li>
                <li><button onClick={() => onNavigate('guide')} className="hover:text-teal-400">Teach-Back Verification</button></li>
                <li><button onClick={() => onNavigate('quiz')} className="hover:text-teal-400">Pharmacy Quiz Center</button></li>
                <li><button onClick={() => onNavigate('progress')} className="hover:text-teal-400">10-Competency Rubric</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Medical Disclaimer</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                CounselMate is strictly an educational simulation training platform for healthcare students and professionals. All patient profiles, diagnoses, and responses are simulated for training purposes.
              </p>
            </div>

          </div>

          <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
            © {new Date().getFullYear()} CounselMate. Designed for clinical pharmacy educational excellence.
          </div>

        </div>
      </footer>

    </div>
  );
};
