import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "../../../components/Container/Container";
import Title from "../../../components/forms/Title/Title";
import { useParams } from "react-router-dom";
import Styles from "./ViewStudentAttendance.module.css";
import { useAuthContext } from "../../../hooks/useAuthContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip as ChartTooltip,
  Title as ChartTitle,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Select from "../../../components/Select/Select";
import Loading from "../../../components/Loading/Loading";
import Table from "../../../components/Table/Table";
import TabPanel from "../../../components/TabPanel/TabPanel";
import { Tab, Tabs, Box, Typography } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ChartTitle,
  ChartTooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Marks",
    },
  },
  scales: {
    y: {
      min: 0,
      max: 100,
    },
  },
};

//subject names as labels

const ViewStudentAttendance = () => {
  const auth = useAuthContext();
  const id = auth.user._id;
  const [student, setStudent] = useState({});
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState({});

  const [AttendanceData, setAttendanceData] = useState([]);
  const [AttendanceChartData, setAttendanceChartData] = useState([]);
  const [tabs, setTabs] = useState(0);
  const [subtab, setSubTab] = useState(0);

  const navigate = useNavigate();

  const setTableData = (data) => {
    var tableData = [];

    data.forEach((x) => {
      tableData.push([
        x.subject_name,
        x.subject_code,

        parseFloat(x.percentage).toFixed(2),
        () => {
          navigate(`/student/attendance/${x.teaches}`);
        },
      ]);
    });
    return tableData;
  };

  const setChartData = (data) => {
    var attendanceLabels = [],
      attendanceData = [];
    data.forEach((x) => {
      attendanceLabels.push(x.subject_name);
      attendanceData.push(x.percentage);
    });

    setAttendanceChartData({
      labels: attendanceLabels,
      datasets: [
        {
          label: "Attendance",

          data: attendanceData,
          //if attendance is less than 75% then color is red else green
          backgroundColor: attendanceData.map((x) =>
            x < 75 ? "rgba(255, 99, 132, 0.5)" : "rgba(53, 162, 235, 0.5)"
          ),
        },
      ],
    });
  };

  useEffect(() => {
    axios
      .get(`/api/students/${id}`)
      .then((res) => {
        setStudent(res.data);
        var uniqueSubjects = [];
        //get teaches of student
        axios
          .get(`/api/teaches/student/${id}`)
          .then((res) => {
            res.data.forEach((x) => {
              uniqueSubjects.push({
                name: x.course.name,
                subject_code: x.course.subject_code,
                _id: x._id,
                semester: x.semester,
                teaches: x._id,
              });
            });
            console.log("subjects");
            console.log(uniqueSubjects);
            axios
              .get(`/api/attendances/student/${id}/all/courses`)
              .then((res) => {
                var attendance = [];

                uniqueSubjects.forEach((x) => {
                  var obj = {
                    subject_name: x.name,
                    subject_code: x.subject_code,
                    percentage: "NA",
                    teaches: x.teaches,
                    semester: x.semester,
                  };
                  console.log("obj");
                  console.log(obj);
                  console.log("x");
                  console.log(res.data);
                  res.data.forEach((y) => {
                    if (y.teaches._id == x._id) {
                      obj.percentage = y.percentage;
                    }
                  });
                  attendance.push(obj);
                });
                console.log("attendance");
                console.log(attendance);
                setAttendanceData(attendance);
                setChartData(attendance);
                setData(setTableData(attendance));
                setLoading(false);
              })
              .catch((err) => {
                setLoading(false);
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div className="mx-lg-2">
        <div className="title ">
          <Title title="Attendance" />
        </div>

        <div className="analytics-body ">
          <div className="optionPane my-lg-2 ">
            <Select
              options={[
                "All",
                "Semester 1",
                "Semester 2",
                "Semester 3",
                "Semester 4",
                "Semester 5",
                "Semester 6",
                "Semester 7",
                "Semester 8",
              ]}
              values={["All", "1", "2", "3", "4", "5", "6", "7", "8"]}
              onChange={(e) => {
                var semester = e.target.value;
                if (semester === "All") {
                  setData(setTableData(AttendanceData));
                  setChartData(AttendanceData);
                } else {
                  const filteredAttendanceData = AttendanceData.filter(
                    (x) => x.semester == semester
                  );
                  console.log(semester);
                  console.log(filteredAttendanceData);
                  setData(setTableData(filteredAttendanceData));
                  setChartData(filteredAttendanceData);
                }
              }}
            />
          </div>
          <Tabs
            value={tabs}
            onChange={(e, newValue) => setTabs(newValue)}
            TabIndicatorProps={{
              style: {
                backgroundColor: "#000000",
                color: "#000000",
              },
            }}
            className={`${Styles.tabs}  `}
          >
            <Tab
              label={
                <span style={{ color: "black" }} className={Styles.tab}>
                  Table
                </span>
              }
              index={0}
            />
            <Tab
              label={<span style={{ color: "black" }}>Graphs</span>}
              index={1}
            />
          </Tabs>
          <div className="dataSection row align-items-center">
            <TabPanel value={tabs} index={0}>
              <Tabs
                value={subtab}
                onChange={(e, newValue) => setSubTab(newValue)}
                TabIndicatorProps={{
                  style: {
                    backgroundColor: "#000000",
                    color: "#000000",
                  },
                }}
                className={`${Styles.tabs}  `}
              >
                <Tab
                  label={
                    <span style={{ color: "black" }} className={Styles.tab}>
                      All
                    </span>
                  }
                  index={0}
                />
                <Tab
                  label={<span style={{ color: "black" }}>Shortage</span>}
                  index={1}
                />
              </Tabs>
              <TabPanel value={subtab} index={0}>
                <div className="AttendanceTable ">
                  <Table
                    thead={["#", "Subject", "Subject Code", "Attendance %"]}
                    tbody={data}
                  />
                </div>
              </TabPanel>
              <TabPanel value={subtab} index={1}>
                <div className="AttendanceTable ">
                  <Table
                    thead={["#", "Subject", "Subject Code", "Attendance %"]}
                    tbody={data.filter((x) => x[2] < 75)}
                  />
                </div>
              </TabPanel>
            </TabPanel>
            <TabPanel value={tabs} index={1}>
              <div className={Styles.graph}>
                <Bar
                  data={AttendanceChartData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: "top",
                      },
                      title: {
                        display: true,
                        text: "Attendance",
                      },
                    },
                    scales: {
                      y: {
                        min: 0,
                        max: 100,
                      },
                    },
                  }}
                />
              </div>
            </TabPanel>
          </div>
        </div>
      </div>
    );
  }
};

export default ViewStudentAttendance;
