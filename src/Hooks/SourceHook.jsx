import { create } from "zustand";
import axios from "axios";

import { BASE_URL, PATH } from '../Services/API'

const { SOURCES } = PATH

const useSourceHook = create((set) => ({

    getSources: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/${SOURCES}`);
            return response.data
        } catch (error) {
            error.message;
        }
    },
}));

export default useSourceHook