import React from 'react';
import { 
  CheckCircle2, 
  Flame, 
  Clock, 
  Award, 
  Play, 
  ArrowRight, 
  Sparkles, 
  FolderKanban, 
  TrendingUp, 
  BookOpen, 
  GraduationCap,
  ChevronRight,
  ShieldAlert,
  Calendar
} from 'lucide-react';
import { UserStats, SimulationAssessment } from '../types';
import { COUNSELING_CASES } from '../data/cases';
import { PageId } from './Navbar';

interface DashboardProps {
  userStats: UserStats;
  onNavigate: (page: PageId) => void;
  onSelectCase: (caseId: string) => void;
  onViewAssessment: (assessment: SimulationAssessment) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  userStats,
  onNavigate,
  onSelectCase,
  onViewAssessment
}) => {
  // Find next recommended case (one that hasn't been completed or has lower score)
  const recommendedCase = COUNSELING_CASES.find(c => !userStats.completedCaseIds.includes(c.id)) || COUNSELING_CASES[0];

  // Calculate average scores across the 10 competencies from saved assessments
  const competencyTotals: Record<string, { name: string; total: number; count: number }> = {};
  userStats.savedAssessments.forEach(assessment => {
    assessment.competencies.forEach(comp => {
      if (!competencyTotals[comp.code]) {
        competencyTotals[comp.code] = { name: comp.name, total: 0, count: 0 };
      }
      competencyTotals[comp.code].total += comp.score;
      competencyTotals[comp.code].count += 1;
    });
  });

  const competencyAvgs = Object.keys(competencyTotals).map(code => ({
    code,
    name: competencyTotals[code].name,
    score: Math.round(competencyTotals[code].total / competencyTotals[code].count)
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-navy-900 via-navy-800 to-teal-900 text-white p-6 sm:p-8 shadow-elevated">
        <div className="absolute right-0 top-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Spring Clinical Rotation Preparation</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Welcome back, Sarah! 👋
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              You are maintaining a strong <span className="text-amber-400 font-bold">{userStats.streakDays}-day streak</span>! You have completed <span className="text-teal-300 font-bold">{userStats.sessionsCompleted} counseling sessions</span> with an average score of <span className="text-teal-300 font-bold">{userStats.averageScore}%</span>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={() => {
                onSelectCase(recommendedCase.id);
                onNavigate('simulation');
              }}
              className="inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-navy-950 font-bold text-sm shadow-md transition-all transform hover:-translate-y-0.5"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Continue Simulation</span>
            </button>
            
            <button
              onClick={() => onNavigate('quiz')}
              className="inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/15 transition-all"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Take Daily Quiz</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Statistics Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1: Total Sessions */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-subtle hover:shadow-card transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Sessions Finished</span>
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-navy-900">{userStats.sessionsCompleted}</span>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+3 this week</span>
          </div>
          <p className="mt-2 text-xs text-slate-500">Target: 20 sessions for rotation mastery</p>
          {/* Progress bar */}
          <div className="mt-3 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-teal-500 h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (userStats.sessionsCompleted / 20) * 100)}%` }} />
          </div>
        </div>

        {/* Card 2: Average Score */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-subtle hover:shadow-card transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Average Score</span>
            <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-navy-900">{userStats.averageScore}%</span>
            <span className="text-xs font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full">Proficient</span>
          </div>
          <p className="mt-2 text-xs text-slate-500">Based on 10 objective competencies</p>
          <div className="mt-3 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-sky-500 h-full rounded-full transition-all duration-500" style={{ width: `${userStats.averageScore}%` }} />
          </div>
        </div>

        {/* Card 3: Total Practice Time */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-subtle hover:shadow-card transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Practice Time</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-navy-900">{userStats.totalTimeMinutes}</span>
            <span className="text-sm font-semibold text-slate-600">mins</span>
          </div>
          <p className="mt-2 text-xs text-slate-500">Avg 8.5 minutes per patient scenario</p>
          <div className="mt-3 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-indigo-500 h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (userStats.totalTimeMinutes / 180) * 100)}%` }} />
          </div>
        </div>

        {/* Card 4: Daily Streak */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-subtle hover:shadow-card transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Streak</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Flame className="w-5 h-5 fill-amber-500" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-navy-900">{userStats.streakDays}</span>
            <span className="text-sm font-semibold text-slate-600">days in a row</span>
          </div>
          <p className="mt-2 text-xs text-slate-500">Top 5% of active pharmacy students</p>
          <div className="mt-3 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-amber-500 h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (userStats.streakDays / 7) * 100)}%` }} />
          </div>
        </div>

      </div>

      {/* Main Grid: Priority Case & Core Competencies */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (2 cols): Recommended Case & Recent Activities */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Quick Start Next Case Card */}
          <div className="bg-white rounded-2xl border border-teal-200/80 p-6 shadow-card relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-bold border border-teal-200">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next Recommended Case</span>
              </div>
              <span className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                recommendedCase.difficulty === 'Beginner' ? 'bg-mint-50 text-mint-600 border border-mint-200' :
                recommendedCase.difficulty === 'Intermediate' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                'bg-rose-50 text-rose-700 border border-rose-200'
              }`}>
                {recommendedCase.difficulty} Level
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-5">
              <img 
                src={recommendedCase.patient.avatarUrl} 
                alt={recommendedCase.patient.name} 
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-teal-500/20 shadow-sm"
              />
              <div className="space-y-0.5">
                <h3 className="text-xl font-bold text-navy-900">{recommendedCase.title}</h3>
                <p className="text-xs text-slate-500 font-medium">{recommendedCase.subtitle}</p>
                <div className="text-xs text-slate-700 pt-1">
                  <span className="font-semibold text-teal-800">Prescription:</span> {recommendedCase.prescription.medicationName} {recommendedCase.prescription.strength} • {recommendedCase.prescription.directions}
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl mb-5 border border-slate-100">
              <div className="text-xs font-bold text-navy-900 mb-1.5 flex items-center space-x-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                <span>Patient Chief Concern:</span>
              </div>
              <p className="text-xs text-slate-600 italic">
                "{recommendedCase.patient.chiefComplaint}"
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <span className="text-xs text-slate-500 font-medium">Estimated time: ~{recommendedCase.estimatedMinutes} mins</span>
              <button
                onClick={() => {
                  onSelectCase(recommendedCase.id);
                  onNavigate('simulation');
                }}
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-all"
              >
                <span>Launch Simulation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Recent Simulation Activities */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-subtle">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-lg font-bold text-navy-900">Recent Simulation Activities</h3>
                <p className="text-xs text-slate-500">Your recent patient encounters and assessment results</p>
              </div>
              <button
                onClick={() => onNavigate('progress')}
                className="text-xs font-bold text-teal-600 hover:text-teal-700 inline-flex items-center"
              >
                <span>View Full History</span>
                <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
              </button>
            </div>

            <div className="space-y-3">
              {userStats.savedAssessments.slice(0, 3).map((item) => (
                <div 
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-slate-200/80 hover:border-teal-300 hover:bg-teal-50/20 transition-all gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-navy-900">{item.caseTitle}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium">
                        Patient: {item.patientName}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 text-xs text-slate-500">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                      </span>
                      <span>•</span>
                      <span>Duration: {Math.round(item.durationSeconds / 60)} mins</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 self-end sm:self-center">
                    <div className="text-right">
                      <div className="text-lg font-extrabold text-navy-900 leading-tight">
                        {item.overallScore}<span className="text-xs text-slate-400 font-normal">/100</span>
                      </div>
                      <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">{item.overallGrade}</div>
                    </div>
                    <button
                      onClick={() => onViewAssessment(item)}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-700 text-xs font-bold transition-colors"
                    >
                      View Report
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (1 col): Competency Mastery Breakdown */}
        <div className="space-y-8">
          
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-subtle">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-navy-900">Competency Mastery</h3>
                <p className="text-xs text-slate-500">10 Core Counseling Standards</p>
              </div>
              <TrendingUp className="w-4 h-4 text-teal-600" />
            </div>

            <div className="space-y-3.5">
              {competencyAvgs.map((comp) => (
                <div key={comp.code} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-700 truncate max-w-[190px]" title={comp.name}>
                      {comp.name}
                    </span>
                    <span className="font-bold text-navy-900">{comp.score}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        comp.score >= 85 ? 'bg-teal-500' :
                        comp.score >= 70 ? 'bg-sky-500' :
                        comp.score >= 60 ? 'bg-amber-500' : 'bg-rose-500'
                      }`}
                      style={{ width: `${comp.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => onNavigate('guide')}
              className="mt-6 w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 flex items-center justify-center space-x-2 transition-colors"
            >
              <BookOpen className="w-4 h-4 text-teal-600" />
              <span>Review Counseling Guide</span>
            </button>
          </div>

          {/* Quick Quiz Card */}
          <div className="bg-gradient-to-br from-teal-50 to-mint-50/50 rounded-2xl border border-teal-200 p-6">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-navy-900 text-sm">Pharmacy Knowledge Quiz</h4>
                <p className="text-xs text-slate-600">Test high-yield counseling principles</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Answer quick multiple-choice questions on timing, adverse reactions, and communication techniques with instant clinical explanations.
            </p>
            <button
              onClick={() => onNavigate('quiz')}
              className="w-full py-2.5 px-4 rounded-xl bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold transition-colors flex items-center justify-center space-x-1.5"
            >
              <span>Start 5-Minute Quiz</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
