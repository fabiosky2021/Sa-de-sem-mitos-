import React from 'react';
import { PILLARS } from '../data/constants';
import { GeneratedArticle, PillarDay } from '../types/content';

interface HomeDashboardProps {
  onSelectArticle: (article: GeneratedArticle) => void;
  featuredArticle: GeneratedArticle;
  onNavigateToStudio: (suggestedPrompt?: string, pillar?: PillarDay) => void;
  onNavigateToMyths: () => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  onSelectArticle,
  featuredArticle,
  onNavigateToStudio,
  onNavigateToMyths,
}) => {
  return (
    <div className="flex flex-col gap-space-lg w-full pb-10">
      {/* Welcome Banner */}
      <div className="w-full bg-gradient-to-br from-primary-fixed/40 via-surface-container to-surface-container-high p-space-lg rounded-2xl border border-primary/20 shadow-sm flex flex-col gap-space-sm relative overflow-hidden">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
          <span className="font-label-sm text-label-sm uppercase font-bold text-primary tracking-wider">
            Cronograma Editorial Ativo
          </span>
        </div>
        <h1 className="font-headline-lg-mobile sm:text-headline-lg font-bold text-on-surface leading-tight">
          Saúde com evidência científica, sem terrorismo ou falsas promessas.
        </h1>
        <p className="font-body-sm text-body-sm text-on-surface-variant max-w-xl leading-relaxed">
          Informação revisada por especialistas, suporte a narração com legendas em tempo real e assistente com análise visual de pratos e fitoterápicos.
        </p>

        <div className="flex flex-wrap items-center gap-space-xs pt-1">
          <button
            onClick={() => onNavigateToStudio()}
            className="px-4 py-2 rounded-xl bg-primary text-on-primary font-label-md text-xs font-bold flex items-center gap-1.5 shadow active:scale-95 transition-transform cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">health_and_safety</span>
            <span>Abrir Estúdio com Voz & Foto</span>
          </button>
          <button
            onClick={onNavigateToMyths}
            className="px-3.5 py-2 rounded-xl bg-surface-container-lowest text-on-surface font-label-md text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-transform cursor-pointer border border-outline-variant/30"
          >
            <span className="material-symbols-outlined text-base text-primary">verified_user</span>
            <span>Desmistificador</span>
          </button>
        </div>
      </div>

      {/* Featured Article Card */}
      <div className="flex flex-col gap-space-xs">
        <div className="flex items-center justify-between">
          <span className="font-label-lg text-label-lg font-bold text-on-surface flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-xl">star</span>
            Artigo em Destaque da Semana
          </span>
          <span className="font-label-sm text-primary font-semibold">Leitura + Áudio</span>
        </div>

        <div
          onClick={() => onSelectArticle(featuredArticle)}
          className="w-full bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/30 hover:border-primary/40 transition-all cursor-pointer flex flex-col sm:flex-row gap-space-md group"
        >
          <img
            src={featuredArticle.video.thumbnail}
            alt={featuredArticle.titulo}
            className="w-full sm:w-44 h-36 rounded-lg object-cover group-hover:scale-102 transition-transform shrink-0"
          />
          <div className="flex flex-col justify-between min-w-0">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded-full bg-[#F0FDF4] text-[#166534] font-label-sm text-[10px] uppercase font-bold">
                  {featuredArticle.categoria}
                </span>
                <span className="font-label-sm text-on-surface-variant text-[11px]">
                  {featuredArticle.readingTime}
                </span>
              </div>
              <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-2">
                {featuredArticle.titulo}
              </h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mt-1">
                {featuredArticle.subtitulo}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-outline-variant/20 mt-2">
              <span className="font-label-sm text-xs text-on-surface-variant font-medium">
                {featuredArticle.reviewer.name}
              </span>
              <span className="font-label-sm text-xs text-primary font-bold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                Ler e ouvir <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Weekly Pillars Grid */}
      <div className="flex flex-col gap-space-xs">
        <span className="font-label-lg text-label-lg font-bold text-on-surface flex items-center gap-1.5">
          <span className="material-symbols-outlined text-primary text-xl">calendar_month</span>
          Pilares da Estratégia Editorial
        </span>
        <p className="font-body-sm text-on-surface-variant text-xs">
          Um foco de saúde preventiva para cada dia de publicação:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm mt-1">
          {Object.values(PILLARS).map((pillar) => (
            <div
              key={pillar.id}
              className="p-space-md rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex flex-col justify-between shadow-sm gap-space-sm"
            >
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-lg">{pillar.icon}</span>
                  </div>
                  <div>
                    <span className={`font-label-sm text-[11px] font-bold uppercase tracking-wider block ${pillar.badgeText}`}>
                      {pillar.dayName}
                    </span>
                    <h3 className="font-label-lg text-sm font-bold text-on-surface">
                      {pillar.theme}
                    </h3>
                  </div>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                  {pillar.description}
                </p>
              </div>

              <div className="flex flex-col gap-1 pt-2 border-t border-outline-variant/20">
                <span className="font-label-sm text-[10px] text-outline font-bold uppercase">
                  Pauta em destaque:
                </span>
                <button
                  onClick={() => onNavigateToStudio(pillar.suggestedPrompts[0], pillar.id)}
                  className="text-left font-body-sm text-xs text-on-surface hover:text-primary transition truncate flex items-center justify-between cursor-pointer group"
                >
                  <span className="truncate">{pillar.suggestedPrompts[0]}</span>
                  <span className="material-symbols-outlined text-sm text-primary group-hover:translate-x-1 transition-transform shrink-0">
                    chevron_right
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
