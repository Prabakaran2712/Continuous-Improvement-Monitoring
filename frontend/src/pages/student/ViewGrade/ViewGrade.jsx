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
import { Bar } from "react-chartjs-2";
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
      text: "Grades",
    },

    scales: {
      xAxes: [
        {
          barPercentage: 0.4,
        },
      ],
    },
  },
};
const ViewGrade = () => {
  const auth = useAuthContext();
  const [grades, setGrades] = useState([]);
  const [filteredGrades, setFilteredGrades] = useState([]);
  const [semester, setSemester] = useState("0");
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const setLineChartData = (grades) => {
    console.log("setLineChartData");
    console.log(grades);
    setLabels(grades.map((x) => x.teaches.course.subject_name));
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
      lbls.push(x.teaches.course.name);
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
    //grade points for grades
    const gradePoints = { O: 10, "A+": 9, A: 8, "B+": 7, B: 6 };
    grades.forEach((grade) => {
      if (grade.grade == "RA") return;
      totalCredits += grade.teaches.course.credits;
      totalPoints += grade.teaches.course.credits * gradePoints[grade.grade];
    });
    return totalPoints / totalCredits;
  };
  useEffect(() => {
    console.log("view grade");
    axios
      .get(`/api/grades/student/${auth.user._id}`)
      .then((res) => {
        setGrades(res.data);
        setFilteredGrades(res.data);
        setLineChartData(res.data);

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loading />;
  return (
    <Container>
      <Title title="Grades" />
      <div className="content my-5 ">
        <div className="header d-flex flex-row justify-content-between">
          <div className="filter w-100 my-5">
            <select
              className="form-select w-50 mx-auto"
              aria-label="Default select example"
              onChange={(e) => {
                console.log(e.target.value);
                console.log(grades);
                if (e.target.value == "0") {
                  setFilteredGrades(grades);
                  setSemester(e.target.value);
                  setLineChartData(grades);
                } else {
                  setSemester(e.target.value);
                  setFilteredGrades(
                    grades.filter(
                      (grade) => grade.teaches.semester == e.target.value
                    )
                  );

                  setLineChartData(
                    grades.filter(
                      (grade) => grade.teaches.semester == e.target.value
                    )
                  );
                }
              }}
              value={semester}
            >
              <option value="0">All</option>
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
              <option value="3">Semester 3</option>
              <option value="4">Semester 4</option>
              <option value="5">Semester 5</option>
              <option value="6">Semester 6</option>
              <option value="7">Semester 7</option>
              <option value="8">Semester 8</option>
            </select>
          </div>
          <div className="gpa mx-auto w-50 text-center my-auto">
            <div className="gpa-title h3 display">
              GPA :{" "}
              <span className="gpa-value h3 display">
                {calculateGPA(filteredGrades).toString().slice(0, 4)}
              </span>
            </div>
          </div>
        </div>
        <div className="content row">
          <div className="markTable col-7">
            <table className="table table-striped w-75 mx-auto my-5">
              <thead
                className="
            table-dark
            "
              >
                <tr>
                  <th>#</th>
                  <th scope="col">Subject Name</th>
                  <th scope="col">Subject Code</th>
                  <th scope="col">Grade</th>
                </tr>
              </thead>
              <tbody>
                {filteredGrades.map((grade, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{grade.teaches.course.name}</td>
                      <td>{grade.teaches.course.subject_code}</td>
                      <td>{grade.grade}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="gradeChart col-5">
            <div className="barchart mx-auto ">
              <Bar
                data={data}
                options={{
                  maintainAspectRatio: false,
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "top",
                    },
                    title: {
                      display: true,
                      text: "Grades",
                    },
                    scales: {
                      xAxes: [
                        {
                          barThickness: 1,
                        },
                      ],
                    },

                    //set bar width
                    barPercentage: 0.5,
                    barThickness: 6,
                    maxBarThickness: 8,
                  },
                }}
                width={400}
                height={400}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ViewGrade;
