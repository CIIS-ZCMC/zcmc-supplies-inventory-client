import { create } from "zustand";
import { API } from "../Services/Config";
import inventory_api from "../Services/ApiName";

const useInventoryHook = create((set) => ({
  inventory: [],
  details: [],
  stockouts: 0,
  startingBalance: 0,
  stockins: 0,

  saveToInventory: async (data) => {
    try {
      const response = await inventory_api.post(
        `/${API.INVENTORY_STORE}`,
        data
      );
      // set({ inventory: response.data.data });
      return response;
    } catch (error) {
      return error;
    }
  },
  getInventory: async () => {
    try {
      const response = await inventory_api.get(`/${API.INVENTORY}`);
      // set({ inventory: response.data.data });
      return response.data;
    } catch (error) {
      console.error(error.message);
      ``;
    }
  },

  getPurchaseOrders: async () => {
    try {
      const response = await inventory_api.get(`/${API.PURCHASED_ORDERS}`);
      // set({ inventory: response.data.data });
      return response.data;
    } catch (error) {
      console.error(error.message);
      ``;
    }
  },

  getInventoryDetails: async (id) => {
    try {
      // Include the id in the API request URL
      const response = await inventory_api.get(`/${API.INVENTORY}/${id}`);

      // Update the state with the fetched data
      set({
        details: response.data.data,
        stockouts: response.data.stockouts,
        startingBalance: response.data.startingBalance,
        stockins: response.data.stockins,
      });

      // Return the response data
      return response.data;
    } catch (error) {
      console.error("Error fetching inventory:", error.message);
    }
  },
}));

export default useInventoryHook;
