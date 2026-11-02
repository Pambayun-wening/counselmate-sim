import React, { useState } from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  AlertTriangle, 
  Lightbulb, 
  Copy, 
  Check, 
  ChevronRight, 
  Play, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { COUNSELING_GUIDE_STEPS, CounselingStep } from '../data/counselingGuide';
import { PageId } from './Navbar';

interface CounselingGuideProps {
  onNavigate: (page: PageId) => void;
  onStartPractice: () => void;
}

export const CounselingGuide: React.FC<CounselingGuideProps> = ({ onNavigate, onStartPractice }) => {
  const [selectedStepIndex, setSelectedStepIndex] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const currentStep = COUNSELING_GUIDE_STEPS[selectedStepIndex];

  const handleCopyPhrase = (text: string, index: number) => {
    navigator.clipboard.writeText(text.replace(/^"|"$/g, ''));
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200 mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Clinical Communication Masterclass</span>
          </div>
          <h1 className="text-3xl font-extrabold text-navy-900 tracking-tight">
            Pharmacist Patient Counseling Guide
          </h1>
          <p className="mt-1 text-slate-600 text-sm max-w-2xl">
            A step-by-step clinical methodology based on the Indian Health Service (IHS) model and evidence-based Teach-Back techniques.
          </p>
        </div>

        <button
          onClick={onStartPractice}
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-all self-start md:self-auto"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Apply in Simulation</span>
        </button>
      </div>

      {/* 6 Steps Horizontal / Grid Navigation */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {COUNSELING_GUIDE_STEPS.map((step, idx) => {
          const isSelected = selectedStepIndex === idx;

          return (
            <button
              key={step.stepNumber}
              onClick={() => setSelectedStepIndex(idx)}
              className={`p-3.5 rounded-2xl text-left transition-all border flex flex-col justify-between ${
                isSelected
                  ? 'bg-navy-900 text-white border-navy-900 shadow-md ring-2 ring-teal-500/30'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200/90'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center ${
                  isSelected ? 'bg-teal-500 text-navy-950' : 'bg-slate-100 text-slate-700'
                }`}>
                  {step.stepNumber}
                </span>
                <span className={`text-[10px] font-bold uppercase tracking-wider ${
                  isSelected ? 'text-teal-300' : 'text-slate-400'
                }`}>
                  Step {step.stepNumber}
                </span>
              </div>
              <div className="text-xs font-bold leading-tight line-clamp-2">
                {step.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Step Content Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card space-y-8">
        
        {/* Step Header */}
        <div className="border-b border-slate-100 pb-6 space-y-2">
          <div className="flex items-center space-x-2">
            <span className="w-7 h-7 rounded-lg bg-teal-100 text-teal-800 text-xs font-extrabold flex items-center justify-center">
              {currentStep.stepNumber}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
              {currentStep.subtitle}
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-navy-900">
            {currentStep.title}
          </h2>
          <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
            {currentStep.description}
          </p>
        </div>

        {/* Key Goals Checklist */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-navy-900 flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-teal-600" />
            <span>Essential Clinical Objectives</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {currentStep.keyGoals.map((goal, i) => (
              <div key={i} className="flex items-start space-x-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
                <span className="text-teal-600 font-bold">✓</span>
                <span className="leading-relaxed">{goal}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Practical Pharmacist Phrasing with Copy Button */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-navy-900 flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>Recommended Verbal Phrasing & Clinical Questions</span>
            </h3>
            <span className="text-[11px] text-slate-400">Click button to copy script</span>
          </div>

          <div className="space-y-3">
            {currentStep.sampleQuestions.map((sq, i) => (
              <div key={i} className="p-4 rounded-2xl bg-teal-50/40 border border-teal-200/80 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-teal-900">
                  <span>{sq.context}</span>
                  <button
                    onClick={() => handleCopyPhrase(sq.pharmacistPhrase, i)}
                    className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-white hover:bg-teal-50 text-teal-700 border border-teal-200 text-[11px] font-semibold transition-colors"
                  >
                    {copiedIndex === i ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Phrase</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="font-mono text-xs text-navy-950 bg-white p-3 rounded-xl border border-teal-100 leading-relaxed">
                  {sq.pharmacistPhrase}
                </p>

                <div className="flex items-start space-x-2 text-[11px] text-teal-800 pt-1">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span><span className="font-bold">Clinical Pro-Tip:</span> {sq.proTip}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Common Pitfalls Warning */}
        <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200/80 space-y-2">
          <h4 className="text-xs font-bold text-rose-800 flex items-center space-x-1.5 uppercase tracking-wider">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
            <span>Common Pitfalls to Avoid in Step {currentStep.stepNumber}</span>
          </h4>
          <ul className="space-y-1.5 text-xs text-rose-950">
            {currentStep.commonPitfalls.map((pitfall, i) => (
              <li key={i} className="flex items-start space-x-2">
                <span className="text-rose-500 font-bold">✕</span>
                <span className="leading-relaxed">{pitfall}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Step Navigation Footer */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={() => setSelectedStepIndex(Math.max(0, selectedStepIndex - 1))}
            disabled={selectedStepIndex === 0}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-navy-900 disabled:opacity-30 disabled:pointer-events-none"
          >
            ← Previous Step
          </button>

          <span className="text-xs text-slate-400 font-medium">
            Step {currentStep.stepNumber} of {COUNSELING_GUIDE_STEPS.length}
          </span>

          <button
            onClick={() => setSelectedStepIndex(Math.min(COUNSELING_GUIDE_STEPS.length - 1, selectedStepIndex + 1))}
            disabled={selectedStepIndex === COUNSELING_GUIDE_STEPS.length - 1}
            className="px-4 py-2 rounded-xl text-xs font-bold text-teal-700 hover:text-teal-800 disabled:opacity-30 disabled:pointer-events-none"
          >
            Next Step →
          </button>
        </div>

      </div>

    </div>
  );
};
