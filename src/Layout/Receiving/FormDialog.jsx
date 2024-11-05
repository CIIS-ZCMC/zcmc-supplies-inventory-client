import { useMemo } from 'react';
import { Box, Stack, Grid, Divider } from "@mui/joy";
import { useQuery } from '@tanstack/react-query';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Custom Components
import AutoCompleteComponent from "../../Components/Form/AutoCompleteComponent";
import InputComponent from "../../Components/Form/InputComponent";
import DatePickerComponent from '../../Components/Form/DatePickerComponent';
import ButtonComponent from '../../Components/ButtonComponent';

// hooks
import useSourceHook from '../../Hooks/SourceHook';
import useAreasHook from '../../Hooks/AreasHook';
import useCategoriesHook from '../../Hooks/CategoriesHook';
import useSuppliesHook from '../../Hooks/SuppliesHook';

import useReleasingHook from "../../Hooks/ReleasingHook";

const FormDialog = ({ handleDialogClose }) => {

    // Hooks for data fetching functions
    const { getAreas } = useAreasHook();
    const { getSources } = useSourceHook();
    const { getCategories } = useCategoriesHook();
    const { getSupplies } = useSuppliesHook();
    const { createStockOut } = useReleasingHook();

    // Array of queries to manage multiple fetching in a cleaner way
    const queryConfigs = [
        { key: 'supplies', fn: getSupplies },
        { key: 'sources', fn: getSources },
        { key: 'areas', fn: getAreas },
        { key: 'categories', fn: getCategories },
    ];

    const queries = queryConfigs.map(({ key, fn }) =>
        useQuery({ queryKey: [key], queryFn: fn })
    );

    // Destructure data and loading states from queries for cleaner access
    const [
        { data: suppliesData, isLoading: isSuppliesLoading },
        { data: sourcesData, isLoading: isSourcesLoading },
        { data: areasData, isLoading: isAreasLoading },
        { data: categoriesData, isLoading: isCategoriesLoading },
    ] = queries;

    // Helper function for mapping options
    const mapOptions = (data, labelKey) =>
        data?.map(item => ({ label: item[labelKey], id: item.id })) || [];

    // Memoized options to avoid recalculating on every render
    const suppliesOptions = useMemo(() => mapOptions(suppliesData?.data, 'name'), [suppliesData]);
    const sourcesOptions = useMemo(() => mapOptions(sourcesData?.data, 'source_name'), [sourcesData]);
    const areaOptions = useMemo(() => mapOptions(areasData?.data, 'area_name'), [areasData]);
    const categoriesOptions = useMemo(() => mapOptions(categoriesData?.data, 'category_name'), [categoriesData]);

    const formik = useFormik({

        initialValues: {
            itemName: '',
            source: '',
            area: '',
            risDate: '',
            risNumber: '',
            category: '',
            quantityRequested: '',
            quantityServed: '',
        },

        validationSchema: Yup.object({
            itemName: Yup.string().required('Item Name is required')
                .matches(/^[a-zA-Z0-9\s._-]*$/, 'Item Name can only contain letters, numbers, spaces, and special characters (., _ -)'),
            source: Yup.string().required('Source is required'),
            area: Yup.string().required('Area is required'),
            risDate: Yup.date().required('Date is required'),
            risNumber: Yup.string().required('RIS number is required'),
            category: Yup.string().required('Category is required'),
            quantityRequested: Yup.number().required('Quantity Requested is required'),
            quantityServed: Yup.number().required('Quantity Served is required'),
        }),

        onSubmit: async (values) => {
            console.log(values)
            // try {
            //     await createStockOut(values);
            //     console.log("Form submitted successfully:", values);
            // } catch (error) {
            //     console.error("Error submitting form:", error);
            // }
        }
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <Box>

                <Grid container spacing={2}>
                    <Grid xs={12}>
                        {/* Supplies Autocomplete */}
                        <AutoCompleteComponent
                            name={'itemName'}
                            placeholder="Search Item..."
                            label="Item Name"
                            options={suppliesOptions}
                            loading={isSuppliesLoading}
                            value={formik.values.itemName}
                            onChange={(event, value) => formik.setFieldValue("itemName", value)}
                            error={formik.touched.itemName && Boolean(formik.errors.itemName)}
                            helperText={formik.touched.itemName && formik.errors.itemName}
                            fullWidth={true}
                        />
                    </Grid>

                    <Grid xs={12} md={6}>
                        <AutoCompleteComponent
                            name={'source'}
                            placeholder="Search source..."
                            label="Source"
                            options={sourcesOptions}
                            loading={isSourcesLoading}
                            value={formik.values.source}
                            onChange={(event, value) => formik.setFieldValue("source", value)}
                            error={formik.touched.source && Boolean(formik.errors.source)}
                            helperText={formik.touched.source && formik.errors.source}
                            fullWidth={true}
                        />
                    </Grid>

                    <Grid xs={12} md={6}>
                        <AutoCompleteComponent
                            name={'area'}
                            placeholder="Search area..."
                            label="Area"
                            options={areaOptions}
                            loading={isAreasLoading}
                            value={formik.values.area}
                            onChange={(event, value) => formik.setFieldValue("area", value)}
                            error={formik.touched.area && Boolean(formik.errors.area)}
                            helperText={formik.touched.area && formik.errors.area}
                            fullWidth={true}
                        />
                    </Grid>

                    <Grid xs={12} md={6}>
                        <DatePickerComponent
                            name={"risDate"}
                            label="RIS date"
                            placeholder="xxxx.xx.xx"
                            value={formik.values.risDate}
                            onChange={(date) => formik.setFieldValue("risDate", date)}
                            error={formik.touched.risDate && Boolean(formik.errors.risDate)}
                            helperText={formik.touched.risDate && formik.errors.risDate}
                        />
                    </Grid>

                    <Grid xs={12} md={6}>
                        <InputComponent
                            label="RIS number"
                            placeholder="xxx.xxx.xxx"
                            fullWidth={true}
                            name={'risNumber'}
                            value={formik.values.risNumber}
                            onChange={formik.handleChange}
                            error={formik.touched.risNumber && Boolean(formik.errors.risNumber)}
                            helperText={formik.touched.risNumber && formik.errors.risNumber}
                        />

                    </Grid>

                    {/* <Grid xs={12}>
                        <AutoCompleteComponent
                            placeholder="Search categories..."
                            label="Categories"
                            options={categoriesOptions}
                            loading={isCategoriesLoading}
                            fullWidth={true}
                            value={formik.values.category}
                            onChange={(event, value) => formik.setFieldValue("category", value)}
                            error={formik.touched.category && Boolean(formik.errors.category)}
                            helperText={formik.touched.category && formik.errors.category}
                        />
                    </Grid> */}

                    <Grid xs={12} md={6}>
                        <InputComponent
                            label="Quantity Requested"
                            placeholder="xxx.xxx.xxx"
                            fullWidth={true}
                            name={'quantityRequested'}
                            value={formik.values.quantityRequested}
                            onChange={formik.handleChange}
                            error={formik.touched.quantityRequested && Boolean(formik.errors.quantityRequested)}
                            helperText={formik.touched.quantityRequested && formik.errors.quantityRequested}
                        />
                    </Grid>

                    <Grid xs={12} md={6}>
                        <InputComponent
                            label="Quantity Served"
                            placeholder="xxx.xxx.xxx"
                            fullWidth={true}
                            name={'quantityServed'}
                            value={formik.values.quantityServed}
                            onChange={formik.handleChange}
                            error={formik.touched.quantityServed && Boolean(formik.errors.quantityServed)}
                            helperText={formik.touched.quantityServed && formik.errors.quantityServed}
                        />
                    </Grid>
                </Grid>

            </Box>


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
                />
            </Stack>
        </form >
    );
};

export default FormDialog;
