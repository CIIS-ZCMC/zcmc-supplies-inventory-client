import { create } from "zustand";
import axios from "axios";

import { BASE_URL, API } from '../Services/Config'

const useSuppliersHook = create((set) => ({

    getSuppliers: async () => {
        try {
            const response = await axios.get(`${BASE_URL.development}/${API.SUPPLIERS}`);
            return response.data
        } catch (error) {
            error.message;
        }
    },
}));

export default useSuppliersHook