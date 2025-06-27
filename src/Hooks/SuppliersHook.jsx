import { create } from "zustand";
import * as Yup from "yup";
import inventory_api from "../Services/ApiName";
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
  PO_result: [],
  supplierData: [],
  dashboardData: [],
  PR_result: [],
  CAF_list: [],
  suppliersList: [],
  HasCaf: [],
  nextCaf: null,
  DeliveredList: [],

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

  getSupplierDeliveredList: async (id) => {
    try {
      const response = await inventory_api.get(
        `/${API.SUPPLIER_DELIVERED_LIST}/${id}`
      );
      set({ DeliveredList: response.data.data });
      return response.data;
    } catch (error) {
      console.error("Error fetching suppliers:", error.message);
      return error;
    }
  },

  // ✅ Fetch All Suppliers
  getSuppliers: async () => {
    try {
      const response = await inventory_api.get(`/${API.SUPPLIERS}`);
      set({ suppliersList: response.data.data });
      return response.data;
    } catch (error) {
      console.error("Error fetching suppliers:", error.message);
      throw error;
    }
  },

  setToAll: async (data) => {
    try {
      const response = await inventory_api.post(`/${API.APPLYTOALL}`, data);
      return response.data;
    } catch (error) {
      console.error("Error fetching suppliers:", error.message);
      throw error;
    }
  },
  // ✅ Fetch Single Supplier by ID
  getSupplier: async (id) => {
    try {
      const response = await inventory_api.get(`/${API.SUPPLIER_SHOW}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching supplier:", error.message);
      throw error;
    }
  },

  // ✅ Create a New Supplier
  createSupplier: async (formData) => {
    try {
      const response = await inventory_api.post(
        `/${API.SUPPLIER_STORE}`,
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
      const response = await inventory_api.post(
        `/${API.SUPPLIER_UPDATE}/${id}`,
        formData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating supplier:", error.message);
      throw error;
    }
  },

  fetchPOs: async (PO_number) => {
    try {
      const response = await inventory_api.get(`/${API.OPEN_PO}/${PO_number}`);
      set({ PO_result: response.data });
      return response.data;
    } catch (error) {
      console.error("Error fetching POs:", error.message);
      throw error;
    }
  },
  clearPOResult: () => set({ PO_result: [] }),
  UpdatePos: async (id, formData) => {
    try {
      const response = await inventory_api.post(
        `/${API.UPDATE_PO}/${id}`,
        formData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating PO:", error.message);
      throw error;
    }
  },

  getPODashboard: async () => {
    try {
      const response = await inventory_api.get(`/${API.PO_DASHBOARD}`);
      set({ dashboardData: response.data.data });
      return response.data;
    } catch (error) {
      console.error("Error fetching PO dashboard:", error.message);
      throw error;
    }
  },
  getPOSRecords: async (type) => {
    try {
      const response = await inventory_api.get(`/${API.PO_RECORDS}/${type}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching PO dashboard:", error.message);
      throw error;
    }
  },
  getSuppliersPerformanceRatings: async () => {
    try {
      const response = await inventory_api.get(`/${API.SUPPLIERS_PERFORMANCE}`);

      console.log(response.data);
      set({ supplierData: response.data });
      return response.data;
    } catch (error) {
      console.error("Error fetching PO dashboard:", error.message);
      throw error;
    }
  },

  getPRrecords: async (PR) => {
    try {
      const response = await inventory_api.get(`/${API.PR_RECORDS}/${PR}`);
      set({
        PR_result: response.data.data,
        HasCaf: response.data.Caf,
        nextCaf: response.data.nextCaf,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching PO dashboard:", error.message);
      throw error;
    }
  },
  storeCAF: async (data) => {
    try {
      const response = await inventory_api.post(`/${API.CAf_Store}`, data);
      return response.data;
    } catch (error) {
      console.error("Error fetching PO dashboard:", error.message);
      throw error;
    }
  },
  getCAF: async () => {
    try {
      const response = await inventory_api.get(`/${API.GETCAF}`);
      set({ CAF_list: response.data.data });
      return response.data;
    } catch (error) {
      console.error("Error fetching PO dashboard:", error.message);
      throw error;
    }
  },
}));

export default useSuppliersHook;
