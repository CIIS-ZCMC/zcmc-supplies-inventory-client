import React, { Fragment, useEffect, useState } from "react";
import Header from "../../Layout/Header/Header";
import { user } from "../../Data/index";
import {
  Stack,
  Box,
  Grid,
  Textarea,
  Typography,
  Divider,
  FormControl,
  Autocomplete,
  FormLabel,
  Sheet,
  Button,
  Input,
} from "@mui/joy";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import InputComponent from "../../Components/Form/InputComponent";
import ButtonComponent from "../../Components/ButtonComponent";
import { Summary } from "./Summary";
import useCategoriesHook from "../../Hooks/CategoriesHook";
import useUnitsHook from "../../Hooks/UnitsHook";
import useBrandsHook from "../../Hooks/BrandsHook";
import useSourceHook from "../../Hooks/SourceHook";
import useSuppliersHook from "../../Hooks/SuppliersHook";
import { IoAddCircleOutline } from "react-icons/io5";
import ModalComponent from "../../Components/Dialogs/ModalComponent";
import { AddInventoryStocks } from "./AddInventoryStocks";
import { CiCircleMinus } from "react-icons/ci";
import swal from "sweetalert";
const pageDetails = {
  pageTitle: "Saving New Item",
  title: "Inventory",
  description:
    "Save a new item to your inventory, ensuring accurate records and tracking.",
  pagePath: "/inventory",
  subTitle: "New Item",
  subPath: "",
};

