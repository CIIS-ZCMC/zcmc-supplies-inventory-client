import React, { Fragment, useEffect } from "react";
import Header from "../../Layout/Header/Header";
import { items, user } from "../../Data/index";
import useSelectedRow from "../../Store/SelectedRowStore";
import {
  Accordion,
  accordionClasses,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  Box,
  Divider,
  Stack,
  Typography,
  useTheme,
} from "@mui/joy";
import ContainerComponent from "../../Components/Container/ContainerComponent";
import BoxComponent from "../../Components/Container/BoxComponent";
import TableComponent from "../../Components/Table/TableComponent";
import useReportsHook from "../../Hooks/ReportsHook";
import { itemBreakdown } from "../../Data/TableHeader";
import { useLocation, useParams } from "react-router-dom";
import { BiCategory } from "react-icons/bi";
import { MdAppShortcut, MdCategory, MdTune } from "react-icons/md";
import { GrApps } from "react-icons/gr";
import { SendIcon } from "lucide-react";
import moment from "moment";

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

export const InfoLine = ({ label, value, bgColor, color }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      bgcolor={bgColor} // Light green background similar to the image
      padding={1}
      borderRadius={5}
      width="100%"
    >
      <Box display="flex" alignItems="center" gap={1}>
        <SendIcon style={{ color: color }} /> {/* Use your preferred color */}
        <Typography level="body-sm" style={{ color: color }}>
          {label}
        </Typography>
      </Box>
      <Box flexGrow={1} borderBottom="1px dashed #A0C3AD" marginX={1}></Box>{" "}
      {/* Dashed line */}
      <Typography variant="body1" style={{ fontWeight: 600, color: color }}>
        {value}
      </Typography>
    </Box>
  );
};

function ViewItemDetails(props) {
  const theme = useTheme();
  const { selectedRow } = useSelectedRow();
  const { id } = useParams();
  const {
    details,
    item_count,
    item_iar,
    getItemCountDetails,
    getItemCountInfo,
    getItemCountIAR,
  } = useReportsHook();

  const storedSupplyName = localStorage.getItem("supply_name");
  const location = useLocation();

  const currentPath = location.pathname;

  const pageDetails = {
    pageTitle: `Viewing "${storedSupplyName}"`,
    title: "Reports",
    description:
      "See how an RIS item was received by your inventory, including more information about its integrity.",
    pagePath: `/reports`,
    subTitle: "Viewing monthly item count",
    subPath: `${currentPath}`,
  };
  const getValueByTitle = (title) => {
    switch (title) {
      case "Months with consumption":
        return item_count.months_with_consumptions;
      case "Current month end balance":
        return item_count.current_month_end_balance;
      case "Avrg monthly consumption":
        return item_count.average_monthly_consumption;
      case "Months left to consume":
        return item_count.months_left_to_consume;
      case "2024 starting balance":
        return item_count.starting_balance;
      default:
        return "N/A";
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      getItemCountDetails(id);
      getItemCountInfo(id);
      getItemCountIAR(id);
    }, 300);
    return () => {
      clearTimeout(timeout);
    };
  }, [getItemCountDetails]);
  return (
    <Fragment>
      <Header pageDetails={pageDetails} data={user} />
      <Stack mt={2} gap={2}>
        <ContainerComponent>
          <Typography level="title-lg">Item information and totals</Typography>
          <AccordionGroup
            sx={(theme) => ({
              [`& .${accordionClasses.root}`]: {
                padding: 0,
                transition: "0.2s ease",
                '& button:not([aria-expanded="true"])': {
                  transition: "0.2s ease",
                  paddingBottom: "0.625rem",
                },
                "& button:hover": {
                  background: "transparent",
                },
              },
            })}
          >
            <Accordion defaultExpanded>
              <AccordionSummary sx={{ fontWeight: "light", fontSize: 15 }}>
                See how resource supplies were accumulated, consumed and moved
                in your organization’s inventory.
              </AccordionSummary>
              <AccordionDetails>
                <Divider sx={{ color: "#E6E6E6", mb: 2 }} />
                <Typography level="body-sm" mb={1}>
                  Item information:
                </Typography>
                <Stack direction="row" gap={2}>
                  <BoxItem
                    categoryTitle={"Months with consumption"}
                    categoryName={getValueByTitle("Months with consumption")}
                    icon={
                      <MdCategory
                        fontSize={25}
                        color="darkBlue"
                        style={{
                          padding: 10,
                          backgroundColor: theme.palette.custom.lighter,
                        }}
                      />
                    }
                  />
                  <BoxItem
                    categoryTitle={"Current month end balance"}
                    categoryName={getValueByTitle("Current month end balance")}
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
                  />
                  <BoxItem
                    categoryTitle={"Avrg monthly consumption"}
                    categoryName={getValueByTitle("Avrg monthly consumption")}
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
                  />
                  <BoxItem
                    categoryTitle={"Months left to consume"}
                    categoryName={getValueByTitle("Months left to consume")}
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
                  />
                  <BoxItem
                    categoryTitle={"2024 starting balance"}
                    categoryName={getValueByTitle("2024 starting balance")}
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
                  />
                </Stack>
                <Divider sx={{ color: "#E6E6E6", my: 2 }} />
                <Typography level="body-sm" mb={1}>
                  Item totals for:{" "}
                  <b style={{ color: "#1D70BC" }}>
                    {" "}
                    {moment(item_iar.start_date).format("LL")} -{" "}
                    {moment(item_iar.current_date).format("LL")}
                  </b>
                </Typography>
                <Stack direction="row" gap={2}>
                  <InfoLine
                    label="IAR Regular"
                    value={item_iar.total_iar_purchased}
                    bgColor="#EFF6EF"
                    color="#225524"
                  />
                  <InfoLine
                    label="IAR Donation"
                    value={item_iar.total_iar_donation}
                    bgColor="#EFF6EF"
                    color="#225524"
                  />
                  <InfoLine
                    label="RIS Regular"
                    value={item_iar.total_ris_purchased}
                    bgColor="#FEF2E6"
                    color="#934A00"
                  />
                  <InfoLine
                    label="RIS Donation"
                    value={item_iar.total_ris_donation}
                    bgColor="#FEF2E6"
                    color="#934A00"
                  />
                </Stack>
              </AccordionDetails>
            </Accordion>
          </AccordionGroup>
        </ContainerComponent>
        <ContainerComponent
          title={"Monthly item count"}
          description={
            "Current totals of the selected item, calculated per month."
          }
        >
          <TableComponent
            columns={itemBreakdown}
            rows={details}
            withSearch={false}
            title={storedSupplyName}
          />
        </ContainerComponent>
      </Stack>
    </Fragment>
  );
}

export default ViewItemDetails;
