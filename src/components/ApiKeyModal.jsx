import React, { useState } from "react";
import { Key, Sparkles, Check, X, ShieldCheck, ExternalLink } from "lucide-react";

export default function ApiKeyModal({ isOpen, onClose, currentKey, onSaveKey }) {
  const [inputValue, setInputValue] = useState(currentKey || "");
  const [savedSuccess, setSavedSuccess] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setInputValue(currentKey || "");
    }
  }, [isOpen, currentKey]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveKey(inputValue.trim());
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleClear = () => {
    setInputValue("");
    onSaveKey("");
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 no-print">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Cabeçalho */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Key className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                Configuração da IA Gemini
              </h3>
              <p className="text-[11px] text-slate-400">
                Correção de respostas com IA em tempo real
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Informação sobre Modo Híbrido */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5 leading-relaxed">
          <div className="flex items-center gap-1.5 font-bold text-slate-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Modo Híbrido Flexível</span>
          </div>
          <p>
            A plataforma inclui um <strong>motor de avaliação offline nativo</strong> com todas as 9 questões gabaritadas segundo a Lei 20/97 e o Decreto 54/2015.
          </p>
          <p>
            Adicionar a sua chave do Gemini desbloqueia pareceres personalizados avançados e geração dinâmica de cenários práticos.
          </p>
        </div>

        {/* Campo de Input */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700">
            Sua Chave de API Google Gemini:
          </label>
          <input
            type="password"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="AIzaSy..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-xs text-slate-800 placeholder-slate-400 font-mono"
          />
          <div className="flex justify-between items-center text-[11px] pt-1">
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noreferrer"
              className="text-emerald-700 hover:text-emerald-800 hover:underline flex items-center gap-1"
            >
              <span>Obter chave gratuita no Google AI Studio</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            {inputValue && (
              <button
                onClick={handleClear}
                className="text-rose-600 hover:text-rose-700 hover:underline"
              >
                Limpar chave
              </button>
            )}
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="pt-2 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
          >
            {savedSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Salvo com sucesso!</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Salvar Configuração</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
