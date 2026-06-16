import { create } from "zustand";
import { Category } from "../types/category";
import { useAuthStore } from "./useAuthStore";
import {
  addCategory as addCategoryDB,
  getCategoriesByUser,
  deleteCategory as deleteCategoryDB,
  updateCategory as updateCategoryDB,
} from "../database/categoryRepository";

interface CategoryState {
  categories: Category[];

  loadCategories: () => Promise<void>;

  addCategory: (category: Category) => Promise<void>;

  deleteCategory: (id: string) => Promise<void>;

  updateCategory: (id: string, name: string, color: string) => Promise<void>;
}

export const useCategoryStore = create<CategoryState>((set, get) => ({
  categories: [],

  loadCategories: async () => {
  const userId = useAuthStore.getState().user?.id;

  if (!userId) {
    set({ categories: [] });
    return;
  }

  const categories = getCategoriesByUser(userId);

  console.log('USER ID LOAD:', userId);
  console.log('CATEGORIES LOAD:', categories);

  set({ categories });
},

  addCategory: async (category) => {
    addCategoryDB(category);

    const categories = getCategoriesByUser(category.userId);

    set({
      categories,
    });

    console.log('CATEGORY ADD:', category);
  },

  deleteCategory: async (id) => {
    deleteCategoryDB(id);

    const userId = useAuthStore.getState().user?.id;

    if (!userId) return;

    const categories = getCategoriesByUser(userId);

    set({
      categories,
    });
  },
  updateCategory: async (id, name, color) => {
    updateCategoryDB(id, name, color);

    const userId = useAuthStore.getState().user?.id;

    if (!userId) return;

    const categories = getCategoriesByUser(userId);

    set({
      categories,
    });
  },
}));
