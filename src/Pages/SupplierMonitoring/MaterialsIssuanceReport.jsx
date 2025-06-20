import React from "react";
import {
  Box,
  Divider,
  Stack,
  Typography,
  useTheme,
  Checkbox,
  Radio,
  Button,
  Grid,
  Sheet,
  Input,
} from "@mui/joy";
import { useLocation } from "react-router-dom";
import { user } from "../../Data";
import Header from "../../Layout/Header/Header";
import ContainerComponent from "../../Components/Container/ContainerComponent";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PaginatedTable from "../../Components/Table/PaginatedTable";
export const MaterialsIssuanceReport = () => {
  const pageDetails = {
    title: "Report of supplies and masterlist issued",
    description: "See the list of items.",
    pagePath: "/inventory",
  };

  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();
  return (
    <div>
      <Header pageDetails={pageDetails} data={user} />

      <Box mt={2}>
        <ContainerComponent>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Box>
              <Button
                size="sm"
                variant="soft"
                sx={{
                  fontWeight: "normal",
                  textTransform: "uppercase",
                  fontSize: "11px",
                }}
                onClick={() => navigate(-1)}
                startDecorator={<ArrowLeft size={14} />}
              >
                Back
              </Button>
              <Typography mt={2}>
                Choose which data to include in the report.
              </Typography>
            </Box>
            <Box mt={2}>
              <Typography>Filter :</Typography>
              <Stack direction={"row"}>
                <Input
                  type="date"
                  size="sm"
                  value={data?.from}
                  color="primary"
                />
                <Typography
                  level="body-xs"
                  sx={{
                    padding: "7px 0 0 0",
                    marginLeft: "5px",
                    marginRight: "5px",
                  }}
                >
                  to
                </Typography>
                <Input type="date" size="sm" color="warning" value={data?.to} />
              </Stack>
            </Box>
          </Stack>
        </ContainerComponent>
      </Box>

      <Box mt={1}>
        <ContainerComponent>
          <PaginatedTable />
        </ContainerComponent>
      </Box>
    </div>
  );
};
