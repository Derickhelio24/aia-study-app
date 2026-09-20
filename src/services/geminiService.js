/**
 * Gemini AI Service - Tutor e Avaliador Acadêmico de AIA (Moçambique)
 * Suporta modo online com Google Gen AI SDK e modo inteligente offline integrado.
 */

import { GoogleGenAI } from "@google/genai";

const GEMINI_MODEL = "gemini-3.6-flash";

/**
 * Avalia a resposta do estudante comparando com o gabarito oficial e legislação de Moçambique.
 */
export async function evaluateStudentAnswer(question, studentAnswer, apiKey) {
  if (!studentAnswer || studentAnswer.trim().length < 5) {
    return {
      score: 0,
      grade20: 0,
      strengths: [],
      missingPoints: ["Resposta demasiado curta ou vazia para avaliação."],
      feedback: "Por favor, elabore a sua resposta apresentando os conceitos técnicos e as exigências da legislação moçambicana.",
      legalReferenceCitation: question.officialAnswer.legalRef,
      isAiAssisted: false,
    };
  }

  // Se tiver chave de API, tenta chamar o Gemini
  if (apiKey && apiKey.trim().length > 10) {
    try {
      const ai = new GoogleGenAI({ apiKey: apiKey.trim() });
      const prompt = `
Você é o Professor Joel Jorge Malope, docente titular da cadeira de Avaliação de Impacto Ambiental (AIA) do curso de Engenharia Elétrica da Universidade Politécnica (Campus de Maputo), e auditor ambiental sênior em Moçambique.

Sua autoridade técnica baseia-se na Lei do Ambiente (Lei nº 20/97), no Regulamento de AIA (Decreto nº 54/2015), na Nova Lei de Electricidade (Lei nº 12/2022), no Diploma Ministerial nº 118/2022 (Revisores Independentes para Cat. A+), na Hierarquia de Mitigação de 4 Níveis (Evitar, Minimizar, Restaurar, Compensar) e em pesquisas acadêmicas e estudos de caso moçambicanos (ACV solar por Eugénio Jambo 2025, Central Solar de Dondo em Sofala, Linha 400 kV Songo-Matambo em Tete, Parque Eólico da Namaacha e Barragem de Cahora Bassa).

Avalie com o mais elevado rigor pedagógico e universitário a resposta dada pelo estudante de engenharia para a seguinte pergunta de teste:

[PERGUNTA OFICIAL DO TESTE]:
${question.question}

[CONTEXTO / EXIGÊNCIA TÉCNICA]:
${question.contextPrompt}

[GABARITO OFICIAL E PADRÃO ESPERADO]:
${question.officialAnswer.summary}
${question.officialAnswer.sections.map(s => `${s.heading}: ${s.content}`).join("\n\n")}
Enquadramento Legal: ${question.officialAnswer.legalRef}

[RESPOSTA SUBMETIDA PELO ESTUDANTE]:
"""
${studentAnswer}
"""

Instruções de Avaliação:
1. Dê uma nota de 0 a 100 pontos percentuais (e seu equivalente na escala moçambicana de 0 a 20 valores).
2. Destaque 2 a 3 pontos fortes e acertos conceituais presentes na resposta do estudante.
3. Aponte claramente 2 a 3 lacunas, omissões de legislação (como Decreto 54/2015, DINAB, MTA) ou imprecisões técnicas.
4. Escreva um parecer/feedback construtivo de 2 a 4 parágrafos orientando como melhorar para tirar nota máxima no teste.

IMPORTANTE: Responda ESTRITAMENTE em formato JSON com o seguinte schema:
{
  "score": <número inteiro de 0 a 100>,
  "grade20": <número decimal de 0.0 a 20.0 com 1 casa decimal>,
  "strengths": ["ponto forte 1", "ponto forte 2"],
  "missingPoints": ["lacuna 1", "lacuna 2"],
  "feedback": "Texto do feedback detalhado...",
  "legalReferenceCitation": "${question.officialAnswer.legalRef}"
}
`;

      const response = await ai.models.generateContent({
        model: GEMINI_MODEL,
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.2,
        }
      });

      const text = response.text?.trim();
      if (text) {
        const parsed = JSON.parse(text);
        return {
          ...parsed,
          isAiAssisted: true,
        };
      }
    } catch (err) {
      console.warn("Falha na chamada ao Gemini API, usando motor de avaliação offline:", err);
      // Cai no fallback offline caso a API dê erro (cota, rede ou chave inválida)
    }
  }

  // Avaliador Offline Integrado (Baseado em Cobertura Léxica, Conceitual e Estrutura)
  return offlineEvaluateAnswer(question, studentAnswer);
}

