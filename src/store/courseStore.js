import { defineStore } from 'pinia';
import PyodideClient from '../utils/pyodideClient';

const pyodideClient = new PyodideClient();

const STORAGE_KEY = 'campus_manager_progress';

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveProgress(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      chapter1Passed: state.chapter1Passed,
      chapter2Passed: state.chapter2Passed,
      chapter3Passed: state.chapter3Passed,
      gameScores: state.gameScores,
      quizScores: state.quizScores
    }));
  } catch {
    // localStorage full or unavailable
  }
}

export const useCourseStore = defineStore('course', {
  state: () => {
    const saved = loadProgress();
    return {
      chapter1Passed: saved.chapter1Passed || false,
      chapter2Passed: saved.chapter2Passed || false,
      chapter3Passed: saved.chapter3Passed || false,
      gameScores: saved.gameScores || { ch1: 0, ch2: 0, ch3: 0 },
      quizScores: saved.quizScores || { ch1: 0, ch2: 0, ch3: 0 },
      pyodideStatus: 'loading',
      pyodideProgress: 0,
      pyodideMessage: 'Python 环境加载中...'
    };
  },
  getters: {
    completedChapters(state) {
      return [state.chapter1Passed, state.chapter2Passed, state.chapter3Passed].filter(Boolean).length;
    },
    totalProgress(state) {
      return Math.round((this.completedChapters / 3) * 100);
    },
    pyodideReady(state) {
      return state.pyodideStatus === 'ready';
    }
  },
  actions: {
    initPyodide() {
      pyodideClient.onStatus(({ status, progress, message }) => {
        this.pyodideStatus = status;
        this.pyodideProgress = progress;
        this.pyodideMessage = message;
      });
    },
    async runCode(code, precomputedKey = null) {
      return await pyodideClient.runPython(code, precomputedKey);
    },
    passChapter1() {
      this.chapter1Passed = true;
      saveProgress(this.$state);
    },
    passChapter2() {
      this.chapter2Passed = true;
      saveProgress(this.$state);
    },
    passChapter3() {
      this.chapter3Passed = true;
      saveProgress(this.$state);
    },
    saveGameScore(chapter, score) {
      const key = 'ch' + chapter;
      if (score > (this.gameScores[key] || 0)) {
        this.gameScores[key] = score;
        saveProgress(this.$state);
      }
    },
    saveQuizScore(chapter, percent) {
      const key = 'ch' + chapter;
      if (percent > (this.quizScores[key] || 0)) {
        this.quizScores[key] = percent;
        saveProgress(this.$state);
      }
    },
    resetProgress() {
      this.chapter1Passed = false;
      this.chapter2Passed = false;
      this.chapter3Passed = false;
      this.gameScores = { ch1: 0, ch2: 0, ch3: 0 };
      this.quizScores = { ch1: 0, ch2: 0, ch3: 0 };
      localStorage.removeItem(STORAGE_KEY);
    }
  }
});
