import React, { useState, useEffect } from 'react';

export interface VoiceOption {
  id: string;
  name: string;
  gender: 'female' | 'male';
  tag: string;
  source: 'gemini' | 'browser' | 'github';
  description: string;
  geminiVoice?: string;
  sampleText: string;
}

export const AVAILABLE_VOICES: VoiceOption[] = [
  {
    id: 'gemini-zephyr',
    name: 'Dra. Camila (Gemini Zephyr)',
    gender: 'female',
    tag: '⭐ Favorita • Voz Principal',
    source: 'gemini',
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
    geminiVoice: 'Fenrir',
    description: 'Timbre masculino firme, confiável e didático. A voz oficial das demonstrações em vídeo e análises fitoquímicas.',
    sampleText: 'Olá! Sou o Dr. Thiago Mello. Vamos analisar o mecanismo biológico de ação celular dos compostos no organismo.',
  },
  {
    id: 'gemini-kore',
    name: 'Dra. Luana (Gemini Kore)',
    gender: 'female',
    tag: 'IA Studio • Serena',
    source: 'gemini',
    geminiVoice: 'Kore',
    description: 'Voz neural equilibrada com entonação serena e ritmo calmo para relaxamento e rotinas de sono.',
    sampleText: 'Olá! Sou a Dra. Luana. Vamos analisar com calma o que a neurociência comprova sobre seus hábitos diários.',
  },
  {
    id: 'browser-natural',
    name: 'Dra. Helena Rios (Voz Neural Local)',
    gender: 'female',
    tag: 'Web Speech pt-BR',
    source: 'browser',
    description: 'Utiliza as vozes neurais brasileiras instaladas no seu dispositivo (como Francisca ou Luciana Natural).',
    sampleText: 'Revisão médica baseada em meta-análises e diretrizes das sociedades de especialidade.',
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

    // If Gemini TTS, attempt backend generation first
    if (voice.source === 'gemini' && voice.geminiVoice) {
      try {
        const res = await fetch('/api/content/speech', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: voice.sampleText,
            voiceName: voice.geminiVoice,
          }),
        });

        const data = await res.json();
        if (data.audioData) {
          const audio = new Audio(`data:audio/wav;base64,${data.audioData}`);
          audio.playbackRate = audioSpeed;
          audioRef.current = audio;
          audio.onended = () => setIsPlayingSample(null);
          audio.onerror = () => fallbackSpeak(voice.sampleText);
          await audio.play();
          return;
        }
      } catch (e) {
        console.warn('Backend TTS notice, using browser fallback:', e);
      }
    }

    fallbackSpeak(voice.sampleText);
  };

  const fallbackSpeak = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsPlayingSample(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'pt-BR';
    utter.rate = audioSpeed;

    const voices = window.speechSynthesis.getVoices();
    const ptVoice =
      voices.find(
        (v) =>
          v.lang.startsWith('pt') &&
          (v.name.includes('Francisca') ||
            v.name.includes('Google') ||
            v.name.includes('Luciana') ||
            v.name.includes('Natural'))
      ) || voices.find((v) => v.lang.startsWith('pt'));

    if (ptVoice) utter.voice = ptVoice;

    utter.onend = () => setIsPlayingSample(null);
    utter.onerror = () => setIsPlayingSample(null);
    window.speechSynthesis.speak(utter);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/60 backdrop-blur-sm animate-article-fade-in">
      <div className="w-full max-w-lg bg-surface-container-lowest rounded-2xl p-space-lg shadow-2xl border border-outline-variant/30 flex flex-col gap-space-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between pb-2 border-b border-outline-variant/20">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed">
              <span className="material-symbols-outlined text-xl">record_voice_over</span>
            </div>
            <div className="flex flex-col">
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                Voz da Assistente Virtual
              </h3>
              <span className="font-label-sm text-label-sm text-primary font-semibold">
                Modelos Neurais Realistas 2026 & Alternativas GitHub
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>

        {/* Voice Selection Options */}
        <div className="flex flex-col gap-2.5">
          <span className="font-label-sm text-on-surface-variant font-bold uppercase tracking-wider">
            Selecione a voz para os áudios e vídeos do app:
          </span>

          {AVAILABLE_VOICES.map((v) => {
            const isSelected = selectedVoiceId === v.id;
            const isPlayingThis = isPlayingSample === v.id;

            return (
              <div
                key={v.id}
                onClick={() => onSelectVoice(v.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col gap-2 ${
                  isSelected
                    ? 'bg-primary-fixed/20 border-primary shadow-sm'
                    : 'bg-surface-container-low hover:bg-surface-container border-outline-variant/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? 'border-primary' : 'border-outline'
                      }`}
                    >
                      {isSelected && <span className="w-2 h-2 rounded-full bg-primary" />}
                    </span>
                    <span className="font-label-md text-sm font-bold text-on-surface">
                      {v.name}
                    </span>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded-full font-label-sm text-[10px] font-bold uppercase ${
                      isSelected
                        ? 'bg-primary text-on-primary'
                        : 'bg-surface-container-high text-on-surface-variant'
                    }`}
                  >
                    {v.tag}
                  </span>
                </div>

                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed pl-5">
                  {v.description}
                </p>

                {/* Sample Audio Button */}
                <div className="flex items-center justify-between pt-1 pl-5">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      playVoiceSample(v);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition active:scale-95 cursor-pointer ${
                      isPlayingThis
                        ? 'bg-tertiary text-on-tertiary shadow'
                        : 'bg-surface-container-highest hover:bg-primary-fixed hover:text-on-primary-fixed text-on-surface'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">
                      {isPlayingThis ? 'stop' : 'volume_up'}
                    </span>
                    <span>{isPlayingThis ? 'Parar Amostra' : 'Ouvir Amostra de Voz'}</span>
                  </button>

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

        {/* GitHub Open Source Alternatives Information Card */}
        <div className="p-3 bg-surface-container rounded-xl flex flex-col gap-1.5 border border-outline-variant/30 text-xs text-on-surface-variant">
          <div className="flex items-center gap-1.5 text-secondary font-bold font-label-md">
            <span className="material-symbols-outlined text-base">code</span>
            <span>Alternativas Open-Source do GitHub (2026):</span>
          </div>
          <p className="font-body-sm leading-relaxed">
            Se você deseja hospedar sua própria infraestrutura de áudio local ou via servidor dedicado:
          </p>
          <ul className="list-disc list-inside space-y-1 font-body-sm text-[11px] text-on-surface">
            <li>
              <strong>Kokoro-82M</strong> (GitHub: <code className="text-primary font-mono">hexgrad/kokoro</code>): O modelo open-source mais leve e ultra-realista do momento, com suporte WebAssembly direto no navegador.
            </li>
            <li>
              <strong>Piper TTS</strong> (GitHub: <code className="text-secondary font-mono">rhasspy/piper</code>): Síntese neural veloz com modelos treinados em português brasileiro (pt-BR).
            </li>
            <li>
              <strong>ChatTTS</strong> (GitHub: <code className="text-tertiary font-mono">2noise/ChatTTS</code>): Desenvolvido para diálogos ultra-naturais com respiração e ênfase.
            </li>
          </ul>
        </div>

        {/* Save / Close */}
        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-primary text-on-primary font-label-lg font-bold shadow hover:opacity-95 active:scale-98 transition cursor-pointer"
        >
          Confirmar e Usar Esta Voz
        </button>
      </div>
    </div>
  );
};
