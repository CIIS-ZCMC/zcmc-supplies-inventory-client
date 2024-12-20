import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import { Box, Stack, Typography } from "@mui/joy";
import { InfoIcon } from "lucide-react";
import { useTheme } from "@emotion/react";
import TableComponent from "./Table/TableComponent";

function TabComponent({
  tabs,
  onTabChange,
  withTabDesc = false,
  isTable = false,
  selectedTabIndex,
  loading,
  clearFilters,
  otherDetails,
}) {
  const theme = useTheme();
  return (
    <Tabs
      aria-label="Dynamic tabs"
      value={selectedTabIndex} // Control the selected tab using the state
      onChange={(event, newIndex) => {
        onTabChange(newIndex);
        clearFilters();
      }}
    >
      <TabList size="sm" sx={{ overflow: "auto" }}>
        {tabs.map((tab, index) => (
          <Tab key={index}>{tab.label}</Tab>
        ))}
      </TabList>
      {tabs.map((tab, index) => (
        <TabPanel key={index} value={index} sx={{ px: 0 }}>
          {withTabDesc && (
            <Stack direction="row" justifyContent="space-between">
              <Box display="flex" gap={0.5} mb={2} alignItems="flex-start">
                <InfoIcon size="18px" style={{ color: "#1D70BC" }} />
                <Typography
                  sx={{ color: theme.palette.custom.fontLight }}
                  fontSize={13}
                >
                  Items listed on this tab shows
                </Typography>
                <Typography
                  bgcolor={"#FEF2E6"}
                  px={0.5}
                  sx={{ color: "#934A00" }}
                  fontSize={13}
                >
                  {tab.desc}
                </Typography>
              </Box>
              {otherDetails}
            </Stack>
          )}

          {isTable ? (
            <TableComponent
              columns={tab?.columns}
              rows={tab?.rows}
              title={tab?.label}
              filterBtns={tab?.filterBtns}
              loading={loading}
            />
          ) : (
            tab.content
          )}
        </TabPanel>
      ))}
    </Tabs>
  );
}

TabComponent.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
    })
  ).isRequired,
};

export default TabComponent;
