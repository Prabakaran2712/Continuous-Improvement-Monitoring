import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import Container from "../../../components/Container/Container";
import Title from "../../../components/forms/Title/Title";

const ViewStudentCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const auth = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`/api/teaches/student/${auth.user._id}`)
      .then((res) => {
        setCourses(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return (
    <Container>
      <Title title="Courses" />
      <div className="body my-3">
        <div className="row   table-responsive ">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Subject Name</th>
                <th>Subject Code</th>
                <th>Semester</th>
                <th>Faculty</th>
              </tr>
            </thead>

            <tbody>
              {courses.map((course, index) => (
                <tr
                  key={index}
                  onClick={() => {
                    navigate(`/student/course/${course._id}`);
                  }}
                >
                  <td>{index + 1}</td>
                  <td>{course.course.name}</td>
                  <td>{course.course.subject_code}</td>
                  <td>{course.semester}</td>
                  <td>{course.teacher.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
};

export default ViewStudentCourses;
