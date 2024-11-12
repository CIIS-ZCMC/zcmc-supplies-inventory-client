import { create } from "zustand";
import axios from "axios";

import { BASE_URL, API } from '../Services/Config'

const useBrandsHook = create((set) => ({

    getBrands: async () => {
        try {
            const response = await axios.get(`${BASE_URL.development}/${API.BRANDS}`);
            return response.data
        } catch (error) {
            error.message;
        }
    },
}));

export default useBrandsHook