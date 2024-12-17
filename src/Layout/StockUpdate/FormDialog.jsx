import { useMemo, useEffect, useState } from 'react';
import { Box, Stack, Grid, Divider, Checkbox, Typography } from "@mui/joy";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useFormik } from 'formik';

// Custom Components
import AutoCompleteComponent from "../../Components/Form/AutoCompleteComponent";
import InputComponent from "../../Components/Form/InputComponent";
import ButtonComponent from '../../Components/ButtonComponent';

// hooks
import useSuppliesHook from '../../Hooks/SuppliesHook';
import useStockUpdateHook from '../../Hooks/StockUpdateHook';

const FormDialog = ({ handleDialogClose, showSnackbar }) => {

    const queryClient = useQueryClient()

    // Hooks for data fetching functions
    const { getSupplies } = useSuppliesHook();
    const { createStockUpdate } = useStockUpdateHook();

    const { initialValues, validationSchema } = useStockUpdateHook();

    const queryConfigs = [
        { key: 'supplies', fn: getSupplies }
    ];

    const queries = queryConfigs.map(({ key, fn }) =>
        useQuery({ queryKey: [key], queryFn: fn })
    );

    const [
        { data: suppliesData, isLoading: isSuppliesLoading },
    ] = queries;

    const mapOptions = (data, labelKey) =>
        data?.map(item => ({ label: item[labelKey], id: item.id })) || [];

    const suppliesOptions = useMemo(() => mapOptions(suppliesData?.data, 'name'), [suppliesData]);

    // Define create the mutation for stockout
    const mutation = useMutation({
        mutationFn: createStockUpdate,
        onSuccess: () => {
            showSnackbar("Stock Update Success!", "success", "filled");
            queryClient.invalidateQueries('stockUpdate');

            formik.resetForm(); // Reset form to initial values

        },
        onError: (error) => {
            showSnackbar(
                `StockUpdate failed!. Please try again. ${error}`,
                "danger",
                "filled"
            );
            console.error("Error stckupdate form:", error);
        },
        onSettled: () => {
            handleDialogClose();
        }
    });

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values) => {

            const sources = [
                { source_id: 1, quantity: values.regularQuantity ? Number(values.regularQuantity) : 0 },
                { source_id: 2, quantity: values.donationQuantity ? Number(values.donationQuantity) : 0 }
            ];

            const formData = new FormData();

            formData.append("supplies_masterlist_id", values.itemName);
            formData.append("sources", JSON.stringify(sources));
            formData.append("brand_id", 1);

            // Log all FormData entries to the console for testing only 
            for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }

            // Send formData to the API
            try {
                await mutation.mutate(formData); // Assuming this is your API call function
                // console.log("Form submitted successfully",);
            } catch (error) {
                console.error("Error submitting the form", error);
            }

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
                            Regular
                            <InputComponent
                                name={'regularQuantity'}
                                size='lg'
                                label="Quantity"
                                placeholder="xxx.xxx"
                                fullWidth={true}
                                value={formik.values.regularQuantity}
                                onChange={formik.handleChange}
                                error={formik.touched.regularQuantity && Boolean(formik.errors.regularQuantity)}
                                helperText={formik.touched.regularQuantity && formik.errors.regularQuantity}
                            />
                        </Grid>

                        <Grid xs={12} md={6}>
                            Donation
                            <InputComponent
                                name={'donationQuantity'}
                                size='lg'
                                label="Quantity"
                                placeholder="xxx.xxx"
                                fullWidth={true}
                                value={formik.values.donationQuantity}
                                onChange={formik.handleChange}
                                error={formik.touched.donationQuantity && Boolean(formik.errors.donationQuantity)}
                                helperText={formik.touched.donationQuantity && formik.errors.donationQuantity}
                            />
                        </Grid>


                        {/* <Grid xs={12}>
                            <InputComponent
                                name={'year'}
                                size='lg'
                                label="Year"
                                placeholder="xxx.xxx"
                                fullWidth={true}
                                value={formik.values.year}
                                onChange={formik.handleChange}
                                error={formik.touched.year && Boolean(formik.errors.year)}
                                helperText={formik.touched.year && formik.errors.year}
                            />
                        </Grid> */}
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
