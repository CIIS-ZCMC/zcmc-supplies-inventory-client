import { create } from "zustand";
import axios from "axios";
import * as Yup from "yup";
import { BASE_URL, API } from "../Services/Config";

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
      const response = await axios.get(
        `${BASE_URL.production}/${API.SUPPLIES}`
      );
      return response.data;
    } catch (error) {
      error.message;
    }
  },

  // Create Area in with POST request
  createSupply: async (formData) => {
    try {
      const response = await axios.post(
        `${BASE_URL.production}/${API.SUPPLY_STORE}`,
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
