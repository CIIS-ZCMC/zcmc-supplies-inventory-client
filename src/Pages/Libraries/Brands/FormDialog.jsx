import React, { useEffect } from 'react'

import { useFormik } from 'formik'
import { Grid, Divider, Stack, Typography } from '@mui/joy'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import useBrandsHook from '../../../Hooks/BrandsHook'
import usePaginatedTableHook from '../../../Hooks/PaginatedTableHook'

import ButtonComponent from '../../../Components/ButtonComponent'
import InputComponent from '../../../Components/Form/InputComponent'

const FormDialog = ({ handleDialogClose, setSnackbar, isDialogOpen }) => {

    const queryClient = useQueryClient();
    const { isUpdate, id } = usePaginatedTableHook();
    const { initialValues, setInitialValues, validationSchema, getBrand, updateBrand, createBrand } = useBrandsHook();

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append("brand_name", values.brandName);
            await mutation.mutate(isUpdate ? { 'brand_name': values.brandName } : formData);
        }
    })

    useEffect(() => {
        if (isUpdate && id) {
            const fetchData = async () => {
                try {
                    const brandData = await getBrand(id);
                    // Correctly set initial values and reset form
                    const updatedValues = {
                        id: brandData?.data?.id || null,
                        brandName: brandData?.data.brand_name || "",
                    };
                    formik.setValues(updatedValues);
                } catch (error) {
                    console.error('Error fetching brand:', error.message);
                    setSnackbar({
                        open: true,
                        color: 'danger',
                        message: 'Failed to load brand details. Please try again.',
                    });
                }
            };
            fetchData();
        }
    }, [isUpdate, id, getBrand, setSnackbar]);

    // Define create the mutation for stockout
    const mutation = useMutation({
        mutationFn: async (formData) =>
            isUpdate ? updateBrand(id, formData) : createBrand(formData),
        onSuccess: () => {
            setSnackbar(isUpdate ? 'Brand Updated Successfully' : 'Brand Created Successfully', "success", "filled");
            queryClient.invalidateQueries('brands');
            formik.resetForm();
        },
        onError: (error) => {
            if (error?.response?.status === 409) {
                setSnackbar(`${error.response.data.message}` || 'Conflict: The resource already exists.', "danger", "filled");
            } else {
                // Handle other errors
                setSnackbar(`${error.message}` || 'An error occurred. Please try again.', "danger", "filled");
            }
            console.error("Error submitting form:", error);
        },
        onSettled: () => {
            // Always close the dialog after the mutation is finished (whether successful or error)
            handleClose();
        }
    });

    function handleClose() {
        setInitialValues(null)
        handleDialogClose()
    }

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid xs={12}>
                        <InputComponent
                            size='lg'
                            label="Brand name"
                            placeholder="Enter brand name"
                            fullWidth
                            name='brandName'
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
                        type={'button'}
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