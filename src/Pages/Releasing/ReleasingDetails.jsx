import React from 'react';

import { Button, Card, Divider, Grid, Sheet, Stack, Typography } from '@mui/joy';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';


import { user } from '../../Data/index';
import useReleasingHook from '../../Hooks/ReleasingHook';
import Header from '../../Layout/Header/Header';
import LabelComponent from '../../Components/Typography/LabelComponent';

const ReleasingDetails = () => {

    const { id: urlId } = useParams(); // Get the `id` from the URL

    const { getStockOut } = useReleasingHook();

    const { data, isLoading, error } = useQuery({
        queryKey: ['stockout'],
        queryFn: getStockOut,
    })

    const stockoutData = data?.data;

    const filteredItems = stockoutData?.filter((item) => item.id === Number(urlId));

    // Destructure the first item in filteredItems, if available
    const {
        id,
        supply_name,
        area_name,
        unit_name,
        category_name,
        transaction_type,
        quantity,
        requested_quantity,
        ris_no,
        ris_date,
        purchase_order_no,
        iar_no,
        remarks,
        source_name,
        expiry_date,
        delivery_date,
        brand_name,
        supplier_name,
    } = filteredItems?.[0] || {};

    const pageDetails = {
        title: "Transaction Overview",
        description: "Complete information about an IAR. This record cannot be edited."
    }


    return (
        <>
            {JSON.stringify(filteredItems)}
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
                    </Grid>

                </Sheet>
            </Stack>
        </>
    );
};

export default ReleasingDetails;
