import React from "react";
import { 
  Sparkles, 
  Flame, 
  Clock, 
  Printer, 
  Key, 
  Layers, 
  BookOpen, 
  CheckCircle2, 
  HelpCircle 
} from "lucide-react";

export default function Navbar({
  activeTab,
  setActiveTab,
  stats,
  streak,
  onOpenApiKeyModal,
  hasApiKey,
}) {
  const masteryPercentage = Math.round((stats.masteredCount / (stats.totalCount || 1)) * 100);

  return (
    <header className="bg-slate-900 text-white sticky top-0 z-40 border-b border-slate-800 shadow-md no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Subtítulo */}
          <div 
            onClick={() => setActiveTab("dashboard")}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform shadow-inner">
              <Sparkles className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                  AIA Moçambique
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  EcoTech AI
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Preparação p/ Teste 1 • Decreto 54/2015 & Lei 20/97
              </p>
            </div>
          </div>

          {/* Progresso & Streak no Centro */}
          <div className="hidden md:flex items-center gap-6 bg-slate-800/80 px-4 py-1.5 rounded-full border border-slate-700/60">
            {/* Barra de Progresso */}
            <div className="flex items-center gap-2.5">
              <div className="text-xs text-slate-300 font-medium">
                Domínio: <span className="text-emerald-400 font-bold">{masteryPercentage}%</span>
              </div>
              <div className="w-24 bg-slate-700 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${masteryPercentage}%` }}
                />
              </div>
              <span className="text-[11px] text-slate-400">
                ({stats.masteredCount}/{stats.totalCount})
              </span>
            </div>

            {/* Divisor */}
            <div className="h-4 w-px bg-slate-700" />

            {/* Streak */}
            <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold" title="Dias seguidos de estudo">
              <Flame className="w-4 h-4 fill-amber-400 text-amber-400 animate-pulse" />
              <span>{streak.count} {streak.count === 1 ? "dia" : "dias"}</span>
            </div>
          </div>

          {/* Navegação e Ações */}
          <div className="flex items-center gap-2">
            
            {/* Botão Módulos */}
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === "dashboard"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span className="hidden sm:inline">Módulos</span>
            </button>

            {/* Botão Flashcards */}
            <button
              onClick={() => setActiveTab("study")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === "study"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Flashcards</span>
            </button>

            {/* Botão Modo Exame */}
            <button
              onClick={() => setActiveTab("exam")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === "exam"
                  ? "bg-amber-600 text-white shadow-sm ring-2 ring-amber-400/30"
                  : "text-slate-300 hover:bg-slate-800 hover:text-amber-400"
              }`}
              title="Simulado cronometrado estilo exame real"
            >
              <Clock className="w-4 h-4" />
              <span>Simulado</span>
            </button>

            {/* Botão Ficha de Revisão (Print/PDF) */}
            <button
              onClick={() => setActiveTab("print")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === "print"
                  ? "bg-slate-700 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
              title="Guia completo para imprimir ou estudar offline"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden lg:inline">Ficha PDF</span>
            </button>

            {/* Botão Chave Gemini */}
            <button
              onClick={onOpenApiKeyModal}
              className={`p-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all border ${
                hasApiKey 
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20"
                  : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 text-amber-300"
              }`}
              title={hasApiKey ? "IA Gemini Ativa (Clique para gerenciar)" : "Configurar Chave Gemini ou Modo Offline"}
            >
              <Key className="w-4 h-4" />
              <span className="hidden xl:inline">
                {hasApiKey ? "IA Conectada" : "Chave IA"}
              </span>
              <span className={`w-2 h-2 rounded-full ${hasApiKey ? "bg-emerald-400 animate-pulse" : "bg-amber-400"}`} />
            </button>

          </div>
        </div>
      </div>
    </header>
  );
}
