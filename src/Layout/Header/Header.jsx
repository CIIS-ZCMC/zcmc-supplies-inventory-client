import { Box, Stack, Typography } from "@mui/joy";
import { ChevronRight } from "lucide-react";

import BreadcrumbsComponent from "../../Components/BreadcrumbsComponent";
import AvatarComponent from "../../Components/AvatarComponent";
import SheetComponent from "../../Components/SheetComponent";
import ButtonComponent from "../../Components/ButtonComponent";

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
  return (
    <FlexContainer
      direction="row"
      alignItems="start"
      justifyContent="space-between"
    >
      <Box>
        <FlexContainer direction="row" alignItems="center">
          {data ? (
            <AvatarComponent alt={data.name} src={data.src} />
          ) : (
            <AvatarComponent />
          )}
          <BreadcrumbsComponent
            name={data.name}
            pageTitle={pageDetails.title}
            pagePath={pageDetails?.pagePath}
            subPath={pageDetails?.subPath}
            subTitle={pageDetails?.subTitle}
          />
        </FlexContainer>

        <Stack mt={3}>
          <Typography fontSize={30} fontWeight={600}>
            {pageDetails?.pageTitle
              ? pageDetails?.pageTitle
              : pageDetails.title}
          </Typography>
          <Typography level="body-sm">{pageDetails.description}</Typography>
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
              {data ? (
                <AvatarComponent alt={data.name} src={data.src} />
              ) : (
                <AvatarComponent />
              )}
            </Box>

            <Stack>
              <Typography level="body-lg" fontWeight={600}>
                {data.name}
              </Typography>
              <Typography level="body-sm">{data.email}</Typography>
            </Stack>

            <Box ml={2}>
              <ChevronRight />
            </Box>
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
