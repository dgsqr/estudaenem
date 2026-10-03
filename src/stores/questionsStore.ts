import { create } from "zustand";
import type { Opts } from "../components/Configuracoes";

interface QuestionsState {
  questions: Question[] | null;
  localOpts: Opts;
  setQuestions: (value: Question[] | null) => void;
  setLocalOpts: (value: Opts) => void;
}

export interface Question {
  title: string;
  index: number;
  year: number;
  language: string | null;
  discipline: string;
  context: string;
  files: string[];
  correctAlternative: string;
  alternativesIntroduction: string;
  alternatives: Alternative[];
  _folder: string;
}

interface Alternative {
  letter: string;
  text: string | null;
  file: string | null;
  isCorrect: boolean;
}

export const useQuestions = create<QuestionsState>((set) => ({
  questions: null,
  localOpts: { cronometrada: false, instantaneo: false },
  setLocalOpts: (data) => set({ localOpts: data }),
  setQuestions: (data) => set({ questions: data }),
}));
