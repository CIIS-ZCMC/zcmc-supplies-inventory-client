import PropTypes from "prop-types";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  LinearProgress,
  Modal,
  ModalDialog,
  Stack,
  Typography,
  useTheme,
} from "@mui/joy";
import { BiX } from "react-icons/bi";
import ButtonComponent from "../ButtonComponent";

ModalComponent.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  content: PropTypes.node,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleClose: PropTypes.func.isRequired,
  rightButtonLabel: PropTypes.string,
  rightButtonAction: PropTypes.func,
  leftButtonLabel: PropTypes.string,
  leftButtonAction: PropTypes.func,
};

function ModalComponent({
  isOpen,
  content,
  title,
  description,
  minWidth,
  maxWidth,
  handleClose,
  rightButtonLabel,
  rightButtonAction,
  leftButtonLabel,
  leftButtonAction,
  withProgress,
  progressValue,
}) {
  const handleCloseModal = (event, reason) => {
    // Prevent closing the modal when backdrop is clicked
    if (reason === "backdropClick") {
      event.stopPropagation();
      return;
    }
    handleClose();
  };

  const theme = useTheme();
  const custom = theme.palette.custom;

  return (
    <Modal
      keepMounted
      open={isOpen}
      onClose={handleCloseModal} // Use the updated handler
    >
      <ModalDialog
        minWidth={minWidth}
        maxWidth={maxWidth}
        sx={{ width: "auto", p: 4, borderRadius: 20 }}
      >
        {/* TITLE */}
        <DialogTitle
          sx={{ alignItems: "start", justifyContent: "space-between" }}
        >
          <Stack gap={0.4}>
            <Typography level="title-lg" fontWeight={600}>
              {title}
            </Typography>
            <Typography fontWeight={400} level="body-xs">
              {description}
            </Typography>
          </Stack>

          <IconButton variant="plain" onClick={handleClose}>
            <BiX fontSize={27} />
          </IconButton>
        </DialogTitle>

        {withProgress && (
          <LinearProgress
            determinate
            value={progressValue}
            sx={{ color: custom.buttonBg }}
          />
        )}
        <Divider sx={{ mx: 0.2 }} />

        {/* CONTENT */}
        <DialogContent sx={{ p: 1 }}>{content}</DialogContent>

        {/* FOOTER */}
        {/* <Divider sx={{ mx: 0.2 }} /> */}

        <DialogActions>
          <ButtonComponent
            label={rightButtonLabel}
            fullWidth
            onClick={rightButtonAction}
          />
          <ButtonComponent
            variant="outlined"
            color="danger"
            label={leftButtonLabel}
            fullWidth
            onClick={leftButtonAction}
          />
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
}

export default ModalComponent;
