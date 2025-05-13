import { create } from "zustand";
import { API } from "../Services/Config";
import inventory_api from "../Services/ApiName";
import { useNavigate } from "react-router-dom";
const useDashboardHook = create((set) => ({
  getDashboardTotal: async () => {
    try {
      const response = await inventory_api.get(`/${API.DASHBOARD_TOTAL}`);

      return response.data;
    } catch (error) {
      error.message;
    }
  },

  getDashboardSupplies: async () => {
    try {
      const response = await inventory_api.get(`/${API.DASHBOARD_SUPPLIES}`);

      return response.data;
    } catch (error) {
      error.message;
    }
  },
}));

export default useDashboardHook;
