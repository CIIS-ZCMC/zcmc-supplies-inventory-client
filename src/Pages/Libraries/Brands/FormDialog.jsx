import React from 'react'

import { useFormik } from 'formik'
import { Grid, Divider, Stack, Typography } from '@mui/joy'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import useBrandsHook from '../../../Hooks/BrandsHook'

import ButtonComponent from '../../../Components/ButtonComponent'
import InputComponent from '../../../Components/Form/InputComponent'

const FormDialog = ({ handleDialogClose, setSnackbar, setInitialValues, isDialogOpen }) => {

    const queryClient = useQueryClient()
    const { initialValues, setInitalValues, validationSchema, createBrand } = useBrandsHook();

    // Define create the mutation for stockout
    const mutation = useMutation({
        mutationFn: createBrand,
        onSuccess: () => {
            // Show success notification, close dialog, and invalidate areas cache
            setSnackbar({ open: true, color: 'success', message: 'Brand Created Successfully' });
            queryClient.invalidateQueries('brands');
            // Reset Formik form values after submission
            formik.resetForm(); // Reset form to initial values
            // setInitialValues;  // Reset the initial state in the store
        },
        onError: (error) => {
            if (error?.response?.status === 409) {
                setSnackbar({
                    open: true,
                    color: 'danger',
                    message: error.response.data.message || 'Conflict: The resource already exists.',
                });
            } else {
                // Handle other errors
                setSnackbar({
                    open: true,
                    color: 'danger',
                    message: `${error.message || 'An error occurred. Please try again.'}`,
                });
            }

            console.error("Error submitting form:", error);
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
            // Create a new FormData object
            const formData = new FormData();

            formData.append("brand_name", values.brandName);

            await mutation.mutate(formData)
        }
    })

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <InputComponent
                            size={'lg'}
                            label="Brand name"
                            placeholder="Enter brand name"
                            fullWidth={true}
                            name={'brandName'}
                            value={formik.values.brandName}
                            onChange={formik.handleChange}
                            error={formik.touched.brandName && Boolean(formik.errors.brandName)}
                            helperText={formik.touched.brandName && formik.errors.brandName}
                        />

                        <Typography my={2} level={'body-sm'}>
                            Item’s name and type of unit can be combined together to simplify form fill-up and prevent typographical errors on input.
                        </Typography>
                    </Grid>

                </Grid>

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
            </form>
        </>
    )
}

export default FormDialog