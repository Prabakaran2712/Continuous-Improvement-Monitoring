import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "../../../components/Container/Container";
import Title from "../../../components/forms/Title/Title";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";
import styles from "./ViewStudentMarks.module.css";
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

//subject names as labels

const ViewStudentMarks = () => {
  const auth = useAuthContext();
  const [student, setStudent] = useState({});
  const [loading, setLoading] = useState(true);
  const [markData, setMarkData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState({});
  const [filteredMarkData, setFilteredMarkData] = useState([]);

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

          backgroundColor: "rgba(53, 162, 235, 0.5)",
          borderColor: "rgba(53, 162, 235, 1)",
        },
      ],
    });

    console.log(res.data);
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
    //get student marks from student id
    axios
      .get(`/api/marks/student/${auth.user._id}`)
      .then((res) => {
        console.log(res.data);

        //get unique subjects
        var uniqueSubjects = [];
        res.data.forEach((x) => {
          if (!uniqueSubjects.includes(x.exam.teaches.course.name)) {
            uniqueSubjects.push({
              name: x.exam.teaches.course.name,
              _id: x.exam.teaches._id,
              semester: x.exam.teaches.semester,
            });
          }
        });
        console.log("subjects");
        console.log(uniqueSubjects);

        //for each subject get marks of each exam type if not present use zero
        var marks = [];
        uniqueSubjects.forEach((x) => {
          var obj = {
            _id: x._id,
            subject_name: x.name,
            subject_code: "",
            assessment1: 0,
            assessment2: 0,
            end_semester: 0,
            semester: x.semester,
          };
          res.data.forEach((y) => {
            if (y.exam.teaches.course.name == x.name) {
              if (y.exam.exam_type == "Assessment-1") {
                obj.assessment1 = y.mark;
                obj.subject_code = y.exam.teaches.course.subject_code;
              } else if (y.exam.exam_type == "Assessment-2") {
                obj.assessment2 = y.mark;
                obj.subject_code = y.exam.teaches.course.subject_code;
              } else if (y.exam.exam_type == "End-Semester") {
                obj.end_semester = y.mark;
                obj.subject_code = y.exam.teaches.course.subject_code;
              }
            }
          });
          marks.push(obj);
        });
        console.log(marks);
        setMarkData(marks);
        setFilteredMarkData(marks);

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
        <Title title="Student Details" />

        <div className="analytics">
          <div className="analytics-header">
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
                } else {
                  const filteredMarkData = markData.filter(
                    (x) => x.semester == semester
                  );

                  setFilteredMarkData(filteredMarkData);
                  setChartData(filteredMarkData);
                }
              }}
            />
          </div>
          <div className="analytics-body w-75 my-5 mx-auto">
            <div className={"marks "}>
              <table className="table table-striped">
                <thead
                  className="
                  table-dark
                "
                >
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Subject</th>
                    <th scope="col">Subject Code</th>
                    <th scope="col">Assessment 1</th>
                    <th scope="col">Assessment 2</th>
                    <th scope="col">End Semester</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMarkData.map((x, i) => {
                    return (
                      <tr
                        key={Math.random()}
                        onClick={() => {
                          navigate(
                            `/teacher/subject/${x._id}/student/${auth.user._id}`
                          );
                        }}
                      >
                        <th scope="row">{i + 1}</th>
                        <td>{x.subject_name}</td>
                        <td>{x.subject_code}</td>
                        <td>{x.assessment1}</td>
                        <td>{x.assessment2}</td>
                        <td>{x.end_semester}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className="graph d-flex flex-row justify-content-around">
                <div className="barGraph">
                  <Bar options={options} data={data} width={600} height={500} />
                </div>
                <div className="lineGraph">
                  <Line
                    options={options}
                    data={data}
                    width={600}
                    height={500}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    );
  }
};

export default ViewStudentMarks;
