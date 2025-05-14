import { Box, Button, Stack, Typography, useTheme } from "@mui/joy";
import { ChevronRight } from "lucide-react";

import BreadcrumbsComponent from "../../Components/BreadcrumbsComponent";
import AvatarComponent from "../../Components/AvatarComponent";
import SheetComponent from "../../Components/SheetComponent";
import ButtonComponent from "../../Components/ButtonComponent";
import useUserHook from "../../hooks/UserHook";
import SignOut from "../../Components/Signout";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";
import mms from "../../Assets/material-management.png";
const FlexContainer = ({
  children,
  direction = "row",
  alignItems = "center",
  justifyContent = "start",
  ...props
}) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: direction,
      alignItems,
      justifyContent,
      ...props.sx,
    }}
    {...props}
  >
    {children}
  </Box>
);

const Header = ({ pageDetails, data }) => {
  const theme = useTheme();
  const { user, userData } = useUserHook();
  const navigate = useNavigate();

  return (
    <FlexContainer
      direction="row"
      alignItems="start"
      justifyContent="space-between"
    >
      <Box>
        <FlexContainer direction="row" alignItems="center">
          <img src={mms} alt="" style={{ width: "60px" }} />
          <BreadcrumbsComponent
            name={user?.name ?? ""}
            pageTitle={pageDetails.title}
            pagePath={pageDetails?.pagePath}
            subPath={pageDetails?.subPath}
            subTitle={pageDetails?.subTitle}
          />
        </FlexContainer>
        {pageDetails?.subTitle && (
          <Button
            onClick={() => {
              navigate(-1);
            }}
            sx={{ position: "relative", top: "10px", fontSize: "12px" }}
            variant="plain"
            startDecorator={<KeyboardBackspaceIcon sx={{ fontSize: "15px" }} />}
          >
            Back
          </Button>
        )}

        <Stack mt={3}>
          <Typography fontSize={30} fontWeight={600}>
            {pageDetails?.pageTitle
              ? pageDetails?.pageTitle
              : pageDetails.title}
          </Typography>
          <Typography
            level="body-sm"
            sx={{ color: theme.palette.custom.fontReg }}
          >
            {pageDetails.description}
          </Typography>
        </Stack>
      </Box>

      <FlexContainer
        direction="column"
        alignItems="end"
        justifyContent="center"
      >
        <SheetComponent variant="outlined" width={275}>
          <FlexContainer
            direction="row"
            alignItems="center"
            justifyContent="start"
          >
            <Box mr={2}>
              {user ? (
                <AvatarComponent
                  alt={user?.name ?? ""}
                  src={user?.url ?? null}
                />
              ) : (
                <AvatarComponent />
              )}
            </Box>

            <Stack>
              <Typography level="body-md" fontWeight={600}>
                {userData?.name ?? ""}
              </Typography>
              <Typography level="body-xs">{userData.email}</Typography>
            </Stack>

            <SignOut />
          </FlexContainer>
        </SheetComponent>

        {/* <Box mt={2}>
          <ButtonComponent
            variant={"outlined"}
            label="Generate report"
            size="lg"
          />
        </Box> */}
      </FlexContainer>
    </FlexContainer>
  );
};

export default Header;
