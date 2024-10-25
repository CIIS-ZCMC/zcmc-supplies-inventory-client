import PropTypes from "prop-types";
import { Box, Stack, Typography } from "@mui/joy";
import BreadcrumbsComponent from "./BreadcrumbsComponent";

PageTitle.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  subPage: PropTypes.string,
  subPath: PropTypes.string,
};

function PageTitle({ title, description, subPage, subPath }) {
  return (
    <Stack gap={2.5}>
      <BreadcrumbsComponent
        homePath={"/dashboard"}
        currentPage={title}
        subPage={subPage}
        subPath={subPath}
      />

      <Box>
        <Typography fontSize={30} fontWeight={600}>
          {title}
        </Typography>
        <Typography level="body-sm">{description}</Typography>
      </Box>
    </Stack>
  );
}

export default PageTitle;
