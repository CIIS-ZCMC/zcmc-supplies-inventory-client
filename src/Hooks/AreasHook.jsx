import { create } from "zustand";
import axios from "axios";

import { API, BASE_URL } from "../Services/Config";

const useAreasHook = create((set) => ({
  getAreas: async () => {
    try {
      const response = await axios.get(`${BASE_URL.development}/${API.AREAS}`);
      return response.data;
    } catch (error) {
      error.message;
    }
  },
}));

export default useAreasHook;