/**
 * Motor de Avaliação Heurística Offline (Funciona 100% sem internet e sem chave de API)
 */
export function offlineEvaluateAnswer(question, studentAnswer) {
  const normalizedText = studentAnswer.toLowerCase();
  const matchedKeywords = [];
  const missingKeywords = [];

  question.keywords.forEach((kw) => {
    const kwLower = kw.toLowerCase();
    // busca parcial ou exata
    if (normalizedText.includes(kwLower) || kwLower.split(" ").some(part => part.length > 4 && normalizedText.includes(part))) {
      matchedKeywords.push(kw);
    } else {
      missingKeywords.push(kw);
    }
  });

  const keywordScoreRatio = matchedKeywords.length / (question.keywords.length || 1);
  const wordCount = studentAnswer.trim().split(/\s+/).length;

  let lengthFactor = 1.0;
  if (wordCount < 20) lengthFactor = 0.4;
  else if (wordCount < 40) lengthFactor = 0.7;
  else if (wordCount < 70) lengthFactor = 0.85;
  else lengthFactor = 1.0;

  let rawScore = Math.round((keywordScoreRatio * 0.75 + lengthFactor * 0.25) * 100);
  rawScore = Math.min(96, Math.max(15, rawScore));
  const grade20 = Number(((rawScore / 100) * 20).toFixed(1));

  const strengths = [];
  if (matchedKeywords.length > 0) {
    strengths.push(`Abordou termos essenciais como: ${matchedKeywords.slice(0, 3).join(", ")}.`);
  }
  if (wordCount >= 40) {
    strengths.push("Estrutura discursiva desenvolvida com extensão adequada para resposta de exame.");
  } else {
    strengths.push("Identificou o tema central proposto pelo docente.");
  }

  const missingPoints = [];
  if (missingKeywords.length > 0) {
    missingPoints.push(`Faltou citar ou aprofundar: ${missingKeywords.slice(0, 3).join(", ")}.`);
  }
  if (!normalizedText.includes("moçambique") && !normalizedText.includes("decreto") && !normalizedText.includes("lei")) {
    missingPoints.push("Não fez menção explícita ao quadro regulamentar de Moçambique (Lei 20/97 e Decreto 54/2015).");
  }
  if (wordCount < 40) {
    missingPoints.push("A resposta poderia ser mais detalhada, exemplificando as medidas práticas ou fases técnicas.");
  }

  const feedback = `
Sua resposta demonstrou compreensão dos aspectos fundamentais da questão, alcançando a nota estimada de ${grade20}/20 valores (${rawScore}%).
Para atingir a nota máxima perante o docente, certifique-se de fundamentar as suas afirmações citando as normas ambientais moçambicanas (${question.officialAnswer.legalRef}) e articulando a distinção entre a fase de planejamento/construção e a fase de operação.
Compare com o gabarito oficial no verso do cartão para enriquecer seu vocabulário técnico.
  `.trim();

  return {
    score: rawScore,
    grade20: grade20,
    strengths: strengths.length > 0 ? strengths : ["Compreensão inicial do tema"],
    missingPoints: missingPoints.length > 0 ? missingPoints : ["Aprofundamento de exemplos específicos de campo."],
    feedback: feedback,
    legalReferenceCitation: question.officialAnswer.legalRef,
    isAiAssisted: false,
  };
}

/**
 * Explicação profunda de termos e conceitos com o Tutor Gemini
 */
