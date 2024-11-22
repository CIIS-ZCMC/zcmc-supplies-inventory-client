import { useMemo, useEffect, useState } from 'react';
import { Box, Stack, Grid, Divider, Alert, Button, Typography } from "@mui/joy";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';

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
    const [selectedQuantity, setSelectedQuantity] = useState('')

    //form state
    const [selectedId, setSelectedId] = useState() //Supply Master List ID
    const [regularBrands, setRegularBrands] = useState([{ brandId: '', quantity: '' }]);
    const [dontationBrands, setDonationBrands] = useState([{ brandId: '', quantity: '' }]);
    const [requestingOffice, setRequestingOffice] = useState() //Step 2 Requesting Office
    const [qtyRequest, setQtyRequest] = useState() //Step 2 Qty Requested
    const [risDate, setRisDate] = useState(moment().format('YYYY-M-D')) //Step 2 RIS Date
    const [risNo, setRisNo] = useState('') //Step 2 RIS Number
    const [remarks, setRemarks] = useState('') //Step 2 Remarks

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

        const formData = {
            regularBrands,
            requestingOffice,
            qtyRequest,
            risDate,
            risNo,
            remarks,
        };

        console.log('Form Submission Data:', formData);

        // const formData = new FormData;

        // formData.append("supplies_masterlist_id", selectedId);
        // formData.append("regular_brands", regularBrands);
        // //DONATION
        // formData.append("area_id", requestingOffice);
        // formData.append("requested_quantity", qtyRequest);
        // formData.append("ris_no", risNo);
        // formData.append("ris_date", risDate);
        // formData.append("remarks", remarks);
        // formData.append("transaction_type", "Stock-out");
    }

    return (
        <>
            <form onSubmit={(e) => handleSubmit(e)} >
                <Box>
                    {activeStep === 1 &&
                        <Grid item xs={12}>
                            {/* Step 1 form */}
                            <Step1Form
                                selectedId={selectedId}
                                setSelectedId={setSelectedId}
                                selectedQuantity={selectedQuantity}
                                accordionData={accordionData} // step 1 form appending regular brand
                                suppliesOptions={suppliesOptions}
                                isSuppliesLoading={isSuppliesLoading}
                            />
                        </Grid>
                    }

                    {activeStep === 2 &&
                        <Step2Form
                            requestingOffice={requestingOffice}
                            setRequestingOffice={setRequestingOffice}
                            qtyRequest={qtyRequest}
                            setQtyRequest={setQtyRequest}
                            risDate={risDate}
                            setRisDate={setRisDate}
                            risNo={risNo}
                            setRisNo={setRisNo}
                            remarks={remarks}
                            setRemarks={setRemarks}
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
