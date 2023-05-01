import { useEffect } from "react";
import Container from "../../../components/Container/Container";
import Title from "../../../components/forms/Title/Title";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";

const ViewGrade = () => {
  const auth = useAuthContext();
  const [grades, setGrades] = useState([]);
  const [filteredGrades, setFilteredGrades] = useState([]);
  const [semester, setSemester] = useState(1);

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
        console.log(res.data);
        setGrades(res.data);
        setFilteredGrades(
          res.data.filter((grade) => grade.teaches.semester == 1)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container>
      <Title title="Grades" />
      <div className="content my-5 ">
        <div className="header d-flex flex-row justify-content-between">
          <div className="filter w-100 ">
            <select
              className="form-select w-25 mx-auto"
              aria-label="Default select example"
              onChange={(e) => {
                console.log(e.target.value);
                console.log(grades);
                setFilteredGrades(
                  grades.filter(
                    (grade) => grade.teaches.semester == e.target.value
                  )
                );
                setSemester(e.target.value);
              }}
              value={semester}
            >
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
          <div className="gpa mx-auto w-100">
            <div className="gpa-title h3 display">
              GPA :{" "}
              <span className="gpa-value h3 display">
                {calculateGPA(filteredGrades).toString().slice(0, 4)}
              </span>
            </div>
          </div>
        </div>
        <table className="table table-striped w-75 mx-auto">
          <thead>
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
    </Container>
  );
};

export default ViewGrade;
