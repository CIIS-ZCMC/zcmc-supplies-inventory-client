import React, { Fragment } from "react";
import { user } from "../Data/index";
import Header from "../Layout/Header/Header";
import ContainerComponent from "../Components/Container/ContainerComponent";
import PaginatedTable from "../Components/Table/PaginatedTable";
import { Box, Divider, Stack, TabList, Tabs, Typography } from "@mui/joy";
import ButtonComponent from "../Components/ButtonComponent";
import TabComponent from "../Components/TabComponent";
import TableComponent from "../Components/Table/TableComponent";

function Reports(props) {
  const pageDetails = {
    title: "Reports",
    description:
      "Generate different types of reports here on-demand to fit your data-intensive requirements.",
    pagePath: "/reports",
  };

  const tabsData = [
    { label: "Item count", content: <TableComponent /> },
    { label: "Starting balance", content: <TableComponent /> },
    { label: "Near expiration date", content: <TableComponent /> },
    { label: "Zero stocks", content: <TableComponent /> },
    { label: "Most consumed items", content: <TableComponent /> },
    { label: "Items with sufficient stocks", content: <TableComponent /> },
    { label: "Unconsumed without RIS", content: <TableComponent /> },
    { label: "Reorder items", content: <TableComponent /> },
    { label: "For disposal", content: <TableComponent /> },
  ];
  return (
    <Fragment>
      <Header pageDetails={pageDetails} data={user} />
      <ContainerComponent>
        <Stack
          spacing={1}
          direction="row"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <Box>
            <Typography level="title-lg">System-generated reports</Typography>
            <Typography level="body-sm" color="#666666">
              See how resource supplies were accumulated, consumed and moved in
              your organization’s inventory.
            </Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            <ButtonComponent
              variant={"outlined"}
              label={"View report sumamry"}
            />
            <ButtonComponent label={"Generate report"} />
          </Stack>
        </Stack>
        <Divider sx={{ my: 3, color: "#E6E6E6" }} />
        <TabComponent tabs={tabsData} />
      </ContainerComponent>
    </Fragment>
  );
}

export default Reports;
