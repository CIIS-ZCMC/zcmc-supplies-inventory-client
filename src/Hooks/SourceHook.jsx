import { create } from "zustand";
import * as Yup from "yup";
import { API } from "../Services/Config";
import inventory_api from "../Services/ApiName";

const useSourceHook = create((set) => ({
  initialValues: {
    sourceName: "",
  },

  validationSchema: Yup.object({
    sourceName: Yup.string().required("Source name is required"),
  }),

  getSources: async () => {
    try {
      const response = await inventory_api.get(`/${API.SOURCES}`);

      return response.data;
    } catch (error) {
      error.message;
    }
  },

  // Create Area in with POST request
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
}));

export default useSourceHook;
