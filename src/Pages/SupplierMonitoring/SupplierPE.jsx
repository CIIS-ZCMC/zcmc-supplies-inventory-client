import {
  Box,
  Button,
  Checkbox,
  Grid,
  Input,
  Select,
  Stack,
  Textarea,
  Typography,
  Option,
} from "@mui/joy";
import React, { useState } from "react";
import { useEffect } from "react";
import PaginatedTable from "../../Components/Table/PaginatedTable";
import useSuppliersHook from "../../Hooks/SuppliersHook";
import { render } from "react-dom";
import { Search } from "lucide-react";
import { Printer } from "lucide-react";
import usePrintHooks from "../../Hooks/PrintHooks";
import { CircleX } from "lucide-react";
export const SupplierPE = ({ selectedSupplier }) => {
  const [input, setInputs] = useState(selectedSupplier);
  const [search, setSearch] = useState("");
  const [selection, setSelection] = useState([]);
  const [gradeUpdate, setGradeUpdate] = useState([]);
  const { printSupplierEvaluation, OpenSmallWindow } = usePrintHooks();
  const getSupplierDeliveredList = useSuppliersHook(
    (state) => state.getSupplierDeliveredList
  );
  const DeliveredList = useSuppliersHook((state) => state.DeliveredList);
  useEffect(() => {
    setInputs(selectedSupplier);
    getSupplierDeliveredList(selectedSupplier?.id);
    setSelection([]);
  }, [selectedSupplier]);

  const handleChanges = (key, value) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };
  const handleChangeGrade = (id, field, value) => {
    setGradeUpdate((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === id);
      if (existingIndex !== -1) {
        // Update existing
        const updated = [...prev];
        updated[existingIndex][field] = value;
        return updated;
      } else {
        // Insert new
        const originalRow = DeliveredList.find((item) => item.id === id);
        return [...prev, { ...originalRow, [field]: value }];
      }
    });
  };

  const gradeSelection = [
    "Excellent",
    "Very Satisfactory",
    "Satisfactory",
    "Unsatisfactory",
    "Poor",
  ];
  const columns = [
    {
      id: "docno", // or any field name
      label: "PO Number",
      width: "12%",
      render: (row, index) => {
        return row.docno;
      },
    },
    { id: "itemdesc", label: "Item Description", width: "30%" },
    // { id: "totqty", label: "Requested Qty", width: "8%" },
    // { id: "servqty", label: "Served Qty", width: "8%" },
    {
      id: "remarks",
      label: "remarks",
      width: "30%",
    },
    {
      id: "action",
      label: "System Generated",
      width: "20%",
      render: (row, index) => {
        // Find if there's an updated grade for this row
        const updatedRow = gradeUpdate.find((item) => item.id === row.id);

        return (
          <Box>
            <Typography level="body-xs" sx={{ fontSize: "10px" }}>
              System generated grade:
            </Typography>
            <Stack direction={"column"} spacing={1} textAlign={"center"}>
              <Select
                size="sm"
                value={updatedRow ? updatedRow?.rating : row.rating}
                onChange={(event, value) =>
                  handleChangeGrade(row.id, "rating", value)
                }
              >
                {gradeSelection.map((grade, idx) => (
                  <Option key={`${row.id}-${idx}`} value={grade}>
                    {grade}
                  </Option>
                ))}
              </Select>

              <Input
                type="number"
                size="sm"
                value={updatedRow ? updatedRow?.perRate : row.perRate} // ✅ Show updated perRate if exists
                onChange={(e) => {
                  const value = parseFloat(e.target.value);

                  // Prevent updating if value is more than 5
                  if (value <= 5 || isNaN(value)) {
                    handleChangeGrade(row.id, "perRate", e.target.value);
                  }
                }}
                sx={{ input: { textAlign: "center" } }}
                inputProps={{ max: 5 }}
              />
            </Stack>
          </Box>
        );
      },
    },

    {
      id: "action",
      label: "",
      width: "8%",
      render: (row, index) => {
        return (
          <Box textAlign={"center"}>
            <Checkbox
              onChange={(e) => {
                if (e.target.checked) {
                  setSelection((prev) => [...prev, row]);
                } else {
                  setSelection((prev) =>
                    prev.filter((item) => item.id !== row.id)
                  );
                }
              }}
              checked={selection.some((item) => item.id === row.id)}
            />
          </Box>
        );
      },
    },
  ];

  const rowDisplay = () => {
    return search
      ? DeliveredList.filter((x) =>
          x.itemdesc.toLowerCase().includes(search.toLowerCase())
        )
      : DeliveredList;
  };

  const [rowsData, setRowsData] = useState(rowDisplay());

  return (
    <div>
      <Grid container spacing={1} sx={{ mb: 2 }}>
        <Grid xs={12} md={12}>
          <Typography level="h3">Supplier Name:</Typography>
          <Input
            size="sm"
            value={input?.supplier_name || ""}
            onChange={(e) => handleChanges("supplier_name", e.target.value)}
          />
        </Grid>

        <Grid xs={12} md={12}>
          <Typography>Address</Typography>
          <Textarea
            minRows={2}
            size="sm"
            value={input?.praddress || ""}
            onChange={(e) => handleChanges("praddress", e.target.value)}
          />
        </Grid>

        <Grid xs={12} md={8}>
          <Typography>Contact Person:</Typography>
          <Input
            size="sm"
            value={input?.prcontactperson || ""}
            onChange={(e) => handleChanges("prcontactperson", e.target.value)}
          />
        </Grid>
        <Grid xs={12} md={4}>
          <Typography>Contact #:</Typography>
          <Input
            size="sm"
            value={input?.prtelno || ""}
            onChange={(e) => handleChanges("prtelno", e.target.value)}
          />
        </Grid>
      </Grid>

      <Box mt={2}>
        <PaginatedTable
          rows={rowDisplay()}
          columns={columns}
          tableTitle={"Recorded items"}
          tableDesc={
            <Stack
              direction={"row"}
              spacing={1}
              justifyContent={"space-between"}
            >
              <Typography level="body-xs">
                List of items that may have been delivered by the supplier.{" "}
                <br /> Select the items from the list that you wish to include
                in the printout.
              </Typography>
              <Stack direction={"column"} spacing={1}>
                <Button
                  endDecorator={<Printer size={15} fontWeight={"bold"} />}
                  variant="soft"
                  color="warning"
                  sx={{ textTransform: "uppercase" }}
                  onClick={() => {
                    if (selection.length === 0) {
                      swal(
                        "Please select one or more items",
                        "Please select items to print",
                        "warning"
                      );
                      return;
                    }
                    OpenSmallWindow(
                      printSupplierEvaluation({
                        input: input,
                        selection: selection.map((item) => item.id),
                        rating: gradeUpdate.map((x) => {
                          return {
                            id: x.id,
                            rating: x.rating,
                            perRate: x.perRate,
                          };
                        }),
                      })
                    );
                  }}
                >
                  Print
                </Button>
                {selection.length >= 1 && (
                  <Button
                    endDecorator={<CircleX size={15} fontWeight={"bold"} />}
                    variant="soft"
                    color="danger"
                    sx={{ textTransform: "uppercase", fontSize: "10px" }}
                    onClick={() => {
                      setSelection([]);
                    }}
                  >
                    Clear Selection
                  </Button>
                )}
              </Stack>
            </Stack>
          }
          actionBtns={
            <Stack
              direction={"row"}
              spacing={1}
              justifyContent={"space-between"}
              mt={2}
            >
              <Input
                startDecorator={<Search />}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by description ..."
              />
              {gradeUpdate.length > 0 && (
                <Button
                  variant="plain"
                  color="primary"
                  sx={{
                    marginTop: "5px",
                    fontSize: "11px",
                    textTransform: "uppercase",
                  }}
                  onClick={() => setGradeUpdate([])}
                >
                  Reset rating by default
                </Button>
              )}
            </Stack>
          }
        />
      </Box>
    </div>
  );
};
