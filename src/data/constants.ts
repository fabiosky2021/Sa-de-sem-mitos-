import { GeneratedArticle, PillarInfo, PillarDay, EditorialPlanItem } from '../types/content';

export const ASSETS = {
  logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDD2dKNmuD9-CtADBo6HBuDVsSXdup73zi654gTdmMVoSoFkOdICm9dYHPZx9Kz79Me8624n-0lTzYWqdIhb2Hn8I0yG1Dk5DrDdElP2c7V3w25zowkYJcp1QzuP_7F-9GFu6NaJ0UawNYT-ACCEYl6ZJvv0KGGi5ewkcwk2gumxpHGsqYBepiY5dvrdvZMTLEv21OzgXKPW87b_EsanTTIZJQ3PvW3BiCCbWbGhDxo',
  profile: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCM9eyFtamQQWqKSdLtFfZr8ix_GiOY1BFI9BvNIhRu7PqP97CyzDE6VUX9tYPb2Jfepr5JtR7nfsA2jl0JR4wP--6CRXut-S_QTudxdnEVDh3TszgMZrd2PsLIxpeztfdFc82m1Ig8AuzRnz9c4viA2TUNr7RK5UVYV0-zsoDI68k5LlVaTcN--coal7rBWDnTjPcChJ3cVNR44_YjK1pwlNlJccutG7Zzin0mgQ7',
  doctorHelena: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5fd30SWcv_KXtvq_A0rECssBTS8wS8WxSG_lCqOSsHqlA9T0KWQS_Obrhb8c7b39cBDSMjpE9lfh94BoJZKrqYlNjFUs_BLHL0b5123t_suFzGcblLSX7w4LOhkRhhVlSHLwBBgeyiHoRgrjft_n5_agnphruVX0FGzGVvibtPqYkT1B2-Sx9Ms7ARtI20J6vP9E6u6FjdYTr9-C5XsNJsNN8iZQCyh1AoF9vZc7n',
  chamomileTeapot: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrul8eTEThFR76hb9Mcno-WVnTFoDF7Vqxv16DixUbXxO8EIwm7TDDWNouHj2IPnyokqlQddgrX5R9t-GNC-owC0f_exyhPnYCeXWQhWYVcM1N5qeg4IWSbtjleamnjkK-MBBJusFf9GpkFxUkTLNgDHfeXdhsaNNcHrIe2A2CRyMC4I9RAPeMlpzxRM_NDoNYsK97gcjmSWISZCqCzg-DnsizpOAD6_zH8au0Mofr',
  sponsorBadge: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSDMb8QmipYaOgOmOXnswuuoNniRfx2b-ZdsmaoTuEi-OxQ0Lp3jiRtZeg3kExcv9kqoYGtY_vJUSb2C5Ybz42DlFnXJbPyjG7o7CZwD2krKMop3sxGuU3SCMOwtmshx01Go1iAbtRVQzC3ibP-cOi8NpSoXvwRS8-4_EXKceFevoHkTeG97-WwIa2DMJKsom2Y86OQUFp9DD22AGkOT2eeaNitNIGKPimekpn8Pq1',
};

export const PILLARS: Record<PillarDay, PillarInfo> = {
  segunda: {
    id: 'segunda',
    dayName: 'Segunda-feira',
    theme: 'Alimentação & Nutrição Consciente',
    description: 'Dicas de pratos balanceados, nutrientes essenciais, biodisponibilidade e reeducação alimentar sem modismos.',
    color: 'emerald',
    badgeBg: 'bg-[#F0FDF4]',
    badgeText: 'text-[#166534]',
    icon: 'restaurant',
    suggestedPrompts: [
      'Como montar um prato balanceado seguindo a regra dos 50% de vegetais?',
      'Proteínas vegetais vs animais: como calcular a ingestão correta?',
      'Carboidratos à noite: engordam ou ajudam no sono?',
      'Análise de rótulo: como identificar açúcares ocultos e aditivos?'
    ]
  },
  terca: {
    id: 'terca',
    dayName: 'Terça-feira',
    theme: 'Saúde Mental & Neurociência',
    description: 'Eixo intestino-cérebro, modulação de cortisol, foco, regulação de ansiedade e neurotransmissores.',
    color: 'purple',
    badgeBg: 'bg-[#FAF5FF]',
    badgeText: 'text-[#6B21A8]',
    icon: 'psychology',
    suggestedPrompts: [
      'Eixo intestino-cérebro: como o microbioma afeta a produção de serotonina e ansiedade?',
      'Cortisol elevado crônico: como identificar sinais e modular com nutrição e respiração?',
      'Dopamina e foco: estratégias naturais para evitar sobrecarga de estímulos digitais',
      'Magnésio e complexo B: qual a evidência clínica na regulação do estresse?'
    ]
  },
  quarta: {
    id: 'quarta',
    dayName: 'Quarta-feira',
    theme: 'Chás & Infusões',
    description: 'Propriedades fitoterápicas, mecanismos fitoquímicos, benefícios validados e precauções clínicas de uso.',
    color: 'emerald',
    badgeBg: 'bg-[#F0FDF4]',
    badgeText: 'text-[#166534]',
    icon: 'psychiatry',
    suggestedPrompts: [
      'Chá de camomila e erva-cidreira: o que a neurociência diz sobre GABA e sono?',
      'Chá de hibisco: qual a dosagem segura e quem deve evitar?',
      'Qual a temperatura correta da água para preservar bioativos?',
      'Chá verde em jejum pode provocar gastrite ou sobrecarga hepática?'
    ]
  },
  quinta: {
    id: 'quinta',
    dayName: 'Quinta-feira',
    theme: 'Metabolismo & Longevidade',
    description: 'Sensibilidade à insulina, autofagia celular, saúde mitocondrial e prevenção de inflamação crônica silenciosa.',
    color: 'teal',
    badgeBg: 'bg-[#F0FDFA]',
    badgeText: 'text-[#115E59]',
    icon: 'vital_signs',
    suggestedPrompts: [
      'Sensibilidade à insulina: como a ordem dos alimentos no prato achata picos de glicemia?',
      'Jejum intermitente e autofagia: o que a ciência humana já comprovou?',
      'Massa muscular como órgão endócrino protetor contra envelhecimento precoce',
      'Gordura visceral vs subcutânea: por que a circunferência abdominal é indicador vital?'
    ]
  },
  sexta: {
    id: 'sexta',
    dayName: 'Sexta-feira',
    theme: 'Hábitos Saudáveis',
    description: 'Rotinas de sono reparador, ciclo circadiano, hidratação celular, treino e regulação do estresse.',
    color: 'blue',
    badgeBg: 'bg-[#EFF6FF]',
    badgeText: 'text-[#1E40AF]',
    icon: 'bedtime',
    suggestedPrompts: [
      'Protocolo de higiene do sono: luz matinal e corte de telas azuis',
      'Quantos litros de água meu corpo realmente necessita por peso?',
      'Caminhada de 10 minutos após as refeições reduz pico glicêmico?',
      'Exercícios respiratórios para regular o sistema nervoso simpático'
    ]
  },
  sabado: {
    id: 'sabado',
    dayName: 'Sábado',
    theme: 'Sábados Sem Mitos',
    description: 'Desmistificação profunda de mitos da internet, fakes sobre dietas e modismos pseudocientíficos.',
    color: 'amber',
    badgeBg: 'bg-[#FFFBEB]',
    badgeText: 'text-[#B45309]',
    icon: 'verified_user',
    suggestedPrompts: [
      'Água morna com limão em jejum queima gordura e alcaliniza o sangue?',
      'Glúten e lactose são inflamatórios para todas as pessoas?',
      'Sucos detox desintoxicam o fígado ou é mito comercial?',
      'Óleo de coco no café: melhora o cérebro ou altera o colesterol LDL?'
    ]
  },
  domingo: {
    id: 'domingo',
    dayName: 'Domingo',
    theme: 'Recuperação & Planejamento',
    description: 'Descanso ativo, planejamento da semana (meal prep saudável), descompressão mental e restauração fisiológica.',
    color: 'indigo',
    badgeBg: 'bg-[#EEF2FF]',
    badgeText: 'text-[#3730A3]',
    icon: 'self_improvement',
    suggestedPrompts: [
      'Meal Prep Inteligente: como higienizar e conservar vegetais para durarem a semana toda',
      'Descanso ativo: caminhada na natureza e sua ação nos biomarcadores inflamatórios',
      'Detox digital de domingo: o impacto real de 12 horas offline no sistema nervoso',
      'Planejamento semanal de saúde: como definir metas realistas sem ansiedade'
    ]
  }
};

/**
 * Retorna o pilar correspondente ao dia da semana atual (0: domingo até 6: sábado).
 */
export function getCurrentDayPillar(): PillarDay {
  const dayIndex = new Date().getDay();
  switch (dayIndex) {
    case 0:
      return 'domingo';
    case 1:
      return 'segunda';
    case 2:
      return 'terca';
    case 3:
      return 'quarta';
    case 4:
      return 'quinta';
    case 5:
      return 'sexta';
    case 6:
      return 'sabado';
    default:
      return 'segunda';
  }
}


