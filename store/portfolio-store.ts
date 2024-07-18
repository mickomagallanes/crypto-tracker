import { create } from "zustand";

interface PortfolioState {
  bears: number;
  increase: (by: number) => void;
}

const useBearStore = create<PortfolioState>()((set) => ({
  bears: 0,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
}));
