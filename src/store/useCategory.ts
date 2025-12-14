import { create } from 'zustand';
import axios from 'axios'

export type Category = {
  id: number;
  name: string;
};

interface CategoryStore {
  categories: Category[];
  selectedCategory: number;
  setCategories: (categories: Category[]) => void;
  setSelectedCategory: (id: number) => void;
  fetchCategories: () => Promise<void>;
}

// Zustand store for managing categories
export const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  selectedCategory: 0,
  setCategories: (categories) => set({ categories }),
  setSelectedCategory: (id) => set({ selectedCategory: id }),
  fetchCategories: async () => {
    const response = await axios.get('https://opentdb.com/api_category.php'); 
		const data = response.data;
    const categories: Category[] = data.trivia_categories;

    categories.unshift({ id: 0, name: "Random" });
    categories.unshift({ id: 1, name: "Mixed Categories" });

    set({ categories });
  },
}));