export const PROTO_CHAMOMILE_ARTICLE: GeneratedArticle = {
  id: 'art-chamomile-gaba',
  createdAt: 'Hoje • 10:45',
  pilar_dia: 'Quarta-feira',
  pilarId: 'quarta',
  categoria: 'Quarta: Chás & Infusões',
  evidenceBadge: 'Evidência Nível A',
  readingTime: '4 min de leitura',
  audioTime: '3 min de áudio',
  titulo: 'Chá de Camomila e Erva-Cidreira: O que a neurociência diz sobre ansiedade e sono',
  subtitulo: 'Entre o saber popular e os ensaios clínicos randomizados: investigamos como os flavonoides botânicos atuam diretamente nos neurotransmissores cerebrais.',
  resumo: 'Investigamos os compostos bioativos da camomila e cidreira com foco no papel da apigenina nos receptores GABA-A e no ácido rosmarínico na inibição da enzima GABA transaminase.',
  reviewer: {
    name: 'Dra. Camila Duarte',
    role: 'Nutricionista & Fisiologista Clínica • CRN-3 48.219',
    avatar: ASSETS.doctorHelena
  },
  video: {
    title: 'Demonstração: Infusão & Absorção Cerebral',
    description: 'Dr. Thiago Mello demonstra os compostos ativos em 3D e o impacto celular no encéfalo.',
    duration: '03:12',
    thumbnail: ASSETS.chamomileTeapot,
    subtitles: [
      { time: 0, text: 'Olá! Bem-vindo à análise neuroquímica do Saúde Sem Mitos.' },
      { time: 6, text: 'Hoje investigamos a camomila e a erva-cidreira sob a ótica dos ensaios clínicos.' },
      { time: 18, text: 'A apigenina presente na flor liga-se aos sítios de benzodiazepínicos nos receptores GABA-A.' },
      { time: 34, text: 'Isso induz ondas cerebrais alfa e reduz a hiperatividade no córtex pré-frontal.' },
      { time: 50, text: 'Atenção ao preparo: nunca ferva as folhas para não degradar os óleos voláteis.' },
      { time: 65, text: 'Abafar por 8 a 10 minutos preserva o ácido rosmarínico e garante eficácia.' }
    ]
  },
  audio: {
    duration: '03:00',
    script: 'Entre o saber popular e os ensaios clínicos randomizados: quando aquecida de forma controlada, a planta libera flavonoides específicos. A apigenina atua ligando-se aos sítios de benzodiazepínicos nos receptores GABA-A, proporcionando sedação suave sem causar dependência física. Paralelamente, a erva-cidreira inibe a enzima GABA transaminase, retardando a degradação desse neurotransmissor calmante.',
    sentences: [
      'Entre o saber popular e os ensaios clínicos randomizados: investigamos como os flavonoides botânicos atuam no cérebro.',
      'Quando aquecida de forma controlada a 90 graus, a planta libera flavonoides específicos de alta biodisponibilidade.',
      'A apigenina atua ligando-se aos sítios de benzodiazepínicos nos receptores GABA-A.',
      'Isso proporciona sedação suave e relaxamento muscular sem causar dependência física ou efeito de ressaca.',
      'Paralelamente, a erva-cidreira inibe a enzima GABA transaminase, prolongando a ação relaxante natural.'
    ]
  },
  verdict: {
    status: 'COMPROVADO COM RESSALVAS',
    evidenceLevel: 'Meta-análise Cochrane',
    summary: 'Efeito ansiolítico leve e redução da latência do sono comprovados em pequenos e médios ensaios clínicos. Não substitui medicação para transtornos de ansiedade generalizada grave ou insônia crônica.'
  },
  conteudo_paragrafos: [
    'O efeito calmante da camomila (Matricaria chamomilla) não é mero placebo ou memória afetiva. Ela contém alto teor de apigenina, um flavonoide bioativo com estrutura química capaz de ultrapassar a barreira hematoencefálica.',
    'Paralelamente, a erva-cidreira (Melissa officinalis) inibe a enzima GABA transaminase, impedindo a degradação rápida deste neurotransmissor inibitório essencial.'
  ],
  biologicalCascade: [
    {
      title: 'Apigenina',
      subtitle: 'Flavonoide livre',
      icon: 'spa'
    },
    {
      title: 'Receptor GABA-A',
      subtitle: 'Modulação alostérica',
      icon: 'hub'
    },
    {
      title: 'Acalmia Neural',
      subtitle: 'Indução de ondas alfa',
      icon: 'bedtime'
    }
  ],
  preparationSteps: [
    {
      number: 1,
      title: 'Não ferva as folhas e flores (Infusão, não decocção)',
      description: 'Aqueça 200ml de água até 90°C (início das bolhas finas). Desligue o fogo antes da ebulição vigorosa.'
    },
    {
      number: 2,
      title: 'Proporção clínica recomendada',
      description: 'Utilize de 2g a 3g (cerca de 1 colher de sopa) das flores secas de camomila e folhas de cidreira.'
    },
    {
      number: 3,
      title: 'Abafamento obrigatório por 8 a 10 minutos',
      description: 'Os óleos essenciais terapêuticos (ácido rosmarínico) condensam na tampa e retornam à xícara em vez de evaporar.'
    }
  ],
  contraindications: [
    {
      title: 'Gestantes e Lactantes',
      description: 'Doses elevadas de camomila e cidreira podem induzir estímulo reflexo uterino. Uso apenas sob prescrição obstétrica.',
      icon: 'pregnant_woman',
      severity: 'error'
    },
    {
      title: 'Sinergia com Sedativos e Ansiolíticos',
      description: 'Potencializa os efeitos de clonazepam, diazepam e zolpidem, podendo causar sonolência excessiva diurna e bradicardia leve.',
      icon: 'medication',
      severity: 'error'
    },
    {
      title: 'Hipotensão & Pré-Operatório',
      description: 'Suspender o consumo frequente 7 dias antes de procedimentos cirúrgicos programados com anestesia geral.',
      icon: 'shield',
      severity: 'info'
    }
  ],
  mito_desmistificado: 'Mito: "Chás calmantes são poções milagrosas que curam depressão profunda e insônia crônica sem precisar de médico."',
  fato_cientifico: 'Fato: A apigenina age modulando suavemente os receptores GABA-A, proporcionando alívio ansiolítico leve e melhora da latência inicial do sono, sem substituir intervenção psiquiátrica ou psicoterapia.',
  dicas_praticas: [
    'Tome o chá entre 45 e 60 minutos antes do horário desejado para deitar.',
    'Evite telas de luz azul (smartphones e computadores) após tomar a infusão para não inibir a melatonina.',
    'Prefira a erva a granel em lojas de produtos naturais com folhas inteiras em vez de sachês moídos industriais.'
  ],
  roteiro_video: {
    titulo_video: 'O que a neurociência diz sobre o chá de camomila e sono',
    gancho_inicial: 'Você acha que chá de camomila é só coisa de avó? A neurociência provou o contrário!',
    desenvolvimento: 'A flor contém apigenina, um composto que se liga aos mesmos receptores calmantes do cérebro estimulados por medicamentos ansiolíticos, mas sem gerar dependência química. Mas cuidado: água fervendo destrói esse composto!',
    chamada_para_acao: 'Comente como você prepara o seu chá à noite e compartilhe com quem sofre de insônia!',
    legendas_sugeridas: [
      '0:00 - Saber popular vs. Neuroquímica',
      '0:15 - A ação da apigenina no GABA-A',
      '0:35 - O erro de ferver a água a 100 graus',
      '0:50 - Contraindicações e cuidados'
    ]
  },
  audio_script: 'Olá, bem-vindo ao Saúde Sem Mitos! Hoje investigamos a camomila e a erva-cidreira. A ciência moderna comprova: a apigenina atravessa a barreira do cérebro e modula os receptores GABA-A, facilitando o relaxamento natural. Respeite sempre a infusão correta.',
  tags: ['ChasEInfusoes', 'Camomila', 'GABA', 'Neurociencia', 'HigieneDoSono', 'Fitoterapia'],
  referencias_cientificas: [
    {
      title: 'PubMed Central • PMID: 27912875',
      authors: 'Amsterdam JD, et al. Chamomile (Matricaria recutita) for Generalized Anxiety Disorder.',
      url: 'https://pubmed.ncbi.nlm.nih.gov/27912875/'
    },
    {
      title: 'Cochrane Database of Systematic Reviews',
      authors: 'Herbal preparations for sleep disorders and anxiety: a systematic analysis.',
      url: 'https://www.cochranelibrary.com'
    },
    {
      title: 'SciELO • Rev. Bras. Farmacognosia',
      authors: 'Efeitos do extrato hidroalcoólico de Melissa officinalis L. no sistema GABAérgico.',
      url: 'https://www.scielo.br'
    }
  ],
  aviso_legal: 'O conteúdo publicado pelo Saúde Sem Mitos possui propósito exclusivamente educativo, científico e informativo. Não substitui consulta, diagnóstico, acompanhamento médico especializado ou prescrição de nutricionistas e farmacêuticos. Nunca interrompa tratamentos alopáticos por conta própria.'
};

export const PROTO_MYTH_ARTICLE: GeneratedArticle = {
  id: 'art-lemon-water',
  createdAt: 'Ontem • 18:20',
  pilar_dia: 'Sábado',
  pilarId: 'sabado',
  categoria: 'Sábados Sem Mitos',
  evidenceBadge: 'Evidência Nível A',
  readingTime: '5 min de leitura',
  audioTime: '3 min de áudio',
  titulo: 'Mito Desvendado: Água Morna com Limão em Jejum Realmente Emagrece e Alcaliniza o Sangue?',
  subtitulo: 'Análise fisiológica do equilíbrio ácido-base, da capacidade de oxidação lipídica e da função real de rins e fígado.',
  resumo: 'Colocamos à prova uma das maiores crenças do bem-estar na internet e comprovamos fisiologicamente por que o pH do sangue humano não é alterado por alimentos.',
  reviewer: {
    name: 'Dr. Lucas Brandão',
    role: 'Médico Fisiologista Clínico • CRM-SP 182.901',
    avatar: ASSETS.profile
  },
  video: {
    title: 'Desmascarando o Shot de Limão em Jejum',
    description: 'A verdade sobre o pH sanguíneo e a degradação de adipócitos explicada em animação.',
    duration: '02:45',
    thumbnail: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    subtitles: [
      { time: 0, text: 'Sábado Sem Mitos no ar!' },
      { time: 5, text: 'Água morna com limão em jejum queima gordura?' },
      { time: 14, text: 'Fisiologicamente, o sangue é tamponado rigidamente entre 7.35 e 7.45.' },
      { time: 26, text: 'Nenhum copo de limão altera o pH do seu organismo.' },
      { time: 40, text: 'O limão tem vitamina C excelente, mas quem desintoxica seu corpo são rins e fígado.' }
    ]
  },
  audio: {
    duration: '02:40',
    script: 'Todos os dias ouvimos que a água com limão alcaliniza o corpo e derrete gordura. A bioquímica demonstra que o sangue possui sistemas tampão pulmonares e renais que mantêm o pH rigorosamente entre 7,35 e 7,45. A queima de gordura exige déficit calórico e sinalização hormonal, não ácido cítrico.',
    sentences: [
      'Todos os dias ouvimos que a água com limão alcaliniza o corpo e derrete gordura.',
      'A bioquímica demonstra que o sangue possui sistemas tampão pulmonares e renais invioláveis.',
      'Se o pH mudasse por comida, ocorreria acidose ou alcalose grave.',
      'O limão fornece vitamina C e antioxidantes, mas o detox é realizado 24 horas pelo fígado e rins.'
    ]
  },
  verdict: {
    status: 'DESMISTIFICADO / FALSO',
    evidenceLevel: 'Diretrizes SBAN & NEJM',
    summary: 'Alegações de queima lipídica localizada e alteração do pH sanguíneo são pseudociência sem base biológica. O limão é fonte nutritiva de vitamina C, mas não desintoxica nem emagrece por si só.'
  },
  conteudo_paragrafos: [
    'A alegação de que um copo matinal de água morna com limão alcaliniza o organismo e desintoxica o fígado é bioquimicamente falsa. O pH do sangue humano é rigidamente controlado entre 7,35 e 7,45 pelo sistema de bicarbonato pulmonar e renal.',
    'Quanto à queima de gordura, a lipólise requer sinalização de receptores beta-adrenérgicos sob déficit calórico. O ácido cítrico não possui nenhuma ação farmacológica direta na quebra de triglicerídeos acumulados.'
  ],
  biologicalCascade: [
    {
      title: 'Ácido Cítrico',
      subtitle: 'Nutriente oral',
      icon: 'nutrition'
    },
    {
      title: 'Tampão Bicarbonato',
      subtitle: 'Regulação renal/pulmonar',
      icon: 'shield'
    },
    {
      title: 'pH 7.35 - 7.45',
      subtitle: 'Homeostase mantida',
      icon: 'verified'
    }
  ],
  preparationSteps: [
    {
      number: 1,
      title: 'Hidratação Simples e Eficaz',
      description: 'Beba 300ml a 500ml de água em temperatura ambiente ao acordar para restabelecer a volemia.'
    },
    {
      number: 2,
      title: 'Use canudo para preservar o esmalte',
      description: 'O contato contínuo do ácido cítrico com os dentes provoca desmineralização precoce do esmalte dentário.'
    },
    {
      number: 3,
      title: 'Enxágue a boca com água pura',
      description: 'Não escove os dentes imediatamente após bebidas ácidas; aguarde 30 minutos ou apenas enxágue.'
    }
  ],
  contraindications: [
    {
      title: 'Gastrite Erosiva e Refluxo Ativo',
      description: 'O consumo de ácidos em jejum pode piorar sintomas de pirose e dor epigástrica aguda.',
      icon: 'warning',
      severity: 'error'
    },
    {
      title: 'Erosão Dental Crônica',
      description: 'Pessoas com sensibilidade dentária severa devem evitar sucos cítricos concentrados diários sem proteção.',
      icon: 'dentistry',
      severity: 'warning'
    }
  ],
  mito_desmistificado: 'Mito: "Tomar água morna com limão em jejum queima gordura abdominal e alcaliniza o sangue."',
  fato_cientifico: 'Fato: O pH sanguíneo é tamponado pelo organismo. Quem realiza o processo de desintoxicação são o fígado e os rins.',
  dicas_praticas: [
    'Consuma cerca de 35ml de água por quilo de peso corporal ao longo do dia.',
    'Aproveite o limão em saladas para aumentar a absorção de ferro não-heme de vegetais escuros.',
    'Não compre suplementos caros que prometem alcalinizar seu corpo.'
  ],
  roteiro_video: {
    titulo_video: 'A verdade definitiva sobre água com limão em jejum',
    gancho_inicial: 'Você acorda todo dia tomando água com limão para emagrecer? Pare agora e veja a verdade!',
    desenvolvimento: 'O limão tem vitamina C excelente, mas não queima gordura e não muda o pH do seu sangue. Quem desintoxica seu corpo são os seus rins e o seu fígado!',
    chamada_para_acao: 'Comente qual outro mito de dieta você já ouviu por aí!',
    legendas_sugeridas: [
      '0:00 - O mito do shot milagroso',
      '0:15 - A verdade do pH sanguíneo',
      '0:35 - Como seu fígado desintoxica',
      '0:50 - Cuidados com o esmalte dentário'
    ]
  },
  audio_script: 'Sábado Sem Mitos! Desvendamos de vez a água com limão em jejum. Ela hidrata, mas não emagrece e nem altera o pH do seu sangue. Saúde se constrói com ciência!',
  tags: ['SabadoSemMitos', 'AguaComLimao', 'FakeNewsSaude', 'Bioquimica', 'Detox'],
  referencias_cientificas: [
    {
      title: 'The New England Journal of Medicine',
      authors: 'Physiology of Acid-Base Balance and Systemic Homeostasis.',
      url: 'https://www.nejm.org'
    },
    {
      title: 'Sociedade Brasileira de Alimentação e Nutrição (SBAN)',
      authors: 'Parecer Técnico: Mitos sobre Dietas Alcalinas e Emagrecimento.',
      url: 'https://sban.org.br'
    }
  ],
  aviso_legal: 'O conteúdo publicado pelo Saúde Sem Mitos possui propósito exclusivamente educativo, científico e informativo. Não substitui consulta, diagnóstico ou acompanhamento médico especializado.'
};

