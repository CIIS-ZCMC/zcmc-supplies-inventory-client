import { create } from "zustand";
import * as Yup from "yup";
import { API } from "../Services/Config";
import inventory_api from "../Services/ApiName";

const useCategoriesHook = create((set) => ({
  initialValues: {
    id: null,
    categoryName: "",
  },

  validationSchema: Yup.object({
    categoryName: Yup.string().required("Category name is required"),
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
      const response = await inventory_api.get(`/${API.CATEGORIES}`);

      return response.data;
    } catch (error) {
      error.message;
    }
  },

  getCategoryWItems: async () => {
    try {
      const response = await inventory_api.get(`/${API.CATEGORIESWITEMS}`);

      return response.data;
    } catch (error) {
      error.message;
    }
  },
  getCategory: async (id) => {
    try {
      const response = await inventory_api.get(`/${API.CATEGORY_SHOW}/${id}`);
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

  // Update with PUT or PATCH request
  updateCategory: async (id, formData) => {
    try {
      const response = await inventory_api.post(
        `/${API.CATEGORY_UPDATE}/${id}`,
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
