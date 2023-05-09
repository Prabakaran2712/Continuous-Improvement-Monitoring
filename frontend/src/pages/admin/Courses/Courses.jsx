import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
const Courses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("/api/courses")
      .then((res) => {
        setCourses(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="">
      <div className=" d-flex  flex-row justify-content-between align-items-center">
        <h1 className="display-6">Courses</h1>
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
      <div className="row   table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Subject Code</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody>
            {courses &&
              courses.map((course) => {
                return (
                  <tr key={Math.random()}>
                    <td>{course.name}</td>
                    <td>{course.subject_code}</td>
                    <td>{course.department.dept_name}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Courses;
