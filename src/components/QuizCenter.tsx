import React, { useState } from 'react';
import { 
  GraduationCap, 
  CheckCircle2, 
  XCircle, 
  Lightbulb, 
  ArrowRight, 
  RotateCcw, 
  Award, 
  Sparkles,
  Play
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS } from '../data/quizzes';
import { QuizQuestion, QuizResult } from '../types';
import { PageId } from './Navbar';

interface QuizCenterProps {
  onSaveQuizResult: (result: QuizResult) => void;
  onNavigate: (page: PageId) => void;
}

export const QuizCenter: React.FC<QuizCenterProps> = ({ onSaveQuizResult, onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const categories = ['All', 'Framework', 'Administration', 'Side Effects', 'Communication', 'Pharmacology'];

  const filteredQuestions = QUIZ_QUESTIONS.filter(q => 
    selectedCategory === 'All' || q.category === selectedCategory
  );

  const currentQuestion: QuizQuestion | undefined = filteredQuestions[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
    setIsAnswerSubmitted(true);

    if (idx === currentQuestion.correctIndex) {
      setCorrectCount(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      // Quiz finished
      setQuizFinished(true);
      const total = filteredQuestions.length;
      const pct = Math.round((correctCount / total) * 100);

      const result: QuizResult = {
        id: 'quiz-' + Date.now(),
        category: selectedCategory,
        date: 'Just now',
        score: correctCount,
        total,
        percentage: pct
      };

      onSaveQuizResult(result);

      if (pct >= 80) {
        try {
          confetti({
            particleCount: 70,
            spread: 60,
            origin: { y: 0.6 }
          });
        } catch (e) {
          // Safe fallback
        }
      }
    }
  };

  const handleRestartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setCorrectCount(0);
    setQuizFinished(false);
  };

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setCorrectCount(0);
    setQuizFinished(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200 mb-2">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Interactive Assessment Module</span>
          </div>
          <h1 className="text-3xl font-extrabold text-navy-900 tracking-tight">
            Pharmacy Counseling Quiz Center
          </h1>
          <p className="mt-1 text-slate-600 text-sm">
            Sharpen your knowledge of administration timings, adverse reaction mechanisms, patient communication models, and clinical pharmacology.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500">
          <span>{filteredQuestions.length} Questions Available</span>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 custom-scrollbar">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                isSelected
                  ? 'bg-navy-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Quiz Area */}
      {!quizFinished && currentQuestion ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card space-y-6">
          
          {/* Progress Header */}
          <div className="flex items-center justify-between text-xs text-slate-500 pb-3 border-b border-slate-100">
            <span className="font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
              {currentQuestion.category}
            </span>
            <span>
              Question <span className="font-bold text-navy-900">{currentIndex + 1}</span> of {filteredQuestions.length}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-teal-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / filteredQuestions.length) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <h2 className="text-lg sm:text-xl font-bold text-navy-900 leading-snug">
            {currentQuestion.question}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((optionText, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQuestion.correctIndex;

              let optionStyle = 'bg-white border-slate-200 hover:border-teal-400 hover:bg-slate-50 text-slate-800';

              if (isAnswerSubmitted) {
                if (isCorrect) {
                  optionStyle = 'bg-emerald-50 border-emerald-300 text-emerald-950 font-semibold ring-2 ring-emerald-500/20';
                } else if (isSelected) {
                  optionStyle = 'bg-rose-50 border-rose-300 text-rose-950 font-semibold ring-2 ring-rose-500/20';
                } else {
                  optionStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswerSubmitted}
                  className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-start space-x-3 ${optionStyle}`}
                >
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                    isAnswerSubmitted && isCorrect ? 'bg-emerald-600 text-white' :
                    isAnswerSubmitted && isSelected ? 'bg-rose-600 text-white' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="leading-relaxed flex-1">{optionText}</span>
                  {isAnswerSubmitted && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {isAnswerSubmitted && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Instant Feedback Rationale Box */}
          {isAnswerSubmitted && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 animate-fade-in text-xs">
              <div className="flex items-center space-x-2 font-bold">
                {selectedOption === currentQuestion.correctIndex ? (
                  <span className="text-emerald-700 flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Correct! Excellent Clinical Knowledge</span>
                  </span>
                ) : (
                  <span className="text-rose-700 flex items-center space-x-1.5">
                    <XCircle className="w-4 h-4 text-rose-600" />
                    <span>Incorrect • Review the clinical reasoning below</span>
                  </span>
                )}
              </div>

              <p className="text-slate-700 leading-relaxed">
                {currentQuestion.explanation}
              </p>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 text-amber-900 flex items-start space-x-2">
                <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span><span className="font-bold">Clinical Pearl:</span> {currentQuestion.clinicalPearl}</span>
              </div>
            </div>
          )}

          {/* Next / Submit Button */}
          {isAnswerSubmitted && (
            <div className="pt-2 flex justify-end">
              <button
                onClick={handleNextQuestion}
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
              >
                <span>{currentIndex < filteredQuestions.length - 1 ? 'Next Question' : 'Complete Quiz & View Results'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      ) : (
        /* Quiz Finished Screen */
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-card text-center space-y-6 animate-fade-in">
          
          <div className="w-16 h-16 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mx-auto shadow-md">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900">
              Quiz Completed!
            </h2>
            <p className="text-xs text-slate-500">
              Category: <span className="font-bold text-navy-800">{selectedCategory}</span>
            </p>
          </div>

          {/* Score display */}
          <div className="inline-block p-6 rounded-2xl bg-slate-50 border border-slate-200 min-w-[200px]">
            <div className="text-4xl font-extrabold text-teal-600">
              {Math.round((correctCount / filteredQuestions.length) * 100)}%
            </div>
            <div className="text-xs text-slate-600 mt-1 font-semibold">
              {correctCount} out of {filteredQuestions.length} correct
            </div>
          </div>

          <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
            {correctCount === filteredQuestions.length 
              ? 'Flawless performance! You have mastered these counseling principles and administration nuances.' 
              : 'Great practice session! Review the clinical pearls and apply your communication skills in patient simulations.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              onClick={handleRestartQuiz}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Quiz</span>
            </button>

            <button
              onClick={() => onNavigate('simulation')}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-md transition-all"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Apply in Patient Simulation</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
