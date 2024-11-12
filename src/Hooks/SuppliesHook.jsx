import { create } from "zustand";
import axios from "axios";

import { BASE_URL, PATH } from '../Services/API'

const { SUPPLIES } = PATH

const useSuppliesHook = create((set) => ({

    getSupplies: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/${SUPPLIES}`);
            return response.data
        } catch (error) {
            error.message;
        }
    },
}));

export default useSuppliesHook