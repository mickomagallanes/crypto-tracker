import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Holding {
  symbol: string;
  quantity: number;
}

interface Portfolio {
  holdings: Holding[];
  addNewHoldings: (symbol: string, quantity: number) => void;
  // getHoldingsAsQuery: () => string;
  getUniqueSymbols: () => string[];
  computed: { holdingsAsQuery: string };
}

export const usePortfolioStore = create<Portfolio>()(
  persist(
    (set, get) => ({
      // holdings object structure: {symbol: string, quantity: number}
      // NOTE: symbol is now id of the coin
      // TODO: convert this to hashmap, for it is better
      holdings: [],
      computed: {
        // assumed that the only changing store here is holdings
        get holdingsAsQuery() {
          return get().holdings.reduce(
            (acc: string, current: Holding, idx: number) => {
              return acc + `${idx > 0 ? "&" : ""}coins=${current.symbol}`;
            },
            "",
          );
        },
      },
      addNewHoldings: (symbol, quantity) => {
        set((state) => {
          const foundIndex = state.holdings.findIndex(
            (objHold) => objHold.symbol === symbol,
          );

          if (foundIndex !== -1) {
            const updatedHoldings = state.holdings.map((holding, index) =>
              index === foundIndex
                ? {
                    symbol: holding.symbol,
                    quantity: holding.quantity + quantity,
                  }
                : holding,
            );
            return { holdings: updatedHoldings };
          } else {
            return {
              holdings: [
                ...state.holdings,
                {
                  symbol: symbol,
                  quantity: quantity,
                },
              ],
            };
          }
        });
      },

      getUniqueSymbols: () => {
        return get()
          .holdings.map((item) => item.symbol)
          .filter((value, index, self) => self.indexOf(value) === index);
      },
    }),
    {
      name: "holdings",
    },
  ),
);
