import React from 'react'

import { useFormik } from 'formik'
import { Grid, Divider, Stack, Typography } from '@mui/joy'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import useSourceHook from '../../../Hooks/SourceHook'

import ButtonComponent from '../../../Components/ButtonComponent'
import InputComponent from '../../../Components/Form/InputComponent'

const FormDialog = ({ handleDialogClose, setSnackbar }) => {

    const queryClient = useQueryClient()
    const { initialValues, validationSchema, createSource } = useSourceHook();

    // Define create the mutation for stockout
    const mutation = useMutation({
        mutationFn: createSource,
        onSuccess: () => {
            // Show success notification, close dialog, and invalidate areas cache
            setSnackbar({ open: true, color: 'success', message: 'Source created successfully' });
            queryClient.invalidateQueries('sources');
            // Reset Formik form values after submission
            formik.resetForm(); // Reset form to initial values
            // setInitialValues;  // Reset the initial state in the store
        },
        onError: (error) => {
            setSnackbar({ open: true, color: 'danger', message: `${error}` })
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

            formData.append("source_name", values.sourceName);

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
                            label="Sources"
                            placeholder="Enter source name"
                            fullWidth={true}
                            name={'sourceName'}
                            value={formik.values.sourceName}
                            onChange={formik.handleChange}
                            error={formik.touched.sourceName && Boolean(formik.errors.sourceName)}
                            helperText={formik.touched.sourceName && formik.errors.sourceName}
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