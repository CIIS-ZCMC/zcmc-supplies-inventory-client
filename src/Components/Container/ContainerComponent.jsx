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

const CustomSheet = styled(Sheet)(({ theme }) => ({
  backgroundColor: "white",
  borderRadius: 12,
  padding: theme.spacing(3),
  boxShadow: theme.shadow.md,
}));

function ContainerComponent({
  children,
  title,
  description,
  scrollable,
  contentMaxHeight,
  actions,
  ...props
}) {
  return (
    <CustomSheet {...props}>
      {title && (
        <Stack gap={1.5} mb={2}>
          <Stack
            direction={"row"}
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Box>
              <Typography fontWeight={600}>{title}</Typography>
              <Typography level="body-xs" fontWeight={400}>
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
