import PropTypes from "prop-types";
import {
  Box,
  Card,
  CardContent,
  CardOverflow,
  Divider,
  Link,
  Stack,
  Typography,
} from "@mui/joy";
import { BsCopy } from "react-icons/bs";
import { IoOpenOutline } from "react-icons/io5";
import moment from "moment";
import ChipComponent from "../ChipComponent";
import BoxComponent from "./BoxComponent";
import CardInfoDisplay from "../Typography/CardInfoDisplay";
import {
  getModeColorScheme,
  getStatusColorScheme,
} from "../../Utils/ColorScheme";

RequestCardComponent.propTypes = {
  title: PropTypes.string, // Default is "Card Title"
  variant: PropTypes.string, // Add any variants you support
  width: PropTypes.string, // You could also use PropTypes.number if you expect numerical values
  type: PropTypes.string, // Define if you have specific expected types
  status: PropTypes.string, // Define expected statuses
  statusLabel: PropTypes.string, // Default is "Pending"
};

function RequestCardComponent({
  title = "Card Title",
  variant = "outlined",
  width,
  type,
  status = "pending",
  statusLabel = "Pending",
}) {
  return (
    <Card
      variant={variant}
      data-resizable
      sx={{ width: width, backgroundColor: "white" }}
      orientation="horizontal"
    >
      <CardOverflow
        variant="solid"
        color={getModeColorScheme(type)}
        sx={{ p: 0.5 }}
      />
      <CardContent>
        {/* TITLE */}
        <Stack
          direction="row"
          sx={{ alignItems: "center", justifyContent: "space-between", mt: 1 }}
        >
          <Typography
            level="title-md"
            fontWeight={600}
            color={getModeColorScheme(type)}
          >
            {title}
          </Typography>
          <ChipComponent
            label={statusLabel}
            color={getStatusColorScheme(status)}
          />
        </Stack>

        <Divider sx={{ my: 1 }} />

        {/* CONTENT */}
        <Stack gap={2} py={1}>
          {/* DATES */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <BoxComponent>
              <CardInfoDisplay
                label={"Filed on:"}
                value={moment().format("ll")}
              />
            </BoxComponent>

            <BoxComponent>
              <CardInfoDisplay
                label={"Completed on:"}
                value={moment().format("ll")}
              />
            </BoxComponent>

            <BoxComponent>
              <CardInfoDisplay label={"Duration:"} value={"3 days, 4h, 30m"} />
            </BoxComponent>
          </Stack>

          <Divider />

          {/* TRANSACTION CODE AND CURRENT LOC */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ alignItems: "start", justifyContent: "space-between" }}
          >
            <CardInfoDisplay
              label={"Transaction code:"}
              value={
                <Typography>
                  ASF7232AG
                  <Link>
                    <BsCopy style={{ marginLeft: 10 }} />
                  </Link>
                </Typography>
              }
            />

            <Box maxWidth={200}>
              <CardInfoDisplay
                label={"Currently on:"}
                value={"Accounting Section"}
              />
            </Box>
          </Stack>

          <Divider />

          {/* TOTAL */}
          <Stack
            direction="row"
            spacing={2}
            sx={{ alignItems: "start", justifyContent: "space-between" }}
          >
            <Typography level="body-xs">
              Grand Total ---------------
              <Typography fontWeight={600} fontSize={13} color="black">
                {"   "}
                &#8369; 10,000,000
              </Typography>
            </Typography>

            <Link level="body-xs" sx={{ textDecoration: "underline" }}>
              More details
              <IoOpenOutline style={{ marginLeft: 10 }} />
            </Link>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default RequestCardComponent;
