import { create } from "zustand";
import axios from "axios";
import * as Yup from 'yup';
import { API, BASE_URL } from "../Services/Config";

const useCategoriesHook = create((set) => ({

  initialValues: {
    id: null,
    categoryName: '',
  },

  validationSchema: Yup.object({
    categoryName: Yup.string().required('Category name is required'),
  }),

  // Method to reset initial values
  setInitialValues: (values) => {
    if (values === null || values === undefined) {
      return set({
        initialValues: { id: null, categoryName: "" },
      });
    }

    set({
      initialValues: { id: values.id, brandName: values.category_name },
    });
  },

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

  getCategory: async (id) => {
    try {
      const response = await axios.get(
        `${BASE_URL.development}/${API.CATEGORY_SHOW}/${id}`
      );
      return response.data;
    } catch (error) {
      error.message
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
  },

  // Update with PUT or PATCH request
  updateCategory: async (id, formData) => {
    try {
      const response = await axios.post(
        `${BASE_URL.development}/${API.CATEGORY_UPDATE}/${id}`,
        formData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating category:", error.message);
      throw error;
    }
  },

}));

export default useCategoriesHook;
