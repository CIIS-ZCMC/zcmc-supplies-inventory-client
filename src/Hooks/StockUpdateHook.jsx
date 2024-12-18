import { create } from "zustand";
import axios from "axios";
import * as Yup from "yup";

import { BASE_URL, API } from "../Services/Config";

const useStockUpdateHook = create((set) => ({
  initialValues: {
    itemName: "",
    sources: [],
    brand_id: "",
    remarks: "",
  },

  validationSchema: Yup.object({
    itemName: Yup.string().required("Item Name is required"),
    // regularQuantity: Yup.string().required('Regular Quantity is required'),
    // donationQuantity: Yup.string().required('Donation Quantity is required'),
    // year: Yup.number().required('Year is required'),
  }),

  getStockUpdateList: async () => {
    try {
      const response = await axios.get(
        `${BASE_URL.development}/${API.STOCK_UPDATE_LIST}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      error.message;
    }
  },

  createStockUpdate: async (formData) => {
    try {
      const response = await axios.post(
        `${BASE_URL.development}/${API.STOCK_UPDATE}`,
        formData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating stock out:", error.message);
      throw error;
    }
  },
}));

export default useStockUpdateHook;