export const PROTO_NUTRITION_ARTICLE: GeneratedArticle = {
  id: 'art-segunda-regra-50',
  createdAt: 'Segunda-feira • 08:00',
  pilar_dia: 'Segunda-feira',
  pilarId: 'segunda',
  categoria: 'Segunda: Alimentação & Nutrição',
  evidenceBadge: 'Evidência Nível A',
  readingTime: '4 min de leitura',
  audioTime: '3 min de áudio',
  titulo: 'A Regra dos 50%: Vegetais, Densidade Nutricional e Bioquímica das Fibras sem Cortar Carboidratos',
  subtitulo: 'Como a distribuição geométrica do prato achata picos de insulina pós-prandiais e alimenta a microbiota sem apelar para restrições calóricas extremas.',
  resumo: 'A regra dos 50% consiste em preencher metade do prato com vegetais e folhosos variados, 25% com proteínas de alto valor biológico e 25% com carboidratos complexos ricos em fibras.',
  reviewer: {
    name: 'Dra. Camila Duarte',
    role: 'Nutricionista & Fisiologista Clínica • CRN-3 48.219',
    avatar: ASSETS.doctorHelena
  },
  video: {
    title: 'A Geometria do Prato Anti-inflamatório',
    description: 'Dra. Camila Duarte demonstra como a matriz de fibras atrasa o esvaziamento gástrico e estabiliza a glicemia.',
    duration: '03:15',
    thumbnail: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    subtitles: [
      { time: 0, text: 'Segunda-feira é dia de Alimentação Consciente sem terrorismo!' },
      { time: 6, text: 'Você não precisa cortar o arroz e o feijão para emagrecer com saúde.' },
      { time: 18, text: 'A regra dos 50% prioriza volume de fitoquímicos e saciedade gástrica.' },
      { time: 32, text: 'As fibras solúveis formam uma malha gelatinosa que retarda a absorção de glicose.' },
      { time: 48, text: 'Proteína em 25% garante sinalização de peptídeo YY e preservação de massa magra.' }
    ]
  },
  audio: {
    duration: '03:10',
    script: 'Bem-vindo ao pilar de Alimentação e Nutrição Consciente do Saúde Sem Mitos. Hoje abordamos a regra dos 50%: metade do prato composta por hortaliças cruas e cozidas, garantindo fibras prebióticas e micronutrientes. Ao associar 25% de fontes proteicas e 25% de carboidratos com baixa carga glicêmica, mantemos o hormônio insulina estável ao longo de toda a tarde.',
    sentences: [
      'Segunda-feira é dia de Alimentação Consciente sem terrorismo nutricional.',
      'A regra dos 50% preconiza metade do prato preenchida com vegetais coloridos e folhas.',
      'As fibras solúveis formam uma malha viscosa no lúmen intestinal que atenua picos de glicemia.',
      'Os outros dois quartos são divididos harmonicamente entre proteínas e carboidratos complexos.',
      'Essa estratégia assegura saciedade sustentada sem a necessidade de contar calorias obsessivamente.'
    ]
  },
  verdict: {
    status: 'COMPROVADO',
    evidenceLevel: 'Diretrizes Clínicas SBAN & Harvard Health',
    summary: 'A divisão balanceada do prato com predomínio de vegetais apresenta comprovação clínica de nível A para melhora de marcadores metabólicos e adesão dietética a longo prazo.'
  },
  conteudo_paragrafos: [
    'O terrorismo nutricional que demoniza grupos alimentares inteiros — como carboidratos complexos — costuma gerar frustração e o temido efeito sanfona. Do ponto de vista fisiológico, a regra dos 50% apoia-se na viscosidade das fibras e no volume alimentar de baixa densidade energética.',
    'Ao mastigar primeiro os vegetais e a proteína, o trato gastrointestinal libera os hormônios GLP-1 e colecistoquinina (CCK), sinalizando saciedade ao hipotálamo antes mesmo da digestão completa dos amidos.'
  ],
  biologicalCascade: [
    {
      title: 'Fibras Solúveis',
      subtitle: 'Malha no duodeno',
      icon: 'spa'
    },
    {
      title: 'Liberação de GLP-1',
      subtitle: 'Sinalização de saciedade',
      icon: 'hub'
    },
    {
      title: 'Curva Glicêmica Plana',
      subtitle: 'Sem picos de insulina',
      icon: 'verified'
    }
  ],
  preparationSteps: [
    {
      number: 1,
      title: 'Preencha 50% com Vegetais Variados',
      description: 'Misture folhas verdes escuras (espinafre, rúcula) com legumes coloridos (cenoura, abobrinha, brócolis).'
    },
    {
      number: 2,
      title: 'Reserve 25% para Proteínas Magras',
      description: 'Ovos, peixes, frango ou leguminosas (lentilha, grão-de-bico) correspondentes ao tamanho da palma da sua mão.'
    },
    {
      number: 3,
      title: 'Complete 25% com Carboidratos Integrais',
      description: 'Arroz integral com feijão, batata-doce, mandioca ou quinoa para fornecer energia sustentada aos miócitos.'
    }
  ],
  contraindications: [
    {
      title: 'Síndrome do Intestino Irritável em Crise',
      description: 'Pacientes com hipersensibilidade visceral devem moderar fibras fermentáveis (FODMAPs) durante fases de crise.',
      icon: 'warning',
      severity: 'warning'
    },
    {
      title: 'Doença Renal Crônica Avançada',
      description: 'Exige ajuste individualizado de potássio e fósforo presente nos vegetais sob acompanhamento nefrológico.',
      icon: 'medication',
      severity: 'error'
    }
  ],
  mito_desmistificado: 'Mito: "Para emagrecer com saúde é obrigatório zerar qualquer tipo de carboidrato na refeição."',
  fato_cientifico: 'Fato: O consumo equilibrado de carboidratos com fibras complexas não prejudica a perda de gordura e previne alterações no humor e queda do rendimento físico.',
  dicas_praticas: [
    'Inicie a refeição pelas folhas e legumes crus: a mastigação prolongada ativa mecanorreceptores estomacais.',
    'Tempere com azeite de oliva extravirgem extravirgem: os ácidos graxos monoinsaturados elevam a biodisponibilidade de carotenoides.',
    'Não substitua comida de verdade por shakes industrializados ultrarprocessados.'
  ],
  roteiro_video: {
    titulo_video: 'A Regra dos 50%: Como comer de tudo sem passar fome',
    gancho_inicial: 'Você ainda acha que precisa passar fome ou cortar o arroz com feijão pra ter saúde? Veja isso!',
    desenvolvimento: 'A regra dos 50% é o método científico mais simples do mundo: metade do prato com vegetais e legumes. As fibras formam uma barreira que retarda a absorção de glicose e te mantém saciado a tarde toda!',
    chamada_para_acao: 'Comente como você costuma montar seu prato e envie para quem vive de dieta maluca!',
    legendas_sugeridas: [
      '0:00 - Chega de terrorismo alimentar',
      '0:15 - A anatomia do prato ideal',
      '0:35 - Como as fibras controlam a fome',
      '0:50 - Pratique já no próximo almoço'
    ]
  },
  audio_script: 'Olá! Segunda-feira é o dia perfeito para organizar a alimentação com sabedoria e embasamento. A regra dos 50% não é modismo: ela baseia-se na cinética de esvaziamento gástrico e na nutrição das bactérias do cólon. Prato colorido é saúde preventiva.',
  tags: ['AlimentacaoConsciente', 'NutricaoClinica', 'RegraDos50', 'Fibras', 'IndiceGlicemico', 'SegundaSemMito'],
  referencias_cientificas: [
    {
      title: 'The Lancet Diabetes & Endocrinology',
      authors: 'Dietary fibre and whole grains in diabetes management: systematic review and meta-analysis.',
      url: 'https://www.thelancet.com'
    },
    {
      title: 'Sociedade Brasileira de Alimentação e Nutrição (SBAN)',
      authors: 'Guia de Diretrizes para Alimentação Saudável e Prevenção de Doenças Crônicas.',
      url: 'https://sban.org.br'
    }
  ],
  aviso_legal: 'O conteúdo publicado pelo Saúde Sem Mitos possui propósito exclusivamente educativo, científico e informativo. Não substitui consulta médica ou planejamento dietético individualizado elaborado por nutricionista.'
};

