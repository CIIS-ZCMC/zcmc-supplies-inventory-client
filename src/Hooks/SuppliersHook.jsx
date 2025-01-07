import { create } from "zustand";
import * as Yup from "yup";
import { API } from "../Services/Config";
import inventory_api from "../Services/ApiName";

const useSuppliersHook = create((set) => ({
  initialValues: {
    supplierName: "",
  },

  validationSchema: Yup.object({
    supplierName: Yup.string().required("Supplier name is required"),
  }),

  getSuppliers: async () => {
    try {
      const response = await inventory_api.get(`/${API.SUPPLIERS}`);

      return response.data;
    } catch (error) {
      error.message;
    }
  },

  // Create Area in with POST request
  createSupplier: async (formData) => {
    try {
      const response = await inventory_api.post(
        `/${API.SUPPLIER_STORE}`,
        formData
      );

      return response.data;
    } catch (error) {
      console.error("Error creating brands:", error.message);
      throw error;
    }
  },
}));

export default useSuppliersHook;
