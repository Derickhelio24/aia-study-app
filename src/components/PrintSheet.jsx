import React from "react";
import { Printer, ArrowLeft, Copy, Check, BookOpen, Scale, FileText } from "lucide-react";
import { QUESTIONS, TECHNICAL_GLOSSARY } from "../data/questionsData";

export default function PrintSheet({ onBack }) {
  const [copied, setCopied] = React.useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyAll = () => {
    const text = QUESTIONS.map((q, idx) => `
QUESTÃO ${idx + 1}: ${q.question}
[Enquadramento Legal]: ${q.officialAnswer.legalRef}
[Síntese]: ${q.officialAnswer.summary}
${q.officialAnswer.sections.map(s => `${s.heading}:\n${s.content}`).join("\n\n")}
--------------------------------------------------
    `).join("\n");

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      
      {/* Barra de Ações (Oculta na Impressão) */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900 text-white shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Voltar ao Dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-sm font-bold text-white">
              Guia Oficial de Revisão Pré-Exame
            </h2>
            <p className="text-xs text-slate-400">
              Formatado para leitura rápida ou impressão direta em PDF (A4)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyAll}
            className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? "Copiado!" : "Copiar Texto"}</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir / Salvar PDF</span>
          </button>
        </div>
      </div>

      {/* Conteúdo do Documento de Estudo / Folha de Prova */}
      <div className="bg-white rounded-2xl border border-slate-300 p-8 sm:p-12 shadow-sm space-y-8 text-slate-900 leading-relaxed font-sans">
        
        {/* Cabeçalho Acadêmico */}
        <div className="border-b-2 border-slate-900 pb-6 text-center space-y-2">
          <div className="text-xs uppercase tracking-widest font-black text-emerald-800">
            República de Moçambique • Ensino Superior de Engenharia & Ciências Ambientais
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
            Ficha de Revisão: Teste 1 de Avaliação de Impacto Ambiental (AIA)
          </h1>
          <p className="text-xs text-slate-600 max-w-xl mx-auto">
            Fundamentação Teórica e Normativa: Lei do Ambiente (Lei nº 20/97), Regulamento de AIA (Decreto nº 54/2015), Reassentamento (Decreto nº 31/2012) e Resíduos Perigosos (Decreto nº 83/2014).
          </p>
        </div>

        {/* Quadro Rápido de Categorias (Tabela Resumo) */}
        <div className="space-y-3">
          <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
            <Scale className="w-4 h-4 text-emerald-700" />
            <span>1. Quadro Síntese de Categorias de Projetos (Decreto nº 54/2015)</span>
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse border border-slate-300">
              <thead className="bg-slate-100 text-slate-800 font-bold">
                <tr>
                  <th className="border border-slate-300 p-2">Categoria</th>
                  <th className="border border-slate-300 p-2">Magnitude do Impacto</th>
                  <th className="border border-slate-300 p-2">Instrumento Técnico Exigido</th>
                  <th className="border border-slate-300 p-2">Competência</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                <tr>
                  <td className="border border-slate-300 p-2 font-bold text-red-700">A+</td>
                  <td className="border border-slate-300 p-2">Impactos graves, irreversíveis e excepcionais</td>
                  <td className="border border-slate-300 p-2">EIA completo + Revisores Independentes</td>
                  <td className="border border-slate-300 p-2">MTA / DINAB</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 p-2 font-bold text-amber-700">A</td>
                  <td className="border border-slate-300 p-2">Impactos negativos significativos</td>
                  <td className="border border-slate-300 p-2">EPDA + TdR + REIA + Consulta Pública</td>
                  <td className="border border-slate-300 p-2">MTA / DINAB</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 p-2 font-bold text-blue-700">B</td>
                  <td className="border border-slate-300 p-2">Impactos menos significativos e mitigáveis</td>
                  <td className="border border-slate-300 p-2">Estudo Ambiental Simplificado (EAS)</td>
                  <td className="border border-slate-300 p-2">Governo Provincial</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 p-2 font-bold text-emerald-700">C</td>
                  <td className="border border-slate-300 p-2">Impactos negligenciáveis</td>
                  <td className="border border-slate-300 p-2">Guia de Boas Práticas Ambientais</td>
                  <td className="border border-slate-300 p-2">Governo Provincial</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Resolução das 9 Questões do Documento */}
        <div className="space-y-8 pt-4">
          <h3 className="text-sm font-black text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-2">
            <BookOpen className="w-4 h-4 text-emerald-700" />
            <span>2. Resolução Oficial das 9 Questões do Teste 1</span>
          </h3>

          <div className="space-y-6">
            {QUESTIONS.map((q, idx) => (
              <div key={q.id} className="p-5 rounded-xl border border-slate-300 bg-slate-50/50 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <span className="text-xs font-black uppercase text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded">
                    Questão {idx + 1}
                  </span>
                  <span className="text-[11px] text-slate-500 font-semibold italic">
                    {q.officialAnswer.legalRef}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900">
                  {q.question}
                </h4>

                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-950">
                  {q.officialAnswer.summary}
                </div>

                <div className="space-y-2 text-xs text-slate-700">
                  {q.officialAnswer.sections.map((sec, sIdx) => (
                    <div key={sIdx} className="pl-3 border-l-2 border-slate-400 py-0.5">
                      <strong className="text-slate-900 font-bold block">
                        {sec.heading}
                      </strong>
                      <p className="whitespace-pre-line text-slate-600 mt-0.5">
                        {sec.content}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="text-[11px] text-slate-500 pt-1 font-medium italic">
                  💡 Ponto-chave: {q.officialAnswer.keyDistinction}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Glossário de Siglas Oficiais */}
        <div className="pt-6 border-t-2 border-slate-200 space-y-3">
          <h3 className="text-sm font-black text-slate-900">
            3. Glossário Rápido de Siglas Oficiais de Moçambique
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {Object.entries(TECHNICAL_GLOSSARY).map(([key, val]) => (
              <div key={key} className="p-2 rounded bg-slate-100 border border-slate-200">
                <strong className="text-slate-900 font-bold">{key}: </strong>
                <span className="text-slate-600">{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Rodapé da Ficha */}
        <div className="text-center pt-6 border-t border-slate-200 text-[11px] text-slate-400">
          AIA Moçambique EcoTech Hub • Material de Estudo Intensivo • Gerado com base no programa oficial de avaliação ambiental
        </div>

      </div>

    </div>
  );
}
