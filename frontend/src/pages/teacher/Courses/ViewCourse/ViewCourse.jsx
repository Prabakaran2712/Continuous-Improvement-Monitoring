import { useEffect, useState } from "react";
import Container from "../../../../components/Container/Container";
import { useParams } from "react-router";
import axios from "axios";

const ViewCourse = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState("newStudents");
  const [newStudents, setNewStudents] = useState([]);
  const [yourStudents, setYourStudents] = useState([]);
  const [batchStudents, setBatchStudents] = useState([]);
  const switchPage = (page) => {
    setPage(page);
  };
  const addStudent = (student) => {
    axios
      .put(`http://localhost:3000/api/teaches/addStudent/${id}`, {
        student: student,
      })
      .then((res) => {
        setYourStudents(res.data.students);
        setNewStudents(
          batchStudents.filter((student) => {
            return !res.data.students.some((obj) => {
              return obj._id === student._id;
            });
          })
        );
      });
  };

  const removeStudent = (student) => {
    axios
      .put(`http://localhost:3000/api/teaches/removeStudent/${id}`, {
        student: student,
      })
      .then((res) => {
        setYourStudents(res.data.students);
        setNewStudents(
          batchStudents.filter((student) => {
            return !res.data.students.some((obj) => {
              return obj._id === student._id;
            });
          })
        );
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/teaches/${id}`)
      .then((res) => {
        if (res.data === null) {
          setLoading(false);
          return;
        }

        setUserData(res.data);
        setLoading(false);
        setYourStudents(res.data.students);
        console.log(res.data.students);

        axios
          .get(`http://localhost:3000/api/students/batch/${res.data.batch._id}`)
          .then((batchstudents) => {
            //filter out the students who are already in the yourstudents array
            setBatchStudents(batchstudents.data);
            setNewStudents(
              batchstudents.data.filter((student) => {
                return !res.data.students.some((obj) => {
                  return obj._id === student._id;
                });
              })
            );
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Container>
      {page === "newStudents" ? <h1>New Students</h1> : <h1>Your Students</h1>}

      {loading ? (
        <div>Loading</div>
      ) : (
        <div className="main-content">
          <div className="header d-flex flex-row">
            <div
              className={
                `header-left ` + page === "newStudents" ? `active` : ``
              }
              onClick={() => switchPage("newStudents")}
            >
              New Students
            </div>
            <div
              className={
                `header-right ` + page === "yourStudents" ? `active` : ``
              }
              onClick={() => switchPage("yourStudents")}
            >
              Your Students
            </div>
          </div>
          <div className="body">
            {page === "newStudents" ? (
              <div className="new-students">
                <div className="row   table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Roll Number</th>
                        <th>Department</th>
                      </tr>
                    </thead>
                    <tbody>
                      {newStudents &&
                        newStudents.map((student) => {
                          return (
                            <tr key={Math.random()}>
                              <td>{student.name}</td>
                              <td>{student.roll_number}</td>
                              <td>
                                {student.department &&
                                  student.department.dept_name}
                              </td>
                              <td>
                                <button
                                  className="btn btn-primary"
                                  onClick={() => {
                                    addStudent(student._id);
                                  }}
                                >
                                  +
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <></>
            )}

            {page === "yourStudents" ? (
              <div className="your-students">
                <div className="row   table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Roll Number</th>
                        <th>Department</th>
                      </tr>
                    </thead>
                    <tbody>
                      {yourStudents &&
                        yourStudents.map((student) => {
                          return (
                            <tr key={Math.random()}>
                              <td>{student.name}</td>
                              <td>{student.roll_number}</td>
                              <td>
                                {student.department &&
                                  student.department.dept_name}
                              </td>
                              <td>
                                <button
                                  className="btn btn-primary"
                                  onClick={() => {
                                    removeStudent(student._id);
                                  }}
                                >
                                  -
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
    </Container>
  );
};

export default ViewCourse;
