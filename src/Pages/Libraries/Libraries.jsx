import React, { useState } from 'react';
import { Stack, Box } from '@mui/joy';

import Header from '../../Layout/Header/Header';
import ContainerComponent from '../../Components/Container/ContainerComponent';
import InputComponent from '../../Components/Form/InputComponent';
import ButtonGroupComponent from '../../Components/ButtonGroupComponent';

import { SearchIcon } from 'lucide-react';
import { user } from '../../Data/index';

import AreasOverview from './Areas/AreasOverview';
import BrandsOverview from './Brands/BrandsOverview';
import SuppliersOverview from './Suppliers/SuppliersOverview';
import CategoriesOverview from './Categories/CategoriesOverview';
import SourceOverview from './Source/SourceOverview';
import SuppliesOverview from './Supplies/SuppliesOverview'
import UnitsOverview from './Units/UnitsOverview'

const Libraries = () => {
    const [selectedOption, setSelectedOption] = useState('Areas'); // Initial view

    const pageDetails = {
        title: "Dynamic libraries",
        description: "Set up dynamic and reusable values that you can use across different modules.",
    };

    const buttonOptions = ['Areas', 'Brands', 'Suppliers', 'Categories', 'Units', 'Source', 'Item Names'];

    // Conditionally render views based on the selected option
    const renderContent = () => {
        switch (selectedOption) {
            case 'Areas':
                return <div><AreasOverview /></div>;
            case 'Brands':
                return <div><BrandsOverview /></div>;
            case 'Suppliers':
                return <div><SuppliersOverview /></div>;
            case 'Categories':
                return <div><CategoriesOverview /></div>;
            case 'Units':
                return <div><UnitsOverview /></div>;
            case 'Source':
                return <div><SourceOverview /></div>;
            case 'Item Names':
                return <div><SuppliesOverview /></div>;
            default:
                return null;
        }
    };

    return (
        <>
            <Header pageDetails={pageDetails} data={user} />
            <Stack gap={2} mt={2}>
                {/* Search and filter */}
                <ContainerComponent>
                    <Stack
                        direction="row"
                        alignItems="flex-end"
                    >
                        {/* Search */}
                        <InputComponent
                            label="Find a record"
                            placeholder="Find by names, brands, categories, etc."
                            startIcon={<SearchIcon />}
                            width={500}
                        />
                        <Box ml={2}>
                            <ButtonGroupComponent
                                buttonOptions={buttonOptions}
                                selectedOption={selectedOption}
                                onOptionChange={setSelectedOption}
                            />
                        </Box>
                    </Stack>
                </ContainerComponent>

                {/* Render the content based on selected option */}
                <ContainerComponent>
                    {renderContent()}
                </ContainerComponent>
            </Stack>
        </>
    );
};

export default Libraries;