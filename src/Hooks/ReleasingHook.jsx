import { create } from "zustand";
import axios from "axios";

import { BASE_URL, PATH } from '../Services/API'

const { RELEASING } = PATH

const useReleasingHook = create((set) => ({


    //fetch the fata of stock out / releasing list
    getStockOut: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/${RELEASING}`);
            return response.data
        } catch (error) {
            error.message;
        }
    },

    // Create stock out with POST request
    createStockOut: async (stockOutData) => {
        try {
            const response = await axios.post(`${BASE_URL}/${RELEASING}`, stockOutData);
            return response.data;
        } catch (error) {
            console.error("Error creating stock out:", error.message);
            throw error;
        }
    }


}));

export default useReleasingHook