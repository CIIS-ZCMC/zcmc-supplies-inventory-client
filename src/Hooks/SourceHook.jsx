import { create } from "zustand";
import axios from "axios";

import { BASE_URL, PATH } from '../Services/API'

const { SOURCES } = PATH

const useSourceHook = create((set) => ({

    getSources: async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/releasing-list');
            response.data
        } catch (error) {
            error.message;
        }
    },
}));

export default useSourceHook