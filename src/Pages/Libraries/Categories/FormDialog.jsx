import React from 'react'

import { useFormik } from 'formik'
import { Grid, Divider, Stack, Typography } from '@mui/joy'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import useCategoriesHook from '../../../Hooks/CategoriesHook'

import ButtonComponent from '../../../Components/ButtonComponent'
import InputComponent from '../../../Components/Form/InputComponent'

const FormDialog = ({ handleDialogClose, setSnackbar }) => {

    const queryClient = useQueryClient()
    const { initialValues, validationSchema, createCategory } = useCategoriesHook();

    // Define create the mutation for stockout
    const mutation = useMutation({
        mutationFn: createCategory,
        onSuccess: () => {
            // Show success notification, close dialog, and invalidate areas cache
            setSnackbar({ open: true, color: 'success', message: 'Categories created successfully' });
            queryClient.invalidateQueries('categories');
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

            formData.append("category_name", values.categoryName);

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
                            label="Category"
                            placeholder="Enter category name"
                            fullWidth={true}
                            name={'categoryName'}
                            value={formik.values.categoryName}
                            onChange={formik.handleChange}
                            error={formik.touched.categoryName && Boolean(formik.errors.categoryName)}
                            helperText={formik.touched.categoryName && formik.errors.categoryName}
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