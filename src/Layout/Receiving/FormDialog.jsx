import { useMemo, useEffect, useState } from 'react';
import { Box, Stack, Grid, Divider, Checkbox, Typography } from "@mui/joy";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useFormik } from 'formik';

// Custom Components
import AutoCompleteComponent from "../../Components/Form/AutoCompleteComponent";
import InputComponent from "../../Components/Form/InputComponent";
import DatePickerComponent from '../../Components/Form/DatePickerComponent';
import ButtonComponent from '../../Components/ButtonComponent';
import TextAreaComponent from '../../Components/Form/TextAreaComponent';

// hooks
import useSourceHook from '../../Hooks/SourceHook';
import useSuppliesHook from '../../Hooks/SuppliesHook';
import useSuppliersHook from '../../Hooks/SuppliersHook';
import useBrandsHook from '../../Hooks/BrandsHook';
import useReceivingHook from '../../Hooks/ReceivingHook';

const FormDialog = ({ handleDialogClose, setSnackbar }) => {

    const queryClient = useQueryClient()

    // Hooks for data fetching functions
    const { getSuppliers } = useSuppliersHook(); //change this into brand
    const { getBrands } = useBrandsHook(); //change this int o suppliers
    const { getSources } = useSourceHook();
    const { getSupplies } = useSuppliesHook();

    const { initialValues, validationSchema, createStockIn, } = useReceivingHook();

    // Array of queries to manage multiple fetching in a cleaner way
    const queryConfigs = [
        { key: 'supplies', fn: getSupplies },
        { key: 'sources', fn: getSources },
        { key: 'brands', fn: getBrands },
        { key: 'suppliers', fn: getSuppliers },
    ];

    const queries = queryConfigs.map(({ key, fn }) =>
        useQuery({ queryKey: [key], queryFn: fn })
    );

    // Destructure data and loading states from queries for cleaner access
    const [
        { data: suppliesData, isLoading: isSuppliesLoading },
        { data: sourcesData, isLoading: isSourcesLoading },
        { data: brandsData, isLoading: isBrandsLoading },
        { data: suppliersData, isLoading: isSuppliersLoading },
    ] = queries;

    // Helper function for mapping options
    const mapOptions = (data, labelKey) =>
        data?.map(item => ({ label: item[labelKey], id: item.id })) || [];

    // Memoized options to avoid recalculating on every render
    const suppliesOptions = useMemo(() => mapOptions(suppliesData?.data, 'name'), [suppliesData]);
    const sourcesOptions = useMemo(() => mapOptions(sourcesData?.data, 'source_name'), [sourcesData]);
    const brandsOptions = useMemo(() => mapOptions(brandsData?.data, 'brand_name'), [brandsData]);
    const suppliersOptions = useMemo(() => mapOptions(suppliersData?.data, 'supplier_name'), [suppliersData]);

    // Define create the mutation for stockout
    const mutation = useMutation({
        mutationFn: createStockIn,
        onSuccess: () => {
            // Only show success notification and close dialog after mutation is successful
            setSnackbar({ open: true, color: 'success', message: 'Stockin Success' })
            queryClient.invalidateQueries('stockin');

            // Reset Formik form values after submission
            formik.resetForm(); // Reset form to initial values

        },
        onError: (error) => {
            setSnackbar({ open: true, color: 'danger', message: `${error}` })
            console.error("Error stockin form:", error);
        },
        onSettled: () => {
            // Always close the dialog after the mutation is finished (whether successful or error)
            handleDialogClose();
        }
    });

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            console.log(values)

            // Create a new FormData object
            const formData = new FormData();

            // Map formik values to the expected API field names
            formData.append("supplies_masterlist_id", values.itemName);
            formData.append("brand_id", values.brand);
            formData.append("source_id", values.source);
            formData.append("supplier_id", values.supplier);
            formData.append("expiration_date", values.expiryDate === "N/A" ? "" : expiryDate);
            formData.append("quantity", values.quantity);
            formData.append("delivery_date", values.dateDelivered);
            formData.append("purchase_order_no", values.poNumber);
            formData.append("iar_no", values.iarNumber);

            // Log all FormData entries to the console for testing only 
            // for (let [key, value] of formData.entries()) {
            //     console.log(`${key}: ${value}`);
            // }

            // Send formData to the API
            await mutation.mutate(formData); // Assuming this is your API call function
            // console.log("Form submitted successfully",);

        }
    })

    // useEffect(() => {
    //     console.log("Current form values:", formik.values);
    // }, [formik.values]);

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Box>

                    <Grid container spacing={2}>
                        <Grid xs={12}>
                            {/* Supplies Autocomplete */}
                            <AutoCompleteComponent
                                name={'itemName'}
                                placeholder="Search Item..."
                                label="Item Name"
                                options={suppliesOptions}
                                loading={isSuppliesLoading}
                                value={suppliesOptions.find(option => option.id === formik.values.itemName) || null}
                                onChange={(event, value) => formik.setFieldValue("itemName", value ? value.id : '')}
                                error={formik.touched.itemName && Boolean(formik.errors.itemName)}
                                helperText={formik.touched.itemName && formik.errors.itemName}
                                fullWidth={true}
                            />

                            <Stack mt={2}>
                                <Typography level="body-sm">
                                    Item’s name and type of unit is combined and derived from your Dynamic Library to speed-up form fill-up and prevent typographical errors on input.
                                </Typography>
                            </Stack>

                        </Grid>

                        <Grid xs={12} md={6}>
                            <AutoCompleteComponent
                                name={'source'}
                                placeholder="Search source..."
                                label="Source"
                                options={sourcesOptions}
                                loading={isSourcesLoading}
                                value={sourcesOptions.find(option => option.id === formik.values.source) || null}
                                onChange={(event, value) => formik.setFieldValue("source", value ? value.id : '')}
                                error={formik.touched.source && Boolean(formik.errors.source)}
                                helperText={formik.touched.source && formik.errors.source}
                                fullWidth={true}
                            />
                        </Grid>

                        <Grid xs={12} md={6}>
                            <InputComponent
                                name={'quantity'}
                                size='lg'
                                label="Quantity"
                                placeholder="xxx.xxx"
                                fullWidth={true}
                                value={formik.values.quantity}
                                onChange={formik.handleChange}
                                error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                                helperText={formik.touched.quantity && formik.errors.quantity}
                            />
                        </Grid>

                        <Grid xs={12} md={6}>
                            <InputComponent
                                size='lg'
                                label="PO Number"
                                placeholder="xxx.xxx"
                                fullWidth={true}
                                name={'poNumber'}
                                value={formik.values.poNumber}
                                onChange={formik.handleChange}
                                error={formik.touched.poNumber && Boolean(formik.errors.poNumber)}
                                helperText={formik.touched.poNumber && formik.errors.poNumber}
                            />
                        </Grid>

                        <Grid xs={12} md={6}>
                            <InputComponent
                                size='lg'
                                label="IAR Number"
                                placeholder="xxx.xxx"
                                fullWidth={true}
                                name={'iarNumber'}
                                value={formik.values.iarNumber}
                                onChange={formik.handleChange}
                                error={formik.touched.iarNumber && Boolean(formik.errors.iarNumber)}
                                helperText={formik.touched.iarNumber && formik.errors.iarNumber}
                            />
                        </Grid>

                        <Grid xs={12} md={6}>
                            <DatePickerComponent
                                name={"dateDelivered"}
                                label="Date Delivered"
                                placeholder="xxxx.xx.xx"
                                value={formik.values.dateDelivered}
                                onChange={(date) => formik.setFieldValue("dateDelivered", date)}
                                error={formik.touched.dateDelivered && Boolean(formik.errors.dateDelivered)}
                                helperText={formik.touched.dateDelivered && formik.errors.dateDelivered}
                            />
                        </Grid>

                        <Grid xs={12} md={6}>
                            <DatePickerComponent
                                name="expiryDate"
                                label="Expiry Date"
                                placeholder="xxxx.xx.xx"
                                value={formik.values.expiryDate === "N/A" ? null : formik.values.expiryDate} // Show no date when "N/A"
                                onChange={(date) => formik.setFieldValue("expiryDate", date)}
                                error={formik.touched.expiryDate && Boolean(formik.errors.expiryDate)}
                                helperText={formik.touched.expiryDate && formik.errors.expiryDate}
                            />

                            {/* Checkbox for No Expiry Date */}
                            <Checkbox
                                label="No Expiry Date (N/A)"
                                checked={formik.values.expiryDate === "N/A"}
                                onChange={(e) =>
                                    formik.setFieldValue("expiryDate", e.target.checked ? "N/A" : null)
                                }
                                size="lg"
                                sx={{
                                    mt: 1,
                                    color: "primary.500",
                                    "&.Mui-checked": {
                                        color: "primary.700",
                                    },
                                }}
                            >
                                No Expiry Date (N/A)
                            </Checkbox>


                        </Grid>

                        <Grid xs={12} md={6}>
                            <AutoCompleteComponent
                                name={'brand'}
                                placeholder="Search brands..."
                                label="Brand"
                                options={brandsOptions} // Include "No Brand" in options
                                loading={isBrandsLoading}
                                value={brandsOptions.find(option => option.id === formik.values.brand)}
                                onChange={(event, value) =>
                                    formik.setFieldValue("brand", value ? value.id : null)
                                }
                                error={formik.touched.brand && Boolean(formik.errors.brand)}
                                helperText={formik.touched.brand && formik.errors.brand}
                                fullWidth={true}
                            />

                        </Grid>

                        <Grid xs={12} md={6}>
                            <AutoCompleteComponent
                                name={'supplier'}
                                placeholder="Search supplier..."
                                label="Supplier"
                                options={suppliersOptions}
                                loading={isSuppliersLoading}
                                value={suppliersOptions.find(option => option.id === formik.values.supplier) || null}
                                onChange={(event, value) => formik.setFieldValue("supplier", value ? value.id : '')}
                                error={formik.touched.supplier && Boolean(formik.errors.supplier)}
                                helperText={formik.touched.supplier && formik.errors.supplier}
                                fullWidth={true}
                            />
                        </Grid>
                    </Grid>

                </Box>

                <Divider sx={{ marginY: 3 }} />  {/* Horizontal Divider */}

                <Stack direction={'row'} spacing={2}>
                    <ButtonComponent
                        label={'Cancel'}
                        variant="outlined"
                        color="danger"
                        onClick={handleDialogClose}
                        fullWidth
                    />
                    <ButtonComponent
                        type={'submit'}
                        variant="solid"
                        color={"primary"}
                        label={'Save'}
                        fullWidth
                        loading={mutation.isPending}
                    />
                </Stack>
            </form >

        </>
    );
};

export default FormDialog;
