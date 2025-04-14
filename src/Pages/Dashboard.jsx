import { Fragment, useEffect, useState } from "react";

import { Box, Stack, Divider, Typography, Chip } from "@mui/joy";
import { Info, SquareArrowOutUpRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import * as XLSX from 'xlsx'

import { Link } from "react-router-dom";

import Header from "../Layout/Header/Header";

import ContainerComponent from "../Components/Container/ContainerComponent";
import ButtonGroupComponent from "../Components/ButtonGroupComponent";
import BoxComponent from "../Components/Container/BoxComponent";
import PaginatedTable from "../Components/Table/PaginatedTable";
import ButtonComponent from "../Components/ButtonComponent";
import SnackbarComponent from "../Components/SnackbarComponent";

import useDashboardHook from "../Hooks/DashboardHook";
import useSnackbarHook from "../Hooks/AlertHook";

import { user, legends } from '../Data/index';
import { dashboardHeader } from "../Data/TableHeader";
import { Fetch } from "./Libraries/Fetch";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  const { getDashboardTotal, getDashboardSupplies } = useDashboardHook();
  const { open, message, color, variant, anchor, showSnackbar, closeSnackbar, } = useSnackbarHook();

  const { data: dashboardTotal, isLoading, error } = useQuery({
    queryKey: ['dashboard-total'],
    queryFn: getDashboardTotal,
  })

  const { data: dashboardSupplies, isLoading: dashboardLoading } = useQuery({
    queryKey: ['dashboard-supplies'],
    queryFn: getDashboardSupplies,
  })

  const { items_for_disposal, most_consumed_items, not_consumed_without_ris, reorder_items, sufficient_but_not_consumed, zero_stocks } = dashboardTotal || {}

  const dashboardSuppiesData = dashboardSupplies || []

  // useEffect(() => {
  //   console.log(dashboardSuppiesData)
  // }, [dashboardSuppiesData])

  const [selectedOption, setSelectedOption] = useState('All areas'); // Initial view

  const pageDetails = {
    title: "Dashboard",
    description: "Track and oversee how your inventory has changed over time.",
  };

  const statistics = [
    {
      count: reorder_items,
      title: "Reorder items",
      link: '/reports/reordered-items',
      label: 'Go to reordered items'
    },

    {
      count: most_consumed_items,
      title: "Most consumed items",
      link: '/reports/consumed-items',
      label: 'Go to consumed items'
    },

    {
      count: items_for_disposal,
      title: "items for disposal ",
      link: '/reports/disposal-items',
      label: 'Go to items for disposal'
    },

    {
      count: zero_stocks,
      title: "Zero stock since start of year",
      link: '/reports/zero-stocks-items',
      label: 'Go to zero-stock items'
    },

    {
      count: sufficient_but_not_consumed,
      title: "Sufficient but not consumed",
      link: '/reports/unconsumed-items',
      label: 'Go to unconsumed items'
    },

    {
      count: not_consumed_without_ris,
      title: "Not consumed without ris",
      link: '/reports/without-ris-items',
      label: 'Go to unconsumed items'
    },
  ]

  const buttonOptions = ['All areas', 'Medical', 'Janitorial', 'Office'];

  const generateReport = () => {
    try {
      const worksheet = XLSX.utils.json_to_sheet(dashboardSuppiesData); //convert jsonData to worksheet

      const columnWidth = { wpx: 150 }; // Set desired column width in pixels

      //Set the same column width for all columns
      worksheet["!cols"] = new Array(
        dashboardSupplies[0] ? Object.keys(dashboardSupplies[0]).length : 0
      ).fill(columnWidth);

      // Enable text wrap for all header cells
      const header = worksheet["!cols"] ? worksheet["!cols"] : [];
      header.forEach((col, index) => {
        if (!col) header[index] = { alignment: { wrapText: true } }; // Apply wrapText to each header
      });

      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(
        workbook,
        worksheet
      )

      XLSX.writeFile(
        workbook,
        `stockin_repost.xlsx`
      )

      showSnackbar("Report generated successfully!", "success", "filled");
    } catch (error) {
      showSnackbar(
        `Failed to generate the report. Please try again. ${error}`,
        "danger",
        "filled"
      );
    }
  }

  const handleNavigateRoute = (link) => {
    console.log(link)
    if (link) {
      navigate(link);
    }
  }

  return (
    <Fragment>
      <Header pageDetails={pageDetails} data={user} />
      <Stack gap={2} mt={2}>

        <ContainerComponent>
          {/* <Stack mb={1}>
            <Box >
              <ButtonGroupComponent
                buttonOptions={buttonOptions}
                selectedOption={selectedOption}
                onOptionChange={setSelectedOption}
              />
            </Box>

          </Stack>

          <Divider /> */}
      <Box sx={{padding:"6px 0 0 0"}}>
                         <Fetch/>
                        </Box>
          <Stack my={2} direction="row" spacing={2}>
            {statistics.map(({ count, title, link, label }, index) => (
              <BoxComponent key={index}>
                <Box p={1} >
                  <Stack sx={{ color: '#1D70BC' }} direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Typography level="h2" fontWeight={500} textColor={'#1D70BC'}>{count}</Typography>
                    <Info size={'16px'} />
                  </Stack>

                  <Typography fontSize={14}>{title}</Typography>

                  <Divider />

                  <Box my={1}
                    onClick={() => handleNavigateRoute(link)}
                    style={{ cursor: "pointer" }}>
                    <Stack direction="row" alignItems="center">
                      <Typography mr={1} fontSize={14} sx={{ color: "#2D7230" }}>
                        {label}
                      </Typography>
                      <SquareArrowOutUpRight color="#2D7230" size={16} />
                    </Stack>
                  </Box>

                </Box>
              </BoxComponent>
            ))}
          </Stack>
       
          <Box
            display='flex'
            direction='row'
            justifyContent='space-between'
          >
            <Stack sx={{ color: '#1D70BC' }} direction={'row'} spacing={1} alignItems={'center'}>
              <Info size={'16px'} />
              <Typography fontSize={12}>
                Values displayed are based on monthly averages excluding zero stocks and unused items.
              </Typography>
            </Stack>

            <Stack direction={'row'} spacing={1} alignItems={'center'}>
              <Typography fontSize={14}>
                Legends:
              </Typography>

              {
                legends.map(({ title, backgroundColor }, index) => (
                  <Stack key={index} direction={'row'} alignContent={'center'}>
                    <Chip
                      size="sm"
                      sx={{
                        backgroundColor: `${backgroundColor}`,
                        "--Chip-radius": "50px",
                        "--Chip-paddingInline": "10px",
                      }}
                    />
                    <Typography ml={1} fontSize={12}>
                      {title}
                    </Typography>
                  </Stack>
                ))
              }

            </Stack>
          </Box>
        </ContainerComponent >

        <ContainerComponent>
          <PaginatedTable
            tableTitle={"Inventory monitoring"}
            tableDesc={"See how resource supplies were accumulated and consumed in your organization’s inventory."}
            loading={dashboardLoading}
            columns={dashboardHeader}
            rows={dashboardSuppiesData}
            actionBtns={
              <Stack direction="row" spacing={1}>
                <ButtonComponent
                  variant={"outlined"}
                  label="Generate report"
                  size="lg"
                  onClick={generateReport}
                />
              </Stack>
            }
          />
        </ContainerComponent>

      </Stack >

      <SnackbarComponent
        open={open}
        onClose={closeSnackbar}
        anchor={anchor}
        color={color}
        variant={variant}
        message={message}
      />
    </Fragment >
  );
}

export default Dashboard;
