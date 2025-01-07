import { create } from "zustand";
import * as Yup from "yup";
import { API } from "../Services/Config";
import inventory_api from "../Services/ApiName";

const useCategoriesHook = create((set) => ({
  initialValues: {
    categoryName: "",
  },

  validationSchema: Yup.object({
    categoryName: Yup.string().required("Category name is required"),
  }),

  getCategories: async () => {
    try {
      const response = await inventory_api.get(`/${API.CATEGORIES}`);

      return response.data;
    } catch (error) {
      error.message;
    }
  },

  // Create Area in with POST request
  createCategory: async (formData) => {
    try {
      const response = await inventory_api.post(
        `/${API.CATEGORY_STORE}`,
        formData
      );

      return response.data;
    } catch (error) {
      console.error("Error creating brands:", error.message);
      throw error;
    }
  },
}));

export default useCategoriesHook;
