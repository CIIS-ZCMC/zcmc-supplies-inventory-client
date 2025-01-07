import { create } from "zustand";
import * as Yup from "yup";
import { API } from "../Services/Config";
import inventory_api from "../Services/ApiName";

const useSuppliesHook = create((set) => ({
  initialValues: {
    supplyName: "",
    category: "",
    unit: "",
    source: "",
    quntity: "",
    // description: '',
  },

  validationSchema: Yup.object({
    supplyName: Yup.string().required("Supply name is required"),
    category: Yup.string().required("Category is required"),
    unit: Yup.string().required("Unit is required"),
  }),

  getSupplies: async () => {
    try {
      const response = await inventory_api.get(`/${API.SUPPLIES}`);

      return response.data;
    } catch (error) {
      error.message;
    }
  },

  // Create Area in with POST request
  createSupply: async (formData) => {
    try {
      const response = await inventory_api.post(
        `/${API.SUPPLY_STORE}`,
        formData
      );

      return response.data;
    } catch (error) {
      console.error("Error creating unit:", error.message);
      throw error;
    }
  },
}));

export default useSuppliesHook;
