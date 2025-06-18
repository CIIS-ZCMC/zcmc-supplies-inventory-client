import { create } from "zustand";
import { API } from "../Services/Config";
import inventory_api from "../Services/ApiName";

const useInventoryHook = create((set) => ({
  inventory: [],
  details: [],
  stockouts: 0,
  startingBalance: 0,
  stockins: 0,
  stockno: null,
  InventoryFilter: {},
  setStockno: (stockno) => {
    set({ stockno: stockno });
  },
  retrieveBizboxItems: async (month, year) => {
    try {
      const response = await inventory_api.get(
        `/${API.FETCH_ITEMS}/${month}/${year}`
      );
      return response.data;
    } catch (error) {
      return error;
    }
  },
  getStockNo: async (supplyID) => {
    try {
      const response = await inventory_api.get(
        `/${API.RETRIEVED_STOCKNO}/${supplyID}`
      );
      console.log(response.data.stock_no);
      set({ stockno: response.data.stock_no });
      return response;
    } catch (error) {
      return error;
    }
  },
  updateStockNo: async (data, supplyID) => {
    try {
      const response = await inventory_api.post(
        `/${API.UPDATE_STOCKNO}/${supplyID}`,
        data
      );
      return response;
    } catch (error) {
      return error;
    }
  },
  setInventoryFilter: (filter) => {
    set({ InventoryFilter: filter });
  },
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
