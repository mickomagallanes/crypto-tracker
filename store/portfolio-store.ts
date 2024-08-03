import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Holding {
  symbol: string;
  quantity: number;
}

interface Portfolio {
  holdings: Holding[];
  addNewHoldings: (symbol: string, quantity: number) => void;
}

export const usePortfolioStore = create<Portfolio>()(
  persist(
    (set) => ({
      holdings: [],
      addNewHoldings: (symbol, number) =>
        set((state) => ({
          holdings: [...state.holdings, { symbol: symbol, quantity: number }],
        })),
    }),
    {
      name: "holdings",
    },
  ),
);
