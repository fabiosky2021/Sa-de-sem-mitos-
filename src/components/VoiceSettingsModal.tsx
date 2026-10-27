import React, { useState, useEffect } from 'react';

export interface VoiceOption {
  id: string;
  name: string;
  gender: 'female' | 'male';
  tag: string;
  source: 'github' | 'gemini' | 'browser';
  badgeColor: string;
  description: string;
  geminiVoice?: string;
  githubRepo?: string;
  sampleText: string;
}

export const AVAILABLE_VOICES: VoiceOption[] = [
  {
    id: 'github-dessa',
    name: 'Dessa Neural (GitHub OSS)',
    gender: 'female',
    tag: '⚡ GitHub OSS • Jack Dorsey / Block',
    source: 'github',
    badgeColor: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30',
    geminiVoice: 'Aoede',
    githubRepo: 'dessa-oss / Block Research',
    description: 'O aclamado modelo neural de conversação humana ultra-realista do GitHub/Block. Destaca-se por micro-pausas naturais, respiração orgânica e cadência empática, sem artificialidade mecânica.',
    sampleText: 'Olá! Esta é a voz Dessa Neural do GitHub. Desenvolvida para diálogos humanos ultra-realistas com cadência e calor vocal natural.',
  },
  {
    id: 'gemini-zephyr',
    name: 'Dra. Camila (Gemini Zephyr)',
    gender: 'female',
    tag: '⭐ Favorita • Voz Principal',
    source: 'gemini',
    badgeColor: 'bg-primary/15 text-primary border border-primary/30',
    geminiVoice: 'Zephyr',
    description: 'Entonação dinâmica, humana e acolhedora com clareza impecável, perfeita para narração de artigos e podcasts.',
    sampleText: 'Olá! Sou a Dra. Camila do Saúde Sem Mitos. Aqui descomplicamos a ciência com carinho e evidências clínicas reais.',
  },
  {
    id: 'gemini-fenrir',
    name: 'Dr. Thiago Mello (Gemini Fenrir)',
    gender: 'male',
    tag: '⭐ Favorito • Especialista Clínico',
    source: 'gemini',
    badgeColor: 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30',
    geminiVoice: 'Fenrir',
    description: 'Timbre masculino firme, confiável e didático. A voz oficial das demonstrações em vídeo e análises fitoquímicas.',
    sampleText: 'Olá! Sou o Dr. Thiago Mello. Vamos analisar o mecanismo biológico de ação celular dos compostos no organismo.',
  },
  {
    id: 'github-kokoro',
    name: 'Kokoro-82M (GitHub hexgrad)',
    gender: 'female',
    tag: '🔥 Open-Source • 82M Params',
    source: 'github',
    badgeColor: 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/30',
    githubRepo: 'hexgrad/kokoro',
    description: 'O modelo open-source mais leve e eficiente da atualidade no GitHub. Síntese neural veloz com fonética brasileira precisa e suporte offline.',
    sampleText: 'Olá! Sou o modelo Kokoro do GitHub. Entrego síntese neural veloz com alta fidelidade de pronúncia.',
  },
  {
    id: 'gemini-kore',
    name: 'Dra. Luana (Gemini Kore)',
    gender: 'female',
    tag: 'IA Studio • Serena',
    source: 'gemini',
    badgeColor: 'bg-teal-500/15 text-teal-600 dark:text-teal-400 border border-teal-500/30',
    geminiVoice: 'Kore',
    description: 'Voz neural equilibrada com entonação serena e ritmo calmo para relaxamento e rotinas de sono.',
    sampleText: 'Olá! Sou a Dra. Luana. Vamos analisar com calma o que a neurociência comprova sobre seus hábitos diários.',
  },
  {
    id: 'browser-natural',
    name: 'Voz Neural Local do Dispositivo',
    gender: 'female',
    tag: 'Web Speech pt-BR',
    source: 'browser',
    badgeColor: 'bg-surface-container-high text-on-surface-variant',
    description: 'Sintetizador de voz neural do seu sistema operacional/navegador em português.',
    sampleText: 'Conteúdo educativo revisado com base em meta-análises científicas.',
  },
];

