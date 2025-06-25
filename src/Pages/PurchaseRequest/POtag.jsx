import React, { useEffect, useState } from "react";
import ContainerComponent from "../../Components/Container/ContainerComponent";
import { Typography, Box, Input, Stack, Button } from "@mui/joy";
import useSuppliersHook from "../../Hooks/SuppliersHook";
import ModalComponent from "../../Components/Dialogs/ModalComponent";
import { PRresults } from "./PRresults";
import PaginatedTable from "../../Components/Table/PaginatedTable";
import { Printer } from "lucide-react";
import { Search } from "lucide-react";
import ViewTaggedPurchasedOrder from "./ViewTaggedPurchasedOrder";
import { useNavigate } from "react-router-dom";
import usePOTaggingHooks from "../../Hooks/POTaggingHook";
export const POtag = () => {
  const [searchPO, setsearchPO] = useState("");
  const [prresult, setprresult] = useState(false);
  const [load, setLoad] = useState(false);
  const { getPOitems } = usePOTaggingHooks();
  const navigate = useNavigate();

  useEffect(() => {}, []);
  return (
    <div>
      <Typography level="body-lg">Purchase Order tagging</Typography>
      <Typography level="body-xs">
        ( Select items to tag the ff : ORS/BURS no., Amount etc.. )
      </Typography>

      <Box mt={1} width={"40%"}>
        <ContainerComponent>
          <Typography>Search PO No:</Typography>
          <Stack direction={"row"} spacing={1}>
            <Input
              placeholder="Type here ..."
              value={searchPO}
              onChange={(e) => {
                const val = e.target.value;
                setsearchPO(val);
              }}
            />
            <Button
              endDecorator={<Search size={16} />}
              loading={load}
              loadingPosition="end"
              onClick={() => {
                if (searchPO) {
                  setLoad(true);
                  //   getPOitems(searchPO).then((res) => {
                  //     setprresult(true);
                  //     setLoad(false);
                  //   });
                  navigate(`${searchPO}`);
                }
              }}
            >
              Find PO
            </Button>
          </Stack>
        </ContainerComponent>
      </Box>

      <Box mt={2}>
        <ViewTaggedPurchasedOrder />
      </Box>
    </div>
  );
};
