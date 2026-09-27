import { create } from "zustand";
import type { Question } from "./questionsStore";

interface HistoricoState {
  historico: Historico[] | null;
  setHistorico: (value: Historico[] | null) => void;
}

export interface Historico {
  questao: Question;
  correta: string;
  numero: string;
  data: string;
}

const local = localStorage.getItem("historico");

function historicoLocal() {
  if (local) {
    return JSON.parse(local);
  } else {
    return null;
  }
}

export const useHistorico = create<HistoricoState>((set) => ({
  historico: historicoLocal(),
  setHistorico: (data) => set({ historico: data }),
}));
