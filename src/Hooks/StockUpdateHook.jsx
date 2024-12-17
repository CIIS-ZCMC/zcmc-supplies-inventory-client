import { create } from "zustand";
import axios from "axios";
import * as Yup from "yup";

import { BASE_URL, API } from "../Services/Config";

const useStockUpdateHook = create((set) => ({
  initialValues: {
    itemName: "",
    sources: [],
    brand_id: "",
  },

  validationSchema: Yup.object({
    itemName: Yup.string().required("Item Name is required"),
    // regularQuantity: Yup.string().required('Regular Quantity is required'),
    // donationQuantity: Yup.string().required('Donation Quantity is required'),
    // year: Yup.number().required('Year is required'),
  }),

  // Create stock in with POST request
  createStockUpdate: async (formData) => {
    try {
      const response = await axios.post(
        `${BASE_URL.production}/${API.STOCK_UPDATE}`,
        formData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating stock out:", error.message);
      throw error;
    }
  },
}));

export default useStockUpdateHook;
