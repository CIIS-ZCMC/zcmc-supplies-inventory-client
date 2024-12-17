import React, { useState } from 'react';
import { Stack, Box, Divider } from '@mui/joy';

import Header from '../../Layout/Header/Header';
import ContainerComponent from '../../Components/Container/ContainerComponent';
import InputComponent from '../../Components/Form/InputComponent';
import ButtonGroupComponent from '../../Components/ButtonGroupComponent';
import SelectComponent from '../../Components/Form/SelectComponent';
import ButtonComponent from '../../Components/ButtonComponent';

import { SearchIcon } from 'lucide-react';
import { user, sortFilter } from '../../Data/index';

import AreasOverview from './Areas/AreasOverview';
import BrandsOverview from './Brands/BrandsOverview';
import SuppliersOverview from './Suppliers/SuppliersOverview';
import CategoriesOverview from './Categories/CategoriesOverview';
import SourceOverview from './Source/SourceOverview';
import SuppliesOverview from './Supplies/SuppliesOverview'
import UnitsOverview from './Units/UnitsOverview'

import useFilterHook from '../../Hooks/FilterHook';

const Libraries = () => {

    const { sortOrder, setSortOrder, searchTerm, setSearchTerm, filteredInventory } = useFilterHook();

    const [selectedOption, setSelectedOption] = useState('Areas');

    const pageDetails = {
        title: "Dynamic libraries",
        description: "Set up dynamic and reusable values that you can use across different modules.",
    };

    const buttonOptions = ['Areas', 'Brands', 'Suppliers', 'Categories', 'Units', 'Source', 'Item Names'];

    // Conditionally render views based on the selected option
    const renderContent = () => {
        switch (selectedOption) {
            case 'Areas':
                return <div><AreasOverview filter={filteredInventory} /></div>;
            case 'Brands':
                return <div><BrandsOverview filter={filteredInventory} /></div>;
            case 'Suppliers':
                return <div><SuppliersOverview filter={filteredInventory} /></div>;
            case 'Categories':
                return <div><CategoriesOverview filter={filteredInventory} /></div>;
            case 'Units':
                return <div><UnitsOverview filter={filteredInventory} /></div>;
            case 'Source':
                return <div><SourceOverview filter={filteredInventory} /></div>;
            case 'Item Names':
                return <div><SuppliesOverview filter={filteredInventory} /></div>;
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
                    <Stack my={2}>
                        <Box>
                            <ButtonGroupComponent
                                buttonOptions={buttonOptions}
                                selectedOption={selectedOption}
                                onOptionChange={setSelectedOption}
                            />
                        </Box>
                    </Stack>

                    <Divider></Divider>

                    <Stack
                        direction="row"
                        justifyContent={'space-between'}
                        alignItems="center"
                        spacing={2}
                        my={1}
                    >
                        {/* Search */}
                        <InputComponent
                            // label="Find a record"
                            placeholder="Find by names, brands, categories, etc."
                            startIcon={<SearchIcon />}
                            width={500}
                            value={searchTerm}
                            setValue={setSearchTerm}
                        />
                        <Box>
                            <SelectComponent
                                startIcon={"Sort by:"}
                                placeholder={"category"}
                                options={sortFilter}
                                value={sortOrder}
                                onChange={setSortOrder}
                            />
                            {/* <ButtonComponent
                                size="sm"
                                variant={"outlined"}
                                label={"Clear Filters"}
                                onClick={clearFilters}
                            /> */}
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
