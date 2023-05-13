import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Store } from "react-notifications-component";
import { useForm } from "react-hook-form";
import Container from "../../../components/Container/Container";
import Title from "../../../components/forms/Title/Title";

import { Switch } from "@mui/material";
import Select from "../../../components/forms/Select/Select";
import SubjectData from "../../../components/SubjectData/SubjectData";

const ExamDetails = () => {
  const [courseData, setCourseData] = useState();
  const [students, setStudents] = useState([]);
  const { id } = useParams();
  const { register, handleSubmit, setValue } = useForm();
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);

  const notify = (option) => {
    if (option == "success") {
      Store.addNotification({
        title: "Success!",
        message: ` Grade has been updated successfully`,
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3500,
          onScreen: true,
        },
      });
    } else {
      Store.addNotification({
        title: "Error!",
        message: `Error while updating Grade`,
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3500,
          onScreen: true,
        },
      });
    }
  };

  useEffect(() => {
    //set default values to form fields
    axios
      .get(`/api/teaches/${id}`)
      .then((res) => {
        console.log("course data");
        console.log(res.data.course);
        setCourseData(res.data.course);
        //get grade for teaches
        axios.get(`/api/grades/teaches/${id}`).then((res) => {
          console.log(res.data);
          setStudents(res.data);
          setLoading(false);
        });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const save = () => {
    var data = students.map((x) => {
      return {
        student: x.student._id,
        teaches: id,
        grade: x.grade,
        published: x.published,
      };
    });

    axios
      .post("/api/grades/grades", data)
      .then((res) => {
        notify("success");
      })
      .catch((err) => {
        console.log(err);
        notify("error");
      });
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Container>
      <div className="header">
        <Title title="Exam Details" />
        <SubjectData courseData={courseData} />
      </div>
      <div className="body m-2">
        <form onSubmit={handleSubmit((data) => console.log(data))}>
          <div className="row"></div>
          <div className="student-list m-2">
            <div className="row   table-responsive p-5">
              <div className="header">
                <p className="display-6 my-3">Students</p>
              </div>
              <table className="table table-striped w-75 mx-auto">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Roll Number</th>
                    <td>Grade</td>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {students &&
                    students.map((student, indx) => {
                      return (
                        <tr key={Math.random()}>
                          <td>{indx + 1}</td>
                          <td>{student.student.name}</td>
                          <td>{student.student.roll_number}</td>
                          <td>
                            <select
                              className="form-control"
                              value={student.grade}
                              onChange={(event) => {
                                //update a value in the array and then set the array
                                var temp = [...students];
                                temp[indx].grade = event.target.value;
                                setStudents(temp);
                                console.log(temp[indx]);
                              }}
                            >
                              <option value="O">O</option>
                              <option value="A+">A+</option>
                              <option value="A">A</option>
                              <option value="B+">B+</option>
                              <option value="B">B</option>
                              <option value="RA">RA</option>
                              <option value="NA">NA</option>
                            </select>
                          </td>

                          <td>
                            <Switch
                              color="warning"
                              checked={student.published}
                              onChange={(event) => {
                                //update a value in the array and then set the array
                                var temp = [...students];
                                temp[indx].published = event.target.checked;

                                setStudents(temp);
                              }}
                            />
                            <br />
                            {student.published
                              ? "    Published"
                              : "Not Published"}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <div className="mx-auto my-5 p-2 text-center">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={save}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default ExamDetails;
