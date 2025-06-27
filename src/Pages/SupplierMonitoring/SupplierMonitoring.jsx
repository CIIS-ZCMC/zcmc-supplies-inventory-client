import React from "react";
import {
  Box,
  Typography,
  Input,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Divider,
  Select,
  Option,
  Autocomplete,
} from "@mui/joy";
import Avatar from "@mui/joy/Avatar";

import List from "@mui/joy/List";
import ListDivider from "@mui/joy/ListDivider";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import { RiStarSFill } from "react-icons/ri";
import SearchIcon from "@mui/icons-material/Search";
import ContainerComponent from "../../Components/Container/ContainerComponent";
import { Container, Search } from "lucide-react";
import { BoxItem } from "../Inventory/ViewDetails";
import { GrApps } from "react-icons/gr";
import { useTheme } from "@emotion/react";
import PaginatedTable from "../../Components/Table/PaginatedTable";
import useSuppliersHook from "../../Hooks/SuppliersHook";
import { POResult } from "./POResult";
import { MdAlternateEmail } from "react-icons/md";
import { CiDeliveryTruck } from "react-icons/ci";
import { VscDebugContinue } from "react-icons/vsc";
import { HiBars3CenterLeft } from "react-icons/hi2";
import { useEffect } from "react";
import ButtonComponent from "../../Components/ButtonComponent";
import { IoLogOutOutline } from "react-icons/io5";
import ModalComponent from "../../Components/Dialogs/ModalComponent";
import { GoFileSubmodule } from "react-icons/go";
import { RiStarSLine } from "react-icons/ri";
import Header from "../../Layout/Header/Header";
import { user } from "../../Data/index";
import { SupplierPE } from "./SupplierPE";
import AutoCompleteComponent from "../../Components/Form/AutoCompleteComponent";

