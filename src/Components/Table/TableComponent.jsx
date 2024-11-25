import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Option,
  Select,
  Stack,
  Table,
  Typography,
  useTheme,
} from "@mui/joy";
import { useLocation, useNavigate } from "react-router-dom";

import { SearchIcon, SquareArrowOutUpRight } from "lucide-react";

import useSelectedRow from "../../Store/SelectedRowStore";

import ButtonComponent from "../ButtonComponent";
import InputComponent from "../Form/InputComponent";
import useFilterHook from "../../Hooks/FilterHook";
import NoRows from "../../Pages/NoRows";
import { MdOutlineFindInPage } from "react-icons/md";
import moment from "moment";
// Import the xlsx library

export default function TableComponent({
  rowsPage = 10,
  columns = [],
  rows = [],
  filterBtns,
  searchLbl = "Search a record",
  title,
  loading,
  withSearch = true,
}) {
  const theme = useTheme();
  const {
    filteredInventory,
    selectedCategory,
    sortOrder,
    searchTerm,
    setCategory,
    setSortOrder,
    setSearchTerm,
    clearFilters,
    viewPath,
  } = useFilterHook();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPage);
  const totalPages = Math.ceil(rows?.length / rowsPerPage);

  const { setSelectedRow } = useSelectedRow();

  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;

  const handleNavigate = (row) => {
    const { id } = row;
    navigate(`${currentPath}/${id}`); //dynamic route handling
    setSelectedRow(row);
  };

  const handleChangePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleRowsPerPageChange = (event, newValue) => {
    setRowsPerPage(newValue);
    setPage(1); // Reset to the first page when changing rows per page
  };

  // Calculate the subset of data to display
  const startIdx = (page - 1) * rowsPerPage;
  const endIdx = Math.min(startIdx + rowsPerPage, rows?.length);
  const currentRows = rows?.slice(startIdx, startIdx + rowsPerPage);

  const getExpirationColor = (expirationDate) => {
    const today = new Date();
    const date = new Date(expirationDate);

    // Calculate the difference in months
    const diffInMonths =
      (date.getFullYear() - today.getFullYear()) * 12 +
      (date.getMonth() - today.getMonth());

    if (diffInMonths <= 1) {
      // 1 month or less left (Red)
      return "red";
    } else if (diffInMonths === 2) {
      // 2 months left (Yellow)
      return "yellow";
    } else if (diffInMonths >= 3) {
      // 3 months or more left (Green)
      return "green";
    } else {
      // Default to gray if no condition matches (optional)
      return "gray";
    }
  };

  function getStockColor(value) {
    if (value === 0) {
      // Out of stock
      return "red";
    } else if (value === 1 || value === 2) {
      // Low stock (1 or 2 months)
      return "orange";
    } else if (value === 3 || value === 4) {
      // Moderate stock (3 or 4 months)
      return "yellow";
    } else if (value === 5 || value === 6) {
      // Sufficient stock (5 or 6 months)
      return "green";
    } else {
      // Default color for other cases (if applicable)
      return "grey";
    }
  }

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent={"space-between"}
        alignItems={"flex-end"}
        mb={2}
      >
        {withSearch && (
          <InputComponent
            label={searchLbl}
            placeholder="Find by item name, category, unit"
            startIcon={<SearchIcon />}
            value={searchTerm}
            setValue={setSearchTerm}
            width={300}
          />
        )}

        {filterBtns && (
          <Stack direction="row" gap={1}>
            {filterBtns}
            <ButtonComponent
              size="sm"
              variant={"soft"}
              label={"Clear Filters"}
              onClick={clearFilters}
            />
          </Stack>
        )}
      </Stack>
      {loading ? (
        <Box display="flex" justifyContent="center" py={5}>
          <CircularProgress />
        </Box>
      ) : rows?.length > 0 ? (
        <>
          <Table stripe="odd" borderAxis="both">
            <thead>
              <tr>
                {columns?.map((col, index) => (
                  <th
                    key={index}
                    style={{ textWrap: "wrap", width: col?.width }}
                  >
                    {col?.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentRows?.map((row, index) => (
                <tr key={row?.id}>
                  {columns?.map((column) => (
                    <td key={column?.id}>
                      {column?.id === "actions" ? (
                        <ButtonComponent
                          size={"sm"}
                          variant="plain"
                          onClick={() => handleNavigate(row)}
                          startDecorator={
                            <SquareArrowOutUpRight size={"1rem"} />
                          }
                        />
                      ) : column?.id === "expiration_date" ? (
                        // Display expiration date with a colored indicator
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <div
                            style={{
                              width: "20px",
                              height: "20px",
                              borderRadius: "20%",
                              backgroundColor: getExpirationColor(
                                row[column?.id]
                              ),
                              marginRight: "8px",
                            }}
                          ></div>
                          {moment(row[column?.id]).format("L")}
                        </div>
                      ) : title === "Reorder items" &&
                        column?.id === "months_left_to_consume" ? (
                        // Display expiration date with a colored indicator
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <div
                            style={{
                              width: "20px",
                              height: "20px",
                              borderRadius: "20%",
                              backgroundColor: getStockColor(row[column?.id]),
                              marginRight: "8px",
                            }}
                          ></div>
                          {row[column?.id]} months
                        </div>
                      ) : (
                        row[column?.id] ?? `${startIdx + index + 1}`
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Pagination Controls */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            py={2}
            mt={2}
          >
            <Button
              variant="outlined"
              color="neutral"
              disabled={page === 1}
              onClick={() => handleChangePage(page - 1)}
            >
              Previous
            </Button>

            <Stack direction="row">
              <Box display="flex" alignItems="center" ml={2}>
                <Typography level="body-sm" sx={{ mr: 1 }}>
                  rows per page:
                </Typography>
                <Select
                  value={rowsPerPage}
                  onChange={handleRowsPerPageChange}
                  sx={{ minWidth: 70 }}
                  size="sm"
                >
                  {[10, 20, 30, 50].map((option) => (
                    <Option key={option} value={option}>
                      {option}
                    </Option>
                  ))}
                </Select>
                <Typography level="body-sm" sx={{ ml: 1 }}>
                  Showing {startIdx + 1}-{endIdx} items out of {rows?.length}
                </Typography>
              </Box>
            </Stack>

            <Button
              variant="outlined"
              color="neutral"
              disabled={page === totalPages}
              onClick={() => handleChangePage(page + 1)}
            >
              Next
            </Button>
          </Box>
        </>
      ) : (
        <NoRows pageTitle={title} />
      )}
    </Box>
  );
}
