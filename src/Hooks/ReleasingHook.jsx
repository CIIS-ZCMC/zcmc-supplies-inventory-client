import { create } from "zustand";
import * as Yup from "yup";

import { API } from "../Services/Config";
import inventory_api from "../Services/ApiName";

const useReleasingHook = create((set) => ({
  initialValues: {
    itemName: "",
    source: "",
    area: "",
    risDate: "",
    risNumber: "",
    transactionType: "Stock-out",
    // category: '',
    quantityRequested: "",
    quantityServed: "",
    remarks: "",
  },

  resetForm: () => {
    set(initialValues);
  },

  validationSchema: Yup.object({
    itemName: Yup.string().required("Item Name is required"),
    source: Yup.string().required("Source is required"),
    area: Yup.string().required("Area is required"),
    risDate: Yup.date().required("Date is required"),
    risNumber: Yup.string().required("RIS number is required"),
    // category: Yup.string().required('Category is required'),
    quantityRequested: Yup.number().required("Quantity Requested is required"),
    quantityServed: Yup.number().required("Quantity Served is required"),
  }),

  //fetch the fata of stock out / releasing list
  getStockOut: async () => {
    try {
      const response = await inventory_api.get(`/${API.RELEASING}`);

      return response.data;
    } catch (error) {
      error.message;
    }
  },

  getSelectedReleasingList: async (id) => {
    try {
      const response = await inventory_api.get(`/${API.RELEASING}/${id}`);

      return response.data;
    } catch (error) {
      error.message;
    }
  },

  // Create stock out with POST request
  createStockOut: async (formData) => {
    try {
      const response = await inventory_api.post(`/${API.STOCKOUT}`, formData);

      return response.data;
    } catch (error) {
      console.error("Error creating stock out:", error.message);
      throw error;
    }
  },

  getBrandRegular: async (id) => {
    try {
      const response = await inventory_api.get(`/${API.BRAND_REGULAR}/${id}`);

      return response.data;
    } catch (error) {
      error.message;
    }
  },

  getBrandDonation: async (id) => {
    try {
      const response = await inventory_api.get(`/${API.BRAND_DONATION}/${id}`);

      return response.data;
    } catch (error) {
      error.message;
    }
  },
}));

export default useReleasingHook;
