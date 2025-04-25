import { create } from "zustand";
import * as Yup from "yup";

import { API } from "../Services/Config";
import inventory_api from "../Services/ApiName";

const usePOTaggingHooks = create((set) => ({
  getPOitems: async (PO_number) => {
    try {
      const response = await inventory_api.get(
        `/${API.PURCHASED_ORDERS_ITEMS}/${PO_number}`
      );
      return response.data.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  getPOTagged: async () => {
    try {
      const response = await inventory_api.get(
        `/${API.PURCHASED_ORDERS_TAGGED}`
      );
      return response.data.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  storeTagging: async (formData, pulledID) => {
    try {
      const response = await inventory_api.post(
        `/${API.STORE_PO_TAGGING}/${pulledID}`,
        formData
      );
      return response;
    } catch (error) {
      return error;
    }
  },
}));

export default usePOTaggingHooks;
