import { create } from "zustand";
import * as Yup from "yup";
import { API } from "../Services/Config";
import inventory_api from "../Services/ApiName";

const useBrandsHook = create((set) => ({
  initialValues: {
    id: null,
    brandName: "",
  },

  validationSchema: Yup.object({
    brandName: Yup.string().required("Brand name is required"),
  }),

  // Method to reset initial values
  setInitialValues: (values) => {
    if (values === null || values === undefined) {
      return set({
        initialValues: { id: null, brandName: "" },
      });
    }

    set({
      initialValues: { id: values.id, brandName: values.brand_name },
    });
  },

  getBrands: async () => {
    try {
      const response = await inventory_api.get(`/${API.BRANDS}`);

      return response.data;
    } catch (error) {
      error.message;
    }
  },

  getBrand: async (id) => {
    try {
      const response = await inventory_api.get(`/${API.AREA_SHOW}/${id}`);

      return response.data;
    } catch (error) {
      error.message;
    }
  },

  // Create Area in with POST request
  createBrand: async (formData) => {
    try {
      const response = await inventory_api.post(
        `/${API.BRAND_STORE}`,
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