export const PROTO_NEURO_ARTICLE: GeneratedArticle = {
  id: 'art-terca-eixo-intestino-cerebro',
  createdAt: 'Terça-feira • 08:30',
  pilar_dia: 'Terça-feira',
  pilarId: 'terca',
  categoria: 'Terça: Saúde Mental & Neurociência',
  evidenceBadge: 'Evidência Nível A',
  readingTime: '5 min de leitura',
  audioTime: '3 min de áudio',
  titulo: 'Eixo Intestino-Cérebro: Como a Microbiota Modula Serotonina e o Eixo HPA no Controle do Cortisol',
  subtitulo: 'Investigamos as vias bidirecionais do nervo vago e a produção de ácidos graxos de cadeia curta que impactam diretamente a ansiedade e o foco.',
  resumo: 'Cerca de 90% da serotonina do organismo e diversos mediadores GABAérgicos são sintetizados no ambiente entérico. Descubra como desequilíbrios na flora modulam a reatividade ao estresse crônico.',
  reviewer: {
    name: 'Dr. Thiago Mello',
    role: 'Médico Neurologista & Pesquisador Clínico • CRM-SP 194.332',
    avatar: ASSETS.profile
  },
  video: {
    title: 'A Conexão Vagal: Do Intestino ao Lobo Frontal',
    description: 'Dr. Thiago Mello explica a sinalização neurológica entre o microbioma e a produção de neurotransmissores.',
    duration: '03:30',
    thumbnail: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    subtitles: [
      { time: 0, text: 'Terça-feira da Neurociência no Saúde Sem Mitos!' },
      { time: 7, text: 'Você sabia que o intestino abriga mais de 500 milhões de neurônios?' },
      { time: 20, text: 'O nervo vago transmite impulsos contínuos da microbiota diretamente ao encéfalo.' },
      { time: 35, text: 'Bactérias benéficas fermentam fibras e produzem butirato, que atenua a neuroinflamação.' },
      { time: 52, text: 'Alimentar bem suas bactérias é cuidar diretamente do humor e da clareza mental.' }
    ]
  },
  audio: {
    duration: '03:15',
    script: 'Seja bem-vindo à Terça-feira de Saúde Mental e Neurociência. Hoje desvendamos o eixo intestino-cérebro. A comunicação entre o trato gastrointestinal e as áreas límbicas cerebrais ocorre por vias neurais, endócrinas e imunológicas. Espécies de Lactobacillus e Bifidobacterium participam da síntese de precursores do GABA e atenuam a hiperatividade do eixo hipotálamo-hipófise-adrenal.',
    sentences: [
      'Na neurociência contemporânea, o intestino é reconhecido como o nosso segundo cérebro.',
      'O nervo vago estabelece uma via expressa de mão dupla conectando o cólon ao tronco encefálico.',
      'A microbiota sintetiza ácidos graxos de cadeia curta como o butirato, protetor da barreira hematoencefálica.',
      'Pacientes com disbiose intestinal frequentemente apresentam amplificação de sintomas ansiosos e nevoeiro mental.',
      'Ajustar o ecossistema entérico é pilar indispensável para a estabilidade emocional duradoura.'
    ]
  },
  verdict: {
    status: 'COMPROVADO',
    evidenceLevel: 'Ensaios Clínicos Nature Neuroscience & Cell',
    summary: 'A influência da microbiota na modulação do estresse e na regulação imunológica cerebral é consenso em neurogastroenterologia com robustas evidências pré-clínicas e clínicas.'
  },
  conteudo_paragrafos: [
    'O plexo mioentérico e o plexo submucoso compõem o sistema nervoso entérico, capaz de operar autonomamente. A integridade da barreira intestinal impede a translocação de lipopolissacarídeos (LPS) bacterianos para a circulação sistêmica, evitando a cascata pró-inflamatória que atinge o cérebro.',
    'Quando o microbioma é enriquecido com prebióticos e compostos polifenólicos, a liberação de citocinas inflamatórias (como IL-6 e TNF-alfa) declina, resultando em menor ativação da amígdala cerebral e melhor modulação do cortisol.'
  ],
  biologicalCascade: [
    {
      title: 'Microbiota Saudável',
      subtitle: 'Produção de Butirato',
      icon: 'spa'
    },
    {
      title: 'Estímulo ao Nervo Vago',
      subtitle: 'Sinalização parassimpática',
      icon: 'hub'
    },
    {
      title: 'Regulação de Cortisol',
      subtitle: 'Homeostase do Eixo HPA',
      icon: 'psychology'
    }
  ],
  preparationSteps: [
    {
      number: 1,
      title: 'Aumente o Consumo de Fibras Prebióticas',
      description: 'Inclua cebola, alho, aveia, maçã e biomassa de banana verde para fermentação benéfica no cólon.'
    },
    {
      number: 2,
      title: 'Incorpore Alimentos Fermentados Naturais',
      description: 'Kefir de água, iogurte natural sem aditivos ou chucrute cru auxiliam na diversidade de cepas bacterianas.'
    },
    {
      number: 3,
      title: 'Controle o Uso Indiscriminado de Antibióticos e AINEs',
      description: 'Anti-inflamatórios e antibióticos sem prescrição danificam a mucosa intestinal e alteram a flora por meses.'
    }
  ],
  contraindications: [
    {
      title: 'Supercrescimento Bacteriano no Intestino Delgado (SIBO)',
      description: 'Em quadros de SIBO, o uso precoce de probióticos concentrados pode agravar distensão e dor abdominal.',
      icon: 'warning',
      severity: 'error'
    },
    {
      title: 'Imunossupressão Severa',
      description: 'Pacientes em quimioterapia de alta dose ou transplantados requerem cautela no uso de cepas vivas concentradas.',
      icon: 'shield',
      severity: 'warning'
    }
  ],
  mito_desmistificado: 'Mito: "Ansiedade e depressão são distúrbios que residem exclusivamente na mente e não têm relação com a digestão."',
  fato_cientifico: 'Fato: A inflamação crônica de baixo grau e a disbiose entérica estão intimamente associadas a alterações comportamentais e respostas exageradas ao estresse através do nervo vago.',
  dicas_praticas: [
    'Pratique respiração diafragmática de 4 tempos antes das refeições para estimular o tônus vagal parassimpático.',
    'Consuma fontes alimentares de triptofano (peixes, ovos, sementes de abóbora) associadas a carboidratos para favorecer a síntese de serotonina.',
    'Reduza o consumo de adoçantes artificiais que alteram negativamente o perfil da microbiota.'
  ],
  roteiro_video: {
    titulo_video: 'O que o seu intestino tem a ver com a sua ansiedade?',
    gancho_inicial: 'Você vive ansioso ou com a cabeça cansada? O problema pode não estar na sua cabeça, mas na sua barriga!',
    desenvolvimento: 'O nervo vago liga diretamente seu intestino ao cérebro. Se sua flora intestinal está inflamada por excesso de ultraprocessados, o cérebro recebe sinais de perigo constantes e aumenta o cortisol.',
    chamada_para_acao: 'Comente se você já percebeu como o estresse ataca seu estômago e compartilhe!',
    legendas_sugeridas: [
      '0:00 - O segundo cérebro humano',
      '0:18 - A rota expressa do nervo vago',
      '0:38 - Como bactérias produzem calmantes',
      '0:52 - Três alimentos para blindar o humor'
    ]
  },
  audio_script: 'Terça-feira de Neurociência no ar! Cuidar da mente passa pelo cuidado diário com a integridade do seu trato digestivo. O nervo vago trabalha 24 horas informando o cérebro sobre o estado das suas células. Respeite sua microbiota com comida de verdade.',
  tags: ['SaudeMental', 'Neurociencia', 'EixoIntestinoCerebro', 'Microbioma', 'NervoVago', 'Ansiedade'],
  referencias_cientificas: [
    {
      title: 'Nature Reviews Neuroscience',
      authors: 'Cryan JF, et al. The microbiota-gut-brain axis: from neurodevelopment to mental health.',
      url: 'https://www.nature.com'
    },
    {
      title: 'Cell Host & Microbe',
      authors: 'Microbial regulation of host serotonin biosynthesis and enteric neurotransmission.',
      url: 'https://www.cell.com'
    }
  ],
  aviso_legal: 'O conteúdo publicado pelo Saúde Sem Mitos possui propósito exclusivamente educativo, científico e informativo. Transtornos de ansiedade e depressão exigem diagnóstico e acompanhamento por psiquiatras e psicólogos.'
};

export const PROTO_METABOLISM_ARTICLE: GeneratedArticle = {
  id: 'art-quinta-metabolismo-ordem-alimentos',
  createdAt: 'Quinta-feira • 08:00',
  pilar_dia: 'Quinta-feira',
  pilarId: 'quinta',
  categoria: 'Quinta: Metabolismo & Longevidade',
  evidenceBadge: 'Evidência Nível A',
  readingTime: '4 min de leitura',
  audioTime: '3 min de áudio',
  titulo: 'Ordem dos Alimentos no Prato: Como Achatar Picos de Glicose e Proteger a Função Mitocondrial',
  subtitulo: 'Ensaios clínicos comprovam que consumir fibras e proteínas antes dos amidos reduz em até 73% o pico de glicose e poupa a liberação de insulina.',
  resumo: 'A sequência de ingestão dos macronutrientes na mesma refeição altera drasticamente a curva glicêmica pós-prandial, prevenindo a glicação de proteínas e o estresse oxidativo celular.',
  reviewer: {
    name: 'Dra. Camila Duarte',
    role: 'Nutricionista & Fisiologista Clínica • CRN-3 48.219',
    avatar: ASSETS.doctorHelena
  },
  video: {
    title: 'A Bioquímica da Sequência Alimentar',
    description: 'Demonstração de sensores contínuos de glicose comparando a ordem dos alimentos em refeições idênticas.',
    duration: '03:00',
    thumbnail: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80',
    subtitles: [
      { time: 0, text: 'Quinta-feira de Metabolismo e Longevidade!' },
      { time: 6, text: 'Você sabia que a ordem em que você come o mesmo prato muda tudo?' },
      { time: 19, text: 'Começar pelas fibras cria uma barreira gelatinosa no intestino delgado.' },
      { time: 33, text: 'Ao comer o carboidrato por último, a glicose é absorvida em fluxo suave e contínuo.' },
      { time: 48, text: 'Resultado: menos fadiga após o almoço e mitocôndrias protegidas da glicação.' }
    ]
  },
  audio: {
    duration: '02:55',
    script: 'Bem-vindo ao pilar de Metabolismo e Longevidade do Saúde Sem Mitos. Não é apenas o que você come, mas a ordem em que ingere os alimentos. Ensaios clínicos demonstraram que iniciar o prato com vegetais fibrosos, seguir para as proteínas e deixar os carboidratos por último modula a liberação de insulina e evita o declínio energético pós-prandial.',
    sentences: [
      'Na Quinta-feira de Metabolismo, investigamos como otimizar a bioenergética celular.',
      'Quando o carboidrato é consumido de estômago vazio, a amilase quebra o amido em velocidade máxima gerando picos agudos de glicose.',
      'Entretanto, se as fibras e proteínas chegam primeiro, elas ativam o hormônio GLP-1 e diminuem a motilidade gástrica.',
      'A curva de glicemia pós-prandial permanece achatada e previsível.',
      'Isso reduz drasticamente a formação de produtos finais de glicação avançada, os temidos AGEs.'
    ]
  },
  verdict: {
    status: 'COMPROVADO',
    evidenceLevel: 'Ensaios Clínicos Randomizados Diabetes Care & Nutrients',
    summary: 'A estratégia de sequenciamento de nutrientes demonstrou reduções de 30% a 70% nos picos glicêmicos pós-prandiais em pacientes com pré-diabetes e indivíduos saudáveis.'
  },
  conteudo_paragrafos: [
    'O fenômeno da absorção sequencial baseia-se na física e na fisiologia gastrintestinal. As fibras vegetais formam uma malha reticular na luz intestinal que age como um filtro biológico, desacelerando a passagem dos monossacarídeos para os capilares mesentéricos.',
    'Além disso, a presença de proteínas e lipídios induz a liberação de colecistoquinina (CCK), retardando a abertura do esfíncter pilórico. Assim, a glicose não inunda a circulação de forma súbita, poupando as células beta pancreáticas de secreções excessivas de insulina.'
  ],
  biologicalCascade: [
    {
      title: 'Fibras & Proteínas Primeiro',
      subtitle: 'Barreira duodenal ativada',
      icon: 'spa'
    },
    {
      title: 'Esvaziamento Retardado',
      subtitle: 'Ação de CCK e GLP-1',
      icon: 'hourglass_top'
    },
    {
      title: 'Pico de Insulina Achatado',
      subtitle: 'Sem hipoglicemia reativa',
      icon: 'vital_signs'
    }
  ],
  preparationSteps: [
    {
      number: 1,
      title: 'Inicie com Saladas e Fibras',
      description: 'Coma as hortaliças cruas ou legumes cozidos nos primeiros 5 a 10 minutos da refeição.'
    },
    {
      number: 2,
      title: 'Consuma as Proteínas e Gorduras Saudáveis',
      description: 'Avance para o frango, peixe, ovos ou leguminosas, ativando a saciedade humoral prolongada.'
    },
    {
      number: 3,
      title: 'Finalize com os Amidos e Carboidratos',
      description: 'Deixe o arroz, massas ou tubérculos para o final da refeição, assegurando absorção diluída no tempo.'
    }
  ],
  contraindications: [
    {
      title: 'Gastroparesia Diabética Severa',
      description: 'Pacientes com atraso patológico do esvaziamento gástrico precisam de supervisão para não sobrecarregar a digestão.',
      icon: 'warning',
      severity: 'warning'
    },
    {
      title: 'Atletas em Janela Imediata Pré-Treino',
      description: 'Antes de exercícios intensos que demandam energia imediata, o atraso digestivo excessivo pode causar desconforto.',
      icon: 'shield',
      severity: 'info'
    }
  ],
  mito_desmistificado: 'Mito: "O estômago mistura tudo como um liquidificador instantâneo, então a ordem que você come não faz a menor diferença."',
  fato_cientifico: 'Fato: O estômago esvazia de forma estratificada por gravidade e motilidade antral. O que entra primeiro atinge o duodeno primeiro, modificando a resposta hormonal de toda a digestão.',
  dicas_praticas: [
    'Caso coma fora em restaurantes por quilo, monte o prato servindo primeiro as saladas no topo.',
    'Se for comer uma sobremesa ou fruta, consuma-a após uma refeição completa com fibras, nunca isolada de estômago vazio.',
    'Dê uma caminhada leve de 10 minutos após as refeições principais para estimular a captação de glicose via transportadores GLUT-4 independentes de insulina.'
  ],
  roteiro_video: {
    titulo_video: 'O truque simples no almoço que previne picos de glicemia',
    gancho_inicial: 'Você sente aquele sono incontrolável 40 minutos depois de almoçar? Isso é pico e queda de glicose!',
    desenvolvimento: 'Estudos publicados na revista Diabetes Care comprovaram: basta mudar a ordem dos alimentos! Coma a salada primeiro, a proteína em seguida e o carboidrato por último. O pico de insulina cai mais de 50% sem você mudar nenhuma comida do prato!',
    chamada_para_acao: 'Teste hoje mesmo no seu almoço e me conte a diferença de energia à tarde!',
    legendas_sugeridas: [
      '0:00 - Por que você tem sono pós-almoço',
      '0:15 - A evidência de Diabetes Care',
      '0:35 - Como a fibra bloqueia o pico',
      '0:50 - Aplique hoje no seu prato'
    ]
  },
  audio_script: 'Quinta-feira de Metabolismo e Longevidade no ar! Pequenas intervenções baseadas em biofísica e endocrinologia geram grandes transformações na sua saúde mitocondrial. Experimente comer os vegetais antes do carboidrato e sinta a diferença na sua clareza mental.',
  tags: ['Metabolismo', 'Longevidade', 'OrdemDosAlimentos', 'IndiceGlicemico', 'SensibilidadeAInsulina', 'Mitocondrias'],
  referencias_cientificas: [
    {
      title: 'Diabetes Care (American Diabetes Association)',
      authors: 'Shukla AP, et al. Food Order Has a Significant Impact on Postprandial Glucose and Insulin Levels.',
      url: 'https://care.diabetesjournals.org'
    },
    {
      title: 'Nutrients (MDPI)',
      authors: 'Sequential meal ingestion: impacts on incretin hormones, gastric emptying and glucose excursions.',
      url: 'https://www.mdpi.com/journal/nutrients'
    }
  ],
  aviso_legal: 'O conteúdo publicado pelo Saúde Sem Mitos possui propósito exclusivamente educativo, científico e informativo. Diabéticos em uso de insulina exógena rápida devem consultar seu endocrinologista antes de alterações de tempo e ordem alimentar.'
};

