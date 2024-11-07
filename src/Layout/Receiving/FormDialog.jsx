import { useMemo, useEffect, useState } from 'react';
import { Box, Stack, Grid, Divider, Alert } from "@mui/joy";
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
import useAreasHook from '../../Hooks/AreasHook';
import useCategoriesHook from '../../Hooks/CategoriesHook';
import useSuppliesHook from '../../Hooks/SuppliesHook';

import useReleasingHook from "../../Hooks/ReleasingHook";

const FormDialog = ({ handleDialogClose, showSnackbar }) => {

    const queryClient = useQueryClient()

    // Hooks for data fetching functions
    const { getAreas } = useAreasHook();
    const { getSources } = useSourceHook();
    const { getCategories } = useCategoriesHook();
    const { getSupplies } = useSuppliesHook();
    const { createStockOut, initialValues, validationSchema } = useReleasingHook();

    // Array of queries to manage multiple fetching in a cleaner way
    const queryConfigs = [
        { key: 'supplies', fn: getSupplies },
        { key: 'sources', fn: getSources },
        { key: 'areas', fn: getAreas },
        { key: 'categories', fn: getCategories },
    ];

    const queries = queryConfigs.map(({ key, fn }) =>
        useQuery({ queryKey: [key], queryFn: fn })
    );

    // Destructure data and loading states from queries for cleaner access
    const [
        { data: suppliesData, isLoading: isSuppliesLoading },
        { data: sourcesData, isLoading: isSourcesLoading },
        { data: areasData, isLoading: isAreasLoading },
        { data: categoriesData, isLoading: isCategoriesLoading },
    ] = queries;

    // Helper function for mapping options
    const mapOptions = (data, labelKey) =>
        data?.map(item => ({ label: item[labelKey], id: item.id })) || [];

    // Memoized options to avoid recalculating on every render
    const suppliesOptions = useMemo(() => mapOptions(suppliesData?.data, 'name'), [suppliesData]);
    const sourcesOptions = useMemo(() => mapOptions(sourcesData?.data, 'source_name'), [sourcesData]);
    const areaOptions = useMemo(() => mapOptions(areasData?.data, 'area_name'), [areasData]);
    const categoriesOptions = useMemo(() => mapOptions(categoriesData?.data, 'category_name'), [categoriesData]);

    // Define create the mutation for stockout
    const mutation = useMutation({
        mutationFn: createStockOut,
        onSuccess: () => {
            ``
            // Only show success notification and close dialog after mutation is successful
            showSnackbar("Form submitted successfully", 'success'); // Show success notification
            queryClient.invalidateQueries('stocks');

            // Reset Formik form values after submission
            formik.resetForm(); // Reset form to initial values
        },
        onError: (error) => {
            console.error("Error submitting form:", error);
            showSnackbar("Failed to submit form", 'danger'); // Show error notification
        },
        onSettled: () => {
            // Always close the dialog after the mutation is finished (whether successful or error)
            handleCloseDialog();
        }
    });

    // Track if the mutation is loading
    const isSubmitting = mutation.isLoading;

    // Now you can use `isSubmitting` to disable the close button or prevent closing the dialog
    const handleCloseDialog = () => {
        if (!isSubmitting) {
            handleDialogClose(); // Close dialog only if mutation is not in progress
        }
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            // Create a new FormData object
            const formData = new FormData();

            // Map formik values to the expected API field names
            formData.append("supplies_masterlist_id", values.itemName);
            formData.append("quantity", values.quantityServed);
            formData.append("requested_quantity", values.quantityRequested);
            formData.append("transaction_type", values.transactionType);
            formData.append("ris_no", values.risNumber);
            formData.append("ris_date", values.risDate);
            formData.append("remarks", values.remarks);
            formData.append("area_id", values.area);
            formData.append("source_id", values.source);

            // Log all FormData entries to the console for testing only 
            // for (let [key, value] of formData.entries()) {
            //     console.log(`${key}: ${value}`);
            // }

            // Send formData to the API
            await mutation.mutate(formData); // Assuming this is your API call function
            console.log("Form submitted successfully",);

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
                        </Grid>

                        <Grid xs={12} md={6}>
                            <AutoCompleteComponent
                                name={'source'}
                                placeholder="Search source..."
                                label="Source"
                                options={sourcesOptions}
                                loading={isSourcesLoading}
                                value={suppliesOptions.find(option => option.id === formik.values.source) || null}
                                onChange={(event, value) => formik.setFieldValue("source", value ? value.id : '')}
                                error={formik.touched.source && Boolean(formik.errors.source)}
                                helperText={formik.touched.source && formik.errors.source}
                                fullWidth={true}
                            />
                        </Grid>

                        <Grid xs={12} md={6}>
                            <AutoCompleteComponent
                                name={'area'}
                                placeholder="Search area..."
                                label="Area"
                                options={areaOptions}
                                loading={isAreasLoading}
                                value={suppliesOptions.find(option => option.id === formik.values.area) || null}
                                onChange={(event, value) => formik.setFieldValue("area", value ? value.id : '')}
                                error={formik.touched.area && Boolean(formik.errors.area)}
                                helperText={formik.touched.area && formik.errors.area}
                                fullWidth={true}
                            />
                        </Grid>

                        <Grid xs={12} md={6}>
                            <DatePickerComponent
                                name={"risDate"}
                                label="RIS date"
                                placeholder="xxxx.xx.xx"
                                value={formik.values.risDate}
                                onChange={(date) => formik.setFieldValue("risDate", date)}
                                error={formik.touched.risDate && Boolean(formik.errors.risDate)}
                                helperText={formik.touched.risDate && formik.errors.risDate}
                            />
                        </Grid>

                        <Grid xs={12} md={6}>
                            <InputComponent
                                label="RIS number"
                                placeholder="xxx.xxx.xxx"
                                fullWidth={true}
                                name={'risNumber'}
                                value={formik.values.risNumber}
                                onChange={formik.handleChange}
                                error={formik.touched.risNumber && Boolean(formik.errors.risNumber)}
                                helperText={formik.touched.risNumber && formik.errors.risNumber}
                            />

                        </Grid>

                        {/* <Grid xs={12}>
                        <AutoCompleteComponent
                            placeholder="Search categories..."
                            label="Categories"
                            options={categoriesOptions}
                            loading={isCategoriesLoading}
                            fullWidth={true}
                            value={formik.values.category}
                            onChange={(event, value) => formik.setFieldValue("category", value)}
                            error={formik.touched.category && Boolean(formik.errors.category)}
                            helperText={formik.touched.category && formik.errors.category}
                        />
                    </Grid> */}

                        <Grid xs={12} md={6}>
                            <InputComponent
                                label="Quantity Requested"
                                placeholder="xxx.xxx.xxx"
                                fullWidth={true}
                                name={'quantityRequested'}
                                value={formik.values.quantityRequested}
                                onChange={formik.handleChange}
                                error={formik.touched.quantityRequested && Boolean(formik.errors.quantityRequested)}
                                helperText={formik.touched.quantityRequested && formik.errors.quantityRequested}
                            />
                        </Grid>

                        <Grid xs={12} md={6}>
                            <InputComponent
                                label="Quantity Served"
                                placeholder="xxx.xxx.xxx"
                                fullWidth={true}
                                name={'quantityServed'}
                                value={formik.values.quantityServed}
                                onChange={formik.handleChange}
                                error={formik.touched.quantityServed && Boolean(formik.errors.quantityServed)}
                                helperText={formik.touched.quantityServed && formik.errors.quantityServed}
                            />
                        </Grid>

                        <Grid xs={12}>
                            <TextAreaComponent
                                label={'Remarks'}
                                placeholder={'Enter Remarks'}
                                name={'remarks'}
                                value={formik.values.remarks}
                                onChange={formik.handleChange}
                                error={formik.touched.remarks && Boolean(formik.errors.remarks)}
                                helperText={formik.touched.remarks && formik.errors.remarks}
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
                        loading={isSubmitting}
                    />
                </Stack>
            </form >

        </>
    );
};

export default FormDialog;
