import { create } from "zustand";

interface GlobalState {
  isGlobalPending: boolean;
  setGlobalPending: (value: boolean) => void;
  globalPendingMessage: string;
  setGlobalPendingMessage: (value: string) => void;
}

export const useGlobalStore = create<GlobalState>()((set) => ({
  isGlobalPending: false,
  setGlobalPending: (value) => set({ isGlobalPending: value }),
  globalPendingMessage: "",
  setGlobalPendingMessage: (value) => set({ globalPendingMessage: value }),
}));
