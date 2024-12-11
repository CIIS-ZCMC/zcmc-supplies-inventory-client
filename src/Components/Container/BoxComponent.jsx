import PropTypes from "prop-types";
import { Box } from "@mui/joy";

BoxComponent.propTypes = {
  children: PropTypes.element,
  display: PropTypes.string,
  justifyContent: PropTypes.string,
  alignItems: PropTypes.string,
};

function BoxComponent({ children, display, justifyContent, alignItems }) {
  return (
    <Box
      sx={{
        width: "100%",
        border: 1,
        borderColor: "neutral.200",
        bgcolor: "white",
        borderRadius: 10,
        p: 1,
        display: display,
        justifyContent: justifyContent,
        alignItems: alignItems,
      }}
    >
      {children}
    </Box>
  );
}

export default BoxComponent;