export async function explainConceptWithTutor(question, conceptOrTerm, apiKey) {
  if (apiKey && apiKey.trim().length > 10) {
    try {
      const ai = new GoogleGenAI({ apiKey: apiKey.trim() });
      const prompt = `
Você é um experiente professor de Engenharia e Gestão Ambiental em Moçambique.
O estudante está estudando a questão: "${question.question}".
Ele solicitou uma explicação aprofundada, didática e com exemplos reais de Moçambique sobre o seguinte termo/conceito:
"${conceptOrTerm || question.title}"

Explique:
1. O que é exatamente e por que é fundamental na AIA do setor elétrico.
2. Como se aplica na prática em projetos moçambicanos (ex: Linhas da EDM, Hidrelétrica de Cahora Bassa, Subestações de Maputo ou Matambo, ou centrais solares de Mocuba/Metoro).
3. O que a legislação de Moçambique (Decreto 54/2015 e Lei 20/97) exige a respeito.
4. Uma dica de ouro para lembrar na hora da prova.

Seja didático, use formatação clara com tópicos e linguagem de alto nível acadêmico.
`;

      const response = await ai.models.generateContent({
        model: GEMINI_MODEL,
        contents: prompt,
      });

      return {
        explanation: response.text,
        isAiAssisted: true,
      };
    } catch (e) {
      console.warn("Erro ao gerar explicação com Gemini:", e);
    }
  }

  // Fallback didático offline
  return {
    explanation: `
### Guia do Tutor: ${conceptOrTerm || question.title}

**1. Relevância no Setor Elétrico e AIA:**
Este conceito é chave para a avaliação de viabilidade ambiental. No setor elétrico (linhas de transmissão de alta tensão e subestações), os projetos causam impactos tanto lineares (faixa de servidão, desmatamento ao longo de centenas de quilômetros) quanto pontuais (pátios de manobra e transformadores).

**2. Aplicação Prática em Moçambique:**
Empreendimentos da E.D.M. (Electricidade de Moçambique) e da HCB precisam obedecer aos limites de servidão pública e salvaguardar comunidades agrícolas. Por exemplo, a travessia de áreas agrícolas tradicionais (machambas) exige inventários detalhados para compensação justa e mitigação de erosão em solos arenosos ou declivosos.

**3. Exigência Legal (${question.officialAnswer.legalRef}):**
O Decreto nº 54/2015 determina que a triagem inicial classifique a magnitude do impacto. Qualquer intervenção suscetível de gerar deslocamento comunitário ou contaminação de lençóis subterrâneos por óleos dielétricos requer estudos aprofundados (Categoria A+ ou A) submetidos à DINAB.

**4. Dica de Prova:**
Sempre relacione o impacto biofísico (ex: solo, água, flora) com a sua medida mitigadora correspondente e a respectiva fase do projeto (planejamento, construção ou operação).
    `.trim(),
    isAiAssisted: false,
  };
}

/**
 * Gerador de Novos Casos Práticos / Cenários de Estudo
 */
