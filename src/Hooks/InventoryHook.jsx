import { create } from "zustand";
import { API } from "../Services/Config";
import inventory_api from "../Services/ApiName";

const useInventoryHook = create((set) => ({
  inventory: [],
  details: [],

  getInventory: async () => {
    try {
      const response = await inventory_api.get(
        `/${API.INVENTORY}`
      );
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
      set({ details: response.data.data });
      console.log(response.data);
      // Return the response data
      return response.data;
    } catch (error) {
      console.error("Error fetching inventory:", error.message);
    }
  },
}));

export default useInventoryHook;