export const SupplierMonitoring = () => {
  const theme = useTheme();
  const {
    fetchPOs,
    PO_result,
    getPODashboard,
    getPOSRecords,
    clearPOResult,
    getSuppliersPerformanceRatings,
    supplierData,
    dashboardData,
    getSuppliers,
    suppliersList,
  } = useSuppliersHook();
  const [searchedPo, setSearchPo] = React.useState("");
  const [showData, setShowData] = React.useState(null);
  const [POsRecords, setPOsRecords] = React.useState([]);
  const [searchkeyPo, setSearchKeyPo] = React.useState("");
  const [selectedSupplier, setSelectedSupplier] = React.useState(null);
  useEffect(() => {
    getPODashboard();
    getSuppliers();
    getSuppliersPerformanceRatings()
      .then((data) => {})
      .catch((error) => {
        console.error("Error fetching supplier performance ratings:", error);
      });
  }, [PO_result]);

  useEffect(() => {
    clearPOResult();
  }, [showData]);

  const columns = [
    {
      id: "key", // or any field name
      label: "#",
      width: "5%",
      render: (row, index) => {
        return index + 1;
      },
    },
    { id: "supplier", label: "Supplier", width: "30%" },
    { id: "total_qty", label: "Requested Qty", width: "8%" },
    { id: "total_servqty", label: "Served Qty", width: "8%" },
    {
      id: "Rating",
      label: "Rating",
      width: "30%",
      render: (row, index) => {
        const stars = [];
        for (let i = 0; i < row.rating; i++) {
          stars.push(
            <RiStarSFill
              key={i}
              style={{ color: "#DDA853", fontSize: "20px" }}
            />
          );
        }
        return <>{stars}</>;
      },
    },
  ];

  const pageDetails = {
    title: "Supplier Monitoring",
    description:
      "This page provides performance insights on suppliers based on delivery quantity, timeliness, and consistency. Ratings are automatically generated to help identify top-performing and underperforming suppliers.",
  };

  return (
    <>
      <Box mb={2}>
        <Header pageDetails={pageDetails} data={user} />
      </Box>
      <Box>
        <Stack
          direction="row"
          justifyContent="space-between"
          spacing={2}
          mb={3}
        >
          <BoxItem
            icon={
              <MdAlternateEmail
                fontSize={25}
                color="darkBlue"
                style={{
                  padding: 10,
                  backgroundColor: theme.palette.custom.lighter,
                }}
              />
            }
            option={
              <ButtonComponent
                variant={"outlined"}
                size="lg"
                color="neutral"
                onClick={() => {
                  setShowData("Emailed Pos");
                  getPOSRecords("emailed").then((data) => {
                    setPOsRecords(data.data);
                  });
                }}
                label={<IoLogOutOutline fontSize={20} />}
              />
            }
            categoryName={`${dashboardData?.emailed_pos || 0}`}
            categoryTitle={"Emailed POs (Recorded)"}
          />
          <BoxItem
            icon={
              <CiDeliveryTruck
                fontSize={25}
                color="darkBlue"
                style={{
                  padding: 10,
                  backgroundColor: theme.palette.custom.lighter,
                }}
              />
            }
            option={
              <ButtonComponent
                variant={"outlined"}
                size="lg"
                color="neutral"
                onClick={() => {
                  setShowData("Received or Delivered POs");
                  getPOSRecords("delivered").then((data) => {
                    setPOsRecords(data.data);
                  });
                }}
                label={<IoLogOutOutline fontSize={20} />}
              />
            }
            categoryName={`${dashboardData?.delivered_pos || 0}`}
            categoryTitle={"Received/Delivered POs (Recorded)"}
          />
          <BoxItem
            icon={
              <VscDebugContinue
                fontSize={25}
                color="darkBlue"
                style={{
                  padding: 10,
                  backgroundColor: theme.palette.custom.lighter,
                }}
              />
            }
            option={
              <ButtonComponent
                variant={"outlined"}
                size="lg"
                color="neutral"
                onClick={() => {
                  setShowData("Extended POs");
                  getPOSRecords("extended").then((data) => {
                    setPOsRecords(data.data);
                  });
                }}
                label={<IoLogOutOutline fontSize={20} />}
              />
            }
            categoryName={`${dashboardData?.extended_pos || 0}`}
            categoryTitle={"Extended dues (Recorded)"}
          />
          <BoxItem
            icon={
              <HiBars3CenterLeft
                fontSize={25}
                color="darkBlue"
                style={{
                  padding: 10,
                  backgroundColor: theme.palette.custom.lighter,
                }}
              />
            }
            option={
              <ButtonComponent
                variant={"outlined"}
                size="lg"
                color="neutral"
                onClick={() => {
                  setShowData("Total POs");
                  getPOSRecords("all").then((data) => {
                    setPOsRecords(data.data);
                  });
                }}
                label={<IoLogOutOutline fontSize={20} />}
              />
            }
            categoryName={`${dashboardData?.total_pos || 0}`}
            categoryTitle={"Total Pos (Recorded)"}
          />
        </Stack>

        <ContainerComponent>
          <Box
            p={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column" // optional, if stacking items vertically
          >
            <Typography level="h1">
              Purchased Order{" "}
              <Typography level="body-md" sx={{ fontWeight: "normal" }}>
                {" "}
                ( Search )
              </Typography>
            </Typography>
            <Stack mt={2} mb={4} direction={"row"} spacing={1}>
              <Input
                placeholder="Type PO number to search"
                startDecorator={<SearchIcon />}
                sx={{ width: "100%", padding: "10px" }}
                value={searchedPo}
                onChange={(e) => {
                  const val = e.target.value;

                  if (/^[\d-]*$/.test(val)) {
                    setSearchPo(val);
                  }
                }}
              />

              <Button
                variant="solid"
                color="primary"
                sx={{ padding: "10px 50px" }}
                onClick={() => {
                  if (!searchedPo) {
                    swal(
                      "Input Error",
                      "Please enter a PO number to search.",
                      "warning"
                    );
                    return;
                  }
                  fetchPOs(searchedPo).then((result) => {
                    if (result.data.length === 0) {
                      swal(
                        "No data",
                        "No POs found for this search.",
                        "warning"
                      );
                    }
                  });
                }}
              >
                Find
              </Button>
            </Stack>
            <Typography level="body-xs">
              Searching here retrieves real-time data from BizBox or from System
              records
            </Typography>

            {PO_result?.data?.length >= 1 && (
              <Box mt={2}>
                <POResult searchedPo={searchedPo} />
              </Box>
            )}
          </Box>
          <ModalComponent
            minWidth={"50%"}
            isOpen={showData ? true : false}
            title={showData}
            handleClose={() => setShowData(null)}
            content={
              <>
                <Input
                  placeholder="Search PO"
                  sx={{ mb: 1 }}
                  onChange={(e) => setSearchKeyPo(e.target.value)}
                  value={searchkeyPo}
                  variant="soft"
                />
                <Divider />
                <Box sx={{ maxHeight: "70vh", overflowY: "auto", mt: 1 }}>
                  <Typography level="body-md"></Typography>

                  {POsRecords?.filter((x) =>
                    x.docno.toLowerCase().includes(searchkeyPo.toLowerCase())
                  ).map((po, index) => (
                    <>
                      {" "}
                      <List
                        variant="outlined"
                        sx={{
                          minWidth: "100%",
                          borderRadius: "sm",
                          mb: 2,
                          borderBottom: "5px solid #1976d2",
                          // background: "green",
                        }}
                      >
                        <ListItem>
                          <Stack
                            direction={"row"}
                            justifyContent={"space-between"}
                            sx={{ width: "100%" }}
                          >
                            <Box display={"flex"} alignItems={"center"}>
                              <ListItemDecorator>
                                Purchase Order # :{" "}
                              </ListItemDecorator>
                              <Typography
                                variant="outlined"
                                level="body-lg"
                                color="primary"
                                sx={{ marginLeft: "20px" }}
                              >
                                {po?.docno || "N/A"}
                              </Typography>
                            </Box>
                            <Box>
                              <Button
                                variant="soft"
                                color="warning"
                                endDecorator={<GoFileSubmodule />}
                                onClick={() => {
                                  setShowData(null);
                                  setSearchPo(po?.docno);
                                  fetchPOs(po?.docno)
                                    .then((result) => {
                                      if (result.data.length === 0) {
                                        swal(
                                          "No data",
                                          "No POs found for this search.",
                                          "warning"
                                        );
                                      }
                                    })
                                    .catch((err) => {
                                      swal(
                                        "Something went wrong",
                                        `SERVICE ERROR: ${err.message}`,
                                        "error"
                                      );
                                    });
                                }}
                              >
                                Open File
                              </Button>
                            </Box>
                          </Stack>
                        </ListItem>
                        <ListDivider inset={"startContent"} />
                      </List>
                    </>
                  ))}

                  <Stack direction={"row"} justifyContent={"flex-end"} mt={2}>
                    <ButtonComponent
                      label="Close"
                      size="sm"
                      variant="solid"
                      onClick={() => {
                        setShowData(false);
                      }}
                    />
                  </Stack>
                </Box>
              </>
            }
          />
        </ContainerComponent>

        <Box mt={1}>
          <ContainerComponent>
            <Stack mb={2}>
              <Typography level="body-md" fontWeight={"bold"}>
                Generate Report | Select Supplier
              </Typography>

              <Autocomplete
                startDecorator={<Search />}
                options={suppliersList || []}
                getOptionLabel={(option) => option.supplier_name} // display supplier_name in dropdown
                placeholder="Select Supplier ..."
                onChange={(e, value) => {
                  console.log("Selected Supplier", value);
                  setSelectedSupplier(value);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Select Supplier ..." />
                )}
              />
            </Stack>

            <Divider sx={{ mb: 1 }} />
            <Box width={"100%"}>
              <Box mb={2} width={"40%"}>
                <Typography level="body-md">Rating Legend :</Typography>
                <ContainerComponent>
                  <Stack direction={"column"} spacing={1} ml={4}>
                    <Typography
                      level="body-xs"
                      display={"flex"}
                      justifyContent={"space-between"}
                    >
                      Excellent :{" "}
                      <Stack direction={"row"}>
                        <RiStarSFill />
                        <RiStarSFill />
                        <RiStarSFill />
                        <RiStarSFill />
                        <RiStarSFill />
                      </Stack>
                    </Typography>
                    <Typography
                      level="body-xs"
                      display={"flex"}
                      justifyContent={"space-between"}
                    >
                      Very Good :{" "}
                      <Stack direction={"row"}>
                        <RiStarSFill />
                        <RiStarSFill />
                        <RiStarSFill />
                        <RiStarSFill />
                      </Stack>
                    </Typography>
                    <Typography
                      level="body-xs"
                      display={"flex"}
                      justifyContent={"space-between"}
                    >
                      Good :{" "}
                      <Stack direction={"row"}>
                        <RiStarSFill />
                        <RiStarSFill />
                        <RiStarSFill />
                      </Stack>
                    </Typography>
                    <Typography
                      level="body-xs"
                      display={"flex"}
                      justifyContent={"space-between"}
                    >
                      Fair :{" "}
                      <Stack direction={"row"}>
                        <RiStarSFill />
                        <RiStarSFill />
                      </Stack>
                    </Typography>
                    <Typography
                      level="body-xs"
                      display={"flex"}
                      justifyContent={"space-between"}
                    >
                      Poor :{" "}
                      <Stack direction={"row"}>
                        <RiStarSFill />
                      </Stack>
                    </Typography>
                  </Stack>
                </ContainerComponent>
              </Box>
              <PaginatedTable
                tableTitle={"Suppliers Performance Ratings"}
                $tableDesc={
                  "Data shown below are performance metrics evaluated by the system based on deliverables, delays, and earliest actions taken by the supplier."
                }
                columns={columns}
                rows={supplierData?.data}
              />
            </Box>
          </ContainerComponent>
        </Box>
        {/* <Box mt={2}>
        <ContainerComponent>
          <PaginatedTable
            tableTitle={"More information"}
            tableDesc={
              "PO items marked as pending,received,delivered or cancelled will be shown here"
            }
            columns={[]}
            rows={[]}
          />
        </ContainerComponent>
      </Box> */}
      </Box>

      <ModalComponent
        title={`Suppliers Performance Evaluation `}
        description={`Generate report for suppliers performance evaluation ( Goods ) `}
        layout="center"
        content={<SupplierPE selectedSupplier={selectedSupplier} />}
        isOpen={selectedSupplier ? true : false}
        handleClose={() => {
          setSelectedSupplier(null);
        }}
      />
    </>
  );
};
