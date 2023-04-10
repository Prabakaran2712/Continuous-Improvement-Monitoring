import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Container from "../../../components/Container/Container";
import DeleteButton from "../../../components/DeleteButton";
import View from "../../../components/Courses/Teacher/View";

const Courses = () => {
  const user = "641e9b56a732849ef7efd5a8";
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`http://localhost:3000/api/teaches/staff/${user}`).then((res) => {
      console.log(res.data);
      setUserData(res.data);
      setLoading(false);
    });
  }, []);
  const view = (id) => {
    navigate(`/teacher/courses/view/${id}`);
  };

  return (
    <Container>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="course-page">
          <div className=" d-flex  flex-row justify-content-between align-items-center">
            <h1 className="display-6">Courses</h1>
            <button
              className="btn btn-outline-success h-50 "
              onClick={() => {
                navigate("/teacher/courses/add");
              }}
            >
              {" "}
              +
            </button>
          </div>
          <div className="row   table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Course Name</th>
                  <th>Subject Code</th>
                  <th>Department</th>
                  <th>Batch</th>
                  <th>Delete</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {userData &&
                  userData.map((data, indx) => {
                    var course = data.course;
                    return (
                      <tr key={Math.random()}>
                        <td>{indx + 1}</td>
                        <td>{course.name}</td>
                        <td>{course.subject_code}</td>
                        <td>{course.department.dept_name}</td>
                        <td>
                          {data.batch.start_year + " - " + data.batch.end_year}
                        </td>

                        <td>
                          <DeleteButton />
                        </td>
                        <td>
                          <View id={data._id} view={view} />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Courses;
