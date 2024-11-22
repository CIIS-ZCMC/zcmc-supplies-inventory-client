import React, { useEffect } from 'react';

import { Stack, Typography, Divider, Alert } from '@mui/joy';
import { CircleAlert } from 'lucide-react';

import AutoCompleteComponent from '../../../Components/Form/AutoCompleteComponent';
import AccordionComponent from '../../../Components/AccordionComponent';

const Step1Form = ({ itemName, setItemName, formik, accordionData, suppliesOptions, isSuppliesLoading, setSelectedId, selectedId, selectedQuantity }) => {

    useEffect(() => {
        setSelectedId(itemName)
    }, [itemName])

    return (
        <div>
            <AutoCompleteComponent
                name={'itemName'}
                placeholder="Search Item..."
                label={'Item Name'}
                options={suppliesOptions}
                loading={isSuppliesLoading}
                value={suppliesOptions?.find(option => option.id === itemName) || null}
                onChange={
                    (event, value) => { setItemName(value?.id || null); }}
                // error={ }
                // helperText={ }
                fullWidth={true}
            />

            <Stack my={1}>
                <Typography level={'body-sm'}>
                    Item's current stock level: value remaining {selectedId}
                </Typography>
                <Divider sx={{ my: 1 }}></Divider>
                <Alert
                    variant="soft"
                    color="neutral"
                    size="sm"
                    startDecorator={<CircleAlert size={16} />}
                    sx={{ borderRadius: 10 }}
                >
                    You can separately add an item with multiple brands both on Regular and Donation sources and submit it once.
                </Alert>
            </Stack>

            <AccordionComponent accordionData={accordionData} />
        </div>
    );
};

export default Step1Form;
