import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "../../../components/Container/Container";
import Title from "../../../components/forms/Title/Title";
import { useParams } from "react-router-dom";
import styles from "./StudentDetails.module.css";
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

//subject names as labels

const StudentDetails = () => {
  const { id } = useParams();
  const [student, setStudent] = useState({});
  const [loading, setLoading] = useState(true);
  const [markData, setMarkData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState({});
  const [page, setPage] = useState("marks");
  const [AttendanceData, setAttendanceData] = useState([]);
  const [AttendanceChartData, setAttendanceChartData] = useState([]);
  const navigate = useNavigate();
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
    axios.get(`/api/marks/student/${id}`).then((res) => {
      console.log(res.data);

      //get unique subjects
      var uniqueSubjects = [];
      res.data.forEach((x) => {
        if (!uniqueSubjects.includes(x.exam.teaches.course.name)) {
          uniqueSubjects.push({
            name: x.exam.teaches.course.name,
            _id: x.exam.teaches._id,
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

      setFilteredData(res.data);
      setLabels(res.data.map((x) => x.exam.teaches.course.name));
      var ass1 = [],
        ass2 = [],
        es = [],
        lbls = [];
      marks.forEach((x) => {
        ass1.push(x.assessment1);
        ass2.push(x.assessment2);
        es.push(x.end_semester);
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
          },
          {
            label: "Assessment-2",
            data: ass2,

            backgroundColor: "rgba(53, 162, 235, 0.5)",
          },
          {
            label: "End Semester",
            data: es,

            backgroundColor: "rgba(53, 162, 235, 0.5)",
          },
        ],
      });

      console.log(res.data);
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
    return <div>Loading...</div>;
  } else {
    return (
      <Container>
        <Title title="Student Details" />
        <div className="body row mx-5 my-5    ">
          <div className="col-6">
            <div className="category">
              <div className="category-name ">Name</div>
              <div className="category-value">{student.name}</div>
            </div>
            <div className="category">
              <div className="category-name ">Roll Number</div>
              <div className="category-value">{student.roll_number}</div>
            </div>
            <div className="category">
              <div className="category-name ">Phone</div>
              <div className="category-value">{student.phone}</div>
            </div>
          </div>
          <div className="col-6">
            <div className="category">
              <div className="category-name ">Department</div>
              <div className="category-value">
                {student.department.dept_name}
              </div>
            </div>
            <div className="category">
              <div className="category-name ">Batch</div>
              <div className="category-value">
                {student.batch.start_year}
                {"-"}
                {student.batch.end_year}
              </div>
            </div>
            <div className="category">
              <div className="category-name ">Email</div>
              <div className="category-value">{student.email}</div>
            </div>
          </div>
        </div>

        <div className="analytics">
          <div className="optionpane d-flex flex-row justify-content-around my-3 bg-light py-2">
            <div className="options" onClick={() => switchPage("marks")}>
              Marks
            </div>
            <div className="options" onClick={() => switchPage("attendance")}>
              Attendance
            </div>
          </div>
          <div className="analytics-body">
            <div
              className={
                "marks " +
                (page == "marks" ? `${styles.show}` : `${styles.hide}`)
              }
            >
              <table className="table table-striped">
                <thead>
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
                  {markData.map((x, i) => {
                    return (
                      <tr
                        key={Math.random()}
                        onClick={() => {
                          navigate(`/teacher/subject/${x._id}/student/${id}`);
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

              <div className="graph">
                <Bar options={options} data={data} />
              </div>
            </div>
            <div
              className={
                "attendance " +
                (page == "attendance" ? `${styles.show}` : `${styles.hide}`)
              }
            >
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
            </div>
          </div>
        </div>
      </Container>
    );
  }
};

export default StudentDetails;
