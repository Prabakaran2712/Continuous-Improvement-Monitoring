import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Store } from "react-notifications-component";
import Container from "../../../../components/Container/Container";
import Title from "../../../../components/forms/Title/Title";
import Input from "../../../../components/forms/Input/Input";
import Select from "../../../../components/forms/Select/Select";
import Switch from "@mui/material/Switch";
import { useEffect } from "react";
import axios from "axios";

const ClassDetails = () => {
  const { id } = useParams();
  const { register, onSubmit } = useForm();
  const [students, setStudents] = useState([]);
  const [checked, setChecked] = useState(false);
  const notify = (option) => {
    if (option == "success") {
      Store.addNotification({
        title: "Success!",
        message: ` Attendance has been updated successfully`,
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
        message: `Error while updating attendance`,
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
    axios
      .get(`/api/classes/${id}`)
      .then((res) => {
        console.log(res.data);
        //get student from batch
        axios.get(`/api/teaches/${res.data.teaches._id}`).then((res) => {
          //get attendance for class
          axios.get(`/api/attendances/class/${id}`).then((res) => {
            var students = [];
            res.data.forEach((x) => {
              students.push({
                ...x.student,
                present: x.present,
              });
            });
            setStudents(students);
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const save = () => {
    //get stduent id and present from students
    var data = students.map((x) => {
      return {
        student: x._id,
        class: id,
        present: x.present,
      };
    });
    axios
      .post("/api/attendances/add", data)
      .then((res) => {
        notify("success");
      })
      .catch((err) => {
        console.log(err);
        notify("error");
      });
  };

  return (
    <Container>
      <Title title={"Class Details"} />
      <div className="body m-2">
        <form>
          <div className="row">
            <div className="col-6">
              <Input
                name="course_name"
                label="Course Name"
                register={register}
                type="text"
                conditions={{ required: true, maxLength: 100 }}
                disabled={true}
              />
              <Input
                name="class_date"
                label=" Date"
                register={register}
                type="text"
                conditions={{ required: true, maxLength: 100 }}
                disabled={true}
              />

              <Input
                name="class_time"
                label=" Time"
                register={register}
                type="text"
                conditions={{ required: true, maxLength: 100 }}
                disabled={true}
              />
            </div>
            <div className="col-6">
              <Input
                name="batch_name"
                label="Batch Name"
                register={register}
                type="text"
                conditions={{ required: true, maxLength: 100 }}
                disabled={true}
              />
              <Input
                name="unit"
                label="Unit"
                register={register}
                type="text"
                conditions={{ required: true, maxLength: 100 }}
                disabled={true}
              />
              <Input
                name="topic"
                label="Topic"
                register={register}
                type="Number"
                conditions={{ required: true, maxLength: 100 }}
                disabled={true}
              />
            </div>
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
                      <th>Attendance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students &&
                      students.map((student, indx) => {
                        return (
                          <tr key={Math.random()}>
                            <td>{indx + 1}</td>
                            <td>{student.name}</td>
                            <td>{student.roll_number}</td>

                            <td>
                              <Switch
                                color="warning"
                                checked={student.present}
                                onChange={(event) => {
                                  //update a value in the array and then set the array
                                  var temp = [...students];
                                  temp[indx].present = event.target.checked;
                                  setStudents(temp);
                                }}
                              />
                              <br />
                              {student.present ? "Present" : "Absent"}
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
          </div>
        </form>
      </div>
    </Container>
  );
};

export default ClassDetails;
