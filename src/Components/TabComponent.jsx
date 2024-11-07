import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";

function TabComponent({ tabs }) {
  return (
    <Tabs aria-label="Dynamic tabs" defaultValue={0}>
      <TabList size="sm" sx={{ overflow: "auto" }}>
        {tabs.map((tab, index) => (
          <Tab key={index}>{tab.label}</Tab>
        ))}
      </TabList>
      {tabs.map((tab, index) => (
        <TabPanel key={index} value={index}>
          {tab.content}
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
