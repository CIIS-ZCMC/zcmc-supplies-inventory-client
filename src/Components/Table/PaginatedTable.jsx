import React, { useEffect, useState } from "react";
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
  CircularProgress,
} from "@mui/joy";
import PropTypes from "prop-types";
import ButtonComponent from "../ButtonComponent";
import { SquareArrowOutUpRight, Pencil } from "lucide-react";
import useSelectedRow from "../../Store/SelectedRowStore";
import { useLocation, useNavigate } from "react-router-dom";
import NoRows from "../../Pages/NoRows";
import { MdOutlineLibraryAdd } from "react-icons/md";
import ModalComponent from "../Dialogs/ModalComponent";

import usePaginatedTableHook from "../../Hooks/PaginatedTableHook";
import useAreasHook from "../../Hooks/AreasHook";

PaginatedTable.propTypes = {
  rowsPage: PropTypes.number,
  columns: PropTypes.array,
  rows: PropTypes.array,
  tableTitle: PropTypes.string,
  tableDesc: PropTypes.string,
  showChip: PropTypes.bool,
  handleDialogOpen: PropTypes.func,
  editRow: PropTypes.func,
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
  loading,
  viewModal = false,
  viewModalContent,
  modalContent,
  editRow,
}) {
  const [isOpenDialog, setIsDialogOpen] = useState(false);

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPage);
  const totalPages = Math.ceil(rows?.length / rowsPerPage);

  const { setSelectedRow } = useSelectedRow();
  const { setIsUpdate, setId, resetState } = usePaginatedTableHook();

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

  const handleModalOpen = (row) => {
    setSelectedRow(row); // Set the selected row
    if (viewModalContent) {
      viewModalContent(row); // Call passed function to handle the modal open logic
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    resetState();
  };

  const handleEdit = (data) => {
    editRow(data);
    setId(data.id)
    setIsUpdate(true);
    setIsDialogOpen(true);
  };

  return (
    <>
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
                      <td key={column?.id} style={{ textWrap: "wrap" }}>
                        {column?.id === "actions" ? (
                          <>
                            <ButtonComponent
                              size={"sm"}
                              variant="plain"
                              onClick={() =>
                                viewModal
                                  ? handleModalOpen(row)
                                  : handleNavigate(row)
                              }
                              startDecorator={
                                <SquareArrowOutUpRight size={"1rem"} />
                              }
                            />

                            <ButtonComponent
                              size={"sm"}
                              variant="plain"
                              onClick={() => handleEdit(row)}
                              startDecorator={<Pencil size={"1rem"} />}
                            />
                          </>
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

      <ModalComponent
        isOpen={isOpenDialog}
        title="Update a new area record"
        description={
          "Library records allows for a more streamlined and dynamic form-filling experiences."
        }
        handleClose={handleDialogClose}
        content={modalContent}
      />
    </>
  );
}

export default PaginatedTable;
