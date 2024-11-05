import PropTypes from "prop-types";
import { Chip, useTheme } from "@mui/joy";

ChipComponent.propTypes = {
  color: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  variant: PropTypes.string,
};

function ChipComponent({ color, label, variant, ...props }) {
  const theme = useTheme();
  const customColor = theme.palette.custom;

  const sxStyles = {
    fontWeight: 500,
    fontSize: 13,

    ...(variant || color
      ? { color: color }
      : {
        backgroundColor: customColor.lighter,
        color: customColor.buttonBg,
        fontWeight: 600,
        border: 1,
        borderColor: customColor.buttonBg,
      }),
  };

  return (
    <Chip color={color} variant={variant} sx={sxStyles} {...props}>
      {label}
    </Chip>
  );
}

export default ChipComponent;
