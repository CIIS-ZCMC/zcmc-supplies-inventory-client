import React, { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Grid, Typography, Stack, Box, Divider } from '@mui/joy';

import { Trash, Plus, } from 'lucide-react';

import AutoCompleteComponent from '../../Components/Form/AutoCompleteComponent';
import InputComponent from '../../Components/Form/InputComponent';
import IconButtonComponent from '../../Components/IconButtonComponent';
import ButtonComponent from '../../Components/ButtonComponent';

import useReleasingHook from '../../Hooks/ReleasingHook';

const Regular = ({ setIsValid, qtyRequest, errors, selectedId, setTotalRegularQtyBrands, setSelectedQuantity, regularBrands, setRegularBrands }) => {

    useEffect(() => {
        console.log(typeof qtyRequest, qtyRequest);
    }, [qtyRequest])

    const totalRegularBrands = regularBrands?.reduce((acc, regular) => acc + Number(regular.quantity || 0), 0);

    useEffect(() => {
        setTotalRegularQtyBrands(totalRegularBrands)
    }, [totalRegularBrands])

    const { getBrandRegular } = useReleasingHook();

    const { data: brandRegularData, isLoading: isBrandRegularloading } = useQuery({
        queryKey: ['brand-regular', selectedId],
        queryFn: () => getBrandRegular(selectedId),
        enabled: selectedId != null && selectedId !== "", // Ensure selectedId is not null or empty
        staleTime: Infinity,
        cacheTime: Infinity,
    });

    const mapOptions = (data, labelKey) =>
        data?.map(item => ({
            id: item.brand_id,
            label: item[labelKey],
            source_id: item.source_id,
            quantity: item.quantity,
            expiration_date: item.expiration_date
        })) || [];

    const brandRegularOptions = useMemo(() => mapOptions(brandRegularData, 'concatenated_info'), [brandRegularData])

    const [regularBrand, setRegularBrand] = useState(); //Value is ID
    const [regularSource, setRegularSource] = useState(); //Value is ID
    const [regularQuantity, setRegularQuantity] = useState();
    const [regularExpirationDate, setRegularExpirationDate] = useState();

    const handleAddBrand = () => {
        setRegularBrands((prevList) => [
            ...prevList,
            {
                brand_id: regularBrand,
                source_id: regularSource,
                quantity: regularQuantity,
                expiration_date: regularExpirationDate
            }
        ]);
        // Reset the state for brand and quantity inputs
        setRegularBrand();
        setRegularSource();
        setRegularQuantity("");
        setRegularExpirationDate("");
    };

    const handleRemoveBrand = (index) => {
        const updatedList = regularBrands.filter((_, i) => i !== index);
        setRegularBrands(updatedList);
    };

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
            {regularBrands.map((item, index) => (
                <> <Grid container spacing={2} >
                    {/* Brand Selection */}
                    <Grid item md={7} lg={7}>
                        <AutoCompleteComponent
                            name={'brandRegular'}
                            placeholder="Search brand..."
                            label={'Brand'}
                            options={brandRegularOptions}
                            loading={isBrandRegularloading}
                            value={brandRegularOptions.find(option => option.id === item.brand_id)}
                            onChange={(e, value) => {
                                const updatedList = [...regularBrands];
                                updatedList[index].brand_id = value?.id;
                                updatedList[index].source_id = value?.source_id;
                                updatedList[index].expiration_date = value?.expiration_date;
                                setRegularBrands(updatedList);
                            }}
                            fullWidth={true}
                            error={!item.brand_id && errors.brand_id}
                            helperText={
                                !item.brand_id && <Typography color='danger' level='body-xs'>{errors.brand_id}</Typography>
                            }
                        />
                    </Grid>

                    {/* Quantity Input */}
                    <Grid item xs={11} md={5} lg={5}>
                        <InputComponent
                            label="Quantity"
                            placeholder="xxx.xxx.xxx"
                            fullWidth={true}
                            name={`quantity-${index}`}
                            size="lg"
                            value={item.quantity}
                            error={!item.quantity && errors.quantity}
                            onChange={(e) => {
                                const updatedList = [...regularBrands];
                                const parsedValue = parseFloat(e.target.value) || 0;
                                updatedList[index].quantity = parsedValue;
                                setRegularBrands(updatedList);

                                if (updatedList[index].quantity > qtyRequest) {
                                    setIsValid(true);   // Valid, allow proceeding
                                } else {
                                    setIsValid(false);  // Invalid, prevent proceeding
                                }
                            }}

                            helperText={
                                <Stack direction="row" alignItems="center" justifyContent="space-between">
                                    {
                                        !item.quantity ? (
                                            <Typography color="danger" level="body-xs">
                                                {errors.quantity}
                                            </Typography>
                                        ) : (
                                            <Typography level="body-xs" sx={{ mt: 1 }}>
                                                {item.brand_id ? (
                                                    item.quantity > qtyRequest ? (
                                                        <span style={{ color: 'red' }}>
                                                            Quantity inputted exceeds quantity requested ({qtyRequest})
                                                        </span>
                                                    ) : (
                                                        <span
                                                            style={{
                                                                color: !item.quantity || item.quantity === 0 ? 'red' : 'inherit',
                                                            }}
                                                        >
                                                            {`${item.quantity || 0} specified / ${brandRegularOptions.find(option => option.id === item.brand_id)?.quantity || 0
                                                                } left`}
                                                        </span>
                                                    )
                                                ) : (
                                                    <span style={{ color: 'red' }}>Please select a brand first</span>
                                                )}
                                            </Typography>
                                        )
                                    }

                                    {/* Trash Icon Button */}
                                    <IconButtonComponent
                                        color="danger"
                                        icon={Trash}
                                        iconSize={16}
                                        onClick={() => handleRemoveBrand(index)}
                                    />
                                </Stack>
                            }
                        />
                    </Grid>

                </Grid >
                    <Divider sx={{ my: 2 }} />
                </>
            ))
            }

            <ButtonComponent
                type="button"
                variant="contained"
                label="Add another brand"
                onClick={handleAddBrand} // Trigger appending
                endDecorator={<Plus size={20} />}
            />
        </Box >
    )
}

export default Regular