import React, { useState } from "react";
import { Select, Option, FormControl, FormLabel } from "@mui/joy";

const YearSelect = ({ size = "md", onChange, value, label, actions }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from(new Array(100), (_, index) => currentYear - index); // Last 100 years

  const [selectedYear, setSelectedYear] = useState("");

  const handleChange = (event, newValue) => {
    setSelectedYear(newValue);
    if (onChange) {
      console.log(newValue);
      onChange(newValue); // Call the parent onChange if provided
    }
    if (actions) {
      actions(newValue);
    }
  };

  return (
    <FormControl>
      <FormLabel sx={{ fontSize: 14, fontWeight: 500 }}>{label}</FormLabel>
      <Select
        value={value}
        onChange={handleChange}
        placeholder="Select Year"
        size={size} // You can adjust the size (sm, md, lg)
        startDecorator="Year:"
      >
        {years.map((year) => (
          <Option key={year} value={year}>
            {year}
          </Option>
        ))}
      </Select>
    </FormControl>
  );
};

export default YearSelect;
