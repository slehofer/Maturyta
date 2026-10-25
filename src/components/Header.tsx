import React from 'react';
import { BookOpen, GraduationCap, Download, Award } from 'lucide-react';

interface HeaderProps {
  activeTab: 'cermat' | 'reading' | 'resources';
  setActiveTab: (tab: 'cermat' | 'reading' | 'resources') => void;
  selectedBookIds: string[];
  testStats: { totalAttempted: number; correct: number };
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  selectedBookIds,
  testStats,
}) => {
  const selectedCount = selectedBookIds.length;
  const targetBooks = 20;
  const bookProgressPercent = Math.min(100, Math.round((selectedCount / targetBooks) * 100));
  const accuracy = testStats.totalAttempted > 0
    ? Math.round((testStats.correct / testStats.totalAttempted) * 100)
    : 0;

  return (
    <header className="bg-[#2D3A45] text-[#F8F6F0] shadow-lg border-b-4 border-[#DBA834] sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('cermat')}>
            <div className="bg-[#DBA834] text-[#2D3A45] p-2.5 rounded-2xl font-black text-2xl shadow-md flex items-center justify-center">
              <GraduationCap className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#F8F6F0]">
                  Maturyta
                </h1>
                <span className="bg-[#E66B5B] text-white text-xs px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  Český jazyk
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#7CAEA3] font-medium">
                Příprava na maturitu v pohodě & bez stresu
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 bg-[#1C262E]/60 p-2.5 rounded-xl border border-white/10 text-xs sm:text-sm">
            <div className="flex items-center space-x-2.5 px-3 py-1.5 bg-[#2D3A45] rounded-lg border border-[#7CAEA3]/30">
              <BookOpen className="w-4 h-4 text-[#DBA834]" />
              <div>
                <div className="text-[10px] text-gray-300 font-semibold uppercase">Maturitní četba</div>
                <div className="font-bold text-[#F8F6F0] flex items-center gap-1.5">
                  <span>{selectedCount} z {targetBooks} knih</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${selectedCount >= 20 ? 'bg-emerald-500 text-white' : 'bg-[#DBA834] text-[#2D3A45]'}`}>
                    {bookProgressPercent}%
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2.5 px-3 py-1.5 bg-[#2D3A45] rounded-lg border border-[#7CAEA3]/30">
              <Award className="w-4 h-4 text-[#E66B5B]" />
              <div>
                <div className="text-[10px] text-gray-300 font-semibold uppercase">Úspěšnost testů</div>
                <div className="font-bold text-[#F8F6F0]">
                  {testStats.totalAttempted > 0 ? `${accuracy}% (${testStats.correct}/${testStats.totalAttempted})` : 'Zatím netestováno'}
                </div>
              </div>
            </div>
          </div>

        </div>

        <nav className="flex space-x-2 sm:space-x-4 mt-4 pt-3 border-t border-white/10 overflow-x-auto">
          <button
            onClick={() => setActiveTab('cermat')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-sm sm:text-base transition-all whitespace-nowrap ${
              activeTab === 'cermat'
                ? 'bg-[#DBA834] text-[#2D3A45] shadow-md'
                : 'text-[#F8F6F0]/80 hover:bg-white/10 hover:text-white'
            }`}
          >
            <GraduationCap className="w-5 h-5" />
            <span>1. CERMAT Testy & Procvičování</span>
          </button>

          <button
            onClick={() => setActiveTab('reading')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-sm sm:text-base transition-all whitespace-nowrap ${
              activeTab === 'reading'
                ? 'bg-[#DBA834] text-[#2D3A45] shadow-md'
                : 'text-[#F8F6F0]/80 hover:bg-white/10 hover:text-white'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span>2. Maturitní četba & Rozbory</span>
            {selectedCount > 0 && (
              <span className="ml-1 bg-[#E66B5B] text-white text-xs px-2 py-0.5 rounded-full font-bold">
                {selectedCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('resources')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-sm sm:text-base transition-all whitespace-nowrap ${
              activeTab === 'resources'
                ? 'bg-[#DBA834] text-[#2D3A45] shadow-md'
                : 'text-[#F8F6F0]/80 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Download className="w-5 h-5" />
            <span>3. Zdroje zdarma (E-knihy & Audioknihy)</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
