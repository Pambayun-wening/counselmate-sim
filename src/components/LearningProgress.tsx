import React from 'react';
import { 
  TrendingUp, 
  Award, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  RotateCcw, 
  GraduationCap, 
  FileText, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { UserStats, SimulationAssessment } from '../types';
import { COUNSELING_CASES } from '../data/cases';
import { PageId } from './Navbar';

interface LearningProgressProps {
  userStats: UserStats;
  onViewAssessment: (assessment: SimulationAssessment) => void;
  onNavigate: (page: PageId) => void;
  onResetProgress: () => void;
}

export const LearningProgress: React.FC<LearningProgressProps> = ({
  userStats,
  onViewAssessment,
  onNavigate,
  onResetProgress
}) => {
  // Compute competency averages
  const competencyMap: Record<string, { name: string; sum: number; count: number }> = {};
  
  userStats.savedAssessments.forEach(ass => {
    ass.competencies.forEach(comp => {
      if (!competencyMap[comp.code]) {
        competencyMap[comp.code] = { name: comp.name, sum: 0, count: 0 };
      }
      competencyMap[comp.code].sum += comp.score;
      competencyMap[comp.code].count += 1;
    });
  });

  const competenciesList = Object.keys(competencyMap).map(code => ({
    code,
    name: competencyMap[code].name,
    avg: Math.round(competencyMap[code].sum / competencyMap[code].count)
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200 mb-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Portfolio & Competency Analytics</span>
          </div>
          <h1 className="text-3xl font-extrabold text-navy-900 tracking-tight">
            Student Learning Progress
          </h1>
          <p className="mt-1 text-slate-600 text-sm max-w-2xl">
            Track your clinical communication mastery across the 10 counseling standards, review previous simulation encounters, and inspect quiz mastery.
          </p>
        </div>

        <button
          onClick={onResetProgress}
          className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl border border-slate-200 text-slate-500 hover:text-rose-600 hover:bg-rose-50 text-xs font-semibold transition-colors self-start md:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo Data</span>
        </button>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-subtle">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Scenarios Practiced</div>
          <div className="text-3xl font-extrabold text-navy-900 mt-2">{userStats.sessionsCompleted}</div>
          <p className="text-xs text-slate-500 mt-1">Across {COUNSELING_CASES.length} clinical domains</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-subtle">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Cumulative Average Score</div>
          <div className="text-3xl font-extrabold text-teal-600 mt-2">{userStats.averageScore}%</div>
          <p className="text-xs text-slate-500 mt-1">Benchmark: &gt;75% required for rotation</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-subtle">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Clinical Time Invested</div>
          <div className="text-3xl font-extrabold text-navy-900 mt-2">{userStats.totalTimeMinutes} <span className="text-sm font-semibold text-slate-500">mins</span></div>
          <p className="text-xs text-slate-500 mt-1">Interactive dialogue practice</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-subtle">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Unique Cases Mastered</div>
          <div className="text-3xl font-extrabold text-navy-900 mt-2">
            {userStats.completedCaseIds.length} <span className="text-sm font-normal text-slate-400">/ {COUNSELING_CASES.length}</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">{Math.round((userStats.completedCaseIds.length / COUNSELING_CASES.length) * 100)}% case library coverage</p>
        </div>

      </div>

      {/* Main Grid: Competency Longitudinal Bars & Simulation History */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (7 cols): Competency Longitudinal Breakdown */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-bold text-navy-900">10 Core Competencies Mastery</h3>
              <p className="text-xs text-slate-500">Longitudinal average performance across all simulation sessions</p>
            </div>
            <Award className="w-5 h-5 text-teal-600" />
          </div>

          <div className="space-y-4">
            {competenciesList.map((comp) => (
              <div key={comp.code} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-800">{comp.name}</span>
                  <span className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                    comp.avg >= 85 ? 'text-teal-700 bg-teal-50' :
                    comp.avg >= 70 ? 'text-sky-700 bg-sky-50' :
                    comp.avg >= 60 ? 'text-amber-700 bg-amber-50' : 'text-rose-700 bg-rose-50'
                  }`}>
                    {comp.avg}%
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      comp.avg >= 85 ? 'bg-teal-500' :
                      comp.avg >= 70 ? 'bg-sky-500' :
                      comp.avg >= 60 ? 'bg-amber-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${comp.avg}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-teal-50/60 rounded-2xl border border-teal-200/80 text-xs text-teal-900 space-y-1">
            <span className="font-bold flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Competency Milestone Assessment</span>
            </span>
            <p className="text-slate-700 leading-relaxed">
              Your highest mastery is in <span className="font-bold text-navy-900">Medication Instructions & Timing</span> and <span className="font-bold text-navy-900">Teach-Back Verification</span>. Continue refining your <span className="font-bold text-navy-900">Medication History & Allergy Screening</span> before upcoming rotation exams.
            </p>
          </div>
        </div>

        {/* Right Column (5 cols): Simulation Encounters Archive & Quiz Results */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Simulation History Archive */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-navy-900">Simulation Encounter Logs</h3>
              <FileText className="w-4 h-4 text-slate-400" />
            </div>

            <div className="space-y-3 max-h-[350px] overflow-y-auto custom-scrollbar pr-1">
              {userStats.savedAssessments.map((ass) => (
                <div
                  key={ass.id}
                  className="p-3.5 rounded-2xl border border-slate-200/80 hover:border-teal-300 hover:bg-slate-50/70 transition-all space-y-2 cursor-pointer"
                  onClick={() => onViewAssessment(ass)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-navy-900 leading-tight">{ass.caseTitle}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">Patient: {ass.patientName}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-extrabold text-navy-900">{ass.overallScore}%</span>
                      <div className="text-[10px] font-bold text-teal-600 uppercase">{ass.overallGrade}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-100">
                    <span>{new Date(ass.timestamp).toLocaleDateString()} • {Math.round(ass.durationSeconds / 60)}m</span>
                    <span className="text-teal-600 font-bold hover:underline flex items-center">
                      <span>View Rubric</span>
                      <ArrowRight className="w-3 h-3 ml-0.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quiz Performance Log */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-navy-900">Quiz History</h3>
              <GraduationCap className="w-4 h-4 text-teal-600" />
            </div>

            <div className="space-y-2.5">
              {userStats.quizResults.slice(0, 4).map((q) => (
                <div key={q.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                  <div>
                    <span className="font-bold text-navy-900">{q.category}</span>
                    <span className="text-slate-400 text-[11px] ml-2">({q.date})</span>
                  </div>
                  <div className="font-extrabold text-teal-700">
                    {q.score}/{q.total} ({q.percentage}%)
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => onNavigate('quiz')}
              className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 transition-colors"
            >
              Take Another Quiz
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
