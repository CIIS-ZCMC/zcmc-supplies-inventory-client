import React, { useState } from "react";
import Header from "../../Layout/Header/Header";
import { user } from "../../Data";
import { Box, Button, Card, Grid, Input, Stack, Typography } from "@mui/joy";
import { ArrowLeft, Search, SquareArrowOutUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useInventoryHook from "../../Hooks/InventoryHook";
import Table from "@mui/joy/Table";
import usePrintHooks from "../../Hooks/PrintHooks";
import PaginatedTable from "../../Components/Table/PaginatedTable";
export const BinCard = () => {
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const { getItems, resultData } = useInventoryHook();
  const { printBinCard, OpenSmallWindow } = usePrintHooks();
  const [params, setParams] = useState([]);
  const pageDetails = {
    title: "Bin Card Generation",
    description: "See the list of items.",
    pagePath: "/inventory",
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    setLoad(true);
    console.log(data?.search);
    getItems(data?.search).then((res) => {
      setLoad(false);
      if (res.data.data.length == 0) {
        swal("No records found!", "", "info");
      }
    });
  };

  const handleGenerate = (row) => {
    OpenSmallWindow(
      printBinCard({
        selectedItem: row,
        params: params,
      })
    );
    console.log(row);
  };

  const disabledGenerate = () => {
    if (!params?.to && !params.from) {
      return true;
    }
    return false;
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
    { id: "itemdesc", label: "Item Name", width: "auto" },
    { id: "unit", label: "Unit" },
    { id: "actions", label: "Actions", width: "20%" },
  ];

  const handleChange = (key, value) => {
    setParams((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  return (
    <div>
      <Header pageDetails={pageDetails} data={user} />
      <Box mt={2}>
        <Button
          sx={{ mb: 1, fontSize: "13px !important", fontWeight: "normal" }}
          variant="outlined"
          size="sm"
          startDecorator={<ArrowLeft size={13} />}
          onClick={() => {
            navigate(pageDetails.pagePath);
          }}
        >
          Back
        </Button>

        <Card>
          <Grid container spacing={1}></Grid>
          <Typography>Enter supply name</Typography>
          <form onSubmit={handleSearch}>
            <Stack direction={"row"} spacing={1}>
              <Box>
                <Input
                  sx={{ width: "500px" }}
                  startDecorator={<Search size={16} />}
                  placeholder="Type here..."
                  required
                  name="search"
                />
              </Box>
              <Box>
                <Button
                  loading={load}
                  loadingPosition="end"
                  type="submit"
                  sx={{ fontSize: "12px", textTransform: "uppercase" }}
                >
                  Search item
                </Button>
              </Box>
            </Stack>
          </form>
        </Card>
        {resultData?.length >= 1 && (
          <Card sx={{ marginTop: "10px" }}>
            <PaginatedTable
              columns={itemColumn}
              rows={resultData}
              customAction={true}
              actionBtns={
                <Box mt={2}>
                  <Typography>Set Parameters :</Typography>
                  <Stack direction={"row"} spacing={2} mt={2}>
                    <Box display={"flex"} gap={1}>
                      <Typography level="body-xs">From :</Typography>
                      <Input
                        type="date"
                        value={params?.from ?? ""}
                        onChange={(e) => handleChange("from", e.target.value)}
                      />
                    </Box>

                    <Box display={"flex"} gap={1}>
                      <Typography level="body-xs">To :</Typography>
                      <Input
                        type="date"
                        value={params?.to ?? ""}
                        onChange={(e) => handleChange("to", e.target.value)}
                      />
                    </Box>

                    <Box display={"flex"}>
                      <Button
                        size="sm"
                        color="danger"
                        variant="soft"
                        sx={{
                          textTransform: "uppercase",
                          fontWeight: "normal",
                        }}
                        onClick={() => setParams([])}
                      >
                        Reset
                      </Button>
                    </Box>
                  </Stack>
                </Box>
              }
              handleCustomAction={(row) => {
                return (
                  <Stack>
                    <Button
                      color="neutral"
                      variant="soft"
                      sx={{ color: "#E14434" }}
                      endDecorator={<SquareArrowOutUpRight size={15} />}
                      disabled={disabledGenerate()}
                      onClick={() => {
                        handleGenerate(row);
                      }}
                    >
                      Generate
                    </Button>
                  </Stack>
                );
              }}
            />
          </Card>
        )}
      </Box>
    </div>
  );
};
