import React from 'react';
import { Grid, Stack, Box, Typography, Divider, Sheet, Card, Button } from '@mui/joy';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { user } from '../../Data/index';
import useReceivingHook from '../../Hooks/ReceivingHook'
import Header from '../../Layout/Header/Header';
import LabelComponent from '../../Components/Typography/LabelComponent';

const ReceivingDetails = () => {

    const { id: urlId } = useParams(); // Get the `id` from the URL

    const { getStockIn } = useReceivingHook();

    const { data, isLoading, error } = useQuery({
        queryKey: ['stockin'],
        queryFn: getStockIn,
    })

    const stockinData = data?.data;

    const filteredItems = stockinData?.filter((item) => item.id === Number(urlId));

    // Destructure the first item in filteredItems, if available
    const {
        purchase_order_no,
        supply_name,
        brand_name,
        iar_no,
        category_name,
        supplier_name,
        source_name,
        quantity,
        expiry_date,
        delivery_date,
        unit_name
    } = filteredItems?.[0] || {};

    const pageDetails = {
        title: "Transaction Overview",
        description: "Complete information about an IAR. This record cannot be edited."
    }

    return (
        <>
            <Header pageDetails={pageDetails} data={user} />

            <Stack pt={2} pr={4}>
                <Sheet
                    variant="outlined"
                    sx={{
                        p: 2,
                        borderRadius: '10px',
                        width: '100%'
                    }}
                >


                    <Stack direction="row" spacing={2} alignItems="center" pb={2}>
                        <Button variant="outlined" onClick={() => { }}>
                            Back
                        </Button>

                        <Typography level="h4">Item Details</Typography>
                    </Stack>


                    <Divider />

                    <Grid container spacing={2} mt={2}>
                        {/* Group 1 */}
                        <Grid item width={"100%"}>
                            <Card sx={{ p: 2 }}>
                                <LabelComponent label="PO Number:" value={purchase_order_no} />
                                <LabelComponent label="Item Name:" value={supply_name} />
                                <LabelComponent label="Item Brand:" value={brand_name} />
                            </Card>
                        </Grid>

                        {/* Group 2 */}
                        <Grid item xs={12} md={6}>
                            <Card sx={{ p: 2 }}>
                                <LabelComponent label="IAR Number:" value={iar_no} />
                                <LabelComponent label="Category:" value={category_name} />
                                <LabelComponent label="Source:" value={source_name} />
                                <LabelComponent label="Supplier:" value={supplier_name} />
                            </Card>
                        </Grid>

                        {/* Group 3 */}
                        <Grid item xs={12} md={6}>
                            <Card sx={{ p: 2 }}>
                                <LabelComponent label="Unit:" value={unit_name} />
                                <LabelComponent label="Quantity:" value={quantity} />
                                <LabelComponent label="Expiry Date:" value={expiry_date} />
                                <LabelComponent label="Date Delivered:" value={delivery_date} />
                            </Card>
                        </Grid>
                    </Grid>

                </Sheet>
            </Stack>
        </>
    )
}

export default ReceivingDetails
