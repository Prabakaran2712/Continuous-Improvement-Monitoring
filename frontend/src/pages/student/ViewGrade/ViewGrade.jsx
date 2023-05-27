import { useEffect } from "react";
import Container from "../../../components/Container/Container";
import Title from "../../../components/forms/Title/Title";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import Loading from "../../../components/Loading/Loading";
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
import { Bar, Line } from "react-chartjs-2";
import TabPanel from "../../../components/TabPanel/TabPanel";
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
import { Tab, Tabs, Box, Typography } from "@mui/material";
import Select from "../../../components/Select/Select";
import Styles from "./ViewGrade.module.css";
import Table from "../../../components/Table/Table";
import { set } from "mongoose";
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Grades",
    },
  },
  scales: {
    x: {
      barPercentage: 0.4,
    },
    y: {
      min: 0,
      max: 10,
    },
  },
};

const setTableData = (grades) => {
  return grades.map((grade) => {
    return [grade.subject_name, grade.subject_code, grade.grade, () => {}];
  });
};

const ViewGrade = () => {
  const auth = useAuthContext();
  const [grades, setGrades] = useState([]);
  const [filteredGrades, setFilteredGrades] = useState([]);
  const [semester, setSemester] = useState("all");
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState({});
  const [tabs, setTabs] = useState(0);
  const [gtabs, setGtabs] = useState(0);
  const [mtabs, setMtabs] = useState(0);
  const [loading, setLoading] = useState(true);
  const [gradeData, setGradeData] = useState([]);
  const [lineData, setLineData] = useState([]);

  const setLineChartData = (grades) => {
    //calculate gpa for each semester
    var gpa = [];
    for (let i = 1; i <= 8; i++) {
      console.log("List");
      console.log(grades);
      gpa.push(calculateGPA(grades.filter((x) => x.semester == i)));
    }
    setLineData({
      labels: [
        "Semester 1",
        "Semester 2",
        "Semester 3",
        "Semester 4",
        "Semester 5",
        "Semester 6",
        "Semester 7",
        "Semester 8",
      ],
      datasets: [
        {
          label: "GPA",
          data: gpa,
        },
      ],
    });
    console.log("gpa");
    console.log(gpa);
  };

  const setBarChartData = (grades) => {
    var gradelist = [];
    var lbls = [];
    const grademapper = {
      O: 10,
      "A+": 9,
      A: 8,
      "B+": 7,
      B: 6,
      RA: 0,

      NA: 0,
    };
    grades.forEach((x) => {
      gradelist.push(grademapper[x.grade]);
      lbls.push(x.subject_name);
    });

    setData({
      labels: lbls,
      datasets: [
        {
          label: "Grades",
          data: gradelist,

          backgroundColor: "rgba(53, 162, 235, 0.5)",
          borderColor: "rgba(53, 162, 235, 1)",
        },
      ],
    });
  };

  const calculateGPA = (grades) => {
    let totalCredits = 0;
    let totalPoints = 0;
    //filter out grades that are not published
    console.log("grade");
    console.log(grades);
    grades = grades.filter((x) => x.publised);
    //grade points for grades
    console.log(grades);
    const gradePoints = { O: 10, "A+": 9, A: 8, "B+": 7, B: 6 };
    grades.forEach((grade) => {
      if (grade.grade == "RA") return;
      if (grade.grade == "NA") return;
      totalCredits += grade.credits;
      totalPoints += grade.credits * gradePoints[grade.grade];
    });
    console.log(totalPoints);
    console.log(totalCredits);
    return totalPoints / totalCredits;
  };
  useEffect(() => {
    var uniqueSubjects = [];
    axios
      .get(`/api/teaches/student/${auth.user._id}`)
      .then((res) => {
        res.data.forEach((x) => {
          uniqueSubjects.push({
            name: x.course.name,
            subject_code: x.course.subject_code,
            _id: x._id,
            semester: x.semester,
            credits: x.course.credits,
            isPublished: x.isPublished,
          });
        });
        axios
          .get(`/api/grades/student/${auth.user._id}`)
          .then((res) => {
            //filter out grades that are not published
            res.data = res.data.filter((x) => x.teaches.isPublished);
            console.log(res.data);
            setGradeData(res.data);
            var grades = [];
            uniqueSubjects.forEach((subject) => {
              var obj = {
                _id: subject._id,
                subject_name: subject.name,
                subject_code: subject.subject_code,
                semester: subject.semester,
                credits: subject.credits,
                publised: subject.isPublished,
                grade: "NA",
              };
              res.data.forEach((grade) => {
                if (grade.teaches._id == subject._id) {
                  obj.grade = grade.grade;
                }
              });
              grades.push(obj);
            });
            console.log(grades);
            setGrades(grades);
            setFilteredGrades(grades);
            setBarChartData(grades);
            setLineChartData(grades);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loading />;
  return (
    <div>
      <div className="title">
        <Title title="Grades" />
      </div>
      <div className="content  ">
        <div className="filter">
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
              if (semester == "all") {
                setFilteredGrades(grades);
                setSemester(e.target.value);
                setBarChartData(grades);
                setLineChartData(grades);
              } else {
                setSemester(e.target.value);
                setFilteredGrades(
                  grades.filter((grade) => grade.semester == e.target.value)
                );

                setBarChartData(
                  grades.filter((grade) => grade.semester == e.target.value)
                );
                setLineChartData(
                  grades.filter((grade) => grade.semester == e.target.value)
                );
              }
            }}
            value={semester}
          />

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
              label={<span style={{ color: "black" }}>Graph</span>}
              index={1}
            />
          </Tabs>
        </div>

        <TabPanel value={tabs} index={0}>
          <Tabs
            value={mtabs}
            onChange={(e, newValue) => setMtabs(newValue)}
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
              label={<span style={{ color: "black" }}>Backlogs</span>}
              index={1}
            />
          </Tabs>
          <TabPanel value={mtabs} index={0}>
            <div className="gpa-title d-flex flex-direction-row justify-content-end mx-3 fs-5 ">
              GPA :{" "}
              <span className="gpa-value ">
                {calculateGPA(filteredGrades).toString().slice(0, 4)}
              </span>
            </div>
            <div className="markTable ">
              <Table
                thead={["#", "Subject Name", "Subject Code", "Grade"]}
                tbody={setTableData(filteredGrades)}
              />
            </div>
          </TabPanel>
          <TabPanel value={mtabs} index={1}>
            <div className="markTable">
              <Table
                thead={["#", "Subject Name", "Subject Code", "Grade"]}
                tbody={setTableData(
                  filteredGrades.filter((grade) => grade.grade == "RA")
                )}
              />
            </div>
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
            className={`${Styles.tabs}  `}
          >
            <Tab
              label={
                <span style={{ color: "black" }} className={Styles.tab}>
                  Bar
                </span>
              }
              index={0}
            />
            <Tab
              label={<span style={{ color: "black" }}>Line</span>}
              index={1}
            />
          </Tabs>
          <TabPanel value={gtabs} index={0}>
            <div className={Styles.barChart}>
              <div className="barchart mx-auto ">
                <Bar data={data} width={600} height={500} options={options} />
              </div>
            </div>
          </TabPanel>
          <TabPanel value={gtabs} index={1}>
            <div className={Styles.lineChart}>
              <div className="barchart mx-auto ">
                <Line
                  data={lineData}
                  width={600}
                  height={500}
                  options={options}
                />
              </div>
            </div>
          </TabPanel>
        </TabPanel>
      </div>
    </div>
  );
};

export default ViewGrade;
