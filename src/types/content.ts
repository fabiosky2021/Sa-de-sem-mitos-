export type PillarDay = 'segunda' | 'quarta' | 'sexta' | 'sabado';

export interface PillarInfo {
  id: PillarDay;
  dayName: string;
  theme: string;
  description: string;
  color: string;
  badgeBg: string;
  badgeText: string;
  icon: string;
  suggestedPrompts: string[];
}

export interface CascadeStep {
  title: string;
  subtitle: string;
  icon: string;
}

export interface PreparationStep {
  number: number;
  title: string;
  description: string;
}

export interface ContraindicationItem {
  title: string;
  description: string;
  icon: string;
  severity: 'error' | 'warning' | 'info';
}

export interface ClinicalSource {
  title: string;
  authors: string;
  url: string;
  badge?: string;
}

export interface VideoScript {
  titulo_video: string;
  gancho_inicial: string;
  desenvolvimento: string;
  chamada_para_acao: string;
  legendas_sugeridas: string[];
}

export interface ScientificVerdict {
  status: 'COMPROVADO' | 'COMPROVADO COM RESSALVAS' | 'DESMISTIFICADO / FALSO' | 'SEM EVIDÊNCIA CLÍNICA';
  evidenceLevel: string;
  summary: string;
}

export interface GeneratedArticle {
  id: string;
  createdAt: string;
  pilar_dia: string;
  categoria: string;
  pilarId: PillarDay;
  evidenceBadge: string;
  readingTime: string;
  audioTime: string;
  titulo: string;
  subtitulo: string;
  resumo: string;
  reviewer: {
    name: string;
    role: string;
    avatar: string;
  };
  video: {
    title: string;
    description: string;
    duration: string;
    thumbnail: string;
    subtitles: { time: number; text: string }[];
  };
  audio: {
    duration: string;
    script: string;
    sentences: string[];
  };
  verdict: ScientificVerdict;
  conteudo_paragrafos: string[];
  biologicalCascade?: CascadeStep[];
  preparationSteps?: PreparationStep[];
  contraindications?: ContraindicationItem[];
  mito_desmistificado: string;
  fato_cientifico: string;
  dicas_praticas: string[];
  analise_visual?: string;
  imagePreview?: string;
  roteiro_video: VideoScript;
  audio_script: string;
  tags: string[];
  referencias_cientificas: ClinicalSource[];
  aviso_legal: string;
  upvotes?: number;
  downvotes?: number;
}
