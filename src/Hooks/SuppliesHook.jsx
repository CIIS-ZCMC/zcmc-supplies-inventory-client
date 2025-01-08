import { create } from "zustand";
import axios from "axios";
import * as Yup from 'yup';
import { BASE_URL, API } from "../Services/Config";

const useSuppliesHook = create((set) => ({

    initialValues: {
        id: null,
        supplyName: '',
        category: '',
        unit: '',
    },

    validationSchema: Yup.object({
        supplyName: Yup.string().required('Supply name is required'),
        category: Yup.string().required('Category is required'),
        unit: Yup.string().required('Unit is required'),
    }),

    // Method to reset initial values
    setInitialValues: (values) => {
        if (values === null || values === undefined) {
            return set({
                initialValues: {
                    id: null,
                    supplyName: "",
                    category: "",
                    unit: "",
                },
            });
        }
        set({
            initialValues: {
                id: values.id,
                supplyName: values.supply_name,
                category: values.category_name,
                unit: values.unit_name,
            },
        });
    },

    getSupplies: async () => {
        try {
            const response = await axios.get(`${BASE_URL.development}/${API.SUPPLIES}`);
            return response.data
        } catch (error) {
            error.message;
        }
    },

    getSupply: async (id) => {
        try {
            const response = await axios.get(
                `${BASE_URL.development}/${API.SUPPLY_SHOW}/${id}`
            );
            return response.data;
        } catch (error) {
            error.message
        }
    },

    // Create Area in with POST request
    createSupply: async (formData) => {
        try {
            const response = await axios.post(`${BASE_URL.development}/${API.SUPPLY_STORE}`, formData);
            return response.data;
        } catch (error) {
            console.error("Error creating unit:", error.message);
            throw error;
        }
    },

    // Update with PUT or PATCH request
    updateSupply: async (id, formData) => {
        try {
            const response = await axios.post(
                `${BASE_URL.development}/${API.SUPPLY_UPDATE}/${id}`,
                formData
            );
            return response.data;
        } catch (error) {
            console.error("Error updating supply:", error.message);
            throw error;
        }
    },
}));

export default useSuppliesHook