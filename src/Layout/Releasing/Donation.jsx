import React, { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Grid, Typography, Stack, Box, Divider } from '@mui/joy';

import { Trash, Plus, } from 'lucide-react';

import AutoCompleteComponent from '../../Components/Form/AutoCompleteComponent';
import InputComponent from '../../Components/Form/InputComponent';
import IconButtonComponent from '../../Components/IconButtonComponent';
import ButtonComponent from '../../Components/ButtonComponent';

import useReleasingHook from '../../Hooks/ReleasingHook';

const Donation = ({ setIsValid, qtyRequest, errors, setTotalDonationQtyBrands, selectedId, donationBrands, setDonationBrands }) => {

    const totalDonationBrands = donationBrands?.reduce((acc, donation) => acc + Number(donation.quantity || 0), 0);

    useEffect(() => {
        setTotalDonationQtyBrands(totalDonationBrands)
    }, [totalDonationBrands])

    const { getBrandDonation } = useReleasingHook();

    const { data: brandDonationData, isLoading: isBrandDonationloading } = useQuery({
        queryKey: ['brand-donation', selectedId],
        queryFn: () => getBrandDonation(selectedId),
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

    const brandDonationOptions = useMemo(() => mapOptions(brandDonationData, 'concatenated_info'), [brandDonationData])

    const [donationBrand, setDonationBrand] = useState(); //Value is ID
    const [donationSource, setDonationSource] = useState(); //Value is ID
    const [donationQuantity, setDonationQuantity] = useState();
    const [donationExpirationDate, setDonationExpirationDate] = useState();

    const handleAddBrand = () => {
        setDonationBrands((prevList) => [
            ...prevList,
            {
                brand_id: donationBrand,
                source_id: donationSource,
                quantity: donationQuantity,
                expiration_date: donationExpirationDate
            }]);

        // Reset the state for brand and quantity inputs
        setDonationBrand();
        setDonationSource();
        setDonationQuantity("");
        setDonationExpirationDate("");
    };

    const handleRemoveBrand = (index) => {
        const updatedList = donationBrands.filter((_, i) => i !== index);
        setDonationBrands(updatedList);
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
            {donationBrands.map((item, index) => (
                <> <Grid container spacing={2} >
                    {/* Brand Selection */}
                    <Grid item md={7} lg={7}>
                        <AutoCompleteComponent
                            name={'brandDonation'}
                            placeholder="Search brand..."
                            label={'Brand'}
                            options={brandDonationOptions}
                            loading={isBrandDonationloading}
                            value={brandDonationOptions.find(option => option.id === item.brand_id) || null}
                            onChange={(e, value) => {
                                const updatedList = [...donationBrands];
                                updatedList[index].brand_id = value?.id || null;
                                updatedList[index].source_id = value?.source_id || null;
                                updatedList[index].expiration_date = value?.expiration_date || null;
                                setDonationBrands(updatedList);
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
                            onChange={(e) => {
                                const updatedList = [...donationBrands];
                                const parsedValue = parseFloat(e.target.value) || 0;
                                updatedList[index].quantity = parsedValue;
                                setDonationBrands(updatedList);

                                if (updatedList[index].quantity > qtyRequest) {
                                    setIsValid(true);   // Valid, allow proceeding
                                } else {
                                    setIsValid(false);  // Invalid, prevent proceeding
                                }

                                // console.log(typeof updatedList[index].quantity); // Optionally log the type of the quantity
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
                                                            {`${item.quantity || 0} specified / ${brandDonationOptions.find(option => option.id === item.brand_id)?.quantity || 0
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

                </Grid>
                    <Divider sx={{ my: 2 }} />
                </>

            ))}

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

export default Donation