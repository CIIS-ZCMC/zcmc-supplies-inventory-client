import React, { useState } from "react";
import {
  Box,
  Button,
  Option,
  Select,
  Stack,
  Table,
  Typography,
} from "@mui/joy";
import { useNavigate } from "react-router-dom";

import { SearchIcon, SquareArrowOutUpRight } from "lucide-react";

import useSelectedRow from "../../Store/SelectedRowStore";

import ButtonComponent from "../ButtonComponent";
import InputComponent from "../Form/InputComponent";
import useFilterHook from "../../Hooks/FilterHook";

export default function TableComponent({
  rowsPage = 10,
  columns = [],
  rows = [],
  filterBtns,
}) {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPage);
  const totalPages = Math.ceil(rows?.length / rowsPerPage);

  const { setSelectedRow } = useSelectedRow();
  const { searchTerm, setSearchTerm } = useFilterHook();

  const navigate = useNavigate();

  const handleNavigate = (row) => {
    const { id } = row;
    navigate(`/inventory/viewing`);
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

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <InputComponent
          label="Find a slip"
          placeholder="Find by item name, category, unit"
          startIcon={<SearchIcon />}
          value={searchTerm}
          setValue={setSearchTerm}
          width={300}
        />
        {filterBtns}
      </Stack>
      <Table stripe="odd" borderAxis="both">
        <thead>
          <tr>
            {columns?.map((col, index) => (
              <th key={index}>{col?.label}</th>
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
                      startDecorator={<SquareArrowOutUpRight size={"1rem"} />}
                    />
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
    </Box>
  );
}
