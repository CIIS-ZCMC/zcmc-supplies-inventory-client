import { create } from "zustand";
import * as Yup from "yup";

import { API } from "../Services/Config";
import inventory_api from "../Services/ApiName";

const usePOTaggingHooks = create((set) => ({
  fetchTagItemsFundClusters: async (PO_numbers) => {
    try {
      const response = await inventory_api.post(`/${API.FETCH_FC_POTAGS}`, {
        po_numbers: PO_numbers,
      });
      return response.data.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
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
  fetchORSBurs: async (pr_number) => {
    try {
      const response = await inventory_api.get(
        `/${API.FETCH_ORSBURS}/${pr_number}`
      );
      return response;
    } catch (error) {
      return error;
    }
  },
}));

export default usePOTaggingHooks;
