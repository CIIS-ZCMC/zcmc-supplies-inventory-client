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
import NoRows from "../../Pages/NoRows";
import { MdOutlineLibraryAdd } from "react-icons/md";

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
  actionBtns,
  icon,
  label,
  desc,
  btn,
}) {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPage);
  const totalPages = Math.ceil(rows?.length / rowsPerPage);

  const { setSelectedRow } = useSelectedRow();

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
                {rows?.length > 0
                  ? rows?.length + " record(s)"
                  : "No records found"}
              </Chip>
            )}
          </Typography>
          <Typography level="body-sm" color="#666666">
            {tableDesc}
          </Typography>
        </Box>
        {actionBtns}
      </Stack>
      <Divider sx={{ my: 3, color: "#E6E6E6" }} />
      {/* Table */}
      {!rows.length > 0 ? (
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
                    <td key={column?.id} style={{ textWrap: "wrap" }}>
                      {column?.id === "actions" ? (
                        <ButtonComponent
                          size={"sm"}
                          variant="plain"
                          onClick={() => handleNavigate(row)}
                          startDecorator={
                            <SquareArrowOutUpRight size={"1rem"} />
                          }
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
        </>
      ) : (
        <NoRows icon={icon} label={label} desc={desc} button={btn} />
      )}
    </Box>
  );
}

export default PaginatedTable;
