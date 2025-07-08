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
} from "@mui/joy";
import InputComponent from "../Components/Form/InputComponent";
import Chip from "@mui/joy/Chip";
import ChipDelete from "@mui/joy/ChipDelete";
import { CirclePlus, ListRestart } from "lucide-react";
import useDashboardHook from "../Hooks/DashboardHook";

function LineChart() {
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [select, setSelect] = useState();
  const { fetchItem, itemsData, fetchChartIssuance, chartData } =
    useDashboardHook();
  const [typingValue, setTypingValue] = useState("");
  const debounceRef = useRef(null);
  const [loadfetch, setLoadingfetch] = useState(false);

  const handleAdd = () => {
    const item = select;
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
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    console.log(data);
    console.log(selectedItems);
    fetchChartIssuance({
      filter: data,
      items: Array.from(selectedItems),
    }).then((res) => {
      console.log(res);
    });
  };

  //Typing and request after 1 second
  useEffect(() => {
    if (typingValue.length >= 4) {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(() => {
        const exists = itemsData.some(
          (item) => item.label.toLowerCase() === typingValue.toLowerCase()
        );

        if (!exists) {
          fetchItem({ search: typingValue }).then((res) => {
            console.log("Fetched:", res);
            setLoadingfetch(false);
          });
        } else {
          console.log("Already exists — no request needed.");
        }
      }, 1500); // 1000 ms = 1 second
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

  return (
    <>
      <Box width={400} mb={3}>
        <Typography>Apply Filter </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <InputComponent
                type={"date"}
                name="from"
                isRequired
                fullWidth={true}
                label="From"
              />
            </Grid>
            <Grid item xs={6}>
              <InputComponent
                type={"date"}
                fullWidth={true}
                name="to"
                isRequired
                label="To"
              />
            </Grid>
          </Grid>
          <Typography level="body-xs">Add Item</Typography>
          <Stack direction={"row"} spacing={1}>
            <Autocomplete
              loading={loadfetch}
              options={itemsData}
              getOptionLabel={(option) => option.label}
              onInputChange={(event, inputValue) => {
                setLoadingfetch(true);
                setSelect(inputValue);
                setTypingValue(inputValue); // Track the latest typed value
              }}
              renderInput={(params) => (
                <TextField {...params} label="Select Items ..." />
              )}
              sx={{ width: 300 }}
              value={select}
              onChange={(event, newValue) => {
                setSelect(newValue?.label);

                console.log("Selected:", newValue?.label);
              }}
            />

            <Button variant="soft" color="warning" onClick={handleAdd}>
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
                  maxWidth: "700px", // limit to 400px
                  flexWrap: "wrap", // allow wrapping
                  border: "1px dashed #ccc", // optional visual border for testing
                  rowGap: 1.5,
                  padding: "5px",
                }}
              >
                {Array.from(selectedItems).map((row) => (
                  <Chip
                    key={row}
                    variant="soft"
                    color="neutral"
                    sx={{ mt: 1 }}
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
            sx={{ mt: 2 }}
            type="submit"
            variant="solid"
            endDecorator={<ListRestart size={18} />}
          >
            Load on Chart
          </Button>
        </form>
        {/* <Stack display={"flex"} justifyContent={"flex-end"}>
            <Button sx={{ marginTop: "20px", padding: "10px" }} type="submit">
              GENERATE
            </Button>
          </Stack> */}
      </Box>
      <Chart
        chartType="Line"
        width="100%"
        height="400px"
        data={chartData}
        options={options}
      />
    </>
  );
}

export default LineChart;
