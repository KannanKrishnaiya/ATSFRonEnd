import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import DepositClearance from "./CurrentCDMLevel";
import CDMClearance from "./CDMClearance";
import CurrentCDMLevel from "./CurrentCDMLevel";

export default function DepositClearanceRpt() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="CsshReplenishBody">
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="Cash Replenish">
              <Tab label="All Machines CDM Level" value="1" />
              <Tab label="CDM Clearance" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <CurrentCDMLevel />
          </TabPanel>
          <TabPanel value="2">
            <CDMClearance />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}
