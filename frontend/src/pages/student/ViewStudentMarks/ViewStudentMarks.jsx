import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "../../../components/Container/Container";
import Title from "../../../components/forms/Title/Title";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";
import Styles from "./ViewStudentMarks.module.css";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Tooltip as ChartTooltip,
  Title as ChartTitle,
  Legend,
  PointElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Select from "../../../components/Select/Select";
import Loading from "../../../components/Loading/Loading";
import { Tab, Tabs, Box, Typography } from "@mui/material";
import Header from "../../../components/Page/Header/Header";
import Table from "../../../components/Table/Table";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ChartTitle,
  ChartTooltip,
  Legend
);

export const options = {
  responsive: true,
  scales: {
    y: {
      min: 0,
      max: 100,
    },
  },
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Marks",
    },
  },
};
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

const setTableData = (data) => {
  return data.map((mark) => {
    return [
      mark.subject_name,
      mark.subject_code,
      mark.assessment1,
      mark.assessment2,
      mark.end_semester,
      () => {},
    ];
  });
};

const ViewStudentMarks = () => {
  const auth = useAuthContext();
  const [student, setStudent] = useState({});
  const [loading, setLoading] = useState(true);
  const [markData, setMarkData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState({});
  const [filteredMarkData, setFilteredMarkData] = useState([]);
  const [tabs, setTabs] = useState(0);
  const [lineData, setLineData] = useState([]);
  const [gtab, setGtab] = useState(0);

  const navigate = useNavigate();
  const setChartData = (marks) => {
    setLabels(marks.map((x) => x.subject_name));
    var ass1 = [],
      ass2 = [],
      es = [],
      lbls = [];
    marks.forEach((x) => {
      ass1.push(x.assessment1 ? x.assessment1 * 2 : 0);
      ass2.push(x.assessment2 ? x.assessment2 * 2 : 0);
      es.push(x.end_semester ? x.end_semester : 0);
      lbls.push(x.subject_name);
    });
    console.log(ass1);
    console.log(ass2);
    console.log(es);
    console.log(lbls);
    setData({
      labels: lbls,
      datasets: [
        {
          label: "Assessment-1",
          //get ramdom number between 0 and 1000 for each label using Math.random()
          data: ass1,
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          borderColor: "rgba(255, 99, 132, 1)",
        },
        {
          label: "Assessment-2",
          data: ass2,

          backgroundColor: "rgba(53, 162, 235, 0.5)",
          borderColor: "rgba(53, 162, 235, 1)",
        },
        {
          label: "End Semester",
          data: es,

          backgroundColor: "rgba(255, 192, 0, 0.5)",
          borderColor: "rgba(255, 192, 0, 1)",
        },
      ],
    });
  };
  const setLineChartData = (marks) => {
    let labels = marks.map((x) => x.subject_name);
    var markdata = [];

    marks.forEach((x) => {
      var temp = [];
      temp.push(x.assessment1 ? x.assessment1 * 2 : 0);
      temp.push(x.assessment2 ? x.assessment2 * 2 : 0);
      temp.push(x.end_semester ? x.end_semester : 0);
      markdata.push(temp);
    });
    var datasets = [];
    for (let i = 0; i < markdata.length; i++) {
      let col = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255
      )}, ${Math.floor(Math.random() * 255)},0.5)`;
      var temp = {
        label: labels[i],
        data: markdata[i],
        backgroundColor: col,
        borderColor: col,
      };
      datasets.push(temp);
    }
    console.log(markdata);
    setLineData({
      labels: ["Assessment-1", "Assessment-2", "End Semester"],
      datasets: datasets,
    });
  };

  useEffect(() => {
    axios
      .get(`/api/students/${auth.user._id}`)
      .then((res) => {
        setStudent(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
    //get teaches with the student
    var uniqueSubjects = [];
    axios.get(`/api/teaches/student/${auth.user._id}`).then((res) => {
      res.data.forEach((x) => {
        uniqueSubjects.push({
          name: x.course.name,
          subject_code: x.course.subject_code,
          _id: x._id,
          semester: x.semester,
        });
      });
      console.log(uniqueSubjects);
    });

    //get student marks from student id
    axios
      .get(`/api/marks/student/${auth.user._id}`)
      .then((res) => {
        console.log(res.data);
        //for each subject get marks of each exam type if not present use zero
        //filter data where exam have publised true
        res.data = res.data.filter((x) => x.exam.published);

        var marks = [];
        uniqueSubjects.forEach((x) => {
          var obj = {
            _id: x._id,
            subject_name: x.name,
            subject_code: x.subject_code,
            assessment1: "NaN",
            assessment2: "NaN",
            end_semester: "NaN",
            semester: x.semester,
          };
          res.data.forEach((y) => {
            if (y.exam.teaches.course.name == x.name) {
              if (y.exam.exam_type == "Assessment-1") {
                obj.assessment1 = y.mark;
              } else if (y.exam.exam_type == "Assessment-2") {
                obj.assessment2 = y.mark;
              } else if (y.exam.exam_type == "End-Semester") {
                obj.end_semester = y.mark;
              }
            }
          });
          marks.push(obj);
        });
        console.log("Marks");
        console.log(marks);
        setMarkData(marks);
        setTableData(marks);
        setFilteredMarkData(marks);
        setLineChartData(marks);
        setFilteredData(res.data);
        setChartData(marks);
        setLoading(false);
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
      <Container>
        <Header title="Marks" />

        <div className="analytics">
          <div className="analytics-header mx-auto w-75">
            <Select
              options={[
                "All",
                "Semester-1",
                "Semester-2",
                "Semester-3",
                "Semester-4",
                "Semester-5",
                "Semester-6",
                "Semester-7",

                "Semester-8",
              ]}
              values={["all", "1", "2", "3", "4", "5", "6", "7", "8"]}
              onChange={(e) => {
                const semester = e.target.value;
                if (semester === "all") {
                  setFilteredMarkData(markData);
                  setChartData(markData);
                  setLineChartData(markData);
                } else {
                  const filteredMarkData = markData.filter(
                    (x) => x.semester == semester
                  );

                  setFilteredMarkData(filteredMarkData);
                  setChartData(filteredMarkData);
                  setLineChartData(filteredMarkData);
                }
              }}
            />
          </div>
          <div className="analytics-body  my-2 mx-5">
            <Tabs
              value={tabs}
              onChange={(e, newValue) => setTabs(newValue)}
              TabIndicatorProps={{
                style: {
                  backgroundColor: "#000000",
                  color: "#000000",
                },
              }}
              className={`${Styles.tabs}  mx-lg-5 mx-sm-1 mt-lg-3 mt-sm-1`}
            >
              <Tab
                label={<span style={{ color: "black" }}>Table</span>}
                index={0}
              />
              <Tab
                label={<span style={{ color: "black" }}>Graphs</span>}
                index={1}
              />
            </Tabs>

            <div className={"marks "}>
              <TabPanel value={tabs} index={0}>
                <Table
                  thead={[
                    "#",
                    "Subject",
                    "Subject Code",
                    "Assessment-1",
                    "Assessment-2",
                    "End Semester",
                  ]}
                  tbody={setTableData(filteredMarkData)}
                />
              </TabPanel>

              <TabPanel value={tabs} index={1}>
                <Tabs
                  value={gtab}
                  onChange={(e, newValue) => setGtab(newValue)}
                  TabIndicatorProps={{
                    style: {
                      backgroundColor: "#000000",
                      color: "#000000",
                    },
                  }}
                  className={`${Styles.tabs}  mx-lg-5 mx-sm-1 mt-lg-3 mt-sm-1`}
                >
                  <Tab
                    label={<span style={{ color: "black" }}>Bar </span>}
                    index={0}
                  />
                  <Tab
                    label={<span style={{ color: "black" }}>Line</span>}
                    index={1}
                  />
                </Tabs>

                <div className="graph d-flex flex-row justify-content-around">
                  <TabPanel value={gtab} index={0}>
                    <div className="barGraph">
                      <Bar
                        options={options}
                        data={data}
                        width={600}
                        height={500}
                      />
                    </div>
                  </TabPanel>
                  <TabPanel value={gtab} index={1}>
                    <div className="lineGraph">
                      <Line
                        options={options}
                        data={lineData}
                        width={600}
                        height={500}
                      />
                    </div>
                  </TabPanel>
                </div>
              </TabPanel>
            </div>
          </div>
        </div>
      </Container>
    );
  }
};

export default ViewStudentMarks;
