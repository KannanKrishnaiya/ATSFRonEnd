import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CassetteReplenishConfig from "./CassetteReplenishConfig";
import CassetteAvgCalc from "./CassetteAvgCalc";
import CassetteCounterDenom from "./CassetteCounterDenom";
import CassetteRepForecast from "./CassetteRepForecast";

export default function CashReplenish() {
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
              <Tab label="Cassette Replenish Config" value="1" />
              <Tab label="Cassette Average Calculation" value="2" />
              <Tab label="Cassete Counter Denomination" value="3" />
              <Tab label="Cash Replenish Forecast" value="4" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <CassetteReplenishConfig />
          </TabPanel>
          <TabPanel value="2">
            <CassetteAvgCalc />
          </TabPanel>
          <TabPanel value="3">
            <CassetteCounterDenom />
          </TabPanel>
          <TabPanel value="4">
            <CassetteRepForecast />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}
