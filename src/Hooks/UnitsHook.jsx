import { create } from "zustand";
import axios from "axios";
import * as Yup from "yup";
import { BASE_URL, API } from "../Services/Config";

const useUnitsHook = create((set) => ({
  initialValues: {
    unitName: "",
  },

  validationSchema: Yup.object({
    unitName: Yup.string().required("Unit name is required"),
  }),

  getUnits: async () => {
    try {
      const response = await axios.get(`${BASE_URL.production}/${API.UNITS}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      error.message;
    }
  },

  // Create Area in with POST request
  createUnit: async (formData) => {
    try {
      const response = await axios.post(
        `${BASE_URL.production}/${API.UNIT_STORE}`,
        formData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating unit:", error.message);
      throw error;
    }
  },
}));

export default useUnitsHook;
