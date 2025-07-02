import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../Layout/Header/Header";
import { user } from "../../Data";
import ContainerComponent from "../../Components/Container/ContainerComponent";
import {
  Box,
  Stack,
  Select,
  Option,
  Card,
  Typography,
  Button,
  Input,
  Checkbox,
} from "@mui/joy";
import useCategoriesHook from "../../Hooks/CategoriesHook";
import useInventoryHook from "../../Hooks/InventoryHook";
import { ArrowLeft, RefreshCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PaginatedTable from "../../Components/Table/PaginatedTable"; //"../../Components/Table/PaginatedTable";
import { Search } from "lucide-react";
import moment from "moment";
import { X } from "lucide-react";
import ModalComponent from "../../Components/Dialogs/ModalComponent";
import { BalanceCardSeparation } from "./BalanceCardSeparation";
import { ExternalLink } from "lucide-react";
import usePrintHooks from "../../Hooks/PrintHooks";
export const BalanceCard = () => {
  const location = useLocation();
  const data = location.state;
  const [filter, setFilter] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [managemodal, setManagemodal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const { retrieveBalanceCard, BalanceCard } = useInventoryHook();
  const [selectedAllocate, setSelectedAllocate] = useState();

  const { OpenSmallWindow, printStockCardBulk } = usePrintHooks();
  const pageDetails = {
    title: "Balance Card Generation",
    description: "See the list of items.",
    pagePath: "/inventory",
  };
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2022 + 1 },
    (_, i) => 2022 + i
  ).reverse();

  const [category, setCategory] = useState([]);
  const months = [
    { name: "January", value: 1 },
    { name: "February", value: 2 },
    { name: "March", value: 3 },
    { name: "April", value: 4 },
    { name: "May", value: 5 },
    { name: "June", value: 6 },
    { name: "July", value: 7 },
    { name: "August", value: 8 },
    { name: "September", value: 9 },
    { name: "October", value: 10 },
    { name: "November", value: 11 },
    { name: "December", value: 12 },
  ];
  const { getCategoryWItems } = useCategoriesHook();
  useEffect(() => {
    getCategoryWItems().then((res) => {
      setCategory(res.data);
    });
    setFilter(data);
    retrieveBalanceCard(data?.category, data?.month, data?.year);
    setRefresh(false);
  }, [refresh]);

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedItems(new Set());
    } else {
      const allIds = new Set(
        BalanceCard.map((item) => item.receivedID || item.releasedID)
      );
      setSelectedItems(allIds);
    }
    setSelectAll(!selectAll);
  };

  const toggleItemSelection = (id) => {
    setSelectedItems((prev) => {
      const newSelection = new Set(prev);
      if (newSelection.has(id)) {
        newSelection.delete(id);
      } else {
        newSelection.add(id);
      }
      return newSelection;
    });
  };

  useEffect(() => {
    if (BalanceCard.length > 0 && selectedItems.size === BalanceCard.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedItems, BalanceCard]);

  const handleFilter = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    setFilter(data);
    retrieveBalanceCard(data?.category, data?.month, data?.year);
  };

  const itemColumn = [
    {
      id: "key", // or any field name
      label: "#",
      width: "5%",
      render: (row, index) => {
        return index + 1;
      },
    },
    { id: "supply_name", label: "Item Name", width: "30%" },
    { id: "unit_name", label: "Unit" },
    {
      id: "remainingBalance",
      label: "Remaining Balance",
      width: "30%",
      render: (row) => {
        //row.remainingBalance;
        //setManagemodal(true)
        return (
          <>
            <Stack
              direction={"row"}
              spacing={1}
              justifyContent={"space-between"}
            >
              <Typography>{row.remainingBalance}</Typography>
              <Box>
                <Button
                  size="sm"
                  variant="plain"
                  color="warning"
                  sx={{ fontSize: "9px", textDecoration: "underline" }}
                  endDecorator={<ExternalLink size={14} />}
                  onClick={() => {
                    setSelectedAllocate(row);
                    setManagemodal(true);
                  }}
                >
                  Allocate by Source
                </Button>
              </Box>
            </Stack>
          </>
        );
      },
    },
    {
      id: "postdate",
      label: "Post date",
      render: (row) => {
        return moment(row.postdate).format("YYYY-MM-DD");
      },
    },
    { id: "actions", label: "", width: "5%" },
  ];

  const displayRow = () => {
    if (search) {
      return BalanceCard.filter((x) =>
        x.supply_name.toLowerCase().includes(search.toLowerCase())
      );
    }
    return BalanceCard;
  };

  const handlePrint = () => {
    OpenSmallWindow(
      printStockCardBulk({
        category: filter.category,
        month: filter.month,
        year: filter.year,
        selected: Array.from(selectedItems),
      })
    );
  };

  return (
    <div>
      <Header pageDetails={pageDetails} data={user} />
      <Box mt={2}>
        <Button
          sx={{ mb: 1, fontSize: "13px !important", fontWeight: "normal" }}
          variant="outlined"
          size="sm"
          startDecorator={<ArrowLeft size={13} />}
          onClick={() => {
            navigate(pageDetails.pagePath);
          }}
        >
          Back
        </Button>
        <Card sx={{ mb: 2, width: "500px" }}>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Selected Category:{" "}
            <div style={{ float: "right" }}>
              {category.find((c) => c.id == filter.category)?.category_name ||
                "None"}
            </div>
            <br />
            Selected Month:{" "}
            <div style={{ float: "right" }}>
              {months.find((c) => c.value == filter.month)?.name || "None"}
            </div>
            <br />
            Selected Year:
            <div style={{ float: "right" }}>{filter.year}</div>
          </Typography>
          <Typography>Filter</Typography>
          <form onSubmit={handleFilter}>
            <Stack spacing={2} sx={{ alignItems: "flex-start", mb: 1 }}>
              <Select
                placeholder="Select Category"
                name="category"
                required
                sx={{ width: "100%" }}
              >
                {category.map((row) => (
                  <Option key={row.id} value={row.id}>
                    {row.category_name}
                  </Option>
                ))}
              </Select>

              {/* Display the current selection separately */}
            </Stack>

            <Stack direction={"row"} spacing={1}>
              <Select
                placeholder="Select Month"
                name="month"
                required
                sx={{ width: "100%" }}
              >
                {months.map((month) => (
                  <Option key={month.value} value={month.value}>
                    {month.name}
                  </Option>
                ))}
              </Select>
              <Select
                placeholder="Select Year"
                name="year"
                required
                sx={{ width: "100%" }}
              >
                {years.map((year) => (
                  <Option key={year} value={year}>
                    {year}
                  </Option>
                ))}
              </Select>
            </Stack>
            <Box display={"flex"} justifyContent={"flex-end"}>
              <Button type="submit" variant="outlined" sx={{ mt: 1 }}>
                Apply Filter
              </Button>
            </Box>
          </form>
        </Card>
        <ContainerComponent>
          <PaginatedTable
            size="md"
            rows={displayRow()}
            columns={itemColumn}
            customAction={true}
            handleCustomAction={(row) => {
              return (
                <Stack direction={"row"} justifyContent={"center"}>
                  <Checkbox
                    checked={selectedItems.has(row.id)}
                    onChange={() => toggleItemSelection(row.id)}
                  />
                </Stack>
              );
            }}
            actionBtns={
              <Stack mt={2} direction={"row"} spacing={1}>
                <Input
                  placeholder="Search here..."
                  startDecorator={<Search />}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button
                  onClick={() => {
                    setRefresh(true);
                  }}
                  sx={{
                    fontWeight: "normal",
                    textTransform: "uppercase",
                    fontSize: "12px",
                  }}
                  endDecorator={<RefreshCcw size={13} />}
                >
                  Refetch Data
                </Button>
                {selectedItems.size >= 1 && (
                  <>
                    <Button
                      variant="outlined"
                      sx={{ fontWeight: "normal" }}
                      onClick={handlePrint}
                    >
                      Print Selection ( {selectedItems.size} )
                    </Button>

                    <Button
                      variant="outlined"
                      color="danger"
                      sx={{ fontWeight: "normal" }}
                      endDecorator={<X size={14} />}
                      onClick={() => {
                        setSelectedItems(new Set());
                      }}
                    >
                      Clear Selection
                    </Button>
                  </>
                )}
              </Stack>
            }
          />
        </ContainerComponent>

        <ModalComponent
          layout="fullscreen"
          title={`${selectedAllocate?.supply_name} | ${selectedAllocate?.unit_name}`}
          description={
            "Manage this item and separate its quantity based on fund clusters for a more accurate and organized reporting experience."
          }
          content={
            <BalanceCardSeparation
              selectedItem={selectedAllocate}
              managemodal={managemodal}
              setRefresh={setRefresh}
            />
          }
          isOpen={managemodal}
          handleClose={() => setManagemodal(false)}
        />
      </Box>
    </div>
  );
};
