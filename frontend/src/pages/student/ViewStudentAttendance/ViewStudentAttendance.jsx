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
import Loading from "../../../components/Loading/Loading";
import Table from "../../../components/Table/Table";

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

  const [data, setData] = useState({});

  const [AttendanceData, setAttendanceData] = useState([]);
  const [AttendanceChartData, setAttendanceChartData] = useState([]);

  const navigate = useNavigate();

  const setTableData = (data) => {
    return [data.subject_name, data.subject_code, data.percentage, () => {}];
  };
  const setFilteredAttendanceChartData = (data) => {
    var attendance = [];
    data.forEach((x) => {
      var obj = {
        subject_name: x.course.name,
        subject_code: x.course.subject_code,
        percentage: x.percentage,
        semester: x.course.semester,
        teaches: x.teaches,
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
                    course: x,
                    percentage: "NA",
                    teaches: x._id,
                  };
                  res.data.forEach((y) => {
                    if (y.teaches == x._id) {
                      obj.percentage = y.percentage;
                    }
                  });
                  attendance.push(obj);
                });
                console.log("attendance");
                console.log(attendance);
                setAttendanceData(attendance);
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
      <div>
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
                  setData(setTableData(AttendanceData));
                } else {
                  const filteredAttendanceData = AttendanceData.filter(
                    (x) => x.semester == semester
                  );
                  setData(setTableData(filteredAttendanceData));
                }
              }}
            />
          </div>
          <div className="dataSection row align-items-center">
            <div className="AttendanceTable col-6">
              <Table
                thead={["#", "Subject", "Subject Code", "Attendance %"]}
                tbody={data}
              />
            </div>

            <div className="graph col-6"></div>
          </div>
        </div>
      </div>
    );
  }
};

export default ViewStudentAttendance;