export async function generateNewScenario(question, apiKey) {
  if (apiKey && apiKey.trim().length > 10) {
    try {
      const ai = new GoogleGenAI({ apiKey: apiKey.trim() });
      const prompt = `
Você é um docente universitário em Moçambique preparando questões de exame de AIA.
Com base no tema: "${question.question}" e no contexto do setor elétrico e ambiental de Moçambique:

Crie UM novo caso prático inédito, realista e contextualizado numa província de Moçambique (ex: Tete, Nampula, Inhambane, Sofala ou Manica).
O caso deve conter:
1. Título do Projeto (ex: "Construção da Linha de 220kV Nacala-Monapo atravessando zona de palmares").
2. Contexto do Problema (descreva o traçado, o meio físico e a presença de comunidades rurais).
3. Desafio / Pergunta para o estudante responder.
4. Resposta-modelo e pontos-chave que o aluno deveria abordar segundo o Decreto nº 54/2015.

Formato de retorno em JSON:
{
  "scenarioTitle": "...",
  "location": "...",
  "scenarioDescription": "...",
  "challengeQuestion": "...",
  "expectedKeyPoints": ["...", "..."],
  "modelSolution": "..."
}
`;

      const response = await ai.models.generateContent({
        model: GEMINI_MODEL,
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });

      const parsed = JSON.parse(response.text);
      return { ...parsed, isAiAssisted: true };
    } catch (e) {
      console.warn("Erro ao gerar cenário com Gemini:", e);
    }
  }

  // Fallback offline com cenários prontos
  const fallbackScenarios = {
    1: {
      scenarioTitle: "Projeto de Interligação Regional Moçambique-Malawi (400kV)",
      location: "Província de Tete (Matambo a Zóbwè)",
      scenarioDescription: "A EDM planeja a construção de uma linha de transmissão de 400 kV com 140 km de extensão em território moçambicano, atravessando áreas de savana arborizada e aldeias.",
      challengeQuestion: "Diferencie o papel do EIA a ser entregue pela consultoria e o processo de AIA conduzido pelo MTA para este projeto.",
      expectedKeyPoints: ["EIA é o relatório técnico dos impactos da linha", "AIA é a avaliação pública, parecer da DINAB e emissão da Licença Ambiental de Instalação"],
      modelSolution: "O EIA é o estudo técnico elaborado por consultores credenciados identificando os impactos no solo, avifauna e desmatamento. A AIA é o processo administrativo conduzido pelo MTA/DINAB que inclui a consulta pública às comunidades de Tete, análise da comissão técnica e emissão formal da licença."
    },
    4: {
      scenarioTitle: "Linha de Alta Tensão no Corredor da Beira",
      location: "Província de Sofala (Dondo a Chimoio)",
      scenarioDescription: "A linha atravessa zonas com alta densidade de aves aquáticas migratórias e trechos suscetíveis a cheias periódicas.",
      challengeQuestion: "Identifique dois impactos específicos e proponha mitigações de engenharia para a avifauna e para a fundação das torres.",
      expectedKeyPoints: ["Colisão de aves com cabos de guarda", "Desestabilização e corrosão das bases das torres por inundações", "Instalação de desviadores de voo espirais"],
      modelSolution: "Impacto 1: Colisão de aves - Mitigação: instalação de sinalizadores visuais espirais (bird flappers) a cada 10 metros nos cabos superiores. Impacto 2: Erosão e instabilidade das torres - Mitigação: fundações reforçadas em estacas de concreto e drenagem perimetral."
    },
    7: {
      scenarioTitle: "Incidente na Subestação de Chibuto",
      location: "Província de Gaza",
      scenarioDescription: "Durante a troca de buchas de um transformador de 50 MVA, uma válvula rompeu-se vazando 1.200 litros de óleo mineral em solo arenoso a 300 metros de um rio comunitário.",
      challengeQuestion: "Qual o procedimento emergencial de campo e que infraestrutura prévia deveria ter contido o vazamento?",
      expectedKeyPoints: ["Bacia de contenção estanque sob o transformador", "Aplicação de mantas absorventes", "Remoção e incineração da camada de areia contaminada"],
      modelSolution: "O transformador deve possuir bacia de retenção de concreto estanque com brita e capacidade de 110% do volume. Em caso de transbordamento, aplicar serradura/mantas absorventes, estancar o fluxo rumo ao rio e escavar todo o solo contaminado para descarte como resíduo perigoso regulado pelo Decreto 83/2014."
    }
  };

  const selected = fallbackScenarios[question.id] || fallbackScenarios[1];
  return { ...selected, isAiAssisted: false };
}

/**
 * Gerador de Novas Questões de Exame Inéditas (Gera cards dinâmicos na hora com a IA)
 */
