import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface MortgageItem {
  montlyPayment: string;
  creditSum: string;
  overPayment: string;
  firstPayment: number;
  price: number;
  creditRate: number;
  creditPeriod: number;
}

interface MortgageState {
  items: MortgageItem[];
  setItems: (items: MortgageItem[]) => void;
}

const defaultItems = [
  {
    price: 5500000,
    firstPayment: Math.round(5500000 * 0.2),
    creditPeriod: 25,
    creditRate: 8,
    montlyPayment: "33 960",
    creditSum: "4 400 000",
    overPayment: "5 787 974",
  },
];

export const useMortgageStore = create<MortgageState>()(
  persist(
    (set, get) => ({
      items: defaultItems,
      setItems: (items) => set({ items }),
    }),
    {
      name: "mortgage-storage",
      merge: (persistedState, currentState) => {
        const state = {
          ...currentState,
          ...(persistedState as MortgageState),
        };

        if (!state.items || state.items.length === 0) {
          state.items = defaultItems;
        }

        return state;
      },
    },
  ),
);
