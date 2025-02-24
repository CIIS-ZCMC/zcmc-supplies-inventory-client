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

  getItemCount: async (year) => {
    try {
      const response = await axios.get(
        `${BASE_URL.development}/${API.REPORTS_ITEM_COUNT}/${year}`
      );
      set({ item_count: response.data });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  },

  getStartingBal: async (year) => {
    try {
      const response = await axios.get(
        `${BASE_URL.development}/${API.REPORTS_STARTING_BAL}/${year}`
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
        `${BASE_URL.development}/${API.REPORTS_NEAR_EXP}`
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
        `${BASE_URL.development}/${API.REPORTS_ZERO_STOCKS}`
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
        `${BASE_URL.development}/${API.REPORTS_CONSUMED}/${year}`
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
        `${BASE_URL.development}/${API.REPORTS_SUFFICIENT}`
      );
      set({ sufficient_sup: response.data });
      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  },

  getUnconsumed: async (year) => {
    try {
      const response = await axios.get(
        `${BASE_URL.development}/${API.REPORTS_UNCONSUMED}/${year}`
      );
      set({ unconsumed: response.data });
      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  },

  getReorder: async (month) => {
    try {
      const response = await axios.get(
        `${BASE_URL.development}/${API.REPORTS_REORDER}/${month}`
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
        `${BASE_URL.development}/${API.REPORTS_DISPOSAL}/${month}`
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
        `${BASE_URL.development}/${API.REPORTS_ITEM_COUNT_BREAKDOWN}/${id}`
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
        `${BASE_URL.development}/${API.REPORTS_ITEM_COUNT_TOTAL}/${id}`
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
        `${BASE_URL.development}/${API.REPORTS_ITEM_COUNT_IAR}/${id}`
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
        `${BASE_URL.development}/${API.REPORTS_DATE}`
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
