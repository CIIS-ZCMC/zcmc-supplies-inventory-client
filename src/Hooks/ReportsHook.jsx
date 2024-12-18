import { create } from "zustand";
import axios from "axios";

import { API, BASE_URL } from "../Services/Config";

const useReportsHook = create((set) => ({
  item_count: [],
  starting_bal: [],
  near_exp: [],
  zero_stocks: [],
  consumed: [],
  sufficient_sup: [],
  unconsumed: [],
  reorder: [],
  disposal: [],
  detais: [],
  item_total: [],
  item_iar: [],
  dates: [],

  getItemCount: async () => {
    try {
      const response = await axios.get(
        `${BASE_URL.production}/${API.REPORTS_ITEM_COUNT}`,
        {
          withCredentials: true,
        }
      );
      set({ item_count: response.data });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  },

  getStartingBal: async () => {
    try {
      const response = await axios.get(
        `${BASE_URL.production}/${API.REPORTS_STARTING_BAL}`,
        {
          withCredentials: true,
        }
      );
      set({ starting_bal: response.data });
      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  },

  getNearExp: async () => {
    try {
      const response = await axios.get(
        `${BASE_URL.production}/${API.REPORTS_NEAR_EXP}`,
        {
          withCredentials: true,
        }
      );
      set({ near_exp: response.data.data });
      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  },

  getZeroStocks: async () => {
    try {
      const response = await axios.get(
        `${BASE_URL.production}/${API.REPORTS_ZERO_STOCKS}`,
        {
          withCredentials: true,
        }
      );
      set({ zero_stocks: response.data });
      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  },

  getConsumed: async (year) => {
    try {
      console.log(year);
      const response = await axios.get(
        `${BASE_URL.production}/${API.REPORTS_CONSUMED}/${year}`,
        {
          withCredentials: true,
        }
      );
      set({ consumed: response.data });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  },

  getSufficient: async () => {
    try {
      const response = await axios.get(
        `${BASE_URL.production}/${API.REPORTS_SUFFICIENT}`,
        {
          withCredentials: true,
        }
      );
      set({ sufficient_sup: response.data });
      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  },

  getUnconsumed: async (year) => {
    try {
      console.log(year);
      const response = await axios.get(
        `${BASE_URL.production}/${API.REPORTS_UNCONSUMED}/${year}`,
        {
          withCredentials: true,
        }
      );
      set({ unconsumed: response.data });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  },

  getReorder: async (month) => {
    try {
      console.log(month);
      const response = await axios.get(
        `${BASE_URL.production}/${API.REPORTS_REORDER}/${month}`,
        {
          withCredentials: true,
        }
      );
      set({ reorder: response.data });
      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  },

  getDisposal: async (month) => {
    try {
      const response = await axios.get(
        `${BASE_URL.production}/${API.REPORTS_DISPOSAL}/${month}`,
        {
          withCredentials: true,
        }
      );
      set({ disposal: response.data });
      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  },

  getItemCountDetails: async (id) => {
    try {
      // Include the id in the API request URL
      const response = await axios.get(
        `${BASE_URL.production}/${API.REPORTS_ITEM_COUNT_BREAKDOWN}/${id}`,
        {
          withCredentials: true,
        }
      );

      // Update the state with the fetched data
      set({ details: response.data.monthly_breakdown });
      console.log(response.data.monthly_breakdown);
      // Return the response data
      return response.data;
    } catch (error) {
      console.error("Error fetching inventory:", error.message);
    }
  },
  getItemCountInfo: async (id) => {
    try {
      // Include the id in the API request URL
      const response = await axios.get(
        `${BASE_URL.production}/${API.REPORTS_ITEM_COUNT_TOTAL}/${id}`,
        {
          withCredentials: true,
        }
      );

      // Update the state with the fetched data
      set({ item_count: response.data });
      // Return the response data
      return response.data;
    } catch (error) {
      console.error("Error fetching inventory:", error.message);
    }
  },
  getItemCountIAR: async (id) => {
    try {
      // Include the id in the API request URL
      const response = await axios.get(
        `${BASE_URL.production}/${API.REPORTS_ITEM_COUNT_IAR}/${id}`,
        {
          withCredentials: true,
        }
      );

      // Update the state with the fetched data
      set({ item_iar: response.data });
      // Return the response data
      return response.data;
    } catch (error) {
      console.error("Error fetching inventory:", error.message);
    }
  },
  getDate: async () => {
    try {
      // Include the id in the API request URL
      const response = await axios.get(
        `${BASE_URL.production}/${API.REPORTS_DATE}`,
        {
          withCredentials: true,
        }
      );

      // Update the state with the fetched data
      set({ dates: response.data });
      // Return the response data
      return response.data;
    } catch (error) {
      console.error("Error fetching inventory:", error.message);
    }
  },
}));
export default useReportsHook;
