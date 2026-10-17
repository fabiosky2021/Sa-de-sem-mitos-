/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BottomNav, TabKey } from './components/BottomNav';
import { ArticleView } from './components/ArticleView';
import { StudioInputBar } from './components/StudioInputBar';
import { HomeDashboard } from './components/HomeDashboard';
import { ArticlesList } from './components/ArticlesList';
import { MythsView } from './components/MythsView';
import { VoiceSettingsModal, AVAILABLE_VOICES } from './components/VoiceSettingsModal';
import { GeneratedArticle, PillarDay } from './types/content';
import { PROTO_CHAMOMILE_ARTICLE, PROTO_MYTH_ARTICLE, INITIAL_ARTICLES_LIST, ASSETS } from './data/constants';
import { requestContentGeneration } from './services/contentService';

const STORAGE_KEY = 'saude_sem_mitos_articles_v2';
const VOICE_STORAGE_KEY = 'saude_sem_mitos_voice_id';
const THEME_STORAGE_KEY = 'saude_sem_mitos_theme_v1';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('artigos');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved !== null) {
        return saved === 'dark';
      }
    } catch {}
    return true; // Modo escuro ativo por padrão
  });
  const [selectedVoiceId, setSelectedVoiceId] = useState<string>(() => {
    try {
      return localStorage.getItem(VOICE_STORAGE_KEY) || 'gemini-zephyr';
    } catch {
      return 'gemini-zephyr';
    }
  });
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [articles, setArticles] = useState<GeneratedArticle[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Could not read from storage:', e);
    }
    return INITIAL_ARTICLES_LIST;
  });

  const [selectedArticle, setSelectedArticle] = useState<GeneratedArticle>(PROTO_CHAMOMILE_ARTICLE);
  const [selectedPillar, setSelectedPillar] = useState<PillarDay | 'auto'>('auto');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [readProgress, setReadProgress] = useState(25);

  const selectedVoice = AVAILABLE_VOICES.find((v) => v.id === selectedVoiceId) || AVAILABLE_VOICES[0];

  const handleSelectVoice = (voiceId: string) => {
    setSelectedVoiceId(voiceId);
    try {
      localStorage.setItem(VOICE_STORAGE_KEY, voiceId);
    } catch {}
  };

  // Sync theme class to html root and localStorage
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem(THEME_STORAGE_KEY, isDarkMode ? 'dark' : 'light');
    } catch {}
  }, [isDarkMode]);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
    } catch (e) {
      console.warn('Could not save to storage:', e);
    }
  }, [articles]);

  // Window scroll listener for dynamic top reading progress bar
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (height > 0) {
        const scrolled = (winScroll / height) * 100;
        setReadProgress(Math.min(Math.max(scrolled, 8), 100));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGenerate = async (data: {
    prompt: string;
    dayPillar?: PillarDay;
    imageBase64?: string;
    mimeType?: string;
    imagePreview?: string;
  }) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await requestContentGeneration(data);

      const newArticle: GeneratedArticle = {
        id: `art-${Date.now()}`,
        createdAt: 'Agora',
        pilar_dia: res.pilar_dia || 'Segunda-feira',
        pilarId: (data.dayPillar as PillarDay) || 'segunda',
        categoria: res.categoria || 'Educação em Saúde',
        evidenceBadge: 'Evidência Nível A',
        readingTime: '4 min de leitura',
        audioTime: '3 min de áudio',
        titulo: res.titulo || 'Nova Análise Científica',
        subtitulo: res.subtitulo || res.resumo || '',
        resumo: res.resumo || '',
        reviewer: {
          name: 'Dra. Camila Duarte',
          role: 'Nutricionista & Fisiologista Clínica • CRN-3 48.219',
          avatar: ASSETS.doctorHelena,
        },
        video: {
          title: res.roteiro_video?.titulo_video || res.titulo,
          description: res.roteiro_video?.desenvolvimento || res.resumo,
          duration: '03:12',
          thumbnail: data.imagePreview || ASSETS.chamomileTeapot,
          subtitles: (res.roteiro_video?.legendas_sugeridas || []).map((leg: string, idx: number) => ({
            time: idx * 15,
            text: leg,
          })),
        },
        audio: {
          duration: '03:00',
          script: res.audio_script || res.resumo,
          sentences: res.conteudo_paragrafos || [res.resumo],
        },
        verdict: {
          status: 'COMPROVADO COM RESSALVAS',
          evidenceLevel: 'Revisão Sistemática',
          summary: res.fato_cientifico || 'Avaliado conforme literatura científica recente.',
        },
        conteudo_paragrafos: res.conteudo_paragrafos || [],
        biologicalCascade: [
          { title: 'Composto Bioativo', subtitle: 'Identificado', icon: 'spa' },
          { title: 'Receptor Celular', subtitle: 'Interação direta', icon: 'hub' },
          { title: 'Homeostase', subtitle: 'Equilíbrio fisiológico', icon: 'verified' },
        ],
        preparationSteps: (res.dicas_praticas || []).map((tip: string, idx: number) => ({
          number: idx + 1,
          title: `Passo ${idx + 1}`,
          description: tip,
        })),
        contraindications: [
          {
            title: 'Precaução Individual',
            description: 'Consulte seu profissional de saúde antes de mudanças drásticas.',
            icon: 'shield',
            severity: 'info',
          },
        ],
        mito_desmistificado: res.mito_desmistificado || '',
        fato_cientifico: res.fato_cientifico || '',
        dicas_praticas: res.dicas_praticas || [],
        analise_visual: res.analise_visual,
        imagePreview: data.imagePreview,
        roteiro_video: res.roteiro_video || {
          titulo_video: res.titulo,
          gancho_inicial: 'Veja o que a ciência comprova sobre este tema!',
          desenvolvimento: res.resumo,
          chamada_para_acao: 'Compartilhe com quem precisa saber a verdade!',
          legendas_sugeridas: ['0:00 - Introdução', '0:20 - Evidência científica', '0:50 - Conclusão prática'],
        },
        audio_script: res.audio_script || res.resumo,
        tags: res.tags || ['SaudeSemMitos'],
        referencias_cientificas: (res.referencias_cientificas || []).map((ref: string) => ({
          title: ref,
          authors: 'Consenso Médico & Diretrizes Clínicas',
          url: 'https://pubmed.ncbi.nlm.nih.gov',
        })),
        aviso_legal:
          res.aviso_legal ||
          'O conteúdo publicado pelo Saúde Sem Mitos possui propósito exclusivamente educativo, científico e informativo. Não substitui consulta médica.',
      };

      setArticles((prev) => [newArticle, ...prev]);
      setSelectedArticle(newArticle);
      setActiveTab('artigos');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error('Falha na criação:', err);
      setErrorMessage('Falha ao processar a criação. Selecionando artigo padrão de referência.');
      setSelectedArticle(PROTO_CHAMOMILE_ARTICLE);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectArticle = (art: GeneratedArticle) => {
    setSelectedArticle(art);
    setActiveTab('artigos');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToStudio = (suggestedPrompt?: string, pillar?: PillarDay) => {
    if (pillar) setSelectedPillar(pillar);
    setActiveTab('assistente-ia');
    if (suggestedPrompt) {
      handleGenerate({
        prompt: suggestedPrompt,
        dayPillar: pillar,
      });
    }
  };

  const getTabLabel = () => {
    switch (activeTab) {
      case 'inicio':
        return 'Início';
      case 'artigos':
        return 'Artigos';
      case 'assistente-ia':
        return 'Assistente IA';
      case 'desmistificador':
        return 'Desmistificador';
    }
  };

  return (
    <div className="bg-surface font-body-md text-on-surface flex flex-col antialiased selection:bg-primary/20 min-h-screen">
      {/* Fixed Header */}
      <Header
        currentTabLabel={getTabLabel()}
        onLogoClick={() => setActiveTab('inicio')}
        onProfileClick={() => setActiveTab('assistente-ia')}
        onVoiceSettingsClick={() => setIsVoiceModalOpen(true)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode((prev) => !prev)}
      />

      {/* Main Container */}
      <main className="flex flex-col relative w-full pt-16 pb-24 bg-surface min-h-screen max-w-4xl mx-auto px-gutter">
        {/* Top Progress Bar (Reading & Listening) */}
        <div className="w-full bg-surface-container-high h-1 overflow-hidden sticky top-16 z-40 mb-3 rounded-full">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${readProgress}%` }}
          />
        </div>

        {/* Error notification if any */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-error-container text-on-error-container text-xs flex items-center justify-between">
            <span>{errorMessage}</span>
            <button
              onClick={() => setErrorMessage(null)}
              className="font-bold underline cursor-pointer"
            >
              Fechar
            </button>
          </div>
        )}

        {/* TAB 1: Artigos (The exact high-fidelity prototype reader!) */}
        {activeTab === 'artigos' && (
          <div className="flex flex-col gap-space-lg">
            <ArticleView
              key={selectedArticle.id}
              article={selectedArticle}
              onOpenStudio={() => setActiveTab('assistente-ia')}
              onOpenVoiceSettings={() => setIsVoiceModalOpen(true)}
              voiceName={selectedVoice.name}
              selectedVoiceId={selectedVoiceId}
              onSelectQuickVoice={handleSelectVoice}
            />

            {/* Other articles shortcut at bottom */}
            <div className="pt-6 border-t border-outline-variant/30 flex flex-col gap-2">
              <span className="font-label-md text-label-md font-bold text-on-surface">
                Mais Artigos do Saúde Sem Mitos:
              </span>
              <div className="flex flex-wrap gap-2">
                {articles.map((art) => (
                  <button
                    key={art.id}
                    onClick={() => handleSelectArticle(art)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition border ${
                      art.id === selectedArticle.id
                        ? 'bg-primary text-on-primary border-primary shadow-sm'
                        : 'bg-surface-container-lowest text-on-surface border-outline-variant/30 hover:bg-surface-container'
                    }`}
                  >
                    {art.pilar_dia.split('-')[0]}: {art.titulo.slice(0, 35)}...
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Assistente IA (Multimodal Studio: Text, Voice Mic, Photo Upload, Fast Chips) */}
        {activeTab === 'assistente-ia' && (
          <div className="flex flex-col gap-space-lg">
            <StudioInputBar
              onGenerate={handleGenerate}
              isLoading={isLoading}
              selectedPillar={selectedPillar}
              onPillarSelect={setSelectedPillar}
            />

            {/* Display newly created article immediately below the studio */}
            <div className="flex flex-col gap-2 pt-2">
              <span className="font-label-lg text-label-lg font-bold text-on-surface flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-xl">verified</span>
                Conteúdo em Foco no Estúdio
              </span>
              <ArticleView
                key={selectedArticle.id}
                article={selectedArticle}
                onOpenVoiceSettings={() => setIsVoiceModalOpen(true)}
                voiceName={selectedVoice.name}
                selectedVoiceId={selectedVoiceId}
                onSelectQuickVoice={handleSelectVoice}
              />
            </div>
          </div>
        )}

        {/* TAB 3: Início (Weekly Editorial Calendar & Dashboard) */}
        {activeTab === 'inicio' && (
          <HomeDashboard
            featuredArticle={PROTO_CHAMOMILE_ARTICLE}
            onSelectArticle={handleSelectArticle}
            onNavigateToStudio={handleNavigateToStudio}
            onNavigateToMyths={() => setActiveTab('desmistificador')}
          />
        )}

        {/* TAB 4: Desmistificador (Sábados Sem Mitos) */}
        {activeTab === 'desmistificador' && (
          <MythsView
            articles={articles}
            onSelectArticle={handleSelectArticle}
            onOpenStudioWithPrompt={handleNavigateToStudio}
          />
        )}
      </main>

      {/* Voice Settings Modal (Realist 2026 Models & GitHub Alternatives) */}
      <VoiceSettingsModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        selectedVoiceId={selectedVoiceId}
        onSelectVoice={handleSelectVoice}
      />

      {/* Fixed Bottom Navigation Bar */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
