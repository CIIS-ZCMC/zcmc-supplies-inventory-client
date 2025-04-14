import { create } from "zustand";
import { API } from "../Services/Config";
import inventory_api from "../Services/ApiName";

const useFetchHook = create((set)=>({
    lastSynced:[],

    fetchURL: async (params) => {
        try {
            // Include the id in the API request URL
            const response = await inventory_api.get(`/${params.url}`);
            return response.data;
          } catch (error) {
            console.error("Error fetching inventory:", error.message);
          }
    },
    getLastSynced: async()=>{
        try {
            const response = await inventory_api.get(`/${API.GET_LASTSYNCED}`);
            set({ lastSynced: response.data.data });
            return response.data;
          } catch (error) {
            console.error("Error fetching inventory:", error.message);
          }
    }
}))

export default useFetchHook;