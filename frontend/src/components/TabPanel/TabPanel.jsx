import { Box } from "@mui/material";
const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      className="tab-panel"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }} className={"overflow-scroll"}>
          {children}
        </Box>
      )}
    </div>
  );
};
export default TabPanel;
