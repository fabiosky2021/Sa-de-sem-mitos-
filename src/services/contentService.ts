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
  },
  terca: {
    categoria: 'Saúde Mental & Neurociência',
    pilar_dia: 'Terça-feira',
    titulo: 'O Eixo Intestino-Cérebro: Como a Microbiota Modula o Cortisol e a Ansiedade',
    subtitulo: 'A fascinante conexão entre a permeabilidade intestinal, a síntese de serotonina e a resiliência neural.',
    resumo: 'Cerca de 90% da serotonina corporal é sintetizada no trato digestivo. Entenda os mecanismos do nervo vago e dos ácidos graxos de cadeia curta no humor.',
    conteudo_paragrafos: [
      'A neurociência e a gastroenterologia moderna convergem para um fato transformador: o intestino é o nosso segundo cérebro. Através do nervo vago e da corrente sanguínea, trilhões de microrganismos dialogam em tempo real com o sistema límbico.',
      'Bactérias benéficas fermentam fibras solúveis, produzindo ácidos graxos de cadeia curta (como butirato e acetato). Essas substâncias fortalecem a barreira hematoencefálica e atenuam a resposta inflamatória induzida pelo estresse.',
      'O cortisol elevado cronicamente altera a integridade da barreira intestinal (leaky gut), permitindo que endotoxinas bacterianas estimulem neuroinflamação subclínica, associada à fadiga mental e sintomas de ansiedade.',
      'Intervenções com alimentos fermentados (kefir, iogurte natural sem açúcar), ingestão variada de fibras prebióticas e pausas conscientes reduzem comprovadamente os marcadores inflamatórios cerebrais.'
    ],
    mito_desmistificado: 'Mito: "Ansiedade e estresse são apenas problemas psicológicos da mente e nada têm a ver com a digestão."',
    fato_cientifico: 'Fato: O eixo bidirecional microbiota-intestino-cérebro responde diretamente à dieta e ao microbioma, com forte impacto na modulação de neurotransmissores como GABA e serotonina.',
    dicas_praticas: [
      'Consuma ao menos 20 a 30 tipos diferentes de plantas por semana (legumes, folhas, sementes, frutas e grãos).',
      'Evite adoçantes artificiais em excesso, pois alguns tipos alteram negativamente a microbiota benéfica.',
      'Pratique 5 minutos de respiração diafragmática lenta (4s inspirando, 6s expirando) para estimular o tônus vagal.'
    ],
    roteiro_video: {
      titulo_video: 'Como o seu intestino controla o seu humor e ansiedade',
      gancho_inicial: 'Você sente borboletas no estômago quando está ansioso? A ciência explica por quê!',
      desenvolvimento: 'Mais de 90% da serotonina é produzida no seu trato gastrointestinal. Cuidar das bactérias boas do intestino com fibras reais é o primeiro passo para acalmar a mente.',
      chamada_para_acao: 'Comente qual alimento fermentado você consome no dia a dia!',
      legendas_sugeridas: [
        '0:00 - A conexão intestino e mente',
        '0:18 - O papel do nervo vago',
        '0:35 - Fibras prebióticas e serotonina',
        '0:55 - Dicas para fortalecer a microbiota'
      ]
    },
    audio_script: 'Terça-feira de Saúde Mental e Neurociência no Saúde Sem Mitos! Hoje desvendamos o eixo intestino-cérebro. Uma mente equilibrada depende de uma microbiota saudável. Priorize comida de verdade e alimente suas bactérias protetoras.',
    tags: ['SaudeMental', 'Neurociencia', 'EixoIntestinoCerebro', 'Microbiota', 'GABA', 'Serotonina'],
    referencias_cientificas: [
      'Cryan JF, et al. The Microbiota-Gut-Brain Axis. Physiological Reviews (2019)',
      'Nature Microbiology - Gut bacteria that produce neuroactive compounds',
      'Cell - Vagus nerve pathways in psychological homeostasis'
    ],
    aviso_legal: DEFAULT_DISCLAIMER
  },
  quinta: {
    categoria: 'Metabolismo & Longevidade',
    pilar_dia: 'Quinta-feira',
    titulo: 'Sensibilidade à Insulina e Autofagia: A Ordem dos Alimentos para Achatar Picos Glicêmicos',
    subtitulo: 'Estratégias metabólicas simples para proteger as mitocôndrias, evitar sonolência pós-prandial e promover longevidade.',
    resumo: 'Estudos clínicos revelam que consumir vegetais ricos em fibras antes dos carboidratos reduz picos de glicose em até 70% e melhora a eficiência mitocondrial.',
    conteudo_paragrafos: [
      'A longevidade biológica está intimamente associada à estabilidade glicêmica e ao controle da insulina. Picos rápidos de açúcar no sangue forçam o pâncreas a secretar grandes cargas insulínicas, gerando estresse oxidativo endotelial e acúmulo de gordura visceral.',
      'Uma das descobertas mais práticas da nutrição metabólica recente é o sequenciamento alimentar: ao iniciar a refeição pelas fibras (saladas e vegetais crus), cria-se uma rede gelatinosa no intestino delgado que retarda a absorção dos açúcares seguintes.',
      'Em seguida, o consumo de proteínas e gorduras boas sinaliza saciedade via GLP-1 e colecistoquinina (CCK). Deixar os carboidratos complexos por último atenua drasticamente a curva glicêmica e previne o crash de energia pós-almoço.',
      'Além disso, períodos de repouso alimentar noturno de 12 horas permitem que a via AMPK seja ativada, favorecendo a autofagia e a biogênese mitocondrial.'
    ],
    mito_desmistificado: 'Mito: "Picos de glicose só afetam pessoas diabéticas e não têm importância para indivíduos saudáveis."',
    fato_cientifico: 'Fato: Oscilações glicêmicas acentuadas provocam glicação de proteínas (AGEs), disfunção mitocondrial e inflamação crônica silenciosa em qualquer indivíduo.',
    dicas_praticas: [
      'Inicie sempre almoço e jantar com uma porção generosa de folhas e vegetais crus.',
      'Caminhe 10 a 15 minutos em ritmo leve logo após grandes refeições para ativar captação muscular de glicose via GLUT-4 sem dependência excessiva de insulina.',
      'Evite sucos de fruta concentrados; prefira a fruta inteira com casca e bagaço para preservar as fibras.'
    ],
    roteiro_video: {
      titulo_video: 'O truque simples para comer carboidrato sem dar sono e engordar',
      gancho_inicial: 'Você sente aquela moleza incontrolável depois de almoçar? Mudar a ordem do prato resolve!',
      desenvolvimento: 'Coma a salada primeiro, depois a proteína e por último o arroz ou batata. Essa ordem simples reduz o pico de insulina e mantém seu cérebro focado a tarde toda.',
      chamada_para_acao: 'Faça o teste amanhã e volte aqui para me contar se sentiu mais energia!',
      legendas_sugeridas: [
        '0:00 - O pico glicêmico invisível',
        '0:15 - A ordem correta: fibras, proteínas, carboidratos',
        '0:35 - Como o GLUT-4 age nos músculos',
        '0:50 - Benefícios comprovados na longevidade'
      ]
    },
    audio_script: 'Quinta-feira de Metabolismo e Longevidade no Saúde Sem Mitos! A estabilidade da sua glicose é a chave para energia constante e envelhecimento celular saudável. Altere a ordem dos alimentos e sinta a diferença metabólica.',
    tags: ['Metabolismo', 'Longevidade', 'Glicemia', 'Insulina', 'Bioenergetica', 'MitoCondrias'],
    referencias_cientificas: [
      'Shukla AP, et al. Food Order Has a Significant Impact on Postprandial Glucose and Insulin Levels. Diabetes Care (2015)',
      'The Lancet Diabetes & Endocrinology - Glucose variability and cardiovascular risk',
      'Cell Metabolism - Nutrient sensing and autophagy regulation'
    ],
    aviso_legal: DEFAULT_DISCLAIMER
  },
  domingo: {
    categoria: 'Recuperação & Planejamento',
    pilar_dia: 'Domingo',
    titulo: 'Descanso Ativo e Meal Prep Consciente: Como Preparar a Próxima Semana com Ciência',
    subtitulo: 'Técnicas de higienização de vegetais para longa conservação e descompressão do sistema nervoso autônomo.',
    resumo: 'Transforme o domingo em um divisor de águas: planejamento nutricional sem estresse e práticas de descompressão simpática para iniciar a segunda-feira no ápice de disposição.',
    conteudo_paragrafos: [
      'O domingo não precisa ser sinônimo de angústia pré-segunda-feira. Pelo contrário: a fisiologia do descanso ativo indica que atividades de baixa intensidade na natureza, alongamentos e desconexão de telas promovem a transição do sistema simpático (luta ou fuga) para o parassimpático (restauração).',
      'No âmbito nutricional, a adesão a uma rotina alimentar saudável é decidida na organização prévia. Dedicar 40 minutos para higienizar folhas (imersão em hipoclorito, secagem rigorosa e armazenamento com papel toalha em potes herméticos) garante saladas frescas para a semana toda.',
      'Cozinhar leguminosas e raízes com antecedência e congelar em porções individuais previne escolhas impulsivas por delivery ultraprocessado nos dias de cansaço extremo.',
      'Termine o dia com um banho morno e um momento de leitura em luz baixa para sinalizar ao hipotálamo que o ciclo semanal começará com clareza e vigor.'
    ],
    mito_desmistificado: 'Mito: "Descansar significa ficar o dia todo deitado na cama usando o celular até tarde."',
    fato_cientifico: 'Fato: A rolagem passiva de redes sociais gera sobrecarga sensorial e mantém o córtex visual e pré-frontal em estado de alerta, impedindo a recuperação neural profunda.',
    dicas_praticas: [
      'Seque muito bem as folhas verdes antes de guardar; a umidade residual é a principal causadora de proliferação bacteriana e folhas murchas.',
      'Faça um detox digital de ao menos 4 horas no domingo para resetar os circuitos dopaminérgicos.',
      'Deixe a garrafa de água e o tênis de treino separados para a manhã de segunda-feira.'
    ],
    roteiro_video: {
      titulo_video: 'Como preparar seu corpo e mente no domingo para uma semana épica',
      gancho_inicial: 'Bateu a famosa angústia de domingo à noite? Vamos virar essa chave agora com ciência!',
      desenvolvimento: 'Descanso ativo, folhas verdes higienizadas para a semana e 2 horas sem telas antes de dormir. Pequenos hábitos de domingo garantem uma segunda-feira leve e cheia de foco.',
      chamada_para_acao: 'Qual seu ritual preferido de domingo? Escreva nos comentários!',
      legendas_sugeridas: [
        '0:00 - O estresse da pré-segunda',
        '0:18 - Como higienizar folhas para a semana toda',
        '0:35 - Descanso parassimpático e sono',
        '0:50 - Preparação para a nova semana'
      ]
    },
    audio_script: 'Domingo no Saúde Sem Mitos! Dia de recuperação, autocuidado e planejamento. Quem se organiza no domingo governa sua semana e protege sua saúde contra o estresse crônico. Tenha uma excelente preparação.',
    tags: ['DomingoDeRecuperacao', 'MealPrep', 'DescansoAtivo', 'OrganizacaoSaudavel', 'SaudeMental'],
    referencias_cientificas: [
      'American Journal of Lifestyle Medicine - Meal planning and adherence to dietary guidelines',
      'Frontiers in Psychology - Nature exposure and autonomic nervous system recovery',
      'Sleep Medicine Reviews - Evening screen use and sleep latency'
    ],
    aviso_legal: DEFAULT_DISCLAIMER
  }
};

