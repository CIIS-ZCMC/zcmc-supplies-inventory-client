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
import {
  json,
  useActionData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import NoRows from "../../Pages/NoRows";
import { MdOutlineLibraryAdd } from "react-icons/md";
import ModalComponent from "../Dialogs/ModalComponent";
import SnackbarComponent from "../SnackbarComponent";

import usePaginatedTableHook from "../../Hooks/PaginatedTableHook";
import useSnackbarHook from "../../Hooks/AlertHook";

import useAreasHook from "../../Hooks/AreasHook";
import useBrandsHook from "../../Hooks/BrandsHook";
import useSuppliersHook from "../../Hooks/SuppliersHook";
import useCategoriesHook from "../../Hooks/CategoriesHook";
import useUnitsHook from "../../Hooks/UnitsHook";
import useSourceHook from "../../Hooks/SourceHook";
import useSuppliesHook from "../../Hooks/SuppliesHook";
import useReceivingHook from "../../Hooks/ReceivingHook";

import AreasForm from "../../Pages/Libraries/Areas/FormDialog";
import BrandForm from "../../Pages/Libraries/Brands/FormDialog";
import SupplierForm from "../../Pages/Libraries/Suppliers/FormDialog";
import CategoryForm from "../../Pages/Libraries/Categories/FormDialog";
import UnitForm from "../../Pages/Libraries/Units/FormDialog";
import SourceForm from "../../Pages/Libraries/Source/FormDialog";
import SuppliesForm from "../../Pages/Libraries/Supplies/FormDialog";
import ReceivingForm from "../../Layout/Receiving/FormDialog";

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
  editable,
  viewable,
}) {
  const [isOpenDialog, setIsDialogOpen] = useState(false);

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPage);
  const totalPages = Math.ceil(rows?.length / rowsPerPage);

  const { setInitialValues: setAreasValues } = useAreasHook();
  const { setInitialValues: setBrandsValues } = useBrandsHook();
  const { setInitialValues: setSuppliersValues } = useSuppliersHook();
  const { setInitialValues: setCategoriesValues } = useCategoriesHook();
  const { setInitialValues: setUnitsValues } = useUnitsHook();
  const { setInitialValues: setSourceValues } = useSourceHook();
  const { setInitialValues: setSuppliesValues } = useSuppliesHook();
  const { initialValues: receiving, setInitialValues: setReceivingValues } =
    useReceivingHook();

  const { setSelectedRow } = useSelectedRow();
  const { open, message, color, variant, anchor, showSnackbar, closeSnackbar } =
    useSnackbarHook();
  const { setIsUpdate, setId, resetState } = usePaginatedTableHook();

  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;

  useEffect(() => {
    console.log(receiving);
  }, [receiving]);

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

  const handleSnackbarClose = () => {
    setSnackbar({ open: false });
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
    setAreasValues(null);
    setBrandsValues(null);
    setSuppliersValues(null);
    setCategoriesValues(null);
    setUnitsValues(null);
    setSourceValues(null);
    setSuppliesValues(null);
    setReceivingValues(null);
    resetState();
  };

  const handleEdit = (data) => {
    editRow(data);
    setId(data.id);
    setIsUpdate(true);
    setIsDialogOpen(true);
  };

  return (
    <>
      <Box>
        <Stack
        // spacing={1}
        // direction="row"
        // justifyContent="space-between"
        // alignItems="flex-end"
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
            {/* <Typography level="body-sm" color="#666666"> */}
            {tableDesc}
            {/* </Typography> */}
            {actionBtns}
          </Box>
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
                      <td
                        key={column?.id}
                        style={{
                          textWrap: "wrap",
                          maxWidth: column?.id === "email" ? "200px" : "auto", // Limits email column width
                          wordBreak: "break-word", // Ensures long words wrap
                          whiteSpace: "pre-wrap", // Preserves spacing & wraps text
                          overflow: "hidden",
                        }}
                      >
                        {column?.id === "actions" ? (
                          <>
                            {viewable && (
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
                            )}

                            {editable && (
                              <ButtonComponent
                                size={"sm"}
                                variant="plain"
                                onClick={() => handleEdit(row)}
                                startDecorator={<Pencil size={"1rem"} />}
                              />
                            )}
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
        title="Update a new record"
        description={
          currentPath === "/receiving" &&
          "Library records allows for a more streamlined and dynamic form-filling experiences."
        }
        handleClose={handleDialogClose}
        content={
          currentPath === "/libraries/areas" ? (
            <AreasForm
              open={open}
              message={message}
              color={color}
              setSnackbar={showSnackbar}
              handleDialogClose={handleDialogClose}
            />
          ) : currentPath === "/libraries/brands" ? (
            <BrandForm
              open={open}
              message={message}
              color={color}
              setSnackbar={showSnackbar}
              handleDialogClose={handleDialogClose}
            />
          ) : currentPath === "/libraries/suppliers" ? (
            <SupplierForm
              open={open}
              message={message}
              color={color}
              setSnackbar={showSnackbar}
              handleDialogClose={handleDialogClose}
            />
          ) : currentPath === "/libraries/categories" ? (
            <CategoryForm
              open={open}
              message={message}
              color={color}
              setSnackbar={showSnackbar}
              handleDialogClose={handleDialogClose}
            />
          ) : currentPath === "/libraries/units" ? (
            <UnitForm
              open={open}
              message={message}
              color={color}
              setSnackbar={showSnackbar}
              handleDialogClose={handleDialogClose}
            />
          ) : currentPath === "/libraries/source" ? (
            <SourceForm
              open={open}
              message={message}
              color={color}
              setSnackbar={showSnackbar}
              handleDialogClose={handleDialogClose}
            />
          ) : currentPath === "/libraries/supplies" ? (
            <SuppliesForm
              open={open}
              message={message}
              color={color}
              setSnackbar={showSnackbar}
              handleDialogClose={handleDialogClose}
            />
          ) : currentPath === "/receiving" ? (
            <ReceivingForm
              open={open}
              message={message}
              color={color}
              showSnackbar={showSnackbar}
              handleDialogClose={handleDialogClose}
            />
          ) : null // Fallback if none of the conditions match
        }
      />
      <SnackbarComponent
        open={open}
        onClose={closeSnackbar}
        anchor={anchor}
        color={color}
        variant={variant}
        message={message}
      />
    </>
  );
}

export default PaginatedTable;
