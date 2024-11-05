import { create } from "zustand";
import axios from "axios";

import { BASE_URL, PATH } from '../Services/API'

const { AREAS } = PATH

const useAreasHook = create((set) => ({

    getAreas: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/${AREAS}`);
            return response.data
        } catch (error) {
            error.message;
        }
    },
}));

export default useAreasHook