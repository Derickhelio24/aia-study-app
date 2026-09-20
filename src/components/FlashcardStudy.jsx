import React, { useState, useEffect } from "react";
import { 
  RotateCw, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Lightbulb, 
  Globe2, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  AlertTriangle, 
  Scale, 
  FileCheck2, 
  MessageSquareQuote,
  X,
  PlusCircle,
  Filter
} from "lucide-react";
import confetti from "canvas-confetti";
import { 
  evaluateStudentAnswer, 
  explainConceptWithTutor, 
  generateNewScenario 
} from "../services/geminiService";

export default function FlashcardStudy({
  questionsList,
  selectedQuestionId,
  onSelectQuestion,
  onBackToDashboard,
  questionFilter,
  setQuestionFilter,
  onGenerateBrandNew,
  isGeneratingQuestion,
  progress,
  onUpdateStatus,
  apiKey,
}) {
  const currentIndex = questionsList.findIndex((q) => q.id === selectedQuestionId);
  const question = questionsList[currentIndex !== -1 ? currentIndex : 0];

  // Estados locais
  const [isFlipped, setIsFlipped] = useState(false);
  const [studentAnswer, setStudentAnswer] = useState("");
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState(null);

  // Estados para modais de Tutor e Cenário
  const [tutorModalOpen, setTutorModalOpen] = useState(false);
  const [tutorContent, setTutorContent] = useState(null);
  const [isLoadingTutor, setIsLoadingTutor] = useState(false);

  const [scenarioModalOpen, setScenarioModalOpen] = useState(false);
  const [scenarioContent, setScenarioContent] = useState(null);
  const [isLoadingScenario, setIsLoadingScenario] = useState(false);

  // Estado de áudio TTS
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Resetar ao trocar de questão
  useEffect(() => {
    setIsFlipped(false);
    setStudentAnswer("");
    setEvaluationResult(null);
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
  }, [question?.id]);

  if (!question) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center space-y-4">
        <p className="text-slate-500">Nenhuma questão encontrada com este filtro.</p>
        <button
          onClick={() => setQuestionFilter("all")}
          className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold"
        >
          Ver todas as questões
        </button>
      </div>
    );
  }

  // Função de síntese de voz (TTS)
  const toggleSpeech = (text) => {
    if (!("speechSynthesis" in window)) {
      alert("A síntese de voz não é suportada neste navegador.");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "pt-PT";
    utterance.rate = 0.95;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  // Avaliação da Resposta
  const handleEvaluate = async () => {
    if (!studentAnswer.trim()) {
      alert("Por favor, escreva a sua resposta antes de solicitar a avaliação da IA.");
      return;
    }

    setIsEvaluating(true);
    try {
      const res = await evaluateStudentAnswer(question, studentAnswer, apiKey);
      setEvaluationResult(res);

      if (res.score >= 80) {
        onUpdateStatus(question.id, "easy", res.score);
        confetti({ particleCount: 60, spread: 60, origin: { y: 0.8 } });
      } else if (res.score >= 50) {
        onUpdateStatus(question.id, "medium", res.score);
      } else {
        onUpdateStatus(question.id, "hard", res.score);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsEvaluating(false);
    }
  };

  // Abrir explicação com Tutor IA
  const handleOpenTutor = async () => {
    setTutorModalOpen(true);
    setIsLoadingTutor(true);
    try {
      const res = await explainConceptWithTutor(question, question.title, apiKey);
      setTutorContent(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingTutor(false);
    }
  };

  // Gerar novo cenário prático
  const handleOpenScenario = async () => {
    setScenarioModalOpen(true);
    setIsLoadingScenario(true);
    try {
      const res = await generateNewScenario(question, apiKey);
      setScenarioContent(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingScenario(false);
    }
  };

  // Classificação manual de repetição espaçada
  const handleRateCard = (status) => {
    onUpdateStatus(question.id, status);
    if (status === "easy") {
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.7 } });
    }
    if (currentIndex < questionsList.length - 1) {
      onSelectQuestion(questionsList[currentIndex + 1].id);
    }
  };

  const currentStatus = progress[question.id]?.status;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Topbar da Sessão de Flashcards */}
      {/* Cabeçalho de Navegação da Questão */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2.5">
          <button
            onClick={onBackToDashboard}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors shrink-0"
            title="Voltar ao Dashboard"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider truncate">
                {question.moduleTitle}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs font-semibold text-slate-500 shrink-0">
                Q.{currentIndex + 1} de {questionsList.length}
              </span>
            </div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 truncate">
              {question.title}
            </h2>
          </div>
        </div>

        {/* Controles de Navegação e Áudio */}
        <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto pt-1 sm:pt-0">
          
          <div className="flex items-center gap-1.5">
            {/* Botão para Gerar Pergunta Inédita com IA */}
            <button
              onClick={onGenerateBrandNew}
              disabled={isGeneratingQuestion}
              className="px-2.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800 hover:bg-emerald-100 text-xs font-bold flex items-center gap-1.5 transition-all disabled:opacity-50"
              title="Gerar nova questão com IA"
            >
              <PlusCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="hidden sm:inline">{isGeneratingQuestion ? "Gerando..." : "Nova Questão IA"}</span>
            </button>

            {/* Botão Áudio */}
            <button
              onClick={() => toggleSpeech(isFlipped ? question.officialAnswer.summary : question.question)}
              className={`px-2.5 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isSpeaking 
                  ? "bg-amber-100 text-amber-900 border-amber-300 animate-pulse" 
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
              }`}
              title="Ouvir texto em voz alta"
            >
              {isSpeaking ? <VolumeX className="w-4 h-4 text-amber-600 shrink-0" /> : <Volume2 className="w-4 h-4 text-emerald-600 shrink-0" />}
              <span>{isSpeaking ? "Parar" : "Ouvir"}</span>
            </button>
          </div>

          {/* Navegação Anterior / Próxima */}
          <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-0.5">
            <button
              disabled={currentIndex === 0}
              onClick={() => onSelectQuestion(questionsList[currentIndex - 1].id)}
              className="p-1.5 rounded text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"
              title="Questão Anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="text-[11px] font-bold text-slate-700 px-1.5">
              {currentIndex + 1}/{questionsList.length}
            </span>

            <button
              disabled={currentIndex === questionsList.length - 1}
              onClick={() => onSelectQuestion(questionsList[currentIndex + 1].id)}
              className="p-1.5 rounded text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"
              title="Próxima Questão"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Cartão de Flashcard Interativo (Flip 3D) */}
      <div className="perspective-1000 w-full min-h-[360px]">
        <div
          className={`relative w-full h-full min-h-[360px] rounded-2xl transition-all duration-500 transform-style-preserve-3d shadow-md border ${
            isFlipped ? "rotate-y-180 border-emerald-300 bg-white" : "border-slate-300 bg-white"
          }`}
        >
          
          {/* Lado Frontal: Pergunta */}
          <div className={`absolute inset-0 p-6 sm:p-8 flex flex-col justify-between backface-hidden rounded-2xl ${isFlipped ? "hidden" : "block"}`}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${
                  question.isOfficialDoc
                    ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                    : "bg-purple-100 text-purple-800 border-purple-200"
                }`}>
                  <FileCheck2 className="w-3.5 h-3.5" />
                  <span>
                    {question.isOfficialDoc ? "Pergunta Oficial do Docente" : "Questão Complementar / IA Inédita"}
                  </span>
                </span>

                <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600">
                  {question.officialAnswer.legalRef.split(" e ")[0]}
                </span>
              </div>

              <div className="pt-2">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                  "{question.question}"
                </h3>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 space-y-1">
                <div className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Orientação Acadêmica do Docente:</span>
                </div>
                <p className="leading-relaxed">
                  {question.contextPrompt}
                </p>
              </div>
            </div>

            {/* Ação de Virar o Card */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <div className="text-xs text-slate-400">
                Pense ou digite a resposta abaixo antes de virar.
              </div>
              <button
                onClick={() => setIsFlipped(true)}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all hover:scale-[1.02]"
              >
                <RotateCw className="w-4 h-4" />
                <span>Virar Cartão (Ver Gabarito)</span>
              </button>
            </div>
          </div>

          {/* Lado Verso: Gabarito Oficial */}
          <div className={`p-6 sm:p-8 flex flex-col justify-between rounded-2xl rotate-y-180 backface-hidden ${isFlipped ? "block" : "hidden"}`}>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Gabarito Modelo Oficial</span>
                  </span>
                  <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                    Padrão Universidade & Legislação Moçambique
                  </span>
                </div>

                <button
                  onClick={() => setIsFlipped(false)}
                  className="text-xs font-bold text-slate-600 hover:text-emerald-700 flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Voltar à Pergunta</span>
                </button>
              </div>

              {/* Síntese Rápida */}
              <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-200 text-xs sm:text-sm font-semibold text-emerald-950">
                {question.officialAnswer.summary}
              </div>

              {/* Seções Detalhadas da Resposta */}
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 text-xs leading-relaxed text-slate-700">
                {question.officialAnswer.sections.map((sec, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-50 border border-slate-200/60">
                    <strong className="block text-slate-900 font-bold mb-1">
                      {sec.heading}
                    </strong>
                    <div className="whitespace-pre-line text-slate-600">
                      {sec.content}
                    </div>
                  </div>
                ))}
              </div>

              {/* Distinção Chave & Referência */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-500 border-t border-slate-100">
                <div>
                  <strong className="text-slate-700">Norma Aplicável: </strong>
                  {question.officialAnswer.legalRef}
                </div>
                <div className="text-emerald-700 font-medium">
                  {question.officialAnswer.keyDistinction}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Seção de Resposta do Estudante & Correção por IA */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquareQuote className="w-5 h-5 text-emerald-600" />
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              Treine sua Resposta Escrita com a IA
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            {studentAnswer.trim().split(/\s+/).filter(Boolean).length} palavras
          </span>
        </div>

        <textarea
          value={studentAnswer}
          onChange={(e) => setStudentAnswer(e.target.value)}
          placeholder="Escreva a sua resposta com as suas palavras como faria na prova para o tutor avaliar..."
          rows={4}
          className="w-full p-4 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm text-slate-800 placeholder-slate-400 resize-y transition-all"
        />

        {/* Barra de Ações com IA e Classificação */}
        <div className="space-y-3 pt-1">
          {/* Botão Principal de Avaliação */}
          <button
            onClick={handleEvaluate}
            disabled={isEvaluating}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{isEvaluating ? "Avaliando com o Docente..." : "Avaliar Minha Resposta com IA"}</span>
          </button>

          {/* Ações Secundárias e Classificação */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-1 border-t border-slate-100">
            {/* Ações da IA: Tutor & Cenário */}
            <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center">
              <button
                onClick={handleOpenTutor}
                className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Explicar Conceito</span>
              </button>

              <button
                onClick={handleOpenScenario}
                className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Globe2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Caso Prático</span>
              </button>
            </div>

            {/* Botões de Autoavaliação / Repetição Espaçada */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-slate-400 mr-1 hidden sm:inline">Domínio:</span>
              <div className="grid grid-cols-3 gap-1.5 w-full sm:w-auto">
                <button
                  onClick={() => handleRateCard("hard")}
                  className={`py-1.5 px-3 rounded-lg border text-xs text-center transition-all ${
                    currentStatus === "hard" 
                      ? "bg-rose-100 text-rose-800 border-rose-300 font-bold" 
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-rose-50 hover:text-rose-700"
                  }`}
                >
                  Difícil
                </button>
                <button
                  onClick={() => handleRateCard("medium")}
                  className={`py-1.5 px-3 rounded-lg border text-xs text-center transition-all ${
                    currentStatus === "medium" 
                      ? "bg-amber-100 text-amber-800 border-amber-300 font-bold" 
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-amber-50 hover:text-amber-700"
                  }`}
                >
                  Médio
                </button>
                <button
                  onClick={() => handleRateCard("easy")}
                  className={`py-1.5 px-3 rounded-lg border text-xs text-center transition-all ${
                    currentStatus === "easy" 
                      ? "bg-emerald-100 text-emerald-800 border-emerald-300 font-bold" 
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-emerald-50 hover:text-emerald-700"
                  }`}
                >
                  Fácil
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Card de Resultado da Avaliação da IA */}
        {evaluationResult && (
          <div className="mt-5 p-5 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-4 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-200/60 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white font-black text-xl flex items-center justify-center shadow-inner">
                  {evaluationResult.score}%
                </div>
                <div>
                  <div className="text-xs text-slate-600 font-semibold">Nota Estimada no Exame</div>
                  <div className="text-lg font-bold text-slate-900">
                    {evaluationResult.grade20} <span className="text-xs font-normal text-slate-500">/ 20 valores</span>
                  </div>
                </div>
              </div>

              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white text-emerald-800 border border-emerald-200 self-start sm:self-auto">
                {evaluationResult.isAiAssisted ? "✨ Avaliado por Google Gemini" : "⚡ Motor de Avaliação Offline"}
              </span>
            </div>

            {/* Parecer do Professor */}
            <div className="text-xs sm:text-sm text-slate-800 leading-relaxed bg-white p-4 rounded-xl border border-emerald-100 shadow-inner">
              <strong className="text-emerald-900 block font-bold mb-1">
                Parecer do Professor:
              </strong>
              {evaluationResult.feedback}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-white border border-emerald-100 space-y-1.5">
                <div className="font-bold text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Pontos Fortes da Sua Resposta:</span>
                </div>
                <ul className="list-disc list-inside text-slate-700 space-y-1 pl-1">
                  {evaluationResult.strengths.map((str, i) => (
                    <li key={i}>{str}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-lg bg-white border border-amber-200 space-y-1.5">
                <div className="font-bold text-amber-800 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Lacunas / Aprofundamento Necessário:</span>
                </div>
                <ul className="list-disc list-inside text-slate-700 space-y-1 pl-1">
                  {evaluationResult.missingPoints.map((mis, i) => (
                    <li key={i}>{mis}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Modal de Explicação com Tutor IA */}
      {tutorModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-4 max-h-[85vh] overflow-y-auto shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                <Lightbulb className="w-5 h-5 text-amber-600" />
                <span>Explicação Aprofundada do Tutor IA</span>
              </div>
              <button 
                onClick={() => setTutorModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isLoadingTutor ? (
              <div className="py-12 text-center text-slate-500 space-y-3">
                <Sparkles className="w-8 h-8 text-emerald-600 animate-spin mx-auto" />
                <p className="text-sm font-semibold">O Tutor IA está elaborando uma aula personalizada...</p>
              </div>
            ) : (
              <div className="text-xs sm:text-sm text-slate-700 space-y-3 whitespace-pre-line leading-relaxed">
                {tutorContent?.explanation}
              </div>
            )}

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setTutorModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800"
              >
                Entendi, voltar ao estudo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Novo Cenário Prático */}
      {scenarioModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-4 max-h-[85vh] overflow-y-auto shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                <Globe2 className="w-5 h-5 text-blue-600" />
                <span>Estudo de Caso Prático em Moçambique</span>
              </div>
              <button 
                onClick={() => setScenarioModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isLoadingScenario ? (
              <div className="py-12 text-center text-slate-500 space-y-3">
                <Globe2 className="w-8 h-8 text-blue-600 animate-spin mx-auto" />
                <p className="text-sm font-semibold">Gerando cenário de engenharia e ambiente...</p>
              </div>
            ) : scenarioContent ? (
              <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="p-3 rounded-xl bg-blue-50 border border-blue-100">
                  <div className="font-bold text-blue-900 text-sm">{scenarioContent.scenarioTitle}</div>
                  <div className="text-xs text-blue-700 mt-0.5">Local: {scenarioContent.location}</div>
                </div>

                <div className="space-y-1">
                  <strong className="text-slate-900 block">Contexto do Empreendimento:</strong>
                  <p className="leading-relaxed">{scenarioContent.scenarioDescription}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 space-y-1">
                  <strong className="text-amber-900 block font-bold">Desafio para o Exame:</strong>
                  <p className="leading-relaxed font-semibold text-amber-950">{scenarioContent.challengeQuestion}</p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <strong className="text-slate-900 block">Solução e Enquadramento Técnico:</strong>
                  <p className="leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200">{scenarioContent.modelSolution}</p>
                </div>
              </div>
            ) : null}

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setScenarioModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800"
              >
                Fechar Cenário
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
