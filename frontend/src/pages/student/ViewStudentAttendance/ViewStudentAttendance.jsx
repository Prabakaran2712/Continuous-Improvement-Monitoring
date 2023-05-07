import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "../../../components/Container/Container";
import Title from "../../../components/forms/Title/Title";
import { useParams } from "react-router-dom";

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

const ViewStudentAttendance = () => {
  const auth = useAuthContext();
  const id = auth.user._id;
  const [student, setStudent] = useState({});
  const [loading, setLoading] = useState(true);
  const [filteredAttendanceData, setFilteredAttendanceData] = useState([]);
  const [data, setData] = useState({});
  const [page, setPage] = useState("marks");
  const [AttendanceData, setAttendanceData] = useState([]);
  const [AttendanceChartData, setAttendanceChartData] = useState([]);

  const navigate = useNavigate();

  const setFilteredAttendanceChartData = (data) => {
    var attendance = [];
    data.forEach((x) => {
      var obj = {
        subject_name: x.course.name,
        subject_code: x.course.subject_code,
        percentage: x.percentage,
        semester: x.course.semester,
      };
      attendance.push(obj);
    });

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
  };

  useEffect(() => {
    axios
      .get(`/api/students/${id}`)
      .then((res) => {
        setStudent(res.data);
        //get attendance data

        axios
          .get(`/api/attendances/student/${id}/all/courses`)
          .then((res) => {
            console.log(res.data);
            setAttendanceData(res.data);
            setFilteredAttendanceData(res.data);
            setFilteredAttendanceChartData(res.data);
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            console.log(err);
          });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <Container>
        <Title title="Attendance" />

        <div className="analytics-body my-5 mx-auto w-75">
          <div className="optionPane my-5">
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
                const semester = e.target.value;
                if (semester === "All") {
                  setFilteredAttendanceData(AttendanceData);
                  setFilteredAttendanceChartData(AttendanceData);
                  console.log(AttendanceData);
                } else {
                  const filteredAttendanceData = AttendanceData.filter(
                    (x) => x.semester == semester
                  );
                  console.log(filteredAttendanceData);
                  setFilteredAttendanceChartData(filteredAttendanceData);
                  setFilteredAttendanceData(filteredAttendanceData);
                  setFilteredAttendanceChartData(filteredAttendanceData);
                }
              }}
            />
          </div>
          <div className="dataSection row align-items-center">
            <div className="AttendanceTable col-6">
              <table className="table table-striped">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Subject</th>
                    <th scope="col">Subject Code</th>
                    <th scope="col">Attendance %</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAttendanceData.map((x, i) => {
                    return (
                      <tr key={Math.random()}>
                        <th scope="row">{i + 1}</th>
                        <td>{x.course.name}</td>
                        <td>{x.course.subject_code}</td>
                        <td>{x.percentage}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="graph col-6">
              <Bar options={options} data={AttendanceChartData} />
            </div>
          </div>
        </div>
      </Container>
    );
  }
};

export default ViewStudentAttendance;
