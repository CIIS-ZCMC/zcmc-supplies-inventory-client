import { create } from "zustand";
import axios from "axios";

import { API, BASE_URL } from "../Services/Config";

const useSourceHook = create((set) => ({
  getSources: async () => {
    try {
      const response = await axios.get(
        `${BASE_URL.development}/${API.SOURCES}`
      );
      return response.data;
    } catch (error) {
      error.message;
    }
  },
}));

export default useSourceHook;
