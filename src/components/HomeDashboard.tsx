import React, { useState } from 'react';
import { PILLARS, getCurrentDayPillar, WEEKLY_EDITORIAL_PLAN, INITIAL_ARTICLES_LIST } from '../data/constants';
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
  const todayPillar = getCurrentDayPillar();
  const [activePlanDay, setActivePlanDay] = useState<PillarDay>(todayPillar);
  const [copiedDay, setCopiedDay] = useState<string | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const selectedPlan = WEEKLY_EDITORIAL_PLAN[activePlanDay];
  const selectedDayArticle = INITIAL_ARTICLES_LIST.find((a) => a.pilarId === activePlanDay) || featuredArticle;
  const todayInfo = PILLARS[todayPillar];

  const handleCopyPlan = (plan: typeof selectedPlan) => {
    const text = `📅 ${plan.dayName} • ${plan.theme}
🎯 Pauta: ${plan.headline}
📝 Formato: ${plan.format} | 🔬 Evidência: ${plan.scientificEvidence}

🪝 Opções de Ganchos:
${plan.hookOptions.map((h, i) => `${i + 1}. ${h}`).join('\n')}

📱 Roteiro de Carrossel (5 Slides):
${plan.carouselSlides
  .map(
    (s) =>
      `[Slide ${s.slideNumber}: ${s.label}] - ${s.title}\n${s.body}\n(Nota Visual: ${s.visualNote})\n`
  )
  .join('\n')}

Saúde Sem Mitos • Criado no Estúdio Multimodal`;

    navigator.clipboard.writeText(text);
    setCopiedDay(plan.dayId);
    setTimeout(() => setCopiedDay(null), 2500);
  };

  return (
    <div className="flex flex-col gap-space-lg w-full pb-10">
      {/* Welcome & Editorial Studio Banner */}
      <div className="w-full bg-gradient-to-br from-primary-fixed/40 via-surface-container to-surface-container-high p-space-lg rounded-2xl border border-primary/20 shadow-sm flex flex-col gap-space-sm relative overflow-hidden">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
          <span className="font-label-sm text-label-sm uppercase font-bold text-primary tracking-wider">
            Cronograma Editorial Ativo • 7 Dias Sincronizados
          </span>
        </div>
        <h1 className="font-headline-lg-mobile sm:text-headline-lg font-bold text-on-surface leading-tight">
          Saúde com evidência científica, sem terrorismo ou falsas promessas.
        </h1>
        <p className="font-body-sm text-body-sm text-on-surface-variant max-w-xl leading-relaxed">
          Plano semanal de Segunda a Domingo com artigos de Nível A, narração em áudio, análise visual de pratos e roteiros prontos para redes sociais.
        </p>

        <div className="flex flex-wrap items-center gap-space-xs pt-1">
          <button
            onClick={() => onNavigateToStudio(todayInfo.suggestedPrompts[0], todayPillar)}
            className="px-4 py-2 rounded-xl bg-primary text-on-primary font-label-md text-xs font-bold flex items-center gap-1.5 shadow active:scale-95 transition-transform cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">health_and_safety</span>
            <span>Estúdio Multimodal (Hoje: {todayInfo.dayName.split('-')[0]})</span>
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

      {/* SECTION: Plano Editorial Interativo dos 7 Dias da Semana */}
      <div className="w-full bg-surface-container-lowest rounded-2xl p-space-md sm:p-space-lg border border-outline-variant/30 shadow-md flex flex-col gap-space-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-outline-variant/20 pb-space-sm">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-2xl">event_available</span>
              <h2 className="font-headline-sm text-base sm:text-lg font-bold text-on-surface">
                Plano Editorial Semanal (Segunda a Domingo)
              </h2>
            </div>
            <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
              Selecione qualquer dia para inspecionar pauta, evidências, ganchos e roteiro de 5 slides:
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="px-2.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-[11px] font-bold flex items-center gap-1 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
              <span>Hoje: {todayInfo.dayName}</span>
            </span>
          </div>
        </div>

        {/* 7-Day Selector Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {Object.values(PILLARS).map((pillar) => {
            const isActive = activePlanDay === pillar.id;
            const isToday = pillar.id === todayPillar;
            return (
              <button
                key={pillar.id}
                onClick={() => {
                  setActivePlanDay(pillar.id);
                  setActiveSlideIndex(0);
                }}
                className={`px-3 py-2 rounded-xl font-label-sm text-xs font-bold transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 border ${
                  isActive
                    ? 'bg-primary text-on-primary border-primary shadow-sm'
                    : 'bg-surface-container text-on-surface-variant hover:text-on-surface border-outline-variant/30 hover:bg-surface-container-high'
                }`}
              >
                <span className="material-symbols-outlined text-base">{pillar.icon}</span>
                <span>{pillar.dayName.split('-')[0]}</span>
                {isToday && (
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded-full font-extrabold uppercase ${
                      isActive ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary'
                    }`}
                  >
                    Hoje
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Day Detail Panel */}
        {selectedPlan && (
          <div className="p-space-md rounded-xl bg-surface-container border border-outline-variant/30 flex flex-col gap-space-md animate-fade-in">
            {/* Header info of active day */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 pb-3 border-b border-outline-variant/20">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full font-label-sm text-[11px] font-bold uppercase tracking-wider ${
                      PILLARS[selectedPlan.dayId].badgeBg
                    } ${PILLARS[selectedPlan.dayId].badgeText}`}
                  >
                    {selectedPlan.dayName} • {selectedPlan.theme}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface text-[10px] font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs text-primary">view_carousel</span>
                    {selectedPlan.format}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">verified</span>
                    {selectedPlan.scientificEvidence}
                  </span>
                </div>
                <h3 className="font-headline-sm text-base sm:text-lg font-bold text-on-surface leading-snug">
                  {selectedPlan.headline}
                </h3>
                <p className="font-body-sm text-xs text-on-surface-variant max-w-2xl">
                  {selectedPlan.objective}
                </p>
              </div>

              {/* Action Buttons for this day */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  onClick={() => onSelectArticle(selectedDayArticle)}
                  className="px-3.5 py-1.5 rounded-xl bg-primary text-on-primary text-xs font-bold flex items-center gap-1 hover:opacity-95 active:scale-95 transition cursor-pointer shadow-sm"
                  title="Ler e ouvir artigo completo deste dia"
                >
                  <span className="material-symbols-outlined text-sm">menu_book</span>
                  <span>Ler & Ouvir Artigo</span>
                </button>
                <button
                  onClick={() => onNavigateToStudio(selectedPlan.suggestedPrompt, selectedPlan.dayId)}
                  className="px-3.5 py-1.5 rounded-xl bg-surface-container-lowest text-on-surface text-xs font-bold flex items-center gap-1 hover:bg-surface-container-high active:scale-95 transition cursor-pointer border border-outline-variant/30"
                  title="Criar variação ou nova pauta no Estúdio"
                >
                  <span className="material-symbols-outlined text-sm text-primary">auto_awesome</span>
                  <span>Estúdio IA</span>
                </button>
                <button
                  onClick={() => handleCopyPlan(selectedPlan)}
                  className="px-3 py-1.5 rounded-xl bg-surface-container-lowest text-on-surface-variant hover:text-on-surface text-xs font-semibold flex items-center gap-1 border border-outline-variant/30 cursor-pointer"
                  title="Copiar roteiro completo e slides"
                >
                  <span className="material-symbols-outlined text-sm">
                    {copiedDay === selectedPlan.dayId ? 'check' : 'content_copy'}
                  </span>
                  <span>{copiedDay === selectedPlan.dayId ? 'Copiado!' : 'Copiar Roteiro'}</span>
                </button>
              </div>
            </div>

            {/* Key Findings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {selectedPlan.keyFindings.map((finding, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-surface-container-lowest border border-outline-variant/20 flex items-start gap-2 text-xs"
                >
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-on-surface font-medium leading-relaxed">{finding}</span>
                </div>
              ))}
            </div>

            {/* Hook Options */}
            <div className="p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/20 flex flex-col gap-1.5">
              <span className="font-label-sm text-[11px] font-bold text-primary uppercase flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">campaign</span>
                3 Ganchos Validados para Vídeo e Redes Sociais:
              </span>
              <div className="flex flex-col gap-1.5">
                {selectedPlan.hookOptions.map((hook, i) => (
                  <div
                    key={i}
                    onClick={() => onNavigateToStudio(hook, selectedPlan.dayId)}
                    className="p-2 rounded-lg bg-surface hover:bg-primary/5 border border-outline-variant/20 hover:border-primary/30 transition flex items-center justify-between text-xs cursor-pointer group"
                  >
                    <span className="text-on-surface group-hover:text-primary font-medium">
                      {hook}
                    </span>
                    <span className="material-symbols-outlined text-sm text-outline-variant group-hover:text-primary group-hover:translate-x-1 transition-transform shrink-0 ml-2">
                      arrow_forward
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel 5 Slides Interactive Visualizer */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-[11px] font-bold text-on-surface uppercase flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-primary">view_carousel</span>
                  Estrutura do Carrossel (5 Slides):
                </span>
                <span className="text-[11px] text-on-surface-variant font-medium">
                  Slide {activeSlideIndex + 1} de {selectedPlan.carouselSlides.length}
                </span>
              </div>

              {/* Slide Buttons */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
                {selectedPlan.carouselSlides.map((slide, sIdx) => (
                  <button
                    key={sIdx}
                    onClick={() => setActiveSlideIndex(sIdx)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                      activeSlideIndex === sIdx
                        ? 'bg-primary text-on-primary shadow-xs'
                        : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high border border-outline-variant/20'
                    }`}
                  >
                    <span>{slide.slideNumber}.</span>
                    <span>{slide.label}</span>
                  </button>
                ))}
              </div>

              {/* Active Slide Card */}
              {selectedPlan.carouselSlides[activeSlideIndex] && (
                <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex flex-col gap-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-bold text-[10px] uppercase">
                      Slide {selectedPlan.carouselSlides[activeSlideIndex].slideNumber}: {selectedPlan.carouselSlides[activeSlideIndex].label}
                    </span>
                    <span className="text-[10px] text-on-surface-variant italic">
                      Nota Visual: {selectedPlan.carouselSlides[activeSlideIndex].visualNote}
                    </span>
                  </div>
                  <h4 className="font-headline-sm text-sm sm:text-base font-bold text-on-surface">
                    {selectedPlan.carouselSlides[activeSlideIndex].title}
                  </h4>
                  <p className="font-body-sm text-xs text-on-surface-variant whitespace-pre-line leading-relaxed">
                    {selectedPlan.carouselSlides[activeSlideIndex].body}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Featured Article Card */}
      <div className="flex flex-col gap-space-xs">
        <div className="flex items-center justify-between">
          <span className="font-label-lg text-label-lg font-bold text-on-surface flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-xl">star</span>
            Artigo em Destaque do Saúde Sem Mitos
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

      {/* 7-Day Grid Cards Overview */}
      <div className="flex flex-col gap-space-xs">
        <div className="flex items-center justify-between">
          <span className="font-label-lg text-label-lg font-bold text-on-surface flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-xl">grid_view</span>
            <span>Grade Completa de Segunda a Domingo</span>
          </span>
          <span className="text-xs text-on-surface-variant">7 Artigos Prontos</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-space-sm mt-1">
          {Object.values(PILLARS).map((pillar) => {
            const isToday = pillar.id === todayPillar;
            const article = INITIAL_ARTICLES_LIST.find((a) => a.pilarId === pillar.id);
            return (
              <div
                key={pillar.id}
                className={`p-space-md rounded-xl bg-surface-container-lowest border transition-all flex flex-col justify-between shadow-sm gap-space-sm relative overflow-hidden ${
                  isToday
                    ? 'border-primary/50 ring-2 ring-primary/20 bg-gradient-to-b from-primary-fixed/10 to-surface-container-lowest'
                    : 'border-outline-variant/30 hover:border-outline-variant/60'
                }`}
              >
                {isToday && (
                  <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary text-on-primary text-[9px] font-extrabold uppercase tracking-wider shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    <span>Hoje</span>
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2 mb-1.5 pr-14">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        isToday ? 'bg-primary text-on-primary shadow-xs' : 'bg-surface-container text-primary'
                      }`}
                    >
                      <span className="material-symbols-outlined text-lg">{pillar.icon}</span>
                    </div>
                    <div className="min-w-0">
                      <span className={`font-label-sm text-[11px] font-bold uppercase tracking-wider block ${pillar.badgeText}`}>
                        {pillar.dayName}
                      </span>
                      <h3 className="font-label-lg text-sm font-bold text-on-surface truncate">
                        {pillar.theme}
                      </h3>
                    </div>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mt-1">
                    {article?.titulo || pillar.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-outline-variant/20 gap-2">
                  {article && (
                    <button
                      onClick={() => onSelectArticle(article)}
                      className="text-xs font-bold text-primary hover:underline flex items-center gap-0.5 cursor-pointer"
                    >
                      <span>Ver Artigo</span>
                      <span className="material-symbols-outlined text-xs">open_in_new</span>
                    </button>
                  )}
                  <button
                    onClick={() => onNavigateToStudio(pillar.suggestedPrompts[0], pillar.id)}
                    className="text-xs text-on-surface-variant hover:text-primary font-medium flex items-center gap-0.5 cursor-pointer ml-auto"
                  >
                    <span>Editar no Estúdio</span>
                    <span className="material-symbols-outlined text-xs">edit</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

