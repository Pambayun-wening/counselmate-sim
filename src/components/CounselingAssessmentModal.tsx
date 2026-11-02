import React, { useState, useEffect } from 'react';
import { 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  RotateCcw, 
  LayoutDashboard, 
  BookOpen, 
  Sparkles, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  Share2, 
  MessageSquare,
  FileCheck2,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SimulationAssessment } from '../types';
import { PageId } from './Navbar';

interface CounselingAssessmentModalProps {
  assessment: SimulationAssessment;
  onClose: () => void;
  onTryAgain: () => void;
  onNavigate: (page: PageId) => void;
}

export const CounselingAssessmentModal: React.FC<CounselingAssessmentModalProps> = ({
  assessment,
  onClose,
  onTryAgain,
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState<'competencies' | 'strengths' | 'transcript'>('competencies');
  const [expandedCompetencyId, setExpandedCompetencyId] = useState<string | null>(null);

  // Trigger celebration confetti for high achievement
  useEffect(() => {
    if (assessment.overallScore >= 85) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Safe fallback
      }
    }
  }, [assessment.overallScore]);

  const toggleExpand = (id: string) => {
    setExpandedCompetencyId(expandedCompetencyId === id ? null : id);
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-teal-600 bg-teal-50 border-teal-200';
    if (score >= 70) return 'text-sky-700 bg-sky-50 border-sky-200';
    if (score >= 60) return 'text-amber-700 bg-amber-50 border-amber-200';
    return 'text-rose-700 bg-rose-50 border-rose-200';
  };

  const getScoreBarColor = (score: number) => {
    if (score >= 85) return 'bg-teal-500';
    if (score >= 70) return 'bg-sky-500';
    if (score >= 60) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-navy-950/70 backdrop-blur-md overflow-y-auto custom-scrollbar">
      <div className="bg-white rounded-3xl max-w-4xl w-full my-auto overflow-hidden shadow-elevated border border-slate-200 animate-fade-in flex flex-col max-h-[92vh]">
        
        {/* Assessment Top Header */}
        <div className="relative bg-gradient-to-r from-navy-900 via-navy-800 to-teal-900 text-white p-6 sm:p-8">
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Close Report"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-xl">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold border border-teal-500/30">
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>Standardized Patient Counseling Assessment</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {assessment.caseTitle}
              </h2>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 pt-1">
                <span>Patient: <span className="font-bold text-white">{assessment.patientName}</span></span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-teal-400" />
                  <span>Duration: {Math.round(assessment.durationSeconds / 60)}m {assessment.durationSeconds % 60}s</span>
                </span>
                <span>•</span>
                <span>{new Date(assessment.timestamp).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Overall Score Badge */}
            <div className="flex sm:flex-col items-center justify-center p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md self-start sm:self-auto min-w-[130px]">
              <div className="text-3xl sm:text-4xl font-extrabold text-teal-300 tracking-tight leading-none">
                {assessment.overallScore}
                <span className="text-xs text-slate-300 font-normal">/100</span>
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-white mt-1">
                {assessment.overallGrade}
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center space-x-2 border-b border-slate-200 px-6 pt-3 bg-slate-50/70">
          <button
            onClick={() => setActiveTab('competencies')}
            className={`pb-3 px-3 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'competencies'
                ? 'border-teal-600 text-teal-800'
                : 'border-transparent text-slate-500 hover:text-navy-900'
            }`}
          >
            10-Competency Evaluation ({assessment.competencies.length})
          </button>

          <button
            onClick={() => setActiveTab('strengths')}
            className={`pb-3 px-3 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'strengths'
                ? 'border-teal-600 text-teal-800'
                : 'border-transparent text-slate-500 hover:text-navy-900'
            }`}
          >
            Strengths & Recommendations
          </button>

          <button
            onClick={() => setActiveTab('transcript')}
            className={`pb-3 px-3 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'transcript'
                ? 'border-teal-600 text-teal-800'
                : 'border-transparent text-slate-500 hover:text-navy-900'
            }`}
          >
            Session Transcript ({assessment.transcript.length} turns)
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 custom-scrollbar space-y-6">
          
          {/* TAB 1: 10 Competencies Accordion */}
          {activeTab === 'competencies' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span>Objective clinical competencies assessed against standard pharmacy rubrics:</span>
                <span className="font-semibold text-slate-700">Click any competency for coaching tips</span>
              </div>

              {assessment.competencies.map((comp, idx) => {
                const isExpanded = expandedCompetencyId === comp.id || (expandedCompetencyId === null && idx === 0);

                return (
                  <div
                    key={comp.id}
                    className="border border-slate-200 rounded-2xl overflow-hidden hover:border-slate-300 transition-all bg-white shadow-subtle"
                  >
                    {/* Competency Card Header */}
                    <div
                      onClick={() => toggleExpand(comp.id)}
                      className="p-4 sm:p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50/70 transition-colors gap-3"
                    >
                      <div className="flex items-center space-x-3.5 flex-1 min-w-0">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold border ${getScoreColor(comp.score)} shrink-0`}>
                          {comp.score}
                        </div>
                        <div className="truncate">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-bold text-navy-900 truncate">{idx + 1}. {comp.name}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              comp.grade === 'Excellent' ? 'bg-mint-50 text-mint-700' :
                              comp.grade === 'Good' ? 'bg-sky-50 text-sky-700' :
                              comp.grade === 'Fair' ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'
                            }`}>
                              {comp.grade}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 truncate mt-0.5">{comp.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        {/* Score progress bar */}
                        <div className="w-24 hidden sm:block bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${getScoreBarColor(comp.score)}`}
                            style={{ width: `${comp.score}%` }}
                          />
                        </div>

                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                    </div>

                    {/* Expanded Coaching & Question Examples */}
                    {isExpanded && (
                      <div className="px-5 pb-5 pt-2 border-t border-slate-100 bg-slate-50/50 space-y-3.5 text-xs">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                          {/* What went well */}
                          <div className="p-3 bg-mint-50/70 rounded-xl border border-mint-200/80 text-mint-950 space-y-1">
                            <div className="font-bold flex items-center space-x-1.5 text-mint-700">
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Clinical Observation:</span>
                            </div>
                            <p className="text-slate-700 leading-relaxed">{comp.whatYouDidWell}</p>
                          </div>

                          {/* What could be improved */}
                          <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200/80 text-amber-950 space-y-1">
                            <div className="font-bold flex items-center space-x-1.5 text-amber-700">
                              <AlertTriangle className="w-4 h-4" />
                              <span>Areas for Growth:</span>
                            </div>
                            <p className="text-slate-700 leading-relaxed">{comp.whatYouMissed}</p>
                          </div>
                        </div>

                        {/* Golden Standard Better Phrasing */}
                        <div className="p-3.5 bg-teal-50 rounded-xl border border-teal-200 text-teal-950 space-y-1">
                          <div className="font-bold flex items-center space-x-1.5 text-teal-800">
                            <Sparkles className="w-4 h-4 text-teal-600" />
                            <span>Recommended Phrasing / What You Could Have Asked:</span>
                          </div>
                          <p className="font-mono text-xs text-teal-900 bg-white/70 p-2 rounded-lg border border-teal-200/60 leading-relaxed">
                            {comp.betterPhrasingExample}
                          </p>
                        </div>

                      </div>
                    )}

                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 2: Strengths & Recommendations */}
          {activeTab === 'strengths' && (
            <div className="space-y-6">
              
              {/* Strengths */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-navy-900 flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600" />
                  <span>Key Clinical Strengths</span>
                </h3>
                <div className="space-y-2">
                  {assessment.strengths.map((str, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-teal-50/70 border border-teal-200/80 text-xs text-teal-950 flex items-start space-x-2.5">
                      <span className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        ✓
                      </span>
                      <span className="leading-relaxed">{str}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Areas for Improvement */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-navy-900 flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Targeted Areas for Improvement</span>
                </h3>
                <div className="space-y-2">
                  {assessment.areasForImprovement.map((imp, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-950 flex items-start space-x-2.5">
                      <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        !
                      </span>
                      <span className="leading-relaxed">{imp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actionable Recommendations */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-navy-900 flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-sky-600" />
                  <span>Clinical Action Plan for Your Next Session</span>
                </h3>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs text-slate-700">
                  {assessment.recommendations.map((rec, i) => (
                    <div key={i} className="flex items-start space-x-2">
                      <span className="text-teal-600 font-bold">•</span>
                      <span className="leading-relaxed">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: Transcript Review */}
          {activeTab === 'transcript' && (
            <div className="space-y-3">
              <div className="text-xs text-slate-500 mb-2">
                Complete verbatim record of this pharmacist-patient interaction:
              </div>

              {assessment.transcript.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs">
                  No transcript available for this historical record.
                </div>
              ) : (
                <div className="space-y-3">
                  {assessment.transcript.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-2xl text-xs space-y-1 ${
                        msg.sender === 'pharmacist'
                          ? 'bg-teal-50 border border-teal-200 text-teal-950 ml-6'
                          : 'bg-white border border-slate-200 text-slate-800 mr-6'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold text-[11px] text-slate-500">
                        <span>{msg.sender === 'pharmacist' ? 'Pharmacist (You)' : assessment.patientName}</span>
                        <span>{msg.timestamp}</span>
                      </div>
                      <p className="leading-relaxed">{msg.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Action Buttons Footer */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onNavigate('dashboard');
              }}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 text-xs font-bold transition-colors"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onNavigate('guide');
              }}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 text-xs font-bold transition-colors"
            >
              <BookOpen className="w-4 h-4 text-teal-600" />
              <span>Study Guide</span>
            </button>
          </div>

          <button
            onClick={() => {
              onClose();
              onTryAgain();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Practice Case Again</span>
          </button>
        </div>

      </div>
    </div>
  );
};
