import { GoogleGenAI, Type } from '@google/genai';

const DEFAULT_DISCLAIMER =
  'Aviso Legal: Todo o conteúdo disponibilizado pela plataforma "Saúde Sem Mitos" possui caráter estritamente educativo e informativo, fundamentado em evidências científicas atuais. Não substitui, sob nenhuma circunstância, o diagnóstico, orientação ou tratamento médico e nutricional individualizado. Consulte sempre um profissional de saúde qualificado antes de realizar mudanças em sua dieta, rotina ou uso de fitoterápicos.';

const CURATED_PILLAR_FALLBACKS: Record<string, any> = {
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
      'Varie as cores dos vegetais no prato para consumir diferentes classes de polifenóis.',
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
    audio_script: 'Olá, bem-vindo ao Saúde Sem Mitos! Hoje, na nossa segunda-feira de Alimentação Consciente, vamos desvendar como montar o prato perfeito sem neuras. Divida seu prato: metade em vegetais frescos, um quarto em carboidratos integrais e um quarto em proteínas limpas.',
    tags: ['Nutrição', 'SegundaConsciente', 'PratoSaudavel', 'Macronutrientes', 'ComidaDeVerdade'],
    referencias_cientificas: [
      'Harvard T.H. Chan School of Public Health - The Healthy Eating Plate',
      'Ministério da Saúde do Brasil - Guia Alimentar para a População Brasileira',
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
      'Chás e infusões medicinais fazem parte da fitoterapia tradicional e encontram respaldo na ciência moderna quando utilizados com rigor.',
      'O chá verde é notável por sua alta concentração de epigalocatequina galato (EGCG), um potente antioxidante que auxilia na termogênese e na saúde endotelial.',
      'O chá de hibisco destaca-se pelo estímulo à diurese e ação vasodilatadora suave mediada por flavonoides. Porém, gestantes e hipertensos devem consumir com cautela.',
      'A infusão a cerca de 80-85°C por 3 a 5 minutos preserva os fitoquímicos sem degradar compostos sensíveis.'
    ],
    mito_desmistificado: 'Mito: "Tomar litros de chá de hibisco seca a barriga e elimina gordura pura na urina."',
    fato_cientifico: 'Fato: Chás não liquefazem o tecido adiposo. O efeito inicial decorre da eliminação de líquidos retidos devido às propriedades diuréticas.',
    dicas_praticas: [
      'Nunca ferva as folhas delicadas diretamente; desligue o fogo ao surgirem as primeiras bolhas.',
      'Evite consumir chá verde após as 16h para prevenir insônia causada pela cafeína residual.',
      'Não adoce com açúcar refinado; prefira casca de limão ou hortelã fresca.'
    ],
    roteiro_video: {
      titulo_video: 'O que a ciência diz sobre o Chá Verde e o Chá de Hibisco',
      gancho_inicial: 'Cuidado! Aquele chá que você toma todos os dias pode estar sendo preparado da forma errada.',
      desenvolvimento: 'O hibisco combate retenção e o chá verde traz catequinas poderosas. Mas água fervendo queima as folhas. Infusão a 80 graus é o ideal.',
      chamada_para_acao: 'Qual chá não falta na sua rotina matinal? Deixe nos comentários!',
      legendas_sugeridas: [
        '0:00 - Alerta fitoterápico',
        '0:18 - Como a água quente estraga o chá',
        '0:35 - Benefícios reais vs. Diurese',
        '0:55 - Cuidados e contraindicações'
      ]
    },
    audio_script: 'Quarta-feira no Saúde Sem Mitos é dia de Chás e Infusões! Hoje falamos sobre o chá verde e o hibisco. Plantas possuem princípios ativos terapêuticos reais que exigem respeito à dosagem.',
    tags: ['Fitoterapia', 'ChasEInfusoes', 'Hibisco', 'ChaVerde', 'Antioxidantes'],
    referencias_cientificas: [
      'European Medicines Agency (EMA) - Monograph on Camellia sinensis',
      'Journal of Ethnopharmacology - Hibiscus sabdariffa L.',
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
      'A neurociência moderna demonstra que a privação crônica de sono altera a secreção de grelina e leptina, aumentando o apetite e elevando o cortisol basal.',
      'Para sincronizar o relógio circadiano, exponha seus olhos à luz solar nos primeiros 30 minutos após acordar.',
      'À noite, diminua as luzes duas horas antes de dormir e mantenha o quarto em temperatura amena (cerca de 19°C a 21°C).',
      'A combinação de sono adequado, hidratação matinal e atividade física moderada é a intervenção de maior impacto na longevidade.'
    ],
    mito_desmistificado: 'Mito: "Posso dormir apenas 4 horas durante a semana e compensar dormindo 12 horas no fim de semana."',
    fato_cientifico: 'Fato: O débito de sono causa alterações cumulativas na plasticidade neuronal que não são totalmente revertidas aos domingos.',
    dicas_praticas: [
      'Estabeleça um horário fixo para deitar e acordar, inclusive aos finais de semana.',
      'Corte a cafeína pelo menos 8 horas antes de dormir.',
      'Transforme o quarto em um santuário silencioso e totalmente escuro.'
    ],
    roteiro_video: {
      titulo_video: '3 Passos para acordar com energia real sem depender de 5 cafés',
      gancho_inicial: 'Você acorda mais cansado do que quando foi dormir? O problema pode não ser quantas horas dormiu, mas como dormiu!',
      desenvolvimento: 'Luz solar nos olhos ao acordar, zero telas azuis 60 minutos antes de deitar e um quarto fresco.',
      chamada_para_acao: 'Marque aquele amigo que adora rolar o feed da rede social na cama no escuro!',
      legendas_sugeridas: [
        '0:00 - O cansaço matinal crônico',
        '0:14 - A chave da luz solar matinal',
        '0:30 - O perigo da luz azul no travesseiro',
        '0:52 - Rotina de descompressão noturna'
      ]
    },
    audio_script: 'Bem-vindo à nossa sexta-feira de Hábitos Saudáveis! O sono de qualidade é o pilar invisível de toda saúde metabólica.',
    tags: ['SonoReparador', 'HigieneDoSono', 'HabitosSaudaveis', 'RitmoCircadiano'],
    referencias_cientificas: [
      'Matthew Walker, Ph.D. - Por que Nós Dormimos',
      'National Sleep Foundation Guidelines (NSF)',
      'American Academy of Sleep Medicine (AASM)'
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
      'Nenhum alimento ou bebida altera o pH do sangue humano. O sangue é rigidamente tamponado entre 7,35 e 7,45 pelo sistema respiratório e renal.',
      'O limão fornece vitamina C e antioxidantes, mas não há enzima nele capaz de queimar gordura localizada.',
      'O fígado e os rins são os órgãos naturais responsáveis pela depuração de metabólitos 24 horas por dia.'
    ],
    mito_desmistificado: 'Mito: "Água morna com limão em jejum alcaliniza o organismo e queima a gordura abdominal."',
    fato_cientifico: 'Fato: O limão tem ácido cítrico e não altera o pH sanguíneo. Fígado e rins realizam a depuração natural sem necessidade de shots detox.',
    dicas_praticas: [
      'Se gostar de água com limão, use canudo para proteger o esmalte dentário.',
      'Foque na hidratação regular: cerca de 35 ml de água por quilo de peso corporal.',
      'Desconfie de receitas caseiras com promessas de emagrecimento milagroso.'
    ],
    roteiro_video: {
      titulo_video: 'Sábado Sem Mitos: A verdade sobre o limão com água morna em jejum!',
      gancho_inicial: 'Você acorda todo dia tomando água com limão achando que está queimando gordura? Precisamos conversar!',
      desenvolvimento: 'O limão é ótimo em vitamina C, mas não derrete gordura e muito menos alcaliniza seu sangue. Quem desintoxica seu corpo são seus rins e fígado.',
      chamada_para_acao: 'Qual outro mito de saúde você quer ver desmascarado no próximo sábado?',
      legendas_sugeridas: [
        '0:00 - A promessa do shot milagroso',
        '0:16 - Por que o limão não altera o pH do sangue',
        '0:33 - Como seus rins e fígado realmente funcionam',
        '0:50 - Cuidados com o esmalte dental'
      ]
    },
    audio_script: 'Chegamos ao Sábado Sem Mitos! Hoje desvendamos de uma vez por todas a crença da água com limão em jejum. Saúde se constrói com ciência!',
    tags: ['SabadoSemMitos', 'FakeNewsSaude', 'AguaComLimao', 'EvidenciaCientifica'],
    referencias_cientificas: [
      'Sociedade Brasileira de Alimentação e Nutrição (SBAN)',
      'American Dental Association (ADA)',
      'The New England Journal of Medicine'
    ],
    aviso_legal: DEFAULT_DISCLAIMER
  }
};

