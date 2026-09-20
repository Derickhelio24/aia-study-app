/**
 * Base de Dados Completa para o Teste 1 de Avaliação de Impacto Ambiental (AIA)
 * Foco: Setor Elétrico e Enquadramento Legal em Moçambique (Lei 20/97 e Decreto 54/2015)
 */

export const MODULES = [
  {
    id: "mod-1",
    title: "Conceitos Fundamentais",
    subtitle: "Impacto Ambiental, EIA e AIA",
    description: "Diferenciação clara entre Impacto Ambiental, Estudo de Impacto Ambiental (EIA), AIA e Avaliação Ambiental Estratégica (AAE).",
    badge: "Lei nº 20/97",
    color: "emerald",
    questionsCount: 2,
    questionIds: [1, 10]
  },
  {
    id: "mod-2",
    title: "Quadro Legal e Institucional",
    subtitle: "AIA em Moçambique",
    description: "Estrutura institucional (MTA, DINAB, DPA), instrumentos normativos, infrações, sanções (Decreto nº 54/2015) e Nova Lei de Electricidade (Lei nº 12/2022).",
    badge: "Decreto nº 54/2015 & Lei 12/2022",
    color: "blue",
    questionsCount: 3,
    questionIds: [2, 14, 22]
  },
  {
    id: "mod-3",
    title: "O Processo de AIA e Participação Pública",
    subtitle: "Fases, Categorias (A+, A, B, C) e Consulta",
    description: "Classificação prévia, EPDA, Termos de Referência, REIA, critérios de Categoria A+, hierarquia de mitigação e consulta pública.",
    badge: "Categorias A+, A, B, C",
    color: "amber",
    questionsCount: 4,
    questionIds: [3, 9, 11, 16]
  },
  {
    id: "mod-4",
    title: "Linhas de Transmissão Elétrica",
    subtitle: "Impactos na Construção, Operação e Áreas Habitadas",
    description: "Abertura de faixas de servidão, restrições legais, desmatamento, avifauna, efeito corona, reassentamento e caso da Linha 400 kV Songo-Matambo.",
    badge: "Setor Elétrico & Estudos de Caso",
    color: "purple",
    questionsCount: 4,
    questionIds: [4, 6, 12, 19]
  },
  {
    id: "mod-5",
    title: "Subestações Elétricas & Incidentes",
    subtitle: "Impactos Biofísicos e Derrame de Óleo",
    description: "Impactos sobre solo, água, vegetação, ruído de transformadores e medidas mitigadoras contra vazamentos de óleos dielétricos e PCBs.",
    badge: "Prevenção de Riscos",
    color: "rose",
    questionsCount: 3,
    questionIds: [5, 7, 13]
  },
  {
    id: "mod-6",
    title: "Matriz Energética Comparada",
    subtitle: "Térmica, Solar, Eólica e Hídrica em Moçambique",
    description: "Análise comparativa de impactos: ACV (Jambo, 2025), casos reais Dondo (solar), Namaacha (eólica), Cahora Bassa (hídrica) e BESS.",
    badge: "Transição Energética & Casos Reais",
    color: "teal",
    questionsCount: 6,
    questionIds: [8, 15, 17, 18, 20, 21]
  }
];

