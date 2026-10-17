import React, { useState } from 'react';
import { GeneratedArticle, PillarDay } from '../types/content';
import { PILLARS } from '../data/constants';

interface ArticlesListProps {
  articles: GeneratedArticle[];
  onSelectArticle: (article: GeneratedArticle) => void;
  onNewArticleClick: () => void;
}

export const ArticlesList: React.FC<ArticlesListProps> = ({
  articles,
  onSelectArticle,
  onNewArticleClick,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | PillarDay>('all');

  const filteredArticles = articles.filter((art) => {
    const matchesFilter =
      selectedFilter === 'all' ||
      (selectedFilter === 'segunda' && art.pilar_dia.toLowerCase().includes('segunda')) ||
      (selectedFilter === 'quarta' && art.pilar_dia.toLowerCase().includes('quarta')) ||
      (selectedFilter === 'sexta' && art.pilar_dia.toLowerCase().includes('sexta')) ||
      (selectedFilter === 'sabado' &&
        (art.pilar_dia.toLowerCase().includes('sábado') || art.pilar_dia.toLowerCase().includes('sabado')));

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      art.titulo.toLowerCase().includes(q) ||
      art.resumo.toLowerCase().includes(q) ||
      art.categoria.toLowerCase().includes(q);

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-space-lg w-full pb-10">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-headline-lg-mobile sm:text-headline-lg font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-2xl">menu_book</span>
            <span>Artigos & Publicações Clínicas</span>
          </h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Textos revisados por especialistas com suporte a narração humanizada e legendas.
          </p>
        </div>

        <button
          onClick={onNewArticleClick}
          className="px-3.5 py-1.5 rounded-xl bg-primary text-on-primary font-label-md text-xs font-bold flex items-center gap-1.5 shadow active:scale-95 transition-transform cursor-pointer self-start sm:self-auto"
        >
          <span className="material-symbols-outlined text-base">add</span>
          <span>Nova Criação IA</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-space-sm shadow-sm flex flex-col md:flex-row items-center justify-between gap-2.5">
        <div className="relative w-full md:w-80">
          <span className="material-symbols-outlined text-outline absolute left-3 top-1/2 -translate-y-1/2 text-lg">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por tema, fitoquímico ou mito..."
            className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg pl-9 pr-3 py-1.5 font-body-sm text-xs text-on-surface placeholder-on-surface-variant/60 focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Pillar Filter Chips */}
        <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-2.5 py-1 rounded-full font-label-sm text-xs font-bold transition cursor-pointer whitespace-nowrap ${
              selectedFilter === 'all'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            Todos ({articles.length})
          </button>

          {Object.values(PILLARS).map((p) => {
            const isSelected = selectedFilter === p.id;
            const count = articles.filter((a) =>
              a.pilar_dia.toLowerCase().includes(p.id) ||
              (p.id === 'sabado' && a.pilar_dia.toLowerCase().includes('sábado'))
            ).length;

            return (
              <button
                key={p.id}
                onClick={() => setSelectedFilter(p.id)}
                className={`px-2.5 py-1 rounded-full font-label-sm text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? `${p.badgeBg} ${p.badgeText} ring-1 ring-primary/30 shadow-sm`
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                {p.dayName.split('-')[0]} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 gap-space-sm">
        {filteredArticles.map((art) => (
          <div
            key={art.id}
            onClick={() => onSelectArticle(art)}
            className="p-space-md rounded-xl bg-surface-container-lowest border border-outline-variant/30 hover:border-primary/40 shadow-sm hover:shadow transition-all cursor-pointer flex flex-col sm:flex-row gap-space-md group"
          >
            <img
              src={art.video?.thumbnail || art.imagePreview || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'}
              alt={art.titulo}
              className="w-full sm:w-36 h-28 rounded-lg object-cover group-hover:scale-102 transition-transform shrink-0 border border-outline-variant/20"
            />
            <div className="flex flex-col justify-between min-w-0 flex-1">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded-full bg-surface-container text-primary font-label-sm text-[10px] uppercase font-bold">
                    {art.categoria}
                  </span>
                  <span className="font-label-sm text-on-surface-variant text-[11px]">
                    {art.readingTime || '4 min de leitura'}
                  </span>
                </div>
                <h3 className="font-headline-sm text-sm sm:text-base font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-2">
                  {art.titulo}
                </h3>
                <p className="font-body-sm text-xs text-on-surface-variant line-clamp-2 mt-1">
                  {art.subtitulo || art.resumo}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-outline-variant/20 mt-2">
                <span className="font-label-sm text-[11px] text-on-surface-variant">
                  {art.reviewer?.name || 'Revisão Clínica'}
                </span>
                <span className="font-label-sm text-xs text-primary font-bold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                  Ver artigo completo <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
