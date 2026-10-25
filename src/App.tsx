import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { CermatPractice } from './components/CermatPractice';
import { ReadingTracker } from './components/ReadingTracker';
import { FreeResources } from './components/FreeResources';
import { BookAnalysis } from './data/booksDatabase';
import { GraduationCap, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'cermat' | 'reading' | 'resources'>('cermat');

  const [selectedBookIds, setSelectedBookIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('maturyta_selected_books');
    return saved ? JSON.parse(saved) : ['b1', 'b2', 'b4'];
  });

  const [weakQuestionIds, setWeakQuestionIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('maturyta_weak_questions');
    return saved ? JSON.parse(saved) : ['q2'];
  });

  const [customBooks, setCustomBooks] = useState<BookAnalysis[]>(() => {
    const saved = localStorage.getItem('maturyta_custom_books');
    return saved ? JSON.parse(saved) : [];
  });

  const [testStats, setTestStats] = useState<{ totalAttempted: number; correct: number }>(() => {
    const saved = localStorage.getItem('maturyta_test_stats');
    return saved ? JSON.parse(saved) : { totalAttempted: 0, correct: 0 };
  });

  useEffect(() => {
    localStorage.setItem('maturyta_selected_books', JSON.stringify(selectedBookIds));
  }, [selectedBookIds]);

  useEffect(() => {
    localStorage.setItem('maturyta_weak_questions', JSON.stringify(weakQuestionIds));
  }, [weakQuestionIds]);

  useEffect(() => {
    localStorage.setItem('maturyta_custom_books', JSON.stringify(customBooks));
  }, [customBooks]);

  useEffect(() => {
    localStorage.setItem('maturyta_test_stats', JSON.stringify(testStats));
  }, [testStats]);

  const handleAnswerAttempt = (isCorrect: boolean) => {
    setTestStats((prev) => ({
      totalAttempted: prev.totalAttempted + 1,
      correct: prev.correct + (isCorrect ? 1 : 0),
    }));
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#F8F6F0]">

      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedBookIds={selectedBookIds}
        testStats={testStats}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'cermat' && (
          <CermatPractice
            weakQuestionIds={weakQuestionIds}
            setWeakQuestionIds={setWeakQuestionIds}
            onAnswerAttempt={handleAnswerAttempt}
          />
        )}

        {activeTab === 'reading' && (
          <ReadingTracker
            selectedBookIds={selectedBookIds}
            setSelectedBookIds={setSelectedBookIds}
            customBooks={customBooks}
            setCustomBooks={setCustomBooks}
          />
        )}

        {activeTab === 'resources' && (
          <FreeResources />
        )}
      </main>

      <footer className="bg-[#2D3A45] text-[#F8F6F0]/80 py-8 border-t-4 border-[#7CAEA3] mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-lg font-bold text-white">
              <GraduationCap className="w-5 h-5 text-[#DBA834]" />
              <span>Maturyta</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Všechny CERMAT zkoušky, maturitní četba a bezplatné audio zdroje na jednom místě.
            </p>
          </div>

          <div className="text-xs text-gray-400 flex items-center gap-1 justify-center">
            <span>Vytvořeno pro české maturanty</span>
            <Heart className="w-3.5 h-3.5 text-[#E66B5B] fill-current inline" />
          </div>
        </div>
      </footer>

    </div>
  );
}
