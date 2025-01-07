import React, { useEffect } from 'react'

import { useFormik } from 'formik'
import { Grid, Divider, Stack, Typography } from '@mui/joy'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import useSuppliersHook from '../../../Hooks/SuppliersHook'
import usePaginatedTableHook from '../../../Hooks/PaginatedTableHook'

import ButtonComponent from '../../../Components/ButtonComponent'
import InputComponent from '../../../Components/Form/InputComponent'

const FormDialog = ({ handleDialogClose, setSnackbar, isDialogOpen }) => {

    const queryClient = useQueryClient();
    const { isUpdate, id } = usePaginatedTableHook();
    const { initialValues, setInitialValues, validationSchema, getSupplier, updateSupplier, createSupplier } = useSuppliersHook();

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            // Create a new FormData object
            const formData = new FormData();
            formData.append("supplier_name", values.supplierName);
            await mutation.mutate(isUpdate ? { 'supplier_name': values.supplierName } : formData);
        }
    })

    // Load data when editing (update mode)
    useEffect(() => {
        if (isUpdate && id) {
            const fetchData = async () => {
                try {
                    const supplierData = await getSupplier(id);
                    // Correctly set initial values and reset form
                    const updatedValues = {
                        id: supplierData?.data?.id || null,
                        brandName: supplierData?.data.supplier_name || "",
                    };
                    formik.setValues(updatedValues);
                } catch (error) {
                    console.error('Error fetching supplier:', error.message);
                    setSnackbar({
                        open: true,
                        color: 'danger',
                        message: 'Failed to load supplier details. Please try again.',
                    });
                }
            };
            fetchData();
        }
    }, [isUpdate, id, getSupplier, setSnackbar]);


    // Define create the mutation for stockout
    const mutation = useMutation({
        mutationFn: async (formData) =>
            isUpdate ? updateSupplier(id, formData) : createSupplier(formData),
        onSuccess: () => {
            // Show success notification, close dialog, and invalidate areas cache
            setSnackbar(isUpdate ? 'Supplier Updated Successfully' : 'Supplier Created Successfully', "success", "filled");
            queryClient.invalidateQueries('suppliers');
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
                    <Grid item xs={12}>
                        <InputComponent
                            size={'lg'}
                            label="Supplier"
                            placeholder="Enter supplier"
                            fullWidth={true}
                            name={'supplierName'}
                            value={formik.values.supplierName}
                            onChange={formik.handleChange}
                            error={formik.touched.supplierName && Boolean(formik.errors.supplierName)}
                            helperText={formik.touched.supplierName && formik.errors.supplierName}
                        />

                        <Typography my={2} level={'body-sm'}>
                            Item’s name and type of unit can be combined together to simplify form fill-up and prevent typographical errors on input.
                        </Typography>
                    </Grid>

                </Grid>

                <Divider sx={{ marginY: 3 }} />  {/* Horizontal Divider */}

                <Stack direction={'row'} spacing={2}>
                    <ButtonComponent
                        type={'button'}
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