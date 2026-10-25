import React, { useState } from 'react';
import { BOOKS_DATABASE, BookAnalysis } from '../data/booksDatabase';
import { Check, Plus, Search, Filter, X, FileText, User, Calendar, Tag, ChevronRight, BookmarkPlus } from 'lucide-react';

interface ReadingTrackerProps {
  selectedBookIds: string[];
  setSelectedBookIds: React.Dispatch<React.SetStateAction<string[]>>;
  customBooks: BookAnalysis[];
  setCustomBooks: React.Dispatch<React.SetStateAction<BookAnalysis[]>>;
}

export const ReadingTracker: React.FC<ReadingTrackerProps> = ({
  selectedBookIds,
  setSelectedBookIds,
  customBooks,
  setCustomBooks,
}) => {
  const [activeModalBook, setActiveModalBook] = useState<BookAnalysis | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [periodFilter, setPeriodFilter] = useState<string>('all');
  const [showAddCustomModal, setShowAddCustomModal] = useState<boolean>(false);

  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newPeriod, setNewPeriod] = useState('20. století');
  const [newGenre, setNewGenre] = useState('Proza');
  const [newSummary, setNewSummary] = useState('');

  const allBooks = [...BOOKS_DATABASE, ...customBooks];

  const toggleBookSelection = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedBookIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddCustomBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newAuthor.trim()) return;

    const newBook: BookAnalysis = {
      id: `custom-${Date.now()}`,
      title: newTitle,
      author: newAuthor,
      period: newPeriod,
      genre: newGenre,
      summary: newSummary || 'Vlastní zaznamenané poznámky k dílu.',
      historicalContext: 'Vlastní záznam čtenáře.',
      characters: [{ name: 'Hlavní postava', description: 'Popis hlavní postavy' }],
      themes: ['Vlastní četba'],
      keyQuotes: []
    };

    setCustomBooks((prev) => [...prev, newBook]);
    setSelectedBookIds((prev) => [...prev, newBook.id]);

    setNewTitle('');
    setNewAuthor('');
    setNewSummary('');
    setShowAddCustomModal(false);
  };

  const filteredBooks = allBooks.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPeriod = periodFilter === 'all' || book.period.includes(periodFilter);

    return matchesSearch && matchesPeriod;
  });

  return (
    <div className="space-y-6">

      <div className="bg-white p-6 rounded-2xl shadow-xs border border-[#7CAEA3]/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-[#2D3A45] flex items-center gap-2">
            <span>📚</span> Maturitní četba & Rozbory děl
          </h2>
          <p className="text-[#2D3A45]/80 text-sm mt-1">
            Vyberte si svých 20 maturitních knih, sledujte svůj postup a prostudujte si podrobné strukturované rozbory ke každému dílu.
          </p>
        </div>

        <button
          onClick={() => setShowAddCustomModal(true)}
          className="px-4 py-2.5 bg-[#7CAEA3] hover:bg-[#68998e] text-white font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 shrink-0"
        >
          <Plus className="w-5 h-5" />
          <span>Přidat vlastní knihu</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="bg-[#2D3A45] text-[#F8F6F0] p-5 rounded-2xl shadow-xs border border-[#DBA834]/40 flex flex-col justify-between">
          <div>
            <div className="text-xs uppercase font-bold text-[#DBA834] tracking-wider">
              Maturitní seznam (Cíl: 20 děl)
            </div>
            <div className="text-3xl font-black mt-1">
              {selectedBookIds.length} <span className="text-sm font-semibold text-gray-300">/ 20 vybráno</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-[#1C262E] h-3 rounded-full overflow-hidden border border-white/10">
              <div
                className="bg-[#DBA834] h-full transition-all duration-500 rounded-full"
                style={{ width: `${Math.min(100, (selectedBookIds.length / 20) * 100)}%` }}
              />
            </div>
            <div className="text-[11px] text-gray-300 mt-1.5 text-right font-medium">
              {selectedBookIds.length >= 20 ? '🎉 Cíl 20 děl splněn!' : `Chybí ještě ${20 - selectedBookIds.length} děl`}
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex flex-col justify-center space-y-2">
          <label className="text-xs font-bold uppercase text-[#2D3A45]/70 flex items-center gap-1.5">
            <Search className="w-4 h-4 text-[#7CAEA3]" />
            <span>Hledat dílo nebo autora</span>
          </label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="např. Mácha, Spalovač..."
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-hidden text-sm"
          />
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex flex-col justify-center space-y-2">
          <label className="text-xs font-bold uppercase text-[#2D3A45]/70 flex items-center gap-1.5">
            <Filter className="w-4 h-4 text-[#7CAEA3]" />
            <span>Filtr podle období</span>
          </label>
          <select
            value={periodFilter}
            onChange={(e) => setPeriodFilter(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm bg-white"
          >
            <option value="all">Všechna období</option>
            <option value="romantismus">Romantismus</option>
            <option value="20. století">20. století</option>
          </select>
        </div>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => {
          const isSelected = selectedBookIds.includes(book.id);

          return (
            <div
              key={book.id}
              onClick={() => setActiveModalBook(book)}
              className={`bg-white rounded-2xl border-2 p-5 shadow-xs transition-all hover:shadow-md cursor-pointer flex flex-col justify-between relative group ${
                isSelected ? 'border-[#DBA834] bg-amber-50/20' : 'border-gray-200 hover:border-[#7CAEA3]'
              }`}
            >

              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-[#F8F6F0] text-[#2D3A45] border border-gray-200">
                    {book.genre}
                  </span>

                  <button
                    onClick={(e) => toggleBookSelection(book.id, e)}
                    className={`p-2 rounded-xl transition-all ${
                      isSelected
                        ? 'bg-[#DBA834] text-[#2D3A45] shadow-xs'
                        : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-700'
                    }`}
                  >
                    <Check className={`w-4 h-4 ${isSelected ? 'opacity-100' : 'opacity-40'}`} />
                  </button>
                </div>

                <h3 className="text-lg font-black text-[#2D3A45] group-hover:text-[#E66B5B] transition-colors leading-tight">
                  {book.title}
                </h3>
                <p className="text-sm font-semibold text-[#7CAEA3] mt-0.5">
                  {book.author}
                </p>

                <p className="text-xs text-gray-500 mt-2 font-medium">
                  {book.period}
                </p>

                <p className="text-xs text-gray-600 mt-3 line-clamp-3 leading-relaxed">
                  {book.summary}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#2D3A45]">
                <span className="text-[#E66B5B] group-hover:underline flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Rozbor díla</span>
                </span>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
              </div>

            </div>
          );
        })}
      </div>

      {activeModalBook && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-4 border-[#2D3A45] relative">

            <div className="sticky top-0 bg-[#2D3A45] text-white p-6 rounded-t-2xl flex items-start justify-between border-b-4 border-[#DBA834] z-10">
              <div>
                <span className="bg-[#DBA834] text-[#2D3A45] text-xs px-2.5 py-1 rounded-md font-bold uppercase">
                  {activeModalBook.genre}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  {activeModalBook.title}
                </h2>
                <p className="text-base text-[#7CAEA3] font-semibold">
                  {activeModalBook.author} ({activeModalBook.period})
                </p>
              </div>

              <button
                onClick={() => setActiveModalBook(null)}
                className="p-2 text-gray-300 hover:text-white bg-white/10 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6">

              <div className="flex items-center justify-between p-4 bg-[#F8F6F0] rounded-2xl border border-gray-200">
                <span className="text-sm font-bold text-[#2D3A45]">
                  Stav v mém maturitním seznamu:
                </span>
                <button
                  onClick={() => toggleBookSelection(activeModalBook.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 ${
                    selectedBookIds.includes(activeModalBook.id)
                      ? 'bg-[#DBA834] text-[#2D3A45]'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Check className="w-4 h-4" />
                  <span>{selectedBookIds.includes(activeModalBook.id) ? 'Vybráno' : 'Přidat do seznamu 20 knih'}</span>
                </button>
              </div>

              <div>
                <h4 className="text-lg font-bold text-[#2D3A45] border-b-2 border-[#7CAEA3] pb-1 mb-2 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#E66B5B]" />
                  <span>Stručný děj</span>
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed font-normal">
                  {activeModalBook.summary}
                </p>
              </div>

              <div>
                <h4 className="text-lg font-bold text-[#2D3A45] border-b-2 border-[#7CAEA3] pb-1 mb-2 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#DBA834]" />
                  <span>Literárně-historický kontext</span>
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed font-normal">
                  {activeModalBook.historicalContext}
                </p>
              </div>

              {activeModalBook.characters && activeModalBook.characters.length > 0 && (
                <div>
                  <h4 className="text-lg font-bold text-[#2D3A45] border-b-2 border-[#7CAEA3] pb-1 mb-3 flex items-center gap-2">
                    <User className="w-5 h-5 text-[#7CAEA3]" />
                    <span>Hlavní postavy</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeModalBook.characters.map((char, idx) => (
                      <div key={idx} className="p-3 bg-[#F8F6F0] rounded-xl border border-gray-200">
                        <strong className="text-sm text-[#2D3A45] block">{char.name}</strong>
                        <span className="text-xs text-gray-600 leading-snug block mt-0.5">{char.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeModalBook.themes && activeModalBook.themes.length > 0 && (
                <div>
                  <h4 className="text-lg font-bold text-[#2D3A45] border-b-2 border-[#7CAEA3] pb-1 mb-2 flex items-center gap-2">
                    <Tag className="w-5 h-5 text-[#E66B5B]" />
                    <span>Témata a motivy</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeModalBook.themes.map((theme, idx) => (
                      <span key={idx} className="px-3 py-1 bg-amber-100 text-amber-900 border border-amber-300 rounded-lg text-xs font-semibold">
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {activeModalBook.keyQuotes && activeModalBook.keyQuotes.length > 0 && (
                <div>
                  <h4 className="text-lg font-bold text-[#2D3A45] border-b-2 border-[#7CAEA3] pb-1 mb-2">
                    Klíčové citace k ústní zkoušce
                  </h4>
                  <div className="space-y-2">
                    {activeModalBook.keyQuotes.map((quote, idx) => (
                      <div key={idx} className="italic text-xs sm:text-sm p-3 bg-amber-50 rounded-xl border-l-4 border-[#DBA834] text-amber-950 font-serif">
                        "{quote}"
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>
      )}

      {showAddCustomModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border-4 border-[#2D3A45] space-y-5 relative">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-xl font-bold text-[#2D3A45] flex items-center gap-2">
                <BookmarkPlus className="w-6 h-6 text-[#7CAEA3]" />
                <span>Přidat vlastní maturitní knihu</span>
              </h3>
              <button onClick={() => setShowAddCustomModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleAddCustomBook} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#2D3A45] uppercase">Název knihy *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="např. Krysař"
                  className="w-full mt-1 px-4 py-2 rounded-xl border border-gray-300 text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#2D3A45] uppercase">Autor *</label>
                <input
                  type="text"
                  required
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  placeholder="např. Viktor Dyk"
                  className="w-full mt-1 px-4 py-2 rounded-xl border border-gray-300 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#2D3A45] uppercase">Období / Styl</label>
                  <input
                    type="text"
                    value={newPeriod}
                    onChange={(e) => setNewPeriod(e.target.value)}
                    placeholder="20. století"
                    className="w-full mt-1 px-4 py-2 rounded-xl border border-gray-300 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#2D3A45] uppercase">Žánr</label>
                  <input
                    type="text"
                    value={newGenre}
                    onChange={(e) => setNewGenre(e.target.value)}
                    placeholder="Novela"
                    className="w-full mt-1 px-4 py-2 rounded-xl border border-gray-300 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#2D3A45] uppercase">Moje poznámky / Děj</label>
                <textarea
                  rows={3}
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  placeholder="Stručný obsah..."
                  className="w-full mt-1 px-4 py-2 rounded-xl border border-gray-300 text-sm"
                />
              </div>

              <div className="pt-3 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddCustomModal(false)}
                  className="px-4 py-2 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-100"
                >
                  Zrušit
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#DBA834] text-[#2D3A45] font-extrabold rounded-xl shadow-xs"
                >
                  Uložit knihu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
