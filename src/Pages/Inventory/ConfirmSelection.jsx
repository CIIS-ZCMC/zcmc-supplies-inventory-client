import React, { useEffect, useState } from "react";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { Stack, Divider, Button } from "@mui/joy";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import useAreasHook from "../../Hooks/AreasHook";
import usePrintHooks from "../../Hooks/PrintHooks";
import useCategoriesHook from "../../Hooks/CategoriesHook";
export const ConfirmSelection = ({ selectedItems }) => {
  const { getCategories } = useCategoriesHook();
  const { printStockCard, printStockCardBulk, OpenSmallWindow } =
    usePrintHooks();
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

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2022 + 1 },
    (_, i) => 2022 + i
  ).reverse();

  useEffect(() => {
    getCategories().then((res) => {
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
    data.selectedItems = selectedItems;
    OpenSmallWindow(printStockCardBulk(data));
  };

  return (
    <form onSubmit={handleSubmit}>
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

      <Divider />

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

      <Stack display={"flex"} justifyContent={"flex-end"}>
        <Button sx={{ marginTop: "20px", padding: "10px" }} type="submit">
          GENERATE
        </Button>
      </Stack>
    </form>
  );
};
