import React, { useState } from "react";
import ContainerComponent from "../../Components/Container/ContainerComponent";
import { Typography, Box, Input, Stack, Button } from "@mui/joy";
import { Search } from "lucide-react";
export const CAF = () => {
  const [searchPR, setSearchPR] = useState("");
  return (
    <div>
      <Typography level="body-lg">Generate CAF</Typography>
      <Typography level="body-xs">
        ( Certification as to availability of fund )
      </Typography>

      <Box mt={1} width={"40%"}>
        <ContainerComponent>
          <Typography>Search PR No:</Typography>
          <Stack direction={"row"} spacing={1}>
            <Input
              placeholder="type here ..."
              value={searchPR}
              onChange={(e) => {
                // const val = e.target.value;
                // if (/^[\d-]*$/.test(val)) {
                //   setSearchPR(val);
                // }
              }}
            />
            <Button endDecorator={<Search size={16} />}>Find PR</Button>
          </Stack>
        </ContainerComponent>
      </Box>
    </div>
  );
};
