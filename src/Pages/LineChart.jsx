import React, { useState, useRef, useEffect } from "react";
import { Chart } from "react-google-charts";
import {
  Grid,
  Box,
  Button,
  Stack,
  Input,
  Typography,
  Autocomplete,
  Checkbox,
  Divider,
  Select,
  Option,
} from "@mui/joy";
import InputComponent from "../Components/Form/InputComponent";
import Chip from "@mui/joy/Chip";
import ChipDelete from "@mui/joy/ChipDelete";
import { CirclePlus, ListRestart } from "lucide-react";
import useDashboardHook from "../Hooks/DashboardHook";

function LineChart() {
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [select, setSelect] = useState("");
  const { fetchItem, itemsData, fetchChartIssuance, chartData } =
    useDashboardHook();
  const [selectedYear, setSelectedYear] = useState(new Set());
  const [year, setYear] = useState("");
  const [typingValue, setTypingValue] = useState("");
  const debounceRef = useRef(null);
  const [loadfetch, setLoadingfetch] = useState(false);
  const autocompleteRef = useRef(null);
  const [loadBtnfetch, setLoadbntFetch] = useState(false);
  const [anualComparison, setAnnualComparison] = useState(false);

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2020 + 1 },
    (_, i) => 2020 + i
  ).reverse();
  const handleAdd = () => {
    const item = select;
    setTypingValue("");
    if (select == "") {
      return;
    }
    if (selectedItems.has(item)) {
      console.log("Item already selected:", item);
      return;
    }

    // Create a new Set and update state
    const updated = new Set(selectedItems);
    updated.add(item);

    setSelectedItems(updated);
    setSelect("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoadbntFetch(true);
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    console.log(data);
    console.log(selectedItems);

    fetchChartIssuance({
      filter: data,
      items: Array.from(selectedItems),
      annualComparison: Array.from(selectedYear),
    }).then((res) => {
      console.log(res);
      setLoadbntFetch(false);
    });
  };

  const toggleAnnual = () => {
    setAnnualComparison((prev) => !prev);
  };

  //Typing and request after 1 second
  useEffect(() => {
    if (typingValue.length >= 3) {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(() => {
        const exists = itemsData?.some(
          (item) => item?.label?.toLowerCase() === typingValue?.toLowerCase()
        );

        if (!exists) {
          fetchItem({ search: typingValue }).then((res) => {
            console.log("Fetched:", res);
            setLoadingfetch(false);
            setSelect("");
          });
        } else {
          console.log("Already exists — no request needed.");
        }
      }, 2000); // 1000 ms = 1 second
    }

    // Optional: clean up timeout when component unmounts
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [typingValue, itemsData]);

  const options = {
    title: "Company Performance",
    curveType: "function", // smooth lines
    legend: { position: "bottom" },
    height: 400,
  };

  const handleAddYear = () => {
    if (!year) {
      console.warn("Year is undefined or empty");
      return;
    }

    if (selectedYear.has(year)) {
      console.log("Year already selected:", year);
      return;
    }

    const newSetOfYear = new Set(selectedYear);
    newSetOfYear.add(year);
    setSelectedYear(newSetOfYear);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={6}>
          <Box mb={3}>
            <Typography mt={2} level="body-xs">
              Change Filter
            </Typography>
            <Checkbox
              onChange={toggleAnnual}
              color="primary"
              label={"Annual Issuance Comparison"}
            />
            <Divider />
            <Typography mt={1}>Apply Filter </Typography>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  {anualComparison ? (
                    <Box>
                      <Stack direction={"row"} spacing={1}>
                        <Box>
                          <Typography>From</Typography>
                          <Select
                            placeholder={"SELECT YEARS TO COMPARE"}
                            sx={{ width: "300px" }}
                            value={year}
                            onChange={(e, newValue) => setYear(newValue)}
                          >
                            {years.map((row) => (
                              <Option value={row}>{row}</Option>
                            ))}
                          </Select>
                        </Box>
                        <Box>
                          <Button
                            onClick={handleAddYear}
                            sx={{ marginTop: "24px" }}
                          >
                            Add
                          </Button>
                        </Box>
                      </Stack>
                    </Box>
                  ) : (
                    <InputComponent
                      type={"date"}
                      name="from"
                      isRequired
                      fullWidth={true}
                      label="From"
                    />
                  )}
                </Grid>
                <Grid item xs={6}>
                  {anualComparison ? (
                    <Box></Box>
                  ) : (
                    <InputComponent
                      type={"date"}
                      fullWidth={true}
                      name="to"
                      isRequired
                      label="To"
                    />
                  )}
                </Grid>
              </Grid>
              {anualComparison && (
                <Stack direction={"row"} spacing={1} mt={2} mb={2}>
                  {Array.from(selectedYear)?.map((row) => {
                    return (
                      <Chip
                        key={row}
                        variant="outlined"
                        color="success"
                        sx={{
                          mt: 1,
                          whiteSpace: "normal", // Allow text to wrap
                          wordWrap: "break-word", // Break long words if needed
                        }}
                        endDecorator={
                          <ChipDelete
                            onDelete={() => {
                              const updatedSet = new Set(selectedYear);
                              updatedSet.delete(row);
                              setSelectedYear(updatedSet);
                            }}
                          />
                        }
                      >
                        {row}
                      </Chip>
                    );
                  })}
                </Stack>
              )}

              <Typography level="body-xs">Add Item</Typography>
              <Stack direction={"row"} spacing={1}>
                <Autocomplete
                  ref={autocompleteRef}
                  loading={loadfetch}
                  options={itemsData}
                  getOptionLabel={(option) => option.label}
                  inputValue={typingValue}
                  onInputChange={(event, inputValue) => {
                    setLoadingfetch(true);
                    setSelect(inputValue);
                    setTypingValue(inputValue); // Track the latest typed value
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Select Items ..." />
                  )}
                  sx={{ width: 300 }}
                  onChange={(event, newValue) => {
                    setSelect(newValue?.label);

                    console.log("Selected:", newValue?.label);
                  }}
                  clearOnBlur={true}
                  clearOnEscape
                  disableClearable={false}
                  clearOn
                />

                <Button
                  sx={{
                    display:
                      anualComparison && selectedItems.size == 1
                        ? "none"
                        : "block",
                  }}
                  variant="soft"
                  color="warning"
                  onClick={handleAdd}
                >
                  <CirclePlus />
                </Button>
              </Stack>

              <Box>
                {selectedItems.size >= 1 && (
                  <Stack
                    direction="row"
                    spacing={1}
                    mt={2}
                    sx={{
                      width: "100%", // stretch to container

                      flexWrap: "wrap", // allow wrapping

                      rowGap: 1.5,
                      padding: "5px",
                    }}
                  >
                    {Array.from(selectedItems).map((row) => (
                      <Chip
                        key={row}
                        variant="soft"
                        color="neutral"
                        sx={{
                          mt: 1,
                          whiteSpace: "normal", // Allow text to wrap
                          wordWrap: "break-word", // Break long words if needed
                        }}
                        endDecorator={
                          <ChipDelete
                            onDelete={() => {
                              const updatedSet = new Set(selectedItems);
                              updatedSet.delete(row);
                              setSelectedItems(updatedSet);
                            }}
                          />
                        }
                      >
                        {row}
                      </Chip>
                    ))}
                  </Stack>
                )}
              </Box>

              <Button
                loading={loadBtnfetch}
                loadingPosition="end"
                sx={{ mt: 2 }}
                type="submit"
                variant="solid"
                endDecorator={<ListRestart size={18} />}
              >
                Load on Chart
              </Button>
            </form>
          </Box>
        </Grid>
        <Grid md={6}></Grid>
      </Grid>

      <Box p={4}>
        {anualComparison && selectedItems.size == 1 && (
          <Typography textAlign={"center"} mb={2} level="h4" color="primary">
            {selectedItems.values().next().value}{" "}
          </Typography>
        )}
        <Chart
          chartType="Line"
          width="100%"
          height="500px"
          data={chartData}
          options={options}
        />
      </Box>
    </>
  );
}

export default LineChart;
