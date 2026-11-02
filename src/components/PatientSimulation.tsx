import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  Circle, 
  AlertCircle, 
  HeartHandshake, 
  Smile, 
  Frown, 
  HelpCircle, 
  ShieldAlert, 
  Pill, 
  RotateCcw, 
  FileText, 
  ChevronRight,
  MessageSquare,
  UserCheck,
  Award
} from 'lucide-react';
import { CounselingCase, ChatMessage, EmotionalMood } from '../types';
import { processPharmacistInput } from '../services/dialogueEngine';

interface PatientSimulationProps {
  counselingCase: CounselingCase;
  onEndSimulation: (transcript: ChatMessage[], durationSeconds: number, revealedKeys: Record<string, boolean>) => void;
  onSwitchCase?: () => void;
}

export const PatientSimulation: React.FC<PatientSimulationProps> = ({
  counselingCase,
  onEndSimulation,
  onSwitchCase
}) => {
  // Chat state
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [patientMood, setPatientMood] = useState<EmotionalMood>(counselingCase.patient.baselineMood);
  const [revealedKeys, setRevealedKeys] = useState<Record<string, boolean>>({ ...counselingCase.hiddenInfo.revealedMap });
  const [activePromptCategory, setActivePromptCategory] = useState<number>(0);
  const [soapNotes, setSoapNotes] = useState('');
  const [showNotesDrawer, setShowNotesDrawer] = useState(false);
  const [showConfirmEndModal, setShowConfirmEndModal] = useState(false);

  // Timer state
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Live checklist state
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});

  // Initialize consultation on mount or case change
  useEffect(() => {
    setSecondsElapsed(0);
    setRevealedKeys({ ...counselingCase.hiddenInfo.revealedMap });
    setPatientMood(counselingCase.patient.baselineMood);
    setCompletedItems({});
    setSoapNotes('');

    // Initial greeting from patient
    const initialGreeting: ChatMessage = {
      id: 'msg-init-' + Date.now(),
      sender: 'patient',
      text: `Hello, Pharmacist. I have this new prescription from my doctor for ${counselingCase.prescription.medicationName}. To be honest, I'm a bit unsure about taking it.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      mood: counselingCase.patient.baselineMood
    };

    setMessages([initialGreeting]);
  }, [counselingCase]);

  // Elapsed timer tick
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend !== undefined ? textToSend : inputText).trim();
    if (!text || isTyping) return;

    const userMessage: ChatMessage = {
      id: 'msg-user-' + Date.now(),
      sender: 'pharmacist',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newTranscript = [...messages, userMessage];
    setMessages(newTranscript);
    setInputText('');
    setIsTyping(true);

    // Process response using rule-based dialogue engine
    setTimeout(() => {
      const match = processPharmacistInput(
        text,
        counselingCase,
        revealedKeys,
        newTranscript
      );

      // Update revealed keys
      let newRevealed = { ...revealedKeys };
      if (match.revealedHiddenKey) {
        newRevealed[match.revealedHiddenKey] = true;
        setRevealedKeys(newRevealed);
      }

      // Update checklist
      if (match.marksChecklistItemId) {
        setCompletedItems(prev => ({ ...prev, [match.marksChecklistItemId!]: true }));
      }
      if (match.matchedCompetency) {
        setCompletedItems(prev => ({ ...prev, [match.matchedCompetency!]: true }));
      }

      // Update patient mood
      setPatientMood(match.moodReaction);

      const patientMessage: ChatMessage = {
        id: 'msg-patient-' + Date.now(),
        sender: 'patient',
        text: match.patientResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        mood: match.moodReaction,
        matchedCompetency: match.matchedCompetency,
        revealedInfoNotification: match.revealedNotification
      };

      setMessages(prev => [...prev, patientMessage]);
      setIsTyping(false);
    }, 700);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getMoodBadge = (mood: EmotionalMood) => {
    switch (mood) {
      case 'anxious':
        return { label: 'Anxious / Hesitant', color: 'bg-amber-50 text-amber-700 border-amber-200', icon: <Frown className="w-3.5 h-3.5" /> };
      case 'curious':
        return { label: 'Curious / Listening', color: 'bg-sky-50 text-sky-700 border-sky-200', icon: <HelpCircle className="w-3.5 h-3.5" /> };
      case 'reassured':
        return { label: 'Reassured / Relieved', color: 'bg-mint-50 text-mint-700 border-mint-200', icon: <Smile className="w-3.5 h-3.5" /> };
      case 'grateful':
        return { label: 'Grateful & Confident', color: 'bg-teal-50 text-teal-800 border-teal-200', icon: <HeartHandshake className="w-3.5 h-3.5" /> };
      case 'skeptical':
        return { label: 'Skeptical / Questioning', color: 'bg-rose-50 text-rose-700 border-rose-200', icon: <AlertCircle className="w-3.5 h-3.5" /> };
      case 'surprised':
        return { label: 'Surprised / Alert', color: 'bg-purple-50 text-purple-700 border-purple-200', icon: <Sparkles className="w-3.5 h-3.5" /> };
      default:
        return { label: 'Neutral', color: 'bg-slate-50 text-slate-700 border-slate-200', icon: <Smile className="w-3.5 h-3.5" /> };
    }
  };

  const currentMood = getMoodBadge(patientMood);
  const revealedFactsCount = Object.values(revealedKeys).filter(Boolean).length;
  const totalHiddenFacts = Object.keys(counselingCase.hiddenInfo.revealedMap).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Simulation Top Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Patient Profile Chip */}
        <div className="flex items-center space-x-3.5">
          <div className="relative">
            <img 
              src={counselingCase.patient.avatarUrl} 
              alt={counselingCase.patient.name} 
              className="w-13 h-13 rounded-2xl object-cover ring-2 ring-teal-500/30 shadow-sm"
            />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-white" title="Online" />
          </div>

          <div className="space-y-0.5">
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-bold text-navy-900">{counselingCase.patient.name}</h2>
              <span className="text-xs text-slate-500">({counselingCase.patient.age}y, {counselingCase.patient.gender})</span>
              <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${currentMood.color}`}>
                {currentMood.icon}
                <span>{currentMood.label}</span>
              </span>
            </div>
            
            <div className="text-xs text-slate-500 flex flex-wrap items-center gap-2">
              <span className="font-semibold text-teal-700">Dx: {counselingCase.patient.diagnosis}</span>
              <span>•</span>
              <span>Rx: {counselingCase.prescription.medicationName} {counselingCase.prescription.strength}</span>
            </div>
          </div>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center space-x-3 self-end md:self-center">
          
          {/* Elapsed Timer */}
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-mono font-bold" title="Simulation Duration">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>{formatTimer(secondsElapsed)}</span>
          </div>

          {/* Pharmacist Notes Toggle */}
          <button
            onClick={() => setShowNotesDrawer(!showNotesDrawer)}
            className={`inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-colors ${
              showNotesDrawer ? 'bg-teal-50 text-teal-800 border-teal-300' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <FileText className="w-4 h-4 text-teal-600" />
            <span className="hidden sm:inline">Pharmacist Notes</span>
          </button>

          {/* End Simulation & Get Feedback Button */}
          <button
            onClick={() => setShowConfirmEndModal(true)}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-teal-700/20 transition-all transform hover:-translate-y-0.5"
          >
            <Award className="w-4 h-4" />
            <span>End Simulation & Get Feedback</span>
          </button>

        </div>

      </div>

      {/* Main Simulation Layout: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (4 cols): Prescription, Hidden Facts & Objectives Checklist */}
        <div className="lg:col-span-4 space-y-5">
          
          {/* Prescription Order Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-subtle space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center space-x-2 text-xs font-bold text-navy-900">
                <Pill className="w-4 h-4 text-teal-600 -rotate-45" />
                <span>Prescription Order (Rx)</span>
              </div>
              <span className="text-[10px] uppercase font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                Active Order
              </span>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="text-sm font-extrabold text-navy-900">
                {counselingCase.prescription.medicationName} {counselingCase.prescription.strength}
              </div>
              <div className="text-slate-600">
                <span className="font-semibold text-slate-800">Generic:</span> {counselingCase.prescription.genericName}
              </div>
              <div className="text-slate-600">
                <span className="font-semibold text-slate-800">Sig (Directions):</span> {counselingCase.prescription.directions}
              </div>
              <div className="text-slate-600">
                <span className="font-semibold text-slate-800">Form:</span> {counselingCase.prescription.dosageForm} ({counselingCase.prescription.quantity})
              </div>
              <div className="text-slate-600">
                <span className="font-semibold text-slate-800">Refills:</span> {counselingCase.prescription.refills} authorized
              </div>
              <div className="text-slate-500 pt-1 text-[11px] border-t border-slate-100">
                Prescribed by {counselingCase.prescription.prescriber}
              </div>
            </div>
          </div>

          {/* Clinical Facts Tracker */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-subtle space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs font-bold text-navy-900">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Discovered Clinical Facts</span>
              </div>
              <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full">
                {revealedFactsCount} / {totalHiddenFacts}
              </span>
            </div>

            <p className="text-[11px] text-slate-500">
              Ask targeted questions about allergies, OTCs, diet, and fears to uncover the patient's hidden history.
            </p>

            <div className="space-y-2 pt-1">
              {Object.keys(counselingCase.hiddenInfo.revealedMap).map((key) => {
                const isRevealed = revealedKeys[key];
                return (
                  <div
                    key={key}
                    className={`flex items-start space-x-2 p-2.5 rounded-xl text-xs transition-all ${
                      isRevealed 
                        ? 'bg-teal-50 border border-teal-200 text-teal-900 font-medium' 
                        : 'bg-slate-50 border border-slate-100 text-slate-400'
                    }`}
                  >
                    {isRevealed ? (
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    ) : (
                      <Circle className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
                    )}
                    <span className="capitalize">
                      {isRevealed ? getFactDescription(key, counselingCase) : `Hidden ${key.replace(/([A-Z])/g, ' $1')}`}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pharmacist SOAP / Scratchpad Drawer */}
          {showNotesDrawer && (
            <div className="bg-amber-50/60 rounded-2xl border border-amber-200 p-4 shadow-subtle space-y-2 animate-fade-in">
              <div className="flex items-center justify-between text-xs font-bold text-amber-900">
                <span className="flex items-center space-x-1.5">
                  <FileText className="w-4 h-4 text-amber-600" />
                  <span>Pharmacist Consultation Notes</span>
                </span>
                <span className="text-[10px] text-amber-600 font-normal">Private Scratchpad</span>
              </div>
              <textarea
                value={soapNotes}
                onChange={(e) => setSoapNotes(e.target.value)}
                placeholder="Document Subjective/Objective findings, drug interactions, patient counseling points here..."
                rows={4}
                className="w-full p-2.5 rounded-xl border border-amber-200 bg-white text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
              />
            </div>
          )}

        </div>

        {/* Right Column (8 cols): Interactive Dialogue Arena */}
        <div className="lg:col-span-8 flex flex-col h-[700px] bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
          
          {/* Chat Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 custom-scrollbar bg-slate-50/40">
            
            {/* Simulation Started Banner */}
            <div className="text-center my-2">
              <span className="text-[11px] font-semibold text-slate-400 bg-white px-3 py-1 rounded-full border border-slate-200/80 shadow-subtle">
                Simulation Started • Pharmacist-Patient Counseling Session
              </span>
            </div>

            {messages.map((msg) => {
              const isPharmacist = msg.sender === 'pharmacist';

              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 ${isPharmacist ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {/* Avatar */}
                  {isPharmacist ? (
                    <div className="w-9 h-9 rounded-full bg-navy-900 text-white flex items-center justify-center font-bold text-xs ring-2 ring-teal-500/30 shrink-0">
                      Rx
                    </div>
                  ) : (
                    <img
                      src={counselingCase.patient.avatarUrl}
                      alt={counselingCase.patient.name}
                      className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-200 shrink-0"
                    />
                  )}

                  {/* Message Bubble */}
                  <div className={`max-w-[80%] space-y-1.5 ${isPharmacist ? 'items-end' : 'items-start'}`}>
                    
                    <div
                      className={`p-4 rounded-2xl text-sm leading-relaxed ${
                        isPharmacist
                          ? 'bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-tr-none shadow-sm font-medium'
                          : 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-none shadow-subtle'
                      }`}
                    >
                      {msg.text}
                    </div>

                    {/* Discovered fact notification in-line */}
                    {msg.revealedInfoNotification && (
                      <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-teal-50 border border-teal-200 text-teal-800 text-[11px] font-bold">
                        <Sparkles className="w-3 h-3 text-teal-600" />
                        <span>{msg.revealedInfoNotification}</span>
                      </div>
                    )}

                    <div className={`text-[10px] text-slate-400 px-1 ${isPharmacist ? 'text-right' : 'text-left'}`}>
                      {isPharmacist ? 'You (Pharmacist)' : counselingCase.patient.name} • {msg.timestamp}
                    </div>

                  </div>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center space-x-2 text-xs text-slate-500 p-2">
                <img
                  src={counselingCase.patient.avatarUrl}
                  alt={counselingCase.patient.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <div className="flex items-center space-x-1 bg-white px-3 py-2 rounded-full border border-slate-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  <span className="ml-1 text-[11px] font-medium text-slate-500">{counselingCase.patient.name} is responding...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompts Tabbed Tray */}
          <div className="border-t border-slate-200 bg-white p-3 space-y-2">
            
            {/* Category Switcher Tabs */}
            <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 custom-scrollbar text-[11px] font-bold">
              {counselingCase.suggestedPromptCategories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePromptCategory(idx)}
                  className={`px-3 py-1 rounded-lg whitespace-nowrap transition-colors ${
                    activePromptCategory === idx
                      ? 'bg-teal-50 text-teal-700 border border-teal-200'
                      : 'text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  {cat.categoryName}
                </button>
              ))}
            </div>

            {/* Prompt Chips */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-1 custom-scrollbar">
              {counselingCase.suggestedPromptCategories[activePromptCategory]?.prompts.map((promptText, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(promptText)}
                  className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-teal-50 hover:text-teal-800 text-slate-700 border border-slate-200 text-xs text-left whitespace-nowrap transition-colors group flex items-center space-x-1.5"
                  title="Click to ask the patient directly"
                >
                  <span className="line-clamp-1">{promptText}</span>
                  <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-teal-600 shrink-0" />
                </button>
              ))}
            </div>

          </div>

          {/* Pharmacist Input Area */}
          <div className="p-3 sm:p-4 bg-white border-t border-slate-200">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Type your question or counseling instruction to the patient... (e.g. check identity, ask about allergies, explain timing)"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isTyping}
                className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 placeholder:text-slate-400 disabled:bg-slate-50 font-normal"
              />

              <button
                onClick={() => handleSendMessage()}
                disabled={!inputText.trim() || isTyping}
                className="px-5 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-bold text-sm shadow-md transition-all flex items-center space-x-1.5 shrink-0"
              >
                <span>Send</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Confirmation Modal to End Simulation */}
      {showConfirmEndModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-5 shadow-elevated">
            
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
              <Award className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-navy-900">
                End Simulation & Generate Feedback?
              </h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Our objective assessment engine will evaluate your conversation across all <span className="font-bold text-navy-900">10 clinical counseling competencies</span>, evaluate your communication clarity, and provide specific question improvements.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
              <div className="flex justify-between">
                <span>Total Consultation Time:</span>
                <span className="font-bold text-navy-900">{formatTimer(secondsElapsed)}</span>
              </div>
              <div className="flex justify-between">
                <span>Conversation Turns:</span>
                <span className="font-bold text-navy-900">{messages.length} messages</span>
              </div>
              <div className="flex justify-between">
                <span>Clinical Facts Uncovered:</span>
                <span className="font-bold text-teal-700">{revealedFactsCount} of {totalHiddenFacts}</span>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => setShowConfirmEndModal(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Continue Consultation
              </button>

              <button
                onClick={() => {
                  setShowConfirmEndModal(false);
                  onEndSimulation(messages, secondsElapsed, revealedKeys);
                }}
                className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-all"
              >
                View Assessment Report
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

function getFactDescription(key: string, counselingCase: CounselingCase): string {
  switch (key) {
    case 'allergies':
      return 'Allergy verification completed';
    case 'ibuprofen':
      return 'Discovered OTC Ibuprofen tension headache use';
    case 'diet':
      return 'Uncovered salted road snack and sweet coffee habits';
    case 'fearKidney':
      return 'Debunked kidney damage misconception';
    case 'canIStop':
      return 'Addressed asymptomatic adherence ("silent killer")';
    case 'wine':
      return 'Uncovered weekend alcohol habit with metformin';
    case 'insulinFear':
      return 'Reassured patient regarding oral therapy prognosis';
    case 'coffee':
      return 'Identified 4 morning espressos as GERD trigger';
    case 'birthControl':
      return 'Identified concurrent oral contraceptive pill';
    case 'stopEarlyHabit':
      return 'Discovered habit of stopping antibiotics on day 3';
    case 'grapefruit':
      return 'Identified severe pink grapefruit juice interaction';
    case 'muscleFear':
      return 'De-escalated statin myopathy internet panic';
    default:
      return 'Disclosed clinical patient factor';
  }
}
