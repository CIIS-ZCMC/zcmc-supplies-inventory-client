import { Fragment } from "react";
import PageTitle from "../Components/PageSetup/PageTitle";
import ContainerComponent from "../Components/Container/ContainerComponent";
import TableComponent from "../Components/Table/TableComponent";
import { Stack, Typography } from "@mui/joy";
import ButtonComponent from "../Components/ButtonComponent";
import { useNavigate } from "react-router-dom";

function TransactionsMain() {
  let navigate = useNavigate();

  const handleManageRequest = () => {
    navigate("/transactions/manage-pr");
  };

  return (
    <Fragment>
      <PageTitle
        title={"Purchase Requests"}
        description={"This is a sample description for Purchase Request page"}
      />

      {/* CONTENT */}
      <ContainerComponent sx={{ mt: 4 }}>
        <Stack gap={2}>
          <Stack
            direction={"row"}
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Typography>Tab panels here</Typography>

            <ButtonComponent
              label="Manage request"
              onClick={handleManageRequest}
            />
          </Stack>
          <TableComponent />
        </Stack>
      </ContainerComponent>
    </Fragment>
  );
}

export default TransactionsMain;
