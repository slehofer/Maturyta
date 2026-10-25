import React, { useState } from 'react';
import { CERMAT_QUESTIONS, CermatQuestion } from '../data/cermatQuestions';
import { CheckCircle2, XCircle, AlertTriangle, Lightbulb, Play } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CermatPracticeProps {
  weakQuestionIds: string[];
  setWeakQuestionIds: React.Dispatch<React.SetStateAction<string[]>>;
  onAnswerAttempt: (isCorrect: boolean) => void;
}

export const CermatPractice: React.FC<CermatPracticeProps> = ({
  weakQuestionIds,
  setWeakQuestionIds,
  onAnswerAttempt,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [mode, setMode] = useState<'practice' | 'weakspots'>('practice');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);

  const filteredQuestions = CERMAT_QUESTIONS.filter((q) => {
    if (mode === 'weakspots') {
      return weakQuestionIds.includes(q.id);
    }
    if (selectedCategory !== 'all') {
      return q.category === selectedCategory;
    }
    return true;
  });

  const currentQuestion: CermatQuestion | undefined = filteredQuestions[currentIndex];

  const handleOptionSelect = (index: number) => {
    if (selectedOption !== null || !currentQuestion) return;
    setSelectedOption(index);
    setShowExplanation(true);

    const isCorrect = index === currentQuestion.correctAnswerIndex;
    onAnswerAttempt(isCorrect);

    if (isCorrect) {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#DBA834', '#7CAEA3', '#E66B5B']
      });

      if (weakQuestionIds.includes(currentQuestion.id)) {
        setWeakQuestionIds((prev) => prev.filter((id) => id !== currentQuestion.id));
      }
    } else {
      if (!weakQuestionIds.includes(currentQuestion.id)) {
        setWeakQuestionIds((prev) => [...prev, currentQuestion.id]);
      }
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setShowExplanation(false);
    setShowHint(false);
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setShowHint(false);
  };

  return (
    <div className="space-y-6">

      <div className="bg-white p-6 rounded-2xl shadow-xs border border-[#7CAEA3]/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-[#2D3A45] flex items-center gap-2">
            <span>📝</span> CERMAT Didaktické testy & Procvičování
          </h2>
          <p className="text-[#2D3A45]/80 text-sm mt-1">
            Procvičujte oficiální maturitní typové úlohy. Systém automaticky zaznamená úlohy, které vám nejdou, do sekce Moje slabá místa.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-[#F8F6F0] p-1.5 rounded-xl border border-gray-200 shrink-0">
          <button
            onClick={() => { setMode('practice'); setCurrentIndex(0); setSelectedOption(null); setShowExplanation(false); }}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              mode === 'practice'
                ? 'bg-[#2D3A45] text-white shadow-xs'
                : 'text-[#2D3A45]/70 hover:text-[#2D3A45]'
            }`}
          >
            Všechna cvičení
          </button>
          <button
            onClick={() => { setMode('weakspots'); setCurrentIndex(0); setSelectedOption(null); setShowExplanation(false); }}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-1.5 ${
              mode === 'weakspots'
                ? 'bg-[#E66B5B] text-white shadow-xs'
                : 'text-[#E66B5B] hover:bg-[#E66B5B]/10'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Moje slabá místa</span>
            {weakQuestionIds.length > 0 && (
              <span className="bg-white text-[#E66B5B] text-xs px-2 py-0.2 rounded-full font-extrabold">
                {weakQuestionIds.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {mode === 'practice' && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-[#2D3A45]/70 uppercase tracking-wider mr-2">Kategorie:</span>
          {[
            { id: 'all', label: 'Všechny okruhy' },
            { id: 'Pravopis a mluvnice', label: 'Pravopis a mluvnice' },
            { id: 'Literární historie a teorie', label: 'Literární historie' },
            { id: 'Práce s textem a porozumění', label: 'Porozumění textu' },
            { id: 'Skladba a tvarosloví', label: 'Skladba a tvarosloví' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#7CAEA3] text-white shadow-xs font-bold'
                  : 'bg-white text-[#2D3A45] hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      {!currentQuestion ? (
        <div className="bg-white p-12 rounded-2xl border-2 border-dashed border-gray-300 text-center space-y-3">
          <div className="bg-[#7CAEA3]/20 rounded-full text-[#7CAEA3] p-4 inline-block">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold text-[#2D3A45]">
            {mode === 'weakspots' ? 'Nemáte žádná uložená slabá místa!' : 'Pro vybrané kritérium nebyly nalezeny žádné otázky.'}
          </h3>
          <p className="text-gray-600 max-w-md mx-auto text-sm">
            {mode === 'weakspots'
              ? 'Skvělá práce! Když uděláte chybu v normálním procvičování, otázka se automaticky zařadí sem pro opětovný trénink.'
              : 'Zkuste vybrat jinou kategorii ze seznamu výše.'}
          </p>
          {mode === 'weakspots' && (
            <button
              onClick={() => setMode('practice')}
              className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 bg-[#DBA834] text-[#2D3A45] font-bold rounded-xl shadow-xs hover:bg-[#c9982a]"
            >
              Návrat k běžnému procvičování
            </button>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden">

          <div className="bg-[#2D3A45] text-white px-6 py-4 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="bg-[#DBA834] text-[#2D3A45] text-xs px-2.5 py-1 rounded-md font-bold uppercase tracking-wide">
                {currentQuestion.category}
              </span>
              <span className="text-xs text-gray-300 font-medium">
                {currentQuestion.yearSource}
              </span>
            </div>
            <div className="text-xs text-gray-300 font-medium">
              Otázka <strong className="text-white">{currentIndex + 1}</strong> z <strong className="text-white">{filteredQuestions.length}</strong>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">

            {currentQuestion.textExtract && (
              <div className="p-4 bg-[#F8F6F0] rounded-xl border-l-4 border-[#7CAEA3] italic text-sm text-[#2D3A45]/90 leading-relaxed font-serif">
                "{currentQuestion.textExtract}"
              </div>
            )}

            <h3 className="text-lg sm:text-xl font-bold text-[#2D3A45] leading-snug">
              {currentQuestion.question}
            </h3>

            <div className="space-y-3">
              {currentQuestion.options.map((option, idx) => {
                let btnStyle = 'border-gray-200 bg-white hover:border-[#DBA834] hover:bg-[#F8F6F0] text-[#2D3A45]';
                let icon = <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center font-bold text-xs shrink-0">{String.fromCharCode(65 + idx)}</div>;

                if (selectedOption !== null) {
                  if (idx === currentQuestion.correctAnswerIndex) {
                    btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold';
                    icon = <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />;
                  } else if (idx === selectedOption) {
                    btnStyle = 'border-red-500 bg-red-50 text-red-900 font-semibold';
                    icon = <XCircle className="w-6 h-6 text-red-600 shrink-0" />;
                  } else {
                    btnStyle = 'border-gray-100 opacity-50 bg-gray-50 text-gray-400';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={selectedOption !== null}
                    onClick={() => handleOptionSelect(idx)}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center space-x-3 text-sm sm:text-base ${btnStyle}`}
                  >
                    {icon}
                    <span className="flex-1">{option}</span>
                  </button>
                );
              })}
            </div>

            {currentQuestion.hint && selectedOption === null && (
              <div className="pt-2">
                {!showHint ? (
                  <button
                    onClick={() => setShowHint(true)}
                    className="text-xs font-bold text-[#7CAEA3] hover:underline flex items-center gap-1.5"
                  >
                    <Lightbulb className="w-4 h-4 text-[#DBA834]" />
                    <span>Zobrazit nápovědu / pomůcku</span>
                  </button>
                ) : (
                  <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm rounded-xl flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Nápověda:</strong> {currentQuestion.hint}
                    </div>
                  </div>
                )}
              </div>
            )}

            {showExplanation && (
              <div className={`p-5 rounded-2xl border-2 space-y-2 ${
                selectedOption === currentQuestion.correctAnswerIndex
                  ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                  : 'bg-red-50/80 border-red-300 text-red-950'
              }`}>
                <div className="flex items-center gap-2 font-extrabold text-base">
                  {selectedOption === currentQuestion.correctAnswerIndex ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>Správně! Výborně vyřešeno.</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-red-600" />
                      <span>Nebylo to úplně přesně. Otázka byla uložena do „Mých slabých míst“.</span>
                    </>
                  )}
                </div>
                <p className="text-sm leading-relaxed font-medium pt-1">
                  <strong>Vysvětlení:</strong> {currentQuestion.explanation}
                </p>
              </div>
            )}

            {selectedOption !== null && (
              <div className="pt-4 border-t border-gray-100 flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-3 bg-[#DBA834] hover:bg-[#c9982a] text-[#2D3A45] font-extrabold rounded-xl shadow-md transition-all flex items-center space-x-2"
                >
                  <span>
                    {currentIndex < filteredQuestions.length - 1 ? 'Další otázka' : 'Opakovat od začátku'}
                  </span>
                  <Play className="w-4 h-4 fill-current" />
                </button>
              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
};
