import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

export default function DashboardTab() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="All Items" value="1" />
            <Tab label="Down" value="2" />
            <Tab label="Fatal" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">All Items</TabPanel>
        <TabPanel value="2">Down</TabPanel>
        <TabPanel value="3">Fatal</TabPanel>
      </TabContext>
    </Box>
  );
}
