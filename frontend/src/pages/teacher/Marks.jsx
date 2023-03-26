import axios from "axios";
import { useEffect, useState } from "react";
import Title from "../../components/forms/Title/Title";

const Marks = () => {
  const [marks, setMarks] = useState([]);
  const [markFilter, setMarkFilter] = useState([]);
  const [courses, setCourses] = useState(["All"]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/marks")
      .then((res) => {
        setMarks(res.data);
        setMarkFilter(res.data);
        for (let i = 0; i < res.data.length; i++) {
          if (!courses.includes(res.data[i].exam.course.name)) {
            courses.push(res.data[i].exam.course.name);
          }
        }
        console.log(courses);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const chooseFilterValue = (e) => {
    console.log(e.target.value);
    if (e.target.value === "All") {
      setMarkFilter(marks);
      return;
    }
    setMarkFilter(
      marks.filter((mark) => mark.exam.course.name === e.target.value)
    );
  };

  return (
    <div className="col-10 my-5 p-5 ">
      <div className=" d-flex  flex-row justify-content-between align-items-center">
        <Title title="Marks" />
        <button
          className="btn btn-outline-success h-50 "
          onClick={() => {
            navigate("/teacher/course/add");
          }}
        >
          {" "}
          Add Course
        </button>
      </div>
      <div className="container-fluid my-5">
        <div className="row">
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={chooseFilterValue}
          >
            {courses.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="row">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">Student Name</th>
              <th scope="col">Roll Number</th>
              <th scope="col">Exam</th>
              <th scope="col">Course</th>
              <th scope="col">Department</th>
              <th scope="col">Marks</th>
            </tr>
          </thead>
          <tbody>
            {markFilter.map((mark, index) => (
              <tr key={mark._id}>
                <th scope="row">{index + 1}</th>
                <td>{mark.student.name}</td>
                <td>{mark.student.roll_number}</td>
                <td>{mark.exam.exam_name}</td>
                <td>{mark.exam.course.name}</td>
                <td>{mark.exam.department.dept_name}</td>
                <td>{mark.mark}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Marks;
