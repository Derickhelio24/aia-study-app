import React, { useState, useEffect } from "react";
import { 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  Award, 
  RotateCcw, 
  Sparkles, 
  Send,
  FileCheck,
  Flame
} from "lucide-react";
import confetti from "canvas-confetti";
import { QUESTIONS } from "../data/questionsData";
import { evaluateStudentAnswer } from "../services/geminiService";

export default function ExamMode({ questionsList = QUESTIONS, onFinishExam, onExitExam, apiKey }) {
  // Configuração do Exame
  const [examStarted, setExamStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState(25 * 60); // 25 minutos
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [examResult, setExamResult] = useState(null);

  // Contador de Tempo
  useEffect(() => {
    if (!examStarted || examResult) return;

    const timer = setInterval(() => {
      setTimeRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [examStarted, examResult]);

  const currentQuestion = questionsList[currentIndex] || questionsList[0];

  // Formatação de minutos e segundos
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswerChange = (text) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: text,
    }));
  };

  // Submissão e Avaliação Completa
  const handleSubmitExam = async () => {
    setIsSubmitting(true);
    const evaluatedQuestions = [];
    let totalScoreSum = 0;

    for (const q of questionsList) {
      const studentAns = answers[q.id] || "";
      const evalRes = await evaluateStudentAnswer(q, studentAns, apiKey);
      evaluatedQuestions.push({
        questionId: q.id,
        question: q.question,
        studentAnswer: studentAns,
        evaluation: evalRes,
      });
      totalScoreSum += evalRes.score;
    }

    const avgScore = Math.round(totalScoreSum / (questionsList.length || 1));
    const grade20 = Number(((avgScore / 100) * 20).toFixed(1));

    const result = {
      score: avgScore,
      grade20: grade20,
      totalQuestions: questionsList.length,
      evaluatedQuestions,
      timeSpentSeconds: 25 * 60 - timeRemainingSeconds,
      date: new Date().toISOString(),
    };

    setExamResult(result);
    setIsSubmitting(false);
    onFinishExam(result);

    if (grade20 >= 14) {
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    }
  };

  // Tela Inicial Pré-Exame
  if (!examStarted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 space-y-6">
        <div className="bg-white rounded-2xl border border-slate-200/90 p-8 shadow-md text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 mx-auto">
            <Clock className="w-8 h-8 text-amber-500" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900">
              Simulado Cronometrado: Teste 1 de AIA
            </h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Você responderá às <strong>9 questões completas</strong> do teste oficial sob um cronômetro regressivo de <strong>25 minutos</strong>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs text-slate-700 space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>Instruções do Simulado Acadêmico:</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
              <li>Cada resposta deve conter a explicação técnica e menção às leis moçambicanas.</li>
              <li>Você pode navegar livremente entre as 9 questões antes de submeter.</li>
              <li>A IA corrigirá todas as questões e emitirá a sua nota final em escala de 0 a 20 valores.</li>
            </ul>
          </div>

          <div className="flex items-center justify-center gap-3 pt-4">
            <button
              onClick={onExitExam}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50"
            >
              Voltar ao Início
            </button>
            <button
              onClick={() => setExamStarted(true)}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md shadow-amber-500/20"
            >
              Começar a Prova Agora
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Tela de Carregamento da Correção da Prova
  if (isSubmitting) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4">
        <Sparkles className="w-12 h-12 text-emerald-600 animate-spin mx-auto" />
        <h3 className="text-lg font-bold text-slate-900">
          Corrigindo Simulado com Padrão Acadêmico...
        </h3>
        <p className="text-xs text-slate-500">
          O examinador está analisando as suas 9 respostas conforme o Decreto nº 54/2015 e calculando sua nota.
        </p>
      </div>
    );
  }

  // Tela de Resultados Finais do Exame
  if (examResult) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        
        {/* Banner do Resultado */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Relatório Final do Exame
            </span>
            <h2 className="text-2xl sm:text-3xl font-black">
              Resultado: {examResult.grade20 >= 10 ? "Aprovado no Simulado! 🎉" : "Precisa de Mais Treino 📚"}
            </h2>
            <p className="text-xs text-slate-400">
              Tempo utilizado: {formatTime(examResult.timeSpentSeconds)} de 25:00 min
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-800/90 p-5 rounded-2xl border border-slate-700">
            <div className="text-center">
              <div className="text-3xl font-black text-emerald-400">
                {examResult.grade20}
              </div>
              <div className="text-[11px] text-slate-400 font-semibold uppercase">
                / 20 valores
              </div>
            </div>
            <div className="h-10 w-px bg-slate-700" />
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {examResult.score}%
              </div>
              <div className="text-[11px] text-slate-400 font-semibold uppercase">
                Aproveitamento
              </div>
            </div>
          </div>
        </div>

        {/* Detalhamento Questão por Questão */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900">
            Correção Detalhada das 9 Questões:
          </h3>

          <div className="space-y-3">
            {examResult.evaluatedQuestions.map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-slate-200 p-5 space-y-3 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase">
                      Questão {idx + 1}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm">
                      {item.question}
                    </h4>
                  </div>
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                    item.evaluation.grade20 >= 14 
                      ? "bg-emerald-100 text-emerald-800"
                      : item.evaluation.grade20 >= 10
                      ? "bg-amber-100 text-amber-800"
                      : "bg-rose-100 text-rose-800"
                  }`}>
                    {item.evaluation.grade20} / 20 val
                  </span>
                </div>

                <div className="text-xs bg-slate-50 p-3 rounded-lg border border-slate-100 text-slate-700">
                  <strong className="block text-slate-800 mb-0.5">Sua Resposta:</strong>
                  {item.studentAnswer || <em className="text-slate-400">Não respondida</em>}
                </div>

                <div className="text-xs text-slate-600 bg-emerald-50/50 p-3 rounded-lg border border-emerald-100 leading-relaxed">
                  <strong className="block text-emerald-900 mb-0.5">Parecer da Correção:</strong>
                  {item.evaluation.feedback}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Botão de Concluir / Voltar */}
        <div className="flex justify-center gap-4 pt-4">
          <button
            onClick={() => {
              setExamStarted(false);
              setExamResult(null);
              setAnswers({});
            }}
            className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs sm:text-sm hover:bg-slate-50 flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Refazer Simulado</span>
          </button>

          <button
            onClick={onExitExam}
            className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs sm:text-sm hover:bg-slate-800"
          >
            Voltar ao Dashboard
          </button>
        </div>

      </div>
    );
  }

  // Prova em Andamento
  const isTimeLow = timeRemainingSeconds < 300; // menos de 5 min

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      
      {/* Topbar do Exame com Cronômetro */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900 text-white border border-slate-800 shadow-md">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
            Simulado em Andamento
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-xs text-slate-300">
            Questão {currentIndex + 1} de {questionsList.length}
          </span>
        </div>

        {/* Cronômetro */}
        <div className={`flex items-center gap-2 px-3 py-1 rounded-lg font-mono text-sm font-bold border ${
          isTimeLow 
            ? "bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse" 
            : "bg-slate-800 text-emerald-300 border-slate-700"
        }`}>
          <Clock className="w-4 h-4" />
          <span>{formatTime(timeRemainingSeconds)}</span>
        </div>
      </div>

      {/* Grade de Navegação Rápida entre Questões */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {questionsList.map((q, idx) => {
          const hasAnswer = Boolean(answers[q.id]?.trim());
          const isCurrent = idx === currentIndex;

          return (
            <button
              key={q.id}
              onClick={() => setCurrentIndex(idx)}
              className={`w-9 h-9 rounded-lg text-xs font-bold transition-all shrink-0 ${
                isCurrent
                  ? "bg-amber-500 text-slate-950 shadow"
                  : hasAnswer
                  ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                  : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              Q{idx + 1}
            </button>
          );
        })}
      </div>

      {/* Cartão da Pergunta */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-700 uppercase">
              {currentQuestion.moduleTitle}
            </span>
            <span className="text-xs text-slate-400">
              {currentQuestion.officialAnswer.legalRef.split(" e ")[0]}
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
            {currentQuestion.question}
          </h3>

          <p className="text-xs text-slate-500">
            {currentQuestion.contextPrompt}
          </p>
        </div>

        {/* Campo de Resposta */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700">
            Sua Resposta Completa:
          </label>
          <textarea
            value={answers[currentQuestion.id] || ""}
            onChange={(e) => handleAnswerChange(e.target.value)}
            rows={6}
            placeholder="Desenvolva os conceitos, mitigações e normas de Moçambique..."
            className="w-full p-4 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-sm text-slate-800 placeholder-slate-400"
          />
        </div>

        {/* Navegação e Submissão */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <button
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((prev) => prev - 1)}
            className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 disabled:opacity-40"
          >
            ← Anterior
          </button>

          {currentIndex < questionsList.length - 1 ? (
            <button
              onClick={() => setCurrentIndex((prev) => prev + 1)}
              className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5"
            >
              <span>Próxima</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmitExam}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black shadow-md flex items-center gap-1.5"
            >
              <Send className="w-4 h-4" />
              <span>Finalizar & Corrigir Simulado</span>
            </button>
          )}
        </div>
      </div>

    </div>
  );
}
