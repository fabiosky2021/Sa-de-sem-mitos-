import React, { useState, useEffect, useRef } from 'react';

interface VideoPlayerProps {
  title?: string;
  description?: string;
  duration?: string;
  thumbnail?: string;
  subtitles?: { time: number; text: string }[];
  onShare?: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  title = 'Demonstração: Infusão & Absorção Cerebral',
  description = 'Dr. Thiago Mello demonstra os compostos ativos em 3D.',
  duration = '03:12',
  thumbnail = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrul8eTEThFR76hb9Mcno-WVnTFoDF7Vqxv16DixUbXxO8EIwm7TDDWNouHj2IPnyokqlQddgrX5R9t-GNC-owC0f_exyhPnYCeXWQhWYVcM1N5qeg4IWSbtjleamnjkK-MBBJusFf9GpkFxUkTLNgDHfeXdhsaNNcHrIe2A2CRyMC4I9RAPeMlpzxRM_NDoNYsK97gcjmSWISZCqCzg-DnsizpOAD6_zH8au0Mofr',
  subtitles = [
    { time: 0, text: 'Olá! Bem-vindo à análise neuroquímica do Saúde Sem Mitos.' },
    { time: 6, text: 'Hoje investigamos a camomila e a erva-cidreira sob a ótica dos ensaios clínicos.' },
    { time: 18, text: 'A apigenina presente na flor liga-se aos sítios de benzodiazepínicos nos receptores GABA-A.' },
    { time: 34, text: 'Isso induz ondas cerebrais alfa e reduz a hiperatividade no córtex pré-frontal.' },
    { time: 50, text: 'Atenção ao preparo: nunca ferva as folhas para não degradar os óleos voláteis.' },
    { time: 65, text: 'Abafar por 8 a 10 minutos preserva o ácido rosmarínico e garante eficácia.' }
  ],
  onShare,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [ccEnabled, setCcEnabled] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const lastSpokenIdxRef = useRef<number>(-1);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const ambientOscRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Parse total duration in seconds (e.g. 03:12 -> 192)
  const totalSeconds = React.useMemo(() => {
    const parts = duration.split(':');
    if (parts.length === 2) {
      return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
    }
    return 192;
  }, [duration]);

  // Find active subtitle index based on currentTime
  const activeSubtitleIndex = React.useMemo(() => {
    if (subtitles.length === 0) return -1;
    for (let i = subtitles.length - 1; i >= 0; i--) {
      if (currentTime >= subtitles[i].time) {
        return i;
      }
    }
    return 0;
  }, [currentTime, subtitles]);

  const activeSubtitle = activeSubtitleIndex >= 0 ? subtitles[activeSubtitleIndex]?.text : '';

