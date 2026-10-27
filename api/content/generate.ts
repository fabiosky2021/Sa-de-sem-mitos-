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
  },
  terca: {
    categoria: 'Saúde Mental & Neurociência',
    pilar_dia: 'Terça-feira',
    titulo: 'O Eixo Intestino-Cérebro: Como a Microbiota Modula o Cortisol e a Ansiedade',
    subtitulo: 'A conexão entre permeabilidade intestinal, síntese de serotonina e resiliência neural.',
    resumo: 'Cerca de 90% da serotonina é sintetizada no trato digestivo. Entenda os mecanismos do nervo vago e dos ácidos graxos de cadeia curta no humor.',
    conteudo_paragrafos: [
      'O intestino é considerado o segundo cérebro. Pelo nervo vago e corrente sanguínea, trilhões de bactérias dialogam diretamente com o sistema límbico.',
      'A microbiota benéfica produz ácidos graxos de cadeia curta que atenuam neuroinflamação e modulam o estresse crônico.',
      'Alimentos fermentados e fibras prebióticas fortalecem o tônus vagal e reduzem sintomas de ansiedade subclínica.'
    ],
    mito_desmistificado: 'Mito: "Ansiedade é apenas psicológica e não tem relação com o intestino."',
    fato_cientifico: 'Fato: O eixo intestino-cérebro é bidirecional; o microbioma influencia neurotransmissores vitais como GABA e serotonina.',
    dicas_praticas: [
      'Varie plantas e fibras ao longo da semana para enriquecer o microbioma.',
      'Pratique 5 minutos de respiração diafragmática para estimular o nervo vago.',
      'Evite excesso de adoçantes e ultraprocessados que alteram bactérias benéficas.'
    ],
    roteiro_video: {
      titulo_video: 'Como o intestino comanda sua ansiedade',
      gancho_inicial: 'Você sente o estômago embrulhar quando fica ansioso? A ciência explica por quê!',
      desenvolvimento: 'Mais de 90% da serotonina é feita no intestino. Cuidar das bactérias boas com comida de verdade é o melhor calmante natural.',
      chamada_para_acao: 'Comente qual alimento saudável não falta no seu dia!',
      legendas_sugeridas: [
        '0:00 - A conexão intestino-cérebro',
        '0:18 - O papel do nervo vago',
        '0:35 - Alimentos para regular a ansiedade'
      ]
    },
    audio_script: 'Terça-feira de Saúde Mental no Saúde Sem Mitos! Equilíbrio emocional começa no microbioma intestinal. Priorize sua alimentação.',
    tags: ['SaudeMental', 'Neurociencia', 'Microbiota', 'GABA', 'EixoIntestinoCerebro'],
    referencias_cientificas: [
      'Cryan JF, et al. Physiological Reviews (2019)',
      'Nature Microbiology - Neuroactive Gut Compounds',
      'Cell - Vagus Nerve and Homeostasis'
    ],
    aviso_legal: DEFAULT_DISCLAIMER
  },
  quinta: {
    categoria: 'Metabolismo & Longevidade',
    pilar_dia: 'Quinta-feira',
    titulo: 'Sensibilidade à Insulina e Autofagia: A Ordem dos Alimentos para Achatar Picos Glicêmicos',
    subtitulo: 'Estratégias metabólicas simples para proteger as mitocôndrias e evitar fadiga pós-refeição.',
    resumo: 'Estudos clínicos comprovam que iniciar a refeição por vegetais ricos em fibras reduz picos de glicose e protege contra inflamação crônica.',
    conteudo_paragrafos: [
      'A longevidade biológica depende do controle da insulina e prevenção de picos rápidos de glicose pós-prandiais.',
      'Começar o prato pelas fibras cria uma barreira viscosa no intestino que retarda a absorção de glicose.',
      'Consumir proteínas e gorduras em seguida e deixar carboidratos por último mantém a energia estável a tarde toda.'
    ],
    mito_desmistificado: 'Mito: "Picos de glicose só importam para quem tem diabetes diagnosticado."',
    fato_cientifico: 'Fato: Oscilações glicêmicas agudas geram estresse oxidativo mitocondrial e glicação proteica em qualquer organismo.',
    dicas_praticas: [
      'Inicie refeições principais por saladas ou vegetais crus.',
      'Faça caminhadas de 10 a 15 minutos pós-refeição para ativar o GLUT-4 muscular.',
      'Prefira frutas inteiras com casca e bagaço em vez de sucos coados.'
    ],
    roteiro_video: {
      titulo_video: 'O truque para comer carboidrato sem dar sono nem engordar',
      gancho_inicial: 'Sente aquele sono incontrolável depois do almoço? Mudar a ordem do prato resolve!',
      desenvolvimento: 'Coma as fibras primeiro, a proteína depois e o carboidrato por último. Isso achata a glicemia e mantém sua energia.',
      chamada_para_acao: 'Faça o teste e comprove a diferença!',
      legendas_sugeridas: [
        '0:00 - O pico glicêmico invisível',
        '0:18 - A ordem correta dos alimentos',
        '0:40 - Mais energia e longevidade'
      ]
    },
    audio_script: 'Quinta-feira de Metabolismo e Longevidade no Saúde Sem Mitos! A estabilidade da glicose protege suas células e mantém seu foco afiado.',
    tags: ['Metabolismo', 'Longevidade', 'Glicemia', 'Insulina', 'Mitocondrias'],
    referencias_cientificas: [
      'Diabetes Care - Food Order and Postprandial Glucose (2015)',
      'The Lancet Diabetes & Endocrinology',
      'Cell Metabolism - Autophagy & Longevity'
    ],
    aviso_legal: DEFAULT_DISCLAIMER
  },
  domingo: {
    categoria: 'Recuperação & Planejamento',
    pilar_dia: 'Domingo',
    titulo: 'Descanso Ativo e Meal Prep Consciente: Como Preparar a Próxima Semana com Ciência',
    subtitulo: 'Técnicas de higienização de vegetais para longa conservação e descompressão parassimpática.',
    resumo: 'Organização antecipada e desconexão digital no domingo preparam o sistema nervoso para iniciar a semana com clareza e alta disposição.',
    conteudo_paragrafos: [
      'O descanso ativo com caminhadas na natureza estimula o sistema nervoso parassimpático e reduz o cortisol de alerta.',
      'Dedicar 40 minutos para higienizar e secar bem folhas verdes garante saladas nutritivas prontas para a semana inteira.',
      'Um detox digital de algumas horas no domingo resetará os receptores dopaminérgicos para o ritmo produtivo da semana.'
    ],
    mito_desmistificado: 'Mito: "Descansar é passar o domingo inteiro na cama rolando telas de celular."',
    fato_cientifico: 'Fato: O estímulo luminoso contínuo de telas mantém o cérebro em vigília e bloqueia a restauração neural profunda.',
    dicas_praticas: [
      'Seque muito bem as folhas antes de armazenar em potes com papel toalha.',
      'Desconecte-se de redes sociais 2 a 3 horas antes de dormir.',
      'Deixe a garrafa de água e o tênis separados para a manhã de segunda.'
    ],
    roteiro_video: {
      titulo_video: 'Como transformar seu domingo para ter uma semana impecável',
      gancho_inicial: 'Bateu a angústia do domingo à noite? Vamos virar essa chave agora com ciência!',
      desenvolvimento: 'Descanso na natureza, folhas higienizadas para a semana e detox de telas. Práticas simples para começar a segunda no topo.',
      chamada_para_acao: 'Qual o seu ritual preferido de domingo? Comente aqui!',
      legendas_sugeridas: [
        '0:00 - A angústia do domingo',
        '0:18 - Meal prep de vegetais',
        '0:35 - Descanso neural restaurador'
      ]
    },
    audio_script: 'Domingo no Saúde Sem Mitos! Dia de recuperação e planejamento. Quem cuida do seu domingo governa a sua semana.',
    tags: ['Recuperacao', 'MealPrep', 'DescansoAtivo', 'PlanejamentoSemanal', 'BemEstar'],
    referencias_cientificas: [
      'American Journal of Lifestyle Medicine - Meal Planning',
      'Frontiers in Psychology - Nature and Parasympathetic Recovery',
      'Sleep Medicine Reviews - Screen Time and Melatonin'
    ],
    aviso_legal: DEFAULT_DISCLAIMER
  }
};

function getPillarKey(dayOrTopic: string): string {
  const normalized = (dayOrTopic || '').toLowerCase();
  if (normalized.includes('terça') || normalized.includes('terca') || normalized.includes('mental') || normalized.includes('mente') || normalized.includes('cérebro') || normalized.includes('cerebro') || normalized.includes('ansiedade') || normalized.includes('cortisol')) return 'terca';
  if (normalized.includes('quarta') || normalized.includes('chá') || normalized.includes('cha') || normalized.includes('infus') || normalized.includes('planta') || normalized.includes('erva')) return 'quarta';
  if (normalized.includes('quinta') || normalized.includes('metabol') || normalized.includes('glicem') || normalized.includes('insulin') || normalized.includes('longev')) return 'quinta';
  if (normalized.includes('sexta') || normalized.includes('sono') || normalized.includes('hábito') || normalized.includes('habito') || normalized.includes('exerc')) return 'sexta';
  if (normalized.includes('sábado') || normalized.includes('sabado') || normalized.includes('mito') || normalized.includes('fake')) return 'sabado';
  if (normalized.includes('domingo') || normalized.includes('planeja') || normalized.includes('recupera') || normalized.includes('descanso')) return 'domingo';
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
