import { create } from "zustand";
import * as Yup from "yup";
import { BASE_URL, API } from "../Services/Config";
import inventory_api from "../Services/ApiName";


const useStartingBalanceHook = create((set) => ({
    getSupplyBalances: async (supplyID) => {
        try {
          const response = await inventory_api.get(`/${API.REPORTS_STARTINGBAL_FETCHDATA}/${supplyID}`);
    
          return response.data;
        } catch (error) {
          error.message;
        }
      },

}));

export default useStartingBalanceHook;
