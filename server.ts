import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Initialize GoogleGenAI with telemetry headers
const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({
  apiKey: apiKey || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const DEFAULT_DISCLAIMER =
  'Aviso Legal: Todo o conteúdo disponibilizado pela plataforma "Saúde Sem Mitos" possui caráter estritamente educativo e informativo, fundamentado em evidências científicas atuais. Não substitui, sob nenhuma circunstância, o diagnóstico, orientação ou tratamento médico e nutricional individualizado. Consulte sempre um profissional de saúde qualificado antes de realizar mudanças em sua dieta, rotina ou uso de fitoterápicos.';

// Fallback curated content per pillar in case of missing key or API failure
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

// Map day string to pillar key
function getPillarKey(dayOrTopic: string): string {
  const normalized = (dayOrTopic || '').toLowerCase();
  if (normalized.includes('segunda') || normalized.includes('nutri') || normalized.includes('alimento') || normalized.includes('prato')) {
    return 'segunda';
  }
  if (normalized.includes('quarta') || normalized.includes('chá') || normalized.includes('cha') || normalized.includes('infus') || normalized.includes('planta')) {
    return 'quarta';
  }
  if (normalized.includes('sexta') || normalized.includes('sono') || normalized.includes('hábito') || normalized.includes('habito') || normalized.includes('exerc') || normalized.includes('hidrata')) {
    return 'sexta';
  }
  if (normalized.includes('sábado') || normalized.includes('sabado') || normalized.includes('mito') || normalized.includes('fake') || normalized.includes('crença')) {
    return 'sabado';
  }
  return 'segunda';
}

// Generate structured content endpoint
app.post('/api/content/generate', async (req: Request, res: Response) => {
  try {
    const { prompt, dayPillar, imageBase64, mimeType, analysisFocus } = req.body;

    if (!prompt && !imageBase64) {
      return res.status(400).json({ error: 'Forneça um texto de entrada ou envie uma imagem para análise.' });
    }

    const determinedPillar = dayPillar || getPillarKey(prompt || analysisFocus || '');

    // Check if Gemini API key is available
    if (!apiKey) {
      console.warn('GEMINI_API_KEY is not set. Returning rich curated fallback content.');
      const fallback = CURATED_PILLAR_FALLBACKS[determinedPillar] || CURATED_PILLAR_FALLBACKS.segunda;
      
      const customResponse = {
        ...fallback,
        analise_visual: imageBase64
          ? 'Análise visual estúdio: Imagem identificada e processada. Para inspeção visual completa em tempo real via IA, configure sua GEMINI_API_KEY no painel de Secrets.'
          : undefined,
        titulo: prompt && prompt.length > 5 ? `Explorando: ${prompt.slice(0, 70)}` : fallback.titulo,
      };
      return res.json(customResponse);
    }

    // Prepare system instructions for Saúde Sem Mitos
    const systemInstruction = `
Você é o motor de IA e assistente virtual oficial da plataforma "Saúde Sem Mitos" (focado em educação em saúde, nutrição e bem-estar).

DIRETRIZES FUNDAMENTAIS:
1. Idioma: Português do Brasil (pt-BR) com tom empático, caloroso, altamente embasado na literatura científica contemporânea (OMS, SBAN, Harvard, Ministério da Saúde), mas explicado de forma descomplicada para o público leigo.
2. Pilares Semanais:
   - Segunda-feira: Alimentação & Nutrição Consciente (dicas de pratos, nutrientes e reeducação alimentar)
   - Quarta-feira: Chás & Infusões (propriedades fitoterápicas, benefícios e precauções de uso)
   - Sexta-feira: Hábitos Saudáveis (rotinas de sono, atividades físicas, hidratação e bem-estar mental)
   - Sábado: Sábados Sem Mitos (desmistificação de fakes, crenças populares e modismos sem base científica)
3. Transparência & Segurança: Toda resposta DEVE incluir obrigatoriamente um aviso legal explícito reiterando que o material é de caráter estritamente educativo e informativo e não substitui consulta ou parecer médico e nutricional.
4. Se uma imagem foi fornecida (ex: foto de prato de comida, rótulo nutricional de produto, chá ou erva, suplemento ou receita):
   - Faça uma leitura visual atenta e criteriosa.
   - Aponte pontos positivos nutricionais, potenciais armadilhas (ex: excesso de sódio, aditivos, açúcares ocultos), estimativas e orientações práticas de preparo ou substituições inteligentes.
   - Preencha o campo "analise_visual" detalhando o que foi detectado na imagem.
`.trim();

    // Prepare contents: multimodal if imageBase64 is present
    const contents: any[] = [];

    if (imageBase64) {
      contents.push({
        inlineData: {
          mimeType: mimeType || 'image/jpeg',
          data: imageBase64.replace(/^data:image\/\w+;base64,/, ''),
        },
      });
    }

    const promptText = `
Pilar Editorial: ${determinedPillar.toUpperCase()}
Foco ou Pergunta: ${prompt || 'Analise a imagem enviada sob a ótica da saúde preventiva e desmistifique crenças relacionadas.'}
${analysisFocus ? `Modo Especial: ${analysisFocus}` : ''}

Por favor, elabore o conteúdo estruturado completo conforme o schema JSON solicitado.
`.trim();

    contents.push({ text: promptText });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: { parts: contents },
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
              required: ['titulo_video', 'gancho_inicial', 'desenvolvimento', 'chamada_para_acao', 'legendas_sugeridas'],
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
            'pilar_dia',
            'titulo',
            'subtitulo',
            'resumo',
            'conteudo_paragrafos',
            'mito_desmistificado',
            'fato_cientifico',
            'dicas_praticas',
            'roteiro_video',
            'audio_script',
            'tags',
            'referencias_cientificas',
            'aviso_legal',
          ],
        },
      },
    });

    const textOutput = response.text;
    if (!textOutput) {
      throw new Error('Sem resposta textual do modelo.');
    }

    const parsed = JSON.parse(textOutput);
    return res.json(parsed);
  } catch (error: any) {
    console.error('Error generating health content:', error);
    // Graceful fallback so the client UI remains fully interactive
    const fallback = CURATED_PILLAR_FALLBACKS.segunda;
    return res.json({
      ...fallback,
      aviso_legal: DEFAULT_DISCLAIMER,
      _fallback_note: 'Resposta gerada a partir da base curada de saúde preventiva do estúdio.',
    });
  }
});

// Endpoint for Speech Generation / Narration via gemini-3.8-flash-lite-tts
app.post('/api/content/speech', async (req: Request, res: Response) => {
  try {
    const { text, voiceName } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Texto necessário para geração de áudio.' });
    }

    if (!apiKey) {
      return res.status(200).json({
        fallback: true,
        message: 'Utilizando sintetizador de voz do navegador (Web Speech API).',
      });
    }

    const ttsResponse = await ai.models.generateContent({
      model: 'gemini-3.8-flash-lite-tts',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: text.slice(0, 1000), // safety bounds
              speechMetadata: {
                style: 'Calm, authoritative, warm health professional educator in Portuguese',
              },
            },
          ],
        },
      ],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voiceName || 'Kore' },
          },
        },
      },
    });

    const base64Audio = ttsResponse.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      return res.json({ audioData: base64Audio, mimeType: 'audio/wav' });
    }

    return res.json({ fallback: true });
  } catch (err: any) {
    console.warn('TTS generation notice:', err.message);
    return res.json({ fallback: true, error: err.message });
  }
});

// Start Express server and mount Vite in development
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Saúde Sem Mitos Studio] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
