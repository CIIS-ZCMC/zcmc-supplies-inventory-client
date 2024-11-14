import { create } from "zustand";
import axios from "axios";
import * as Yup from 'yup';

import { API, BASE_URL } from "../Services/Config";

const useAreasHook = create((set) => ({

  initialValues: {
    areaName: '',
  },

  validationSchema: Yup.object({
    areaName: Yup.string().required('Area Name is required'),
  }),

  // Method to reset initial values
  setInitialValues: () => set({
    initialValues: { areaName: '' }
  }),

  getAreas: async () => {
    try {
      const response = await axios.get(`${BASE_URL.development}/${API.AREAS}`);
      return response.data;
    } catch (error) {
      error.message;
    }
  },

  // Create Area in with POST request
  createArea: async (formData) => {
    try {
      const response = await axios.post(`${BASE_URL.development}/${API.AREA_STORE}`, formData);
      return response.data;
    } catch (error) {
      console.error("Error creating area:", error.message);
      throw error;
    }
  }

}));

export default useAreasHook;
