import { create } from "zustand";
import axios from "axios";
import * as Yup from 'yup'
import { API, BASE_URL } from "../Services/Config";

const useSourceHook = create((set) => ({

  initialValues: {
    sourceName: '',
  },

  validationSchema: Yup.object({
    sourceName: Yup.string().required('Source name is required'),
  }),

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

  // Create Area in with POST request
  createSource: async (formData) => {
    try {
      const response = await axios.post(`${BASE_URL.development}/${API.SOURCE_STORE}`, formData);
      return response.data;
    } catch (error) {
      console.error("Error creating Source:", error.message);
      throw error;
    }
  }

}));

export default useSourceHook;
