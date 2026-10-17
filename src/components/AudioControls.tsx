import React, { useState, useEffect, useRef } from 'react';

interface AudioControlsProps {
  textToRead: string;
  duration?: string;
  sentences?: string[];
  title?: string;
  voiceName?: string;
  selectedVoiceId?: string;
  onSelectQuickVoice?: (voiceId: string) => void;
  onOpenVoiceSettings?: () => void;
}

export const AudioControls: React.FC<AudioControlsProps> = ({
  textToRead,
  duration = '03:00',
  sentences = [],
  title,
  voiceName,
  selectedVoiceId = 'gemini-zephyr',
  onSelectQuickVoice,
  onOpenVoiceSettings,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSpeedIdx, setCurrentSpeedIdx] = useState(1); // default 1.25x
  const speeds = ['1x', '1.25x', '1.5x'];
  const [showCc, setShowCc] = useState(true);
  const [progressPercent, setProgressPercent] = useState(42);
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const parsedSentences = sentences.length > 0
    ? sentences
    : textToRead.split(/(?<=[.?!])\s+/).filter(Boolean);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Play/pause handler using Web Speech Synthesis
  const togglePlay = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsPlaying(!isPlaying);
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      window.speechSynthesis.cancel();

      const speakSentence = (idx: number) => {
        if (idx >= parsedSentences.length) {
          setIsPlaying(false);
          setCurrentSentenceIdx(0);
          setProgressPercent(100);
          return;
        }

        setCurrentSentenceIdx(idx);
        setProgressPercent(Math.round(((idx + 1) / parsedSentences.length) * 100));

        const utter = new SpeechSynthesisUtterance(parsedSentences[idx]);
        utter.lang = 'pt-BR';
        const rateVal = parseFloat(speeds[currentSpeedIdx]);
        utter.rate = isNaN(rateVal) ? 1.0 : rateVal;
        utter.volume = isMuted ? 0 : 1;

        const voices = window.speechSynthesis.getVoices();
        const ptVoice = voices.find(
          (v) =>
            v.lang.startsWith('pt') &&
            (v.name.includes('Luciana') ||
              v.name.includes('Francisca') ||
              v.name.includes('Google') ||
              v.name.includes('Natural'))
        ) || voices.find((v) => v.lang.startsWith('pt'));

        if (ptVoice) utter.voice = ptVoice;

        utter.onend = () => {
          speakSentence(idx + 1);
        };
        utter.onerror = () => {
          setIsPlaying(false);
        };

        utteranceRef.current = utter;
        window.speechSynthesis.speak(utter);
      };

      speakSentence(currentSentenceIdx);
      setIsPlaying(true);
    }
  };

  const handleSpeedToggle = () => {
    const next = (currentSpeedIdx + 1) % speeds.length;
    setCurrentSpeedIdx(next);
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setTimeout(togglePlay, 100);
    }
  };

  const handleReplay10 = () => {
    const nextIdx = Math.max(0, currentSentenceIdx - 1);
    setCurrentSentenceIdx(nextIdx);
    setProgressPercent(Math.round(((nextIdx + 1) / parsedSentences.length) * 100));
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setTimeout(togglePlay, 100);
    }
  };

  const handleForward10 = () => {
    const nextIdx = Math.min(parsedSentences.length - 1, currentSentenceIdx + 1);
    setCurrentSentenceIdx(nextIdx);
    setProgressPercent(Math.round(((nextIdx + 1) / parsedSentences.length) * 100));
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setTimeout(togglePlay, 100);
    }
  };

  const handleScrubberClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const newIdx = Math.floor(ratio * parsedSentences.length);
    setCurrentSentenceIdx(newIdx);
    setProgressPercent(Math.round(ratio * 100));
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setTimeout(togglePlay, 100);
    }
  };

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <div className="w-full bg-surface-container-low rounded-xl p-space-md shadow-md flex flex-col gap-space-sm border border-outline-variant/30">
      {/* Header with Title and CC Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-space-sm min-w-0">
          <div
            onClick={onOpenVoiceSettings}
            title="Configurar voz neural"
            className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed shrink-0 cursor-pointer hover:scale-105 transition-transform"
          >
            <span className="material-symbols-outlined text-xl">record_voice_over</span>
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-label-md text-label-md text-on-surface font-bold truncate">
                Narração Humanizada
              </span>
              {onOpenVoiceSettings && (
                <button
                  type="button"
                  onClick={onOpenVoiceSettings}
                  className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-surface-container text-primary font-label-sm text-[10px] font-bold hover:bg-primary-fixed hover:text-on-primary-fixed transition cursor-pointer"
                  title="Alterar voz da assistente virtual"
                >
                  <span className="material-symbols-outlined text-[12px]">tune</span>
                  <span>Opções</span>
                </button>
              )}
            </div>

            {/* Quick 1-tap switcher for Dra. Camila & Dr. Thiago */}
            <div className="flex items-center gap-1 my-0.5">
              <button
                type="button"
                onClick={() => onSelectQuickVoice?.('gemini-zephyr')}
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition cursor-pointer flex items-center gap-0.5 ${
                  selectedVoiceId === 'gemini-zephyr'
                    ? 'bg-primary text-on-primary shadow-xs ring-1 ring-primary'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
                title="Voz de Dra. Camila (Gemini Zephyr)"
              >
                <span>✨ Dra. Camila</span>
              </button>
              <button
                type="button"
                onClick={() => onSelectQuickVoice?.('gemini-fenrir')}
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition cursor-pointer flex items-center gap-0.5 ${
                  selectedVoiceId === 'gemini-fenrir'
                    ? 'bg-[#006398] text-white shadow-xs ring-1 ring-[#006398]'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
                title="Voz de Dr. Thiago (Gemini Fenrir)"
              >
                <span>🩺 Dr. Thiago</span>
              </button>
            </div>

            <span className="font-label-sm text-label-sm text-on-surface-variant truncate">
              {voiceName || 'Dra. Camila (Gemini 2026)'} • {Math.floor(progressPercent * 0.01 * 180 / 60)}:
              {String(Math.floor((progressPercent * 0.01 * 180) % 60)).padStart(2, '0')} / {duration}
            </span>
          </div>
        </div>
        <button
          onClick={() => setShowCc(!showCc)}
          className={`px-2.5 py-1 rounded-full font-label-sm text-label-sm font-bold flex items-center gap-1 transition-colors cursor-pointer ${
            showCc
              ? 'bg-surface-container-high text-on-surface font-semibold'
              : 'bg-surface-container text-on-surface-variant'
          }`}
        >
          <span className="material-symbols-outlined text-sm">closed_caption</span>
          <span>{showCc ? 'CC Ocultar' : 'CC Mostrar'}</span>
        </button>
      </div>

      {/* Scrubber Timeline */}
      <div className="flex flex-col gap-1 pt-1">
        <div
          onClick={handleScrubberClick}
          className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden cursor-pointer relative"
        >
          <div
            className="h-full bg-primary rounded-full transition-all duration-200"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex justify-between items-center text-outline font-label-sm text-label-sm">
          <span>01:14</span>
          <span>-01:46</span>
        </div>
      </div>

      {/* Player Controls Bar */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={handleSpeedToggle}
          className="px-2.5 py-1 rounded-lg bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-bold active:scale-95 transition-transform cursor-pointer hover:bg-surface-container-high"
        >
          {speeds[currentSpeedIdx]}
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleReplay10}
            aria-label="Voltar 10 segundos"
            className="w-9 h-9 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant active:scale-90 transition-transform cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">replay_10</span>
          </button>

          <button
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pausar áudio' : 'Reproduzir áudio'}
            className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center shadow hover:opacity-90 active:scale-90 transition-transform cursor-pointer"
          >
            <span className="material-symbols-outlined text-2xl fill-1">
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>

          <button
            onClick={handleForward10}
            aria-label="Avançar 10 segundos"
            className="w-9 h-9 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant active:scale-90 transition-transform cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">forward_10</span>
          </button>
        </div>

        <button
          onClick={() => setIsMuted(!isMuted)}
          aria-label="Configurar volume"
          className="w-9 h-9 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant active:scale-95 cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">
            {isMuted ? 'volume_off' : 'volume_up'}
          </span>
        </button>
      </div>

      {/* Dynamic Synchronized Transcription (CC) Drawer */}
      {showCc && (
        <div className="mt-space-xs p-space-sm bg-surface-container-lowest rounded-lg flex flex-col gap-1 transition-all duration-300 border border-outline-variant/30">
          <div className="flex items-center gap-1.5 text-primary font-label-sm text-label-sm font-bold">
            <span className="material-symbols-outlined text-sm animate-pulse">subtitles</span>
            <span>TRANSCRIÇÃO EM TEMPO REAL</span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface leading-relaxed">
            <span className="text-on-surface-variant opacity-60">
              {parsedSentences[Math.max(0, currentSentenceIdx - 1)] || 'Início da explanação... '}{' '}
            </span>
            <span className="bg-primary-fixed/40 px-1 py-0.5 rounded font-semibold text-on-primary-fixed-variant">
              "{parsedSentences[currentSentenceIdx] || parsedSentences[0]}"
            </span>
            <span className="text-on-surface-variant opacity-80">
              {' '}{parsedSentences[currentSentenceIdx + 1] || ''}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};
