import { create } from "zustand";
import { Entry } from "../types/finance";
import {
  addEntry as addEntryDB,
  getEntriesByUser,
  deleteEntry as deleteEntryDB,
  updateEntry as updateEntryDB,
} from "../database/entryRepository";

import { useAuthStore } from "./useAuthStore";

interface FinanceState {
  entries: Entry[];

  loadEntries: () => Promise<void>;

  addEntry: (entry: Entry) => Promise<void>;

  updateEntry: (entry: Entry) => Promise<void>;

  deleteEntry: (id: string) => Promise<void>;

  getBalance: () => number;

  getIncome: () => number;

  getExpense: () => number;
}

export const useFinanceStore = create<FinanceState>((set, get) => ({
  entries: [],

  loadEntries: async () => {
    const userId = useAuthStore.getState().user?.id;

    if (!userId) {
      set({
        entries: [],
      });

      return;
    }

    const entries = getEntriesByUser(userId);

    set({
      entries,
    });
  },

  addEntry: async (entry) => {
    addEntryDB(entry);

    const entries = getEntriesByUser(entry.userId);

    set({
      entries,
    });
  },

  updateEntry: async (entry) => {
    updateEntryDB(entry);

    const entries = getEntriesByUser(entry.userId);

    set({
      entries,
    });
  },

  deleteEntry: async (id) => {
    deleteEntryDB(id);

    const userId = useAuthStore.getState().user?.id;

    if (!userId) return;

    const entries = getEntriesByUser(userId);

    set({
      entries,
    });
  },

  getBalance: () => {
    const { entries } = get();

    return entries.reduce((total, item) => {
      return item.type === "income" ? total + item.amount : total - item.amount;
    }, 0);
  },

  getIncome: () => {
    return get()
      .entries.filter((item) => item.type === "income")
      .reduce((total, item) => total + item.amount, 0);
  },

  getExpense: () => {
    return get()
      .entries.filter((item) => item.type === "expense")
      .reduce((total, item) => total + item.amount, 0);
  },
}));
