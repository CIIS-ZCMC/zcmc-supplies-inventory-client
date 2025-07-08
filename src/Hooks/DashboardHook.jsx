import { create } from "zustand";
import { API } from "../Services/Config";
import inventory_api from "../Services/ApiName";
import { useNavigate } from "react-router-dom";
const useDashboardHook = create((set) => ({
  itemsData: [],
  chartData: [
    ["Year", "No Selection"],
    ["2025", 1000],
  ],
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

  fetchItem: async (data) => {
    try {
      const response = await inventory_api.post(`/${API.GETITEMDETAILS}`, data);
      set({ itemsData: response.data.data });
      return response.data;
    } catch (error) {
      error.message;
    }
  },

  fetchChartIssuance: async (data) => {
    try {
      const response = await inventory_api.post(
        `/${API.DASHBOARDISSUANCE}`,
        data
      );
      set({ chartData: response.data.data });
      return response.data;
    } catch (error) {
      error.message;
    }
  },
}));

export default useDashboardHook;
