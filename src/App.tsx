import React, { useState, useEffect } from 'react';
import { Navbar, PageId } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { CaseLibrary } from './components/CaseLibrary';
import { PatientSimulation } from './components/PatientSimulation';
import { CounselingGuide } from './components/CounselingGuide';
import { QuizCenter } from './components/QuizCenter';
import { LearningProgress } from './components/LearningProgress';
import { CounselingAssessmentModal } from './components/CounselingAssessmentModal';
import { COUNSELING_CASES } from './data/cases';
import { 
  UserStats, 
  SimulationAssessment, 
  QuizResult, 
  ChatMessage, 
  CounselingCase 
} from './types';
import { 
  getUserStats, 
  saveUserStats, 
  recordNewAssessment, 
  recordQuizCompletion 
} from './services/storage';
import { evaluateCounselingSession } from './services/assessmentEngine';

export function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('landing');
  const [activeCaseId, setActiveCaseId] = useState<string>(COUNSELING_CASES[0].id);
  const [userStats, setUserStats] = useState<UserStats>(getUserStats());
  const [activeAssessment, setActiveAssessment] = useState<SimulationAssessment | null>(null);

  // Sync user stats
  useEffect(() => {
    setUserStats(getUserStats());
  }, []);

  const activeCase: CounselingCase = 
    COUNSELING_CASES.find(c => c.id === activeCaseId) || COUNSELING_CASES[0];

  const handleSelectCase = (caseId: string) => {
    setActiveCaseId(caseId);
  };

  const handleEndSimulation = (
    transcript: ChatMessage[],
    durationSeconds: number,
    revealedKeys: Record<string, boolean>
  ) => {
    // Generate automated objective assessment based on actual conversation interactions
    const assessment = evaluateCounselingSession(
      activeCase,
      transcript,
      durationSeconds,
      revealedKeys
    );

    // Save assessment to local storage and update stats
    const updatedStats = recordNewAssessment(assessment);
    setUserStats(updatedStats);

    // Show assessment modal
    setActiveAssessment(assessment);
  };

  const handleSaveQuizResult = (result: QuizResult) => {
    const updated = recordQuizCompletion(result);
    setUserStats(updated);
  };

  const handleResetProgress = () => {
    localStorage.removeItem('counselmate_user_data_v1');
    const freshStats = getUserStats();
    setUserStats(freshStats);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800 selection:bg-teal-500 selection:text-white">
      
      {/* Navigation Header */}
      <Navbar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        userStats={userStats}
        activeCaseTitle={activeCase.prescription.medicationName}
      />

      {/* Main Page Router */}
      <main className="flex-1 flex flex-col">
        {currentPage === 'landing' && (
          <LandingPage
            onNavigate={setCurrentPage}
            onSelectCase={handleSelectCase}
          />
        )}

        {currentPage === 'dashboard' && (
          <Dashboard
            userStats={userStats}
            onNavigate={setCurrentPage}
            onSelectCase={handleSelectCase}
            onViewAssessment={(ass) => setActiveAssessment(ass)}
          />
        )}

        {currentPage === 'cases' && (
          <CaseLibrary
            onSelectCase={handleSelectCase}
            onNavigate={setCurrentPage}
            completedCaseIds={userStats.completedCaseIds}
          />
        )}

        {currentPage === 'simulation' && (
          <PatientSimulation
            key={activeCase.id}
            counselingCase={activeCase}
            onEndSimulation={handleEndSimulation}
            onSwitchCase={() => setCurrentPage('cases')}
          />
        )}

        {currentPage === 'guide' && (
          <CounselingGuide
            onNavigate={setCurrentPage}
            onStartPractice={() => {
              setActiveCaseId(COUNSELING_CASES[0].id);
              setCurrentPage('simulation');
            }}
          />
        )}

        {currentPage === 'quiz' && (
          <QuizCenter
            onSaveQuizResult={handleSaveQuizResult}
            onNavigate={setCurrentPage}
          />
        )}

        {currentPage === 'progress' && (
          <LearningProgress
            userStats={userStats}
            onViewAssessment={(ass) => setActiveAssessment(ass)}
            onNavigate={setCurrentPage}
            onResetProgress={handleResetProgress}
          />
        )}
      </main>

      {/* Counseling Assessment Report Modal */}
      {activeAssessment && (
        <CounselingAssessmentModal
          assessment={activeAssessment}
          onClose={() => setActiveAssessment(null)}
          onTryAgain={() => {
            setActiveAssessment(null);
            setCurrentPage('simulation');
          }}
          onNavigate={(page) => {
            setActiveAssessment(null);
            setCurrentPage(page);
          }}
        />
      )}

    </div>
  );
}

export default App;