  // Start soothing ambient background sound for video realism
  const startAmbientSound = () => {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Stop previous osc if running
      if (ambientOscRef.current) {
        try { ambientOscRef.current.stop(); } catch {}
      }

      // Gentle warm 216Hz relaxing pad
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(216, ctx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.03, ctx.currentTime + 1.2);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      ambientOscRef.current = osc;
      gainNodeRef.current = gain;
    } catch (e) {
      console.warn('AudioContext notice:', e);
    }
  };

  const stopAmbientSound = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      try {
        gainNodeRef.current.gain.linearRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.3);
      } catch {}
    }
    setTimeout(() => {
      if (ambientOscRef.current) {
        try {
          ambientOscRef.current.stop();
          ambientOscRef.current.disconnect();
        } catch {}
        ambientOscRef.current = null;
      }
    }, 350);
  };

  // Speak narration sentence
  const speakNarration = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (isMuted || !text) return;

    window.speechSynthesis.cancel();

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'pt-BR';
    utter.rate = 1.05;
    utter.pitch = 0.95; // Distinct clinical specialist voice

    const voices = window.speechSynthesis.getVoices();
    const specialistVoice =
      voices.find(
        (v) =>
          v.lang.startsWith('pt') &&
          (v.name.includes('Daniel') ||
            v.name.includes('Google') ||
            v.name.includes('Thiago') ||
            v.name.includes('Helena') ||
            v.name.includes('Natural'))
      ) || voices.find((v) => v.lang.startsWith('pt'));

    if (specialistVoice) utter.voice = specialistVoice;

    window.speechSynthesis.speak(utter);
  };

  // Video playback timer & audio synchronization
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      startAmbientSound();

      // Trigger initial subtitle speech if starting from 0
      if (activeSubtitleIndex >= 0 && lastSpokenIdxRef.current !== activeSubtitleIndex) {
        speakNarration(subtitles[activeSubtitleIndex].text);
        lastSpokenIdxRef.current = activeSubtitleIndex;
      }

      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const nextTime = prev + 1;
          if (nextTime >= totalSeconds) {
            setIsPlaying(false);
            if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
              window.speechSynthesis.cancel();
            }
            stopAmbientSound();
            lastSpokenIdxRef.current = -1;
            return 0;
          }
          return nextTime;
        });
      }, 1000);
    } else {
      stopAmbientSound();
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      lastSpokenIdxRef.current = -1;
    }

    return () => {
      clearInterval(interval);
    };
  }, [isPlaying, totalSeconds]);

  // Synchronize audio speech when activeSubtitleIndex changes during playback
  useEffect(() => {
    if (isPlaying && activeSubtitleIndex >= 0 && lastSpokenIdxRef.current !== activeSubtitleIndex) {
      if (!isMuted) {
        speakNarration(subtitles[activeSubtitleIndex].text);
      }
      lastSpokenIdxRef.current = activeSubtitleIndex;
    }
  }, [isPlaying, activeSubtitleIndex, isMuted, subtitles]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      stopAmbientSound();
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newMuted = !isMuted;
    setIsMuted(newMuted);

    if (newMuted) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      stopAmbientSound();
    } else if (isPlaying) {
      startAmbientSound();
      if (activeSubtitle) {
        speakNarration(activeSubtitle);
      }
    }
  };

  const handleShareClick = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
    if (onShare) onShare();
  };

  const formatSec = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  return (
    <div className="w-full bg-surface-container-lowest rounded-xl shadow-md overflow-hidden flex flex-col border border-outline-variant/30">
      {/* Video Viewport */}
      <div
        onClick={togglePlay}
        className="relative w-full aspect-video bg-inverse-surface overflow-hidden flex items-center justify-center group cursor-pointer select-none"
      >
        <img
          alt={title}
          src={thumbnail}
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 ${
            isPlaying ? 'scale-105 opacity-70' : 'opacity-85 group-hover:scale-105'
          }`}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/85 via-transparent to-inverse-surface/30" />

        {/* Video Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-inverse-surface/75 backdrop-blur-md text-inverse-on-surface font-label-sm text-label-sm font-semibold shadow">
            <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-primary-fixed animate-ping' : 'bg-primary-fixed'}`} />
            Vídeo Explicativo com Especialista
          </span>
          <span className="px-2 py-0.5 rounded bg-inverse-surface/80 text-inverse-on-surface font-label-sm text-label-sm font-mono">
            {isPlaying ? `${formatSec(currentTime)} / ${duration}` : duration}
          </span>
        </div>

        {/* Center Play/Pause Button with Glassmorphism */}
        <button
          aria-label={isPlaying ? 'Pausar vídeo' : 'Reproduzir vídeo explicativo com áudio'}
          onClick={(e) => {
            e.stopPropagation();
            togglePlay();
          }}
          className="relative w-14 h-14 rounded-full bg-surface-container-lowest/80 backdrop-blur-md text-primary flex items-center justify-center shadow-lg transition-transform transform active:scale-90 group-hover:scale-110 cursor-pointer"
        >
          <span className="material-symbols-outlined text-4xl fill-1">
            {isPlaying ? 'pause' : 'play_arrow'}
          </span>
        </button>

        {/* Active Subtitle overlay on video */}
        {isPlaying && ccEnabled && activeSubtitle && (
          <div className="absolute bottom-11 left-3 right-3 flex justify-center pointer-events-none">
            <div className="bg-inverse-surface/90 backdrop-blur-md text-inverse-on-surface px-3 py-1.5 rounded-lg text-center max-w-sm border border-outline-variant/20 shadow-lg">
              <p className="font-label-md text-label-md font-medium leading-tight">
                {activeSubtitle}
              </p>
            </div>
          </div>
        )}

        {/* Video Bottom Strip with Audio Controls */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-inverse-on-surface font-label-sm text-label-sm">
          {/* Mute/Audio toggle button */}
          <button
            onClick={toggleMute}
            className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-inverse-surface/70 hover:bg-inverse-surface/90 backdrop-blur-md text-inverse-on-surface transition cursor-pointer"
            title={isMuted ? 'Ativar som do vídeo' : 'Silenciar áudio do vídeo'}
          >
            <span className="material-symbols-outlined text-sm">
              {isMuted ? 'volume_off' : 'volume_up'}
            </span>
            <span>{isMuted ? 'Mudo' : 'Áudio narrado • HD'}</span>

            {/* Sound wave equalizer animation when audio is active */}
            {isPlaying && !isMuted && (
              <span className="flex items-center gap-0.5 ml-1">
                <span className="w-0.5 h-2.5 bg-primary-fixed rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-0.5 h-3.5 bg-primary-fixed rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-0.5 h-2 bg-primary-fixed rounded-full animate-bounce [animation-delay:300ms]" />
              </span>
            )}
          </button>

          {/* CC Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCcEnabled(!ccEnabled);
            }}
            className={`px-2 py-1 rounded font-bold tracking-wider cursor-pointer transition ${
              ccEnabled
                ? 'bg-primary-fixed/20 text-primary-fixed'
                : 'bg-inverse-surface/60 text-inverse-on-surface opacity-60'
            }`}
          >
            {ccEnabled ? '[CC ATIVADO]' : '[CC DESATIVADO]'}
          </button>
        </div>
      </div>

      {/* Video Meta Description */}
      <div className="p-space-md bg-surface-container-lowest flex items-center justify-between">
        <div className="flex flex-col pr-2">
          <span className="font-label-lg text-label-lg text-on-surface font-bold">
            {title}
          </span>
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            {description}
          </span>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="font-label-sm text-[11px] text-[#006398] font-bold bg-[#cce5ff]/50 px-2 py-0.5 rounded-full inline-flex items-center gap-1 border border-[#006398]/20">
              <span className="material-symbols-outlined text-[13px]">record_voice_over</span>
              <span>Narração Oficial: Dr. Thiago Mello (Gemini Fenrir)</span>
            </span>
          </div>
        </div>
        <button
          onClick={handleShareClick}
          aria-label="Compartilhar vídeo"
          className="w-9 h-9 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-primary active:scale-95 transition-transform cursor-pointer shrink-0"
        >
          <span className="material-symbols-outlined text-lg">
            {copiedShare ? 'check' : 'share'}
          </span>
        </button>
      </div>
    </div>
  );
};
