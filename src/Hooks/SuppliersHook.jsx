import { create } from "zustand";
import axios from "axios";
import * as Yup from "yup";

import { BASE_URL, API } from "../Services/Config";

const useSuppliersHook = create((set) => ({
  initialValues: {
    supplierName: "",
  },

  validationSchema: Yup.object({
    supplierName: Yup.string().required("Supplier name is required"),
  }),

  getSuppliers: async () => {
    try {
      const response = await axios.get(
        `${BASE_URL.production}/${API.SUPPLIERS}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      error.message;
    }
  },

  // Create Area in with POST request
  createSupplier: async (formData) => {
    try {
      const response = await axios.post(
        `${BASE_URL.production}/${API.SUPPLIER_STORE}`,
        formData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating brands:", error.message);
      throw error;
    }
  },
}));

export default useSuppliersHook;
