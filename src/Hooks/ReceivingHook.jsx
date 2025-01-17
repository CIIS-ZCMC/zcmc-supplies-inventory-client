import { create } from "zustand";
import axios from "axios";
import * as Yup from 'yup';

import { BASE_URL, API } from '../Services/Config'

const useReceivingHook = create((set) => ({

    initialValues: {
        id: null,
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
        poNumber: Yup.string()
            .nullable()
            .test(
                'po-number-required',
                'PO Number is required',
                function (value) {
                    const { source } = this.parent; // Access other formik values
                    return source === '2' || value !== undefined; // If source is 2, PO Number is not required
                }
            ),
        iarNumber: Yup.string().required('IAR Number is required'),
        dateDelivered: Yup.date().required('Delivery Date is required'),
        expiryDate: Yup.mixed().nullable().test(
            'valid-expiry-date',
            'Please select a valid expiry date or "N/A"',
            (value) => value === null || value === 'N/A' || Yup.date().isValidSync(value)
        ).required('Expiry Date is required'),
        brand: Yup.string().required('Brand is required'),
        supplier: Yup.string().required('Supplier is required'),
    }),

    // Method to reset initial values
    setInitialValues: (values) => {

        if (values === null || values === undefined) {
            return set({
                initialValues: {
                    id: null,
                    itemName: '',
                    brand: '',
                    source: '',
                    supplier: '',
                    quantity: '',
                    poNumber: '',
                    iarNumber: '',
                    dateDelivered: null,
                    expiryDate: null,
                },
            });
        }

        set({
            initialValues: {
                id: values.id,
                itemName: values.supply_name,
                source: values.source_name,
                quantity: values.quantity,
                poNumber: values.purchase_order_no,
                iarNumber: values.iar_no,
                dateDelivered: values?.delivery_date,
                expiryDate: values.expiry_date,
                brand: values.brand_name,
                supplier: values.supplier_name,
            }
        })
    },

    //fetch the fata of stock into / receiving list
    getStockIn: async () => {
        try {
            const response = await axios.get(`${BASE_URL.development}/${API.RECEIVING}`);
            return response.data
        } catch (error) {
            error.message;
        }
    },

    getStockInDetails: async (id) => {
        try {
            const response = await axios.get(`${BASE_URL.development}/${API.STOCK_IN_DETAILS}/${id}`);
            return response.data;
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
    },

    // Update with PUT or PATCH request
    updateStockIn: async (id, formData) => {
        try {
            const response = await axios.post(
                `${BASE_URL.development}/${API.STOCK_IN_UPDATE}/${id}`,
                formData
            );
            return response.data;
        } catch (error) {
            console.error("Error updating supply:", error.message);
            throw error;
        }
    },

}));

export default useReceivingHook