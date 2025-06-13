import React, { Fragment, useEffect, useState } from "react";
import PageTitle from "../../Components/PageSetup/PageTitle";
import {
  Box,
  Divider,
  Stack,
  Typography,
  useTheme,
  Checkbox,
  Radio,
} from "@mui/joy";
import ButtonComponent from "../../Components/ButtonComponent";
import ContainerComponent from "../../Components/Container/ContainerComponent";
import InputComponent from "../../Components/Form/InputComponent";
import { ArrowDown, ArrowUp, SearchIcon, ViewIcon } from "lucide-react";
import PaginatedTable from "../../Components/Table/PaginatedTable";
import useInventoryHook from "../../Hooks/InventoryHook";
import { user } from "../../Data/index";
import Header from "../../Layout/Header/Header";
import SelectComponent from "../../Components/Form/SelectComponent";
import useFilterHook from "../../Hooks/FilterHook";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ModalComponent from "../../Components/Dialogs/ModalComponent";
import NewItem from "./NewItem";
import useReportsHook from "../../Hooks/ReportsHook";
import { CiShare1 } from "react-icons/ci";
import { MdOutlineCancel } from "react-icons/md";
import usePrintHooks from "../../Hooks/PrintHooks";
import { ConfirmSelection } from "./ConfirmSelection";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { CiFilter } from "react-icons/ci";
import { NewDisbursement } from "./NewDisbursement";
const categoryFilter = [
  { name: "Janitorial", value: "Janitorial" },
  { name: "Medical", value: "Medical" },
  { name: "Office", value: "Office" },
];

const sortFilter = [
  { icon: <ArrowUp />, name: "Highest first (descending)", value: "highest" },
  { icon: <ArrowDown />, name: "Lowest first (ascending)", value: "lowest" },
];

const data = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  itemName: "Zonrox Color Bleach",
  category: "Category name",
  unit: "1L bottle (x8 pieces per box)",
  quantity: "1,000",
}));

