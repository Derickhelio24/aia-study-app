/**
 * Storage Service - Gerenciamento de Persistência no LocalStorage do Navegador
 * Garante que o estudante nunca perca seu progresso, notas e avaliações.
 */

const STORAGE_KEYS = {
  PROGRESS: "aia_study_progress_v1",
  EXAM_HISTORY: "aia_exam_history_v1",
  GEMINI_KEY: "aia_gemini_api_key_v1",
  STREAK: "aia_study_streak_v1",
  USER_NOTES: "aia_user_notes_v1",
};

// Obter progresso geral das questões
export function getProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (e) {
    console.error("Erro ao carregar progresso:", e);
    return {};
  }
}

// Salvar atualização de status de um cartão
export function saveQuestionStatus(questionId, status, score = null) {
  try {
    const progress = getProgress();
    const current = progress[questionId] || {
      status: "unseen",
      reviewsCount: 0,
      scores: [],
      lastReviewed: null,
    };

    const updated = {
      ...current,
      status: status, // 'easy' | 'medium' | 'hard'
      reviewsCount: (current.reviewsCount || 0) + 1,
      lastReviewed: new Date().toISOString(),
    };

    if (score !== null) {
      updated.scores = [...(current.scores || []), { score, date: new Date().toISOString() }];
      updated.lastScore = score;
    }

    progress[questionId] = updated;
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
    updateStreak();
    return progress;
  } catch (e) {
    console.error("Erro ao salvar status da questão:", e);
    return null;
  }
}

// Salvar anotação pessoal do estudante na questão
export function saveQuestionNote(questionId, note) {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_NOTES);
    const notes = raw ? JSON.parse(raw) : {};
    notes[questionId] = note;
    localStorage.setItem(STORAGE_KEYS.USER_NOTES, JSON.stringify(notes));
    return notes;
  } catch (e) {
    console.error("Erro ao salvar anotação:", e);
    return {};
  }
}

export function getQuestionNotes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_NOTES);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

// Gerenciamento da chave Gemini (Client-side segura)
export function getStoredApiKey() {
  try {
    const local = localStorage.getItem(STORAGE_KEYS.GEMINI_KEY);
    if (local && local.trim().length > 5) {
      return local.trim();
    }
    const envKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (envKey && envKey.trim().length > 5) {
      return envKey.trim();
    }
    return "";
  } catch (e) {
    return "";
  }
}

export function saveStoredApiKey(key) {
  try {
    if (!key) {
      localStorage.removeItem(STORAGE_KEYS.GEMINI_KEY);
    } else {
      localStorage.setItem(STORAGE_KEYS.GEMINI_KEY, key.trim());
    }
  } catch (e) {
    console.error("Erro ao salvar chave da API:", e);
  }
}

// Histórico de Simulados / Modo Exame
export function getExamHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.EXAM_HISTORY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function saveExamResult(result) {
  try {
    const history = getExamHistory();
    const updated = [
      {
        id: "exam-" + Date.now(),
        date: new Date().toISOString(),
        score: result.score,
        correctCount: result.correctCount,
        totalQuestions: result.totalQuestions,
        timeSpentSeconds: result.timeSpentSeconds,
        answers: result.answers || {},
      },
      ...history,
    ];
    localStorage.setItem(STORAGE_KEYS.EXAM_HISTORY, JSON.stringify(updated.slice(0, 20)));
    return updated;
  } catch (e) {
    console.error("Erro ao salvar resultado do exame:", e);
    return [];
  }
}

// Contador de Sequência de Dias (Streak)
export function getStreak() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STREAK);
    if (!raw) return { count: 1, lastDate: new Date().toDateString() };
    return JSON.parse(raw);
  } catch (e) {
    return { count: 1, lastDate: new Date().toDateString() };
  }
}

function updateStreak() {
  try {
    const today = new Date().toDateString();
    const current = getStreak();
    if (current.lastDate === today) return;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    let newCount = current.count;
    if (current.lastDate === yesterday.toDateString()) {
      newCount += 1;
    } else {
      newCount = 1;
    }

    localStorage.setItem(STORAGE_KEYS.STREAK, JSON.stringify({ count: newCount, lastDate: today }));
  } catch (e) {
    console.error("Erro ao atualizar streak:", e);
  }
}

// Reset de progresso se o estudante quiser recomeçar
export function resetAllProgress() {
  try {
    localStorage.removeItem(STORAGE_KEYS.PROGRESS);
    localStorage.removeItem(STORAGE_KEYS.EXAM_HISTORY);
    localStorage.removeItem(STORAGE_KEYS.USER_NOTES);
    return true;
  } catch (e) {
    return false;
  }
}
