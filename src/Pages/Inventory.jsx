import React, { Fragment } from "react";
import PageTitle from "../Components/PageSetup/PageTitle";
import { Box, Stack, Typography, useTheme } from "@mui/joy";
import ButtonComponent from "../Components/ButtonComponent";
import ContainerComponent from "../Components/Container/ContainerComponent";
import InputComponent from "../Components/Form/InputComponent";
import { SearchIcon } from "lucide-react";
import TableComponent from "../Components/Table/TableComponent";
import PaginatedTable from "../Components/Table/PaginatedTable";

const Inventory = () => {
  const theme = useTheme();
  return (
    <Fragment>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-end"
        mb={2}
      >
        <PageTitle
          title="Inventory"
          description={"See the list of items in your inventory."}
        />
        <ButtonComponent label="Generate Report" />
      </Stack>
      <Stack gap={2}>
        <ContainerComponent>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-end"
          >
            <InputComponent label="Find a slip" startIcon={<SearchIcon />} />
          </Stack>
        </ContainerComponent>
        <ContainerComponent>
          <PaginatedTable />
        </ContainerComponent>
      </Stack>
    </Fragment>
  );
};

export default Inventory;
