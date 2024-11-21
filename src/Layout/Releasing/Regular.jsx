import React, { useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Grid, Typography, Stack, Box, } from '@mui/joy';

import { Trash, Plus, } from 'lucide-react';

import AutoCompleteComponent from '../../Components/Form/AutoCompleteComponent';
import InputComponent from '../../Components/Form/InputComponent';
import IconButtonComponent from '../../Components/IconButtonComponent';
import ButtonComponent from '../../Components/ButtonComponent';

import useReleasingHook from '../../Hooks/ReleasingHook';

const Regular = ({ formik, selectedId, setSelectedQuantity }) => {

    const { getBrandRegular } = useReleasingHook();

    const { data: brandRegularData, isLoading: isBrandRegularloading } = useQuery({
        queryKey: ['brand-regular', selectedId],
        queryFn: () => getBrandRegular(selectedId),
        enabled: selectedId != null && selectedId !== "", // Ensure selectedId is not null or empty
        staleTime: Infinity,
        cacheTime: Infinity,
    });

    const mapOptions = (data, labelKey) =>
        data?.map(item => ({ label: item[labelKey], id: item.id, quantity: item.quantity })) || [];

    const brandRegularOptions = useMemo(() => mapOptions(brandRegularData, 'concatenated_info'), [brandRegularData])

    const selectedBrand = brandRegularOptions.find(option => option.id === formik.values.brandRegular);

    // Safely parse and validate inputs
    const inputQuantity = Number(formik.values.quantity);
    const availableQuantity = Number(selectedBrand?.quantity);

    const isInputValid = !isNaN(inputQuantity) && inputQuantity >= 0;
    const isAvailableValid = !isNaN(availableQuantity) && availableQuantity >= 0;

    // Calculate the quantity counter only if inputs are valid
    const quantityCounter = isInputValid && isAvailableValid ? availableQuantity - inputQuantity : null;

    useEffect(() => {
        setSelectedQuantity(quantityCounter);
    }, [quantityCounter, selectedBrand]);

    const renderQuantityStatus = () => {

        if (!isInputValid || !isAvailableValid) {
            return <Typography color="danger" level="body-sm">Invalid input or no item selected</Typography>;
        }

        if (availableQuantity === 0) {
            return <Typography color="danger" level="body-sm">No stock available</Typography>;
        }


        if (inputQuantity > availableQuantity) {
            return (
                <Typography color="danger" level="body-sm">
                    Quantity input exceeded: {inputQuantity} / {availableQuantity}
                </Typography>
            );
        }

        if (quantityCounter <= 0) {
            return (
                <Typography color="danger" level="body-sm">
                    {inputQuantity} / 0 left
                </Typography>
            );
        }

        return (
            <Stack direction="row">
                <Typography level="body-sm">Qty:</Typography>
                <Typography ml={1} fontWeight={700}>
                    {inputQuantity} / {quantityCounter} left
                </Typography>
            </Stack>
        );
    };

    const handleAddBrand = () => {
        alert('add brand')
    }

    return (
        <Box
            sx={{
                maxHeight: '400px',
                overflowY: 'auto',
                overflowX: 'hidden',
                padding: 2,
                border: '1px solid #ddd',
                borderRadius: '8px',
            }}
        >
            <Grid container spacing={2}>
                <Grid item md={12} lg={7}>
                    <AutoCompleteComponent
                        name={'brandRegular'}
                        placeholder="Search brand..."
                        label="Brand"
                        options={brandRegularOptions}
                        loading={isBrandRegularloading}
                        value={brandRegularOptions.find(option => option.id === formik.values.brandRegular) || null}
                        onChange={(event, value) => formik.setFieldValue("brandRegular", value ? value.id : '')}
                        error={formik.touched.brandRegular && Boolean(formik.errors.brandRegular)}
                        helperText={formik.touched.brandRegular && formik.errors.brandRegular}
                        fullWidth={true}
                    />
                </Grid>
                <Grid item md={12} lg={5}>
                    <InputComponent
                        label={'Quantity'}
                        placeholder="xxx.xxx.xxx"
                        fullWidth={true}
                        name={'quantity'}
                        size={'lg'}
                        value={formik.values.quantity}
                        onChange={formik.handleChange}
                        error={
                            (formik.touched.quantity && Boolean(formik.errors.quantity)) || quantityCounter <= 0
                        }
                        helperText={
                            formik.touched.quantity && formik.errors.quantity
                                ? formik.errors.quantity
                                : quantityCounter <= 0
                                    ? ''
                                    : ''
                        }
                    />
                    <Stack mt={1} direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        {renderQuantityStatus()}
                        <IconButtonComponent
                            icon={Trash}
                            iconSize={16}
                        />
                    </Stack>
                </Grid>
            </Grid>

            <ButtonComponent type={"button"} variant={'contained'} label={'Add another brand'} onClick={handleAddBrand} endDecorator={<Plus size={20} />} />
        </Box >
    )
}

export default Regular