import React, { useState } from "react";
import {
  Grid,
  FormControl,
  FormLabel,
  Button,
  Box,
  Autocomplete,
  Checkbox,
} from "@mui/joy";
import InputComponent from "../../Components/Form/InputComponent";
import { useEffect } from "react";
export const AddInventoryStocks = ({
  brands,
  sources,
  suppliers,
  setInventoryStocks,
  setIsViewDialogOpen,
  isViewDialogOpen,
}) => {
  const [noexpiry, setNoexpiry] = useState(false);
  const [inputs, setInputs] = useState(null);
  const handleChange = (valueOrEvent, name) => {
    const value =
      valueOrEvent &&
      typeof valueOrEvent === "object" &&
      "target" in valueOrEvent
        ? valueOrEvent.target.value
        : valueOrEvent;

    console.log(value);

    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (isViewDialogOpen) {
      setInputs(null);
    }
  }, [isViewDialogOpen]);
  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedInputs = {
      id: Date.now(),
      ...inputs,
      quantity: inputs?.quantity ?? 1,
    };

    setInventoryStocks((prev) => [...(prev || []), updatedInputs]);
    setIsViewDialogOpen(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormControl fullWidth sx={{ padding: "5px 0 0 0" }}>
            <FormLabel>Select Brand</FormLabel>
            <Autocomplete
              required
              freeSolo
              disableClearable
              options={brands.map((row) => row.brand_name)}
              value={inputs?.brand ?? ""}
              onChange={(e, value) => handleChange(value, "brand")}
              onInputChange={(e, value) => handleChange(value, "brand")}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="brand" // this ensures FormData captures it
                  label="Brand"
                  required
                />
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth sx={{ padding: "5px 0 0 0" }}>
            <FormLabel>Select Source</FormLabel>
            <Autocomplete
              required
              freeSolo
              disableClearable
              options={sources.map((row) => row.source_name)}
              value={inputs?.source ?? ""}
              onChange={(e, value) => handleChange(value, "source")}
              onInputChange={(e, value) => handleChange(value, "source")}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="source" // Needed for FormData
                  label="Source of Funds"
                  required
                />
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth sx={{ padding: "5px 0 0 0" }}>
            <FormLabel>Select Supplier</FormLabel>
            <Autocomplete
              required
              freeSolo
              disableClearable
              options={suppliers.map((row) => row.supplier_name)}
              value={inputs?.supplier ?? ""}
              onChange={(e, value) => handleChange(value, "supplier")}
              onInputChange={(e, value) => handleChange(value, "supplier")}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="supplier" // Needed for FormData
                  label="Supplier"
                  required
                />
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <FormLabel>Quantity</FormLabel>
            <InputComponent
              fullWidth
              type={"number"}
              defaultvalue={1}
              value={inputs?.quantity ?? 1}
              name={"quantity"}
              isRequired
              onChange={(e) => handleChange(e, "quantity")}
            />
          </FormControl>
        </Grid>
        <Grid item md={6}></Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <FormLabel>Expiration Date</FormLabel>
            <InputComponent
              disabled={noexpiry}
              fullWidth
              type={"date"}
              name={"expiration_date"}
              isRequired={noexpiry ? false : true}
              onChange={(e) => handleChange(e, "expiration_date")}
              value={inputs?.expiration_date ?? ""}
            />
          </FormControl>
          <Checkbox
            label="No Expiry"
            variant="outlined"
            onChange={(e) => {
              if (e.target.checked) {
                setNoexpiry(true);
              } else {
                setNoexpiry(false);
              }
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <FormLabel>Delivery Date</FormLabel>
            <InputComponent
              fullWidth
              type={"date"}
              name={"delivery_date"}
              isRequired
              onChange={(e) => handleChange(e, "delivery_date")}
              value={inputs?.delivery_date ?? ""}
            />
          </FormControl>
        </Grid>
      </Grid>
      <Box display={"flex"} justifyContent={"flex-end"} mt={2}>
        <Button
          variant="outlined"
          sx={{
            padding: "10px 50px",
            fontWeight: "600",
          }}
          type="submit"
        >
          Confirm
        </Button>
      </Box>
    </form>
  );
};
