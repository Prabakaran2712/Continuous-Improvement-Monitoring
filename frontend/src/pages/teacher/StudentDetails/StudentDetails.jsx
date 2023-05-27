import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "../../../components/Container/Container";
import Title from "../../../components/forms/Title/Title";
import { useParams } from "react-router-dom";
import Styles from "./StudentDetails.module.css";
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
import Loading from "../../../components/Loading/Loading";
import TabPanel from "../../../components/TabPanel/TabPanel";
import { Tab, Tabs } from "@mui/material";
import Table from "../../../components/Table/Table";
import Select from "../../../components/Select/Select";

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
};

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

const StudentDetails = () => {
  const { id } = useParams();
  const [student, setStudent] = useState({});
  const [loading, setLoading] = useState(true);
  const [markData, setMarkData] = useState([]);
  const [filteredMarkData, setFilteredMarkData] = useState([]);
  const [data, setData] = useState({});
  const [page, setPage] = useState("marks");
  const [AttendanceData, setAttendanceData] = useState([]);
  const [AttendanceChartData, setAttendanceChartData] = useState([]);
  const [tabs, setTabs] = useState(0);
  const [subTabs, setSubTabs] = useState(0);
  const [lineData, setLineData] = useState([]);
  const [labels, setLabels] = useState([]);

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
  const switchPage = (page) => {
    setPage(page);
  };
  useEffect(() => {
    axios
      .get(`/api/students/${id}`)
      .then((res) => {
        setStudent(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
    //get student marks from student id
    var uniqueSubjects = [];
    axios.get(`/api/teaches/student/${id}`).then((res) => {
      res.data.forEach((x) => {
        console.log(x);
        uniqueSubjects.push({
          name: x.course.name,
          subject_code: x.course.subject_code,
          _id: x._id,
          semester: x.semester,
        });
      });
      console.log("subjects");
      console.log(uniqueSubjects);
      //get student marks from student id
      axios.get(`/api/marks/student/${id}`).then((res) => {
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
        setChartData(marks);
      });
      //get attendance data
      axios
        .get(`/api/attendances/student/${id}/all/courses`)
        .then((res) => {
          console.log("attendance");
          console.log(res.data);

          var attendance = [];
          res.data.forEach((x) => {
            var obj = {
              subject_name: x.course.name,
              subject_code: x.course.subject_code,
              percentage: x.percentage,
            };
            attendance.push(obj);
          });

          setAttendanceData(attendance);
          var attendanceLabels = [],
            attendanceData = [];
          attendance.forEach((x) => {
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
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    });
  }, []);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div className="mx-2">
        <div className="my-2">
          <Title title="Student Details" />
        </div>
        <div className={`${Styles.studentDetails}`}>
          <div className="row ">
            <div className="col-lg-6 col-md-12">
              <div className={`${Styles.category}`} key={Math.random()}>
                <p>
                  Name : <span>{student.name}</span>
                </p>
              </div>
              <div className={`${Styles.category}`} key={Math.random()}>
                <p>
                  Roll No : <span>{student.roll_number}</span>
                </p>
              </div>
              <div className={`${Styles.category}`} key={Math.random()}>
                <p>
                  Email : <span>{student.email}</span>
                </p>
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className={`${Styles.category}`} key={Math.random()}>
                <p>
                  Batch :{" "}
                  <span>
                    {student.batch.start_year} - {student.batch.end_year}
                  </span>
                </p>
              </div>
              <div className={`${Styles.category}`} key={Math.random()}>
                <p>
                  Department : <span>{student.department.dept_name}</span>
                </p>
              </div>
              <div className={`${Styles.category}`} key={Math.random()}>
                <p>
                  Phone Number : <span>{student.phone}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="analytics">
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
              label={<span style={{ color: "black" }}>Marks</span>}
              index={0}
            />
            <Tab
              label={<span style={{ color: "black" }}>Attendance</span>}
              index={1}
            />
          </Tabs>

          <div className="analytics-body">
            <div className="analytics-header ">
              <Select
                label="Semester"
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
            <TabPanel value={tabs} index={0}>
              <Tabs
                value={subTabs}
                onChange={(e, newValue) => setSubTabs(newValue)}
                TabIndicatorProps={{
                  style: {
                    backgroundColor: "#000000",
                    color: "#000000",
                  },
                }}
                className={`${Styles.tabs} `}
              >
                <Tab
                  label={<span style={{ color: "black" }}>Table</span>}
                  index={0}
                />
                <Tab
                  label={<span style={{ color: "black" }}>Graph</span>}
                  index={1}
                />
                <Tab
                  label={
                    <span style={{ color: "black" }}>
                      Below Average Subjects
                    </span>
                  }
                  index={2}
                />
              </Tabs>
              <TabPanel value={subTabs} index={0}>
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
              <TabPanel value={subTabs} index={1}>
                <div className="graph">
                  <Bar options={options} data={data} />
                </div>
              </TabPanel>
              <TabPanel value={subTabs} index={2}>
                <div className="graph">Students</div>
              </TabPanel>
            </TabPanel>
            <TabPanel value={tabs} index={1}>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Subject</th>
                    <th scope="col">Subject Code</th>
                    <th scope="col">Attendance %</th>
                  </tr>
                </thead>
                <tbody>
                  {AttendanceData.map((x, i) => {
                    return (
                      <tr key={Math.random()}>
                        <th scope="row">{i + 1}</th>
                        <td>{x.subject_name}</td>
                        <td>{x.subject_code}</td>
                        <td>{x.percentage}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className="graph">
                <Bar options={options} data={AttendanceChartData} />
              </div>
            </TabPanel>
          </div>
        </div>
      </div>
    );
  }
};

export default StudentDetails;
