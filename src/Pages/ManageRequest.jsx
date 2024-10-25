import { Fragment, useState } from "react";
import PageTitle from "../Components/PageSetup/PageTitle";
import ContainerComponent from "../Components/Container/ContainerComponent";
import {
  Alert,
  Box,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/joy";
import ButtonComponent from "../Components/ButtonComponent";
import InputComponent from "../Components/Form/InputComponent";
import StepperComponent from "../Components/Stepper/StepperComponent";
import TableComponent from "../Components/Table/TableComponent";
import RadioButtonComponent from "../Components/Form/RadioButtonComponent";
import ModalComponent from "../Components/Dialogs/ModalComponent";
import { CiWarning } from "react-icons/ci";
import { BiX } from "react-icons/bi";
import { approvalActions } from "../Data/Actions";

function ManageRequest() {
  const [openActionModal, setOpenActionModal] = useState(false);
  const [transactionCode, setTransactionCode] = useState("");

  // HANDLE [RECEIVE/RETURN/CANCEL] MODAL
  const handleActionModal = () => {
    setOpenActionModal((prev) => !prev);
  };

  return (
    <Fragment>
      <PageTitle
        title={"Manage"}
        subPage={"Purchase Requests"}
        subPath={"/transactions"}
        description={"This is a sample description for Purchase Request page"}
      />

      {/* TRACk */}
      <ContainerComponent sx={{ mt: 3 }}>
        <Stack
          direction={"row"}
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <Stack gap={0.5}>
            <Typography fontWeight={600} fontSize={20}>
              Open and track PR document
            </Typography>
            <Typography fontSize={14} fontWeight={400}>
              Enter the transaction code located at the top of the PR hard copy.
            </Typography>
          </Stack>

          <Stack direction={"row"} gap={1} sx={{ alignItems: "end" }}>
            <InputComponent
              label={"Transaction code"}
              autoFocus={true}
              fontWeight={600}
              value={transactionCode}
              setValue={setTransactionCode}
            />
            <ButtonComponent label={"Find document"} />
          </Stack>
        </Stack>
      </ContainerComponent>

      {/* DETAILS */}
      <Grid container spacing={2} columns={{ md: 12 }} mt={2}>
        {/* PR DISPLAY */}
        <Grid xs={8.5} height={"100%"}>
          <ContainerComponent
            title={"Purchase request overview"}
            description={
              "This is a subheading. It should add more context to the interaction."
            }
          >
            <TableComponent />
          </ContainerComponent>
        </Grid>
        <Grid xs={3.5}>
          {/* TIMElINE STATUS */}
          <ContainerComponent
            title={"Management timeline"}
            description={
              "The list below shows the current status of the request."
            }
          >
            <Stack gap={2} pt={1}>
              {/* STEPPER */}
              <StepperComponent />

              <Divider />

              {/* BUTTON */}
              <ButtonComponent
                label={"Process request"}
                fullWidth
                onClick={handleActionModal}
              />
            </Stack>
          </ContainerComponent>
        </Grid>
      </Grid>

      {/* MODAL */}
      <ModalComponent
        isOpen={openActionModal}
        handleClose={handleActionModal}
        title={"Modal Title Sample"}
        description={
          "Respond to the document using the following action to continue."
        }
        maxWidth={550}
        rightButtonLabel={"Confirm"}
        leftButtonLabel={"Cancel"}
        leftButtonAction={handleActionModal}
        content={
          <Stack gap={3}>
            <Stack pr={1} gap={1}>
              <Typography level="title-sm" c>
                Select the action you would like to take:
              </Typography>
              <RadioButtonComponent actions={approvalActions} />
            </Stack>

            <Alert
              sx={{ alignItems: "flex-start" }}
              startDecorator={<CiWarning fontSize={20} />}
              variant="soft"
              color={"warning"}
            >
              <Box>
                <Typography level="body-xs" color={"warning"} fontWeight={600}>
                  This action cannot be undone.
                </Typography>
                <Typography level="body-xs" color={"warning"} fontWeight={400}>
                  You’re about to mark Maryn dela Cerna’s Purchase request.
                </Typography>
              </Box>
            </Alert>
          </Stack>
        }
      />
    </Fragment>
  );
}

export default ManageRequest;
