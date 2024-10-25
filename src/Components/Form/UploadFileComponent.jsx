import PropTypes from "prop-types";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Button,
  Box,
  Stack,
  Typography,
} from "@mui/joy";
import { useRef } from "react";
import { BiCloudDownload, BiCloudUpload } from "react-icons/bi";

UploadFileComponent.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  helperText: PropTypes.string,
  setValue: PropTypes.func.isRequired,
  autoFocus: PropTypes.bool,
  fontWeight: PropTypes.number,
};

function UploadFileComponent({
  label,
  placeholder,
  helperText,
  setValue,
  autoFocus,
}) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setValue(file ? file.name : "");
  };

  const handleSelectFile = () => {
    fileInputRef.current.click(); // Trigger file input click
  };

  return (
    <FormControl>
      <FormLabel sx={{ fontSize: 14, fontWeight: 500 }}>{label}</FormLabel>
      <Input
        type="file"
        variant="outlined"
        inputreRef={fileInputRef}
        onChange={handleFileChange}
        sx={{ display: "none" }} // Hide the default file input
        autoFocus={autoFocus}
      />
      <Button
        direction="row"
        color="neutral"
        variant="outlined"
        onClick={handleSelectFile}
        sx={{
          alignItems: "center",
          justifyContent: "space-between",

          borderRadius: 8,
          px: 2,
          py: 1,
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        <Typography level="body-xs" fontWeight={400}>
          {placeholder}
        </Typography>
        <BiCloudUpload fontSize={20} />
      </Button>
      {helperText && (
        <FormHelperText sx={{ fontSize: 11 }}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
}

export default UploadFileComponent;