export const PROTO_HABITS_ARTICLE: GeneratedArticle = {
  id: 'art-sexta-habitos-sono-circadiano',
  createdAt: 'Sexta-feira • 08:00',
  pilar_dia: 'Sexta-feira',
  pilarId: 'sexta',
  categoria: 'Sexta: Hábitos Saudáveis & Sono',
  evidenceBadge: 'Evidência Nível A',
  readingTime: '5 min de leitura',
  audioTime: '3 min de áudio',
  titulo: 'Arquitetura do Sono Reparador: Luz Matinal, Melatonina e o Protocolo Circadiano de Higiene Noturna',
  subtitulo: 'Como a exposição a fótons matinais nos neurônios retinianos calibra o núcleo supraquiasmático e viabiliza a drenagem do sistema glinfático durante o sono profundo.',
  resumo: 'O sono de alta qualidade é um processo biológico de 24 horas. Entenda como sincronizar os receptores de melanopsina ao amanhecer para garantir a secreção natural de melatonina 14 horas depois.',
  reviewer: {
    name: 'Dr. Lucas Brandão',
    role: 'Médico Fisiologista Clínico • CRM-SP 182.901',
    avatar: ASSETS.profile
  },
  video: {
    title: 'A Fotobiologia do Ciclo Circadiano',
    description: 'Dr. Lucas Brandão detalha a limpeza de toxinas cerebrais pelo sistema glinfático durante os estágios 3 e 4 do sono NREM.',
    duration: '03:20',
    thumbnail: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80',
    subtitles: [
      { time: 0, text: 'Sexta-feira de Hábitos Saudáveis e Sono no Saúde Sem Mitos!' },
      { time: 7, text: 'Dormir bem não começa quando você deita, começa nos primeiros 30 minutos do seu dia.' },
      { time: 21, text: 'A luz solar ativa as células ganglionares intrinsecamente fotossensíveis da retina.' },
      { time: 37, text: 'Isso zera o cronômetro do núcleo supraquiasmático e programa a melatonina para a noite.' },
      { time: 54, text: 'À noite, telas de LED bloqueiam essa secreção e impedem a limpeza glinfática cerebral.' }
    ]
  },
  audio: {
    duration: '03:05',
    script: 'Sexta-feira de Hábitos Saudáveis e Sono. A fisiologia circadiana governa a síntese proteica, a regeneração celular e o equilíbrio neuroendócrino. A exposição solar matinal direta, sem vidros ou óculos escuros, é o sinalizador mestre para o encéfalo sincronizar seus ritmos periféricos. À noite, a redução gradual da intensidade luminosa é condição biológica necessária para o adormecer reparador.',
    sentences: [
      'O sono não é um período passivo, mas um dos momentos de maior atividade metabólica e reparadora do cérebro.',
      'O sistema glinfático expande seu volume em até 60% durante o sono de ondas lentas, lavando agregados de proteína beta-amiloide.',
      'Expor os olhos à luz natural ao acordar ancora o ritmo de temperatura central e suprime a adenosina residual.',
      'O consumo tardio de cafeína bloqueia os receptores de adenosina por até 8 horas, fragmentando as fases restauradoras do descanso.',
      'Transformar o quarto em um santuário escuro e fresco é a prescrição não farmacológica mais potente contra o envelhecimento precoce.'
    ]
  },
  verdict: {
    status: 'COMPROVADO',
    evidenceLevel: 'Consenso American Academy of Sleep Medicine & Sleep Research Society',
    summary: 'A regulação circadiana por luminosidade e a higienização do ambiente de sono apresentam o mais alto grau de evidência para prevenção de desfechos cardiovasculares e neurodegenerativos.'
  },
  conteudo_paragrafos: [
    'A descoberta do sistema glinfático pelo grupo da Dra. Maiken Nedergaard demonstrou que as células da glia encolhem durante o sono NREM profundo para permitir que o líquido cefalorraquidiano circule com fluidez, eliminando resíduos metabólicos acumulados ao longo do dia.',
    'A exposição à luz azul de smartphones e tablets após as 21 horas suprime agudamente a liberação epifisária de melatonina, deslocando a fase circadiana em até 90 minutos e roubando os períodos mais vitais de sono reparador.'
  ],
  biologicalCascade: [
    {
      title: 'Luz Solar Matinal',
      subtitle: 'Neurônios ipRGCs',
      icon: 'wb_sunny'
    },
    {
      title: 'Sincronia do Núcleo Central',
      subtitle: 'Cronômetro biológico',
      icon: 'schedule'
    },
    {
      title: 'Drenagem Glinfática',
      subtitle: 'Limpeza durante o sono profundo',
      icon: 'bedtime'
    }
  ],
  preparationSteps: [
    {
      number: 1,
      title: 'Banho de Luz Natural nos Primeiros 30 Minutos',
      description: 'Permaneça ao ar livre ou próximo à janela aberta por 10 a 15 minutos sem óculos escuros.'
    },
    {
      number: 2,
      title: 'Corte Cafeína 8 a 10 Horas Antes de Dormir',
      description: 'A meia-vida plasmática da cafeína é de aproximadamente 5 a 7 horas; interrompa seu consumo após as 14 horas.'
    },
    {
      number: 3,
      title: 'Apague Luzes Artificiais Fortes 1 Hora Antes',
      description: 'Substitua iluminação de teto branca por luzes indiretas amareladas e ative o modo noturno nos aparelhos.'
    }
  ],
  contraindications: [
    {
      title: 'Trabalhadores Noturnos e em Turnos Alternados',
      description: 'Exigem protocolos específicos de reversão luminosa com óculos de bloqueio azul e orientação de medicina do trabalho.',
      icon: 'warning',
      severity: 'warning'
    },
    {
      title: 'Uso Crônico de Hipnóticos sem Avaliação Médica',
      description: 'Zolpidem e benzodiazepínicos alteram a arquitetura fisiológica do sono e exigem desmame sob supervisão médica.',
      icon: 'medication',
      severity: 'error'
    }
  ],
  mito_desmistificado: 'Mito: "Dormir 5 horas durante a semana e compensar dormindo 12 horas no fim de semana recupera o cérebro por completo."',
  fato_cientifico: 'Fato: A dívida crônica de sono causa disfunção endotelial e alterações inflamatórias que não são revertidas por hipersonia compensatória nos fins de semana.',
  dicas_praticas: [
    'Mantenha o quarto com temperatura agradável entre 18°C e 21°C: o corpo precisa resfriar a temperatura central para entrar no sono profundo.',
    'Se não conseguir dormir após 20 minutos na cama, levante-se, vá para um ambiente de meia-luz e leia um livro físico até o sono surgir.',
    'Evite refeições muito volumosas ou ricas em gorduras saturadas 2 horas antes de deitar.'
  ],
  roteiro_video: {
    titulo_video: 'O erro matinal que destrói a sua noite de sono',
    gancho_inicial: 'Você acorda cansado mesmo tendo ficado 8 horas na cama? O seu cérebro pode não ter entrado em sono profundo!',
    desenvolvimento: 'Existe um sistema chamado glinfático que literalmente lava o seu cérebro enquanto você dorme, mas ele só funciona se você tiver sincronizado seu relógio biológico com a luz do sol de manhã! Olhe para a luz natural nos primeiros minutos do dia e corte telas azuis à noite.',
    chamada_para_acao: 'Marque alguém que passa a noite rolando o feed do celular sem conseguir dormir!',
    legendas_sugeridas: [
      '0:00 - Por que você acorda esgotado',
      '0:18 - A faxina do sistema glinfático',
      '0:38 - O poder da luz natural de manhã',
      '0:50 - 3 regras para o sono profundo'
    ]
  },
  audio_script: 'Sexta-feira de Hábitos Saudáveis no ar! O sono de qualidade é a fundação biológica onde se sustentam a imunidade, a memória e a longevidade. Trate o seu descanso com a seriedade de um tratamento médico.',
  tags: ['HabitosSaudaveis', 'HigieneDoSono', 'CicloCircadiano', 'Melatonina', 'SistemaGlinfatico', 'SextaFeira'],
  referencias_cientificas: [
    {
      title: 'Science (AAAS)',
      authors: 'Xie L, et al. Sleep Drives Metabolite Clearance from the Adult Brain (The Glymphatic System).',
      url: 'https://www.science.org'
    },
    {
      title: 'Sleep Medicine Reviews',
      authors: 'Morning light exposure and evening blue light block on human circadian timing.',
      url: 'https://www.sciencedirect.com'
    }
  ],
  aviso_legal: 'O conteúdo publicado pelo Saúde Sem Mitos possui propósito exclusivamente educativo, científico e informativo. Casos de insônia crônica ou apneia obstrutiva do sono demandam polissonografia e acompanhamento por médico especialista em sono.'
};

