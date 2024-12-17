import { create } from "zustand";
import axios from "axios";
import * as Yup from "yup";
import { BASE_URL, API } from "../Services/Config";

const useBrandsHook = create((set) => ({
  initialValues: {
    brandName: "",
  },

  validationSchema: Yup.object({
    brandName: Yup.string().required("Brand name is required"),
  }),

  getBrands: async () => {
    try {
      const response = await axios.get(`${BASE_URL.production}/${API.BRANDS}`);
      return response.data;
    } catch (error) {
      error.message;
    }
  },

  // Create Area in with POST request
  createBrand: async (formData) => {
    try {
      const response = await axios.post(
        `${BASE_URL.production}/${API.BRAND_STORE}`,
        formData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating brands:", error.message);
      throw error;
    }
  },
}));

export default useBrandsHook;
