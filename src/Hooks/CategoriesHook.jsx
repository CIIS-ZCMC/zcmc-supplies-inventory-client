import { create } from "zustand";
import axios from "axios";
import * as Yup from 'yup';
import { API, BASE_URL } from "../Services/Config";

const useCategoriesHook = create((set) => ({

  initialValues: {
    categoryName: '',
  },

  validationSchema: Yup.object({
    categoryName: Yup.string().required('Category name is required'),
  }),

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

  // Create Area in with POST request
  createCategory: async (formData) => {
    try {
      const response = await axios.post(`${BASE_URL.development}/${API.CATEGORY_STORE}`, formData);
      return response.data;
    } catch (error) {
      console.error("Error creating brands:", error.message);
      throw error;
    }
  }
}));

export default useCategoriesHook;
