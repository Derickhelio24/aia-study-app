import React from "react";
import { 
  CheckCircle2, 
  Clock, 
  Award, 
  AlertCircle, 
  FileText, 
  Zap, 
  ShieldAlert, 
  SunMedium, 
  Scale, 
  Users, 
  Compass,
  BookCheck,
  ChevronRight,
  Sparkles,
  Filter
} from "lucide-react";
import { MODULES } from "../data/questionsData";

export default function Dashboard({ 
  questionsList,
  allQuestions,
  questionFilter,
  setQuestionFilter,
  onGenerateBrandNew,
  isGeneratingQuestion,
  progress, 
  stats, 
  onSelectQuestion, 
  onStartExam, 
  onOpenPrint 
}) {
  const moduleIcons = {
    "mod-1": <Compass className="w-5 h-5 text-emerald-600" />,
    "mod-2": <Scale className="w-5 h-5 text-blue-600" />,
    "mod-3": <Users className="w-5 h-5 text-amber-600" />,
    "mod-4": <Zap className="w-5 h-5 text-purple-600" />,
    "mod-5": <ShieldAlert className="w-5 h-5 text-rose-600" />,
    "mod-6": <SunMedium className="w-5 h-5 text-teal-600" />,
  };

  const masteryPercentage = Math.round((stats.masteredCount / (stats.totalCount || 1)) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Banner Principal EcoTech */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 text-white p-6 sm:p-8 border border-emerald-800/40 shadow-xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
              <BookCheck className="w-3.5 h-3.5" />
              <span>Programa Oficial & Banco Expandido com IA • 2026</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Preparação Intensiva: Teste 1 de AIA
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              Estude as <strong className="text-emerald-300 font-semibold">9 questões oficiais do docente</strong> ou explore questões complementares e cenários inéditos gerados pela IA sobre a 
              <strong className="text-emerald-300 font-semibold"> Lei nº 20/97</strong> e o 
              <strong className="text-emerald-300 font-semibold"> Decreto nº 54/2015</strong>.
            </p>
          </div>

          {/* Botões de Ação Imediata */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onStartExam}
              className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Clock className="w-4 h-4" />
              <span>Iniciar Simulado</span>
            </button>

            <button
              onClick={onOpenPrint}
              className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm flex items-center gap-2 transition-all hover:text-white"
            >
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Ficha Completa (PDF)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Barra de Filtro de Perguntas & Gerador de Questão Inédita */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-bold text-slate-700 mr-2">Modo de Estudo:</span>
          
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setQuestionFilter("official")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                questionFilter === "official"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              📌 As 9 do Docente
            </button>
            <button
              onClick={() => setQuestionFilter("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                questionFilter === "all"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              🚀 Todas ({allQuestions.length})
            </button>
            <button
              onClick={() => setQuestionFilter("bonus")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                questionFilter === "bonus"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              💡 Extras / Pegadinhas
            </button>
          </div>
        </div>

        {/* Botão de Gerar Questão Inédita com IA */}
        <button
          onClick={onGenerateBrandNew}
          disabled={isGeneratingQuestion}
          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all hover:scale-[1.02] disabled:opacity-50"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
          <span>{isGeneratingQuestion ? "Criando pergunta com IA..." : "+ Gerar Nova Pergunta Inédita com IA"}</span>
        </button>
      </div>

      {/* Grade de Estatísticas Rápidas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Domínio Geral */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 font-black text-lg">
            {masteryPercentage}%
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Domínio Global</div>
            <div className="text-base font-bold text-slate-900">
              {stats.masteredCount} de {stats.totalCount} cards
            </div>
          </div>
        </div>

        {/* Card 2: Em Treino / Revisão */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 font-bold">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Precisam Atenção</div>
            <div className="text-base font-bold text-slate-900">
              {stats.needsReviewCount} {stats.needsReviewCount === 1 ? "questão" : "questões"}
            </div>
          </div>
        </div>

        {/* Card 3: Média em Valores */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Nota Média Estimada</div>
            <div className="text-base font-bold text-slate-900">
              {stats.averageGrade20 > 0 ? `${stats.averageGrade20} / 20 val` : "Ainda sem notas"}
            </div>
          </div>
        </div>

        {/* Card 4: Total de Avaliações */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 font-bold">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Avaliações Realizadas</div>
            <div className="text-base font-bold text-slate-900">
              {stats.totalEvaluations} respostas
            </div>
          </div>
        </div>

      </div>

      {/* Conteúdo Principal: Módulos e Painel Lateral de Legislação */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Coluna Esquerda: 6 Módulos Temáticos (2 Colunas) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span>Módulos de Estudo</span>
              <span className="text-xs font-normal text-slate-500">
                ({questionsList.length} questões exibidas no filtro atual)
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MODULES.map((mod) => {
              const moduleQuestions = questionsList.filter((q) => q.moduleId === mod.id);
              if (moduleQuestions.length === 0) return null;

              const masteredInModule = moduleQuestions.filter(
                (q) => progress[q.id]?.status === "easy"
              ).length;
              const modulePercentage = Math.round(
                (masteredInModule / (moduleQuestions.length || 1)) * 100
              );

              return (
                <div
                  key={mod.id}
                  className="bg-white rounded-xl border border-slate-200/90 hover:border-emerald-500/60 p-5 transition-all shadow-sm hover:shadow-md flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="p-2.5 rounded-lg bg-slate-100 group-hover:bg-emerald-50 transition-colors">
                        {moduleIcons[mod.id]}
                      </div>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                        {mod.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900 text-sm group-hover:text-emerald-700 transition-colors">
                        {mod.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                        {mod.description}
                      </p>
                    </div>

                    {/* Barra de Progresso do Módulo */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                        <span>Progresso</span>
                        <span className="text-slate-900 font-bold">{modulePercentage}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-emerald-500 h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${modulePercentage}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Questões no Módulo */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">
                      {moduleQuestions.length} {moduleQuestions.length === 1 ? "questão" : "questões"}
                    </span>

                    <button
                      onClick={() => onSelectQuestion(moduleQuestions[0].id)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline"
                    >
                      <span>Estudar agora</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Coluna Direita: Sidebar com Legislação e Categorias MTA */}
        <div className="space-y-6">
          
          {/* Caixa de Referência Rápida: Categorias do Decreto 54/2015 */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm border-b border-slate-100 pb-3">
              <Scale className="w-4 h-4 text-emerald-600" />
              <span>Categorias do Decreto 54/2015 (Moçambique)</span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 rounded-lg bg-red-50/80 border border-red-100 text-red-950">
                <strong className="text-red-700 font-bold block mb-0.5">Categoria A+ (Especial)</strong>
                Impactos graves, irreversíveis e de magnitude excepcional. Requer revisores independentes internacionais e especialistas sêniores.
              </div>

              <div className="p-2.5 rounded-lg bg-amber-50/80 border border-amber-100 text-amber-950">
                <strong className="text-amber-700 font-bold block mb-0.5">Categoria A (EIA Completo)</strong>
                Impactos significativos sobre ecossistemas e humanos. Exige EPDA, Termos de Referência (TdR), REIA e Consulta Pública formal.
              </div>

              <div className="p-2.5 rounded-lg bg-blue-50/80 border border-blue-100 text-blue-950">
                <strong className="text-blue-700 font-bold block mb-0.5">Categoria B (Simplificado)</strong>
                Impactos menores e localizados. Exige Estudo Ambiental Simplificado (EAS) e PGA sob tutela provincial.
              </div>

              <div className="p-2.5 rounded-lg bg-emerald-50/80 border border-emerald-100 text-emerald-950">
                <strong className="text-emerald-700 font-bold block mb-0.5">Categoria C (Isento)</strong>
                Impactos insignificantes. Isento de estudos formais, sujeito apenas a Diretivas de Boas Práticas Ambientais.
              </div>
            </div>
          </div>

          {/* Atalho para lista de questões filtradas */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-sm">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-2">
              <span>Navegação Rápida:</span>
              <span className="text-[10px] text-slate-400 font-normal">
                {questionFilter === "official" ? "Mostrando apenas as 9 do docente" : "Mostrando todas"}
              </span>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5">
              {questionsList.map((q) => {
                const qStatus = progress[q.id]?.status;
                let bgClass = "bg-slate-100 text-slate-700 hover:bg-slate-200";
                if (qStatus === "easy") bgClass = "bg-emerald-100 text-emerald-800 font-bold";
                else if (qStatus === "medium") bgClass = "bg-amber-100 text-amber-800 font-bold";
                else if (qStatus === "hard") bgClass = "bg-rose-100 text-rose-800 font-bold";

                return (
                  <button
                    key={q.id}
                    onClick={() => onSelectQuestion(q.id)}
                    className={`p-2 rounded-lg text-xs text-center transition-all ${bgClass} relative`}
                    title={`${q.title} (${q.isOfficialDoc ? "Oficial do Docente" : "Questão Extra / IA"})`}
                  >
                    <span>Q.{q.id}</span>
                    {q.isOfficialDoc && (
                      <span className="absolute top-0.5 right-1 w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