export const QUESTIONS = [
  {
    id: 1,
    moduleId: "mod-1",
    moduleTitle: "Conceitos Fundamentais",
    title: "Conceitos de Impacto Ambiental, EIA e AIA",
    question: "Conceitos de Impacto Ambiental, EIA, AIA.",
    contextPrompt: "Explique com rigor académico e técnico a diferença conceitual entre Impacto Ambiental, EIA (Estudo de Impacto Ambiental) e AIA (Avaliação de Impacto Ambiental), citando as bases da Lei do Ambiente de Moçambique (Lei nº 20/97).",
    keywords: [
      "alteração da qualidade ambiental",
      "estudo técnico",
      "processo administrativo",
      "tomada de decisão",
      "prevenção",
      "Lei 20/97"
    ],
    officialAnswer: {
      summary: "Impacto Ambiental é a alteração no meio ambiente; EIA é o estudo técnico-científico multidisciplinar; AIA é o processo administrativo e decisório integrado de gestão ambiental.",
      sections: [
        {
          heading: "1. Impacto Ambiental",
          content: "Qualquer alteração das propriedades físicas, químicas ou biológicas do meio ambiente (biofísico e socioeconômico), favorável ou desfavorável, causada por qualquer forma de matéria ou energia resultante das atividades humanas que afetem a saúde, segurança, bem-estar da população, biota e recursos naturais (Artigo 1 da Lei nº 20/97 de Moçambique)."
        },
        {
          heading: "2. EIA (Estudo de Impacto Ambiental)",
          content: "É o conjunto de estudos técnico-científicos multidisciplinares realizados por especialistas independentes acreditados, destinados a identificar, prever, valorar e mitigar os impactos ambientais significativos que uma determinada atividade proposta pode causar, consubstanciando-se num relatório técnico (o Relatório de Impacto Ambiental - RIMA/REIA)."
        },
        {
          heading: "3. AIA (Avaliação de Impacto Ambiental)",
          content: "É o processo legal e administrativo preventivo pelo qual se analisa a viabilidade ambiental de uma atividade proposta. Inclui a triagem (screening), definição do âmbito (scoping/EPDA), elaboração do EIA, revisão técnica pelo órgão ambiental competente (DINAB/MTA), consulta pública e a emissão ou recusa da Licença Ambiental prévia à tomada de decisão."
        }
      ],
      legalRef: "Lei nº 20/97 (Lei do Ambiente de Moçambique) e Decreto nº 54/2015 (Regulamento de AIA).",
      keyDistinction: "Enquanto o EIA é a ferramenta técnica e analítica (documento/estudo), a AIA é o processo global e contínuo de gestão pública e tomada de decisão governamental."
    },
    sampleScenarios: [
      "Como você classificaria o estudo de viabilidade elaborado pela EDM para uma linha de 110kV entre Chimoio e Manica em relação a AIA vs EIA?",
      "Um consultor afirma que 'a AIA é apenas a entrega do relatório'. Com base na lei moçambicana, como refutar essa afirmação?"
    ]
  },
  {
    id: 2,
    moduleId: "mod-2",
    moduleTitle: "Quadro Legal e Institucional",
    title: "Enquadramento Legal e Institucional da AIA em Moçambique",
    question: "Enquadramento Legal e Institucional da AIA em Moçambique",
    contextPrompt: "Descreva os principais pilares da legislação ambiental e os órgãos governamentais responsáveis pela gestão, avaliação e fiscalização do processo de AIA em Moçambique.",
    keywords: [
      "Lei nº 20/97",
      "Decreto nº 54/2015",
      "MTA",
      "DINAB",
      "DPTADER",
      "AQUA",
      "competências institucionais"
    ],
    officialAnswer: {
      summary: "O quadro legal fundamenta-se na Lei nº 20/97 e no Decreto nº 54/2015, sob a autoridade do Ministério da Terra e Ambiente (MTA) e da Direcção Nacional do Ambiente (DINAB).",
      sections: [
        {
          heading: "1. Pilares Legais Fundamentais",
          content: "• Constituição da República de Moçambique (Artigo 90 - Direito ao ambiente são e dever de o defender).\n• Lei nº 20/97 de 1 de Outubro (Lei do Ambiente): define os princípios gerais da prevenção, poluidor-pagador, participação pública e responsabilidade ambiental.\n• Decreto nº 54/2015 de 31 de Dezembro (Regulamento do Processo de AIA): estabelece os procedimentos, prazos, categorias de projetos (A+, A, B e C), taxas e requisitos de auditoria ambiental."
        },
        {
          heading: "2. Estrutura Institucional de Competências",
          content: "• MTA (Ministério da Terra e Ambiente): autoridade máxima do setor governamental para a política ambiental.\n• DINAB (Direcção Nacional do Ambiente): órgão central técnico encarregado de instruir, coordenar a comissão técnica de avaliação, rever estudos e submeter pareceres para o licenciamento de projetos das Categorias A+ e A.\n• Serviços Provinciais de Ambiente (DPA / DPTADER): responsáveis pela instrução e licenciamento de atividades de Categoria B e C a nível provincial.\n• AQUA (Agência Nacional para o Controlo da Qualidade Ambiental): entidade fiscalizadora da conformidade ambiental e cumprimento dos Planos de Gestão Ambiental (PGA)."
        }
      ],
      legalRef: "Decreto Presidencial nº 1/2020 e Decreto nº 54/2015.",
      keyDistinction: "A nível central avaliam-se projetos de grande magnitude (Cat A+ e A), enquanto as províncias tutelam projetos de impacto localizado (Cat B e C)."
    },
    sampleScenarios: [
      "Qual entidade moçambicana aprova os Termos de Referência de uma linha de transmissão internacional de 400kV atravessando duas províncias?",
      "Quais sanções o Decreto 54/2015 prevê para um proponente que inicie obras civis sem a respetiva Licença Ambiental emitida pelo MTA?"
    ]
  },
  {
    id: 3,
    moduleId: "mod-3",
    moduleTitle: "O Processo de AIA",
    title: "Avaliação de Impacto Ambiental: Definição, Tipos, Classificação, Legislação e Fases",
    question: "Avaliação de Impacto Ambiental: definição, tipos, classificação, importância da participação pública, legislação moçambicana e principais fases do processo.",
    contextPrompt: "Apresente uma resposta abrangente com as definições, as quatro categorias do Decreto 54/2015 (A+, A, B, C) e as fases cronológicas completas do processo de AIA em Moçambique.",
    keywords: [
      "Categoria A+",
      "Categoria A",
      "Categoria B",
      "Categoria C",
      "EPDA",
      "Termos de Referência",
      "REIA",
      "Consulta Pública",
      "Licença Ambiental",
      "Monitoria"
    ],
    officialAnswer: {
      summary: "A AIA é o instrumento preventivo estruturado em triagem (Categorias A+, A, B, C), scoping/EPDA, elaboração de REIA/EAS, consulta pública, revisão técnica e licenciamento/monitoria.",
      sections: [
        {
          heading: "1. Definição e Tipos de Avaliação",
          content: "AIA é o instrumento preventivo de política ambiental voltado à previsão e mitigação de impactos. Pode ser estratégica (AAE para planos/políticas governamentais) ou de projeto específico (EIA/EAS)."
        },
        {
          heading: "2. Classificação de Categorias em Moçambique (Decreto 54/2015)",
          content: "• Categoria A+: Atividades com impactos de magnitude e duração excepcionais, irreversíveis, que exigem revisão obrigatória por revisores internacionais/independentes e especialistas comprovados.\n• Categoria A: Atividades com impactos negativos significativos no meio biofísico e humano; exige EIA completo com EPDA e Consulta Pública formal.\n• Categoria B: Atividades com impactos menos significativos e mitigáveis; exige Estudo Ambiental Simplificado (EAS).\n• Categoria C: Atividades com impactos insignificantes ou negligenciáveis; isentas de EIA/EAS, sujeitas ao cumprimento da Guia de Boas Práticas Ambientais."
        },
        {
          heading: "3. Fases Principais do Processo de AIA",
          content: "1. Pré-avaliação / Triagem (Instrução do processo e enquadramento na categoria);\n2. EPDA (Estudo de Pré-Viabilidade Ambiental e Definição do Âmbito) e Termos de Referência (TdR) para Cat. A+ e A;\n3. Realização dos Estudos Técnicos e Elaboração do Relatório (REIA ou EAS);\n4. Processo de Consulta Pública (auscultação das comunidades, partes interessadas e elaboração do relatório de consulta);\n5. Revisão Técnica pela Comissão de Avaliação (DINAB/Província);\n6. Decisão e Emissão da Licença Ambiental (Instalação e Operação);\n7. Monitoria e Auditoria Ambiental pós-licença (cumprimento do PGA)."
        }
      ],
      legalRef: "Artigos 8 a 21 do Decreto nº 54/2015.",
      keyDistinction: "A participação pública é etapa vinculativa e obrigatória nas categorias A+, A e B, sob pena de nulidade do processo de licenciamento."
    },
    sampleScenarios: [
      "Uma barragem hidrelétrica de 300 MW é proposta na Bacia do Zambeze. Em qual categoria (A+, A, B ou C) ela se enquadra pelo Decreto 54/2015 e por quê?",
      "Quais os prazos previstos pelo regulamento para o MTA emitir o parecer final do REIA após a entrega pelo proponente?"
    ]
  },
  {
    id: 4,
    moduleId: "mod-4",
    moduleTitle: "Linhas de Transmissão Elétrica",
    title: "Impactos Ambientais de Linha de Transmissão (Construção e Operação)",
    question: "Identifique e explique três impactos ambientais que podem resultar da construção e operação de uma linha de transmissão de energia eléctrica.",
    contextPrompt: "Apresente três impactos ambientais específicos detalhando a fase (construção vs operação), o meio afetado e as consequências ecológicas no contexto moçambicano.",
    keywords: [
      "faixa de servidão",
      "desmatamento",
      "fragmentação de habitats",
      "erosão do solo",
      "avifauna",
      "colisão e eletrocussão",
      "efeito corona",
      "campos eletromagnéticos"
    ],
    officialAnswer: {
      summary: "Os 3 impactos principais são: 1. Desmatamento e fragmentação de habitats na faixa de servidão; 2. Compactação e erosão acelerada do solo durante as obras; 3. Colisão/eletrocussão da avifauna e ruído de efeito corona na operação.",
      sections: [
        {
          heading: "1. Desmatamento e Fragmentação de Habitats (Fase de Construção)",
          content: "Abertura da 'Faixa de Servidão' (Right of Way) e vias de acesso exige o abate de vegetação e desbaste arbóreo. Isso fragmenta ecossistemas florestais, cria efeito de borda, interrompe corredores biológicos de fauna terrestre e reduz a biomassa vegetal nativa."
        },
        {
          heading: "2. Degradação e Erosão do Solo (Fase de Construção)",
          content: "A escavação das fundações das torres de transmissão e o tráfego contínuo de veículos pesados de transporte provocam compactação do solo, perda da camada orgânica superficial e aumento do escoamento pluvial, gerando ravinas e assoreamento de cursos d'água adjacentes."
        },
        {
          heading: "3. Colisão e Eletrocussão da Avifauna e Ruído (Fase de Operação)",
          content: "As linhas aéreas e cabos de guarda representam obstáculo tridimensional crítico para aves migratórias e morcegos, causando mortalidade por impacto físico ou eletrocussão entre condutores. Na operação, ocorre também poluição sonora de baixa frequência (zumbido/chiado) e campos eletromagnéticos decorrentes do Efeito Corona, especialmente em alta umidade."
        }
      ],
      legalRef: "Diretrizes de Salvaguardas Ambientais do Setor Elétrico e Decreto nº 54/2015.",
      keyDistinction: "A fase de construção concentra impactos mecânicos e territoriais diretos, enquanto a fase de operação gera impactos contínuos na fauna alada e microclima."
    },
    sampleScenarios: [
      "Quais dispositivos mecânicos/visuais obrigatórios devem ser instalados nos cabos de alta tensão para mitigar o impacto na avifauna migratória?",
      "Como a manutenção da faixa de servidão deve ser feita para evitar riscos de queimadas descontroladas sob a linha de transmissão?"
    ]
  },
  {
    id: 5,
    moduleId: "mod-5",
    moduleTitle: "Subestações Elétricas",
    title: "Construção de Subestação Elétrica: Impactos e Medidas de Mitigação",
    question: "Durante a construção de uma subestação eléctrica, podem ocorrer impactos sobre o solo, água, vegetação e comunidades próximas. Escolha dois impactos ambientais e proponha uma medida de mitigação para cada um deles.",
    contextPrompt: "Selecione dois impactos entre os quatro meios apontados (solo, água, vegetação ou comunidades) e descreva com precisão técnica a causa do impacto e a medida de mitigação concreta.",
    keywords: [
      "compactação do solo",
      "contaminação da água",
      "turbidez",
      "desmatamento",
      "poeiras",
      "ruído",
      "bacia de retenção",
      "umectação de vias",
      "drenagem pluvial"
    ],
    officialAnswer: {
      summary: "Escolha recomendada: Impacto sobre a Água (escoamento/assoreamento) com bacias de sedimentação, e Impacto sobre as Comunidades (poeiras e ruído) com umectação de vias e barreira acústica/vegetal.",
      sections: [
        {
          heading: "Opção A: Impacto sobre os Recursos Hídricos (Água)",
          content: "• Descrição do Impacto: A decapagem superficial e terraplenagem geram transporte de sedimentos durante as chuvas, causando assoreamento de rios/lagoas locais, aumento da turbidez da água e alteração do pH, prejudicando o ecossistema aquático e o abastecimento comunitário.\n• Medida de Mitigação: Construção de valas de drenagem provisórias providas de bacias de retenção de sedimentos e barreiras de contenção vegetal (geotêxteis/silte fence), além de evitar obras de movimentação de terra no pico da época chuvosa."
        },
        {
          heading: "Opção B: Impacto sobre as Comunidades Próximas",
          content: "• Descrição do Impacto: Aumento expressivo nos níveis de ruído por maquinaria pesada (escavadoras, tratores, geradores) e emissão de material particulado (poeiras respiráveis) pelo tráfego de caminhões, causando problemas respiratórios, incômodo acústico e risco de acidentes rodoviários para moradores locais.\n• Medida de Mitigação: Umectação periódica (aspersão com caminhões-pipa) das vias de acesso não pavimentadas, limitação de velocidade nas zonas habitadas, restrição das operações ruidosas apenas ao período diurno (08h às 17h) e estabelecimento de um canal formal de ouvidoria comunitária."
        }
      ],
      legalRef: "Decreto nº 18/2004 (Regulamento sobre Padrões de Qualidade Ambiental e de Emissão de Efluentes de Moçambique).",
      keyDistinction: "Toda medida de mitigação deve seguir a hierarquia: Prevenir > Minimizar > Recuperar > Compensar."
    },
    sampleScenarios: [
      "Se você escolhesse o impacto sobre o Solo, qual seria a técnica recomendada para lidar com a remoção da camada arável fértil (topsoil)?",
      "Como calcular a distância segura de amortecimento (buffer zone) entre o pátio da subestação e as primeiras residências de uma comunidade rural?"
    ]
  },
  {
    id: 6,
    moduleId: "mod-4",
    moduleTitle: "Linhas de Transmissão Elétrica",
    title: "Linha de Transmissão Atravessando Área Habitada",
    question: "Uma linha de transmissão de energia eléctrica vai atravessar uma área habitada. Quais impactos ambientais e sociais devem ser considerados durante a AIA?",
    contextPrompt: "Distinga detalhadamente os impactos socioeconômicos e ambientais da passagem da linha sobre comunidades, abordando reassentamento, restrições da faixa de servidão e segurança pública.",
    keywords: [
      "reassentamento involuntário",
      "deslocamento físico e econômico",
      "faixa de servidão",
      "perda de culturas agrícolas",
      "campos eletromagnéticos",
      "ruído corona",
      "risco de choque elétrico",
      "compensação justa",
      "Decreto 31/2012"
    ],
    officialAnswer: {
      summary: "Devem ser avaliados impactos sociais como reassentamento involuntário, perda de terras/machambas e renda, somados a riscos de saúde, ruído do efeito corona e restrições legais da servidão.",
      sections: [
        {
          heading: "1. Impactos Sociais e Econômicos Críticos",
          content: "• Reassentamento Involuntário e Deslocamento Físico: Demolição obrigatória de habitações que estejam na faixa de segurança/servidão (Right of Way), exigindo elaboração de Plano de Reassentamento (PAR) sob o Decreto nº 31/2012 de Moçambique.\n• Deslocamento Econômico e Perda de Meios de Subsistência: Proibição de cultivo de árvores de porte médio/alto e perda de machambas (hortas familiares), exigindo compensação e reposição de fontes de renda.\n• Ruptura do Tecido Comunitário: Divisão física de comunidades e interferência em acessos a poços, escolas ou locais sagrados/cemitérios comunitários."
        },
        {
          heading: "2. Impactos Ambientais, Saúde e Segurança Pública",
          content: "• Exposição a Campos Eletromagnéticos (CEM): Preocupações populares e necessidade de monitoramento dos níveis de campo elétrico e magnético segundo diretrizes da ICNIRP/OMS.\n• Poluição Sonora (Efeito Corona): Ruído contínuo e zumbido emitido pelos condutores em dias de nevoeiro ou chuva, afetando a qualidade do sono dos vizinhos da linha.\n• Risco de Acidentes e Segurança: Risco de choque por descargas elétricas indutivas em telhados metálicos não aterrados ou queda de cabos condutores durante ventanias e tempestades."
        }
      ],
      legalRef: "Decreto nº 31/2012 (Regulamento sobre o Processo de Reassentamento Resultante de Atividades Econômicas em Moçambique).",
      keyDistinction: "A travessia de áreas habitadas exige Consulta Pública reforçada, inventário censitário detalhado de benfeitorias e plano formal de indenização antes de qualquer desocupação."
    },
    sampleScenarios: [
      "Quais direitos o Decreto nº 31/2012 garante às famílias desprovidas de títulos formais (DUAT) que praticam agricultura de subsistência na área da linha?",
      "Por que os telhados de zinco das casas situadas nas margens da faixa de servidão devem receber aterramento elétrico obrigatório?"
    ]
  },
  {
    id: 7,
    moduleId: "mod-5",
    moduleTitle: "Subestações Elétricas",
    title: "Derrame de Óleo de Transformador em Subestação",
    question: "Durante a manutenção de uma subestação eléctrica, ocorre um derrame de óleo de um transformador. Que impactos ambientais podem resultar desse derrame e que medidas devem ser tomadas para minimizar os seus efeitos?",
    contextPrompt: "Explique os perigos toxicológicos do óleo mineral dielétrico (e risco de PCB), impactos em solos e aquíferos subterrâneos, e o protocolo de contenção e remediação segundo as boas práticas ambientais.",
    keywords: [
      "óleo mineral dielétrico",
      "PCB / Bifenilos Policlorados",
      "contaminação de aquíferos",
      "lençol freático",
      "impermeabilização",
      "bacia de retenção",
      "separador de água e óleo",
      "material absorvente",
      "resíduo perigoso"
    ],
    officialAnswer: {
      summary: "Impactos: contaminação de solos, impermeabilização de poros e poluição do lençol freático com substâncias tóxicas. Medidas: bacias de contenção com separador água-óleo, barreiras absorventes e incineração controlada como resíduo perigoso.",
      sections: [
        {
          heading: "1. Impactos Ambientais Resultantes do Derrame",
          content: "• Contaminação do Solo: O óleo dielétrico penetra nos horizontes do solo, obstruindo os poros, matando a microbiota do solo e impedindo a aeração e retenção de nutrientes vegetais.\n• Poluição dos Recursos Hídricos Subterrâneos (Lençol Freático): Infiltração rápida que contamina poços e furos artesianos comunitários com hidrocarbonetos e compostos aromáticos.\n• Toxicidade e Persistência (Risco de PCBs / Askarel): Se o transformador antigo contiver PCBs (Bifenilos Policlorados), o impacto torna-se gravíssimo devido à bioacumulação, carcinogenicidade e persistência ambiental extrema."
        },
        {
          heading: "2. Medidas de Emergência e Minimização",
          content: "1. Contenção Imediata: Interrupção da fonte de vazamento e acionamento de barreiras físicas (areia, serradura ou kits de absorção hidrofóbicos);\n2. Estruturas Preventivas de Engenharia: Existência obrigatória de Bacia de Retenção sob cada transformador, com capacidade para 110% do volume total de óleo, interligada a um Separador de Água e Óleo (SAO);\n3. Recolha e Descarte: Remoção do óleo livre através de bombas de vácuo e escavação da terra contaminada, acondicionando-a em tambores selados rotulados como 'Resíduo Perigoso' (Classe 1);\n4. Destinação Final e Remediação: Envio para biorremediação licenciada, incineração térmica em cimenteiras autorizadas pelo MTA e monitoria da qualidade da água dos poços piezométricos de controle."
        }
      ],
      legalRef: "Decreto nº 83/2014 (Regulamento sobre a Gestão de Resíduos Perigosos em Moçambique) e Convenção de Estocolmo sobre Poluentes Orgânicos Persistentes.",
      keyDistinction: "O descarte indiscriminado de terra contaminada por óleo é crime ambiental grave em Moçambique, sujeito a pesadas multas da AQUA."
    },
    sampleScenarios: [
      "Qual é a fórmula de dimensionamento padrão da bacia de retenção de um transformador de potência trifásico?",
      "O que Moçambique estabeleceu no seu Plano Nacional de Implementação da Convenção de Estocolmo sobre a eliminação progressiva de transformadores com PCB até 2025/2028?"
    ]
  },
  {
    id: 8,
    moduleId: "mod-6",
    moduleTitle: "Matriz Energética Comparada",
    title: "Central Termoelétrica vs Central Solar Fotovoltaica",
    question: "Compare os possíveis impactos ambientais associados à produção de energia através de uma central termoeléctrica e de uma central solar fotovoltaica.",
    contextPrompt: "Faça uma comparação estruturada e balanceada entre as duas fontes de geração, abordando emissões atmosféricas, pegada hídrica, uso do solo e o ciclo de vida dos resíduos.",
    keywords: [
      "emissões atmosféricas",
      "gases de efeito estufa",
      "CO2, NOx, SO2",
      "consumo de água",
      "efluentes térmicos",
      "ocupação extensiva do solo",
      "resíduos perigosos",
      "metais pesados",
      "reciclagem de painéis"
    ],
    officialAnswer: {
      summary: "A termoelétrica tem alto impacto atmosférico (emissões de GEE) e hídrico contínuo; a solar tem pegada atmosférica quase nula na operação, mas exige ocupação extensiva de terra e gera resíduos complexos de fim de vida (painéis fotovoltaicos).",
      sections: [
        {
          heading: "1. Central Termoelétrica (ex: Gás Natural, Carvão ou Diesel)",
          content: "• Atmosfera e Clima: Altas emissões de Gases de Efeito Estufa (CO2, metano) e poluentes locais (NOx, SO2 e material particulado), contribuindo para aquecimento global e chuvas ácidas.\n• Recursos Hídricos: Elevado consumo de água para circuitos de arrefecimento (torres ou circuito aberto), gerando poluição térmica ao devolver água quente a rios/mar, afetando a fauna aquática.\n• Resíduos: Geração de cinzas tóxicas pesadas e de fundo (em caso de carvão), ricas em metais pesados (chumbo, mercúrio, arsênio)."
        },
        {
          heading: "2. Central Solar Fotovoltaica",
          content: "• Atmosfera e Clima: Zero emissões diretas de gases poluentes durante a fase operacional de geração elétrica.\n• Uso do Solo e Paisagem: Exige vasta área de terra (cerca de 1 a 2 hectares por MWp), provocando supressão de vegetação, impermeabilização parcial, impacto visual e alteração do microclima do solo.\n• Fim de Vida e Resíduos: Desafio de gestão de resíduos sólidos perigosos ao término da vida útil dos módulos (25 a 30 anos), envolvendo metais como cádmio, telúrio, chumbo e silício purificado."
        },
        {
          heading: "3. Tabela Resumo Comparativa",
          content: "• Emissões Operacionais: Termoelétrica (MUITO ALTAS) vs Solar (ZERO);\n• Pegada Hídrica: Termoelétrica (ALTA) vs Solar (MÍNIMA, restrita à lavagem periódica de painéis);\n• Intensidade de Área: Termoelétrica (COMPACTA) vs Solar (EXTENSIVA);\n• Despachabilidade: Termoelétrica (GERAÇÃO CONTÍNUA) vs Solar (INTERMITENTE, apenas diurna sem baterias)."
        }
      ],
      legalRef: "Estratégia Nacional de Desenvolvimento de Energias Renováveis (EDER) e Diretrizes de Descarbonização de Moçambique.",
      keyDistinction: "A central solar ganha com folga no critério atmosférico e climático, enquanto a termoelétrica tem menor demanda territorial física bruta."
    },
    sampleScenarios: [
      "Na Central Termoelétrica a Gás de Temane (450 MW) em Inhambane, quais as principais tecnologias adotadas para reduzir a emissão de óxidos de azoto (NOx)?",
      "Em grandes centrais solares no norte de Moçambique (ex: Mocuba ou Cuamba), qual impacto a supressão de vegetação sob as placas causa na taxa de infiltração pluvial?"
    ]
  },
  {
    id: 9,
    moduleId: "mod-3",
    moduleTitle: "O Processo de AIA",
    title: "Importância da Participação Pública em Linhas e Subestações",
    question: "Explique por que razão a participação pública é importante na avaliação ambiental de um projecto de construção de uma linha de transmissão ou de uma subestação eléctrica.",
    contextPrompt: "Explique os objetivos democráticos, técnicos e sociais da Consulta Pública exigida pelo Decreto nº 54/2015, enfatizando a prevenção de conflitos e a identificação de impactos locais específicos.",
    keywords: [
      "legitimidade social",
      "licença social para operar",
      "identificação de impactos locais",
      "áreas sagradas e cemitérios",
      "prevenção de conflitos",
      "transparência",
      "Decreto nº 54/2015",
      "audiência pública"
    ],
    officialAnswer: {
      summary: "A participação pública confere legitimidade social, permite mapear sensibilidades culturais e patrimoniais invisíveis a satélites, reduz conflitos comunitários sobre compensações e assegura o cumprimento vinculativo do Decreto nº 54/2015.",
      sections: [
        {
          heading: "1. Integração do Conhecimento Local Tradicional",
          content: "As comunidades residentes conhecem detalhadamente o território. A auscultação pública permite identificar locais de patrimônio cultural e sagrado (cemitérios familiares, árvores sagradas, zonas de culto tradicional) e trajetos de travessia de gado que não constam nas cartas topográficas ou imagens de satélite do projetista."
        },
        {
          heading: "2. Prevenção e Gestão Proativa de Conflitos",
          content: "Projetos lineares como linhas de transmissão atravessam propriedades privadas e comunitárias. A consulta pública prévia esclarece direitos, critérios de demarcação da servidão, regras de cálculo de compensações financeiras por culturas destruídas e termos de contratação de mão-de-obra local, evitando paralisações de obras e manifestações populares."
        },
        {
          heading: "3. Legitimidade Democrática e 'Licença Social para Operar'",
          content: "Garante a aceitação do empreendimento pela população afetada. Sem a anuência comunitária informada e transparente, o projeto sofre boicotes operacionais, riscos de vandalismo e depredação de torres de transmissão."
        },
        {
          heading: "4. Vinculação e Exigência Legal em Moçambique",
          content: "O Decreto nº 54/2015 torna o processo de Consulta Pública uma condição sine qua non para a validade jurídica da AIA em projetos de Categoria A+, A e B. A falta de consulta ou o desrespeito aos prazos mínimos de convocação invalida o processo perante a DINAB/MTA."
        }
      ],
      legalRef: "Diploma Ministerial nº 130/2006 (Diretivas Gerais para o Processo de Participação Pública no Processo de AIA) e Decreto nº 54/2015.",
      keyDistinction: "Participação pública não é mera formalidade informativa de via única: é um diálogo consultivo e deliberativo bidirecional para aperfeiçoar o projeto."
    },
    sampleScenarios: [
      "Se durante a reunião de consulta pública a comunidade local informar que a torre 45 está exatamente sobre um cemitério sagrado dos antepassados, qual procedimento técnico a equipe do EIA deve propor?",
      "Quais os meios mínimos de divulgação de editais de audiência pública que o Decreto 54/2015 exige para garantir que populações rurais sem internet sejam informadas?"
    ],
    isOfficialDoc: true
  },
  {
    id: 10,
    moduleId: "mod-1",
    moduleTitle: "Conceitos Fundamentais",
    title: "Diferença entre AAE (Estratégica) e AIA de Projetos",
    question: "Diferencie Avaliação Ambiental Estratégica (AAE) de AIA de projectos específicos, dando um exemplo prático no sector de energia em Moçambique.",
    contextPrompt: "Explique a escala de aplicação (políticas, planos e programas vs empreendimentos individuais) e a vantagem preventiva da AAE no planejamento energético.",
    keywords: [
      "Avaliação Ambiental Estratégica",
      "AAE",
      "políticas, planos e programas",
      "escala regional",
      "planeamento energético",
      "visão cumulativa"
    ],
    officialAnswer: {
      summary: "A AAE aplica-se a políticas, planos e programas de desenvolvimento a nível estratégico e regional; a AIA aplica-se a projetos específicos de engenharia para obter a licença ambiental de uma obra individual.",
      sections: [
        {
          heading: "1. Âmbito da Avaliação Ambiental Estratégica (AAE)",
          content: "A AAE é aplicada antes de qualquer projeto ser desenhado, avaliando as implicações ambientais de grandes políticas públicas, planos setoriais (ex: Plano Diretor de Eletrificação de Moçambique) ou bacias hidrográficas (ex: AAE da Bacia do Zambeze). Analisa impactos cumulativos e sinérgicos de múltiplos projetos simultâneos."
        },
        {
          heading: "2. Âmbito da AIA de Projeto",
          content: "A AIA foca-se na viabilidade ambiental de uma intervenção pontual e delimitada (ex: Linha de 400kV Temane-Maputo). Tem caráter operacional e resulta na emissão da Licença Ambiental de Instalação e Operação para aquele proponente."
        },
        {
          heading: "3. Exemplo Prático em Moçambique",
          content: "A definição de construir um corredor de gás e energia ligando Inhambane a Maputo é objeto de AAE setorial; o traçado específico da linha de transmissão e a localização exata das torres é objeto de AIA de projeto com REIA."
        }
      ],
      legalRef: "Artigo 2 da Lei nº 20/97 e Diretrizes Internacionais de Planeamento Estratégico.",
      keyDistinction: "A AAE define 'o que' e 'onde' fazer em nível de país; a AIA define 'como' executar a obra minimizando os impactos locais."
    },
    sampleScenarios: [
      "Por que a AAE do Setor Elétrico moçambicano é fundamental para evitar conflitos pelo uso da água na Bacia do Rio Zambeze?"
    ],
    isOfficialDoc: false
  },
  {
    id: 11,
    moduleId: "mod-3",
    moduleTitle: "O Processo de AIA",
    title: "Critérios de Enquadramento na Categoria A+ (Decreto 54/2015)",
    question: "Em que circunstâncias um projecto do sector elétrico deve ser classificado obrigatoriamente como Categoria A+ e quais as exigências procedimentais especiais?",
    contextPrompt: "Apresente os critérios de gravidade, extensão territorial e a exigência mandatória de revisores independentes prevista no Decreto nº 54/2015.",
    keywords: [
      "Categoria A+",
      "impactos excepcionais e irreversíveis",
      "revisores independentes",
      "especialistas de renome internacional",
      "áreas de conservação",
      "reassentamento em larga escala"
    ],
    officialAnswer: {
      summary: "Enquadram-se na Categoria A+ projetos com impactos de magnitude e duração excepcionais, irreversíveis, que afetam áreas protegidas ou implicam reassentamento em massa; exigem obrigatoriamente contratação de revisores independentes.",
      sections: [
        {
          heading: "1. Critérios de Enquadramento em Categoria A+",
          content: "Segundo o Anexo I do Decreto nº 54/2015, incluem-se atividades que: (a) afetem ecossistemas de valor universal ou zonas de proteção total; (b) envolvam reassentamento físico de mais de 500 famílias; (c) gerem impactos transfronteiriços ou irreversíveis acumulados (ex: grandes barragens como Mphanda Nkuwa)."
        },
        {
          heading: "2. Exigência Procedimental Exclusiva",
          content: "O EIA de Categoria A+ não pode ser avaliado apenas pela equipe técnica interna da DINAB. O Ministério da Terra e Ambiente (MTA) obriga o proponente a custear revisores independentes externos com experiência comprovada de no mínimo 10 anos na matéria para emitir um parecer prévio à decisão ministerial."
        }
      ],
      legalRef: "Artigo 8 e Anexo I do Decreto nº 54/2015.",
      keyDistinction: "A categoria A+ é uma especificidade única de Moçambique criada em 2015 para projetos de megadimensão (mega-projects)."
    },
    sampleScenarios: [
      "Uma linha de transmissão de 400kV que atravesse o Parque Nacional das Quirimbas pode ser classificada como Categoria A normal ou deve ser A+?"
    ],
    isOfficialDoc: false
  },
  {
    id: 12,
    moduleId: "mod-4",
    moduleTitle: "Linhas de Transmissão Elétrica",
    title: "Faixa de Servidão: Dimensões, Restrições e Gestão Florestal",
    question: "O que é a Faixa de Servidão (Right-of-Way) de uma linha de transmissão aérea de alta tensão e quais as restrições legais e de segurança impostas sobre o seu uso?",
    contextPrompt: "Explique a função da servidão administrativa, os limites físicos de largura típicos (ex: 30 a 50 metros) e as proibições relativas a habitações, queimadas e vegetação.",
    keywords: [
      "faixa de servidão",
      "right-of-way",
      "distância de segurança",
      "proibição de habitação",
      "queimadas",
      "abate de árvores de porte alto",
      "risco de arco elétrico"
    ],
    officialAnswer: {
      summary: "É a faixa contínua de terreno sob e adjacente aos condutores elétricos onde se aplicam restrições de segurança contra arcos elétricos e interferências mecânicas; são proibidas habitações e cultivos altos.",
      sections: [
        {
          heading: "1. Conceito e Finalidade da Servidão",
          content: "É um ónus real administrativo estabelecido a favor da concessionária elétrica (EDM/HCB) para permitir a passagem dos cabos, inspeção de helicóptero/veículos e manutenção contínua das torres, garantindo a distância dielétrica de segurança do ar."
        },
        {
          heading: "2. Restrições e Proibições Rígidas",
          content: "• Proibição de construções: É vetada qualquer habitação, curral ou edifício permanente dentro da faixa (geralmente entre 30 a 55 metros de largura);\n• Restrições vegetais: Árvores que atinjam mais de 3 a 4 metros de altura devem ser abatidas (perigo de aproximação com os cabos e arco elétrico);\n• Proibição de queimadas: É proibido queimar mato ou restos agrícolas, pois a fumaça ionizada reduz a isolação do ar e provoca curto-circuitos na linha."
        }
      ],
      legalRef: "Regulamento de Segurança de Instalações Elétricas de Alta Tensão de Moçambique e Decreto nº 54/2015.",
      keyDistinction: "A propriedade da terra permanece do Estado/comunidade (DUAT), mas o uso da superfície é severamente restringido por razões de utilidade pública."
    },
    sampleScenarios: [
      "Por que culturas de baixo porte como amendoim ou feijão nhemba são comumente autorizadas sob a faixa de servidão após a conclusão das obras?"
    ],
    isOfficialDoc: false
  },
  {
    id: 13,
    moduleId: "mod-5",
    moduleTitle: "Subestações Elétricas",
    title: "Contaminação por PCB (Bifenilos Policlorados) em Transformadores",
    question: "Explique por que razão o óleo contendo PCBs (Askarel) em transformadores elétricos antigos representa um risco ambiental e de saúde pública de gravidade extrema em Moçambique.",
    contextPrompt: "Aborde as propriedades de bioacumulação, carcinogenicidade, estabilidade química e o compromisso assumido por Moçambique na Convenção de Estocolmo.",
    keywords: [
      "PCB",
      "Bifenilos Policlorados",
      "Askarel",
      "Convenção de Estocolmo",
      "bioacumulação",
      "poluente orgânico persistente",
      "resíduo perigoso",
      "Decreto nº 83/2014"
    ],
    officialAnswer: {
      summary: "Os PCBs são Poluentes Orgânicos Persistentes (POPs) altamente tóxicos, cancerígenos e bioacumulativos na cadeia alimentar, proibidos internacionalmente e sujeitos a inventário rigoroso em Moçambique.",
      sections: [
        {
          heading: "1. Periculosidade Toxicológica e Ecológica",
          content: "Os PCBs não se degradam naturalmente no solo ou na água (vida média de décadas). Em caso de vazamento ou queima incompleta, transformam-se em dioxinas e furanos, substâncias cancerígenas de altíssima letalidade que se acumulam na gordura de peixes, gado e seres humanos (disruptores endócrinos graves)."
        },
        {
          heading: "2. Enquadramento Legal e Eliminação em Moçambique",
          content: "Moçambique ratificou a Convenção de Estocolmo sobre POPs. Pelo Decreto nº 83/2014, óleos com mais de 50 ppm de PCBs são resíduos de Classe 1 (Perigo Máximo), devendo ser etiquetados, nunca reciclados para uso local e exportados para destruição térmica especializada na Europa ou em fornos devidamente certificados."
        }
      ],
      legalRef: "Decreto nº 83/2014 (Gestão de Resíduos Perigosos) e Convenção de Estocolmo (ratificada pela Resolução nº 56/2001).",
      keyDistinction: "Enquanto o óleo mineral comum pode ser biorremediado no solo por bactérias, solos contaminados por PCBs exigem descontaminação química complexa ou incineração a mais de 1.200°C."
    },
    sampleScenarios: [
      "Como um auditor da AQUA pode identificar visualmente se um transformador elétrico da década de 1970 contém Askarel/PCB?"
    ],
    isOfficialDoc: false
  },
  {
    id: 14,
    moduleId: "mod-2",
    moduleTitle: "Quadro Legal e Institucional",
    title: "Sanções e Infrações Ambientais (Decreto 54/2015)",
    question: "Quais são as consequências administrativas e sanções previstas na legislação moçambicana para o início de obras de uma infraestrutura elétrica sem Licença Ambiental?",
    contextPrompt: "Descreva a suspensão de atividades, o embargo de obras, as multas pecuniárias aplicadas pela AQUA e a obrigação de recuperação do dano ambiental.",
    keywords: [
      "embargo de obras",
      "suspensão de atividades",
      "multas administrativas",
      "AQUA",
      "recuperação do dano",
      "crime ambiental"
    ],
    officialAnswer: {
      summary: "As sanções incluem embargo imediato das obras, aplicação de multas pecuniárias pesadas pela AQUA, obrigação de restauração dos danos causados e responsabilidade civil e criminal dos gestores.",
      sections: [
        {
          heading: "1. Medidas Cautelares Imediatas",
          content: "Segundo o Artigo 26 do Decreto nº 54/2015, a realização de atividades sem a respectiva Licença Ambiental implica o embargo e interdição imediata das obras pelas autoridades policiais e fiscais ambientais da AQUA."
        },
        {
          heading: "2. Sanções Pecuniárias e Reparação",
          content: "Aplicação de multas que podem atingir dezenas de milhões de Meticais dependendo da categoria do projeto. O infrator não se isenta de submeter o processo de AIA 'a posteriori' e é obrigado a custear a total recuperação ambiental de eventuais desmatamentos ou escavações já executadas."
        }
      ],
      legalRef: "Artigo 26 e Tabela de Multas do Decreto nº 54/2015 e Lei nº 20/97.",
      keyDistinction: "A aplicação da multa não convalida a infração nem substitui a necessidade da licença ambiental."
    },
    sampleScenarios: [
      "Um empreiteiro terceirizado iniciou a abertura da faixa de servidão antes da emissão da licença. Quem responde perante o MTA: a concessionária ou o empreiteiro?"
    ],
    isOfficialDoc: false
  },
  {
    id: 15,
    moduleId: "mod-6",
    moduleTitle: "Matriz Energética Comparada",
    title: "Desafios Ambientais das Baterias e Fim de Vida da Energia Solar",
    question: "Ao instalar sistemas de armazenamento com baterias (BESS) numa central solar fotovoltaica em Moçambique, quais novos impactos ambientais passam a ser considerados na AIA?",
    contextPrompt: "Analise os riscos de incêndio (thermal runaway), toxicidade de eletrólitos (lítio, cobalto) e logística reversa de resíduos perigosos no território nacional.",
    keywords: [
      "BESS",
      "armazenamento por baterias",
      "thermal runaway",
      "risco de incêndio",
      "lítio e cobalto",
      "logística reversa",
      "eletrólitos tóxicos"
    ],
    officialAnswer: {
      summary: "A introdução de baterias BESS reduz a intermitência solar, mas introduz riscos de incêndio químico (thermal runaway), emissão de gases tóxicos e necessidade de logística reversa para reciclagem de metais pesados.",
      sections: [
        {
          heading: "1. Riscos Químicos e de Incêndio (Fase Operacional)",
          content: "Baterias de íon de lítio podem sofrer fuga térmica ('thermal runaway') gerando chamas autoalimentadas difíceis de extinguir com água comum, emitindo gases letais como fluoreto de hidrogênio (HF) e demandando sistemas especiais de supressão por gás limpo (FM-200 ou Novec 1230)."
        },
        {
          heading: "2. Gestão de Fim de Vida em Moçambique",
          content: "Como Moçambique não possui fábricas de reciclagem de baterias de lítio ou painéis solares, a AIA deve exigir um Plano de Descomissionamento e Logística Reversa, onde o fornecedor se compromete contratualmente a reexportar as células degradadas sob a Convenção de Basileia."
        }
      ],
      legalRef: "Convenção de Basileia sobre o Movimento Transfronteiriço de Resíduos Perigosos e Decreto nº 83/2014.",
      keyDistinction: "A energia solar pura tem risco operacional quase passivo; com baterias BESS, o risco passa a ser de acidente industrial químico ativo."
    },
    sampleScenarios: [
      "Na Central Solar de Cuamba com sistema de armazenamento BESS, que tipo de bacia de contenção secundária é exigida em caso de vazamento de eletrólitos dos contêineres de baterias?"
    ],
    isOfficialDoc: false
  },
  {
    id: 16,
    moduleId: "mod-3",
    moduleTitle: "O Processo de AIA",
    title: "Hierarquia de Mitigação Ambiental (4 Níveis Essenciais)",
    question: "Explique os quatro níveis da Hierarquia de Mitigação Ambiental (Evitar, Minimizar, Restaurar e Compensar) aplicados a um projeto de infraestrutura de energia em Moçambique.",
    contextPrompt: "Apresente a ordem de prioridade estrita, descrevendo o objetivo e uma medida prática de engenharia para cada um dos quatro patamares.",
    keywords: [
      "Hierarquia de Mitigação",
      "Evitar",
      "Minimizar",
      "Restaurar",
      "Compensar",
      "contrabalanço ambiental",
      "offsets"
    ],
    officialAnswer: {
      summary: "A hierarquia de mitigação estabelece uma ordem prioritária obrigatória: 1. EVITAR o impacto; 2. MINIMIZAR sua intensidade; 3. RESTAURAR o ecossistema após as obras; 4. COMPENSAR impactos residuais inevitáveis.",
      sections: [
        {
          heading: "1. EVITAR (Prioridade Máxima)",
          content: "Alterar a localização geográfica ou o traçado do projeto para impedir que o impacto ocorra. Exemplo: Desviar o traçado de uma linha de transmissão para contornar uma área sagrada comunitária ou uma zona húmida costeira de mangal."
        },
        {
          heading: "2. MINIMIZAR (Impactos Inevitáveis)",
          content: "Reduzir a magnitude, escala ou duração física do impacto que não pode ser evitado. Exemplo: Instalar desviadores de voo espirais nos cabos condutores para reduzir colisão de aves, ou umectar estradas de terra para conter poeiras."
        },
        {
          heading: "3. RESTAURAR (Pós-Construção)",
          content: "Reabilitar e reflorestar os ecossistemas e solos degradados imediatamente após o término das obras civis. Exemplo: Recomposição vegetal com espécies nativas nas áreas do canteiro de obras e áreas de empréstimo de terra."
        },
        {
          heading: "4. COMPENSAR (Contrabalanços / Offsets)",
          content: "Criar ganhos ecológicos mensuráveis em outro local equivalente para balancear perdas residuais que não puderam ser restauradas. Exemplo: Financiar a proteção permanente de 100 hectares de floresta nativa num parque nacional para compensar a perda de 50 hectares na faixa de servidão."
        }
      ],
      legalRef: "Princípios da Lei do Ambiente (Lei nº 20/97) e Regulamento de AIA (Decreto nº 54/2015).",
      keyDistinction: "A compensação é sempre o último recurso: é um erro técnico grave tentar compensar sem antes esgotar as medidas de evitar e minimizar."
    },
    sampleScenarios: [
      "Num projeto de parque solar, o projetista propôs apenas compensar financeiramente o desmatamento sem tentar desviar a cerca da nascente do rio. Como a DINAB deve avaliar essa proposta sob a ótica da hierarquia?"
    ],
    isOfficialDoc: false
  },
  {
    id: 17,
    moduleId: "mod-6",
    moduleTitle: "Matriz Energética Comparada",
    title: "Avaliação do Ciclo de Vida (ACV Cradle-to-Grave) na Energia Solar",
    question: "Por que a Avaliação do Ciclo de Vida (ACV 'do berço à sepultura') demonstra que a energia solar fotovoltaica não é 100% isenta de impactos ambientais, segundo estudos acadêmicos em Moçambique (Jambo, 2025)?",
    contextPrompt: "Explique as cargas ambientais geradas fora da fase de operação, abrangendo extração de silício, fabricação do módulo (vidro/alumínio), transporte e descarte final.",
    keywords: [
      "Avaliação do Ciclo de Vida",
      "ACV",
      "cradle-to-grave",
      "do berço à sepultura",
      "fabricação do módulo",
      "purificação de silício",
      "logística de transporte",
      "Jambo 2025"
    ],
    officialAnswer: {
      summary: "A energia solar tem emissões operacionais nulas, mas a ACV revela que a maior carga ambiental está concentrada na extração mineral e refinação térmica do silício, fabricação das molduras de alumínio e vidro, e no transporte marítimo/rodoviário até Moçambique.",
      sections: [
        {
          heading: "1. Conceito da ACV Cradle-to-Grave",
          content: "A abordagem do berço à sepultura analisa o balanço ecológico integral em todas as etapas: extração de matérias-primas, processamento industrial, logística, instalação no local, manutenção e desativação."
        },
        {
          heading: "2. Cargas Ambientais Ocultas da Cadeia de Produtos",
          content: "A purificação do silício grau solar exige fornos elétricos a mais de 1.800 °C frequentemente alimentados por usinas a carvão nos países fabricantes (alta energia incorporada - embodied energy). Além disso, a produção de alumínio para as estruturas metálicas de sustentação é eletrointensiva e gera bauxita e efluentes cáusticos."
        },
        {
          heading: "3. Relevância para a AIA em Moçambique",
          content: "Demonstra que a aprovação ambiental não pode ignorar o plano de descomissionamento e reciclagem após 25 anos de vida útil, prevenindo que Moçambique se torne depósito de lixo eletrônico (E-waste)."
        }
      ],
      legalRef: "Dissertação de Eugénio Gabriel Jambo (UEM, 2025) e Política de Energias Novas e Renováveis.",
      keyDistinction: "A energia solar limpa o ar local durante 25 anos de geração, mas sua pegada ecológica global existe e decorre da cadeia industrial de fabricação."
    },
    sampleScenarios: [
      "Qual indicador técnico de ACV mede o tempo necessário para que um painel solar gere a mesma quantidade de energia gasta na sua fabricação (Energy Payback Time)?"
    ],
    isOfficialDoc: false
  },
  {
    id: 18,
    moduleId: "mod-6",
    moduleTitle: "Matriz Energética Comparada",
    title: "Estudo de Caso: Central Solar de Dondo (Bairro Macharote, Sofala)",
    question: "Analise os principais impactos ambientais e sociais identificados na AIA da Central Solar Fotovoltaica de Dondo (40 MW) na Província de Sofala.",
    contextPrompt: "Aborde a escala territorial de ocupação (~88 hectares), impactos de curto prazo na obra (ruído e poeiras), PGAS e os desafios de uso da terra no Bairro Macharote.",
    keywords: [
      "Central Solar de Dondo",
      "Bairro Macharote",
      "Província de Sofala",
      "40 MW",
      "88 hectares",
      "poeiras e ruído",
      "PGAS",
      "uso da terra"
    ],
    officialAnswer: {
      summary: "A Central de Dondo ocupa ~88 hectares de terra no Bairro Macharote. A AIA destacou impactos locais de curto prazo na fase de construção (poeiras, ruído e supressão vegetal) e condicionou a viabilidade à execução de um Plano de Gestão Ambiental e Social (PGAS).",
      sections: [
        {
          heading: "1. Dimensão e Características do Projeto",
          content: "Potência instalada de 40 MW com ocupação territorial expressiva de cerca de 88 hectares de solo plano no Bairro Macharote, distrito de Dondo, Sofala, interligada à subestação da EDM."
        },
        {
          heading: "2. Impactos de Curto Prazo (Fase de Construção)",
          content: "• Movimentação de terras e decapagem: geração elevada de material particulado (poeiras) nas imediações de habitações rurais;\n• Tráfego de maquinaria pesada: ruído contínuo e riscos viários nas vias de acesso não pavimentadas;\n• Supressão de cobertura vegetal: perda localizada de capim e arbustos nativos."
        },
        {
          heading: "3. Conclusões e Medidas Obrigatórias da AIA",
          content: "O projeto foi aprovado com Licença Ambiental pelo MTA mediante o cumprimento do PGAS, com rega constante de vias, sinalização de segurança, contratação prioritária de trabalhadores locais do Dondo e canal permanente de ouvidoria comunitária."
        }
      ],
      legalRef: "EIA da Central Solar de Dondo e Decreto nº 54/2015.",
      keyDistinction: "Projetos solares demandam muita terra (cerca de 2 hectares por MW), exigindo triagem criteriosa para não invadir machambas produtivas de subsistência."
    },
    sampleScenarios: [
      "Se a área da Central de Dondo abrigasse espécies de flora protegidas pela Lei de Florestas, qual medida da hierarquia de mitigação deveria ter sido aplicada?"
    ],
    isOfficialDoc: false
  },
  {
    id: 19,
    moduleId: "mod-4",
    moduleTitle: "Linhas de Transmissão Elétrica",
    title: "Estudo de Caso: Linha de 400 kV Songo-Matambo (Tete) e Controle de Emissões",
    question: "Com base no estudo de AIA da Linha de Alta Tensão de 400 kV Songo-Matambo em Tete, quais os principais poluentes atmosféricos emitidos na fase de obras e que medidas operacionais rígidas foram impostas aos camiões e máquinas pesadas?",
    contextPrompt: "Identifique os gases de escape (NOx, SO2, CO, particulados), poeiras por circulação em terra batida e os protocolos de velocidade, lonas e rega.",
    keywords: [
      "Songo-Matambo",
      "400 kV",
      "Província de Tete",
      "EDM e Verde Azul",
      "Categoria A",
      "NOx, SO2, CO",
      "poeiras",
      "rega de vias",
      "limite 30 km/h",
      "lonas em caçambas"
    ],
    officialAnswer: {
      summary: "Na obra da linha de 400 kV Songo-Matambo (Categoria A), os principais impactos atmosféricos são poeiras fugitivas e gases de escape (NOx, SO2, CO). As mitigações obrigatórias incluem limite de velocidade a 30 km/h, rega periódica com caminhões-pipa e cobertura de caçambas com lonas.",
      sections: [
        {
          heading: "1. Origem e Tipos de Emissões na Linha Songo-Matambo",
          content: "A escavação das fundações das torres, abertura de picadas e transporte de concreto e estruturas metálicas mobilizam dezenas de veículos pesados a diesel, emitindo material particulado (poeiras respiráveis), óxidos de azoto (NOx), dióxido de enxofre (SO2) e monóxido de carbono (CO)."
        },
        {
          heading: "2. Protocolo Operacional de Mitigação Obrigatória",
          content: "• Vias Não Pavimentadas: Umectação regular (rega com água) dos acessos nas proximidades de povoações de Tete;\n• Limitação de Velocidade: Restrição rígida a 30 km/h em trechos habitados para minimizar ressuspensão de poeiras e prevenir atropelamentos;\n• Transporte de Inertes: Cobertura obrigatória de todas as caçambas de camiões com lonas impermeáveis;\n• Maquinaria: Manutenção preventiva documentada dos motores a diesel e proibição expressa de veículos em marcha lenta ociosa prolongada."
        }
      ],
      legalRef: "Adenda ao EIA do Projeto da Linha 400 kV Songo-Matambo (EDM / Verde Azul, 2022) e Decreto nº 54/2015.",
      keyDistinction: "A fase de construção concentra 90% das emissões atmosféricas de todo o ciclo de vida de uma linha de transmissão elétrica."
    },
    sampleScenarios: [
      "Quais os riscos à saúde das comunidades das margens da estrada de acesso em Tete causados pela inalação crônica de partículas PM10 e PM2.5 durante 18 meses de obras?"
    ],
    isOfficialDoc: false
  },
  {
    id: 20,
    moduleId: "mod-6",
    moduleTitle: "Matriz Energética Comparada",
    title: "Estudo de Caso: Central Eólica da Namaacha e Riscos à Avifauna",
    question: "Quais são os principais impactos ambientais específicos avaliados na implantação da Central Eólica da Namaacha (Província de Maputo) e como a AIA aborda o ruído e a colisão de aves e morcegos?",
    contextPrompt: "Explique a topografia dos planaltos da Namaacha, o efeito barreira das pás giratórias, ruído aerodinâmico e o transporte rodoviário de cargas sobredimensionadas.",
    keywords: [
      "Central Eólica da Namaacha",
      "Namaacha",
      "Província de Maputo",
      "aerogeradores",
      "colisão de avifauna e morcegos",
      "ruído aerodinâmico",
      "ruído mecânico",
      "cargas sobredimensionadas"
    ],
    officialAnswer: {
      summary: "A Central da Namaacha aproveita os ventos fortes dos planaltos, mas a AIA exige monitoria contínua da mortalidade de aves migratórias e morcegos por colisão com as pás, controle de ruído aerodinâmico próximo a habitações e abertura controlada de acessos para pás gigantes.",
      sections: [
        {
          heading: "1. Impacto Crítico: Mortalidade de Fauna Alada (Avifauna e Quirópteros)",
          content: "As pás dos aerogeradores giram em altas velocidades periféricas, criando efeito estroboscópico e barreira tridimensional que causa mortes por colisão direta ou barotrauma (queda brusca de pressão no ar que causa hemorragia pulmonar em morcegos)."
        },
        {
          heading: "2. Poluição Sonora (Acústica)",
          content: "Emissão contínua de ruído mecânico (caixas de engrenagens no topo da torre) e aerodinâmico (atrito do ar nas pás). A AIA exige distância de amortecimento (buffer zone mínima de 500 a 1.000 metros) entre as torres e residências da vila da Namaacha."
        },
        {
          heading: "3. Logística de Cargas Sobredimensionadas",
          content: "O transporte das torres e pás com mais de 50 metros de comprimento exige alinhamento e ampliação de curvas em rodovias sinuosas da serra, demandando terraplenagem e remoção temporária de vegetação lateral."
        }
      ],
      legalRef: "Estudos de AIA do Setor Eólico em Moçambique e Decreto nº 54/2015.",
      keyDistinction: "A energia eólica tem pegada nula na água e no ar, mas seu monitoramento deve durar anos após a inauguração para registrar a taxa de carcaças de aves coletadas sob as torres."
    },
    sampleScenarios: [
      "Que tecnologia de radares ou câmeras com IA pode desacelerar automaticamente as pás dos aerogeradores da Namaacha ao detectar a aproximação de bandos de aves migratórias?"
    ],
    isOfficialDoc: false
  },
  {
    id: 21,
    moduleId: "mod-6",
    moduleTitle: "Matriz Energética Comparada",
    title: "Centrais Hidroelétricas Tropicais (Cahora Bassa): Emissões de Metano (CH4) e Caudal Ecológico",
    question: "Por que grandes barragens hidroelétricas em regiões tropicais (como Cahora Bassa no Rio Zambeze) podem emitir gases de efeito estufa (metano CH4) e qual a importância da garantia do Caudal Ecológico na AIA?",
    contextPrompt: "Explique a decomposição anaeróbia da vegetação submersa na albufeira, a formação de metano (CH4), e a regulação da vazão a jusante para manter o delta do Zambeze vivo.",
    keywords: [
      "Cahora Bassa",
      "Bacia do Zambeze",
      "metano",
      "CH4",
      "decomposição anaeróbia",
      "albufeira tropical",
      "caudal ecológico",
      "delta do Zambeze",
      "inundação de habitats"
    ],
    officialAnswer: {
      summary: "O enchimento da albufeira submerge florestas que se decompõem sem oxigênio nas camadas profundas, liberando metano (CH4) — gás com potencial de aquecimento 28 vezes maior que o CO2. Além disso, a AIA exige a manutenção de um Caudal Ecológico a jusante para proteger a foz e os mangais.",
      sections: [
        {
          heading: "1. Emissão de Metano em Reservatórios Tropicais",
          content: "Em climas quentes como Tete, o lago de acumulação cobre biomassa vegetal fresca. A decomposição anóxica nas camadas profundas do reservatório converte matéria orgânica em metano (CH4). Ao passar pelas turbinas e vertedouros, o gás é despressurizado e liberado para a atmosfera."
        },
        {
          heading: "2. A Exigência do Caudal Ecológico a Jusante",
          content: "A barragem altera o pulso hidrológico natural do rio. O Caudal Ecológico é o volume mínimo de água que deve ser descarregado continuamente e de forma programada para preservar as rotas migratórias de peixes, manter os mangais do delta do Zambeze e garantir água para a agricultura ribeirinha."
        },
        {
          heading: "3. Impactos Sociais e Geopolíticos",
          content: "Exige reassentamento involuntário de populações das margens e controle rigoroso de assoreamento para evitar que sedimentos reduzam o volume útil do reservatório ao longo das décadas."
        }
      ],
      legalRef: "Lei de Águas (Lei nº 16/91), Lei do Ambiente (Lei nº 20/97) e Decreto nº 54/2015.",
      keyDistinction: "Centrais hidroelétricas são renováveis, mas albufeiras tropicais não são carbono-zero nos seus primeiros 10 a 20 anos de operação."
    },
    sampleScenarios: [
      "Como a prévia desflorestação e remoção da madeira nobre antes do enchimento da albufeira de uma nova barragem reduz as emissões de metano nos anos subsequentes?"
    ],
    isOfficialDoc: false
  },
  {
    id: 22,
    moduleId: "mod-2",
    moduleTitle: "Quadro Legal e Institucional",
    title: "Nova Lei de Electricidade (Lei nº 12/2022) e Revisores Independentes (DM nº 118/2022)",
    question: "Quais são as principais inovações trazidas pela Nova Lei de Electricidade (Lei nº 12/2022) e pelo Diploma Ministerial nº 118/2022 no quadro regulatório ambiental e energético de Moçambique?",
    contextPrompt: "Explique a revogação da antiga Lei 21/97, a abertura para mini-redes e produtores independentes privados de energias renováveis, e a regulamentação dos revisores para projetos de Categoria A+.",
    keywords: [
      "Lei nº 12/2022",
      "revogou a Lei 21/97",
      "mini-redes",
      "produtores independentes",
      "DM nº 118/2022",
      "Revisores Especialistas Independentes",
      "ARENE",
      "transição energética"
    ],
    officialAnswer: {
      summary: "A Lei nº 12/2022 modernizou o setor elétrico ao permitir mini-redes renováveis descentralizadas e incentivar produtores privados; já o DM nº 118/2022 regulamentou os critérios de contratação e independência dos peritos avaliadores de projetos Categoria A+.",
      sections: [
        {
          heading: "1. Inovações da Lei nº 12/2022 de Electricidade",
          content: "Revogou a antiga Lei nº 21/97. Criou o regime jurídico para mini-redes e geração isolada fora da rede nacional, facilitando o licenciamento de sistemas solares e hídricos comunitários e definindo o papel regulador da ARENE (Autoridade Reguladora de Energia)."
        },
        {
          heading: "2. Inovações do Diploma Ministerial nº 118/2022 (AIA Categoria A+)",
          content: "Estabeleceu as regras rígidas para a contratação de Revisores Especialistas Independentes. Exige que esses revisores não tenham vínculos com o proponente, comprovem no mínimo 10 anos de experiência internacional e emitam relatórios técnicos autônomos para blindar a decisão de licenciamento de megaprojetos contra pressões políticas."
        }
      ],
      legalRef: "Lei nº 12/2022 de 11 de Julho e Diploma Ministerial nº 118/2022 de Moçambique.",
      keyDistinction: "A nova legislação compatibiliza a urgência da eletrificação rural de Moçambique com os mais altos padrões internacionais de salvaguarda ambiental."
    },
    sampleScenarios: [
      "Um investidor privado quer instalar uma mini-rede solar de 1 MW em Cabo Delgado. Qual o procedimento combinado sob a Lei 12/2022 e a classificação de AIA pelo Decreto 54/2015?"
    ],
    isOfficialDoc: false
  }
];

