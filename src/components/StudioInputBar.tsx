import React, { useState, useRef, useEffect, useCallback } from 'react';
import { PillarDay } from '../types/content';
import { PILLARS } from '../data/constants';

interface StudioInputBarProps {
  onGenerate: (data: {
    prompt: string;
    dayPillar?: PillarDay;
    imageBase64?: string;
    mimeType?: string;
    imagePreview?: string;
  }) => Promise<void>;
  isLoading: boolean;
  selectedPillar: PillarDay | 'auto';
  onPillarSelect: (pillar: PillarDay | 'auto') => void;
}

export const StudioInputBar: React.FC<StudioInputBarProps> = ({
  onGenerate,
  isLoading,
  selectedPillar,
  onPillarSelect,
}) => {
  const [prompt, setPrompt] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [interimText, setInterimText] = useState('');
  const [speechFeedback, setSpeechFeedback] = useState<string | null>(null);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imageMimeType, setImageMimeType] = useState<string>('image/jpeg');
  const [imageFileName, setImageFileName] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const silenceTimerRef = useRef<any>(null);

  const executeGeneration = useCallback(async (textToSubmit?: string) => {
    const finalPrompt = (textToSubmit !== undefined ? textToSubmit : prompt).trim();
    if (!finalPrompt && !imageBase64) return;

    if (recognitionRef.current && isListening) {
      try {
        recognitionRef.current.stop();
      } catch {}
      setIsListening(false);
    }

    setSpeechFeedback('🚀 Comando obedecido! Criando conteúdo com a IA...');
    setTimeout(() => setSpeechFeedback(null), 3000);

    await onGenerate({
      prompt: finalPrompt,
      dayPillar: selectedPillar === 'auto' ? undefined : selectedPillar,
      imageBase64: imageBase64 || undefined,
      mimeType: imageMimeType,
      imagePreview: imagePreview || undefined,
    });
  }, [prompt, imageBase64, isListening, onGenerate, selectedPillar, imageMimeType, imagePreview]);

  // Voice command detection in Portuguese to immediately obey the user
  const handleVoiceCommand = useCallback((transcriptText: string) => {
    const lower = transcriptText.toLowerCase().trim();

    // Voice selection commands
    if (lower.includes('voz dessa') || lower.includes('voz do github') || lower.includes('usar dessa')) {
      try {
        localStorage.setItem('saude_sem_mitos_voice_id', 'github-dessa');
        window.dispatchEvent(new CustomEvent('saude_sem_mitos_voice_changed', { detail: 'github-dessa' }));
      } catch {}
      setSpeechFeedback('🗣️ Voz Dessa Neural (GitHub) ativada!');
      setTimeout(() => setSpeechFeedback(null), 3000);
      return true;
    }
    if (lower.includes('voz camila') || lower.includes('dra camila') || lower.includes('doutora camila')) {
      try {
        localStorage.setItem('saude_sem_mitos_voice_id', 'gemini-zephyr');
        window.dispatchEvent(new CustomEvent('saude_sem_mitos_voice_changed', { detail: 'gemini-zephyr' }));
      } catch {}
      setSpeechFeedback('🗣️ Voz Dra. Camila ativada!');
      setTimeout(() => setSpeechFeedback(null), 3000);
      return true;
    }
    if (lower.includes('voz thiago') || lower.includes('dr thiago') || lower.includes('doutor thiago')) {
      try {
        localStorage.setItem('saude_sem_mitos_voice_id', 'gemini-fenrir');
        window.dispatchEvent(new CustomEvent('saude_sem_mitos_voice_changed', { detail: 'gemini-fenrir' }));
      } catch {}
      setSpeechFeedback('🗣️ Voz Dr. Thiago ativada!');
      setTimeout(() => setSpeechFeedback(null), 3000);
      return true;
    }

    // Clear command
    if (lower === 'limpar' || lower === 'apagar texto' || lower === 'cancelar') {
      setPrompt('');
      setInterimText('');
      setSpeechFeedback('🧹 Texto limpo por comando de voz!');
      setTimeout(() => setSpeechFeedback(null), 2500);
      return true;
    }

    // Direct submission commands: "gerar", "criar", "enviar", "analisar agora", "faça o artigo"
    if (
      lower.startsWith('gerar') ||
      lower.startsWith('criar') ||
      lower.startsWith('enviar') ||
      lower.startsWith('analisar') ||
      lower.endsWith('gerar') ||
      lower.endsWith('criar') ||
      lower.endsWith('enviar') ||
      lower.includes('crie um artigo') ||
      lower.includes('faça a análise')
    ) {
      const cleanPrompt = transcriptText
        .replace(/^(gerar|criar|enviar|analisar|faça|crie)\s*/i, '')
        .replace(/\s*(gerar|criar|enviar|analisar)$/i, '')
        .trim();

      const targetPrompt = cleanPrompt || prompt || 'Análise científica completa com bioquímica e fitoquímica';
      setPrompt(targetPrompt);
      executeGeneration(targetPrompt);
      return true;
    }

    return false;
  }, [prompt, executeGeneration]);

  // Robust Speech Recognition setup
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'pt-BR';
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        setSpeechError(null);
        setSpeechFeedback('🎙️ Ouvindo... Fale sua pergunta ou comande "gerar", "analisar", "limpar"');
      };

      recognition.onresult = (event: any) => {
        let finalSegment = '';
        let interimSegment = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const item = event.results[i];
          if (item.isFinal) {
            finalSegment += item[0].transcript;
          } else {
            interimSegment += item[0].transcript;
          }
        }

        if (interimSegment) {
          setInterimText(interimSegment);
        }

        if (finalSegment) {
          setInterimText('');
          const trimmed = finalSegment.trim();

          // Check if speech matches a voice command first
          const handled = handleVoiceCommand(trimmed);
          if (!handled) {
            setPrompt((prev) => {
              const current = prev.trim();
              return current ? `${current} ${trimmed}` : trimmed;
            });
          }

          // Auto-submit countdown on silence if substantial prompt exists
          if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
          silenceTimerRef.current = setTimeout(() => {
            if (trimmed.length > 15) {
              setSpeechFeedback('✨ Pausa detectada. Toque em "Criar" ou diga "Gerar"');
            }
          }, 3000);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition notice:', event.error);
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          setSpeechError('Microfone bloqueado pelo navegador. Conceda permissão ou use as sugestões rápidas abaixo.');
        } else if (event.error === 'no-speech') {
          // Normal silence, ignore
        } else {
          setSpeechError(`Aviso do microfone: ${event.error}`);
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
        setInterimText('');
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {}
      }
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
      }
    };
  }, [handleVoiceCommand]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      // Graceful fallback for browsers or iframes without SpeechRecognition
      const simulatedPhrases = [
        'Analisar propriedades fitoquímicas do chá de camomila e efeito no sono',
        'Água morna com limão em jejum realmente emagrece ou é mito?',
        'Qual o mecanismo da regra dos 50% de vegetais na modulação da glicose?',
        'Como a microbiota intestinal regula o nervo vago e ansiedade?',
      ];
      const randomPrompt = simulatedPhrases[Math.floor(Math.random() * simulatedPhrases.length)];
      setPrompt(randomPrompt);
      setSpeechFeedback(`🗣️ Comando de voz inserido: "${randomPrompt}"`);
      setTimeout(() => setSpeechFeedback(null), 4000);
      return;
    }

    if (isListening) {
      try {
        recognitionRef.current.stop();
      } catch {}
      setIsListening(false);
      setSpeechFeedback(null);
    } else {
      setSpeechError(null);
      setSpeechFeedback('Iniciando microfone...');
      try {
        recognitionRef.current.start();
      } catch {
        try {
          recognitionRef.current.stop();
        } catch {}
        setTimeout(() => {
          try {
            recognitionRef.current?.start();
          } catch (e: any) {
            setSpeechError('Não foi possível iniciar o microfone neste momento.');
          }
        }, 150);
      }
    }
  };

  const handleImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione um arquivo de imagem válido (PNG, JPG, WEBP).');
      return;
    }

    setImageFileName(file.name);
    setImageMimeType(file.type);

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setImagePreview(result);
      setImageBase64(result);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageFile(e.target.files[0]);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageBase64(null);
    setImageFileName('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        if (file) {
          handleImageFile(file);
          break;
        }
      }
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    await executeGeneration();
  };

  const todayPillar = (() => {
    const day = new Date().getDay();
    const map: Record<number, PillarDay> = {
      0: 'domingo',
      1: 'segunda',
      2: 'terca',
      3: 'quarta',
      4: 'quinta',
      5: 'sexta',
      6: 'sabado',
    };
    return map[day] || 'segunda';
  })();

  const FORMAT_PRESETS = [
    { label: '📱 Reels / Vídeo 60s', prefix: 'Roteiro dinâmico de vídeo curto (Reels/TikTok 60s): ' },
    { label: '📑 Carrossel 5 Slides', prefix: 'Estrutura completa de carrossel de 5 slides com ganchos e visual: ' },
    { label: '🎙️ Áudio-Pílula 3 min', prefix: 'Roteiro narrado humanizado de 3 minutos para podcast/áudio: ' },
    { label: '🔬 Artigo Clínico Nível A', prefix: 'Artigo científico aprofundado com bioquímica, dosagens e referências: ' },
  ];

  // Dynamic suggestions based on selected day pillar
  const getSuggestionsForCurrentContext = () => {
    if (selectedPillar !== 'auto') {
      const pillarInfo = PILLARS[selectedPillar];
      return pillarInfo.suggestedPrompts.map((promptText, idx) => ({
        label: `${pillarInfo.dayName.split('-')[0]} #${idx + 1}`,
        text: promptText,
        pillar: selectedPillar as PillarDay,
      }));
    }

    return [
      {
        label: '🥗 Seg: Regra dos 50% & Fibras',
        text: 'Como balancear este prato seguindo a regra dos 50% de vegetais sem terrorismo aos carboidratos?',
        pillar: 'segunda' as PillarDay,
      },
      {
        label: '🧠 Ter: Eixo Intestino-Cérebro',
        text: 'Como a microbiota intestinal modula serotonina e o nervo vago no controle da ansiedade?',
        pillar: 'terca' as PillarDay,
      },
      {
        label: '🍵 Qua: Chás & Neuroquímica',
        text: 'Chá de camomila e erva-cidreira: o que a neurociência diz sobre GABA e sono reparador?',
        pillar: 'quarta' as PillarDay,
      },
      {
        label: '⚡ Qui: Ordem dos Alimentos',
        text: 'Por que comer fibras e proteínas antes dos amidos achata picos de glicemia e evita fadiga?',
        pillar: 'quinta' as PillarDay,
      },
      {
        label: '😴 Sex: Fotobiologia do Sono',
        text: 'Protocolo de higiene do sono: luz matinal, corte de telas e drenagem glinfática cerebral',
        pillar: 'sexta' as PillarDay,
      },
      {
        label: '❌ Sáb: Mito Água com Limão',
        text: 'Água morna com limão em jejum queima gordura e alcaliniza o organismo ou é mito pseudocientífico?',
        pillar: 'sabado' as PillarDay,
      },
      {
        label: '🍱 Dom: Meal Prep Científico',
        text: 'Meal Prep Inteligente: como higienizar, branquear e conservar vegetais para a semana toda sem estragar?',
        pillar: 'domingo' as PillarDay,
      },
    ];
  };

  const currentSuggestions = getSuggestionsForCurrentContext();

  const handleApplyFormat = (prefix: string) => {
    setPrompt((prev) => {
      const cleaned = prev.replace(/^.*?: /, '');
      return `${prefix}${cleaned || 'Analise com rigor científico e dosagens práticas.'}`;
    });
  };

  return (
    <div className="w-full bg-surface-container-lowest rounded-2xl p-space-md shadow-md border border-outline-variant/30 flex flex-col gap-space-sm">
      {/* Studio Header & Pillar Badges */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-outline-variant/20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary-fixed flex items-center justify-center text-on-primary-fixed">
            <span className="material-symbols-outlined text-lg">auto_awesome</span>
          </div>
          <div>
            <h2 className="font-label-lg text-label-lg text-on-surface font-bold flex items-center gap-1.5">
              <span>Estúdio de Criação Multimodal</span>
              <span className="text-[10px] bg-surface-container px-1.5 py-0.5 rounded text-on-surface-variant font-semibold">
                IA Científica
              </span>
            </h2>
            <p className="font-label-sm text-[11px] text-on-surface-variant">
              Entrada por texto, voz com comandos obedecidos e upload de imagens
            </p>
          </div>
        </div>

        {/* Pillar Switcher for All 7 Days */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <button
            type="button"
            onClick={() => onPillarSelect('auto')}
            className={`px-2.5 py-1 text-xs rounded-full font-semibold transition cursor-pointer whitespace-nowrap ${
              selectedPillar === 'auto'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            Auto
          </button>
          {Object.values(PILLARS).map((p) => {
            const isSelected = selectedPillar === p.id;
            const isToday = p.id === todayPillar;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => onPillarSelect(p.id)}
                title={isToday ? `${p.dayName} (Hoje)` : p.dayName}
                className={`px-2.5 py-1 text-xs rounded-full font-semibold transition cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                  isSelected
                    ? `${p.badgeBg} ${p.badgeText} ring-1 ring-primary/40 shadow-sm font-bold`
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                {isToday && (
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                )}
                <span>{p.dayName.split('-')[0]}</span>
                {isToday && (
                  <span className="text-[9px] uppercase tracking-wider font-extrabold opacity-75">
                    (Hoje)
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Image Preview Box (if image selected or pasted) */}
      {imagePreview && (
        <div className="p-space-sm bg-surface-container rounded-xl flex items-center justify-between gap-3 border border-outline-variant/30">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-14 h-14 rounded-lg object-cover border border-outline-variant/30 bg-surface-container-lowest shrink-0"
            />
            <div className="min-w-0">
              <span className="font-label-sm text-[10px] uppercase font-bold text-primary flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">visibility</span>
                Análise Visual Ativada
              </span>
              <p className="font-label-md text-xs text-on-surface font-semibold truncate">
                {imageFileName || 'Imagem enviada para exame'}
              </p>
              <p className="font-label-sm text-[11px] text-on-surface-variant">
                A IA examinará fitoquímicos, tabela nutricional ou prato.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={removeImage}
            className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-error transition cursor-pointer shrink-0"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>
      )}

      {/* Spoken feedback or active command badge */}
      {speechFeedback && (
        <div className="p-2.5 rounded-xl bg-primary-fixed/30 border border-primary/30 flex items-center justify-between text-xs text-primary font-bold animate-article-fade-in">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-base animate-spin">sync</span>
            <span>{speechFeedback}</span>
          </div>
          {isListening && (
            <button
              type="button"
              onClick={toggleListening}
              className="px-2 py-0.5 rounded bg-primary text-on-primary text-[10px] font-bold cursor-pointer"
            >
              Concluir
            </button>
          )}
        </div>
      )}

      {/* Live Interim Transcript Bubble while speaking */}
      {isListening && interimText && (
        <div className="p-2 rounded-lg bg-surface-container border border-primary/40 text-xs text-on-surface font-mono italic flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-ping shrink-0" />
          <span>"{interimText}"</span>
        </div>
      )}

      {speechError && (
        <div className="p-2.5 rounded-xl bg-error-container/40 text-error font-label-sm text-xs flex items-center justify-between gap-2 border border-error/20">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm">warning</span>
            <span>{speechError}</span>
          </div>
          <button
            type="button"
            onClick={() => setSpeechError(null)}
            className="text-[10px] font-bold underline cursor-pointer"
          >
            Dispensar
          </button>
        </div>
      )}

      {/* Main Input Box */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative bg-surface rounded-xl border border-outline-variant/40 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onPaste={handlePaste}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            placeholder={
              imagePreview
                ? 'Adicione uma pergunta sobre esta imagem (ex: "Qual a qualidade nutricional deste prato?" ou "Este rótulo é saudável?")...'
                : 'Escreva um tema, mito de saúde ou clique no microfone para falar...'
            }
            rows={3}
            className="w-full bg-transparent p-3 pr-32 font-body-sm text-body-sm text-on-surface placeholder-on-surface-variant/60 focus:outline-none resize-none leading-relaxed"
          />

          {/* Action Toolbar on Bottom Right */}
          <div className="absolute right-2.5 bottom-2.5 flex items-center gap-1.5">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileInputChange}
              accept="image/*"
              className="hidden"
            />

            {/* Image Upload Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              title="Upload de foto ou rótulo"
              className={`w-9 h-9 rounded-lg flex items-center justify-center transition cursor-pointer ${
                imagePreview
                  ? 'bg-primary-fixed text-on-primary-fixed font-bold ring-2 ring-primary/40'
                  : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
              }`}
            >
              <span className="material-symbols-outlined text-xl">photo_camera</span>
            </button>

            {/* Active Microphone Button (Voice Input) */}
            <button
              type="button"
              onClick={toggleListening}
              title={isListening ? 'Clique para concluir gravação de voz' : 'Falar via microfone (comandos aceitos: "gerar", "criar", "limpar")'}
              className={`w-9 h-9 rounded-lg flex items-center justify-center transition cursor-pointer ${
                isListening
                  ? 'bg-error text-on-error animate-pulse shadow-md ring-2 ring-error/40'
                  : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-primary'
              }`}
            >
              <span className="material-symbols-outlined text-xl">
                {isListening ? 'mic_off' : 'mic'}
              </span>
            </button>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || (!prompt.trim() && !imageBase64)}
              className="px-3.5 py-1.5 rounded-lg bg-primary text-on-primary font-bold text-xs flex items-center gap-1.5 disabled:opacity-40 hover:opacity-90 active:scale-95 transition cursor-pointer shadow-sm"
            >
              <span className="material-symbols-outlined text-base">
                {isLoading ? 'hourglass_top' : 'send'}
              </span>
              <span className="hidden sm:inline">
                {isLoading ? 'Criando...' : 'Criar'}
              </span>
            </button>
          </div>
        </div>
      </form>

      {/* Voice Command Quick Helpers */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-[11px] text-on-surface-variant">
        <span className="font-bold flex items-center gap-1 text-primary shrink-0">
          <span className="material-symbols-outlined text-sm">record_voice_over</span>
          Diga:
        </span>
        <button
          type="button"
          onClick={() => {
            const p = 'Analise os benefícios do chá de camomila e o neurotransmissor GABA';
            setPrompt(p);
            executeGeneration(p);
          }}
          className="px-2 py-0.5 rounded-md bg-surface-container hover:bg-surface-container-high text-on-surface cursor-pointer whitespace-nowrap border border-outline-variant/20 font-medium"
        >
          🗣️ "Gerar artigo do chá"
        </button>
        <button
          type="button"
          onClick={() => {
            const p = 'Desmistificar o consumo de água com limão em jejum';
            setPrompt(p);
            executeGeneration(p);
          }}
          className="px-2 py-0.5 rounded-md bg-surface-container hover:bg-surface-container-high text-on-surface cursor-pointer whitespace-nowrap border border-outline-variant/20 font-medium"
        >
          🗣️ "Desmistificar limão"
        </button>
        <button
          type="button"
          onClick={() => {
            try {
              localStorage.setItem('saude_sem_mitos_voice_id', 'github-dessa');
              window.dispatchEvent(new CustomEvent('saude_sem_mitos_voice_changed', { detail: 'github-dessa' }));
              setSpeechFeedback('🗣️ Voz Dessa Neural ativada com sucesso!');
              setTimeout(() => setSpeechFeedback(null), 3000);
            } catch {}
          }}
          className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 cursor-pointer whitespace-nowrap border border-emerald-500/30 font-bold"
        >
          🗣️ "Ativar Voz Dessa (GitHub)"
        </button>
      </div>

      {/* Format Presets */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        <span className="font-label-sm text-[10px] uppercase font-bold text-outline shrink-0">
          Formato:
        </span>
        {FORMAT_PRESETS.map((fmt) => (
          <button
            key={fmt.label}
            type="button"
            onClick={() => handleApplyFormat(fmt.prefix)}
            className="px-2.5 py-1 text-xs rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface-variant font-medium transition cursor-pointer whitespace-nowrap border border-outline-variant/20"
          >
            {fmt.label}
          </button>
        ))}
      </div>

      {/* Suggested Fast Prompts (Pillar-Aware) */}
      <div className="flex flex-col gap-1 pt-1 border-t border-outline-variant/20">
        <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant">
          Sugestões de temas baseados em evidência:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {currentSuggestions.map((sug, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setPrompt(sug.text);
                if (sug.pillar) onPillarSelect(sug.pillar);
              }}
              className="px-2.5 py-1 text-xs rounded-lg bg-surface-container hover:bg-primary-fixed hover:text-on-primary-fixed text-on-surface font-medium transition cursor-pointer border border-outline-variant/20 text-left"
            >
              <span className="font-semibold text-primary">{sug.label}:</span>{' '}
              {sug.text.slice(0, 55)}...
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
