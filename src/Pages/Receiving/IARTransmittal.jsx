import React, { useState } from "react";
import {
  Button,
  Grid,
  Input,
  Typography,
  Alert,
  Divider,
  Checkbox,
  Stack,
} from "@mui/joy";
import InputComponent from "../../Components/Form/InputComponent";
import useReceivingHook from "../../Hooks/ReceivingHook";
import PaginatedTable from "../../Components/Table/PaginatedTable";
import usePrintHooks from "../../Hooks/PrintHooks";
import { PrinterCheck, Search } from "lucide-react";
export const IARTransmittal = () => {
  const { fetchIARRecords } = useReceivingHook();
  const [filter, setFilter] = useState({});
  const [error, setError] = useState(null);
  const [search, setSearch] = useState([]);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [load, setLoad] = useState(false);
  const { PrintIARTransmittal, OpenSmallWindow } = usePrintHooks();
  const [searchlist, setSearchlist] = useState("");

  const handleChange = (key, value) => {
    setFilter((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleFind = () => {
    // Reset error state
    setError(null);
    setLoad(true);
    // Check if both dates are provided
    if (!filter.from || !filter.to) {
      setError("Both 'From' and 'To' dates are required.");
      setLoad(false);
      return;
    }

    // Convert dates to Date objects for comparison
    const fromDate = new Date(filter.from);
    const toDate = new Date(filter.to);

    // Check if 'from' is after 'to'
    if (fromDate > toDate) {
      setError("'From' date cannot be later than 'To' date.");
      setLoad(false);
      return;
    }

    fetchIARRecords(filter.from, filter.to).then((res) => {
      setSearch(res.data);
      if (res.data.length === 0) {
        setError("No Records found");
      }
      setLoad(false);
      selectedRows.clear();
    });
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
    { id: "suppliers_name", label: "Suppliers Name", width: "10%" },
    { id: "itemName", label: "Item", width: "20%" },
    { id: "unit", label: "Unit" },
    { id: "amount", label: "Amount" },
    { id: "served_qty", label: "Qty" },
    { id: "releasedRemarks", label: "Remarks", width: "20%" },
    { id: "record_date", label: "Record_date" },
    { id: "actions", label: "Actions", width: "20%" },
  ];

  const handleCheck = (rowId) => {
    setSelectedRows((prev) => {
      const newSelection = new Set(prev);
      if (newSelection.has(rowId)) {
        newSelection.delete(rowId);
      } else {
        newSelection.add(rowId);
      }
      return newSelection;
    });
  };

  const handleGenerate = () => {
    const selectedIds = Array.from(selectedRows);

    OpenSmallWindow(PrintIARTransmittal(JSON.stringify(selectedIds)));
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography>From</Typography>
          <Input
            type="date"
            name="from"
            required
            onChange={(e) => handleChange("from", e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography>To</Typography>
          <Input
            type="date"
            name="to"
            required
            onChange={(e) => handleChange("to", e.target.value)}
          />
        </Grid>
      </Grid>

      {/* Display error message if validation fails */}
      {error && (
        <Alert color="danger" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      <Stack direction={"row"} justifyContent={"space-between"}>
        <Button
          onClick={handleFind}
          sx={{ mt: 2, paddingX: "30px", mb: 2 }}
          loading={load}
        >
          Find
        </Button>
        {selectedRows.size >= 1 && (
          <Button
            onClick={handleGenerate}
            color="warning"
            variant="outlined"
            sx={{ mt: 2, paddingX: "30px", mb: 2 }}
            endDecorator={<PrinterCheck size={18} />}
          >
            Generate IAR Transmittal
          </Button>
        )}
      </Stack>

      <Divider />
      {search.length >= 1 && (
        <PaginatedTable
          columns={itemColumn}
          rows={
            searchlist
              ? search?.filter(
                  (x) =>
                    x.itemName
                      .toLowerCase()
                      .includes(searchlist.toLowerCase()) ||
                    x.unit.toLowerCase().includes(searchlist.toLowerCase()) ||
                    x.suppliers_name
                      .toLowerCase()
                      .includes(searchlist.toLowerCase()) ||
                    x.releasedRemarks
                      .toLowerCase()
                      .includes(searchlist.toLowerCase()) ||
                    x.record_date
                      .toLowerCase()
                      .includes(searchlist.toLowerCase())
                )
              : search
          }
          customAction={true}
          actionBtns={
            <Stack>
              <Input
                placeholder="Search from list ..."
                sx={{ mt: 1 }}
                startDecorator={<Search size={15} />}
                onChange={(e) => setSearchlist(e.target.value)}
                value={searchlist}
              />
            </Stack>
          }
          handleCustomAction={(row) => {
            return (
              <Stack
                alignContent={"center"}
                justifyContent={"center"}
                direction={"row"}
              >
                <Checkbox
                  color="warning"
                  checked={selectedRows.has(row.id)}
                  onChange={() => handleCheck(row.id)}
                  label={
                    <Typography level="body-xs" color="warning">
                      Select
                    </Typography>
                  }
                />
              </Stack>
            );
          }}
        />
      )}
    </div>
  );
};
