import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import MailIdConfig from "./MailIdConfig";
import MailConfig from "./MailConfig";

export default function MailConfigMain() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="CsshReplenishBody">
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="Mail">
              <Tab label="Mail Configuration" value="1" />
              <Tab label="Mail Id Configuration" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <MailConfig />
          </TabPanel>
          <TabPanel value="2">
            <MailIdConfig />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}
