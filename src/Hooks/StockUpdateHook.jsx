import { create } from "zustand";
import * as Yup from "yup";

import { API } from "../Services/Config";
import inventory_api from "../Services/ApiName";

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
      const response = await inventory_api.get(`/${API.STOCK_UPDATE_LIST}`);

      return response.data;
    } catch (error) {
      error.message;
    }
  },

  createStockUpdate: async (formData) => {
    try {
      const response = await inventory_api.post(
        `/${API.STOCK_UPDATE}`,
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
