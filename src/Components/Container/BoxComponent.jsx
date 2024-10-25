import PropTypes from "prop-types";
import { Box } from "@mui/joy";

BoxComponent.propTypes = {
  children: PropTypes.element,
};

function BoxComponent({ children }) {
  return (
    <Box
      sx={{
        width: "100%",
        border: 1,
        borderColor: "neutral.200",
        bgcolor: "white",
        borderRadius: 10,
        p: 1,
      }}
    >
      {children}
    </Box>
  );
}

export default BoxComponent;