export async function generateBrandNewQuestion(nextId, moduleTitle = "Setor Elétrico & Legislação", apiKey = "") {
  if (apiKey && apiKey.trim().length > 10) {
    try {
      const ai = new GoogleGenAI({ apiKey: apiKey.trim() });
      const prompt = `
Você é um docente universitário de renome em Moçambique elaborando uma NOVA questão inédita para o exame de Avaliação de Impacto Ambiental (AIA).
Tema geral: ${moduleTitle} (com foco em linhas de transmissão, subestações, geração solar/térmica e normas moçambicanas: Decreto nº 54/2015, Lei 20/97, Decreto 31/2012 e Decreto 83/2014).

Crie uma pergunta inédita de exame (não use as 9 perguntas clássicas).
Retorne ESTRITAMENTE em formato JSON com o seguinte schema:
{
  "title": "Título curto da questão",
  "question": "O enunciado da pergunta exatamente como o professor colocaria no exame.",
  "contextPrompt": "Orientação técnica e pedagógica para o aluno responder.",
  "keywords": ["palavra-chave 1", "palavra-chave 2", "palavra-chave 3", "palavra-chave 4"],
  "officialAnswer": {
    "summary": "Resumo em 1 parágrafo do gabarito esperado.",
    "sections": [
      {
        "heading": "1. Aspecto Técnico/Legal",
        "content": "Explicação técnica detalhada..."
      },
      {
        "heading": "2. Medidas Mitigadoras e Normas",
        "content": "Medidas práticas segundo a lei moçambicana..."
      }
    ],
    "legalRef": "Artigos e decretos aplicáveis em Moçambique",
    "keyDistinction": "Dica de ouro / distinção essencial"
  }
}
`;

      const response = await ai.models.generateContent({
        model: GEMINI_MODEL,
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });

      const parsed = JSON.parse(response.text);
      return {
        id: nextId,
        moduleId: "mod-4",
        moduleTitle: moduleTitle,
        ...parsed,
        sampleScenarios: [],
        isOfficialDoc: false,
        isAiGenerated: true,
      };
    } catch (e) {
      console.warn("Erro ao gerar questão inédita com Gemini:", e);
    }
  }

  // Fallback offline caso esteja sem internet ou sem chave
  return {
    id: nextId,
    moduleId: "mod-4",
    moduleTitle: "Setor Elétrico & AIA",
    title: `Questão Inédita: Riscos Ambientais na Travessia de Zonas Húmidas`,
    question: "Uma linha de transmissão de 275 kV deve atravessar uma zona húmida costeira em Moçambique com mangais e solo turfoso. Quais os impactos biofísicos críticos na construção das fundações das torres e que tecnologia deve ser adotada?",
    contextPrompt: "Analise a fragilidade dos mangais (ecossistema sensível), a corrosão de armaduras de aço e as restrições ao uso de maquinaria pesada em solos alagáveis.",
    keywords: ["mangais", "zona húmida", "fundação em estacas", "compactação", "corrosão", "Lei de Florestas e Fauna Bravia"],
    officialAnswer: {
      summary: "A travessia de mangais exige fundações profundas em estacas cravadas por vias flutuantes (pontões) para evitar dragagem extensiva, além de proteção catódica das armaduras e compensação por restauração de mangal.",
      sections: [
        {
          heading: "1. Impactos Específicos em Zonas Húmidas e Mangais",
          content: "Abertura de acessos em mangais provoca alteração dos regimes hidrológicos de maré, salinização do lençol superficial e morte de caranguejos e alevinos. Solos turfosos têm baixíssima capacidade de carga, exigindo estacas profundas."
        },
        {
          heading: "2. Medidas de Mitigação de Engenharia",
          content: "Uso de guindastes leves sobre esteiras de madeira (timber mats) para não compactar a lama; emprego de cimento resistente a sulfatos para as fundações; e obrigação legal de replantio compensatório de 2 hectares de mangal para cada hectare afetado."
        }
      ],
      legalRef: "Regulamento da Lei de Florestas e Fauna Bravia e Decreto nº 54/2015.",
      keyDistinction: "Mangais são ecossistemas protegidos de preservação especial: obras neles exigem parecer vinculativo da Administração Nacional das Áreas de Conservação (ANAC)."
    },
    sampleScenarios: [],
    isOfficialDoc: false,
    isAiGenerated: true,
  };
}

