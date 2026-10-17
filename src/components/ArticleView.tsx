import React, { useState } from 'react';
import { GeneratedArticle } from '../types/content';
import { VideoPlayer } from './VideoPlayer';
import { AudioControls } from './AudioControls';
import { SponsorBanner } from './SponsorBanner';

interface ArticleViewProps {
  article: GeneratedArticle;
  onOpenStudio?: () => void;
  className?: string;
  onOpenVoiceSettings?: () => void;
  voiceName?: string;
  selectedVoiceId?: string;
  onSelectQuickVoice?: (voiceId: string) => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({
  article,
  onOpenStudio,
  className = '',
  onOpenVoiceSettings,
  voiceName,
  selectedVoiceId,
  onSelectQuickVoice,
}) => {
  const [feedbackVote, setFeedbackVote] = useState<'up' | 'down' | null>(null);

  const getPillarBadgeClasses = (pilarId: string) => {
    switch (pilarId) {
      case 'quarta':
        return 'bg-[#F0FDF4] text-[#166534] dark:bg-emerald-950/70 dark:text-emerald-300 dark:border dark:border-emerald-800/40';
      case 'segunda':
        return 'bg-[#ECFDF5] text-[#065F46] dark:bg-teal-950/70 dark:text-teal-300 dark:border dark:border-teal-800/40';
      case 'sexta':
        return 'bg-[#EFF6FF] text-[#1E40AF] dark:bg-blue-950/70 dark:text-blue-300 dark:border dark:border-blue-800/40';
      case 'sabado':
      default:
        return 'bg-[#FFFBEB] text-[#B45309] dark:bg-amber-950/70 dark:text-amber-300 dark:border dark:border-amber-800/40';
    }
  };

  const getPillarIcon = (pilarId: string) => {
    switch (pilarId) {
      case 'quarta':
        return 'psychiatry';
      case 'segunda':
        return 'restaurant';
      case 'sexta':
        return 'bedtime';
      case 'sabado':
      default:
        return 'verified_user';
    }
  };

  return (
    <div key={article.id} className={`flex flex-col w-full pb-10 animate-article-fade-in ${className}`}>
      <div className="flex flex-col gap-space-lg">
        {/* Meta Header & Badges */}
        <div className="flex flex-col gap-space-xs">
          <div className="flex flex-wrap items-center gap-space-xs">
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-label-sm text-label-sm uppercase font-bold tracking-wider ${getPillarBadgeClasses(
                article.pilarId
              )}`}
            >
              <span className="material-symbols-outlined text-sm">
                {getPillarIcon(article.pilarId)}
              </span>
              {article.categoria}
            </span>

            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm uppercase font-bold">
              <span className="material-symbols-outlined text-sm text-primary">verified</span>
              {article.evidenceBadge || 'Evidência Nível A'}
            </span>
          </div>

          <div className="flex items-center gap-2 text-on-surface-variant font-label-md text-label-md mt-1">
            <span className="material-symbols-outlined text-base">schedule</span>
            <span>{article.readingTime || '4 min de leitura'}</span>
            <span className="text-outline-variant">•</span>
            <span className="material-symbols-outlined text-base text-primary">headphones</span>
            <span className="text-primary font-semibold">{article.audioTime || '3 min de áudio'}</span>
          </div>
        </div>

        {/* Main Title & Lead Text */}
        <div className="flex flex-col gap-space-xs">
          <h1 className="font-headline-xl-mobile sm:text-headline-xl text-headline-xl-mobile text-on-surface font-extrabold tracking-tight leading-tight">
            {article.titulo}
          </h1>

          {article.subtitulo && (
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              {article.subtitulo}
            </p>
          )}

          {/* Reviewer Footnote */}
          {article.reviewer && (
            <div className="flex items-center gap-space-sm pt-space-xs">
              <img
                alt={article.reviewer.name}
                className="w-9 h-9 rounded-full object-cover border border-outline-variant/30"
                src={article.reviewer.avatar}
              />
              <div className="flex flex-col">
                <span className="font-label-md text-label-md text-on-surface font-semibold">
                  Revisão por {article.reviewer.name}
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  {article.reviewer.role}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Multimodal Image Analysis Banner (if image was processed by Studio) */}
        {(article.analise_visual || article.imagePreview) && (
          <div className="w-full bg-surface-container-lowest border border-primary/20 rounded-xl p-space-md shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-space-md">
            {article.imagePreview && (
              <img
                src={article.imagePreview}
                alt="Imagem analisada"
                className="w-24 h-24 rounded-lg object-cover border border-outline-variant/30 shrink-0"
              />
            )}
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 text-primary font-label-sm uppercase font-bold tracking-wider mb-1">
                <span className="material-symbols-outlined text-base">document_scanner</span>
                <span>Laudo de Análise Visual por IA Multimodal</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface leading-relaxed">
                {article.analise_visual || 'Amostra visual identificada e confrontada com o índice fitoquímico e nutricional.'}
              </p>
            </div>
          </div>
        )}

        {/* VideoPlayer Card */}
        {article.video && (
          <VideoPlayer
            title={article.video.title}
            description={article.video.description}
            duration={article.video.duration}
            thumbnail={article.video.thumbnail}
            subtitles={article.video.subtitles}
          />
        )}

        {/* AudioControls Dock with Closed Captions Transcription Accordion */}
        <AudioControls
          textToRead={article.audio_script || article.audio?.script || article.conteudo_paragrafos.join(' ')}
          duration={article.audio?.duration || article.audioTime}
          sentences={article.audio?.sentences}
          title={article.titulo}
          voiceName={voiceName}
          selectedVoiceId={selectedVoiceId}
          onSelectQuickVoice={onSelectQuickVoice}
          onOpenVoiceSettings={onOpenVoiceSettings}
        />

        {/* Scientific Verdict Callout Badge */}
        {article.verdict && (
          <div className="w-full bg-[#FFFBEB] dark:bg-amber-950/30 rounded-xl p-space-md shadow-sm flex items-start gap-space-sm border border-[#FDE68A] dark:border-amber-800/40">
            <div className="w-10 h-10 rounded-full bg-[#FDE68A] dark:bg-amber-900/60 flex items-center justify-center text-[#B45309] dark:text-amber-300 shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-xl font-bold">balance</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span className="font-label-md text-label-md uppercase tracking-wider text-[#B45309] dark:text-amber-300 font-bold">
                  Veredito Científico
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#FEF3C7] dark:bg-amber-900/60 text-[#92400E] dark:text-amber-200 font-label-sm text-label-sm font-bold">
                  {article.verdict.evidenceLevel}
                </span>
              </div>
              <span className="font-headline-sm text-headline-sm text-[#92400E] dark:text-amber-200 font-bold">
                {article.verdict.status}
              </span>
              <p className="font-body-sm text-body-sm text-[#78350F] dark:text-amber-100/90 mt-1 leading-relaxed">
                {article.verdict.summary}
              </p>
            </div>
          </div>
        )}

        {/* Structured Content Body */}
        <div className="flex flex-col gap-space-lg text-on-surface">
          {/* Section 1: Mecanismo de Ação */}
          <section className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-5 bg-primary rounded-full" />
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                1. Mecanismo de Ação Farmacológica
              </h2>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              {article.conteudo_paragrafos[0] ||
                'O efeito calmante não é mero placebo. Ele decorre de substâncias bioativas que ultrapassam a barreira hematoencefálica e regulam neurotransmissores centrais.'}
            </p>

            {/* Mechanism Graphic Pill Card (Biological Cascade) */}
            {article.biologicalCascade && article.biologicalCascade.length > 0 && (
              <div className="bg-surface-container rounded-xl p-space-md flex flex-col gap-space-sm my-space-xs shadow-sm border border-outline-variant/30">
                <span className="font-label-sm text-label-sm text-primary font-bold uppercase tracking-wider">
                  Cadeia Biológica do Relaxamento
                </span>
                <div className="grid grid-cols-3 gap-2 text-center">
                  {article.biologicalCascade.map((step, idx) => (
                    <div
                      key={idx}
                      className="bg-surface-container-lowest p-2.5 rounded-lg flex flex-col items-center gap-1 shadow-sm border border-outline-variant/20"
                    >
                      <span className="material-symbols-outlined text-primary text-xl">
                        {step.icon}
                      </span>
                      <span className="font-label-sm text-label-sm font-bold text-on-surface">
                        {step.title}
                      </span>
                      <span className="font-label-sm text-[9px] text-on-surface-variant">
                        {step.subtitle}
                      </span>
                    </div>
                  ))}
                </div>
                {article.conteudo_paragrafos[1] && (
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                    {article.conteudo_paragrafos[1]}
                  </p>
                )}
              </div>
            )}
          </section>

          {/* Section 2: Dose Segura e Modo de Preparo Correto */}
          {article.preparationSteps && article.preparationSteps.length > 0 && (
            <section className="flex flex-col gap-space-xs">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-5 bg-primary rounded-full" />
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  2. Dose Segura e Modo de Preparo Correto
                </h2>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Erros comuns no preparo destroem compostos voláteis antes que eles possam ser ingeridos. Siga o protocolo padronizado da farmacopeia fitoterápica:
              </p>

              <div className="flex flex-col gap-space-sm pt-space-xs">
                {article.preparationSteps.map((step) => (
                  <div
                    key={step.number}
                    className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-lowest shadow-sm border border-outline-variant/20"
                  >
                    <div className="w-7 h-7 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-label-md shrink-0">
                      {step.number}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-lg text-label-lg text-on-surface font-bold">
                        {step.title}
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        {step.description}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section 3: Precauções Clínicas e Contraindicações */}
          {article.contraindications && article.contraindications.length > 0 && (
            <section className="flex flex-col gap-space-xs">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-5 bg-tertiary-container rounded-full" />
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  3. Precauções Clínicas e Contraindicações
                </h2>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant">
                "Natural" não é sinônimo de isento de riscos. A fitoterapia exige atenção a perfis específicos e interações medicamentosas:
              </p>

              <div className="grid grid-cols-1 gap-space-sm mt-space-xs">
                {article.contraindications.map((ci, idx) => (
                  <div
                    key={idx}
                    className={`p-space-sm rounded-lg flex items-start gap-space-sm border ${
                      ci.severity === 'error'
                        ? 'bg-error-container/40 border-error/20'
                        : 'bg-surface-container-high/60 border-outline-variant/30'
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined mt-0.5 ${
                        ci.severity === 'error' ? 'text-error' : 'text-secondary'
                      }`}
                    >
                      {ci.icon}
                    </span>
                    <div className="flex flex-col">
                      <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                        {ci.title}
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        {ci.description}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Mito vs Fato Quick Callout */}
          {article.mito_desmistificado && (
            <div className="p-space-md rounded-xl bg-surface-container border border-outline-variant/30 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-tertiary font-bold font-label-md uppercase">
                <span className="material-symbols-outlined text-lg">close</span>
                <span>O Mito Popular</span>
              </div>
              <p className="font-body-sm text-on-surface italic">
                {article.mito_desmistificado}
              </p>
              <div className="h-[1px] bg-outline-variant/30 my-1" />
              <div className="flex items-center gap-2 text-primary font-bold font-label-md uppercase">
                <span className="material-symbols-outlined text-lg">check_circle</span>
                <span>O Fato Científico</span>
              </div>
              <p className="font-body-sm text-on-surface">
                {article.fato_cientifico}
              </p>
            </div>
          )}
        </div>

        {/* SponsorBanner (Patrocínio Ético & Transparente) */}
        <SponsorBanner />

        {/* Clinical Sources & Citations */}
        {article.referencias_cientificas && article.referencias_cientificas.length > 0 && (
          <div className="w-full bg-surface-container-low rounded-xl p-space-md flex flex-col gap-space-sm shadow-sm border border-outline-variant/30">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl">menu_book</span>
              <h3 className="font-label-lg text-label-lg text-on-surface font-bold">
                Fontes e Referências Clínicas
              </h3>
            </div>
            <div className="flex flex-col gap-2">
              {article.referencias_cientificas.map((ref, idx) => (
                <a
                  key={idx}
                  href={ref.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-lg bg-surface-container-lowest flex items-center justify-between shadow-sm active:scale-[0.99] transition-transform hover:bg-surface-container border border-outline-variant/20"
                >
                  <div className="flex flex-col min-w-0 pr-2">
                    <span className="font-label-md text-label-md text-secondary truncate font-semibold">
                      {ref.title}
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant truncate">
                      {ref.authors}
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-secondary text-sm shrink-0">
                    open_in_new
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Mandatory Medical Disclaimer */}
        <div className="w-full bg-surface-container-high/40 rounded-xl p-space-md shadow-sm flex items-start gap-space-sm border border-outline-variant/30">
          <span className="material-symbols-outlined text-outline mt-0.5 text-xl">
            medical_information
          </span>
          <div className="flex flex-col gap-0.5">
            <span className="font-label-md text-label-md text-on-surface font-bold uppercase tracking-wider">
              Aviso de Responsabilidade Médica
            </span>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              {article.aviso_legal}
            </p>
          </div>
        </div>

        {/* Interactive Community Feedback Pill */}
        <div className="flex items-center justify-between p-space-md rounded-xl bg-surface-container-lowest shadow-sm border border-outline-variant/30 mb-space-sm">
          <div className="flex flex-col">
            <span className="font-label-md text-label-md text-on-surface font-semibold">
              Este artigo esclareceu suas dúvidas?
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              Ajude a refinar o algoritmo científico
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFeedbackVote(feedbackVote === 'up' ? null : 'up')}
              className={`w-10 h-10 rounded-full flex items-center justify-center active:scale-90 transition-transform cursor-pointer ${
                feedbackVote === 'up'
                  ? 'bg-primary text-on-primary shadow'
                  : 'bg-surface-container text-primary hover:bg-surface-container-high'
              }`}
            >
              <span className="material-symbols-outlined text-xl">thumb_up</span>
            </button>
            <button
              onClick={() => setFeedbackVote(feedbackVote === 'down' ? null : 'down')}
              className={`w-10 h-10 rounded-full flex items-center justify-center active:scale-90 transition-transform cursor-pointer ${
                feedbackVote === 'down'
                  ? 'bg-error text-on-error shadow'
                  : 'bg-surface-container text-outline hover:bg-surface-container-high'
              }`}
            >
              <span className="material-symbols-outlined text-xl">thumb_down</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
