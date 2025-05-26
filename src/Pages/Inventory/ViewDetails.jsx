import React, { Fragment, useEffect, useState } from "react";
import Header from "../../Layout/Header/Header";
import useSelectedRow from "../../Store/SelectedRowStore";
import { items, user } from "../../Data/index";
import ContainerComponent from "../../Components/Container/ContainerComponent";
import PaginatedTable from "../../Components/Table/PaginatedTable";
import useInventoryHook from "../../Hooks/InventoryHook";
import { Box, Stack, Typography } from "@mui/joy";
import BoxComponent from "../../Components/Container/BoxComponent";
import { BiCategory } from "react-icons/bi";
import { useTheme } from "@emotion/react";
import { MdAppShortcut, MdTune } from "react-icons/md";
import { GrApps } from "react-icons/gr";
import ButtonComponent from "../../Components/ButtonComponent";
import { useParams } from "react-router-dom";
import { TbTruckDelivery } from "react-icons/tb";
import { BsColumnsGap } from "react-icons/bs";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { ImBoxAdd } from "react-icons/im";
import useReportsHook from "../../Hooks/ReportsHook";
import InputComponent from "../../Components/Form/InputComponent";
import { Input } from "@mui/joy";
import { CiEdit } from "react-icons/ci";
export const BoxItem = ({
  icon,
  iconColor,
  categoryTitle,
  categoryName,
  option,
}) => {
  const theme = useTheme();

  return (
    <BoxComponent>
      <Box display="flex" alignItems="center" padding={1}>
        {icon}
        <Stack
          direction="row"
          justifyContent="space-between"
          width="100%"
          ml={1}
        >
          <Box>
            <Typography level="body-sm">{categoryTitle}</Typography>
            <Typography level="title-lg">{categoryName}</Typography>
          </Box>
          <Box>{option}</Box>
        </Stack>
      </Box>
    </BoxComponent>
  );
};

function ViewDetails(props) {
  const theme = useTheme();
  const { selectedRow, setSelectedItem } = useSelectedRow();
  const { id } = useParams();
  const { stockno, getStockNo, updateStockNo, setStockno } = useInventoryHook();
  // const storedSupplyName = localStorage.getItem("selectedRow");
  const { details, getInventoryDetails, stockouts, startingBalance, stockins } =
    useInventoryHook();
  const navigate = useNavigate();
  const { generateReport } = useReportsHook();
  const pageDetails = {
    pageTitle: `Viewing "${selectedRow?.supply_name}"`,
    title: "Inventory",
    description:
      "See how an RIS item was received by your inventory, including more information about its integrity.",
    pagePath: "/inventory",
    subTitle: "Viewing Item",
    subPath: "/viewing/:id",
  };
  const columns = [
    // { id: "id", label: "#" },
    { id: "supplier_name", label: "Supplier" },
    { id: "category_name", label: "Category" },
    { id: "brand_name", label: "Brand" },
    { id: "unit_name", label: "Unit" },
    { id: "source_name", label: "Source" },
    { id: "delivery_date", label: "Delivery Date" },
    { id: "quantity", label: "Quantity" },
  ];

  const totalQuantity = details.reduce((sum, item) => sum + item.quantity, 0);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    setLoad(true);
    getStockNo(id).then((response) => {
      setLoad(false);
    });
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      getInventoryDetails(id);
    }, 300);
    return () => {
      clearTimeout(timeout);
    };
  }, [getInventoryDetails]);

  const handleUpdateStockNo = (event) => {
    updateStockNo({ stock_no: event.target.value }, id).then((response) => {
      if (response.status === 306) {
        swal("No changes made", "Stock number already exists", "error");
      }
    });
  };

  return (
    <Fragment>
      <Header pageDetails={pageDetails} data={user} />
      <Stack my={2}>
        <Stack direction="row" justifyContent="space-between" spacing={2}>
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
            categoryName={`${selectedRow?.quantity} | ${selectedRow?.unit_name}`}
            categoryTitle={"Total quantity | Unit type"}
          />

          <BoxItem
            icon={
              <ImBoxAdd
                fontSize={30}
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
                  navigate(`/reports/receiving/${selectedRow?.id}`);
                  //  //  setSelectedItem(selectedRow)
                }}
                label={<IoLogOutOutline fontSize={20} />}
              />
            }
            categoryName={stockins}
            categoryTitle={"Total quantity received (IAR)"}
          />

          <BoxItem
            icon={
              <TbTruckDelivery
                fontSize={30}
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
                  navigate(`/reports/releasing/${selectedRow?.id}`);
                  //  setSelectedItem(selectedRow)
                }}
                label={<IoLogOutOutline fontSize={20} />}
              />
            }
            categoryName={stockouts}
            categoryTitle={"Total quantity released (RIS)"}
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
            option={
              <ButtonComponent
                variant={"outlined"}
                label={<IoLogOutOutline fontSize={20} />}
                size="lg"
                color="neutral"
                onClick={() => {
                  //  console.log(selectedRow?.id)
                  navigate(`/reports/starting-balance/${selectedRow?.id}`);
                }}
              />
            }
            categoryName={startingBalance}
            categoryTitle={"Starting balance"}
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
            <Stack
              direction="row"
              spacing={1}
              mt={2}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <ButtonComponent
                variant={"solid"}
                label="Generate report"
                size="lg"
                onClick={() => generateReport(selectedRow.supply_name, details)}
              />
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Stack direction={"row"} spacing={1}>
                  <Typography
                    sx={{
                      padding: "16px 0 0 0",
                      textTransform: "uppercase",
                      fontWeight: "bold",
                      color: "#7E99A3",
                    }}
                    level="body-sm"
                  >
                    Stock No :
                  </Typography>
                  <Input
                    startDecorator={<CiEdit style={{ fontSize: "25px" }} />}
                    variant="plain"
                    sx={{
                      padding: "6px",
                      backgroundColor: "#ECFAE5",
                      fontWeight: "bold",
                      color: "#4CAF50",
                      fontSize: "25px",
                      "--Input-radius": "0px",
                      borderBottom: "2px solid",
                      borderColor: "neutral.outlinedBorder",
                      "&:hover": {
                        borderColor: "neutral.outlinedHoverBorder",
                      },
                      "&::before": {
                        border: "1px solid var(--Input-focusedHighlight)",
                        transform: "scaleX(0)",
                        left: 0,
                        right: 0,
                        bottom: "-2px",
                        top: "unset",
                        transition:
                          "transform .15s cubic-bezier(0.1,0.9,0.2,1)",
                        borderRadius: 0,
                      },
                      "&:focus-within::before": {
                        transform: "scaleX(1)",
                      },
                    }}
                    slotProps={{
                      input: {
                        style: {
                          textAlign: "center",
                          textTransform: "uppercase",
                        },
                      },
                    }}
                    onChange={(e) => setStockno(e.target.value)}
                    value={load ? "Loading..." : stockno}
                    onBlur={handleUpdateStockNo}
                  />
                </Stack>
              </Box>
            </Stack>
          }
        />
      </ContainerComponent>
    </Fragment>
  );
}

export default ViewDetails;
