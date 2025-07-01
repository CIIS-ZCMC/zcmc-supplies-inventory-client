import React, { useEffect, useState } from "react";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { Stack, Divider, Button, Grid } from "@mui/joy";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import useAreasHook from "../../Hooks/AreasHook";
import usePrintHooks from "../../Hooks/PrintHooks";
import useCategoriesHook from "../../Hooks/CategoriesHook";
import InputComponent from "../../Components/Form/InputComponent";
import useInventoryHook from "../../Hooks/InventoryHook";
import { useNavigate } from "react-router-dom";
export const ConfirmSelection = ({
  isMonthlyDistribution,
  selectedItems,
  openIssuance,
  isStockCard,
  setGenerateStockCard,
  setIsDialogOpen,
}) => {
  const { getCategoryWItems } = useCategoriesHook();
  const {
    printMonthlyDistReport,
    printStockCardBulk,
    OpenSmallWindow,
    printSuppliesIssuance,
  } = usePrintHooks();
  const [category, setCategory] = useState([]);
  const months = [
    { name: "January", value: 1 },
    { name: "February", value: 2 },
    { name: "March", value: 3 },
    { name: "April", value: 4 },
    { name: "May", value: 5 },
    { name: "June", value: 6 },
    { name: "July", value: 7 },
    { name: "August", value: 8 },
    { name: "September", value: 9 },
    { name: "October", value: 10 },
    { name: "November", value: 11 },
    { name: "December", value: 12 },
  ];
  const setInventoryFilter = useInventoryHook(
    (state) => state.setInventoryFilter
  );

  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2022 + 1 },
    (_, i) => 2022 + i
  ).reverse();

  useEffect(() => {
    getCategoryWItems().then((res) => {
      setCategory(res.data);
    });
  }, []);

  const handleChange = (event) => {
    console.log(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    if (isMonthlyDistribution) {
      window.open(printMonthlyDistReport(JSON.stringify(data)), "_blank");
      return;
    }
    if (openIssuance) {
      console.log(data);

      navigate("/supplies-masterlist-issued", {
        state: data, // pass the data here
      });
      //OpenSmallWindow(printSuppliesIssuance(data));
      return;
    }

    if (isStockCard) {
      // swal({
      //   title: "Generating Stock Cards",
      //   text: "This may take a few moments as we process a large volume of data from BizBox. Do you want to proceed?",
      //   icon: "info",
      //   buttons: {
      //     cancel: "Cancel",
      //     confirm: {
      //       text: "Proceed",
      //       value: true,
      //       closeModal: false, // Keeps the modal open while processing (if needed)
      //     },
      //   },
      //   dangerMode: true, // Only include if this is a high-risk action
      // }).then((willGenerate) => {
      //   if (willGenerate) {

      //     swal.close();
      //   }
      // });
      setInventoryFilter(data);
      setGenerateStockCard(true);
      setIsDialogOpen(false);
      return;
    }
    data.selectedItems = selectedItems;
    swal({
      title: "Generating Balance Cards",
      text: "This may take a few moments as we process a large volume of data from BizBox. Do you want to proceed?",
      icon: "info",
      buttons: {
        cancel: "Cancel",
        confirm: {
          text: "Proceed",
          value: true,
          closeModal: false, // Keeps the modal open while processing (if needed)
        },
      },
      dangerMode: true, // Only include if this is a high-risk action
    }).then((willGenerate) => {
      if (willGenerate) {
        navigate("/balance-card", {
          state: data,
        });
        // OpenSmallWindow(printStockCardBulk(data));
        swal.close();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {openIssuance ? (
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <InputComponent type={"date"} name="from" isRequired label="From" />
          </Grid>
          <Grid item xs={6}>
            <InputComponent type={"date"} name="to" isRequired label="To" />
          </Grid>
        </Grid>
      ) : isStockCard ? (
        <Stack direction={"row"} spacing={1} mt={2}>
          <Select
            placeholder="Select Month"
            name="month"
            required
            sx={{ width: "100%" }}
          >
            {months.map((month) => (
              <Option key={month.value} value={month.value}>
                {month.name}
              </Option>
            ))}
          </Select>
          <Select
            placeholder="Select Year"
            name="year"
            required
            sx={{ width: "100%" }}
          >
            {years.map((year) => (
              <Option key={year} value={year}>
                {year}
              </Option>
            ))}
          </Select>
        </Stack>
      ) : (
        <>
          <Stack spacing={2} sx={{ alignItems: "flex-start" }}>
            <Select
              placeholder="Select Category"
              name="category"
              required
              sx={{ width: "100%" }}
            >
              {category.map((row) => (
                <Option value={row.id}>{row.category_name}</Option>
              ))}
            </Select>
          </Stack>

          <Stack direction={"row"} spacing={1} mt={2}>
            <Select
              placeholder="Select Month"
              name="month"
              required
              sx={{ width: "100%" }}
            >
              {months.map((month) => (
                <Option key={month.value} value={month.value}>
                  {month.name}
                </Option>
              ))}
            </Select>
            <Select
              placeholder="Select Year"
              name="year"
              required
              sx={{ width: "100%" }}
            >
              {years.map((year) => (
                <Option key={year} value={year}>
                  {year}
                </Option>
              ))}
            </Select>
          </Stack>
        </>
      )}

      <Stack display={"flex"} justifyContent={"flex-end"}>
        <Button sx={{ marginTop: "20px", padding: "10px" }} type="submit">
          GENERATE
        </Button>
      </Stack>
    </form>
  );
};
