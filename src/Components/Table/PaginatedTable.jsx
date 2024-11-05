import React, { useState } from "react";
import {
  Box,
  Button,
  Select,
  Option,
  Table,
  Typography,
  Stack,
} from "@mui/joy";
import PropTypes from "prop-types";

const data = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  poNumber: `01-${12345 + i}`,
  iarNumber: `01-${12345 + i}`,
  itemName: "Zonrox Color Bleach",
  category: "Category name",
  unit: "1L bottle (x8 pieces per box)",
  source: i % 2 === 0 ? "Donation" : "Regular",
  quantity: "1,000",
}));

PaginatedTable.propTypes = {
  rows: PropTypes.number,
};
function PaginatedTable({ rows = 20 }) {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(rows);
  const totalPages = Math.ceil(data.length / rowsPerPage);

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
  const currentRows = data.slice(startIdx, startIdx + rowsPerPage);

  return (
    <Box>
      <Typography></Typography>
      {/* Table */}
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>PO Number</th>
            <th>IAR Number</th>
            <th>Item Name</th>
            <th>Category</th>
            <th>Unit</th>
            <th>Source</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row, index) => (
            <tr key={row.id}>
              <td>{startIdx + index + 1}</td>
              <td>{row.poNumber}</td>
              <td>{row.iarNumber}</td>
              <td>{row.itemName}</td>
              <td>{row.category}</td>
              <td>{row.unit}</td>
              <td>{row.source}</td>
              <td>{row.quantity}</td>
              <td>
                {/* Add any action buttons or icons here */}
                <Button variant="plain" size="sm">
                  View
                </Button>
              </td>
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
          <Box display="flex" alignItems="center">
            {totalPages <= 5 ? (
              // Show all page numbers if total is 5 or less
              [...Array(totalPages)].map((_, index) => (
                <Button
                  key={index + 1}
                  size="sm"
                  variant={page === index + 1 ? "solid" : "plain"}
                  onClick={() => handleChangePage(index + 1)}
                  sx={{ minWidth: 32, margin: "0 4px" }}
                >
                  {index + 1}
                </Button>
              ))
            ) : (
              <>
                <Button
                  key={1}
                  size="sm"
                  variant={page === 1 ? "solid" : "plain"}
                  onClick={() => handleChangePage(1)}
                  sx={{ minWidth: 32, margin: "0 4px" }}
                >
                  1
                </Button>
                {totalPages > 1 && (
                  <Button
                    key={2}
                    size="sm"
                    variant={page === 2 ? "solid" : "plain"}
                    onClick={() => handleChangePage(2)}
                    sx={{ minWidth: 32, margin: "0 4px" }}
                  >
                    2
                  </Button>
                )}

                {/* Show the third page if it exists */}
                {totalPages > 2 && (
                  <Button
                    key={3}
                    size="sm"
                    variant={page === 3 ? "solid" : "plain"}
                    onClick={() => handleChangePage(3)}
                    sx={{ minWidth: 32, margin: "0 4px" }}
                  >
                    3
                  </Button>
                )}
                {/* Always show the current page */}
                {page < totalPages - 2 && <span>...</span>}

                {/* Show the last page button */}
                {totalPages > 3 && (
                  <Button
                    key={totalPages}
                    size="sm"
                    variant={page === totalPages ? "solid" : "plain"}
                    onClick={() => handleChangePage(totalPages)}
                    sx={{ minWidth: 32, margin: "0 4px" }}
                  >
                    {totalPages}
                  </Button>
                )}
              </>
            )}
          </Box>

          <Box display="flex" alignItems="center" ml={2}>
            <Typography variant="body2" sx={{ mr: 1 }}>
              showing
            </Typography>
            <Select
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
              sx={{ minWidth: 70 }}
            >
              {[10, 20, 30, 50].map((option) => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
            <Typography variant="body2" sx={{ ml: 1 }}>
              items out of {data.length}
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

export default PaginatedTable;
