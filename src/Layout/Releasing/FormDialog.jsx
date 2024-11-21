import { useMemo, useEffect, useState } from 'react';
import { Box, Stack, Grid, Divider, Alert, Button, Typography } from "@mui/joy";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useFormik } from 'formik';

//stepper components
import Step1Form from './Stepper/Step1Form';
import Step2Form from './Stepper/Step2Form';
import Summary from './Stepper/Summary';

// hooks
import useAreasHook from '../../Hooks/AreasHook';
import useSuppliesHook from '../../Hooks/SuppliesHook';
import useReleasingHook from "../../Hooks/ReleasingHook";

import Regular from './Regular';
import Donation from './Donation'

const FormDialog = ({ handleDialogClose, showSnackbar, activeStep, steps, handleBack, handleNext }) => {

    const queryClient = useQueryClient()

    // local state
    const [selectedId, setSelectedId] = useState(null)
    const [selectedQuantity, setSelectedQuantity] = useState(null)

    // Hooks for data fetching functions
    const { getAreas } = useAreasHook();
    const { getSupplies } = useSuppliesHook();
    const { createStockOut, initialValues, validationSchema, } = useReleasingHook();

    // Array of queries to manage multiple fetching in a cleaner way
    const queryConfigs = [
        { key: 'supplies', fn: getSupplies },
        { key: 'areas', fn: getAreas },
    ];

    const queries = queryConfigs.map(({ key, fn }) =>
        useQuery({ queryKey: [key], queryFn: fn })
    );

    // useEffect(() => {
    //     console.log("Selected ID:", selectedId);
    // }, [selectedId]);

    // Destructure data and loading states from queries for cleaner access
    const [
        { data: suppliesData, isLoading: isSuppliesLoading },
        { data: areasData, isLoading: isAreasLoading },
    ] = queries;

    // Helper function for mapping options
    const mapOptions = (data, labelKey) =>
        data?.map(item => ({ label: item[labelKey], id: item.id })) || [];

    // Memoized options to avoid recalculating on every render
    const suppliesOptions = useMemo(() => mapOptions(suppliesData?.data, 'name'), [suppliesData]);
    const areaOptions = useMemo(() => mapOptions(areasData?.data, 'area_name'), [areasData]);
    // const brandRegularOptions = useMemo(() => mapOptions(brandRegularData?.data, 'concatenated_info'), [brandRegularData])

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

    const accordionData = [{
        summary: <>
            <Stack>
                <Typography>Regular</Typography>
                <Typography level='body-sm'>Total quantity to be released from Regular: 0 / 1400 left</Typography>
            </Stack>
        </>,
        details: <Regular
            selectedId={selectedId}
            formik={formik}
            setSelectedQuantity={setSelectedQuantity}
        />
    },
    {
        summary: 'Donation',
        details: <Donation />
    }]

    // useEffect(() => {
    //     if (selectedId) {
    //         getBrandRegular(selectedId).then(data => console.log(data));
    //     }
    // }, [selectedId]);

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Box>
                    {activeStep === 1 &&
                        <Grid item xs={12}>
                            {/* Step 1 form */}
                            <Step1Form
                                formik={formik}
                                selectedQuantity={selectedQuantity}
                                setSelectedId={setSelectedId}
                                accordionData={accordionData}
                                suppliesOptions={suppliesOptions}
                                isSuppliesLoading={isSuppliesLoading}
                            />
                        </Grid>
                    }

                    {activeStep === 2 &&
                        <Step2Form
                            formik={formik}
                            areaOptions={areaOptions}
                            isAreasLoading={isAreasLoading}
                        />
                    }

                    {activeStep === 3 &&
                        <Summary />
                    }
                </Box>

                <Divider sx={{ marginY: 3 }} />

                <Stack direction={'row'} spacing={2}>

                    {/* display only on step 1 */}
                    {activeStep === 1 && (
                        <Button onClick={handleNext} variant="outlined" fullWidth>
                            Cancel
                        </Button>
                    )}

                    {activeStep > 1 && (
                        <Button onClick={handleBack} variant="outlined" fullWidth>
                            Back
                        </Button>
                    )}

                    {activeStep < steps.length - 0 ? (
                        // selectedQuantity here para hindi man proceed si el quantity <= 0
                        <Button disabled={selectedQuantity < 0} onClick={handleNext} variant="solid" fullWidth>
                            Next
                        </Button>
                    ) : (
                        <Button type="submit" variant="solid" fullWidth>
                            Submit
                        </Button>
                    )}
                </Stack>
            </form >

        </>
    );
};

export default FormDialog;