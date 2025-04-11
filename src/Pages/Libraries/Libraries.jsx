import React, { useEffect, useState } from "react";
import { Stack, Box, Divider,Button } from "@mui/joy";

import Header from "../../Layout/Header/Header";
import ContainerComponent from "../../Components/Container/ContainerComponent";
import InputComponent from "../../Components/Form/InputComponent";
import ButtonGroupComponent from "../../Components/ButtonGroupComponent";
import SelectComponent from "../../Components/Form/SelectComponent";

import { SearchIcon } from "lucide-react";

import { useNavigate, useLocation, Outlet } from "react-router-dom";

import { user, sortFilter } from "../../Data/index";
import ButtonComponent from "../../Components/ButtonComponent";
//pages
import AreasOverview from "./Areas/AreasOverview";
import BrandsOverview from "./Brands/BrandsOverview";
import SuppliersOverview from "./Suppliers/SuppliersOverview";
import CategoriesOverview from "./Categories/CategoriesOverview";
import SourceOverview from "./Source/SourceOverview";
import SuppliesOverview from "./Supplies/SuppliesOverview";
import UnitsOverview from "./Units/UnitsOverview";

//custom hooks
import useFilterHook from "../../Hooks/FilterHook";
import { useQuery } from "@tanstack/react-query";
import { Fetch } from "./Fetch";

const Libraries = () => {
  const {
    sortOrder,
    setSortOrder,
    searchTerm,
    setSearchTerm,
    filteredInventory,
  } = useFilterHook();

  const { data, isLoading, error, status, isFetching } = useQuery({
    queryKey: ["supplies"],
  });

  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname.split("/").pop();
  const defaultOption = "areas"; // Default option if no route is selected

  const routes = [
    { id: 1, label: "Areas", path: "libraries/areas" },
    { id: 2, label: "Brands", path: "libraries/brands" },
    { id: 3, label: "Suppliers", path: "libraries/suppliers" },
    { id: 4, label: "Categories", path: "libraries/categories" },
    { id: 5, label: "Units", path: "libraries/units" },
    { id: 6, label: "Source", path: "libraries/source" },
    { id: 7, label: "Supplies", path: "libraries/supplies" },
  ];

  const [selectedOption, setSelectedOption] = useState(routes[0].path);

  useEffect(() => {
    // Redirect to the default route if no child route is selected
    if (location.pathname === "/libraries") {
      navigate(`/libraries/${defaultOption}`);
    }
  }, [location.pathname, navigate, defaultOption]);

  const pageDetails = {
    title: "Dynamic libraries",
    description:
      "Set up dynamic and reusable values that you can use across different modules.",
  };

  const handleOnButtonGroupClick = (path) => {
    setSelectedOption(path);
    navigate(`/${path}`);
  };

  return (
    <>
      {/* {JSON.stringify(isFetching)} */}
      <Header pageDetails={pageDetails} data={user} />
      <Stack gap={2} mt={2}>
        <ContainerComponent>
          <Stack direction="row" alignItems="center" spacing={2} my={1}>
            {/* Search */}
            <InputComponent
              placeholder="Find by names, brands, categories, etc."
              startIcon={<SearchIcon />}
              width={500}
              value={searchTerm}
              setValue={setSearchTerm}
            />

            <Box>
              <ButtonGroupComponent
                buttonOptions={routes}
                selectedOption={selectedOption}
                onChange={handleOnButtonGroupClick}
              />
              
            </Box>
            <Box sx={{padding:"6px 0 0 0"}}>
          
             <Fetch/>
            </Box>

            {/* <Box>
                            <SelectComponent
                                startIcon={"Sort by:"}
                                placeholder={"category"}
                                options={sortFilter}
                                value={sortOrder}
                                onChange={setSortOrder}
                            />
                        </Box> */}
          </Stack>

          <Divider></Divider>

          {currentPath === "areas" && (
            <AreasOverview filter={filteredInventory} />
          )}

          {currentPath === "brands" && (
            <BrandsOverview filter={filteredInventory} />
          )}

          {currentPath === "suppliers" && (
            <SuppliersOverview filter={filteredInventory} />
          )}

          {currentPath === "categories" && (
            <CategoriesOverview filter={filteredInventory} />
          )}

          {currentPath === "units" && (
            <UnitsOverview filter={filteredInventory} />
          )}

          {currentPath === "source" && (
            <SourceOverview filter={filteredInventory} />
          )}

          {currentPath === "supplies" && (
            <SuppliesOverview filter={filteredInventory} />
          )}
        </ContainerComponent>
        
      </Stack>
    </>
  );
};

export default Libraries;
