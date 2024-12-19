import { create } from "zustand";
import axios from "axios";
import * as Yup from "yup";

import { API, BASE_URL } from "../Services/Config";

const useAreasHook = create((set) => ({
  initialValues: {
    id: null,
    areaName: "",
  },

  validationSchema: Yup.object({
    areaName: Yup.string().required("Area Name is required"),
  }),

  // Method to reset initial values
  setInitialValues: (values) => {
    if (values === null || values === undefined) {
      return set({
        initialValues: { id: null, areaName: "" },
      });
    }

    console.log(values.area_name);

    set({
      initialValues: { id: values.id, areaName: values.area_name },
    });
  },

  getAreas: async () => {
    try {
      const response = await axios.get(`${BASE_URL.development}/${API.AREAS}`);
      return response.data;
    } catch (error) {
      error.message;
    }
  },

  getArea: async (id) => {
    try {
      const response = await axios.get(
        `${BASE_URL.development}/${API.AREA_SHOW}/${id}`
      );
      return response.data;
    } catch (error) {
      error.message;
    }
  },

  // Create Area in with POST request
  createArea: async (formData) => {
    try {
      const response = await axios.post(
        `${BASE_URL.development}/${API.AREA_STORE}`,
        formData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating area:", error.message);
      throw error;
    }
  },

  // Update Area with PUT or PATCH request
  updateArea: async (id, formData) => {
    try {
      const response = await axios.post(
        `${BASE_URL.development}/${API.AREA_UPDATE}/${id}`,
        formData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating area:", error.message);
      throw error;
    }
  },
}));

export default useAreasHook;
