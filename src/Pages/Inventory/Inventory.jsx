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
  { id: "quantity", label: "Quantity", width: "10%" },
  { id: "actions", label: "Actions", width: "10%" },
];

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
  const [activeStep, setActiveStep] = useState(0);
  const { printStockCard, printStockCardBulk, OpenSmallWindow } =
    usePrintHooks();
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
    OpenSmallWindow(printStockCard(selectedItems));
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

  const inventoryData = data?.data;

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
                <>
                  {" "}
                  <Radio
                    label="Select"
                    value={perRow.id}
                    checked={selectedItems === perRow.id}
                    onChange={() => {
                      setSelectedItems(perRow.id);
                    }}
                    color="danger"
                    sx={{
                      color: "red",
                      fontSize: "11px",
                      textTransform: "uppercase",
                    }}
                  />
                </>
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
                        <MenuItem onClick={() => setIsDialogOpen(true)}>
                          Balance Card
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            setGenerateStockCard(true);
                          }}
                        >
                          Stock Card
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
                          } else {
                            setGenerateStockCard(true);
                          }
                        }}
                      />
                    </Box>
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
            btn={<ButtonComponent label={"Create new item"} onClick={"/"} />}
          />
        </ContainerComponent>
      </Stack>

      <ModalComponent
        isOpen={isDialogOpen}
        handleClose={handleDialogClose}
        content={<ConfirmSelection selectedItems={selectedItems} />}
        title={`Confirm Selection`}
        description={"Manage/select options for generating Balance-card"}
      />
    </Fragment>
  );
};

export default Inventory;
