import PropTypes from "prop-types";
import { Button, useTheme } from "@mui/joy";

ButtonComponent.propTypes = {

  size: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
  variant: PropTypes.string,
  color: PropTypes.string,
  startDecorator: PropTypes.node,
  endDecorator: PropTypes.node,
  fullWidth: PropTypes.bool,
  customOutlined: PropTypes.bool,
};

function ButtonComponent({
  size,
  label,
  onClick,
  variant,
  color,
  startDecorator,
  endDecorator,
  fullWidth,
  customOutlined,
}) {
  const theme = useTheme();

  const sxStyles = {
    fontWeight: 500,
    fontSize: 13,
    py: 1,
    ...(customOutlined
      ? {
        backgroundColor: "white",
        color: theme.palette.custom.buttonBg,
        border: 2,
        borderColor: theme.palette.custom.buttonBg,
        "&:hover": {
          backgroundColor: theme.palette.custom.light,
          color: "white",
        },
      }
      : variant || color
        ? {}
        : {
          backgroundColor: theme.palette.custom.buttonBg,
          "&:hover": { backgroundColor: theme.palette.custom.light },
        }),
  };

  return (
    <Button
      size={size}
      variant={variant}
      color={color}
      fullWidth={fullWidth}
      sx={sxStyles}
      onClick={onClick}
      startDecorator={startDecorator}
      endDecorator={endDecorator}
    >
      {label}
    </Button>
  );
}

export default ButtonComponent;
