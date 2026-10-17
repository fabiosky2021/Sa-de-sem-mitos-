import { GeneratedArticle, PillarInfo } from '../types/content';

export const ASSETS = {
  logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDD2dKNmuD9-CtADBo6HBuDVsSXdup73zi654gTdmMVoSoFkOdICm9dYHPZx9Kz79Me8624n-0lTzYWqdIhb2Hn8I0yG1Dk5DrDdElP2c7V3w25zowkYJcp1QzuP_7F-9GFu6NaJ0UawNYT-ACCEYl6ZJvv0KGGi5ewkcwk2gumxpHGsqYBepiY5dvrdvZMTLEv21OzgXKPW87b_EsanTTIZJQ3PvW3BiCCbWbGhDxo',
  profile: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCM9eyFtamQQWqKSdLtFfZr8ix_GiOY1BFI9BvNIhRu7PqP97CyzDE6VUX9tYPb2Jfepr5JtR7nfsA2jl0JR4wP--6CRXut-S_QTudxdnEVDh3TszgMZrd2PsLIxpeztfdFc82m1Ig8AuzRnz9c4viA2TUNr7RK5UVYV0-zsoDI68k5LlVaTcN--coal7rBWDnTjPcChJ3cVNR44_YjK1pwlNlJccutG7Zzin0mgQ7',
  doctorHelena: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5fd30SWcv_KXtvq_A0rECssBTS8wS8WxSG_lCqOSsHqlA9T0KWQS_Obrhb8c7b39cBDSMjpE9lfh94BoJZKrqYlNjFUs_BLHL0b5123t_suFzGcblLSX7w4LOhkRhhVlSHLwBBgeyiHoRgrjft_n5_agnphruVX0FGzGVvibtPqYkT1B2-Sx9Ms7ARtI20J6vP9E6u6FjdYTr9-C5XsNJsNN8iZQCyh1AoF9vZc7n',
  chamomileTeapot: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrul8eTEThFR76hb9Mcno-WVnTFoDF7Vqxv16DixUbXxO8EIwm7TDDWNouHj2IPnyokqlQddgrX5R9t-GNC-owC0f_exyhPnYCeXWQhWYVcM1N5qeg4IWSbtjleamnjkK-MBBJusFf9GpkFxUkTLNgDHfeXdhsaNNcHrIe2A2CRyMC4I9RAPeMlpzxRM_NDoNYsK97gcjmSWISZCqCzg-DnsizpOAD6_zH8au0Mofr',
  sponsorBadge: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSDMb8QmipYaOgOmOXnswuuoNniRfx2b-ZdsmaoTuEi-OxQ0Lp3jiRtZeg3kExcv9kqoYGtY_vJUSb2C5Ybz42DlFnXJbPyjG7o7CZwD2krKMop3sxGuU3SCMOwtmshx01Go1iAbtRVQzC3ibP-cOi8NpSoXvwRS8-4_EXKceFevoHkTeG97-WwIa2DMJKsom2Y86OQUFp9DD22AGkOT2eeaNitNIGKPimekpn8Pq1',
};

export const PILLARS: Record<string, PillarInfo> = {
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
  }
};

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
    name: 'Dra. Helena Rios',
    role: 'Neurologista Clínica • CRM-SP 149.204',
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

export const INITIAL_ARTICLES_LIST: GeneratedArticle[] = [
  PROTO_CHAMOMILE_ARTICLE,
  PROTO_MYTH_ARTICLE
];