const NewItem = () => {
  const [inputs, setInputs] = useState(null);
  const [category, setCategory] = useState([]);
  const [units, setUnits] = useState([]);
  const [brands, setBrand] = useState([]);
  const [sources, setSource] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [inventoryStocks, setInventoryStocks] = useState([]);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const { getCategories } = useCategoriesHook();
  const { getUnits } = useUnitsHook();
  const { getBrands } = useBrandsHook();
  const { getSources } = useSourceHook();
  const { getSuppliers } = useSuppliersHook();

  useEffect(() => {
    getCategories().then((res) => {
      setCategory(res.data);
    });
    getUnits().then((res) => {
      setUnits(res.data);
    });
    getBrands().then((res) => {
      setBrand(res.data);
    });
    getSources().then((res) => {
      setSource(res.data);
    });
    getSuppliers().then((res) => {
      setSuppliers(res.data);
    });
  }, []);

  const handleViewDialogClose = (row) => {
    setIsViewDialogOpen(false);
  };
  const handleChange = (event, name) => {
    const value = event.target.value;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    if (inventoryStocks.length <= 0) {
      swal(
        "Please add stocks",
        "Unable to save entry as no stocks detected",
        "error"
      );
      return;
    }
    swal({
      title: "Are you sure?",
      text: "Please review the summary to confirm the correct data is saved before proceeding.",
      icon: "info",
      buttons: true,
      dangerMode: true,
    }).then((willSave) => {
      if (willSave) {
        swal("Item saved", "Item successfully added in inventory.", "success");
        console.log(inventoryStocks);
        console.log(data);
      }
    });
  };
  return (
    <Fragment>
      <Header pageDetails={pageDetails} data={user} />
      <Divider sx={{ marginTop: "5px" }} />
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} mt={2}>
          {/* Left side: takes 6 columns */}
          <Grid item md={6}>
            <Sheet
              sx={{
                p: 3,
                boxShadow: 3,
                borderRadius: 2,
                backgroundColor: "#fff",
              }}
            >
              <Typography fontWeight={"bold"}>ITEM INFORMATION</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <FormLabel>Select Category</FormLabel>
                    <Autocomplete
                      placeholder="Category"
                      type="search"
                      freeSolo
                      disableClearable
                      options={category.map((row) => row.category_name)}
                      required
                      name="category"
                      onBlur={(e) => handleChange(e, "category")}
                    />
                  </FormControl>
                </Grid>

                {/* Half-width for Unit */}
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <FormLabel>Select Unit</FormLabel>
                    <Autocomplete
                      placeholder="Unit"
                      type="search"
                      freeSolo
                      disableClearable
                      options={units.map((row) => row.unit_name)}
                      name="unit"
                      onBlur={(e) => handleChange(e, "unit")}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <FormLabel>Item Name</FormLabel>
                    <InputComponent
                      fullWidth
                      name={"supply_name"}
                      isRequired
                      onChange={(e) => handleChange(e, "supply_name")}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <FormLabel>Item Description</FormLabel>
                    <Textarea
                      required
                      name="description"
                      minRows={2}
                      placeholder="Enter description ..."
                      onChange={(e) => handleChange(e, "description")}
                    />
                  </FormControl>
                </Grid>
              </Grid>

              <Typography fontWeight={"bold"} mt={5}>
                PURCHASE ORDER INFORMATION
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <FormLabel>PO Number</FormLabel>
                    <InputComponent
                      fullWidth
                      placeholder={"PO Number"}
                      name="po_number"
                      isRequired
                      onChange={(e) => handleChange(e, "po_number")}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <FormLabel>Mode of Procurement</FormLabel>
                    <InputComponent
                      fullWidth
                      placeholder={""}
                      name="mode_of_procurement"
                      isRequired
                      onChange={(e) => handleChange(e, "mode_of_procurement")}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <FormLabel>Funds available</FormLabel>
                    <InputComponent
                      fullWidth
                      placeholder={"Funds available"}
                      type={"number"}
                      name={"funds_available"}
                      isRequired
                      onChange={(e) => handleChange(e, "funds_available")}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <FormLabel>Amount</FormLabel>
                    <InputComponent
                      fullWidth
                      placeholder={"Amount"}
                      type={"number"}
                      name={"amount"}
                      isRequired
                      onChange={(e) => handleChange(e, "amount")}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <FormLabel>ORS-BURS-No</FormLabel>
                    <InputComponent
                      fullWidth
                      placeholder={""}
                      name={"ors_burs_no"}
                      isRequired
                      onChange={(e) => handleChange(e, "ors_burs_no")}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <FormLabel>ORS-BURS-Date</FormLabel>
                    <InputComponent
                      fullWidth
                      type={"date"}
                      name="ors_burs_date"
                      isRequired
                      onChange={(e) => handleChange(e, "ors_burs_date")}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <FormLabel>Caf No</FormLabel>
                    <InputComponent
                      fullWidth
                      placeholder={""}
                      name={"caf_no"}
                      isRequired
                      onChange={(e) => handleChange(e, "caf_no")}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <FormLabel>Fund Cluster</FormLabel>
                    <InputComponent
                      fullWidth
                      placeholder={"Fund cluster"}
                      name={"fund_cluster"}
                      isRequired
                      onChange={(e) => handleChange(e, "fund_cluster")}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <FormLabel>Delivery Term</FormLabel>
                    <InputComponent
                      fullWidth
                      placeholder={""}
                      name={"delivery_term"}
                      isRequired
                      onChange={(e) => handleChange(e, "delivery_term")}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Sheet>
          </Grid>

          {/* Right side filler */}
          <Grid item md={6}>
            <Sheet
              sx={{
                p: 3,
                boxShadow: 3,
                borderRadius: 2,
                backgroundColor: "#fff",
              }}
            >
              <Button
                size="md"
                sx={{
                  marginTop: "5px",
                  fontSize: "11px",
                  textTransform: "uppercase",
                }}
                variant="soft"
                endDecorator={<IoAddCircleOutline fontSize={18} />}
                onClick={() => {
                  setIsViewDialogOpen(true);
                }}
              >
                Add STOCKS
              </Button>

              {inventoryStocks?.map((row) => {
                return (
                  <Sheet
                    sx={{
                      p: 3,
                      boxShadow: 6, // Increased shadow for more emphasis
                      borderRadius: 2,
                      backgroundColor: "#FFF5E4",
                      marginTop: "10px",
                      display: "block",

                      borderRadius: "7px", // You have a border-radius, so this creates rounded corners
                      "&:hover": {
                        boxShadow: 12, // Apply a stronger shadow on hover for a nice effect
                      },
                    }}
                  >
                    <Box sx={{ float: "right" }}>
                      <Button
                        size="small"
                        sx={{ fontSize: "11px", textTransform: "uppercase" }}
                        variant="soft"
                        color="danger"
                        endDecorator={
                          <CiCircleMinus
                            fontSize={15}
                            style={{ marginLeft: "5px" }}
                          />
                        }
                        onClick={() => {
                          const newData = inventoryStocks.filter(
                            (x) => x.id != row.id
                          );

                          setInventoryStocks(newData);
                        }}
                      >
                        Remove
                      </Button>
                    </Box>
                    <Stack>
                      <Typography level="body-sm" fontSize={11}>
                        Brand : {row.brand}
                      </Typography>
                      <Typography level="body-sm" fontSize={11}>
                        Source : {row.source}
                      </Typography>
                      <Typography level="body-sm" fontSize={11}>
                        Quantity : {row.quantity}
                      </Typography>
                      <Typography level="body-sm" fontSize={11}>
                        Supplier : {row.supplier}
                      </Typography>
                    </Stack>
                  </Sheet>
                );
              })}

              <Divider sx={{ marginTop: "5px", marginBottom: "10px" }} />
              <Typography
                level="body-sm"
                sx={{ color: "#333", fontWeight: "500" }}
              >
                Please ensure that all inputs are valid and represent new
                entries. If you have already submitted similar data, make sure
                to update it accordingly. Double-check your entries before
                proceeding.
              </Typography>
            </Sheet>

            <Sheet
              sx={{
                p: 3,
                boxShadow: 6, // Increased shadow for more emphasis
                borderRadius: 2,
                backgroundColor: "#fff",
                marginTop: "10px",
                display: "block",

                borderRadius: "10px", // You have a border-radius, so this creates rounded corners
                "&:hover": {
                  boxShadow: 12, // Apply a stronger shadow on hover for a nice effect
                },
              }}
            >
              <Typography fontWeight={"bold"} mt={1}>
                SUMMARY
              </Typography>
              <Summary
                data={{
                  Category: inputs?.category ?? "",
                  Unit: inputs?.unit ?? "",
                  "Supply Name": inputs?.supply_name ?? "",
                  //Brand: inputs?.brand ?? "",
                  "Item Description": inputs?.description ?? "",
                  "PO Number": inputs?.po_number ?? "",
                  "Mode of Procurement": inputs?.mode_of_procurement ?? "",
                  "Fund available": inputs?.funds_available ?? "",
                  Amount: inputs?.amount ?? "",
                  "ORS-BURS-No": inputs?.ors_burs_no ?? "",
                  "ORS-BURS-Date": inputs?.ors_burs_date ?? "",
                  "CAF No": inputs?.caf_no ?? "",
                  "Fund Cluster": inputs?.fund_cluster ?? "",
                  "Delivery Term": inputs?.delivery_term ?? "",
                  //"Delivery Date": inputs?.delivery_date ?? "",
                  // "Source of Funds": inputs?.source ?? "",
                  // Supplier: inputs?.supplier ?? "",
                  // Quantity: inputs?.quantity ?? "",
                  // "Expiration Date": inputs?.expiration_date ?? "",
                }}
              />

              <Stack
                direction={"row"}
                spacing={1}
                display={"flex"}
                justifyContent={"flex-end"}
              >
                <Button
                  color="danger"
                  variant="soft"
                  sx={{ padding: "10px 40px" }}
                  type="button"
                >
                  Cancel
                </Button>
                <Button sx={{ padding: "10px 40px" }} type="submit">
                  Save Item
                </Button>
              </Stack>
            </Sheet>
          </Grid>
        </Grid>
      </form>

      <ModalComponent
        isOpen={isViewDialogOpen}
        handleClose={handleViewDialogClose}
        content={
          <AddInventoryStocks
            brands={brands}
            sources={sources}
            suppliers={suppliers}
            setInventoryStocks={setInventoryStocks}
            setIsViewDialogOpen={setIsViewDialogOpen}
            isViewDialogOpen={isViewDialogOpen}
          />
        }
        actionBtns={false}
        title={"Add Inventory Stocks"}
        description={
          "Provide complete and accurate information to register new inventory items. These details will be used to update stock levels and track assets effectively."
        }
      />
    </Fragment>
  );
};

export default NewItem;
