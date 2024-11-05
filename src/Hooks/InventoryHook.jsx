import { create } from "zustand";
import axios from "axios";

import { API, BASE_URL } from "../Services/Config";

const useInventoryHook = create((set) => ({
  inventory: [],
  getInventory: async () => {
    try {
      const response = await axios.get(
        `${BASE_URL.development}/${API.INVENTORY}`
      );
      set({ areas: response.data });
      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  },
}));

export default useInventoryHook;
