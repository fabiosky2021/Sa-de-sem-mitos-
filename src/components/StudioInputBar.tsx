import React, { useState, useRef, useEffect } from 'react';
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
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imageMimeType, setImageMimeType] = useState<string>('image/jpeg');
  const [imageFileName, setImageFileName] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  // Web Speech API initialization
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'pt-BR';

      recognition.onstart = () => {
        setIsListening(true);
        setSpeechError(null);
      };

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        if (transcript) {
          setPrompt((prev) => {
            const trimmed = prev.trim();
            return trimmed ? `${trimmed} ${transcript}` : transcript;
          });
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition notice:', event.error);
        if (event.error === 'not-allowed') {
          setSpeechError('Permissão de microfone negada no navegador.');
        } else {
          setSpeechError(`Aviso de voz: ${event.error}`);
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      setSpeechError('Reconhecimento de fala nativo não suportado neste dispositivo.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setSpeechError(null);
      try {
        recognitionRef.current.start();
      } catch {
        recognitionRef.current.stop();
        setTimeout(() => {
          recognitionRef.current?.start();
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
    if (!prompt.trim() && !imageBase64) return;

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

    await onGenerate({
      prompt: prompt.trim(),
      dayPillar: selectedPillar === 'auto' ? undefined : selectedPillar,
      imageBase64: imageBase64 || undefined,
      mimeType: imageMimeType,
      imagePreview: imagePreview || undefined,
    });
  };

  const QUICK_SUGGESTIONS = [
    {
      label: '🥗 Analisar Prato / Dieta',
      text: 'Como balancear este prato seguindo a regra dos 50% de vegetais e fontes proteicas?',
      pillar: 'segunda' as PillarDay,
    },
    {
      label: '🍵 Chá de Hibisco: Doses Seguras',
      text: 'Quais os reais benefícios do chá de hibisco, dosagem diária recomendada e contraindicações?',
      pillar: 'quarta' as PillarDay,
    },
    {
      label: '❌ Mito: Água com Limão em Jejum',
      text: 'Água morna com limão em jejum queima gordura e alcaliniza o organismo ou é mito?',
      pillar: 'sabado' as PillarDay,
    },
    {
      label: '😴 Protocolo de Higiene do Sono',
      text: 'Quais hábitos ao acordar e ao deitar ajudam a sincronizar o ritmo circadiano e melatonina?',
      pillar: 'sexta' as PillarDay,
    },
    {
      label: '🔍 Ler Rótulo Nutricional',
      text: 'O que devo observar no rótulo nutricional para não cair na armadilha de alimentos ultraprocessados?',
      pillar: 'segunda' as PillarDay,
    },
    {
      label: '💧 Meta Hídrica por Peso',
      text: 'Como calcular a ingestão hídrica ideal para o peso e por que chá não substitui água pura?',
      pillar: 'sexta' as PillarDay,
    },
  ];

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
              Entrada por texto, voz com microfone ativo e upload de fotos para análise
            </p>
          </div>
        </div>

        {/* Pillar Switcher */}
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
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => onPillarSelect(p.id)}
                className={`px-2.5 py-1 text-xs rounded-full font-semibold transition cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? `${p.badgeBg} ${p.badgeText} ring-1 ring-primary/30 shadow-sm`
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                {p.dayName.split('-')[0]}
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

      {/* Voice Listening Active Alert */}
      {isListening && (
        <div className="p-2.5 rounded-lg bg-primary-fixed/30 border border-primary/30 flex items-center justify-between text-xs text-primary font-semibold">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping" />
            <span>Microfone ativo: Fale agora em português...</span>
          </div>
          <button
            type="button"
            onClick={toggleListening}
            className="underline text-[11px] font-bold cursor-pointer"
          >
            Concluir fala
          </button>
        </div>
      )}

      {speechError && (
        <div className="p-2 rounded-lg bg-error-container/40 text-error font-label-sm text-xs flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">warning</span>
          <span>{speechError}</span>
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
            className="w-full bg-transparent p-3 pr-28 font-body-sm text-body-sm text-on-surface placeholder-on-surface-variant/60 focus:outline-none resize-none leading-relaxed"
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
                  ? 'bg-primary-fixed text-on-primary-fixed font-bold'
                  : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
              }`}
            >
              <span className="material-symbols-outlined text-xl">photo_camera</span>
            </button>

            {/* Active Microphone Button */}
            <button
              type="button"
              onClick={toggleListening}
              title={isListening ? 'Parar gravação' : 'Falar via microfone'}
              className={`w-9 h-9 rounded-lg flex items-center justify-center transition cursor-pointer ${
                isListening
                  ? 'bg-error text-on-error animate-pulse shadow-md'
                  : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
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
              className="px-3 py-1.5 rounded-lg bg-primary text-on-primary font-bold text-xs flex items-center gap-1 disabled:opacity-40 hover:opacity-90 active:scale-95 transition cursor-pointer shadow-sm"
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

      {/* Suggested Fast Action Buttons Row */}
      <div className="flex flex-col gap-1.5 pt-1">
        <span className="font-label-sm text-[11px] text-on-surface-variant font-bold uppercase tracking-wider">
          Sugestões rápidas do estúdio:
        </span>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {QUICK_SUGGESTIONS.map((sug, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setPrompt(sug.text);
                onPillarSelect(sug.pillar);
              }}
              className="px-3 py-1.5 rounded-lg text-xs bg-surface-container hover:bg-surface-container-high text-on-surface font-medium transition whitespace-nowrap cursor-pointer border border-outline-variant/30 flex items-center gap-1 shrink-0"
            >
              <span>{sug.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
