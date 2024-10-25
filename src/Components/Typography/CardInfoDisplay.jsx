import PropTypes from "prop-types";
import { Stack, Typography } from "@mui/joy";

CardInfoDisplay.propTypes = {
  label: PropTypes.string.isRequired, // Required label prop
  value: PropTypes.string, // Optional value prop
};

function CardInfoDisplay({ label, value }) {
  return (
    <Stack gap={0.5}>
      <Typography level="body-xs">{label}</Typography>
      <Typography level="body-xs" fontWeight={600} color="black">
        {value}
      </Typography>
    </Stack>
  );
}

export default CardInfoDisplay;
