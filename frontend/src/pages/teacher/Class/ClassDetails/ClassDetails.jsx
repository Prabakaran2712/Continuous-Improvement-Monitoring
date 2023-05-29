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
import Table from "../../../../components/Table/Table";
import Submit from "../../../../components/forms/Submit/Submit";
import Loading from "../../../../components/Loading/Loading";
import moment from "moment";
import Styles from "./ClassDetails.module.css";
import Header from "../../../../components/Page/Header/Header";
import UpdateButton from "../../../../components/Button/UpdateButton/UpdateButton";
import DeleteButton from "../../../../components/Button/DeleteButton/DeleteButton";
import { useNavigate } from "react-router-dom";
import Confirm from "../../../../components/Confirm/Confirm";
const ClassDetails = () => {
  const { id } = useParams();
  const { register, onSubmit, setValue } = useForm();
  const [students, setStudents] = useState([]);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState("");
  const navigate = useNavigate();
  const deleteExam = () => {
    axios
      .delete(`/api/classes/${id}`)
      .then((res) => {
        navigate(`/teacher/class/subject/${courseId}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
        setCourseId(res.data.teaches._id);
        //set default values
        setValue("course_name", res.data.teaches.course.name);
        setValue(
          "batch_name",
          res.data.teaches.batch.start_year +
            "-" +
            res.data.teaches.batch.end_year
        );
        setValue("unit", res.data.unit);
        setValue("topic", res.data.topic);
        setValue("class_date", moment(res.data.date).format("YYYY-MM-DD"));
        setValue("class_time", res.data.time);
        setValue("duration", res.data.duration);
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
            //sort students by roll number
            students.sort((a, b) => {
              return a.roll_number - b.roll_number;
            });

            setStudents(students);
            setLoading(false);
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
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="m-2">
      <Confirm
        title="Delete Exam"
        content="Are you sure you want to delete this Class?"
        success="Yes"
        fail="No"
        open={open}
        setOpen={setOpen}
        onSuccess={deleteExam}
      />
      <Header
        title="Class Details"
        buttons={[
          <UpdateButton
            onClick={() => {
              navigate("/teacher/class/update/" + id);
            }}
          />,
          <DeleteButton
            onClick={() => {
              setOpen(true);
            }}
          />,
        ]}
      />

      <div className="body m-1 m-sm-2">
        <form>
          <div className="row">
            <div className="col-md-6 col-12">
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
            <div className="col-md-6 col-12">
              <Input
                name="duration"
                label="Duration"
                register={register}
                type="Number"
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
                type="text"
                conditions={{ required: true, maxLength: 100 }}
                disabled={true}
              />
            </div>
          </div>
          <div className="student-list my-5">
            <div className="table-responsive ">
              <div className="header mb-lg-3 ">
                <Title title="Students" />
              </div>
              <div className={`${Styles.body}`}>
                <div className={`${Styles.table}`}>
                  <Table
                    thead={["#", "Name", "Roll Number", "Attendance"]}
                    tbody={students.map((x, indx) => {
                      return [
                        x.name,
                        x.roll_number,
                        <>
                          <Switch
                            color="warning"
                            checked={x.present}
                            onChange={(event) => {
                              var temp = [...students];
                              temp[indx].present = event.target.checked;
                              setStudents(temp);
                            }}
                          />

                          <br />
                          {x.present ? "Present" : "Absent"}
                        </>,
                        () => {},
                      ];
                    })}
                  />
                </div>
                <div className={`mx-auto text-center ${Styles.submitOptions}`}>
                  <button
                    type="button"
                    className="btn btn-outline-dark"
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
    </div>
  );
};

export default ClassDetails;
