import Stepper from "@mui/joy/Stepper";
import Step from "@mui/joy/Step";
import StepIndicator from "@mui/joy/StepIndicator";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import { useTheme } from "@mui/joy";
import { BiCheck, BiCircle } from "react-icons/bi";
import ChipComponent from "../ChipComponent";
import moment from "moment";

function StepperComponent() {
  const theme = useTheme();
  const color = theme.palette.custom;

  return (
    <Stepper orientation="vertical" sx={{ gap: 3 }}>
      <Step
        indicator={
          <StepIndicator variant="solid" sx={{ bgcolor: color.buttonBg }}>
            <BiCheck style={{ fontSize: 18 }} />
          </StepIndicator>
        }
      >
        <Stack
          direction={"row"}
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Typography level="title-sm" fontWeight={600}>
            IISU (Maryn Dela Cerna, MD)
          </Typography>
          <ChipComponent label={"Received"} />
        </Stack>
        {/* BODY */}
        <Stack
          my={1}
          gap={1}
          direction={"row"}
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            fontWeight: 400,
          }}
        >
          <Typography level="body-sm">Submitted on:</Typography>
          <Typography level="body-sm">{moment().format("ll")}</Typography>
        </Stack>
      </Step>

      <Step
        indicator={
          <StepIndicator variant="solid" sx={{ bgcolor: color.buttonBg }}>
            <BiCheck style={{ fontSize: 18 }} />
          </StepIndicator>
        }
      >
        <Stack
          direction={"row"}
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Typography level="title-sm" fontWeight={600}>
            IISU (Maryn Dela Cerna, MD)
          </Typography>
          <ChipComponent label={"Received"} />
        </Stack>

        {/* BODY */}
        <Stack my={1} gap={1}>
          <Stack
            direction={"row"}
            sx={{
              justifyContent: "space-between",
              alignItems: "center",

              fontWeight: 400,
            }}
          >
            <Typography level="body-sm">Date received:</Typography>
            <Typography level="body-sm">{moment().format("ll")}</Typography>
          </Stack>
          <Stack
            direction={"row"}
            sx={{
              justifyContent: "space-between",
              alignItems: "center",

              fontWeight: 400,
            }}
          >
            <Typography level="body-sm">Date released:</Typography>
            <Typography level="body-sm">{moment().format("ll")}</Typography>
          </Stack>
          {/* TAT */}
          <Stack
            direction={"row"}
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              fontWeight: 600,
            }}
          >
            <Typography level="body-sm" color="danger">
              Turnaround time:
            </Typography>
            <Typography level="body-sm" color="danger">
              2d, 5hrs
            </Typography>
          </Stack>
        </Stack>
      </Step>

      <Step
        indicator={
          <StepIndicator sx={{ bgcolor: color.lighter }}>
            <BiCircle sx={{ bgcolor: color.active }} />
          </StepIndicator>
        }
      >
        <Stack
          direction={"row"}
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Typography level="title-sm" fontWeight={600}>
            IISU (Maryn Dela Cerna, MD)
          </Typography>
          <ChipComponent
            label={"Pending"}
            variant="outlined"
            color={"neutral"}
          />
        </Stack>
      </Step>
      <Step
        indicator={
          <StepIndicator color="secondary" variant="solid">
            <BiCircle />
          </StepIndicator>
        }
      >
        <Stack
          direction={"row"}
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Typography level="title-sm" fontWeight={600} sx={{ color: "grey" }}>
            Materials Management
          </Typography>
          <ChipComponent
            sx={{ fontWeight: 400, color: "grey" }}
            label={"Pending"}
            variant="outlined"
            color={"secondary"}
          />
        </Stack>
      </Step>
    </Stepper>
  );
}
export default StepperComponent;
