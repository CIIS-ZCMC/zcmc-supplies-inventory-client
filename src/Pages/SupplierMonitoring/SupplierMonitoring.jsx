import React from "react";
import {
  Box,
  Typography,
  Input,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Divider,
} from "@mui/joy";
import SearchIcon from "@mui/icons-material/Search";
import ContainerComponent from "../../Components/Container/ContainerComponent";
import { Container } from "lucide-react";
import { BoxItem } from "../Inventory/ViewDetails";
import { GrApps } from "react-icons/gr";
import { useTheme } from "@emotion/react";
import PaginatedTable from "../../Components/Table/PaginatedTable";
import useSuppliersHook from "../../Hooks/SuppliersHook";
import { POResult } from "./POResult";
import { MdAlternateEmail } from "react-icons/md";
import { CiDeliveryTruck } from "react-icons/ci";
import { VscDebugContinue } from "react-icons/vsc";
import { HiBars3CenterLeft } from "react-icons/hi2";
export const SupplierMonitoring = () => {
  const theme = useTheme();
  const { fetchPOs, PO_result } = useSuppliersHook();
  const [searchedPo, setSearchPo] = React.useState("");
  return (
    <Box p={4}>
      <Stack direction="row" justifyContent="space-between" spacing={2} mb={3}>
        <BoxItem
          icon={
            <MdAlternateEmail
              fontSize={25}
              color="darkBlue"
              style={{
                padding: 10,
                backgroundColor: theme.palette.custom.lighter,
              }}
            />
          }
          categoryName={`0`}
          categoryTitle={"Emailed POs (Recorded)"}
        />
        <BoxItem
          icon={
            <CiDeliveryTruck
              fontSize={25}
              color="darkBlue"
              style={{
                padding: 10,
                backgroundColor: theme.palette.custom.lighter,
              }}
            />
          }
          categoryName={`0`}
          categoryTitle={"Received/Delivered POs (Recorded)"}
        />
        <BoxItem
          icon={
            <VscDebugContinue
              fontSize={25}
              color="darkBlue"
              style={{
                padding: 10,
                backgroundColor: theme.palette.custom.lighter,
              }}
            />
          }
          categoryName={`0`}
          categoryTitle={"Extended dues (Recorded)"}
        />
        <BoxItem
          icon={
            <HiBars3CenterLeft
              fontSize={25}
              color="darkBlue"
              style={{
                padding: 10,
                backgroundColor: theme.palette.custom.lighter,
              }}
            />
          }
          categoryName={`0`}
          categoryTitle={"Total Pos (Recorded)"}
        />
      </Stack>
      <Box mb={1}>
        <ContainerComponent>
          <Typography>
            THIS IS THE SUPPLIER MONITORING PAGE. IT SHOWS THE INFORMATION OF
            SUPPLIERS PERFORMANCE AND RATINGS
          </Typography>
        </ContainerComponent>
      </Box>
      <ContainerComponent>
        <Box p={4}>
          <Typography level="h1">Supplier Monitoring</Typography>
          <Stack mt={2} mb={4} direction={"row"} spacing={1}>
            <Input
              placeholder="Search PO #"
              startDecorator={<SearchIcon />}
              sx={{ width: "50%", padding: "10px" }}
              onChange={(e) => setSearchPo(e.target.value)}
            />
            <Button
              variant="solid"
              color="primary"
              sx={{ padding: "10px 50px" }}
              onClick={() => {
                fetchPOs(searchedPo);
              }}
            >
              Search
            </Button>
          </Stack>
          <Typography level="body-xs">
            Searching here retrieves real-time data from BizBox or from System
            records
          </Typography>

          {PO_result?.data?.length >= 1 && (
            <Box mt={2}>
              <POResult data={PO_result.data} />
            </Box>
          )}
        </Box>
      </ContainerComponent>
      {/* <Box mt={2}>
        <ContainerComponent>
          <PaginatedTable
            tableTitle={"More information"}
            tableDesc={
              "PO items marked as pending,received,delivered or cancelled will be shown here"
            }
            columns={[]}
            rows={[]}
          />
        </ContainerComponent>
      </Box> */}
    </Box>
  );
};
