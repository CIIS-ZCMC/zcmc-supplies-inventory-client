import { create } from "zustand";
import axios from "axios";
import * as Yup from 'yup';

import { BASE_URL, API } from '../Services/Config'

const useSuppliersHook = create((set) => ({

    initialValues: {
        id: null,
        supplierName: '',
    },

    validationSchema: Yup.object({
        supplierName: Yup.string().required('Supplier name is required'),
    }),

    // Method to reset initial values
    setInitialValues: (values) => {
        if (values === null || values === undefined) {
            return set({
                initialValues: { id: null, supplierName: "" },
            });
        }

        set({
            initialValues: { id: values.id, supplierName: values.supplier_name },
        });
    },


    getSuppliers: async () => {
        try {
            const response = await axios.get(`${BASE_URL.development}/${API.SUPPLIERS}`);
            return response.data
        } catch (error) {
            error.message;
        }
    },

    getSupplier: async (id) => {
        try {
            const response = await axios.get(
                `${BASE_URL.development}/${API.SUPPLIER_SHOW}/${id}`
            );
            return response.data;
        } catch (error) {
            error.message
        }
    },

    // Create in with POST request
    createSupplier: async (formData) => {
        try {
            const response = await axios.post(`${BASE_URL.development}/${API.SUPPLIER_STORE}`, formData);
            return response.data;
        } catch (error) {
            console.error("Error creating brands:", error.message);
            throw error;
        }
    },

    // Update with PUT or PATCH request
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

export default useSuppliersHook