import { create } from "zustand";

interface QuestionsState {
  questions: Question[] | null;
  setQuestions: (value: Question[] | null) => void;
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
  setQuestions: (data) => set({ questions: data }),
}));
