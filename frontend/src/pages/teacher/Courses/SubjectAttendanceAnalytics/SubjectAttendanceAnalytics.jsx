import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../../../../components/Container/Container";
import Title from "../../../../components/forms/Title/Title";
import SubjectData from "../../../../components/SubjectData/SubjectData";
import PieChart from "../../../../components/Graphs/PieChart";
import Header from "../../../../components/Page/Header/Header";
import { Tab, Tabs, Box, Typography } from "@mui/material";
import Loading from "../../../../components/Loading/Loading";
import Table from "../../../../components/Table/Table";
import MarkHistogram from "../../../../components/Graphs/MarkHistogram";
import BarChart from "../../../../components/Graphs/BarChart";
import Styles from "./SubjectAttendanceAnalytics.module.css";

const SubjectAttendanceAnalytics = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [gtabs, setGtabs] = useState(0);
  const [tabs, setTabs] = useState(0);
  const [ttabs, setTtabs] = useState(0);
  const [attendanceTableData, setAttendanceTableData] = useState([]);
  const [chartData, setChartData] = useState([]);

  const setDataValue = (data) => {
    var temp = [];
    data.forEach((x, indx) => {
      temp[indx] = [
        x.student.name,
        x.student.roll_number,
        x.percentage,
        () => {},
      ];
    });
    return temp;
  };

  //get value from url
  const { id, sid } = useParams();

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  useEffect(() => {
    //get course details with id
    axios.get(`/api/teaches/${id}`).then((res) => {
      setCourseData(res.data);
      //get attendance percentage for course for all students
      axios
        .get(`/api/attendances/teaches/${id}`)
        .then((res) => {
          setAttendanceTableData(setDataValue(res.data));
          var temp = [["Name", "Attendance %"]];

          res.data.forEach((x) => {
            temp.push([x.student.name, x.percentage]);
          });
          setChartData(temp);
        })

        .catch((err) => {
          console.log(err);
        });

      setLoading(false);
    });
  }, []);
  if (loading) return <Loading />;

  return (
    <div className="mx-lg-2">
      <div className="header my-lg-2 mb-lg-3">
        <Title title="Attendance Analytics" />
      </div>
      <SubjectData courseData={courseData} />
      <Tabs
        value={tabs}
        onChange={(e, newValue) => setTabs(newValue)}
        TabIndicatorProps={{
          style: {
            backgroundColor: "#000000",
            color: "#000000",
          },
        }}
      >
        <Tab label={<span style={{ color: "black" }}>Table</span>} index={0} />
        <Tab label={<span style={{ color: "black" }}>Graphs</span>} index={1} />
      </Tabs>
      <TabPanel value={tabs} index={0}>
        <Tabs
          value={ttabs}
          onChange={(e, newValue) => setTtabs(newValue)}
          TabIndicatorProps={{
            style: {
              backgroundColor: "#000000",
              color: "#000000",
            },
          }}
        >
          <Tab label={<span style={{ color: "black" }}>All</span>} index={0} />
          <Tab
            label={<span style={{ color: "black" }}>Shortage</span>}
            index={1}
          />
        </Tabs>
        <TabPanel value={ttabs} index={0}>
          <Table
            thead={["#", "Name", "Roll Number", "Attendance %"]}
            tbody={attendanceTableData}
            tooltip={false}
          />
        </TabPanel>
        <TabPanel value={ttabs} index={1}>
          <Table
            thead={["#", "Name", "Roll Number", "Attendance %"]}
            tbody={attendanceTableData.filter((x) => x[2] < 75)}
            tooltip={false}
          />
        </TabPanel>
      </TabPanel>
      <TabPanel value={tabs} index={1}>
        <Tabs
          value={gtabs}
          onChange={(e, newValue) => setGtabs(newValue)}
          TabIndicatorProps={{
            style: {
              backgroundColor: "#000000",
              color: "#000000",
            },
          }}
        >
          <Tab
            label={<span style={{ color: "black" }}>Histogram</span>}
            index={0}
          />
          <Tab
            label={<span style={{ color: "black" }}>Bar Chart</span>}
            index={1}
          />
        </Tabs>
        <TabPanel value={gtabs} index={0}>
          <div className={`${Styles.graph} `}>
            <MarkHistogram
              data={chartData}
              options={{
                title: "Attendace Distribution",
                hAxis: { title: "Attendance %", minValue: 0, maxValue: 100 },
                vAxis: { title: "No. of Students", minValue: 0, maxValue: 10 },
                legend: "none",
              }}
            />
          </div>
        </TabPanel>
        <TabPanel value={gtabs} index={1}>
          <div className={`${Styles.graph} `}>
            <BarChart
              data={chartData}
              options={{
                title: "Attendace Distribution",
                hAxis: { title: "Attendance %", minValue: 0, maxValue: 100 },
                vAxis: { title: "No. of Students", minValue: 0, maxValue: 10 },
                legend: "none",
              }}
            />
          </div>
        </TabPanel>
      </TabPanel>
    </div>
  );
};

export default SubjectAttendanceAnalytics;