const Inventory = () => {
  const navigate = useNavigate();
  const { inventory, getInventory } = useInventoryHook();
  const {
    filteredInventory,
    selectedCategory,
    sortOrder,
    searchTerm,
    setCategory,
    setSortOrder,
    setSearchTerm,
    clearFilters,
  } = useFilterHook();
  const { generateReport } = useReportsHook();
  const theme = useTheme();
  const [generateStockCard, setGenerateStockCard] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState(null);
  const [monthlyDistribution, setMonthlyDistribution] = useState(false);
  const [openIssuance, setopenIssuance] = useState(false);
  const [stockCard, setStockCard] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const InventoryFilter = useInventoryHook((state) => state.InventoryFilter);
  const [isDV, setIsDV] = useState(false);
  const setInventoryFilter = useInventoryHook(
    (state) => state.setInventoryFilter
  );
  const [startingBal, setStartingBal] = useState(null);
  const {
    printStockCard,
    printStockCardBulk,
    OpenSmallWindow,
    printSuppliesIssuance,
  } = usePrintHooks();
  const steps = ["Step 1", "Step 2", "Step 3"];
  const [snackbar, setSnackbar] = useState({
    open: false,
    color: "",
    message: "",
  });
  const pageDetails = {
    title: "Inventory",
    description: "See the list of items in your inventory.",
    pagePath: "/inventory",
  };

  const handleGenerateStockCard = () => {
    const PrintItem = JSON.stringify({
      selected: selectedItems,
      filter: InventoryFilter,
      startingBalance: startingBal,
    });
    OpenSmallWindow(printStockCard(PrintItem));
  };

  const navigateToItemSupplies = () => {
    navigate("/newItem");
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setActiveStep(0);
  };

  const { data, isLoading, error } = useQuery({
    queryKey: "inventory",
    queryFn: getInventory,
  });
  // const inventoryData =
  //   InventoryFilter?.month && InventoryFilter?.year
  //     ? data?.data.filter((item) =>
  //         item.transaction.some((x) => {
  //           const date = new Date(x.created_at);
  //           const month = date.getMonth() + 1;
  //           const year = date.getFullYear();

  //           return (
  //             month === parseInt(InventoryFilter.month, 10) &&
  //             year === parseInt(InventoryFilter.year, 10)
  //           );
  //         })
  //       )
  //     : data?.data;

  const inventoryData = data?.data;

  const getMonthName = (monthNumber) => {
    const date = new Date();
    date.setMonth(monthNumber - 1); // JS months are 0-based
    return date.toLocaleString("default", { month: "long" });
  };

  const columns = [
    {
      id: "key", // or any field name
      label: "#",
      width: "5%",
      render: (row, index) => {
        return index + 1;
      },
    },
    { id: "supply_name", label: "Item Name", width: "30%" },
    { id: "category_name", label: "Category" },
    { id: "unit_name", label: "Unit" },
    // { id: "quantity", label: "Quantity", width: "10%" },
    { id: "actions", label: "Actions", width: "20%" },
  ];

  const handleSelection = (perRow) => {
    const form = document.createElement("div");

    // Create input for starting balance
    const inputBalance = document.createElement("input");
    inputBalance.placeholder = "Enter starting balance";
    inputBalance.type = "number";
    inputBalance.style.marginBottom = "10px";
    inputBalance.className = "swal-content__input";

    // Create input for remarks
    const inputRemarks = document.createElement("input");
    inputRemarks.placeholder = "Enter reference (optional)";
    inputRemarks.type = "text";
    inputRemarks.className = "swal-content__input";

    form.appendChild(inputBalance);
    form.appendChild(inputRemarks);

    swal("Custom Starting Balance. Please set or cancel to proceed.", {
      content: form,
      buttons: {
        cancel: true,
        confirm: {
          text: "Set",
        },
      },
    }).then(() => {
      const value = inputBalance.value;
      const remarks = inputRemarks.value;

      if (value !== "") {
        setStartingBal(null);
        setStartingBal({
          itemId: perRow.id,
          value: value,
          remarks: remarks,
        });
      } else {
      }
    });
  };

  return (
    <Fragment>
      <Header pageDetails={pageDetails} data={user} />
      <Stack gap={2} mt={2}>
        <ContainerComponent>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-end"
          >
            {/* search*/}
            <InputComponent
              label="Find a slip"
              placeholder="Find by item name, category, unit"
              startIcon={<SearchIcon />}
              value={searchTerm}
              setValue={setSearchTerm}
              width={300}
            />

            <Box display="flex" gap={1}>
              <SelectComponent
                startIcon={"Sort by:"}
                placeholder={"category"}
                options={categoryFilter}
                value={selectedCategory}
                onChange={setCategory}
              />
              <ButtonComponent
                size="sm"
                variant={"soft"}
                label={"Clear Filters"}
                onClick={clearFilters}
              />
            </Box>
          </Stack>
        </ContainerComponent>
        <ContainerComponent>
          <PaginatedTable
            viewable={generateStockCard ? false : true}
            loading={isLoading}
            tableTitle={"List of items"}
            tableDesc={
              "Inventory items with stocks are shown here real-time. You can also add a new item name if necessary."
            }
            columns={columns}
            rows={filteredInventory(inventoryData)}
            actions={<ViewIcon />}
            btnLabel={"Add new item name"}
            customAction={generateStockCard}
            handleCustomAction={(perRow) => {
              return (
                <Stack direction={"column"} spacing={2}>
                  {" "}
                  <Box>
                    {startingBal && startingBal.itemId === perRow.id && (
                      <Stack direction={"row"} sx={{ marginBottom: "-10px" }}>
                        <Typography
                          onClick={() => {
                            handleSelection(perRow);
                          }}
                          color="primary"
                          variant="body-xs"
                          sx={{
                            fontSize: "10px",
                            textTransform: "uppercase",
                            fontWeight: "bold",
                            marginRight: "5px",
                            cursor: "pointer",
                          }}
                        >
                          Starting Balance :
                        </Typography>
                        {startingBal.value}
                      </Stack>
                    )}
                  </Box>
                  <Radio
                    label="Select"
                    value={perRow.id}
                    checked={selectedItems === perRow.id}
                    onChange={() => {
                      setStartingBal(null);
                      if (perRow.quantity === 0) {
                      }
                      handleSelection(perRow);
                      setSelectedItems(perRow.id);
                    }}
                    color="danger"
                    sx={{
                      color: "red",
                      fontSize: "11px",
                      textTransform: "uppercase",
                    }}
                  />
                </Stack>
              );
            }}
            actionBtns={
              <Stack direction={"row"} justifyContent={"space-between"} mt={2}>
                <Stack direction="row" spacing={1}>
                  <Box>
                    <Dropdown>
                      <MenuButton
                        variant="soft"
                        color="primary"
                        sx={{
                          padding: "11px 20px ",
                          fontWeight: "500",
                          fontSize: "13px",
                        }}
                        endDecorator={<IoMdArrowDropdownCircle fontSize={18} />}
                      >
                        Generate Report
                      </MenuButton>
                      <Menu sx={{ fontSize: "14px" }}>
                        <MenuItem
                          onClick={() => {
                            generateReport(
                              "Inventory",
                              filteredInventory(inventoryData)
                            );
                          }}
                        >
                          Export to Excel
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            setIsDialogOpen(true);
                            setMonthlyDistribution(false);
                            setopenIssuance(false);
                            setStockCard(false);
                          }}
                        >
                          Balance Card
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            //   setGenerateStockCard(true);
                            setMonthlyDistribution(false);
                            setIsDialogOpen(true);
                            setStockCard(true);
                            setopenIssuance(false);
                          }}
                        >
                          Stock Card
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            setIsDialogOpen(true);
                            setMonthlyDistribution(true);
                            setopenIssuance(false);
                          }}
                        >
                          Monthly Distribution Report
                        </MenuItem>

                        <MenuItem
                          onClick={() => {
                            setIsDialogOpen(true);
                            setMonthlyDistribution(false);
                            setopenIssuance(true);
                            // OpenSmallWindow(printSuppliesIssuance("test"));
                          }}
                        >
                          Supplies Issuance
                        </MenuItem>

                        <MenuItem
                          onClick={() => {
                            setIsDV(true);
                          }}
                        >
                          Disbursement Voucher
                        </MenuItem>
                      </Menu>
                    </Dropdown>
                  </Box>
                  <ButtonComponent
                    label="Add new item name"
                    onClick={navigateToItemSupplies}
                  />
                </Stack>

                {generateStockCard && (
                  <Stack direction={"row"} spacing={1}>
                    <Box sx={{ display: generateStockCard ? "block" : "none" }}>
                      <ButtonComponent
                        label={
                          generateStockCard ? "Cancel" : "Generate Stock Card"
                        }
                        variant={generateStockCard ? "solid" : "plain"}
                        color={generateStockCard ? "danger" : "warning"}
                        endDecorator={
                          generateStockCard ? (
                            <MdOutlineCancel fontSize={18} />
                          ) : (
                            <CiShare1 fontSize={18} />
                          )
                        }
                        onClick={() => {
                          if (generateStockCard) {
                            setGenerateStockCard(false);
                            setSelectedItems(null);
                            setInventoryFilter({});
                            setStartingBal(null);
                          } else {
                            setGenerateStockCard(true);
                          }
                        }}
                      />
                    </Box>
                    <ButtonComponent
                      label={
                        <Stack>
                          <Typography
                            variant=""
                            level="body-sm"
                            sx={{ fontWeight: "bold" }}
                          >
                            Show Filter
                          </Typography>
                          <Typography variant="" level="body-xs">
                            <Stack>
                              <Box>
                                Month : {getMonthName(InventoryFilter?.month)}
                              </Box>
                              <Box>Year : {InventoryFilter?.year}</Box>
                            </Stack>
                          </Typography>
                        </Stack>
                      }
                      variant={"outlined"}
                      color="primary"
                      endDecorator={<CiFilter />}
                      onClick={() => {
                        setIsDialogOpen(true);
                        setStockCard(true);
                      }}
                    />

                    <ButtonComponent
                      disabled={selectedItems ? false : true}
                      label={
                        <Stack direction={"column"}>Generate Stock-Card</Stack>
                      }
                      variant={"solid"}
                      color={"success"}
                      onClick={handleGenerateStockCard}
                    />
                  </Stack>
                )}
              </Stack>
            }
            icon={
              <MdOutlineLibraryAdd
                style={{
                  verticalAlign: "middle",
                  color: theme.palette.custom.buttonBg,
                  fontSize: 30,
                  backgroundColor: "#EBF2F9",
                  padding: 10,
                  borderRadius: 5,
                }}
              />
            }
            label={"Fill-up your inventory by creating a New item"}
            desc={`Your inventory is currently empty. To manage it, you’ll need to add items. You can use
                  inventory items in filling-up IARs and RIS requests.`}
            // btn={<ButtonComponent label={"Create new item"} onClick={"/"} />}
          />
        </ContainerComponent>
      </Stack>

      <ModalComponent
        isOpen={isDV}
        handleClose={() => setIsDV(false)}
        title="Generate Disbursement Voucher"
        content={<NewDisbursement />}
      />

      <ModalComponent
        isOpen={isDialogOpen}
        handleClose={handleDialogClose}
        content={
          <ConfirmSelection
            isMonthlyDistribution={monthlyDistribution}
            openIssuance={openIssuance}
            selectedItems={selectedItems}
            isStockCard={stockCard}
            setGenerateStockCard={setGenerateStockCard}
            setIsDialogOpen={setIsDialogOpen}
          />
        }
        title={
          monthlyDistribution
            ? `Confirm Monthly Distibution`
            : openIssuance
            ? `Confirm Selection`
            : stockCard
            ? `Confirm Selection Stock-card`
            : `Confirm Selection Balance-card`
        }
        description={`Manage/select options for generating ${
          monthlyDistribution
            ? "Monthly Distibution"
            : openIssuance
            ? "Item issuance"
            : stockCard
            ? `Stock card`
            : "Balance-card"
        } `}
      />

      {/* setopenIssuance */}
    </Fragment>
  );
};

export default Inventory;
