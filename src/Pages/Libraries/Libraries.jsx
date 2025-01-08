import React, { useEffect } from 'react';
import { Stack, Box, Divider } from '@mui/joy';

import Header from '../../Layout/Header/Header';
import ContainerComponent from '../../Components/Container/ContainerComponent';
import InputComponent from '../../Components/Form/InputComponent';
import ButtonGroupComponent from '../../Components/ButtonGroupComponent';
import SelectComponent from '../../Components/Form/SelectComponent';

import { SearchIcon } from 'lucide-react';

import { useNavigate, useLocation, Routes, Route, } from 'react-router-dom';

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

    const navigate = useNavigate()
    const location = useLocation()


    // Define the available routes and their corresponding components
    const routes = {
        areas: <AreasOverview filter={filteredInventory} />,
        brands: <BrandsOverview filter={filteredInventory} />,
        suppliers: <SuppliersOverview filter={filteredInventory} />,
        categories: <CategoriesOverview filter={filteredInventory} />,
        units: <UnitsOverview filter={filteredInventory} />,
        source: <SourceOverview filter={filteredInventory} />,
        supplies: <SuppliesOverview filter={filteredInventory} />,
    };

    // Extract the current selected option from the URL
    const currentPath = location.pathname.split("/").pop();
    const defaultOption = "areas"; // Default option if no route is selected

    useEffect(() => {
        // Redirect to the default route if no child route is selected
        if (location.pathname === "/libraries") {
            navigate(`/libraries/${defaultOption}`);
        }
    }, [location.pathname, navigate, defaultOption]);

    const pageDetails = {
        title: "Dynamic libraries",
        description: "Set up dynamic and reusable values that you can use across different modules.",
    };

    return (
        <>
            <Header pageDetails={pageDetails} data={user} />
            <Stack gap={2} mt={2}>
                <ContainerComponent>
                    <Stack my={2}>
                        <Box>
                            <ButtonGroupComponent
                                buttonOptions={Object.keys(routes).map((key) => key.charAt(0).toUpperCase() + key.slice(1).replace("-", " "))}
                                selectedOption={currentPath || defaultOption}
                                onOptionChange={(option) => {
                                    // Navigate to the selected route
                                    const formattedOption = option.toLowerCase().replace(" ", "-");
                                    navigate(`/libraries/${formattedOption}`);
                                }}
                            />
                        </Box>
                    </Stack>

                    <Divider></Divider>

                    <Stack direction="row" justifyContent={"space-between"} alignItems="center" spacing={2} my={1}>
                        {/* Search */}
                        <InputComponent
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
                        </Box>
                    </Stack>
                </ContainerComponent>

                {/* Render the content based on the current route */}
                <ContainerComponent>
                    <Routes>
                        {Object.entries(routes).map(([path, component]) => (
                            <Route key={path} path={path} element={component} />
                        ))}
                    </Routes>
                </ContainerComponent>
            </Stack>
        </>
    );
};

export default Libraries;
