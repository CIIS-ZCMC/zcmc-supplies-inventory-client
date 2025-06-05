import React, { useState } from "react";
import useSuppliersHook from "../../Hooks/SuppliersHook";
import {
  Grid,
  Box,
  Typography,
  Input,
  Textarea,
  Stack,
  Button,
  Sheet,
  Divider,
} from "@mui/joy";
import ContainerComponent from "../../Components/Container/ContainerComponent";
export const PRresults = ({ setprresult }) => {
  const PR_result = useSuppliersHook((state) => state.PR_result);
  const storeCAF = useSuppliersHook((state) => state.storeCAF);
  const { getCAF } = useSuppliersHook();
  const [input, setInput] = useState({});
  const [load, setLoad] = useState(false);

  const handleChange = (key, value) => {
    setInput((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoad(true);
    input.prno = PR_result[0].seriesNo;
    storeCAF(input).then((res) => {
      setLoad(false);
      setprresult(false);
      setInput("");
      swal("Saved Successful", res.message, "success");
      getCAF();
    });
  };

  return (
    <div style={{ position: "relative" }}>
      <Stack container spacing={3}>
        <Grid xs={12} md={8}>
          <Sheet
            variant="outlined"
            sx={{
              p: 2,
              borderRadius: "sm",
              width: "500px",
              fontSize: "sm",
              backgroundColor: "background.surface",
            }}
          >
            <Typography level="title-md" fontSize="sm" mb={1}>
              Purchase Request Details
            </Typography>
            <Divider />
            <Box sx={{ marginBottom: "250px" }}>
              <Grid container spacing={1} sx={{ fontSize: "sm", mt: 1 }}>
                {PR_result.map((data, key) => {
                  return (
                    <>
                      <Grid xs={12}>
                        <Typography level="body-xs" color="primary">
                          PR #: {data.seriesNo}
                        </Typography>
                      </Grid>
                      <Grid xs={6}>
                        <Typography level="body-xs" color="danger">
                          <span style={{ color: "gray" }}> Item :</span>{" "}
                          {data.itemdesc}
                        </Typography>
                      </Grid>

                      <Typography
                        level="body-xs"
                        fontWeight="md"
                        color="warning"
                      >
                        {data.itemabbrev}
                      </Typography>
                      <Grid xs={6}>
                        <Typography level="body-xs">
                          Qty: {data.qty} | {data.status}
                        </Typography>
                      </Grid>
                      <Grid xs={6}>
                        <Typography level="body-xs">
                          Post Date: {data.postdate}
                        </Typography>
                      </Grid>
                      <Grid xs={6}>
                        <Typography level="body-xs">
                          TRXNO: {data.PK_TRXNO}
                        </Typography>
                      </Grid>
                      <Grid xs={6}>
                        <Typography level="body-xs">
                          Price: ₱{data.actualPrice}
                        </Typography>
                      </Grid>
                      <Grid xs={6}>
                        <Typography level="body-xs">
                          Amount: ₱{data.actualPrice * data.qty}
                        </Typography>
                      </Grid>
                      <Grid md={12}>
                        <Divider />
                      </Grid>
                    </>
                  );
                })}
              </Grid>
            </Box>
          </Sheet>
        </Grid>

        <Grid xs={12} md={4}>
          <Box
            sx={{
              position: "fixed",
              bottom: 20,
              zIndex: 100,
              width: "85%",
              border: "2px solid green",
            }}
          >
            <ContainerComponent>
              <form onSubmit={handleSubmit}>
                <Typography>Confirm Information</Typography>
                <Typography>Details :</Typography>
                <Textarea
                  required
                  size="sm"
                  minRows={2}
                  value={input?.details ?? ""}
                  onChange={(e) => handleChange("details", e.target.value)}
                />
                <Typography>Fund Source :</Typography>
                <Input
                  required
                  size="sm"
                  value={input?.fundsource ?? ""}
                  onChange={(e) => handleChange("fundsource", e.target.value)}
                />
                <Typography>CAF No :</Typography>
                <Input
                  required
                  size="sm"
                  value={input?.cafno ?? ""}
                  onChange={(e) => handleChange("cafno", e.target.value)}
                />
                <Stack mt={2}>
                  <Button loading={load} type="submit">
                    Save
                  </Button>
                </Stack>
              </form>
            </ContainerComponent>
          </Box>
        </Grid>
      </Stack>
    </div>
  );
};
