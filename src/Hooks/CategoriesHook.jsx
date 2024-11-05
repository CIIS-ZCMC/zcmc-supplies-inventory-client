import { create } from "zustand";
import axios from "axios";

import { BASE_URL, PATH } from '../Services/API'

const { CATEGORIES } = PATH

const useCategoriesHook = create((set) => ({

    getCategories: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/${CATEGORIES}`);
            return response.data
        } catch (error) {
            error.message;
        }
    },
}));

export default useCategoriesHook