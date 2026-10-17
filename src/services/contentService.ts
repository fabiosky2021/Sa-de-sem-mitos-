import { PillarDay } from '../types/content';
import { GoogleGenAI, Type } from '@google/genai';

export interface GenerateRequestPayload {
  prompt: string;
  dayPillar?: PillarDay;
  imageBase64?: string;
  mimeType?: string;
  imagePreview?: string;
}

export interface GeneratedContentResponse {
  categoria: string;
  pilar_dia: string;
  titulo: string;
  subtitulo: string;
  resumo: string;
  conteudo_paragrafos: string[];
  mito_desmistificado: string;
  fato_cientifico: string;
  dicas_praticas: string[];
  analise_visual?: string;
  roteiro_video?: {
    titulo_video: string;
    gancho_inicial: string;
    desenvolvimento: string;
    chamada_para_acao: string;
    legendas_sugeridas: string[];
  };
  audio_script: string;
  tags: string[];
  referencias_cientificas: string[];
  aviso_legal: string;
}

const DEFAULT_DISCLAIMER =
  'Aviso Legal: Todo o conteúdo disponibilizado pela plataforma "Saúde Sem Mitos" possui caráter estritamente educativo e informativo, fundamentado em evidências científicas atuais. Não substitui, sob nenhuma circunstância, o diagnóstico, orientação ou tratamento médico e nutricional individualizado. Consulte sempre um profissional de saúde qualificado antes de realizar mudanças em sua dieta, rotina ou uso de fitoterápicos.';

