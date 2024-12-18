import { create } from "zustand";
import axios from "axios";

import { API, BASE_URL } from "../Services/Config";

const useInventoryHook = create((set) => ({
  inventory: [],
  details: [],

  getInventory: async () => {
    try {
      const response = await axios.get(
        `${BASE_URL.production}/${API.INVENTORY}`,
        {
          withCredentials: true,
        }
      );
      set({ inventory: response.data.data });
      return response.data;
    } catch (error) {
      console.error(error.message);
      ``;
    }
  },

  getInventoryDetails: async (id) => {
    try {
      // Include the id in the API request URL
      const response = await axios.get(
        `${BASE_URL.production}/${API.INVENTORY}/${id}`,
        {
          withCredentials: true,
        }
      );

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
