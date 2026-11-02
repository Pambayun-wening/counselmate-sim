import React, { useState } from 'react';
import { 
  FolderKanban, 
  Search, 
  Filter, 
  ArrowRight, 
  Clock, 
  ShieldAlert, 
  CheckCircle2, 
  FileText,
  User,
  Pill,
  Sparkles
} from 'lucide-react';
import { COUNSELING_CASES } from '../data/cases';
import { CounselingCase, DifficultyLevel } from '../types';
import { PageId } from './Navbar';

interface CaseLibraryProps {
  onSelectCase: (caseId: string) => void;
  onNavigate: (page: PageId) => void;
  completedCaseIds: string[];
}

export const CaseLibrary: React.FC<CaseLibraryProps> = ({
  onSelectCase,
  onNavigate,
  completedCaseIds
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [previewCase, setPreviewCase] = useState<CounselingCase | null>(null);

  const categories = ['All', 'Cardiovascular', 'Endocrine', 'Gastrointestinal', 'Infectious Disease', 'Dyslipidemia'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredCases = COUNSELING_CASES.filter(c => {
    const matchesSearch = 
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.prescription.medicationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.patient.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || c.diseaseCategory === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || c.difficulty === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const handleStartSimulation = (caseId: string) => {
    onSelectCase(caseId);
    onNavigate('simulation');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200 mb-2">
            <FolderKanban className="w-3.5 h-3.5" />
            <span>Clinical Scenario Repository</span>
          </div>
          <h1 className="text-3xl font-extrabold text-navy-900 tracking-tight">
            Pharmacy Counseling Case Library
          </h1>
          <p className="mt-1 text-slate-600 text-sm max-w-2xl">
            Realistic outpatient scenarios covering foundational disease states, high-risk drug-drug interactions, patient counseling dilemmas, and evidence-based clinical communication.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500">
          <span className="w-2.5 h-2.5 rounded-full bg-teal-500 inline-block" />
          <span>{COUNSELING_CASES.length} Standardized Patient Scenarios</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-subtle space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by drug name (e.g. Amlodipine, Metformin), disease, or patient..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 placeholder:text-slate-400"
            />
          </div>

          {/* Difficulty Dropdown */}
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-slate-400 hidden sm:block" />
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 font-medium text-slate-700 bg-white"
            >
              {difficulties.map(d => (
                <option key={d} value={d}>Difficulty: {d}</option>
              ))}
            </select>
          </div>

        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 custom-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-navy-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Cases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCases.map((c) => {
          const isCompleted = completedCaseIds.includes(c.id);

          return (
            <div
              key={c.id}
              className="bg-white rounded-2xl border border-slate-200/90 hover:border-teal-400 hover:shadow-card transition-all duration-200 flex flex-col justify-between overflow-hidden group"
            >
              {/* Card Body */}
              <div className="p-6 space-y-4">
                
                {/* Header tags */}
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-100 text-navy-800 border border-slate-200/60">
                    {c.diseaseCategory}
                  </span>
                  
                  <div className="flex items-center space-x-2">
                    {isCompleted && (
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Completed</span>
                      </span>
                    )}

                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      c.difficulty === 'Beginner' ? 'bg-mint-50 text-mint-600 border border-mint-200' :
                      c.difficulty === 'Intermediate' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                      'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}>
                      {c.difficulty}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-lg font-bold text-navy-900 group-hover:text-teal-700 transition-colors">
                    {c.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {c.subtitle}
                  </p>
                </div>

                {/* Patient Profile Box */}
                <div className="flex items-center space-x-3 p-3 bg-slate-50/80 rounded-xl border border-slate-100">
                  <img
                    src={c.patient.avatarUrl}
                    alt={c.patient.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-sm"
                  />
                  <div className="text-xs space-y-0.5">
                    <div className="font-bold text-navy-900">{c.patient.name}, {c.patient.age}y</div>
                    <div className="text-slate-500">{c.patient.occupation}</div>
                    <div className="text-[11px] font-medium text-teal-700">
                      Dx: {c.patient.diagnosis}
                    </div>
                  </div>
                </div>

                {/* Prescription Box */}
                <div className="p-3 bg-teal-50/50 rounded-xl border border-teal-100/70 text-xs space-y-1">
                  <div className="flex items-center space-x-1.5 font-bold text-teal-950">
                    <Pill className="w-3.5 h-3.5 text-teal-600 -rotate-45" />
                    <span>{c.prescription.medicationName} {c.prescription.strength}</span>
                  </div>
                  <div className="text-slate-600 pl-5 text-[11px]">
                    <span className="font-medium text-slate-700">Sig:</span> {c.prescription.directions}
                  </div>
                </div>

                {/* Chief Complaint */}
                <div className="text-xs text-slate-600 border-l-2 border-amber-400 pl-3 py-0.5 italic">
                  "{c.patient.chiefComplaint}"
                </div>

                {/* Learning Objectives Preview */}
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Key Clinical Focus ({c.learningObjectives.length} Objectives)
                  </div>
                  <ul className="space-y-1 text-xs text-slate-600">
                    {c.learningObjectives.slice(0, 2).map((obj, i) => (
                      <li key={i} className="flex items-start space-x-1.5">
                        <span className="text-teal-500 font-bold">•</span>
                        <span className="line-clamp-1">{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Card Footer Actions */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  onClick={() => setPreviewCase(c)}
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-navy-900 hover:bg-slate-200/60 transition-colors"
                >
                  View Objectives
                </button>

                <button
                  onClick={() => handleStartSimulation(c.id)}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-sm transition-all"
                >
                  <span>Start Simulation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Case Preview Modal */}
      {previewCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto custom-scrollbar shadow-elevated">
            
            <div className="flex items-start justify-between">
              <div>
                <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-teal-50 text-teal-700 border border-teal-200">
                  {previewCase.diseaseCategory}
                </span>
                <h2 className="text-2xl font-bold text-navy-900 mt-2">{previewCase.title}</h2>
                <p className="text-xs text-slate-500">{previewCase.subtitle}</p>
              </div>
              <button 
                onClick={() => setPreviewCase(null)}
                className="text-slate-400 hover:text-navy-900 p-1.5 rounded-lg hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            {/* Patient & Prescription Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Patient Profile</h4>
                <div className="text-sm font-bold text-navy-900">{previewCase.patient.name}, {previewCase.patient.age}y</div>
                <div className="text-xs text-slate-600">Occupation: {previewCase.patient.occupation}</div>
                <div className="text-xs text-slate-600">Diagnosis: {previewCase.patient.diagnosis}</div>
                <div className="text-xs text-slate-600">Communication: {previewCase.patient.communicationStyle}</div>
              </div>

              <div className="p-4 bg-teal-50/60 rounded-xl border border-teal-200 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-800">Prescription Order</h4>
                <div className="text-sm font-bold text-teal-950">{previewCase.prescription.medicationName} {previewCase.prescription.strength}</div>
                <div className="text-xs text-slate-700">Dosage Form: {previewCase.prescription.dosageForm}</div>
                <div className="text-xs text-slate-700">Directions: {previewCase.prescription.directions}</div>
                <div className="text-xs text-slate-700">Prescriber: {previewCase.prescription.prescriber}</div>
              </div>
            </div>

            {/* Learning Objectives */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-navy-900 flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-teal-600" />
                <span>Learning Objectives & Competencies</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-600">
                {previewCase.learningObjectives.map((obj, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end space-x-3">
              <button
                onClick={() => setPreviewCase(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const id = previewCase.id;
                  setPreviewCase(null);
                  handleStartSimulation(id);
                }}
                className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md"
              >
                <span>Launch This Simulation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
