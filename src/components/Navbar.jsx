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
                A Politécnica • Eng. Elétrica • Prof. Joel Jorge Malope
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

          {/* Navegação Desktop (Oculta no Mobile) */}
          <div className="hidden md:flex items-center gap-2">
            
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
              <span>Módulos</span>
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
              <span>Flashcards</span>
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
              <span>Ficha PDF</span>
            </button>

          </div>

          {/* Botão Chave Gemini / Status da IA (Visível em Desktop e Mobile) */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenApiKeyModal}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all border shrink-0 ${
                hasApiKey 
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20"
                  : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 text-amber-300"
              }`}
              title={hasApiKey ? "IA Gemini Ativa (Clique para gerenciar)" : "Configurar Chave Gemini ou Modo Offline"}
            >
              <Key className="w-3.5 h-3.5" />
              <span className="text-[11px] font-semibold">
                {hasApiKey ? "IA Conectada" : "Chave IA"}
              </span>
              <span className={`w-2 h-2 rounded-full shrink-0 ${hasApiKey ? "bg-emerald-400 animate-pulse" : "bg-amber-400"}`} />
            </button>
          </div>

        </div>
      </div>

      {/* Barra Inferior Fixa para Mobile (Estilo App Nativa) */}
      <nav aria-label="Navegação móvel" className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 px-2 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.4)] no-print">
        <div className="grid grid-cols-4 gap-1 max-w-md mx-auto">
          
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
              activeTab === "dashboard"
                ? "text-emerald-400 bg-emerald-500/10 font-bold"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Layers className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">Módulos</span>
          </button>

          <button
            onClick={() => setActiveTab("study")}
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
              activeTab === "study"
                ? "text-emerald-400 bg-emerald-500/10 font-bold"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <BookOpen className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">Flashcards</span>
          </button>

          <button
            onClick={() => setActiveTab("exam")}
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
              activeTab === "exam"
                ? "text-amber-400 bg-amber-500/10 font-bold"
                : "text-slate-400 hover:text-amber-400"
            }`}
          >
            <Clock className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">Simulado</span>
          </button>

          <button
            onClick={() => setActiveTab("print")}
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
              activeTab === "print"
                ? "text-emerald-400 bg-emerald-500/10 font-bold"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Printer className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">Ficha PDF</span>
          </button>

        </div>
      </nav>
    </header>
  );
}
