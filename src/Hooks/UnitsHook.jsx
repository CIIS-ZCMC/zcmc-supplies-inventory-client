import { create } from "zustand";
import * as Yup from "yup";
import { API } from "../Services/Config";
import inventory_api from "../Services/ApiName";

const useUnitsHook = create((set) => ({
  initialValues: {
    id: null,
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

  // Method to reset initial values
  setInitialValues: (values) => {
    if (values === null || values === undefined) {
      return set({
        initialValues: { id: null, unitName: "" },
      });
    }

    set({
      initialValues: { id: values.id, unitName: values.unit_name },
    });
  },

  getUnit: async (id) => {
    try {
      const response = await axios.get(
        `${BASE_URL.development}/${API.UNIT_SHOW}/${id}`
      );
      return response.data;
    } catch (error) {
      error.message;
    }
  },

  // Update with PUT or PATCH request
  updateUnit: async (id, formData) => {
    try {
      const response = await inventory_api.get(
        `/${API.UNIT_UPDATE}/${id}`,
        formData
      );

      return response.data;
    } catch (error) {
      console.error("Error updating unit:", error.message);
      throw error;
    }
  },
}));

export default useUnitsHook;
