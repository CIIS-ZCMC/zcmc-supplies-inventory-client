import { create } from "zustand";
import { BASE_URL, MigrateLibraries } from "../Services/Config";
import { queryClient } from "../Utils/queryClient";
import inventory_api from "../Services/ApiName";
import { API } from "../Services/Config";
export const useValidatorHooks = create((set) => ({
  validateSupplyName: async (validateType, data) => {
    try {
      const response = await inventory_api.post(`/${API.VALIDATOR}`, {
        type: validateType,
        data: data,
      });
      return response;
    } catch (error) {
      console.error("Error creating unit:", error.message);
      return error;
    }
  },
}));
