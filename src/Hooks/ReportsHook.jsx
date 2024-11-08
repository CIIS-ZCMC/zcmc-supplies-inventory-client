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

  getItemCount: async () => {
    try {
      const response = await axios.get(
        `${BASE_URL.development}${API.REPORTS_ITEM_COUNT}`
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
        `${BASE_URL.development}${API.REPORTS_STARTING_BAL}`
      );
      set({ starting_bal: response.data });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  },

  getNearExp: async () => {
    try {
      const response = await axios.get(
        `${BASE_URL.development}${API.REPORTS_NEAR_EXP}`
      );
      set({ near_exp: response.data.data });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  },

  getZeroStocks: async () => {
    try {
      const response = await axios.get(
        `${BASE_URL.development}${API.REPORTS_ZERO_STOCKS}`
      );
      set({ zero_stocks: response.data.data });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  },

  getConsumed: async () => {
    try {
      const response = await axios.get(
        `${BASE_URL.development}${API.REPORTS_CONSUMED}`
      );
      set({ consumed: response.data.data });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  },

  getSufficient: async () => {
    try {
      const response = await axios.get(
        `${BASE_URL.development}${API.REPORTS_SUFFICIENT}`
      );
      set({ sufficient_sup: response.data.data });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  },

  getUnconsumed: async () => {
    try {
      const response = await axios.get(
        `${BASE_URL.development}${API.REPORTS_UNCONSUMED}`
      );
      set({ unconsumed: response.data.data });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  },

  getReorder: async () => {
    try {
      const response = await axios.get(
        `${BASE_URL.development}${API.REPORTS_REORDER}`
      );
      set({ reorder: response.data.data });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  },

  getDisposal: async () => {
    try {
      const response = await axios.get(
        `${BASE_URL.development}${API.REPORTS_DISPOSAL}`
      );
      set({ disposal: response.data.data });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  },
}));
export default useReportsHook;
