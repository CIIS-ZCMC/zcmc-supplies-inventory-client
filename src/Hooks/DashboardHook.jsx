import { create } from "zustand";
import axios from "axios";
import { BASE_URL, API } from "../Services/Config";

const useDashboardHook = create((set) => ({
  getDashboardTotal: async () => {
    try {
      const response = await axios.get(
        `${BASE_URL.production}/${API.DASHBOARD_TOTAL}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      error.message;
    }
  },

  getDashboardSupplies: async () => {
    try {
      const response = await axios.get(
        `${BASE_URL.production}/${API.DASHBOARD_SUPPLIES}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      error.message;
    }
  },
}));

export default useDashboardHook;
