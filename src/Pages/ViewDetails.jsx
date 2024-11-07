import React, { Fragment, useEffect } from "react";
import Header from "../Layout/Header/Header";
import useSelectedRow from "../Store/SelectedRowStore";
import { items, user } from "../Data/index";
import ContainerComponent from "../Components/Container/ContainerComponent";
import PaginatedTable from "../Components/Table/PaginatedTable";
import useInventoryHook from "../Hooks/InventoryHook";
import { Box, Stack, Typography } from "@mui/joy";
import BoxComponent from "../Components/Container/BoxComponent";
import { BiCategory } from "react-icons/bi";
import { useTheme } from "@emotion/react";
import { MdAppShortcut, MdTune } from "react-icons/md";
import { GrApps } from "react-icons/gr";
import ButtonComponent from "../Components/ButtonComponent";

export const BoxItem = ({ icon, iconColor, categoryTitle, categoryName }) => {
  const theme = useTheme(); // Access the theme

  return (
    <BoxComponent>
      <Box display="flex" alignItems="center" padding={1}>
        {icon}
        <Box ml={1}>
          <Typography level="body-sm">{categoryTitle}</Typography>
          <Typography level="title-lg">{categoryName}</Typography>
        </Box>
      </Box>
    </BoxComponent>
  );
};

function ViewDetails(props) {
  const theme = useTheme();
  const { selectedRow } = useSelectedRow();
  const { details, getInventoryDetails } = useInventoryHook();
  console.log(selectedRow);

  const pageDetails = {
    pageTitle: `Viewing "${selectedRow?.supply_name}"`,
    title: "Inventory",
    description:
      "See how an RIS item was received by your inventory, including more information about its integrity.",
    pagePath: "/inventory",
    subTitle: "Viewing Item",
    subPath: "/inventory/viewing",
  };
  const columns = [
    { id: "id", label: "#" },
    { id: "supply_name", label: "Item Name" },
    { id: "category_name", label: "Category" },
    { id: "unit_name", label: "Unit" },
    { id: "quantity", label: "Quantity" },
  ];

  const totalQuantity = details.reduce((sum, item) => sum + item.quantity, 0);

  console.log("Total Quantity:", totalQuantity);
  useEffect(() => {
    const timeout = setTimeout(() => {
      getInventoryDetails(selectedRow.id);
    }, 300);
    return () => {
      clearTimeout(timeout);
    };
  }, [getInventoryDetails]);
  return (
    <Fragment>
      <Header pageDetails={pageDetails} data={user} />
      <Stack my={2}>
        <Stack direction="row" justifyContent="space-between" spacing={2}>
          <BoxItem
            icon={
              <BiCategory
                fontSize={25}
                color="darkBlue"
                style={{
                  padding: 10,
                  backgroundColor: theme.palette.custom.lighter,
                  borderRadius: 5,
                }}
              />
            }
            categoryName={selectedRow.category_name}
            categoryTitle={"Item category"}
          />
          <BoxItem
            icon={
              <GrApps
                fontSize={25}
                color="darkBlue"
                style={{
                  padding: 10,
                  backgroundColor: theme.palette.custom.lighter,
                }}
              />
            }
            categoryName={selectedRow.quantity}
            categoryTitle={"Total quantity"}
          />
          <BoxItem
            icon={
              <MdTune
                fontSize={25}
                color="darkBlue"
                style={{
                  padding: 10,
                  backgroundColor: theme.palette.custom.lighter,
                }}
              />
            }
            categoryName={selectedRow.unit_name}
            categoryTitle={"Type of unit"}
          />
        </Stack>
      </Stack>
      <ContainerComponent>
        <PaginatedTable
          tableTitle={"More information"}
          tableDesc={
            "A single item can have multiple brands, suppliers, expiry dates and more."
          }
          columns={columns}
          rows={details}
          actionBtns={
            <Stack direction="row" spacing={1}>
              <ButtonComponent
                variant={"outlined"}
                label="Generate report"
                size="lg"
              />
            </Stack>
          }
        />
      </ContainerComponent>
    </Fragment>
  );
}

export default ViewDetails;
