import { create } from "zustand";
import * as Yup from "yup";
import { API } from "../Services/Config";
import inventory_api from "../Services/ApiName";

const useUnitsHook = create((set) => ({
  initialValues: {
    unitName: "",
  },

  validationSchema: Yup.object({
    unitName: Yup.string().required("Unit name is required"),
  }),

  getUnits: async () => {
    try {
      const response = await inventory_api.get(`/${API.UNITS}`);

      return response.data;
    } catch (error) {
      error.message;
    }
  },

  // Create Area in with POST request
  createUnit: async (formData) => {
    try {
      const response = await inventory_api.get(`/${API.UNIT_STORE}`, formData);

      return response.data;
    } catch (error) {
      console.error("Error creating unit:", error.message);
      throw error;
    }
  },
}));

export default useUnitsHook;
