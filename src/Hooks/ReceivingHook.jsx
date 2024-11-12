import { create } from "zustand";
import axios from "axios";
import * as Yup from 'yup';

import { BASE_URL, API } from '../Services/Config'

const useReceivingHook = create((set) => ({

    initialValues: {
        itemName: '',
        source: '',
        quantity: '',
        poNumber: '',
        iarNumber: '',
        dateDelivered: null,
        expiryDate: null,
        brand: '',
        supplier: '',
    },

    validationSchema: Yup.object({
        itemName: Yup.string().required('Item Name is required'),
        source: Yup.string().required('Source is required'),
        quantity: Yup.number().required('Quantity is required'),
        poNumber: Yup.number().required('PO Number is required'),
        iarNumber: Yup.string().required('IAR Number is required'),
        dateDelivered: Yup.date().required('Delivery Date is required'),
        expiryDate: Yup.date().required('Expiry Date is required'),
        brand: Yup.string().required('Brand is required'),
        supplier: Yup.string().required('Supplier is required'),
    }),

    //fetch the fata of stock into / receiving list
    getStockIn: async () => {
        try {
            const response = await axios.get(`${BASE_URL.development}/${API.RECEIVING}`);
            return response.data
        } catch (error) {
            error.message;
        }
    },

    // Create stock in with POST request
    createStockIn: async (formData) => {
        try {
            const response = await axios.post(`${BASE_URL.development}/${API.STOCKIN}`, formData);
            return response.data;
        } catch (error) {
            console.error("Error creating stock out:", error.message);
            throw error;
        }
    }


}));

export default useReceivingHook