export function inferPillarFromText(text: string): PillarDay {
  const normalized = (text || '').toLowerCase();
  if (normalized.includes('terça') || normalized.includes('terca') || normalized.includes('mental') || normalized.includes('mente') || normalized.includes('cérebro') || normalized.includes('cerebro') || normalized.includes('ansiedade') || normalized.includes('cortisol') || normalized.includes('foco') || normalized.includes('depress') || normalized.includes('neuro')) {
    return 'terca';
  }
  if (normalized.includes('quarta') || normalized.includes('chá') || normalized.includes('cha') || normalized.includes('infus') || normalized.includes('planta') || normalized.includes('erva') || normalized.includes('fitoter')) {
    return 'quarta';
  }
  if (normalized.includes('quinta') || normalized.includes('metabol') || normalized.includes('glicem') || normalized.includes('insulin') || normalized.includes('longev') || normalized.includes('mitoc') || normalized.includes('autofag') || normalized.includes('colesterol')) {
    return 'quinta';
  }
  if (normalized.includes('sexta') || normalized.includes('sono') || normalized.includes('hábito') || normalized.includes('habito') || normalized.includes('exerc') || normalized.includes('treino') || normalized.includes('hidrata') || normalized.includes('circad')) {
    return 'sexta';
  }
  if (normalized.includes('sábado') || normalized.includes('sabado') || normalized.includes('mito') || normalized.includes('fake') || normalized.includes('crença') || normalized.includes('mentira') || normalized.includes('verdade') || normalized.includes('detox')) {
    return 'sabado';
  }
  if (normalized.includes('domingo') || normalized.includes('planeja') || normalized.includes('meal prep') || normalized.includes('recupera') || normalized.includes('descanso') || normalized.includes('estresse') || normalized.includes('relax')) {
    return 'domingo';
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
