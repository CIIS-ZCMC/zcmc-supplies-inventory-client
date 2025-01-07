import { create } from "zustand";
import axios from "axios";
import * as Yup from "yup";

import { BASE_URL, API } from "../Services/Config";

const useReceivingHook = create((set) => ({
  initialValues: {
    itemName: "",
    source: "",
    quantity: "",
    poNumber: "",
    iarNumber: "",
    dateDelivered: null,
    expiryDate: null,
    brand: "",
    supplier: "",
  },

  validationSchema: Yup.object({
    itemName: Yup.string().required("Item Name is required"),
    source: Yup.string().required("Source is required"),
    quantity: Yup.number().required("Quantity is required"),
    poNumber: Yup.number().required("PO Number is required"),
    iarNumber: Yup.string().required("IAR Number is required"),
    dateDelivered: Yup.date().required("Delivery Date is required"),
    expiryDate: Yup.mixed()
      .nullable()
      .test(
        "valid-expiry-date",
        'Please select a valid expiry date or "N/A"',
        (value) =>
          value === null || value === "N/A" || Yup.date().isValidSync(value)
      )
      .required("Expiry Date is required"),
    brand: Yup.string().required("Brand is required"),
    supplier: Yup.string().required("Supplier is required"),
  }),

  validationSchema: Yup.object({
    itemName: Yup.string().required("Item Name is required"),
    source: Yup.string().required("Source is required"),
    quantity: Yup.number().required("Quantity is required"),
    poNumber: Yup.string()
      .nullable()
      .test("po-number-required", "PO Number is required", function (value) {
        const { source } = this.parent; // Access other formik values
        return source === "2" || value !== undefined; // If source is 2, PO Number is not required
      }),
    iarNumber: Yup.string().required("IAR Number is required"),
    dateDelivered: Yup.date().required("Delivery Date is required"),
    expiryDate: Yup.mixed()
      .nullable()
      .test(
        "valid-expiry-date",
        'Please select a valid expiry date or "N/A"',
        (value) =>
          value === null || value === "N/A" || Yup.date().isValidSync(value)
      )
      .required("Expiry Date is required"),
    brand: Yup.string().required("Brand is required"),
    supplier: Yup.string().required("Supplier is required"),
  }),

  //fetch the fata of stock into / receiving list
  getStockIn: async () => {
    try {
      const response = await axios.get(
        `${BASE_URL.production}/${API.RECEIVING}`
      );
      return response.data;
    } catch (error) {
      error.message;
    }
  },

  // Create stock in with POST request
  createStockIn: async (formData) => {
    try {
      const response = await axios.post(
        `${BASE_URL.production}/${API.STOCKIN}`,
        formData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating stock out:", error.message);
      throw error;
    }
  },

  // Create stock in with POST request
  createStockIn: async (formData) => {
    try {
      const response = await axios.post(
        `${BASE_URL.production}/${API.STOCKIN}`,
        formData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating stock out:", error.message);
      throw error;
    }
  },
}));

export default useReceivingHook;
