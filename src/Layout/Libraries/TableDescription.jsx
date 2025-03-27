import React from "react";

import { Box } from "@mui/joy";
import ButtonComponent from "../../Components/ButtonComponent";

const TableDescription = ({
  label,
  onClick,
  syncButton = {}, // Default to an empty object
  // Default to false to avoid rendering the sync button initially
}) => {
  const { syncLabel, syncAction, isUpdating = false } = syncButton; // Extract properties safely
  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"end"}
      alignItems={"center"}
      gap={1}
      mt={1}
    >
      <ButtonComponent size="sm" label={label} onClick={onClick} />
      {syncLabel && (
        // disabled={}>
        // {isUpdating ? "Updating..." : "Update Database"}
        <ButtonComponent
          loading={isUpdating}
          variant={"outlined"}
          size="sm"
          label={syncLabel}
          onClick={syncAction}
        />
      )}
    </Box>
  );
};

export default TableDescription;