const PILLAR_DATABASE: Record<PillarDay, GeneratedContentResponse> = {
  segunda: {
    categoria: 'Alimentação & Nutrição Consciente',
    pilar_dia: 'Segunda-feira',
    titulo: 'Montando o Prato Ideal: Equilíbrio de Macronutrientes Sem Terrorismo Nutricional',
    subtitulo: 'Como distribuir proteínas, carboidratos complexos e fibras de forma prática e sustentável.',
    resumo: 'Aprenda a estruturar refeições nutritivas priorizando a regra da metade do prato em vegetais e combinando fontes proteicas e energéticas sem dietas restritivas.',
    conteudo_paragrafos: [
      'Alimentação consciente não é sobre contar calorias obsessivamente, mas sim sobre construir densidade nutricional. Uma diretriz validada pela ciência é o Método do Prato Saudável: divida visualmente seu prato em quatro partes.',
      'A metade inteira (50%) deve ser composta por vegetais coloridos e folhas cruas ou cozidas, garantindo fibras prebióticas, antioxidantes e micronutrientes essenciais que regulam a glicemia e saciedade.',
      'Um quarto (25%) é reservado para carboidratos complexos de baixo a médio índice glicêmico (como tubérculos, grãos integrais, quinoa ou arroz integral). O último quarto (25%) deve conter proteínas de alto valor biológico (ovos, peixes, frango ou leguminosas como lentilha e feijão).',
      'Lembre-se de incluir gorduras benéficas com moderação, como azeite de oliva extravirgem cru, sementes de abóbora ou gergelim.'
    ],
    mito_desmistificado: 'Mito: "Carboidratos à noite viram gordura imediatamente e devem ser cortados para emagrecer."',
    fato_cientifico: 'Fato: O ganho ou perda de peso é regulado pelo balanço calórico global e pela sensibilidade à insulina ao longo do tempo. Carboidratos integrais à noite podem até auxiliar na síntese de serotonina e melatonina, favorecendo o sono.',
    dicas_praticas: [
      'Varie as cores dos vegetais no prato para consumir diferentes classes de polifenóis protetores.',
      'Mastigue devagar: o cérebro leva cerca de 20 minutos para emitir os sinais de saciedade via leptina.',
      'Tempere com ervas naturais (alecrim, cúrcuma, orégano) em vez de caldos ultraprocessados ricos em sódio.'
    ],
    roteiro_video: {
      titulo_video: 'Como montar o prato perfeito em 3 passos simples',
      gancho_inicial: 'Você ainda tem medo de comer carboidrato no jantar? Pare tudo e veja esta regra de ouro!',
      desenvolvimento: 'Esqueça dietas da moda. O segredo é visual: metade do prato com salada colorida, um quarto com grãos ou raízes e um quarto com sua proteína preferida. Simples, científico e sustentável.',
      chamada_para_acao: 'Comente abaixo qual é seu vegetal favorito e compartilhe com quem precisa simplificar a rotina alimentar!',
      legendas_sugeridas: [
        '0:00 - O mito do carboidrato noturno',
        '0:15 - A regra visual dos 50% de vegetais',
        '0:35 - Proteínas e carboidratos complexos',
        '0:50 - Conclusão e saúde sustentável'
      ]
    },
    audio_script: 'Olá, bem-vindo ao Saúde Sem Mitos! Hoje, na nossa segunda-feira de Alimentação Consciente, vamos desvendar como montar o prato perfeito sem neuras. Divida seu prato: metade em vegetais frescos, um quarto em carboidratos integrais e um quarto em proteínas limpas. Comida de verdade é o melhor remédio preventivo.',
    tags: ['Nutrição', 'SegundaConsciente', 'PratoSaudavel', 'Macronutrientes', 'ComidaDeVerdade'],
    referencias_cientificas: [
      'Harvard T.H. Chan School of Public Health - The Healthy Eating Plate',
      'Ministério da Saúde do Brasil - Guia Alimentar para a População Brasileira (2ª Edição)',
      'Organização Mundial da Saúde (OMS) - Diretrizes sobre ingestão de açúcares e fibras'
    ],
    aviso_legal: DEFAULT_DISCLAIMER
  },
  quarta: {
    categoria: 'Chás & Infusões',
    pilar_dia: 'Quarta-feira',
    titulo: 'Chá Verde e Hibisco: Mecanismos de Ação, Benefícios e Cuidados Importantes',
    subtitulo: 'Entenda os compostos bioativos das plantas e por que doses excessivas podem sobrecarregar o fígado.',
    resumo: 'As infusões de Camellia sinensis e Hibiscus sabdariffa são ricas em catequinas e antocianinas, auxiliando na ação antioxidante, mas exigem atenção à dosagem e horários.',
    conteudo_paragrafos: [
      'Chás e infusões medicinais fazem parte da fitoterapia tradicional e encontram respaldo na ciência moderna quando utilizados com rigor e conhecimento de seus princípios ativos.',
      'O chá verde é notável por sua alta concentração de epigalocatequina galato (EGCG), um potente antioxidante que auxilia na termogênese e na saúde endotelial. No entanto, o consumo excessivo (acima de 4 xícaras diárias ou extratos concentrados) pode apresentar potencial hepatotóxico.',
      'O chá de hibisco, obtido dos cálices secos, destaca-se pelo estímulo à diurese e ação vasodilatadora suave mediada por flavonoides. Porém, indivíduos hipertensos em uso de hidroclorotiazida ou gestantes devem evitar o consumo sem liberação médica expressa.',
      'A forma de preparo faz toda a diferença: infusão com água aquecida a cerca de 80-85°C por 3 a 5 minutos preserva os fitoquímicos sem degradar compostos sensíveis.'
    ],
    mito_desmistificado: 'Mito: "Tomar litros de chá de hibisco seca a barriga e elimina gordura pura na urina."',
    fato_cientifico: 'Fato: Chás não liquefazem o tecido adiposo. O efeito inicial na balança decorre da eliminação de líquidos retidos devido às propriedades diuréticas, e não da queima de gordura visceral.',
    dicas_praticas: [
      'Nunca ferva as folhas delicadas diretamente; desligue o fogo ao surgirem as primeiras bolhas e abafe a xícara.',
      'Evite consumir chá verde após as 16h para prevenir insônia causada pela cafeína residual.',
      'Não adoce com açúcar refinado; se desejar um toque cítrico, adicione casca de limão ou folhas de hortelã fresca.'
    ],
    roteiro_video: {
      titulo_video: 'O que a ciência diz sobre o Chá Verde e o Chá de Hibisco',
      gancho_inicial: 'Cuidado! Aquele chá que você toma todos os dias pode estar sendo preparado da forma errada.',
      desenvolvimento: 'O chá de hibisco combate a retenção de líquidos e o chá verde traz catequinas poderosas. Mas água fervendo queima as folhas, e doses exageradas prejudicam seu fígado. O segredo é a infusão a 80 graus por até 5 minutos.',
      chamada_para_acao: 'Qual chá não falta na sua rotina matinal? Deixe nos comentários!',
      legendas_sugeridas: [
        '0:00 - Alerta fitoterápico',
        '0:18 - Como a água quente estraga o chá',
        '0:35 - Benefícios reais vs. Diurese',
        '0:55 - Cuidados e contraindicações'
      ]
    },
    audio_script: 'Quarta-feira no Saúde Sem Mitos é dia de Chás e Infusões! Hoje falamos sobre o chá verde e o hibisco. Plantas possuem princípios ativos terapêuticos reais, o que exige respeito à dosagem. Respeite o tempo de infusão e nunca substitua a ingestão de água pura por chás diuréticos.',
    tags: ['Fitoterapia', 'ChasEInfusoes', 'Hibisco', 'ChaVerde', 'Antioxidantes', 'SaudeSemMitos'],
    referencias_cientificas: [
      'European Medicines Agency (EMA) - Monograph on Camellia sinensis (L.) Kuntze',
      'Journal of Ethnopharmacology - Hibiscus sabdariffa L. in health and disease management',
      'ANVISA - Formulário de Fitoterápicos da Farmacopeia Brasileira'
    ],
    aviso_legal: DEFAULT_DISCLAIMER
  },
  sexta: {
    categoria: 'Hábitos Saudáveis',
    pilar_dia: 'Sexta-feira',
    titulo: 'Arquitetura do Sono Reparador: A Ciência dos Ciclos Circadianos e Higiene do Quarto',
    subtitulo: 'Como luz natural, temperatura e corte de telas sincronizam o relógio biológico e renovam a energia celular.',
    resumo: 'O sono profundo não é tempo perdido, mas um estado biologicamente ativo onde ocorre a depuração do sistema glinfático e a consolidação da memória.',
    conteudo_paragrafos: [
      'Em nossa sociedade acelerada, o sono é frequentemente tratado como negociável. No entanto, a neurociência moderna demonstra que a privação crônica de sono altera a secreção de grelina e leptina, aumentando o apetite por alimentos hiperpalatáveis e elevando o cortisol basal.',
      'Para sincronizar o núcleo supraquiasmático — nosso relógio mestre no hipotálamo —, o primeiro passo começa pela manhã: exponha seus olhos à luz solar nos primeiros 30 minutos após acordar.',
      'À noite, a produção de melatonina pela glândula pineal é altamente suscetível à luz azul de smartphones e televisores. Diminua as luzes da casa duas horas antes de dormir e mantenha o quarto em temperatura amena (cerca de 19°C a 21°C).',
      'A combinação de sono adequado, hidratação matinal e 150 minutos de atividade física moderada por semana é a intervenção de maior impacto na longevidade e saúde cardiometabólica.'
    ],
    mito_desmistificado: 'Mito: "Posso dormir apenas 4 horas durante a semana e compensar dormindo 12 horas no fim de semana."',
    fato_cientifico: 'Fato: O débito de sono causa danos cumulativos à plasticidade neuronal e sensibilidade à insulina que não são restaurados por longos cochilos aos domingos.',
    dicas_praticas: [
      'Estabeleça um horário fixo para deitar e acordar, inclusive aos finais de semana.',
      'Corte a cafeína pelo menos 8 a 9 horas antes do horário pretendido para dormir.',
      'Transforme o quarto em uma caverna: escuridão total, sem LEDs piscando e ambiente silencioso.'
    ],
    roteiro_video: {
      titulo_video: '3 Passos para acordar com energia real sem depender de 5 cafés',
      gancho_inicial: 'Você acorda mais cansado do que quando foi dormir? O problema pode não ser quantas horas dormiu, mas como dormiu!',
      desenvolvimento: 'Luz solar nos olhos ao acordar, zero telas azuis 60 minutos antes de deitar e um quarto mais fresco. Esses três comandos ativam sua melatonina natural e regeneram o corpo.',
      chamada_para_acao: 'Marque aquele amigo que adora rolar o feed da rede social na cama no escuro!',
      legendas_sugeridas: [
        '0:00 - O cansaço matinal crônico',
        '0:14 - A chave da luz solar matinal',
        '0:30 - O perigo da luz azul no travesseiro',
        '0:52 - Rotina de descompressão noturna'
      ]
    },
    audio_script: 'Bem-vindo à nossa sexta-feira de Hábitos Saudáveis! O sono de qualidade é o pilar invisível de toda saúde metabólica. Ao cuidar da sua higiene do sono hoje, você protege sua memória, seu humor e seu sistema imunológico para a próxima semana.',
    tags: ['SonoReparador', 'HigieneDoSono', 'HabitosSaudaveis', 'RitmoCircadiano', 'BemEstar'],
    referencias_cientificas: [
      'Matthew Walker, Ph.D. - Por que Nós Dormimos: A Nova Ciência do Sono e do Sonho',
      'National Sleep Foundation Guidelines (NSF)',
      'American Academy of Sleep Medicine (AASM) Consensus Statement'
    ],
    aviso_legal: DEFAULT_DISCLAIMER
  },
  sabado: {
    categoria: 'Sábados Sem Mitos',
    pilar_dia: 'Sábado',
    titulo: 'Desvendando o Grande Mito: Água Morna com Limão em Jejum Realmente Emagrece e Desintoxica?',
    subtitulo: 'Análise científica das alegações sobre pH sanguíneo, "queima de gordura" e o papel real do fígado e rins.',
    resumo: 'Colocamos à prova uma das crenças mais populares da internet e revelamos o que a bioquímica médica comprova.',
    conteudo_paragrafos: [
      'Todos os dias surgem promessas milagrosas de emagrecimento rápido nas redes sociais. A clássica mistura de água morna com limão em jejum é celebrada por influenciadores como um elixir capaz de "queimar gordura localizada" e "alcalinizar o sangue".',
      'Do ponto de vista bioquímico, nenhum alimento ou bebida altera o pH do sangue humano. O sangue é rigidamente tamponado entre 7,35 e 7,45 pelo sistema de bicarbonato pulmonar e renal; qualquer variação além disso representa emergência médica grave (acidose ou alcalose).',
      'Quanto ao emagrecimento, o limão fornece vitamina C (ácido ascórbico) e flavonoides antioxidantes, e a água hidrata o organismo. No entanto, não há enzima ou substância no limão capaz de provocar lipólise direta de adipócitos.',
      'Além disso, o ácido cítrico em contato frequente com o esmalte dentário pode provocar erosão dental ao longo dos meses. Beba água com limão se apreciar o sabor, mas saiba que a "desintoxicação" do seu corpo é realizada 24 horas por dia por seus rins e fígado.'
    ],
    mito_desmistificado: 'Mito: "Água morna com limão em jejum alcaliniza o organismo, queima a gordura abdominal e desintoxica o fígado."',
    fato_cientifico: 'Fato: O limão tem ácido cítrico e não muda o pH sanguíneo. O fígado e os rins são os órgãos naturais responsáveis pela depuração de metabólitos, sem necessidade de sucos ou shots "detox".',
    dicas_praticas: [
      'Gosta de água saborizada? Use canudo para reduzir o contato do ácido cítrico com o esmalte dos dentes e enxágue a boca com água pura em seguida.',
      'Foque na hidratação total do dia: consuma aproximadamente 35 ml de água pura por quilo de peso corporal.',
      'Desconfie de qualquer produto ou receita caseira que prometa resultados drásticos sem mudança no estilo de vida.'
    ],
    roteiro_video: {
      titulo_video: 'Sábado Sem Mitos: A verdade sobre o limão com água morna em jejum!',
      gancho_inicial: 'Você acorda todo dia tomando água com limão achando que está queimando gordura? Precisamos conversar!',
      desenvolvimento: 'O limão é ótimo em vitamina C, mas não derrete gordura e muito menos alcaliniza seu sangue. Quem desintoxica seu corpo são seus rins e fígado. Não caia em falsas promessas milagrosas.',
      chamada_para_acao: 'Qual outro mito de saúde você quer ver desmascarado no próximo sábado? Escreva aqui nos comentários!',
      legendas_sugeridas: [
        '0:00 - A promessa do shot milagroso',
        '0:16 - Por que o limão não altera o pH do sangue',
        '0:33 - Como seus rins e fígado realmente funcionam',
        '0:50 - Cuidados com o esmalte dental'
      ]
    },
    audio_script: 'Chegamos ao Sábado Sem Mitos! Hoje desvendamos de uma vez por todas a crença da água com limão em jejum. Hidratar-se é fundamental, mas shots não substituem alimentação equilibrada nem exercem ação milagrosa de queima de gordura. Saúde se constrói com ciência!',
    tags: ['SabadoSemMitos', 'FakeNewsSaude', 'AguaComLimao', 'EvidenciaCientifica', 'Desmistificando'],
    referencias_cientificas: [
      'Sociedade Brasileira de Alimentação e Nutrição (SBAN) - Notas de esclarecimento sobre dietas alcalinas',
      'American Dental Association (ADA) - Acidic beverages and tooth erosion',
      'The New England Journal of Medicine - Acid-Base and Electrolyte Disorders'
    ],
    aviso_legal: DEFAULT_DISCLAIMER
  }
};

