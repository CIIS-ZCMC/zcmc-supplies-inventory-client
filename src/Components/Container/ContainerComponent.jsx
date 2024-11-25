import { Box, Divider, Sheet, Stack, styled, Typography } from "@mui/joy";
import PropTypes from "prop-types";

ContainerComponent.propTypes = {
  children: PropTypes.node, // Allow multiple children
  title: PropTypes.string,
  description: PropTypes.string,
  scrollable: PropTypes.bool,
  contentMaxHeight: PropTypes.string,
  actions: PropTypes.node,
};

const CustomSheet = styled(Sheet)(({ theme, marginTop }) => ({
  backgroundColor: "white",
  borderRadius: 12,
  padding: theme.spacing(3),
  boxShadow: theme.shadow.md,
  marginTop: marginTop,
}));

function ContainerComponent({
  children,
  title,
  description,
  scrollable,
  contentMaxHeight,
  actions,
  marginTop,
  ...props
}) {
  return (
    <CustomSheet {...props} marginTop={marginTop}>
      {title && (
        <Stack gap={1.5} mb={2}>
          <Stack
            direction={"row"}
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Box>
              <Typography fontWeight={600} level="title-lg">
                {title}
              </Typography>
              <Typography level="body-sm" fontWeight={400}>
                {description}
              </Typography>
            </Box>
            {actions}
          </Stack>
          <Divider />
        </Stack>
      )}

      <Box
        sx={{
          maxHeight: scrollable ? contentMaxHeight : "none", // Adjust based on scrollable prop
          overflowY: scrollable ? "auto" : "visible", // Show overflow only if scrollable
        }}
      >
        {children}
      </Box>
    </CustomSheet>
  );
}

export default ContainerComponent;
