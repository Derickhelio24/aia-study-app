# 🌿 AIA Moçambique - EcoTech AI

Plataforma inteligente e imersiva para preparação do **Teste 1 de Avaliação de Impacto Ambiental (AIA)**, com foco no setor elétrico e na legislação de Moçambique.

Desenvolvido a partir das 9 questões do docente e concebido primeiro no **STITCH** (Design System *EcoTech & Energia*) e depois implementado em **React 19 + Vite 8 + Tailwind CSS v4**.

---

## 🚀 Como Executar

Se precisar reiniciar o servidor no futuro:

```bash
cd "C:\Users\Derick Helio\.gemini\antigravity\scratch\aia-study-app"
npm.cmd run dev
```

Abra no seu navegador em: **http://localhost:5173/**

Para gerar a versão de produção otimizada:
```bash
npm.cmd run build
```

---

## 🎯 Conteúdos Oficiais do Teste 1 (Módulos & Legislação)

1. **Conceitos Fundamentais**: Distinção entre Impacto Ambiental, EIA e AIA (Lei nº 20/97).
2. **Enquadramento Legal & Institucional**: Decreto nº 54/2015, MTA, DINAB, AQUA e competências provinciais.
3. **Processo de AIA**: Categorias A+, A, B e C, fases (EPDA, TdR, REIA, EAS, Licenciamento e Monitoria).
4. **Linhas de Transmissão**: Impactos da construção e operação (faixa de servidão, desmatamento, erosão, avifauna e efeito corona).
5. **Subestações Elétricas**: Impactos biofísicos e medidas de mitigação para solo, água, vegetação e comunidades.
6. **Linhas de Transmissão em Áreas Habitadas**: Reassentamento involuntário (Decreto nº 31/2012), perda de machambas, compensações e segurança.
7. **Derrame de Óleo de Transformador**: Contaminação de lençóis freáticos, risco de PCBs (Askarel), bacias de retenção, SAO e descarte perigoso (Decreto nº 83/2014).
8. **Matriz Energética Comparada**: Central Termoelétrica vs Solar Fotovoltaica (emissões atmosféricas, uso do solo, água e resíduos de painéis).
9. **Participação Pública**: Legitimidade social, saberes comunitários (locais sagrados/cemitérios) e exigência obrigatória do Decreto nº 54/2015.

---

## ✨ Recursos Principais da Aplicação

- **Flashcard 3D**: Giro suave entre a pergunta oficial e a resposta gabaritada.
- **Voz / Áudio (TTS)**: Botão para ler a pergunta e a resposta em voz alta.
- **Correção Inteligente**: Escreva a sua resposta com as suas palavras e a IA gera nota (0 a 20 valores), lista os pontos fortes e aponta o que faltou segundo a lei moçambicana.
- **Tutor IA ("Explicar Conceito")**: Aprofundamento didático sob demanda de termos técnicos (Efeito Corona, DINAB, SAO, etc.).
- **Gerador de Casos Práticos**: Novos cenários simulando províncias de Moçambique (Tete, Sofala, Gaza, Nacala).
- **Modo Simulado Cronometrado**: Prova completa de 25 minutos com relatório final.
- **Ficha de Revisão (Imprimir / PDF)**: Resumo completo pronto para imprimir (`window.print()`).
- **Persistência Total**: Todo o progresso é salvo no `localStorage` do navegador.
