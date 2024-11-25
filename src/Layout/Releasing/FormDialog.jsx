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

    const [btnType, setBtnType] = useState('button');

    const queryClient = useQueryClient()

    // local state
    const [selectedQuantity, setSelectedQuantity] = useState('')

    //form state
    const [selectedId, setSelectedId] = useState(null) //Supply Master List ID
    const [regularBrands, setRegularBrands] = useState([{ brand_id: '', source_id: '', quantity: '', expiration_date: '' }]);
    const [donationBrands, setDonationBrands] = useState([{ brand_id: '', source_id: '', quantity: '', expiration_date: '' }]);
    const [requestingOffice, setRequestingOffice] = useState() //Step 2 Requesting Office
    const [qtyRequest, setQtyRequest] = useState() //Step 2 Qty Requested
    const [risDate, setRisDate] = useState(moment().format('YYYY-M-D')) //Step 2 RIS Date
    const [risNo, setRisNo] = useState('') //Step 2 RIS Number
    const [remarks, setRemarks] = useState('') //Step 2 Remarks


    const resetForm = () => {
        setSelectedId(null);
        setRegularBrands([{ brand_id: '', source_id: '', quantity: '', expiration_date: '' }]);
        setDonationBrands([{ brand_id: '', source_id: '', quantity: '', expiration_date: '' }]);
        setRequestingOffice(null);
        setQtyRequest(null);
        setRisDate(moment().format('YYYY-M-D')); // Reset to today's date
        setRisNo('');
        setRemarks('');
    }


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

    // Define create the mutation for stockout
    const mutation = useMutation({
        mutationFn: createStockOut,
        onSuccess: () => {
            showSnackbar("Form submitted successfully", 'success'); // Show success notification
            queryClient.invalidateQueries('stocks');
            resetForm()
        },
        onError: (error) => {
            console.error("Error submitting form:", error);
            showSnackbar("Failed to submit form", 'danger'); // Show error notification
        },
        onSettled: () => {
            closeDialog();
        }
    });

    const isSubmitting = mutation.isLoading;

    useEffect(() => {
        if (activeStep === 2) {
            return setBtnType('submit');
        }

        setBtnType('button');
    }, [activeStep])

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
        summary: <>
            <Stack>
                <Typography>Donation</Typography>
                <Typography level='body-sm'>Total quantity to be released from Regular: 0 / 1400 left</Typography>
            </Stack>
        </>,
        details: <Donation
            selectedId={selectedId}
            donationBrands={donationBrands}
            setDonationBrands={setDonationBrands}
        />
    }]

    const closeDialog = () => {
        handleDialogClose()
        resetForm()
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const brandSource = [...regularBrands, ...donationBrands];

        const formData = new FormData;


        formData.append("supplies_masterlist_id", selectedId);
        formData.append("area_id", requestingOffice);
        formData.append("requested_quantity", qtyRequest);
        formData.append("ris_no", risNo);
        formData.append("ris_date", risDate);
        formData.append("remarks", remarks);

        // Append each item of the array as a properly indexed key
        brandSource.forEach((item, index) => {
            formData.append(`brand_source_pairs[${index}][brand_id]`, item.brand_id);
            formData.append(`brand_source_pairs[${index}][source_id]`, item.source_id);
            formData.append(`brand_source_pairs[${index}][expiration_date]`, item.expiration_date === null ? "" : item.expiration_date);
            formData.append(`brand_source_pairs[${index}][quantity]`, item.quantity);
        });

        // Log the contents of FormData for debugging
        for (const [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        mutation.mutate(formData);

    }

    return (
        <>
            <form onSubmit={(e) => handleSubmit(e)} >
                <Box>
                    {activeStep === 0 &&
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

                    {activeStep === 1 &&
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

                    {activeStep === 2 &&
                        <Summary />
                    }
                </Box>

                <Divider sx={{ marginY: 3 }} />

                <Stack direction={'row'} spacing={2}>

                    {/* display only on step 1 */}
                    <Button onClick={activeStep === 0 ? closeDialog : handleBack} variant="outlined" fullWidth>
                        {activeStep === 0 ? "Cancel" : "Back"}
                    </Button>

                    <Button type={btnType} disabled={selectedQuantity < 0} onClick={handleNext} variant="solid" fullWidth>
                        {activeStep === 2 ? "Submit" : "Next"}
                    </Button>
                </Stack>
            </form >

        </>
    );
};

export default FormDialog;
