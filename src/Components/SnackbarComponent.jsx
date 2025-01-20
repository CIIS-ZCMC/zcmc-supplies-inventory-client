import React from "react";

import { Snackbar, Stack, Box, Alert } from "@mui/joy";
import { X } from "lucide-react";

import IconButtonComponent from "./IconButtonComponent";
import {
  MdError,
  MdErrorOutline,
  MdInfoOutline,
  MdTaskAlt,
  MdWarningAmber,
} from "react-icons/md";

const SnackbarComponent = ({
  open,
  onClose,
  anchor,
  color,
  variant,
  message,
}) => {
  const getIcon = () => {
    switch (color) {
      case "success":
        return <MdTaskAlt />;
      case "warning":
        return <MdWarningAmber />;
      case "error":
        return <MdErrorOutline />;
      default:
        return <MdInfoOutline />;
    }
  };


  return (
    <Snackbar
      color={color}
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={anchor} //{ vertical: 'top', horizontal: 'right' }
      size="lg"
      variant={variant}
      sx={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box>{message}</Box>

      <IconButtonComponent icon={X} onClick={onClose} />
    </Snackbar>
  );
};

export default SnackbarComponent;
