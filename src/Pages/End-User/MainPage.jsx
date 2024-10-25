import { Fragment, useState } from "react";
import PageTitle from "../../Components/PageSetup/PageTitle";
import ContainerComponent from "../../Components/Container/ContainerComponent";
import ToggleGroupComponent from "../../Components/Toggles/ToggleGroupComponent";
import { Grid, Stack, Typography } from "@mui/joy";
import ButtonComponent from "../../Components/ButtonComponent";
import { requisitionTabs } from "../../Data/TabOptions";
import RequestCardComponent from "../../Components/Container/RequestCardComponent";
import { BiPlus } from "react-icons/bi";
import { TbReport } from "react-icons/tb";
import ModalComponent from "../../Components/Dialogs/ModalComponent";
import RadioButtonComponent from "../../Components/Form/RadioButtonComponent";
import { approvalActions, procurementModes } from "../../Data/Actions";
import UploadFileComponent from "../../Components/Form/UploadFileComponent";

function MainPage() {
  const [fileNewModal, setFileNewModal] = useState(false);
  const [currentView, setCurrentView] = useState(1);
  const [mode, setMode] = useState(""); // Write in hooks

  // HANDLE [RECEIVE/RETURN/CANCEL] MODAL
  const handleActionModal = () => {
    setFileNewModal((prev) => !prev);
  };

  // HANDLE MODAL NEXT
  const handleNext = () => {
    setCurrentView((prev) => prev + 1);
  };

  // HANDLE MODAL NEXT
  const handleBack = () => {
    setCurrentView((prev) => prev - 1);
  };

  return (
    <Fragment>
      <PageTitle
        title={"Supplies Requisition"}
        description={
          "This is a sample description for Supplies Requisition page"
        }
      />

      {/* CONTENT */}
      <Stack mt={4} gap={2}>
        {/* FILTERS */}
        <ContainerComponent>
          <Stack
            direction="row"
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <ToggleGroupComponent
              options={requisitionTabs}
              defaultValue={"view-all"}
            />

            <ButtonComponent
              label={"File new request"}
              startDecorator={<BiPlus />}
              onClick={handleActionModal}
            />
          </Stack>
        </ContainerComponent>

        {/* LIST BODY */}
        <ContainerComponent
          title={"List of requests"}
          description={
            "All your requests are shown here. You’ll be notified when requests are updated. "
          }
          actions={
            <ButtonComponent
              label={"Generate report"}
              customOutlined
              startDecorator={<TbReport />}
            />
          }
        >
          <Grid
            container
            spacing={{ xs: 2, md: 2 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            sx={{ flexGrow: 1, mt: 2, maxHeight: "56vh", overflow: "auto" }}
          >
            {Array.from(Array(6)).map((_, index) => (
              <Grid
                item // Use item prop here
                key={index}
                xs={12} // Full width on extra small screens
                sm={6} // 2 items on small screens
                md={4} // 3 items on medium screens
              >
                <RequestCardComponent
                  title="Competitive bidding"
                  type={"alternative"}
                  status={"cancelled"}
                  statusLabel="Returned"
                />
              </Grid>
            ))}
          </Grid>
        </ContainerComponent>
      </Stack>

      {/* NEW REQUEST FILE */}
      <ModalComponent
        withProgress
        progressValue={currentView === 1 ? 30 : 100}
        isOpen={fileNewModal}
        description={
          currentView === 2 && "Upload a file to generate its transaction code."
        }
        handleClose={handleActionModal}
        title={
          currentView === 1
            ? "Mode of Procurement"
            : "Submit a Purchase Request "
        }
        minWidth={500}
        maxWidth={60}
        rightButtonLabel={currentView === 1 ? "Continue" : "Submit"}
        rightButtonAction={handleNext}
        leftButtonLabel={currentView === 1 ? "Cancel" : "Go back"}
        leftButtonAction={handleBack}
        content={
          <Stack my={1}>
            {currentView === 1 ? (
              <RadioButtonComponent actions={procurementModes} />
            ) : (
              <Stack>
                <UploadFileComponent
                  placeholder="Filename.csv"
                  label="Upload PR (Purchase Request)"
                  helperText={
                    "Upload a (.xlsx) file of the purchase request (can be downloaded from BizBox). See document sample for your reference."
                  }
                />
              </Stack>
            )}
          </Stack>
        }
      />
    </Fragment>
  );
}

export default MainPage;
