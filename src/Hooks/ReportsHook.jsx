import { create } from "zustand";
import * as XLSX from "xlsx";
import { API } from "../Services/Config";
import inventory_api from "../Services/ApiName";
import moment from "moment";

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
  areaSupplies: [],
  regularSupplies: [],
  generateReport: (FileName, ReportData) => {
    try {
      const worksheet = XLSX.utils.json_to_sheet(ReportData); // Convert JSON to sheet
      const workbook = XLSX.utils.book_new(); // Create a new workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, `${FileName}.xlsx`);
      // const columnWidth = { wpx: 150 }; // Set desired column width in pixels

      // //Set the same column width for all columns
      // worksheet["!cols"] = new Array(
      //   ReportData[0] ? Object.keys(ReportData[0]).length : 0
      // ).fill(columnWidth);

      // // Enable text wrap for all header cells
      // const header = worksheet["!cols"] ? worksheet["!cols"] : [];
      // header.forEach((col, index) => {
      //   if (!col) header[index] = { alignment: { wrapText: true } }; // Apply wrapText to each header
      // });

      // const workbook = XLSX.utils.book_new();
      // XLSX.utils.book_append_sheet(workbook, worksheet);

      // XLSX.writeFile(workbook, `${FileName}.xlsx`);

      //  showSnackbar("Report generated successfully!", "success", "filled");
    } catch (error) {
      // showSnackbar(
      //   `Failed to generate the report. Please try again. ${error}`,
      //   "danger",
      //   "filled"
      // );
    }
  },
  getItemCount: async (year) => {
    try {
      const response = await inventory_api.get(
        `/${API.REPORTS_ITEM_COUNT}/${year}`
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
      const response = await inventory_api.get(
        `/${API.REPORTS_STARTING_BAL}/${year}`
      );
      set({ starting_bal: response.data });
      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  },

  getNearExp: async () => {
    try {
      const response = await inventory_api.get(`/${API.REPORTS_NEAR_EXP}`);

      set({ near_exp: response.data.data });
      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  },

  getZeroStocks: async () => {
    try {
      const response = await inventory_api.get(`/${API.REPORTS_ZERO_STOCKS}`);

      set({ zero_stocks: response.data });
      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  },

  getConsumed: async (year) => {
    try {
      const response = await inventory_api.get(
        `/${API.REPORTS_CONSUMED}/${year}`
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
      const response = await inventory_api.get(`/${API.REPORTS_SUFFICIENT}`);

      set({ sufficient_sup: response.data });
      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  },

  getUnconsumed: async (year) => {
    try {
      const response = await inventory_api.get(
        `/${API.REPORTS_UNCONSUMED}/${year}`
      );

      set({ unconsumed: response.data });
      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  },

  getReorder: async (month) => {
    try {
      const response = await inventory_api.get(
        `/${API.REPORTS_REORDER}/${month}`
      );

      set({ reorder: response.data });
      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  },

  getDisposal: async (month) => {
    try {
      const response = await inventory_api.get(
        `/${API.REPORTS_DISPOSAL}/${month}`
      );

      set({ disposal: response.data });
      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  },

  getItemCountDetails: async (id, year = new Date().getFullYear()) => {
    try {
      // Include the id in the API request URL
      const response = await inventory_api.get(
        `/${API.REPORTS_ITEM_COUNT_BREAKDOWN}/${id}?year=${year}`
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
  getItemCountInfo: async (id, year = new Date().getFullYear()) => {
    try {
      // Include the id in the API request URL
      const response = await inventory_api.get(
        `/${API.REPORTS_ITEM_COUNT_TOTAL}/${id}?year=${year}`
      );

      // Update the state with the fetched data
      set({ item_count: response.data });
      // Return the response data
      return response.data;
    } catch (error) {
      console.error("Error fetching inventory:", error.message);
    }
  },
  getItemCountIAR: async (id, year = new Date().getFullYear()) => {
    try {
      // Include the id in the API request URL
      const response = await inventory_api.get(
        `/${API.REPORTS_ITEM_COUNT_IAR}/${id}?year=${year}`
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
      const response = await inventory_api.get(`/${API.REPORTS_DATE}`);

      // Update the state with the fetched data
      set({ dates: response.data });
      // Return the response data
      return response.data;
    } catch (error) {
      console.error("Error fetching inventory:", error.message);
    }
  },

  getAreaSupply: async (id, year) => {
    try {
      // Include the id in the API request URL
      const response = await inventory_api.get(
        `/${API.REPORTS_AREA_SUPPLY}/${id}/${year}`
      );

      // Update the state with the fetched data
      set({ areaSupplies: response.data });
      // Return the response data
      return response.data;
    } catch (error) {
      console.error("Error fetching inventory:", error.message);
    }
  },

  getRegularSupply: async (year) => {
    try {
      // Include the id in the API request URL
      const response = await inventory_api.get(
        `/${API.REPORTS_SUPPLY_REGULAR}/${year}`
      );

      // Update the state with the fetched data
      set({ regularSupplies: response.data });
      // Return the response data
      return response.data;
    } catch (error) {
      console.error("Error fetching inventory:", error.message);
    }
  },
}));
export default useReportsHook;