export const TECHNICAL_GLOSSARY = {
  "EIA": "Estudo de Impacto Ambiental — Estudo técnico multidisciplinar detalhado.",
  "AIA": "Avaliação de Impacto Ambiental — Processo administrativo oficial de gestão preventiva e licenciamento.",
  "EPDA": "Estudo de Pré-Viabilidade Ambiental e Definição do Âmbito — Fase inicial obrigatória para Cat. A+ e A.",
  "TdR": "Termos de Referência — Documento que delimita o escopo dos estudos do EIA aprovado pela DINAB.",
  "DINAB": "Direcção Nacional do Ambiente — Entidade do governo de Moçambique responsável pela gestão técnica de AIA.",
  "MTA": "Ministério da Terra e Ambiente — Órgão central do Estado que tutela o setor ambiental em Moçambique.",
  "ARENE": "Autoridade Reguladora de Energia — Órgão regulador das tarifas e operadores de eletricidade em Moçambique.",
  "Faixa de Servidão": "Faixa de terreno restrita sob a linha de transmissão onde são proibidas habitações e árvores de grande porte.",
  "Efeito Corona": "Descarga luminosa e acústica (zumbido) devida à ionização do ar ao redor de condutores de alta tensão.",
  "PCB": "Bifenilos Policlorados (Askarel) — Óleos isolantes sintéticos cancerígenos e poluentes persistentes regulados pelo Decreto 83/2014.",
  "SAO": "Separador de Água e Óleo — Caixa de retenção estanque que separa óleos por densidade antes do efluente pluvial sair da subestação.",
  "DUAT": "Direito de Uso e Aproveitamento da Terra — Instituto jurídico moçambicano que regula a posse e uso da terra (Lei 19/97).",
  "AQUA": "Agência Nacional para o Controlo da Qualidade Ambiental — Entidade fiscalizadora de Moçambique.",
  "ACV": "Avaliação do Ciclo de Vida (Cradle-to-Grave) — Análise ambiental desde a extração do silício até o descarte final (Jambo, 2025).",
  "Hierarquia de Mitigação": "Sequência técnica prioritária: 1. Evitar -> 2. Minimizar -> 3. Restaurar -> 4. Compensar (offsets).",
  "Caudal Ecológico": "Vazão hídrica mínima contínua descarregada por barragens para preservar ecossistemas aquáticos a jusante.",
  "Lei 12/2022": "Nova Lei de Electricidade de Moçambique que revogou a Lei 21/97, regulando mini-redes renováveis e produtores privados.",
  "DM 118/2022": "Diploma Ministerial que regulamenta os Revisores Especialistas Independentes para projetos de Categoria A+.",
  "Thermal Runaway": "Fuga térmica autoalimentada em baterias de íon de lítio com emissão de gases tóxicos e fogo difícil de extinguir."
};