export const PROTO_RECOVERY_ARTICLE: GeneratedArticle = {
  id: 'art-domingo-recuperacao-meal-prep',
  createdAt: 'Domingo • 09:00',
  pilar_dia: 'Domingo',
  pilarId: 'domingo',
  categoria: 'Domingo: Recuperação & Planejamento',
  evidenceBadge: 'Evidência Nível A',
  readingTime: '4 min de leitura',
  audioTime: '3 min de áudio',
  titulo: 'Meal Prep Científico & Descanso Ativo: Planejamento Semanal Sem Estresse Nem Desperdício',
  subtitulo: 'A técnica de higienização, branqueamento e conservação de vegetais para garantir fitoquímicos frescos e evitar a fadiga de decisão na rotina alimentar.',
  resumo: 'Organizar previamente as bases nutricionais da semana reduz o estresse da tomada de decisões alimentares em até 60% e evita escolhas impulsivas por alimentos ultrarprocessados.',
  reviewer: {
    name: 'Dra. Camila Duarte',
    role: 'Nutricionista & Fisiologista Clínica • CRN-3 48.219',
    avatar: ASSETS.doctorHelena
  },
  video: {
    title: 'A Ciência da Conservação de Vegetais e Meal Prep',
    description: 'Dra. Camila Duarte ensina o choque térmico (branqueamento) que inativa enzimas de deterioração em vegetais.',
    duration: '02:50',
    thumbnail: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80',
    subtitles: [
      { time: 0, text: 'Domingo de Recuperação e Planejamento no Saúde Sem Mitos!' },
      { time: 6, text: 'O segredo de comer bem a semana inteira não é força de vontade, é organização prévia.' },
      { time: 18, text: 'Branquear os vegetais em água fervente por 2 minutos e resfriar inativa a peroxidase.' },
      { time: 34, text: 'Folhas bem secas e guardadas em potes de vidro com papel toalha duram até 7 dias.' },
      { time: 49, text: 'Você poupa tempo, dinheiro e entra na segunda-feira em paz mental.' }
    ]
  },
  audio: {
    duration: '02:45',
    script: 'Domingo de Recuperação e Planejamento Semanal. A neurociência comportamental demonstra que a força de vontade é um recurso biológico finito. Quando você chega cansado na terça ou na quarta-feira sem refeições planejadas, o córtex pré-frontal cede ao apelo imediato do delivery ultraprocessado. Dedicar 60 minutos no domingo ao meal prep e ao descanso ativo é autocuidado preventivo de altíssimo impacto.',
    sentences: [
      'No domingo, unimos a nutrição consciente à fisiologia da recuperação ativa.',
      'A fadiga de decisão no final do dia é o principal gatilho para o consumo de calorias vazias.',
      'A técnica culinária do branqueamento inativa enzimas que degradam clorofila e vitaminas sensíveis ao oxigênio.',
      'O descanso ativo com caminhadas leves na natureza reduz os níveis circulantes de adrenalina e cortisol.',
      'Começar a semana com a geladeira organizada gera clareza mental e tranquilidade parassimpática.'
    ]
  },
  verdict: {
    status: 'COMPROVADO',
    evidenceLevel: 'Diretrizes de Saúde Pública & Psicologia Comportamental',
    summary: 'A preparação antecipada de refeições saudáveis (meal planning) está diretamente correlacionada a maior variedade dietética e menor índice de obesidade em estudos populacionais.'
  },
  conteudo_paragrafos: [
    'A conservação correta de hortaliças apoia-se em conceitos bioquímicos de atividade de água e inativação enzimática. As enzimas polifenol oxidase e peroxidase oxidam compostos bioativos rapidamente após a colheita, causando escurecimento e perda de sabor.',
    'A técnica clássica de branqueamento (submergir brócolis, couve-flor ou vagens por 90 a 120 segundos em água a 100°C e transferi-los imediatamente para água gelada com pedras de gelo) preserva até 90% da vitamina C e dos glucosinolatos quimioprotetores.'
  ],
  biologicalCascade: [
    {
      title: 'Planejamento Prévio',
      subtitle: 'Redução da fadiga pré-frontal',
      icon: 'self_improvement'
    },
    {
      title: 'Branqueamento Térmico',
      subtitle: 'Inativação de enzimas oxidativas',
      icon: 'ac_unit'
    },
    {
      title: 'Adesão Semanal Plena',
      subtitle: 'Estabilidade metabólica',
      icon: 'verified'
    }
  ],
  preparationSteps: [
    {
      number: 1,
      title: 'Higienização e Secagem Rigorosa de Folhas',
      description: 'Lave em solução clorada, enxágue e seque completamente com centrífuga culinária antes de armazenar.'
    },
    {
      number: 2,
      title: 'Técnica do Branqueamento de Legumes',
      description: 'Ferva por 2 minutos, dê choque térmico na água gelada e congele em porções individuais em potes livres de BPA.'
    },
    {
      number: 3,
      title: 'Armazenamento em Camadas com Papel Toalha',
      description: 'Guarde folhas em recipientes herméticos de vidro intercaladas com papel absorvente para reter a umidade excessiva.'
    }
  ],
  contraindications: [
    {
      title: 'Reaquecimento Inadequado de Proteínas e Molhos',
      description: 'Alimentos prontos devem ser refrigerados em até 2 horas após o preparo e reaquecidos acima de 74°C para segurança microbiológica.',
      icon: 'warning',
      severity: 'error'
    },
    {
      title: 'Contaminação Cruzada em Tábuas de Corte',
      description: 'Utilize superfícies distintas e higienizadas para carnes cruas e vegetais prontos para consumo.',
      icon: 'shield',
      severity: 'warning'
    }
  ],
  mito_desmistificado: 'Mito: "Comida congelada ou guardada na geladeira por 3 dias perde todos os seus nutrientes e faz mal à saúde."',
  fato_cientifico: 'Fato: O branqueamento e congelamento imediato preservam micronutrientes melhor do que deixar vegetais frescos envelhecendo por dias na gaveta da geladeira.',
  dicas_praticas: [
    'Separe um pote com sementes tostadas (girassol, abóbora, gergelim) para salpicar rapidamente em qualquer prato durante a semana.',
    'Cozinhe uma base proteica versátil (frango desfiado ou grão-de-bico temperado) que possa ser usada tanto em saladas quanto em ensopados.',
    'Tire ao menos 4 horas do seu domingo completamente desconectado de e-mails de trabalho para reequilibrar o sistema nervoso autônomo.'
  ],
  roteiro_video: {
    titulo_video: 'Como preparar a comida da semana em 60 minutos sem estresse',
    gancho_inicial: 'Você gasta uma fortuna com delivery durante a semana porque chega em casa exausto? Assista a isso!',
    desenvolvimento: 'A técnica do branqueamento inativa as enzimas que estragam os legumes. Com 60 minutos no domingo, você deixa saladas e acompanhamentos prontos e crocantes para até 6 dias na geladeira!',
    chamada_para_acao: 'Comente se você já pratica o meal prep ou se quer um guia passo a passo em PDF!',
    legendas_sugeridas: [
      '0:00 - Por que sua força de vontade falha',
      '0:15 - A técnica de choque térmico',
      '0:35 - Como guardar folhas por 7 dias',
      '0:50 - Comece sua semana no controle'
    ]
  },
  audio_script: 'Domingo de Recuperação e Planejamento no ar! Cuidar do amanhã é um ato de carinho com a sua própria saúde. Organize seus alimentos, descanse ativamente e inicie a semana com o pé direito e mente tranquila.',
  tags: ['RecuperacaoAtiva', 'MealPrep', 'PlanejamentoSemanal', 'NutricaoPratica', 'Domingo', 'SegurancaAlimentar'],
  referencias_cientificas: [
    {
      title: 'International Journal of Behavioral Nutrition and Physical Activity',
      authors: 'Meal planning is associated with food variety, diet quality and body weight status in a large population.',
      url: 'https://ijbnpa.biomedcentral.com'
    },
    {
      title: 'Journal of Food Science and Technology',
      authors: 'Effects of blanching and freezing on phytochemical retention and antioxidant activity in green vegetables.',
      url: 'https://link.springer.com'
    }
  ],
  aviso_legal: 'O conteúdo publicado pelo Saúde Sem Mitos possui propósito exclusivamente educativo, científico e informativo. Respeite sempre as boas práticas de manipulação de alimentos recomendadas pela ANVISA.'
};

/**
 * Lista Completa dos 7 Dias da Semana em Ordem Cronológica (Segunda a Domingo).
 * Todos os artigos possuem evidência médica de Nível A, dosagens, contraindicações e roteiros.
 */
export const INITIAL_ARTICLES_LIST: GeneratedArticle[] = [
  PROTO_NUTRITION_ARTICLE,   // Segunda-feira
  PROTO_NEURO_ARTICLE,       // Terça-feira
  PROTO_CHAMOMILE_ARTICLE,   // Quarta-feira
  PROTO_METABOLISM_ARTICLE,  // Quinta-feira
  PROTO_HABITS_ARTICLE,      // Sexta-feira
  PROTO_MYTH_ARTICLE,        // Sábado
  PROTO_RECOVERY_ARTICLE     // Domingo
];

/**
 * Cronograma Editorial Completo dos 7 Dias da Semana.
 * Mapeia pauta, formato multimídia, 5 slides de carrossel, ganchos e evidência científica.
 */
