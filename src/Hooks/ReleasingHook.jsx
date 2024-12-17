import { create } from "zustand";
import axios from "axios";
import * as Yup from "yup";

import { API, BASE_URL } from "../Services/Config";

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
      // console.log(`${BASE_URL}/${RELEASING}`)
      const response = await axios.get(
        `${BASE_URL.production}/${API.RELEASING}`
      );
      return response.data;
    } catch (error) {
      error.message;
    }
  },

  getSelectedReleasingList: async (id) => {
    try {
      const response = await axios.get(
        `${BASE_URL.production}/${API.SELECTED_RELEASING_LIST}/${id}`
      );
      return response.data;
    } catch (error) {
      error.message;
    }
  },

  // Create stock out with POST request
  createStockOut: async (formData) => {
    try {
      const response = await axios.post(
        `${BASE_URL.production}/${API.STOCKOUT}`,
        formData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating stock out:", error.message);
      throw error;
    }
  },

  getBrandRegular: async (id) => {
    try {
      // console.log(`${BASE_URL}/${RELEASING}`)
      const response = await axios.get(
        `${BASE_URL.production}/${API.BRAND_REGULAR}/${id}`
      );
      return response.data;
    } catch (error) {
      error.message;
    }
  },

  getBrandDonation: async (id) => {
    try {
      // console.log(`${BASE_URL}/${RELEASING}`)
      const response = await axios.get(
        `${BASE_URL.production}/${API.BRAND_DONATION}/${id}`
      );
      return response.data;
    } catch (error) {
      error.message;
    }
  },
}));

export default useReleasingHook;
