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

  initialValues: {
    itemName: "",
    sources: [],
    brand_id: "",
    remarks: "",
  },

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