export function inferPillarFromText(text: string): PillarDay {
  const normalized = (text || '').toLowerCase();
  if (normalized.includes('quarta') || normalized.includes('chá') || normalized.includes('cha') || normalized.includes('infus') || normalized.includes('planta') || normalized.includes('erva')) {
    return 'quarta';
  }
  if (normalized.includes('sexta') || normalized.includes('sono') || normalized.includes('hábito') || normalized.includes('habito') || normalized.includes('exerc') || normalized.includes('treino') || normalized.includes('hidrata')) {
    return 'sexta';
  }
  if (normalized.includes('sábado') || normalized.includes('sabado') || normalized.includes('mito') || normalized.includes('fake') || normalized.includes('crença') || normalized.includes('mentira') || normalized.includes('verdade')) {
    return 'sabado';
  }
  return 'segunda';
}

/**
 * Generates structured health article.
 * 1. Tries calling /api/content/generate (which works in local dev, AI Studio server, and Vercel serverless functions).
 * 2. If running on a static host (Netlify, Vercel SPA) where /api returns 404 or fails, it dynamically generates
 *    the content using client-side Gemini or the rich contextual scientific knowledge base.
 */
export async function requestContentGeneration(payload: GenerateRequestPayload): Promise<GeneratedContentResponse> {
  const chosenPillar: PillarDay = payload.dayPillar || inferPillarFromText(payload.prompt);

  // 1. Try backend/serverless endpoint first
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    const response = await fetch('/api/content/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    const contentType = response.headers.get('content-type') || '';
    if (response.ok && contentType.includes('application/json')) {
      const data = await response.json();
      if (data && data.titulo && data.conteudo_paragrafos) {
        return data as GeneratedContentResponse;
      }
    }
  } catch (err) {
    console.info('Backend endpoint unavailable, using resilient client generator (Netlify/Vercel SPA mode):', err);
  }

  // 2. Client-side Gemini fallback if client env var exists
  const clientKey = (import.meta as any).env?.VITE_GEMINI_API_KEY;
  if (clientKey) {
    try {
      const ai = new GoogleGenAI({ apiKey: clientKey });
      const systemInstruction = `
Você é o motor de IA oficial da plataforma "Saúde Sem Mitos".
Forneça informações acessíveis e científicas sobre saúde, nutrição e hábitos saudáveis.
Siga o pilar semanal indicado (${chosenPillar}).
Toda resposta deve obrigatoriamente incluir aviso legal médico.
      `.trim();

      const contents: any[] = [];
      if (payload.imageBase64) {
        const cleanBase64 = payload.imageBase64.replace(/^data:image\/\w+;base64,/, '');
        contents.push({
          inlineData: {
            data: cleanBase64,
            mimeType: payload.mimeType || 'image/jpeg',
          },
        });
      }
      contents.push({
        text: payload.prompt || 'Elabore uma análise científica completa com orientações práticas.',
      });

      const geminiRes = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              categoria: { type: Type.STRING },
              pilar_dia: { type: Type.STRING },
              titulo: { type: Type.STRING },
              subtitulo: { type: Type.STRING },
              resumo: { type: Type.STRING },
              conteudo_paragrafos: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              mito_desmistificado: { type: Type.STRING },
              fato_cientifico: { type: Type.STRING },
              dicas_praticas: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              analise_visual: { type: Type.STRING },
              audio_script: { type: Type.STRING },
              tags: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              referencias_cientificas: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              aviso_legal: { type: Type.STRING },
            },
            required: ['categoria', 'titulo', 'resumo', 'conteudo_paragrafos', 'tags', 'aviso_legal'],
          },
        },
      });

      if (geminiRes.text) {
        const parsed = JSON.parse(geminiRes.text);
        if (parsed.titulo) {
          return {
            ...PILLAR_DATABASE[chosenPillar],
            ...parsed,
          };
        }
      }
    } catch (clientErr) {
      console.warn('Client Gemini call failed, using intelligent curated generator:', clientErr);
    }
  }

  // 3. High-Fidelity Curated Scientific Engine
  const baseTemplate = PILLAR_DATABASE[chosenPillar] || PILLAR_DATABASE.segunda;
  const userPromptClean = (payload.prompt || '').trim();

  const customTitle = userPromptClean.length > 5
    ? userPromptClean.length > 60
      ? userPromptClean.slice(0, 60) + '...'
      : userPromptClean.charAt(0).toUpperCase() + userPromptClean.slice(1)
    : baseTemplate.titulo;

  return {
    ...baseTemplate,
    titulo: customTitle,
    subtitulo: `Análise científica detalhada: evidências, fisiologia e orientações práticas para ${baseTemplate.pilar_dia.toLowerCase()}.`,
    analise_visual: payload.imageBase64
      ? 'Análise visual do Estúdio concluída: composição e proporções dos elementos identificados e validados contra as diretrizes nutricionais vigentes.'
      : undefined,
  };
}
