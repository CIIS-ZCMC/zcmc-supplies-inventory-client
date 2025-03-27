import { create } from "zustand";
import * as Yup from "yup";
import { API } from "../Services/Config";
import inventory_api from "../Services/ApiName";

const useSuppliesHook = create((set) => ({
  initialValues: {
    id: null,
    supplyName: "",
    category: "",
    unit: "",
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
  // Method to reset initial values
  setInitialValues: (values) => {
    if (values === null || values === undefined) {
      return set({
        initialValues: {
          id: null,
          supplyName: "",
          category: "",
          unit: "",
        },
      });
    }
    set({
      initialValues: {
        id: values.id,
        supplyName: values.supply_name,
        category: values.category_name,
        unit: values.unit_name,
      },
    });
  },

  getSupply: async (id) => {
    try {
      const response = await inventory_api.get(`/${API.SUPPLY_SHOW}/${id}`);

      return response.data;
    } catch (error) {
      error.message;
    }
  },

  // Update with PUT or PATCH request
  updateSupply: async (id, formData) => {
    try {
      const response = await inventory_api.post(
        `/${API.SUPPLY_UPDATE}/${id}`,
        formData
      );

      return response.data;
    } catch (error) {
      console.error("Error updating supply:", error.message);
      throw error;
    }
  },
}));

export default useSuppliesHook;
