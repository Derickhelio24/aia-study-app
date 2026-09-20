import React, { useState, useEffect, useMemo } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import FlashcardStudy from "./components/FlashcardStudy";
import ExamMode from "./components/ExamMode";
import PrintSheet from "./components/PrintSheet";
import ApiKeyModal from "./components/ApiKeyModal";
import { QUESTIONS } from "./data/questionsData";
import { 
  getProgress, 
  saveQuestionStatus, 
  getStreak, 
  getStoredApiKey, 
  saveStoredApiKey,
  saveExamResult 
} from "./services/storageService";
import { generateBrandNewQuestion } from "./services/geminiService";

const STORAGE_CUSTOM_QUESTIONS = "aia_custom_generated_questions_v1";

export default function App() {
  // Navegação
  const [activeTab, setActiveTab] = useState("dashboard"); // 'dashboard' | 'study' | 'exam' | 'print'
  const [selectedQuestionId, setSelectedQuestionId] = useState(1);
  const [questionFilter, setQuestionFilter] = useState("all"); // 'all' | 'official' | 'bonus'

  // Perguntas dinâmicas (Base oficial + Extras geradas por IA)
  const [questionsList, setQuestionsList] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CUSTOM_QUESTIONS);
      const custom = saved ? JSON.parse(saved) : [];
      return [...QUESTIONS, ...custom];
    } catch (e) {
      return QUESTIONS;
    }
  });

  // Estados persistentes
  const [progress, setProgress] = useState(() => getProgress());
  const [streak, setStreak] = useState(() => getStreak());
  const [apiKey, setApiKey] = useState(() => getStoredApiKey());
  const [apiKeyModalOpen, setApiKeyModalOpen] = useState(false);
  const [isGeneratingQuestion, setIsGeneratingQuestion] = useState(false);

  // Recarregar progresso ao montar
  useEffect(() => {
    setProgress(getProgress());
    setStreak(getStreak());
    setApiKey(getStoredApiKey());
  }, []);

  // Lista filtrada de questões
  const filteredQuestions = useMemo(() => {
    if (questionFilter === "official") {
      return questionsList.filter((q) => q.isOfficialDoc);
    }
    if (questionFilter === "bonus") {
      return questionsList.filter((q) => !q.isOfficialDoc);
    }
    return questionsList;
  }, [questionsList, questionFilter]);

  // Estatísticas calculadas
  const stats = useMemo(() => {
    const totalCount = filteredQuestions.length;
    let masteredCount = 0;
    let needsReviewCount = 0;
    let totalEvaluations = 0;
    let scoreSum = 0;
    let scoredCount = 0;

    filteredQuestions.forEach((q) => {
      const p = progress[q.id];
      if (p) {
        if (p.status === "easy") masteredCount += 1;
        if (p.status === "hard" || p.status === "medium") needsReviewCount += 1;
        if (p.reviewsCount) totalEvaluations += p.reviewsCount;
        if (p.lastScore !== undefined && p.lastScore !== null) {
          scoreSum += p.lastScore;
          scoredCount += 1;
        }
      }
    });

    const avgScore = scoredCount > 0 ? Math.round(scoreSum / scoredCount) : 0;
    const avgGrade20 = Number(((avgScore / 100) * 20).toFixed(1));

    return {
      totalCount,
      masteredCount,
      needsReviewCount,
      totalEvaluations,
      averageGrade20: avgGrade20,
    };
  }, [filteredQuestions, progress]);

  // Atualizar status de questão
  const handleUpdateStatus = (questionId, status, score = null) => {
    const updated = saveQuestionStatus(questionId, status, score);
    if (updated) {
      setProgress({ ...updated });
      setStreak(getStreak());
    }
  };

  // Gerador de Nova Pergunta Inédita com IA
  const handleGenerateBrandNew = async () => {
    setIsGeneratingQuestion(true);
    try {
      const nextId = questionsList.length + 1;
      const newQ = await generateBrandNewQuestion(nextId, "Setor Elétrico e Normas de Moçambique", apiKey);
      
      const updatedList = [...questionsList, newQ];
      setQuestionsList(updatedList);

      // Salvar apenas as questões customizadas no localStorage
      const customOnly = updatedList.slice(QUESTIONS.length);
      localStorage.setItem(STORAGE_CUSTOM_QUESTIONS, JSON.stringify(customOnly));

      // Ir direto para a nova questão
      setSelectedQuestionId(newQ.id);
      setActiveTab("study");
    } catch (e) {
      console.error(e);
      alert("Erro ao gerar nova questão. Tente novamente.");
    } finally {
      setIsGeneratingQuestion(false);
    }
  };

  // Salvar Chave Gemini
  const handleSaveApiKey = (newKey) => {
    saveStoredApiKey(newKey);
    setApiKey(newKey);
  };

  // Selecionar questão e ir para o modo estudo
  const handleSelectQuestion = (id) => {
    setSelectedQuestionId(id);
    setActiveTab("study");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Concluir simulado
  const handleFinishExam = (result) => {
    saveExamResult(result);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      
      {/* Barra de Navegação Superior */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        stats={stats}
        streak={streak}
        onOpenApiKeyModal={() => setApiKeyModalOpen(true)}
        hasApiKey={Boolean(apiKey && apiKey.trim().length > 10)}
      />

      {/* Conteúdo Principal Dinâmico */}
      <main className="flex-1 pb-16">
        {activeTab === "dashboard" && (
          <Dashboard
            questionsList={filteredQuestions}
            allQuestions={questionsList}
            questionFilter={questionFilter}
            setQuestionFilter={setQuestionFilter}
            onGenerateBrandNew={handleGenerateBrandNew}
            isGeneratingQuestion={isGeneratingQuestion}
            progress={progress}
            stats={stats}
            onSelectQuestion={handleSelectQuestion}
            onStartExam={() => setActiveTab("exam")}
            onOpenPrint={() => setActiveTab("print")}
          />
        )}

        {activeTab === "study" && (
          <FlashcardStudy
            questionsList={filteredQuestions}
            selectedQuestionId={selectedQuestionId}
            onSelectQuestion={(id) => setSelectedQuestionId(id)}
            onBackToDashboard={() => setActiveTab("dashboard")}
            questionFilter={questionFilter}
            setQuestionFilter={setQuestionFilter}
            onGenerateBrandNew={handleGenerateBrandNew}
            isGeneratingQuestion={isGeneratingQuestion}
            progress={progress}
            onUpdateStatus={handleUpdateStatus}
            apiKey={apiKey}
          />
        )}

        {activeTab === "exam" && (
          <ExamMode
            questionsList={filteredQuestions}
            onFinishExam={handleFinishExam}
            onExitExam={() => setActiveTab("dashboard")}
            apiKey={apiKey}
          />
        )}

        {activeTab === "print" && (
          <PrintSheet 
            questionsList={filteredQuestions}
            onBack={() => setActiveTab("dashboard")} 
          />
        )}
      </main>

      {/* Modal de Chave Gemini */}
      <ApiKeyModal
        isOpen={apiKeyModalOpen}
        onClose={() => setApiKeyModalOpen(false)}
        currentKey={apiKey}
        onSaveKey={handleSaveApiKey}
      />

      {/* Rodapé Elegante */}
      <footer className="bg-slate-950 text-slate-400 py-6 border-t border-slate-800 text-center text-xs no-print">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 AIA Moçambique EcoTech AI • Preparação Universitária Intensiva</p>
          <p className="text-slate-500">
            Conforme a Lei nº 20/97 e o Regulamento do Processo de AIA (Decreto nº 54/2015)
          </p>
        </div>
      </footer>

    </div>
  );
}
