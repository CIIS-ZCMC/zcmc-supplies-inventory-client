import { useMemo, useEffect, useState } from 'react';
import { Box, Stack, Grid, Divider, Alert, Button, Typography } from "@mui/joy";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useFormik } from 'formik';

//stepper components
import Step1Form from './Stepper/Step1Form';
import Step2Form from './Stepper/Step2Form';
import Summary from './Stepper/Summary';
``
// hooks
import useAreasHook from '../../Hooks/AreasHook';
import useSuppliesHook from '../../Hooks/SuppliesHook';
import useReleasingHook from "../../Hooks/ReleasingHook";

import Regular from './Regular';
import Donation from './Donation'

const FormDialog = ({ handleDialogClose, showSnackbar, activeStep, steps, handleBack, handleNext }) => {

    const queryClient = useQueryClient()

    // local state
    const [selectedId, setSelectedId] = useState()
    const [selectedQuantity, setSelectedQuantity] = useState("")

    //form state
    const [itemName, setItemName] = useState(null);
    const [regularBrands, setRegularBrands] = useState([{ brandId: '', quantity: '' }]);
    const [dontationBrands, setDonationBrands] = useState([{ brandId: '', quantity: '' }]);
    const [area, setArea] = useState("")
    const [quantity, setQuantity] = useState("")
    const [date, setDate] = useState(null)
    const [risNo, setRisNo] = useState("")
    const [remarks, setRemarks] = useState("")

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
            // formik.resetForm(); // Reset form to initial values
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

    const accordionData = [{
        summary: <>
            <Stack>
                <Typography>Regular</Typography>
                <Typography level='body-sm'>Total quantity to be released from Regular: 0 / 1400 left</Typography>
            </Stack>
        </>,
        details: <Regular
            selectedId={selectedId}
            regularBrands={regularBrands}
            setRegularBrands={setRegularBrands}
            setSelectedQuantity={setSelectedQuantity}
        />
    },
    {
        summary: 'Donation',
        details: <Donation />
    }]


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('submit')

        // const formData = new FormData;

        // formData.append("supplies_masterlist_id", values.itemName);
        // formData.append("quantity", values.quantityServed);
        // formData.append("requested_quantity", values.quantityRequested);
        // formData.append("transaction_type", values.transactionType);
        // formData.append("ris_no", values.risNumber);
        // formData.append("ris_date", values.risDate);
        // formData.append("remarks", values.remarks);
        // formData.append("area_id", values.area);
        // formData.append("source_id", values.source);
    }

    return (
        <>
            <form onSubmit={(e) => handleSubmit(e)} >
                <Box>
                    {activeStep === 1 &&
                        <Grid item xs={12}>
                            {/* Step 1 form */}
                            <Step1Form
                                itemName={itemName}
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
