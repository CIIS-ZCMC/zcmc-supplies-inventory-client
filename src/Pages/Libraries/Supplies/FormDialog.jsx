import { useEffect, useMemo, useState } from 'react';

import { useFormik } from 'formik';
import { Grid, Divider, Stack, Typography, Checkbox } from '@mui/joy';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';

import ButtonComponent from '../../../Components/ButtonComponent';
import InputComponent from '../../../Components/Form/InputComponent';
import AutoCompleteComponent from '../../../Components/Form/AutoCompleteComponent';
import AccordionComponent from '../../../Components/AccordionComponent';

import useSuppliesHook from '../../../Hooks/SuppliesHook';
import useCategoriesHook from '../../../Hooks/CategoriesHook';
import useUnitsHook from '../../../Hooks/UnitsHook';
import useSourceHook from '../../../Hooks/SourceHook';

const FormDialog = ({ handleDialogClose, setSnackbar }) => {

    const queryClient = useQueryClient()
    const { initialValues, validationSchema, createSupply } = useSuppliesHook();

    const { getCategories } = useCategoriesHook();
    const { getUnits } = useUnitsHook();
    const { getSources } = useSourceHook();

    // localStates
    const [isEnabled, setIsEnabled] = useState(false)

    useEffect(() => {
        console.log(isEnabled)
    }, [isEnabled])

    // Array of queries to manage multiple fetching in a cleaner way
    const queryConfigs = [
        { key: 'units', fn: getUnits },
        { key: 'categories', fn: getCategories },
        { key: 'sources', fn: getSources },
    ];

    const queries = queryConfigs.map(({ key, fn }) =>
        useQuery({ queryKey: [key], queryFn: fn })
    );

    // Destructure data and loading states from queries for cleaner access
    const [
        { data: unitsData, isLoading: isUnitsLoading },
        { data: categoriesData, isLoading: isCategoriesLoading },
        { data: sourcesData, isLoading: isSourcesLoading },
    ] = queries;

    // Helper function for mapping options
    const mapOptions = (data, labelKey) =>
        data?.map(item => ({ label: item[labelKey], id: item.id })) || [];

    const unitsOptions = useMemo(() => mapOptions(unitsData?.data, 'unit_name'), [categoriesData]);
    const categoriesOptions = useMemo(() => mapOptions(categoriesData?.data, 'category_name'), [categoriesData]);
    const sourcesOptions = useMemo(() => mapOptions(sourcesData?.data, 'source_name'), [sourcesData]);

    // Define create the mutation for stockout
    const mutation = useMutation({
        mutationFn: createSupply,
        onSuccess: () => {
            // Show success notification, close dialog, and invalidate areas cache
            setSnackbar({ open: true, color: 'success', message: 'Supply created successfully' });
            queryClient.invalidateQueries('supplies');
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

    const handleEnabled = () => {
        setIsEnabled((prevState) => !prevState);
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            // Create a new FormData object
            console.log(values)
            const formData = new FormData();

            formData.append("supply_name", values.supplyName);
            formData.append("category_id", values.category);
            formData.append("unit_id", values.unit);

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
                            label="Item name"
                            placeholder="Enter item name"
                            fullWidth={true}
                            name={'supplyName'}
                            value={formik.values.supplyName}
                            onChange={formik.handleChange}
                            error={formik.touched.supplyName && Boolean(formik.errors.supplyName)}
                            helperText={formik.touched.supplyName && formik.errors.supplyName}
                        />

                        <Typography my={2} level={'body-sm'}>
                            Item’s name and type of unit can be combined together to simplify form fill-up and prevent typographical errors on input.
                        </Typography>
                    </Grid>

                    <Grid xs={12}>
                        <AutoCompleteComponent
                            name={'unit'}
                            placeholder="Search unit..."
                            label="Unit"
                            options={unitsOptions}
                            loading={isUnitsLoading}
                            value={unitsOptions.find(option => option.id === formik.values.unit) || null}
                            onChange={(event, value) => formik.setFieldValue("unit", value ? value.id : '')}
                            error={formik.touched.unit && Boolean(formik.errors.unit)}
                            helperText={formik.touched.unit && formik.errors.unit}
                            fullWidth={true}
                        />
                    </Grid>

                    <Grid xs={12}>
                        <AutoCompleteComponent
                            name={'category'}
                            placeholder="Search categories..."
                            label="Categories"
                            options={categoriesOptions}
                            loading={isCategoriesLoading}
                            value={categoriesOptions.find(option => option.id === formik.values.category) || null}
                            onChange={(event, value) => formik.setFieldValue("category", value ? value.id : '')}
                            error={formik.touched.category && Boolean(formik.errors.category)}
                            helperText={formik.touched.category && formik.errors.category}
                            fullWidth={true}
                        />
                    </Grid>

                    {/* <Grid xs={12}>

                        <Checkbox
                            label="Enable Source and Donation"
                            checked={isEnabled}
                            onChange={handleEnabled}
                            size="lg"
                            sx={{
                                mt: 1,
                                color: "primary.500",
                                "&.Mui-checked": {
                                    color: "primary.700",
                                },
                            }}
                        />
                    </Grid> */}

                    {/* {isEnabled &&
                        <>
                            <Grid xs={6}>
                                <AutoCompleteComponent
                                    name={'source'}
                                    placeholder="Search source..."
                                    label="Source"
                                    options={sourcesOptions}
                                    loading={isSourcesLoading}
                                    value={sourcesOptions.find(option => option.id === formik.values.source) || null}
                                    onChange={(event, value) => formik.setFieldValue("source", value ? value.id : '')}
                                    error={formik.touched.source && Boolean(formik.errors.source)}
                                    helperText={formik.touched.source && formik.errors.source}
                                    fullWidth={true}
                                />
                            </Grid>
                            <Grid xs={6}>
                                <InputComponent
                                    name={'quantity'}
                                    size='lg'
                                    label="Quantity"
                                    placeholder="xxx.xxx"
                                    fullWidth={true}
                                    value={formik.values.quantity}
                                    onChange={formik.handleChange}
                                    error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                                    helperText={formik.touched.quantity && formik.errors.quantity}
                                />
                            </Grid>
                        </>
                    } */}

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
            </form >
        </>
    )
}

export default FormDialog