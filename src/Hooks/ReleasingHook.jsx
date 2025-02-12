import { create } from "zustand";
import axios from "axios";
import * as Yup from 'yup';

import { API, BASE_URL } from "../Services/Config";

const useReleasingHook = create((set) => ({

    initialValues: {
        itemName: '',
        source: '',
        area: '',
        risDate: '',
        risNumber: '',
        transactionType: 'Stock-out',
        // category: '',
        quantityRequested: '',
        quantityServed: '',
        remarks: '',
    },

    resetForm: () => {
        set(initialValues)
    },

    validationSchema: Yup.object({
        itemName: Yup.string().required('Item Name is required'),
        source: Yup.string().required('Source is required'),
        area: Yup.string().required('Area is required'),
        risDate: Yup.date().required('Date is required'),
        risNumber: Yup.string().required('RIS number is required'),
        // category: Yup.string().required('Category is required'),
        quantityRequested: Yup.number().required('Quantity Requested is required'),
        quantityServed: Yup.number().required('Quantity Served is required'),
    }),


    // Store quantity per source_id
    brandQuantities: {},

    // Function to set quantity for a specific source_id
    setBrandQuantity: (source_id, quantity) =>
        set((state) => ({
            brandQuantities: { ...state.brandQuantities, [source_id]: quantity },
        })),


    //fetch the fata of stock out / releasing list
    getStockOut: async () => {
        try {
            // console.log(`${BASE_URL}/${RELEASING}`)
            const response = await axios.get(`${BASE_URL.development}/${API.RELEASING}`);
            return response.data
        } catch (error) {
            error.message;
        }
    },

    getSelectedReleasingList: async (id) => {
        try {
            const response = await axios.get(`${BASE_URL.development}/${API.SELECTED_RELEASING_LIST}/${id}`);
            return response.data
        } catch (error) {
            error.message;
        }
    },

    // Create stock out with POST request
    createStockOut: async (formData) => {
        try {
            const response = await axios.post(`${BASE_URL.development}/${API.STOCKOUT}`, formData);
            return response.data;
        } catch (error) {
            console.error("Error creating stock out:", error.message);
            throw error;
        }
    },

    // Fetch brand regular and update quantity state
    getBrandRegular: async (id) => {
        try {
            const response = await axios.get(`${BASE_URL.development}/${API.BRAND_REGULAR}/${id}`);
            const brandData = response.data;

            if (brandData?.source_id) {
                set((state) => ({
                    brandQuantities: {
                        ...state.brandQuantities,
                        [brandData.source_id]: brandData.quantity || 0
                    }
                }));
            }
            return brandData;
        } catch (error) {
            console.error(error.message);
        }
    },

    // Fetch brand donation and update quantity state
    getBrandDonation: async (id) => {
        try {
            const response = await axios.get(`${BASE_URL.development}/${API.BRAND_DONATION}/${id}`);
            const brandData = response.data;

            if (brandData?.source_id) {
                set((state) => ({
                    brandQuantities: {
                        ...state.brandQuantities,
                        [brandData.source_id]: brandData.quantity || 0
                    }
                }));
            }
            return brandData;
        } catch (error) {
            console.error(error.message);
        }
    },


}));

export default useReleasingHook