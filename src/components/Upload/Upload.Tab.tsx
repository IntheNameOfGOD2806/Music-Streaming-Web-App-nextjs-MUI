"use client";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Step1 from "./steps/step1";
import Step2 from "./steps/step2";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function BasicTabs(props:any) {
  const [value, setValue] = React.useState(0);
  const [nextStep, setNextStep] = React.useState<boolean>(true);
  const [trackUploadInfo, setTrackUploadInfo] = React.useState({
    trackName: "",
    percentage: 0,
    //
    uploadedTrackName: "",
  });
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        border: 1,
        borderColor: "divider",
        marginTop: "10px",
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label=" TRACKS" {...a11yProps(0)} disabled={!nextStep} />
          <Tab
            label="  BASIC INFORMATION"
            {...a11yProps(1)}
            disabled={nextStep}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Step1
          setNextStep={setNextStep}
          setValue={setValue}
          value={value}
          trackUploadInfo={trackUploadInfo}
          setTrackUploadInfo={setTrackUploadInfo}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Step2
          trackUploadInfo={trackUploadInfo}
          setTrackUploadInfo={setTrackUploadInfo}
        />
      </CustomTabPanel>
    </Box>
  );
}
const UploadTab = () => {
  return (
    <>
      <BasicTabs />
    </>
  );
};
export default UploadTab;