export const WEEKLY_EDITORIAL_PLAN: Record<PillarDay, EditorialPlanItem> = {
  segunda: {
    dayId: 'segunda',
    dayName: 'Segunda-feira',
    theme: 'Alimentação & Nutrição Consciente',
    headline: 'A Regra dos 50%: Densidade Nutricional Sem Cortar Carboidratos',
    format: 'Carrossel 5 Slides',
    objective: 'Quebrar o terrorismo nutricional de segunda-feira e ensinar a montagem do prato anti-inflamatório com saciedade sustentada.',
    scientificEvidence: 'Nível A • SBAN / Harvard T.H. Chan School of Public Health',
    suggestedPrompt: 'Como montar um prato balanceado seguindo a regra dos 50% de vegetais sem terrorismo aos carboidratos?',
    articleId: PROTO_NUTRITION_ARTICLE.id,
    keyFindings: [
      '50% de vegetais fornecem fibras solúveis que retardam a absorção duodenal de glicose.',
      'Não é necessário cortar arroz e feijão: a proporção de 25% preserva energia estável.',
      'Mastigar os vegetais primeiro libera peptídeo YY e CCK antes do término da refeição.'
    ],
    hookOptions: [
      'Curiosidade: Por que comer arroz com feijão pode ser muito mais saudável do que viver de salada pura?',
      'Anti-Mito: Pare de cortar carboidrato toda segunda-feira. A ciência do prato anti-inflamatório é outra!',
      'Clínico: Como a malha de fibras solúveis no intestino reduz em até 40% a necessidade de insulina pós-prandial.'
    ],
    carouselSlides: [
      {
        slideNumber: 1,
        label: 'Capa / Gancho',
        title: 'Você não precisa cortar o carboidrato na segunda-feira',
        body: 'Descubra a Regra dos 50%: o método científico simples que traz saciedade a tarde toda sem terrorismo alimentar.',
        visualNote: 'Foto nítida de um prato harmonioso dividido em 50% vegetais coloridos, 25% proteína e 25% arroz com feijão.'
      },
      {
        slideNumber: 2,
        label: 'O Problema',
        title: 'O ciclo vicioso das dietas restritivas',
        body: 'Cortar todo carboidrato gera pico de cortisol, compulsão à noite e queda no rendimento cerebral. Seu corpo precisa de glicose gradual, não de privação.',
        visualNote: 'Gráfico mostrando a curva de estresse e fadiga da restrição severa vs. equilíbrio estável.'
      },
      {
        slideNumber: 3,
        label: 'A Bioquímica',
        title: 'Como a malha de fibras funciona',
        body: 'As fibras dos vegetais formam um gel no intestino que retarda a absorção de glicose. Você come carboidrato, mas a glicose entra em fluxo suave.',
        visualNote: 'Ilustração científica em 3D da barreira de fibras na mucosa do intestino delgado.'
      },
      {
        slideNumber: 4,
        label: 'Passo Prático',
        title: 'A Geometria do Prato Ideal',
        body: '• 50%: Folhas e legumes coloridos crus ou cozidos\n• 25%: Proteína de alta qualidade (ovos, peixe, frango, leguminosas)\n• 25%: Carboidrato complexo rico em amido resistente.',
        visualNote: 'Diagrama circular minimalista com as divisões exatas e ícones dos alimentos.'
      },
      {
        slideNumber: 5,
        label: 'Chamada para Ação',
        title: 'Comece hoje sem extremismos',
        body: 'Salve este post para o almoço de hoje e compartilhe com quem ainda acredita em dietas malucas de segunda-feira.',
        visualNote: 'Card elegante com o selo Saúde Sem Mitos e botão de salvar.'
      }
    ]
  },
  terca: {
    dayId: 'terca',
    dayName: 'Terça-feira',
    theme: 'Saúde Mental & Neurociência',
    headline: 'Eixo Intestino-Cérebro: Como a Microbiota Modula Ansiedade e Cortisol',
    format: 'Reels / Vídeo Curto',
    objective: 'Demonstrar a conexão bidirecional do nervo vago e a produção de neurotransmissores como GABA e serotonina no cólon.',
    scientificEvidence: 'Nível A • Nature Reviews Neuroscience / Cell Host & Microbe',
    suggestedPrompt: 'Eixo intestino-cérebro: como o microbioma afeta a produção de serotonina e o controle da ansiedade?',
    articleId: PROTO_NEURO_ARTICLE.id,
    keyFindings: [
      'Mais de 500 milhões de neurônios residem no sistema nervoso entérico.',
      'Bactérias intestinais fermentam fibras e geram butirato, atenuando a neuroinflamação.',
      'Alimentação inflamatória rompe a barreira intestinal e hiperativa o eixo de estresse HPA.'
    ],
    hookOptions: [
      'Fisiológico: Seu estômago embrulha quando você fica nervoso? Veja o que a neurociência descobriu sobre o nervo vago!',
      'Inédito: Sabia que 90% da serotonina do seu corpo é fabricada no intestino e não na cabeça?',
      'Comportamental: Por que tratar a ansiedade sem ajustar a microbiota é como enxugar gelo no deserto.'
    ],
    carouselSlides: [
      {
        slideNumber: 1,
        label: 'Capa / Gancho',
        title: 'O seu intestino é mesmo o seu segundo cérebro?',
        body: 'A neurociência comprovou: as bactérias do seu intestino conversam diretamente com suas emoções 24 horas por dia.',
        visualNote: 'Animação elegante do nervo vago conectando o cérebro ao trato gastrointestinal.'
      },
      {
        slideNumber: 2,
        label: 'O Mecanismo',
        title: 'A rota do Nervo Vago',
        body: 'O nervo vago transmite impulsos contínuos. Quando a flora está saudável, ela envia sinais de calma ao córtex pré-frontal.',
        visualNote: 'Esquema anatômico detalhando o trajeto das fibras vagais parassimpáticas.'
      },
      {
        slideNumber: 3,
        label: 'Neurotransmissores',
        title: 'A fábrica de Serotonina e GABA',
        body: 'Bactérias benéficas sintetizam precursores do GABA (o freio calmante do cérebro) e produzem butirato protetor.',
        visualNote: 'Modelos químicos 3D do neurotransmissor GABA e do ácido butírico.'
      },
      {
        slideNumber: 4,
        label: 'Ação Nutricional',
        title: '3 Alimentos para nutrir sua mente',
        body: '• Alho e cebola (prebióticos)\n• Aveia integral e maçã (fibras solúveis)\n• Alimentos fermentados naturais (kefir ou iogurte natural).',
        visualNote: 'Composição fotográfica limpa com os três alimentos em tigelas de cerâmica.'
      },
      {
        slideNumber: 5,
        label: 'Conclusão',
        title: 'Cuide da mente cuidando do prato',
        body: 'Antes de tomar qualquer decisão drástica, alimente seu ecossistema interno com comida de verdade.',
        visualNote: 'Logotipo Saúde Sem Mitos e convite para ouvir o áudio completo de 3 minutos.'
      }
    ]
  },
  quarta: {
    dayId: 'quarta',
    dayName: 'Quarta-feira',
    theme: 'Chás & Infusões',
    headline: 'Chá de Camomila e Erva-Cidreira: A Neuroquímica do GABA e do Sono',
    format: 'Infusão & Guia Clínico',
    objective: 'Explicar a farmacognosia botânica da apigenina e ácido rosmarínico, ensinando o método correto de infusão sem degradar bioativos.',
    scientificEvidence: 'Nível A • Cochrane Systematic Reviews / PubMed Central',
    suggestedPrompt: 'Chá de camomila e erva-cidreira: o que a neurociência diz sobre GABA, dosagem e sono reparador?',
    articleId: PROTO_CHAMOMILE_ARTICLE.id,
    keyFindings: [
      'A apigenina liga-se aos receptores GABA-A induzindo relaxamento sem gerar tolerância química.',
      'A água nunca deve ferver (100°C) para não volatilizar os óleos essenciais terapêuticos.',
      'O tempo de abafamento de 8 a 10 minutos é indispensável para extrair o ácido rosmarínico.'
    ],
    hookOptions: [
      'Fitoterápico: Você ferve a água do chá de camomila? Pare imediatamente se quiser que ele realmente funcione!',
      'Neurociência: O que acontece nos seus neurônios 45 minutos após tomar uma xícara bem preparada de camomila.',
      'Prático: O ritual noturno de 10 minutos que ensina o cérebro a desacelerar sem remédios pesados.'
    ],
    carouselSlides: [
      {
        slideNumber: 1,
        label: 'Capa / Gancho',
        title: 'Chá de camomila é só placebo de avó?',
        body: 'A neurociência provou o contrário: veja como os flavonoides botânicos atuam diretamente nos neurotransmissores cerebrais.',
        visualNote: 'Xícara de chá fumegante com flores de camomila secas ao redor sobre mesa de madeira.'
      },
      {
        slideNumber: 2,
        label: 'A Molécula',
        title: 'A Apigenina e os Receptores GABA',
        body: 'A apigenina atravessa a barreira hematoencefálica e conecta-se aos mesmos sítios calmantes estimulados por medicamentos, com sedação suave.',
        visualNote: 'Visualização molecular do flavonoide apigenina ligando-se ao complexo proteico GABA-A.'
      },
      {
        slideNumber: 3,
        label: 'O Erro Crítico',
        title: 'Por que ferver a água destrói os benefícios',
        body: 'A água a 100°C queima os óleos essenciais voláteis. A temperatura correta é 90°C (quando surgem as primeiras bolhas finas).',
        visualNote: 'Termômetro culinário marcando 90 graus na chaleira com aviso visual de temperatura ideal.'
      },
      {
        slideNumber: 4,
        label: 'Passo a Passo',
        title: 'O Método Clínico de Infusão',
        body: '1. Aqueça 200ml a 90°C\n2. Adicione 1 colher de sopa de flores secas\n3. Tampe obrigatoriamente por 8 a 10 minutos\n4. Beba 45 minutos antes de dormir.',
        visualNote: 'Infográfico numerado com ícones minimalistas de chaleira, tampa e xícara.'
      },
      {
        slideNumber: 5,
        label: 'Encerramento',
        title: 'Respeite a planta e o seu sono',
        body: 'Consulte as contraindicações em gestantes e interações com sedativos na nossa análise clínica completa.',
        visualNote: 'Card de aviso de segurança com carimbo de verificação farmacêutica.'
      }
    ]
  },
  quinta: {
    dayId: 'quinta',
    dayName: 'Quinta-feira',
    theme: 'Metabolismo & Longevidade',
    headline: 'Ordem dos Alimentos: Como Achatar Picos de Glicose e Proteger Mitocôndrias',
    format: 'Artigo + Áudio',
    objective: 'Ensinar o sequenciamento fisiológico de refeições para evitar quedas bruscas de energia e preservar as células pancreáticas.',
    scientificEvidence: 'Nível A • American Diabetes Association (Diabetes Care)',
    suggestedPrompt: 'Sensibilidade à insulina: como a ordem dos alimentos no prato achata picos de glicemia e evita o sono pós-almoço?',
    articleId: PROTO_METABOLISM_ARTICLE.id,
    keyFindings: [
      'Comer vegetais antes dos amidos reduz a curva de glicose pós-prandial em até 73%.',
      'Proteínas e gorduras liberam CCK e diminuem a motilidade gástrica antes da digestão dos açúcares.',
      'Achatar os picos previne a glicação precoce de proteínas corporais (AGEs) e poupa mitocôndrias.'
    ],
    hookOptions: [
      'Metabólico: Por que você sente um sono incontrolável 40 minutos após o almoço? O motivo é a ordem da sua comida!',
      'Científico: O mesmo prato de comida pode gerar 2 curvas glicêmicas totalmente diferentes dependendo de como você come.',
      'Longevidade: O truque gratuito que protege suas mitocôndrias sem você precisar cortar nenhuma comida do prato.'
    ],
    carouselSlides: [
      {
        slideNumber: 1,
        label: 'Capa / Gancho',
        title: 'A mesma comida, dois efeitos completamente diferentes no corpo',
        body: 'A ordem em que você consome os alimentos muda drasticamente a liberação de insulina e os seus níveis de energia.',
        visualNote: 'Dois gráficos comparativos de sensor contínuo de glicose: um em montanha-russa, outro em linha suave.'
      },
      {
        slideNumber: 2,
        label: 'O Problema do Pico',
        title: 'A montanha-russa glicêmica',
        body: 'Quando o carboidrato cai em estômago vazio, a glicose dispara. O pâncreas joga excesso de insulina, e você sofre uma queda brusca de energia.',
        visualNote: 'Ilustração do pâncreas trabalhando sob estresse em resposta a picos agudos.'
      },
      {
        slideNumber: 3,
        label: 'A Solução Fisiológica',
        title: 'A Barreira de Fibras Duodenal',
        body: 'As fibras da salada criam uma malha física no duodeno que retarda a absorção dos açúcares que virão depois.',
        visualNote: 'Animação em corte da mucosa intestinal filtrando gradualmente as moléculas de glicose.'
      },
      {
        slideNumber: 4,
        label: 'A Ordem de Ouro',
        title: 'Como montar suas garfadas',
        body: '1º: Fibras e folhas (salada)\n2º: Proteínas e gorduras saudáveis\n3º: Carboidratos e sobremesa.',
        visualNote: 'Card visual com seta progressiva do verde (salada) ao amarelo (proteína) e marrom (arroz).'
      },
      {
        slideNumber: 5,
        label: 'Desafio Prático',
        title: 'Teste no almoço de hoje',
        body: 'Faça o teste por 3 dias e repare no fim daquela sensação de peso e letargia à tarde. Salve este post!',
        visualNote: 'Chamada para salvar no Instagram e selo de evidência Diabetes Care.'
      }
    ]
  },
  sexta: {
    dayId: 'sexta',
    dayName: 'Sexta-feira',
    theme: 'Hábitos Saudáveis',
    headline: 'Arquitetura do Sono Reparador: Luz Matinal, Melatonina e Protocolo Circadiano',
    format: 'Carrossel 5 Slides',
    objective: 'Explicar a fotobiologia circadiana e os hábitos diurnos que regulam o sistema glinfático de limpeza cerebral durante a noite.',
    scientificEvidence: 'Nível A • American Academy of Sleep Medicine / Science',
    suggestedPrompt: 'Protocolo de higiene do sono: luz matinal, corte de telas azuis e limpeza do sistema glinfático cerebral',
    articleId: PROTO_HABITS_ARTICLE.id,
    keyFindings: [
      'A luz natural matinal sincroniza os receptores retinianos ipRGCs e o relógio central.',
      'O sistema glinfático expande 60% durante o sono NREM profundo para lavar resíduos tóxicos.',
      'A cafeína possui meia-vida de 5 a 7 horas e bloqueia receptores de adenosina essenciais.'
    ],
    hookOptions: [
      'Inovador: Seu cérebro faz uma lavagem física de toxinas toda noite, mas só se você atingir o sono profundo!',
      'Hábito Matinal: O segredo de dormir bem não é o que você faz às 23h, mas o que faz às 7h da manhã.',
      'Alerta: Por que usar o celular na cama faz seu cérebro achar que o meio-dia acabou de começar.'
    ],
    carouselSlides: [
      {
        slideNumber: 1,
        label: 'Capa / Gancho',
        title: 'O erro que você comete às 7h e estraga seu sono às 23h',
        body: 'A ciência do sono não começa no travesseiro: descubra como a luz matinal ancora o relógio biológico.',
        visualNote: 'Pessoa olhando para o nascer do sol pela janela em composição serena e acolhedora.'
      },
      {
        slideNumber: 2,
        label: 'A Biologia da Retina',
        title: 'Os sensores de melanopsina',
        body: 'Fótons solares atingem neurônios especiais na retina que enviam sinal direto ao núcleo supraquiasmático para programar a melatonina da noite.',
        visualNote: 'Diagrama mostrando o feixe de luz atingindo a retina e ativando o centro circadiano cerebral.'
      },
      {
        slideNumber: 3,
        label: 'A Faxina Noturna',
        title: 'O Sistema Glinfático',
        body: 'Durante o sono profundo, os astrócitos encolhem e o líquido cefalorraquidiano enxágua proteínas inflamatórias e toxinas acumuladas.',
        visualNote: 'Corte microscópico tridimensional do líquido cefalorraquidiano limpando os espaços interneuronais.'
      },
      {
        slideNumber: 4,
        label: 'O Protocolo dos 3 Passos',
        title: 'Como blindar suas noites',
        body: '1. 10 minutos de luz natural ao acordar\n2. Zero cafeína após as 14h\n3. Quarto escuro e temperatura entre 18°C e 21°C.',
        visualNote: 'Checklist minimalista com caixas de marcação verdes e ícones nítidos.'
      },
      {
        slideNumber: 5,
        label: 'Finalização',
        title: 'Sono é tratamento de saúde',
        body: 'Dormir não é perda de tempo, é o maior reparador celular da sua vida. Compartilhe com quem dorme mal!',
        visualNote: 'Frase inspiradora sobre medicina do estilo de vida com o logo Saúde Sem Mitos.'
      }
    ]
  },
  sabado: {
    dayId: 'sabado',
    dayName: 'Sábado',
    theme: 'Sábados Sem Mitos',
    headline: 'Água Morna com Limão em Jejum: Desvendando o Falso Detox e o pH Sanguíneo',
    format: 'Reels / Vídeo Curto',
    objective: 'Combater pseudociências de saúde, demonstrando que o sangue humano é rigidamente tamponado e que rins e fígado fazem a verdadeira depuração.',
    scientificEvidence: 'Nível A • Sociedade Brasileira de Alimentação e Nutrição (SBAN) / NEJM',
    suggestedPrompt: 'Água morna com limão em jejum queima gordura e alcaliniza o organismo ou é mito pseudocientífico?',
    articleId: PROTO_MYTH_ARTICLE.id,
    keyFindings: [
      'O pH sanguíneo é tamponado entre 7,35 e 7,45 pelos pulmões e rins: nenhum alimento altera essa faixa.',
      'Ácido cítrico não atua em adipócitos: queima de gordura exige déficit calórico e sinalização hormonal.',
      'O uso frequente sem canudo pode desmineralizar irreversivelmente o esmalte dos dentes.'
    ],
    hookOptions: [
      'Choque: Tomar água com limão em jejum alcaliniza o corpo e emagrece? A bioquímica prova por que isso é uma grande mentira!',
      'Desafio: Se a água com limão mudasse o pH do seu sangue, você estaria na UTI agora mesmo!',
      'Prático: O limão tem nutrientes ótimos, mas pare de acreditar que ele derrete gordura milagrosamente.'
    ],
    carouselSlides: [
      {
        slideNumber: 1,
        label: 'Capa / Gancho',
        title: 'Mito Desvendado: Água morna com limão emagrece?',
        body: 'Colocamos a bioquímica do sangue à prova para responder de uma vez por todas à maior lenda das redes sociais.',
        visualNote: 'Imagem dividida com selo de verificação: copo com limão e carimbo carmim "DESMISTIFICADO".'
      },
      {
        slideNumber: 2,
        label: 'A Mentira do pH',
        title: 'Seu sangue não é uma piscina!',
        body: 'O pH sanguíneo é mantido rigorosamente entre 7,35 e 7,45 pelo sistema bicarbonato. Se um copo de limão alterasse o pH, haveria acidose grave.',
        visualNote: 'Escala de pH mostrando a faixa estrita de sobrevivência humana com os órgãos tampão.'
      },
      {
        slideNumber: 3,
        label: 'A Falsa Queima de Gordura',
        title: 'Ácido cítrico não derrete gordura',
        body: 'A quebra de triglicerídeos nas células adiposas exige sinalização hormonal (déficit calórico). O limão não possui nenhuma ação farmacológica lipolítica.',
        visualNote: 'Ilustração do adipócito com seus receptores adrenérgicos reais.'
      },
      {
        slideNumber: 4,
        label: 'Quem Faz o Detox Real',
        title: 'Conheça sua verdadeira equipe de detox',
        body: 'Seu fígado transforma toxinas e seus rins as excretam na urina 24 horas por dia. O melhor que você faz por eles é beber água e comer vegetais.',
        visualNote: 'Ilustração médica esquemática do fígado e rins trabalhando continuamente.'
      },
      {
        slideNumber: 5,
        label: 'Veredito Final',
        title: 'Gosta de água com limão? Beba com moderação!',
        body: 'Ela é rica em vitamina C e hidrata, mas não faz milagres. Use canudo para proteger seus dentes e fuja de promessas mágicas!',
        visualNote: 'Resumo com o veredito "Comprovado: Hidrata | Desmistificado: Não Emagrece".'
      }
    ]
  },
  domingo: {
    dayId: 'domingo',
    dayName: 'Domingo',
    theme: 'Recuperação & Planejamento',
    headline: 'Meal Prep Científico & Descanso Ativo: Planejamento Semanal Sem Estresse',
    format: 'Artigo + Áudio',
    objective: 'Ensinar técnicas gastronômicas de conservação (branqueamento térmico) e descanso ativo para iniciar a semana sem sobrecarga mental.',
    scientificEvidence: 'Nível A • Int. Journal of Behavioral Nutrition / Food Chemistry',
    suggestedPrompt: 'Meal Prep Inteligente: como higienizar, branquear e conservar vegetais para durarem a semana toda com alta biodisponibilidade?',
    articleId: PROTO_RECOVERY_ARTICLE.id,
    keyFindings: [
      'Branquear vegetais por 2 minutos inativa a peroxidase e preserva vitaminas sensíveis à oxidação.',
      'Planejar as refeições reduz a fadiga de decisão no final do dia, diminuindo o recurso a fast food em 60%.',
      'Descanso ativo na natureza reduz marcadores de estresse fisiológico e estimula o tônus parassimpático.'
    ],
    hookOptions: [
      'Economia & Saúde: Como gastar apenas 60 minutos no domingo e ter saladas e vegetais crocantes até sexta-feira.',
      'Neurociência: Por que sua força de vontade sempre quebra na quarta-feira à noite se você não tiver planejado o cardápio.',
      'Técnica Culinária: O segredo dos chefs de cozinha para guardar vegetais sem eles murcharem ou apodrecerem na gaveta.'
    ],
    carouselSlides: [
      {
        slideNumber: 1,
        label: 'Capa / Gancho',
        title: 'Como ter comida saudável a semana toda gastando só 1 hora no domingo',
        body: 'Descubra a técnica do branqueamento térmico que inativa enzimas e mantém vegetais frescos por até 7 dias.',
        visualNote: 'Bancada de cozinha impecável com potes de vidro etiquetados e legumes coloridos e frescos.'
      },
      {
        slideNumber: 2,
        label: 'A Fadiga de Decisão',
        title: 'Por que chegamos exaustos na quarta-feira',
        body: 'Quando você volta cansado do trabalho sem comida pronta, o córtex pré-frontal não tem energia para cozinhar e cede ao delivery.',
        visualNote: 'Cérebro humano destacando o lobo frontal e a economia de energia psíquica.'
      },
      {
        slideNumber: 3,
        label: 'A Técnica do Branqueamento',
        title: 'Choque térmico nos vegetais',
        body: 'Ferva brócolis ou vagens por 90 segundos em água borbulhante e passe direto para água com gelo. As enzimas oxidativas morrem na hora!',
        visualNote: 'Sequência visual: panela em ebulição seguida de tigela de vidro com água e cubos de gelo.'
      },
      {
        slideNumber: 4,
        label: 'Conservação de Folhas',
        title: 'Folhas crocantes por até 7 dias',
        body: '1. Higienize e seque totalmente com centrífuga\n2. Guarde em recipiente hermético de vidro\n3. Intercale com folhas de papel toalha para reter a umidade.',
        visualNote: 'Pote de vidro com alface e rúcula intercalados com papel toalha limpo.'
      },
      {
        slideNumber: 5,
        label: 'Recuperação Parassimpática',
        title: 'Domingo é dia de desligar',
        body: 'Depois do preparo, desconecte dos e-mails, caminhe ao ar livre e recupere seu sistema nervoso para uma semana extraordinária.',
        visualNote: 'Cena relaxante de natureza com o convite para começar a semana com o Saúde Sem Mitos.'
      }
    ]
  }
};

