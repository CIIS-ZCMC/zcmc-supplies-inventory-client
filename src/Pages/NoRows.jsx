import { Box, Stack, Typography, useTheme } from "@mui/joy";
import React from "react";
import { MdFindInPage, MdOutlineFindInPage } from "react-icons/md";

function NoRows({ pageTitle, label = "No records found", icon, desc, button }) {
  const theme = useTheme();

  return (
    <div>
      {console.log(pageTitle)}
      <Box
        sx={{
          border: "1px solid #F9B066",
          bgcolor: "#FFFAF5",
          borderRadius: 10,
          textAlign: "center",
          height: "100%", // Adjust as needed
          width: "100%",
          minHeight: "40vh",
          display: "table", // This allows children to align vertically
        }}
      >
        <Stack
          sx={{ display: "table-cell", verticalAlign: "middle", p: 10 }}
          spacing={2}
        >
          {icon ? (
            icon
          ) : (
            <MdOutlineFindInPage
              style={{
                verticalAlign: "middle",
                color: theme.palette.custom.buttonBg,
                fontSize: 30,
                backgroundColor: "#EBF2F9",
                padding: 10,
                borderRadius: 5,
              }}
            />
          )}
          <Typography component="span" level="title-lg" sx={{ ml: 1 }}>
            {label}
          </Typography>
          <Typography textAlign="center" level="body-sm" px={30}>
            {desc
              ? desc
              : `There are no records found that are eligible for processing
                 "${pageTitle}" as of this moment.
                 Some records are not yet ready for reporting. You may need to manage
                 some records to accumulate data for reporting.`}
          </Typography>
          {button && button}
        </Stack>
      </Box>
    </div>
  );
}

export default NoRows;
