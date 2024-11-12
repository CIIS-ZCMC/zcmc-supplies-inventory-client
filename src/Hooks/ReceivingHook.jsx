import { create } from "zustand";
import axios from "axios";
import * as Yup from 'yup';

import { BASE_URL, PATH } from '../Services/API'

const { RECEIVING, STOCKIN } = PATH

const useReceivingHook = create((set) => ({

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

    //fetch the fata of stock into / receiving list
    getStockIn: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/${RECEIVING}`);
            return response.data
        } catch (error) {
            error.message;
        }
    },

    // Create stock in with POST request
    createStockIn: async (formData) => {
        try {
            const response = await axios.post(`${BASE_URL}/${STOCKIN}`, formData);
            return response.data;
        } catch (error) {
            console.error("Error creating stock out:", error.message);
            throw error;
        }
    }


}));

export default useReceivingHook