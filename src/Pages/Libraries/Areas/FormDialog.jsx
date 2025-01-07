import React, { useEffect } from 'react';

import { useFormik } from 'formik';
import { Grid, Divider, Stack, Typography } from '@mui/joy';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import useAreasHook from '../../../Hooks/AreasHook';
import usePaginatedTableHook from '../../../Hooks/PaginatedTableHook';

import ButtonComponent from '../../../Components/ButtonComponent';
import InputComponent from '../../../Components/Form/InputComponent';

const FormDialog = ({ handleDialogClose, setSnackbar, isDialogOpen }) => {
    const queryClient = useQueryClient();
    const { isUpdate, id } = usePaginatedTableHook();
    const { initialValues, validationSchema, createArea, updateArea, getArea, setInitialValues } = useAreasHook();

    // Initialize Formik
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append('area_name', values.areaName);
            await mutation.mutate(isUpdate ? { 'area_name': values.areaName } : formData);
        },
    });

    // useEffect(() => {
    //     console.log("Formik values updated:", formik.values);
    //     console.log("Is Input Filled:", isInputFilled);
    // }, [formik.values, isInputFilled]);

    // Load data when editing (update mode)
    useEffect(() => {
        if (isUpdate && id) {
            const fetchAreaData = async () => {
                try {
                    const areaData = await getArea(id);
                    // Correctly set initial values and reset form
                    const updatedValues = {
                        id: areaData?.data?.id || null,
                        areaName: areaData?.data.area_name || "", // Ensure area_name maps correctly
                    };
                    formik.setValues(updatedValues); // Directly set values instead of resetting form
                } catch (error) {
                    console.error('Error fetching area:', error.message);
                    setSnackbar({
                        open: true,
                        color: 'danger',
                        message: 'Failed to load area details. Please try again.',
                    });
                }
            };

            fetchAreaData();
        }

        console.log(formik.values.areaName)
    }, [isUpdate, id, getArea, setSnackbar, formik.values.areaName]);

    // Define mutation for create and update actions
    const mutation = useMutation({
        mutationFn: async (formData) =>
            isUpdate ? updateArea(id, formData) : createArea(formData),
        onSuccess: () => {
            setSnackbar(isUpdate ? 'Area Updated Successfully' : 'Area Created Successfully', "success", "filled");
            queryClient.invalidateQueries('areas'); // Refresh areas query
            formik.resetForm();
        },
        onError: (error) => {
            setSnackbar({
                open: true,
                color: 'danger',
                message: error?.response?.data?.message || 'An error occurred. Please try again.',
            });
            console.error('Error submitting form:', error);
        },
        onSettled: () => {
            handleClose();
        },
    });

    function handleClose() {
        setInitialValues(null)
        handleDialogClose()
    }

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <InputComponent
                            size="lg"
                            label="Area name"
                            placeholder="Enter area name"
                            fullWidth
                            name="areaName"
                            value={formik.values.areaName}
                            onChange={formik.handleChange}
                            error={formik.touched.areaName && Boolean(formik.errors.areaName)}
                            helperText={formik.touched.areaName && formik.errors.areaName}
                        />
                        <Typography my={2} level="body-sm">
                            Item’s name and type of unit can be combined together to simplify form fill-up and prevent typographical errors on input.
                        </Typography>
                    </Grid>
                </Grid>

                <Divider sx={{ marginY: 3 }} /> {/* Horizontal Divider */}

                <Stack direction="row" spacing={2}>
                    <ButtonComponent
                        type="button"
                        label="Cancel"
                        variant="outlined"
                        color="danger"
                        onClick={handleDialogClose}
                        fullWidth
                    />
                    <ButtonComponent
                        type="submit"
                        variant="solid"
                        color="primary"
                        label="Save"
                        fullWidth
                        loading={mutation.isPending}
                    />
                </Stack>
            </form>
        </>
    );
};

export default FormDialog;
