import { Input, Grid, Stack, Button } from "@mui/joy";
import React from "react";
import InputComponent from "../../Components/Form/InputComponent";
import usePrintHooks from "../../Hooks/PrintHooks";
export const IssuanceQuery = () => {
  const { printIssuanceArea, OpenSmallWindow, postPrint } = usePrintHooks();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    postPrint("printIssuanceArea", data).then((printPath) => {
      OpenSmallWindow(printPath);
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <InputComponent type={"date"} name="from" isRequired label="From" />
          </Grid>
          <Grid item xs={6}>
            <InputComponent type={"date"} name="to" isRequired label="To" />
          </Grid>
        </Grid>
        <InputComponent
          placeholder={"Item Description ..."}
          name={"itemdesc"}
          fullWidth={true}
        />

        <Stack display={"flex"} justifyContent={"flex-end"}>
          <Button sx={{ marginTop: "20px", padding: "10px" }} type="submit">
            GENERATE
          </Button>
        </Stack>
      </form>
    </div>
  );
};
