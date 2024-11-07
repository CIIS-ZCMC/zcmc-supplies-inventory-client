import { create } from "zustand";
import axios from "axios";

import { API, BASE_URL } from "../Services/Config";

const useCategoriesHook = create((set) => ({
  getCategories: async () => {
    try {
      const response = await axios.get(
        `${BASE_URL.development}/${API.CATEGORIES}`
      );
      return response.data;
    } catch (error) {
      error.message;
    }
  },
}));

export default useCategoriesHook;
