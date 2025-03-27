import { create } from "zustand";
import axios from "axios";
import * as Yup from "yup";

import { BASE_URL, API } from "../Services/Config";

const useSuppliersHook = create((set) => ({
  // ✅ Initial Form Values
  initialValues: {
    supplierName: "",
    email: "",
    prcontactperson: "",
    prtelno: "",
    prfaxno: "",
    premail: "",
    prstreetbldg1: "",
    praddress: "",
    prcountry: "Philippines", // Default to Philippines
  },

  // ✅ Validation Schema
  validationSchema: Yup.object({
    supplierName: Yup.string().required("Supplier name is required"),
    email: Yup.string().email("Invalid email format").nullable(), // Optional but must be a valid email
  }),

  // ✅ Method to reset form values
  setInitialValues: (values) => {
    if (!values) {
      return set({
        initialValues: {
          id: null,
          supplierName: null,
        },
      });
    }

    set({
      initialValues: {
        id: values.id,
        supplierName: values.supplier_name,
        email: values.email || "",
        prcontactperson: values.prcontactperson || "",
        prtelno: values.prtelno || "",
        prfaxno: values.prfaxno || "",
        premail: values.premail || "",
        prstreetbldg1: values.prstreetbldg1 || "",
        praddress: values.praddress || "",
        prcountry: values.prcountry || "Philippines",
      },
    });
  },

  // ✅ Fetch All Suppliers
  getSuppliers: async () => {
    try {
      const response = await axios.get(
        `${BASE_URL.development}/${API.SUPPLIERS}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching suppliers:", error.message);
      throw error;
    }
  },

  // ✅ Fetch Single Supplier by ID
  getSupplier: async (id) => {
    try {
      const response = await axios.get(
        `${BASE_URL.development}/${API.SUPPLIER_SHOW}/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching supplier:", error.message);
      throw error;
    }
  },

  // ✅ Create a New Supplier
  createSupplier: async (formData) => {
    try {
      const response = await axios.post(
        `${BASE_URL.development}/${API.SUPPLIER_STORE}`,
        formData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating supplier:", error.message);
      throw error;
    }
  },

  // ✅ Update an Existing Supplier
  updateSupplier: async (id, formData) => {
    try {
      const response = await axios.post(
        `${BASE_URL.development}/${API.SUPPLIER_UPDATE}/${id}`,
        formData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating supplier:", error.message);
      throw error;
    }
  },
}));

export default useSuppliersHook;
