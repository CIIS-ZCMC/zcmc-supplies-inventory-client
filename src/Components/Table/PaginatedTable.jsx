import React, { useState } from "react";
import {
  Box,
  Button,
  Select,
  Option,
  Table,
  Typography,
  Stack,
  Divider,
  Chip,
} from "@mui/joy";
import PropTypes from "prop-types";
import ButtonComponent from "../ButtonComponent";
import { SquareArrowOutUpRight } from "lucide-react";
import useSelectedRow from "../../Store/SelectedRowStore";
import { useNavigate } from "react-router-dom";

PaginatedTable.propTypes = {
  rowsPage: PropTypes.number,
  columns: PropTypes.array,
  rows: PropTypes.array,
  tableTitle: PropTypes.string,
  tableDesc: PropTypes.string,
  showChip: PropTypes.bool,
};
function PaginatedTable({
  rowsPage = 10,
  columns,
  rows,
  tableTitle,
  tableDesc,
  showChip = true,
  btnLabel,
}) {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPage);
  const totalPages = Math.ceil(rows.length / rowsPerPage);

  const { setSelectedRow } = useSelectedRow();

  const navigate = useNavigate();

  const handleNavigate = (row) => {
    const { id } = row;
    navigate(`/releasing/${id}`);
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
  const currentRows = rows.slice(startIdx, startIdx + rowsPerPage);

  return (
    <Box>
      <Stack
        spacing={1}
        direction="row"
        justifyContent="space-between"
        alignItems="flex-end"
      >
        <Box>
          <Typography level="title-lg">
            {tableTitle}
            {showChip && (
              <Chip variant="soft" color="primary" size="sm" sx={{ ml: 1 }}>
                {rows?.length + " record(s)"}
              </Chip>
            )}
          </Typography>
          <Typography level="body-sm" color="#666666">
            {tableDesc}
          </Typography>
        </Box>
        <ButtonComponent label={btnLabel} />
      </Stack>
      <Divider sx={{ my: 3, color: "#E6E6E6" }} />
      {/* Table */}
      <Table stripe="odd" borderAxis="both">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row, index) => (
            <tr key={row.id}>
              <td>{startIdx + index + 1}</td>
              <td>{row.itemName}</td>
              <td>{row.category}</td>
              <td>{row.unit}</td>
              <td>{row.quantity}</td>

              <td>
                <ButtonComponent
                  size={"sm"}
                  variant="plain"
                  onClick={() => handleNavigate(row)} // Corrected line
                  startDecorator={<SquareArrowOutUpRight size={"1rem"} />}
                />
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
              items out of {rows.length}
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
