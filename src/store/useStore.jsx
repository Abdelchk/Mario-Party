import { create } from "zustand";
import { data } from '../data/boards';

export const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}))

export const useBoardStore = create((set) => ({
  selectedBoard: null,
  data,
  selectBoard: (board) => set({ selectedBoard: board }),
}));