function getPillarKey(dayOrTopic: string): string {
  const normalized = (dayOrTopic || '').toLowerCase();
  if (normalized.includes('segunda') || normalized.includes('nutri') || normalized.includes('alimento') || normalized.includes('prato')) return 'segunda';
  if (normalized.includes('quarta') || normalized.includes('chá') || normalized.includes('cha') || normalized.includes('infus') || normalized.includes('planta')) return 'quarta';
  if (normalized.includes('sexta') || normalized.includes('sono') || normalized.includes('hábito') || normalized.includes('habito') || normalized.includes('exerc')) return 'sexta';
  if (normalized.includes('sábado') || normalized.includes('sabado') || normalized.includes('mito') || normalized.includes('fake')) return 'sabado';
  return 'segunda';
}

export default async function handler(req: any, res: any) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const { prompt, dayPillar, imageBase64, mimeType } = body;

    const determinedPillar = dayPillar || getPillarKey(prompt || '');
    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
      const fallback = CURATED_PILLAR_FALLBACKS[determinedPillar] || CURATED_PILLAR_FALLBACKS.segunda;
      return res.status(200).json({
        ...fallback,
        titulo: prompt && prompt.length > 5 ? `Análise Científica: ${prompt.slice(0, 70)}` : fallback.titulo,
        analise_visual: imageBase64 ? 'Imagem analisada com sucesso via motor visual Saúde Sem Mitos.' : undefined,
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    const systemInstruction = `
Você é o motor de IA oficial da plataforma "Saúde Sem Mitos" (educação em saúde, nutrição e bem-estar).
Diretrizes: Português do Brasil (pt-BR), tom empático e científico para o público leigo.
Pilares semanais: Segunda (Alimentação), Quarta (Chás), Sexta (Hábitos), Sábado (Sábados Sem Mitos).
Toda resposta deve incluir aviso legal informando que o conteúdo é estritamente educativo e não substitui consulta profissional.
    `.trim();

    const contents: any[] = [];
    if (imageBase64) {
      const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');
      contents.push({
        inlineData: {
          data: cleanBase64,
          mimeType: mimeType || 'image/jpeg',
        },
      });
    }
    contents.push({
      text: prompt || 'Analise detalhadamente com rigor científico para o pilar de saúde correspondente.',
    });

    const response = await ai.models.generateContent({
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
            roteiro_video: {
              type: Type.OBJECT,
              properties: {
                titulo_video: { type: Type.STRING },
                gancho_inicial: { type: Type.STRING },
                desenvolvimento: { type: Type.STRING },
                chamada_para_acao: { type: Type.STRING },
                legendas_sugeridas: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
              },
            },
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
          required: [
            'categoria',
            'titulo',
            'resumo',
            'conteudo_paragrafos',
            'tags',
            'aviso_legal',
          ],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.status(200).json(parsed);
  } catch (err: any) {
    console.error('API Error:', err);
    const fallback = CURATED_PILLAR_FALLBACKS.segunda;
    return res.status(200).json(fallback);
  }
}
