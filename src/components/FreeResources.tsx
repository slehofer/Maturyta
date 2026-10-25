import React, { useState } from 'react';
import { FREE_RESOURCES, ResourceItem } from '../data/freeResourcesData';
import { Headphones, BookOpen, ExternalLink, Play, Pause, Volume2, Globe, Library } from 'lucide-react';

export const FreeResources: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'ebook' | 'audiobook'>('all');
  const [currentlyPlaying, setCurrentlyPlaying] = useState<ResourceItem | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const filteredResources = FREE_RESOURCES.filter((res) => {
    if (activeTab === 'all') return true;
    return res.type === activeTab;
  });

  const handleTogglePlay = (resource: ResourceItem) => {
    if (currentlyPlaying?.id === resource.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentlyPlaying(resource);
      setIsPlaying(true);
    }
  };

  return (
    <div className="space-y-6">

      <div className="bg-white p-6 rounded-2xl shadow-xs border border-[#7CAEA3]/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-[#2D3A45] flex items-center gap-2">
            <span>🎧</span> Bezplatné zdroje četby & Audioknihy
          </h2>
          <p className="text-[#2D3A45]/80 text-sm mt-1">
            Stahujte e-knihy legálně zdarma v formátech EPUB a PDF z Městské knihovny v Praze, Krameria či OceansofPDF nebo posloucháte zvukové nahrávky ČRo.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-300 flex items-center gap-1">
            <Library className="w-3.5 h-3.5" /> MKP Praha
          </span>
          <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-lg border border-amber-300 flex items-center gap-1">
            <Headphones className="w-3.5 h-3.5" /> ČRo Čtenářský deník
          </span>
          <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-bold rounded-lg border border-purple-300 flex items-center gap-1">
            <Globe className="w-3.5 h-3.5" /> OceansOfPDF
          </span>
        </div>
      </div>

      {currentlyPlaying && (
        <div className="bg-[#2D3A45] text-white p-4 rounded-2xl border-2 border-[#DBA834] shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 sticky top-20 z-30">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#DBA834] text-[#2D3A45] flex items-center justify-center shrink-0 font-bold">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-[#7CAEA3] font-semibold uppercase">Přehrává se audiokniha (ČRo)</div>
              <div className="font-bold text-sm text-white">{currentlyPlaying.title} – {currentlyPlaying.author}</div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-3 bg-[#DBA834] text-[#2D3A45] hover:bg-[#c9982a] rounded-full shadow-md transition-transform active:scale-95"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
            </button>
            <div className="flex items-center gap-2 text-xs text-gray-300">
              <Volume2 className="w-4 h-4 text-[#7CAEA3]" />
              <span>Stream aktivní</span>
            </div>
            <a
              href={currentlyPlaying.downloadOrStreamUrl}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-xs font-bold rounded-lg text-white transition-colors flex items-center gap-1"
            >
              <span>Otevřít na ČRo</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <audio
            autoPlay={isPlaying}
            src={currentlyPlaying.audioStreamUrl || ''}
            onEnded={() => setIsPlaying(false)}
            className="hidden"
          />
        </div>
      )}

      <div className="flex space-x-2 border-b border-gray-200 pb-2">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
            activeTab === 'all'
              ? 'bg-[#2D3A45] text-white shadow-xs'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Všechny zdroje ({FREE_RESOURCES.length})
        </button>
        <button
          onClick={() => setActiveTab('ebook')}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'ebook'
              ? 'bg-[#2D3A45] text-white shadow-xs'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <BookOpen className="w-4 h-4 text-[#7CAEA3]" />
          <span>E-knihy (PDF/EPUB)</span>
        </button>
        <button
          onClick={() => setActiveTab('audiobook')}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'audiobook'
              ? 'bg-[#2D3A45] text-white shadow-xs'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Headphones className="w-4 h-4 text-[#DBA834]" />
          <span>Audioknihy & Poslech</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((res) => (
          <div
            key={res.id}
            className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold border ${res.sourceBadgeClass}`}>
                  {res.sourceName}
                </span>
                <span className="text-[11px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                  {res.format}
                </span>
              </div>

              <h3 className="text-lg font-extrabold text-[#2D3A45]">
                {res.title}
              </h3>
              <p className="text-sm font-semibold text-[#7CAEA3] mt-0.5">
                {res.author}
              </p>

              <p className="text-xs text-gray-600 mt-2.5 leading-relaxed">
                {res.description}
              </p>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center gap-2">
              {res.type === 'audiobook' && (
                <button
                  onClick={() => handleTogglePlay(res)}
                  className="flex-1 py-2.5 px-3 bg-[#DBA834] hover:bg-[#c9982a] text-[#2D3A45] font-extrabold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  {currentlyPlaying?.id === res.id && isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 fill-current" />
                      <span>Pozastavit</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" />
                      <span>Přehrát nahrávku</span>
                    </>
                  )}
                </button>
              )}

              <a
                href={res.downloadOrStreamUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 px-3 bg-[#2D3A45] hover:bg-[#1C262E] text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 text-center"
              >
                <span>Stáhnout / Otevřít</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
