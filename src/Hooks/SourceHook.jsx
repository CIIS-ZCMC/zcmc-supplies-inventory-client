import { create } from "zustand";
import * as Yup from "yup";
import { API } from "../Services/Config";
import inventory_api from "../Services/ApiName";

const useSourceHook = create((set) => ({
  initialValues: {
    id: null,
    sourceName: "",
  },

  validationSchema: Yup.object({
    sourceName: Yup.string().required("Source name is required"),
  }),

  // Method to reset initial values
  setInitialValues: (values) => {
    if (values === null || values === undefined) {
      return set({
        initialValues: { id: null, sourceName: "" },
      });
    }

    set({
      initialValues: { id: values.id, sourceName: values.source_name },
    });
  },

  getSources: async () => {
    try {
      const response = await inventory_api.get(`/${API.SOURCES}`);

      return response.data;
    } catch (error) {
      error.message;
    }
  },

  getSource: async (id) => {
    try {
      const response = await inventory_api.get(
        `/${API.SOURCE_SHOW}/${id}`
      );
      return response.data;
    } catch (error) {
      error.message;
    }
  },

  // Create in with POST request
  createSource: async (formData) => {
    try {
      const response = await inventory_api.post(
        `/${API.SOURCE_STORE}`,
        formData
      );

      return response.data;
    } catch (error) {
      console.error("Error creating Source:", error.message);
      throw error;
    }
  },

  // Update with PUT or PATCH request
  updateSource: async (id, formData) => {
    try {
      const response = await inventory_api.post(
        `/${API.SOURCE_UPDATE}/${id}`,
        formData
      );

      return response.data;
    } catch (error) {
      console.error("Error updating source:", error.message);
      throw error;
    }
  },
}));

export default useSourceHook;
