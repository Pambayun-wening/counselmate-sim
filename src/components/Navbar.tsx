import React, { useState } from 'react';
import { 
  Pill, 
  LayoutDashboard, 
  FolderKanban, 
  MessageSquareHeart, 
  BookOpen, 
  GraduationCap, 
  TrendingUp, 
  Flame, 
  Menu, 
  X,
  Sparkles
} from 'lucide-react';
import { UserStats } from '../types';

export type PageId = 'landing' | 'dashboard' | 'cases' | 'simulation' | 'guide' | 'quiz' | 'progress';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  userStats: UserStats;
  activeCaseTitle?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  userStats,
  activeCaseTitle
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageId; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'cases', label: 'Case Library', icon: <FolderKanban className="w-4 h-4" /> },
    { id: 'simulation', label: 'Simulation', icon: <MessageSquareHeart className="w-4 h-4" /> },
    { id: 'guide', label: 'Counseling Guide', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'quiz', label: 'Quiz Center', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'progress', label: 'Learning Progress', icon: <TrendingUp className="w-4 h-4" /> },
  ];

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-header shadow-subtle border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Tagline */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavClick('landing')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 via-teal-500 to-navy-700 flex items-center justify-center text-white shadow-md shadow-teal-500/20 ring-2 ring-white">
              <Pill className="w-5 h-5 -rotate-45" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-xl text-navy-900 tracking-tight">Counsel<span className="text-teal-600">Mate</span></span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200">Sim</span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">Practice. Communicate. Care.</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-teal-50 text-teal-700 shadow-sm border border-teal-200/70'
                      : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100/70'
                  }`}
                >
                  <span className={isActive ? 'text-teal-600' : 'text-slate-400'}>{item.icon}</span>
                  <span>{item.label}</span>
                  {item.id === 'simulation' && activeCaseTitle && (
                    <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse ml-1" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Header Status / Profile */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Daily Streak */}
            <div className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-700 text-xs font-bold" title="Daily Practice Streak">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>{userStats.streakDays} Day Streak</span>
            </div>

            {/* Student Profile Badge */}
            <div 
              onClick={() => handleNavClick('progress')}
              className="flex items-center space-x-2.5 pl-3 border-l border-slate-200 cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-navy-800 to-navy-600 text-white flex items-center justify-center font-bold text-xs ring-2 ring-teal-500/30 group-hover:ring-teal-500 transition-all">
                SM
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-navy-900 leading-tight group-hover:text-teal-600 transition-colors">Sarah M.</div>
                <div className="text-[10px] text-slate-500 leading-tight">PharmD Candidate</div>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-navy-900 hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-md px-4 pt-2 pb-4 space-y-1 shadow-lg">
          <div className="flex items-center justify-between py-2 px-3 mb-2 bg-slate-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-full bg-navy-800 text-white flex items-center justify-center text-xs font-bold">SM</div>
              <span className="text-xs font-bold text-navy-900">Sarah M. (PharmD)</span>
            </div>
            <div className="flex items-center space-x-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
              <Flame className="w-3.5 h-3.5 fill-amber-500" />
              <span>{userStats.streakDays}d Streak</span>
            </div>
          </div>

          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-teal-50 text-teal-700 font-bold border border-teal-200'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className={isActive ? 'text-teal-600' : 'text-slate-400'}>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