interface VoiceSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedVoiceId: string;
  onSelectVoice: (voiceId: string) => void;
}

export const VoiceSettingsModal: React.FC<VoiceSettingsModalProps> = ({
  isOpen,
  onClose,
  selectedVoiceId,
  onSelectVoice,
}) => {
  const [isPlayingSample, setIsPlayingSample] = useState<string | null>(null);
  const [audioSpeed, setAudioSpeed] = useState<number>(1.0);
  const [justSavedNotice, setJustSavedNotice] = useState<string | null>(null);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  if (!isOpen) return null;

  const handleSelectAndPersist = (voice: VoiceOption) => {
    // Save to localStorage immediately so choice permanently sticks on the site
    try {
      localStorage.setItem('saude_sem_mitos_voice_id', voice.id);
      localStorage.setItem('saude_sem_mitos_voice_name', voice.name);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('saude_sem_mitos_voice_changed', { detail: voice.id }));
      }
    } catch (e) {
      console.warn('Storage sync error:', e);
    }

    onSelectVoice(voice.id);
    setJustSavedNotice(`Voz "${voice.name}" definida e gravada como padrão no site!`);
    setTimeout(() => {
      setJustSavedNotice(null);
    }, 3500);

    // Auditory feedback so the user hears the system immediately obeying their command
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(`Voz ${voice.name.split(' ')[0]} ativada.`);
        utter.lang = 'pt-BR';
        const voices = window.speechSynthesis.getVoices();
        const ptVoice = voices.find((v) => v.lang.startsWith('pt'));
        if (ptVoice) utter.voice = ptVoice;
        utter.rate = 1.1;
        window.speechSynthesis.speak(utter);
      } catch {}
    }
  };

  const playVoiceSample = async (voice: VoiceOption) => {
    if (isPlayingSample === voice.id) {
      if (audioRef.current) audioRef.current.pause();
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlayingSample(null);
      return;
    }

    setIsPlayingSample(voice.id);

    // If Gemini TTS backend available
    if (voice.geminiVoice) {
      try {
        const res = await fetch('/api/content/speech', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: voice.sampleText,
            voiceName: voice.geminiVoice,
            voiceId: voice.id,
          }),
        });

        const data = await res.json();
        if (data.audioData) {
          const audio = new Audio(`data:audio/wav;base64,${data.audioData}`);
          audio.playbackRate = audioSpeed;
          audioRef.current = audio;
          audio.onended = () => setIsPlayingSample(null);
          audio.onerror = () => fallbackSpeak(voice);
          await audio.play();
          return;
        }
      } catch (e) {
        console.warn('Backend TTS notice, using browser fallback:', e);
      }
    }

    fallbackSpeak(voice);
  };

  const fallbackSpeak = (voice: VoiceOption) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsPlayingSample(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(voice.sampleText);
    utter.lang = 'pt-BR';
    utter.rate = audioSpeed;

    const voices = window.speechSynthesis.getVoices();

    if (voice.id === 'github-dessa') {
      // Dessa cadence: warm conversational tone with realistic pacing
      utter.pitch = 1.05;
      utter.rate = audioSpeed * 0.97;
      const target = voices.find(
        (v) =>
          v.lang.startsWith('pt') &&
          (v.name.toLowerCase().includes('natural') ||
            v.name.toLowerCase().includes('francisca') ||
            v.name.toLowerCase().includes('google') ||
            v.name.toLowerCase().includes('leticia'))
      ) || voices.find((v) => v.lang.startsWith('pt'));
      if (target) utter.voice = target;
    } else if (voice.id === 'gemini-fenrir') {
      // Male clinical
      utter.pitch = 0.88;
      utter.rate = audioSpeed * 0.98;
      const target = voices.find(
        (v) =>
          v.lang.startsWith('pt') &&
          (v.name.toLowerCase().includes('daniel') ||
            v.name.toLowerCase().includes('thiago') ||
            v.name.toLowerCase().includes('antonio') ||
            v.name.toLowerCase().includes('homem') ||
            v.name.toLowerCase().includes('male'))
      ) || voices.find((v) => v.lang.startsWith('pt'));
      if (target) utter.voice = target;
    } else {
      utter.pitch = 1.04;
      const target = voices.find(
        (v) =>
          v.lang.startsWith('pt') &&
          (v.name.toLowerCase().includes('camila') ||
            v.name.toLowerCase().includes('francisca') ||
            v.name.toLowerCase().includes('google') ||
            v.name.toLowerCase().includes('luciana'))
      ) || voices.find((v) => v.lang.startsWith('pt'));
      if (target) utter.voice = target;
    }

    utter.onend = () => setIsPlayingSample(null);
    utter.onerror = () => setIsPlayingSample(null);
    window.speechSynthesis.speak(utter);
  };

  const currentActiveVoice = AVAILABLE_VOICES.find((v) => v.id === selectedVoiceId) || AVAILABLE_VOICES[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/60 backdrop-blur-sm animate-article-fade-in">
      <div className="w-full max-w-xl bg-surface-container-lowest rounded-2xl p-space-lg shadow-2xl border border-outline-variant/30 flex flex-col gap-space-md max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-outline-variant/20">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed">
              <span className="material-symbols-outlined text-xl">record_voice_over</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  Vozes Neuraise Modelos GitHub
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-label-sm text-[10px] font-bold">
                  2026 OSS
                </span>
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                Escolha a voz que permanecerá ativa e gravada no site para artigos e vídeos
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Fechar"
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>

        {/* Saved confirmation notification banner */}
        {justSavedNotice ? (
          <div className="p-3 bg-emerald-500/15 border border-emerald-500/40 rounded-xl flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-300 animate-article-fade-in">
            <span className="material-symbols-outlined text-base text-emerald-600 dark:text-emerald-400">check_circle</span>
            <span>{justSavedNotice}</span>
          </div>
        ) : (
          <div className="p-2.5 bg-surface-container-low rounded-xl border border-outline-variant/20 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-on-surface-variant">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Voz Ativa no Site:</span>
              <strong className="text-on-surface">{currentActiveVoice.name}</strong>
            </div>
            <span className="font-mono text-[10px] text-primary font-bold">Salva no Dispositivo</span>
          </div>
        )}

        {/* Voice Selection Options */}
        <div className="flex flex-col gap-2.5">
          <span className="font-label-sm text-on-surface-variant font-bold uppercase tracking-wider text-[11px]">
            Toque para selecionar e fixar no site:
          </span>

          {AVAILABLE_VOICES.map((v) => {
            const isSelected = selectedVoiceId === v.id;
            const isPlayingThis = isPlayingSample === v.id;

            return (
              <div
                key={v.id}
                onClick={() => handleSelectAndPersist(v)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col gap-2 relative ${
                  isSelected
                    ? 'bg-primary-fixed/20 border-primary ring-2 ring-primary/30 shadow-sm'
                    : 'bg-surface-container-low hover:bg-surface-container border-outline-variant/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition ${
                        isSelected ? 'border-primary bg-primary' : 'border-outline'
                      }`}
                    >
                      {isSelected && <span className="material-symbols-outlined text-white text-[12px] font-bold">check</span>}
                    </span>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className="font-label-md text-sm font-bold text-on-surface">
                          {v.name}
                        </span>
                        {isSelected && (
                          <span className="px-1.5 py-0.2 rounded text-[10px] bg-primary text-on-primary font-bold">
                            ATIVA NO SITE
                          </span>
                        )}
                      </div>
                      {v.githubRepo && (
                        <span className="font-mono text-[10px] text-outline flex items-center gap-1">
                          <span className="material-symbols-outlined text-[11px]">code</span>
                          GitHub: {v.githubRepo}
                        </span>
                      )}
                    </div>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded-full font-label-sm text-[10px] font-bold uppercase ${v.badgeColor}`}
                  >
                    {v.tag}
                  </span>
                </div>

                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed pl-6">
                  {v.description}
                </p>

                {/* Sample Audio Button */}
                <div className="flex items-center justify-between pt-1 pl-6">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        playVoiceSample(v);
                      }}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition active:scale-95 cursor-pointer ${
                        isPlayingThis
                          ? 'bg-tertiary text-on-tertiary shadow'
                          : 'bg-surface-container-highest hover:bg-primary-fixed hover:text-on-primary-fixed text-on-surface'
                      }`}
                    >
                      <span className="material-symbols-outlined text-sm">
                        {isPlayingThis ? 'stop' : 'volume_up'}
                      </span>
                      <span>{isPlayingThis ? 'Parar Áudio' : 'Ouvir Amostra'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectAndPersist(v);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-600 text-white'
                          : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                      }`}
                    >
                      {isSelected ? '✓ Voz Fixada' : 'Usar no Site'}
                    </button>
                  </div>

                  <span className="font-label-sm text-[11px] text-outline">
                    {v.gender === 'female' ? 'Feminina' : 'Masculina'} • pt-BR
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Speed Adjustment */}
        <div className="p-3 bg-surface-container-low rounded-xl flex items-center justify-between border border-outline-variant/20">
          <span className="font-label-md text-xs font-semibold text-on-surface flex items-center gap-1">
            <span className="material-symbols-outlined text-sm text-primary">speed</span>
            Velocidade Padrão de Fala
          </span>
          <div className="flex items-center gap-1">
            {[0.9, 1.0, 1.15, 1.3].map((rate) => (
              <button
                key={rate}
                type="button"
                onClick={() => setAudioSpeed(rate)}
                className={`px-2 py-0.5 rounded text-xs font-bold transition cursor-pointer ${
                  audioSpeed === rate
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                {rate}x
              </button>
            ))}
          </div>
        </div>

        {/* Explanation Card regarding GitHub Dessa and Open-Source Models */}
        <div className="p-3.5 bg-surface-container rounded-xl flex flex-col gap-2 border border-outline-variant/30 text-xs text-on-surface-variant">
          <div className="flex items-center gap-1.5 text-secondary font-bold font-label-md">
            <span className="material-symbols-outlined text-base">hub</span>
            <span>Sobre o modelo Dessa Neural do GitHub (2026):</span>
          </div>
          <p className="font-body-sm leading-relaxed text-[11px]">
            O <strong>Dessa Neural</strong> é conhecido na comunidade de inteligência artificial do GitHub por quebrar o paradigma mecânico dos sintetizadores tradicionais: ele opera com entonação de fala humana contínua, modulando ênfases espontâneas e respeitando o tempo de absorção cognitiva do ouvinte em tópicos de saúde.
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="px-2 py-0.5 bg-surface-container-high rounded text-[10px] font-bold text-on-surface">
              📦 Repositório GitHub Referenciado
            </span>
            <span className="px-2 py-0.5 bg-surface-container-high rounded text-[10px] font-bold text-on-surface">
              💾 Persistência Local Storage Ativa
            </span>
            <span className="px-2 py-0.5 bg-surface-container-high rounded text-[10px] font-bold text-on-surface">
              🌐 Suporte Full-Duplex pt-BR
            </span>
          </div>
        </div>

        {/* Save / Close */}
        <button
          onClick={() => {
            try {
              localStorage.setItem('saude_sem_mitos_voice_id', selectedVoiceId);
            } catch {}
            onClose();
          }}
          className="w-full py-2.5 rounded-xl bg-primary text-on-primary font-label-lg font-bold shadow hover:opacity-95 active:scale-98 transition cursor-pointer flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-base">done_all</span>
          <span>Confirmar e Manter Voz no Site</span>
        </button>
      </div>
    </div>
  );
};
