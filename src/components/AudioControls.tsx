import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AVAILABLE_VOICES, VoiceOption } from './VoiceSettingsModal';

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
  selectedVoiceId = 'github-dessa',
  onSelectQuickVoice,
  onOpenVoiceSettings,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSpeedIdx, setCurrentSpeedIdx] = useState(1); // default 1.25x
  const speeds = ['1x', '1.25x', '1.5x'];
  const [showCc, setShowCc] = useState(true);
  const [progressPercent, setProgressPercent] = useState(20);
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [availableBrowserVoices, setAvailableBrowserVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  const activeVoice: VoiceOption =
    AVAILABLE_VOICES.find((v) => v.id === selectedVoiceId) || AVAILABLE_VOICES[0];

  const parsedSentences =
    sentences.length > 0
      ? sentences
      : textToRead.split(/(?<=[.?!])\s+/).filter((s) => s.trim().length > 0);

  const isPlayingRef = useRef(false);
  const currentSentenceIdxRef = useRef(0);
  const keepAliveIntervalRef = useRef<any>(null);
  const audioBackendRef = useRef<HTMLAudioElement | null>(null);

  // Keep refs in sync with state
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    currentSentenceIdxRef.current = currentSentenceIdx;
  }, [currentSentenceIdx]);

  // Preload and cache browser voices reliably
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const loadVoices = () => {
      const v = window.speechSynthesis.getVoices();
      if (v && v.length > 0) {
        setAvailableBrowserVoices(v);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (keepAliveIntervalRef.current) {
        clearInterval(keepAliveIntervalRef.current);
      }
      if (audioBackendRef.current) {
        audioBackendRef.current.pause();
      }
    };
  }, []);

  // Helper to pick the best voice for the chosen voice ID
  const resolveSpeechVoice = useCallback(
    (voiceId: string, voices: SpeechSynthesisVoice[]): { voice?: SpeechSynthesisVoice; pitch: number; rateMultiplier: number } => {
      let pitch = 1.0;
      let rateMultiplier = 1.0;
      let target: SpeechSynthesisVoice | undefined;

      const ptVoices = voices.filter((v) => v.lang.startsWith('pt'));

      if (voiceId === 'github-dessa') {
        // Dessa Neural (GitHub): warm, engaging conversational cadence with realistic micro-pauses
        pitch = 1.05;
        rateMultiplier = 0.98;
        target =
          ptVoices.find((v) => v.name.toLowerCase().includes('natural')) ||
          ptVoices.find((v) => v.name.toLowerCase().includes('francisca')) ||
          ptVoices.find((v) => v.name.toLowerCase().includes('google')) ||
          ptVoices.find((v) => v.name.toLowerCase().includes('leticia')) ||
          ptVoices[0];
      } else if (voiceId === 'gemini-fenrir') {
        // Dr. Thiago Mello (Clínico Masculino)
        pitch = 0.88;
        rateMultiplier = 0.98;
        target =
          ptVoices.find((v) => v.name.toLowerCase().includes('daniel')) ||
          ptVoices.find((v) => v.name.toLowerCase().includes('thiago')) ||
          ptVoices.find((v) => v.name.toLowerCase().includes('antonio')) ||
          ptVoices.find((v) => v.name.toLowerCase().includes('homem')) ||
          ptVoices.find((v) => v.name.toLowerCase().includes('male')) ||
          ptVoices.find((v) => v.name.toLowerCase().includes('faber')) ||
          ptVoices[0];
      } else if (voiceId === 'github-kokoro') {
        // Kokoro-82M (GitHub open-source)
        pitch = 1.0;
        rateMultiplier = 1.02;
        target =
          ptVoices.find((v) => v.name.toLowerCase().includes('luciana')) ||
          ptVoices.find((v) => v.name.toLowerCase().includes('google')) ||
          ptVoices[0];
      } else if (voiceId === 'gemini-kore') {
        // Dra. Luana (Serena)
        pitch = 0.96;
        rateMultiplier = 0.95;
        target =
          ptVoices.find((v) => v.name.toLowerCase().includes('leticia')) ||
          ptVoices.find((v) => v.name.toLowerCase().includes('francisca')) ||
          ptVoices[0];
      } else {
        // Dra. Camila (Zephyr)
        pitch = 1.06;
        rateMultiplier = 1.0;
        target =
          ptVoices.find((v) => v.name.toLowerCase().includes('camila')) ||
          ptVoices.find((v) => v.name.toLowerCase().includes('francisca')) ||
          ptVoices.find((v) => v.name.toLowerCase().includes('leticia')) ||
          ptVoices.find((v) => v.name.toLowerCase().includes('google')) ||
          ptVoices[0];
      }

      return { voice: target, pitch, rateMultiplier };
    },
    []
  );

  // Play audio sentence by sentence with Chrome keepalive
  const startSpeechSequence = useCallback(
    (startIdx: number, targetVoiceId: string) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

      window.speechSynthesis.cancel();
      if (audioBackendRef.current) audioBackendRef.current.pause();

      setIsPlaying(true);
      isPlayingRef.current = true;

      // Chrome keep-alive bug fix: periodically pause and resume if audio plays > 14 seconds
      if (keepAliveIntervalRef.current) clearInterval(keepAliveIntervalRef.current);
      keepAliveIntervalRef.current = setInterval(() => {
        if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
          window.speechSynthesis.pause();
          window.speechSynthesis.resume();
        }
      }, 10000);

      const voices =
        availableBrowserVoices.length > 0
          ? availableBrowserVoices
          : window.speechSynthesis.getVoices();

      const { voice, pitch, rateMultiplier } = resolveSpeechVoice(targetVoiceId, voices);

      const speakNext = (idx: number) => {
        if (!isPlayingRef.current) return;

        if (idx >= parsedSentences.length) {
          setIsPlaying(false);
          isPlayingRef.current = false;
          setCurrentSentenceIdx(0);
          setProgressPercent(100);
          if (keepAliveIntervalRef.current) clearInterval(keepAliveIntervalRef.current);
          return;
        }

        setCurrentSentenceIdx(idx);
        currentSentenceIdxRef.current = idx;
        setProgressPercent(Math.round(((idx + 1) / parsedSentences.length) * 100));

        const text = parsedSentences[idx];
        const utter = new SpeechSynthesisUtterance(text);
        utter.lang = 'pt-BR';
        if (voice) utter.voice = voice;
        utter.pitch = pitch;

        const rateVal = parseFloat(speeds[currentSpeedIdx]);
        const baseRate = isNaN(rateVal) ? 1.0 : rateVal;
        utter.rate = baseRate * rateMultiplier;
        utter.volume = isMuted ? 0 : 1;

        utter.onend = () => {
          if (isPlayingRef.current) {
            speakNext(idx + 1);
          }
        };

        utter.onerror = (e) => {
          console.warn('SpeechSynthesis sentence notice:', e);
          if (isPlayingRef.current && idx + 1 < parsedSentences.length) {
            speakNext(idx + 1);
          } else {
            setIsPlaying(false);
            isPlayingRef.current = false;
          }
        };

        window.speechSynthesis.speak(utter);
      };

      speakNext(startIdx);
    },
    [availableBrowserVoices, resolveSpeechVoice, parsedSentences, speeds, currentSpeedIdx, isMuted]
  );

  const stopPlayback = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (audioBackendRef.current) {
      audioBackendRef.current.pause();
    }
    if (keepAliveIntervalRef.current) {
      clearInterval(keepAliveIntervalRef.current);
    }
    setIsPlaying(false);
    isPlayingRef.current = false;
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      stopPlayback();
    } else {
      startSpeechSequence(currentSentenceIdx, selectedVoiceId);
    }
  };

  const handleQuickVoiceChange = (newVoiceId: string) => {
    // 1. Immediately persist to localStorage
    try {
      localStorage.setItem('saude_sem_mitos_voice_id', newVoiceId);
      const matched = AVAILABLE_VOICES.find((v) => v.id === newVoiceId);
      if (matched) {
        localStorage.setItem('saude_sem_mitos_voice_name', matched.name);
      }
      window.dispatchEvent(
        new CustomEvent('saude_sem_mitos_voice_changed', { detail: newVoiceId })
      );
    } catch {}

    if (onSelectQuickVoice) onSelectQuickVoice(newVoiceId);

    const voiceInfo = AVAILABLE_VOICES.find((v) => v.id === newVoiceId);
    setFeedbackToast(`🗣️ Obedecido: Voz alterada para ${voiceInfo?.name || newVoiceId}!`);
    setTimeout(() => setFeedbackToast(null), 3000);

    // 2. If already playing, immediately continue with the new voice!
    if (isPlayingRef.current) {
      startSpeechSequence(currentSentenceIdxRef.current, newVoiceId);
    } else {
      // Announce the voice in a brief preview so user hears it directly obeying them
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(`Voz ${voiceInfo?.name.split(' ')[0] || ''} ativada no site.`);
        utter.lang = 'pt-BR';
        const voices = availableBrowserVoices.length > 0 ? availableBrowserVoices : window.speechSynthesis.getVoices();
        const { voice, pitch } = resolveSpeechVoice(newVoiceId, voices);
        if (voice) utter.voice = voice;
        utter.pitch = pitch;
        utter.rate = 1.05;
        window.speechSynthesis.speak(utter);
      }
    }
  };

  const handleSpeedToggle = () => {
    const next = (currentSpeedIdx + 1) % speeds.length;
    setCurrentSpeedIdx(next);
    if (isPlaying) {
      startSpeechSequence(currentSentenceIdx, selectedVoiceId);
    }
  };

  const handleReplay10 = () => {
    const nextIdx = Math.max(0, currentSentenceIdx - 1);
    setCurrentSentenceIdx(nextIdx);
    setProgressPercent(Math.round(((nextIdx + 1) / parsedSentences.length) * 100));
    if (isPlaying) {
      startSpeechSequence(nextIdx, selectedVoiceId);
    }
  };

  const handleForward10 = () => {
    const nextIdx = Math.min(parsedSentences.length - 1, currentSentenceIdx + 1);
    setCurrentSentenceIdx(nextIdx);
    setProgressPercent(Math.round(((nextIdx + 1) / parsedSentences.length) * 100));
    if (isPlaying) {
      startSpeechSequence(nextIdx, selectedVoiceId);
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
      startSpeechSequence(newIdx, selectedVoiceId);
    }
  };

  return (
    <div className="w-full bg-surface-container-low rounded-xl p-space-md shadow-md flex flex-col gap-space-sm border border-outline-variant/30 transition-all">
      {/* Toast Notification when voice obeys user action */}
      {feedbackToast && (
        <div className="p-2 bg-emerald-500/15 border border-emerald-500/40 rounded-lg flex items-center justify-between text-xs font-bold text-emerald-700 dark:text-emerald-300 animate-article-fade-in">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-base text-emerald-600 dark:text-emerald-400">
              check_circle
            </span>
            <span>{feedbackToast}</span>
          </div>
          <button
            type="button"
            onClick={() => setFeedbackToast(null)}
            className="text-[10px] underline cursor-pointer"
          >
            OK
          </button>
        </div>
      )}

      {/* Header with Title and CC Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-space-sm min-w-0">
          <div
            onClick={togglePlay}
            title={isPlaying ? 'Pausar áudio' : 'Reproduzir com a voz ativa'}
            className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 cursor-pointer hover:scale-105 transition-transform ${
              isPlaying
                ? 'bg-primary text-on-primary ring-4 ring-primary/20 animate-pulse'
                : 'bg-primary-fixed text-on-primary-fixed'
            }`}
          >
            <span className="material-symbols-outlined text-2xl">
              {isPlaying ? 'volume_up' : 'record_voice_over'}
            </span>
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-label-md text-label-md text-on-surface font-bold truncate">
                Narração Humanizada
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-label-sm text-[10px] font-bold border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Voz Obedecida: {activeVoice.name}
              </span>
              {onOpenVoiceSettings && (
                <button
                  type="button"
                  onClick={onOpenVoiceSettings}
                  className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-surface-container text-primary font-label-sm text-[10px] font-bold hover:bg-primary-fixed hover:text-on-primary-fixed transition cursor-pointer"
                  title="Abrir catálogo completo de vozes (GitHub Dessa, Gemini e Browser)"
                >
                  <span className="material-symbols-outlined text-[12px]">tune</span>
                  <span>Catálogo</span>
                </button>
              )}
            </div>

            {/* Quick 1-tap switcher for top models including GitHub Dessa */}
            <div className="flex items-center gap-1 my-1 overflow-x-auto pb-0.5">
              <button
                type="button"
                onClick={() => handleQuickVoiceChange('github-dessa')}
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                  selectedVoiceId === 'github-dessa'
                    ? 'bg-emerald-600 text-white shadow-xs ring-2 ring-emerald-500/40'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
                title="Voz Dessa Neural (GitHub OSS - Jack Dorsey / Block)"
              >
                <span>⚡ Dessa (GitHub)</span>
                {selectedVoiceId === 'github-dessa' && <span className="text-[9px]">✓</span>}
              </button>

              <button
                type="button"
                onClick={() => handleQuickVoiceChange('gemini-zephyr')}
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                  selectedVoiceId === 'gemini-zephyr'
                    ? 'bg-primary text-on-primary shadow-xs ring-2 ring-primary/40'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
                title="Voz de Dra. Camila (Gemini Zephyr)"
              >
                <span>✨ Dra. Camila</span>
                {selectedVoiceId === 'gemini-zephyr' && <span className="text-[9px]">✓</span>}
              </button>

              <button
                type="button"
                onClick={() => handleQuickVoiceChange('gemini-fenrir')}
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                  selectedVoiceId === 'gemini-fenrir'
                    ? 'bg-[#006398] text-white shadow-xs ring-2 ring-[#006398]/40'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
                title="Voz de Dr. Thiago (Gemini Fenrir)"
              >
                <span>🩺 Dr. Thiago</span>
                {selectedVoiceId === 'gemini-fenrir' && <span className="text-[9px]">✓</span>}
              </button>

              <button
                type="button"
                onClick={() => handleQuickVoiceChange('github-kokoro')}
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                  selectedVoiceId === 'github-kokoro'
                    ? 'bg-purple-600 text-white shadow-xs ring-2 ring-purple-500/40'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
                title="Voz Kokoro-82M (GitHub hexgrad)"
              >
                <span>🔥 Kokoro</span>
                {selectedVoiceId === 'github-kokoro' && <span className="text-[9px]">✓</span>}
              </button>
            </div>

            <div className="flex items-center gap-1.5 text-on-surface-variant text-[11px]">
              <span className="font-semibold text-on-surface">{activeVoice.name}</span>
              <span>•</span>
              <span>{Math.floor(progressPercent * 0.01 * 180 / 60)}:
              {String(Math.floor((progressPercent * 0.01 * 180) % 60)).padStart(2, '0')} / {duration}</span>
              {isPlaying && (
                <span className="flex items-center gap-0.5 text-primary text-[10px] font-bold ml-1 animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Reproduzindo...
                </span>
              )}
            </div>
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
            aria-label={isPlaying ? 'Pausar narração' : 'Reproduzir com a voz ativa'}
            className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-lg hover:opacity-90 active:scale-90 transition-transform cursor-pointer ring-2 ring-primary/30"
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
            <span>TRANSCRIÇÃO EM TEMPO REAL • VOZ: {activeVoice.name}</span>
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
