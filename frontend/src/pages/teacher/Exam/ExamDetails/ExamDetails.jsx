import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Store } from "react-notifications-component";
import { useForm } from "react-hook-form";
import Container from "../../../../components/Container/Container";
import Title from "../../../../components/forms/Title/Title";
import Input from "../../../../components/forms/Input/Input";
import UpdateButton from "../../../../components/Button/UpdateButton/UpdateButton";

import { Switch } from "@mui/material";
import DeleteButton from "../../../../components/Button/DeleteButton/DeleteButton";
import Confirm from "../../../../components/Confirm/Confirm";
import Loading from "../../../../components/Loading/Loading";

const ExamDetails = () => {
  const [examData, setExamData] = useState();
  const [examDate, setExamDate] = useState();
  const [examTime, setExamTime] = useState();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { register, handleSubmit, setValue } = useForm();

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const deleteExam = () => {
    axios
      .delete(`/api/exams/${id}`)
      .then((res) => {
        navigate("/teacher/exams");
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const notify = (option) => {
    if (option == "success") {
      Store.addNotification({
        title: "Success!",
        message: ` Marks has been updated successfully`,
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
        message: `Error while updating Marks`,
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
      .get(`/api/exams/${id}`)
      .then((res) => {
        setExamData(res.data);
        console.log(res.data);

        //set form fields using setValue
        setValue("exam_code", res.data.exam_code);
        setValue("course_name", res.data.teaches.course.name);
        setValue("exam_duration", res.data.exam_duration);
        setValue("exam_type", res.data.exam_type);
        setValue("subject_name", res.data.teaches.course.name);
        setValue("teacher_name", res.data.teaches.teacher.name);
        setValue("subject_code", res.data.teaches.course.subject_code);
        setValue("total_marks", res.data.total_marks);
        setValue(
          "batch_name",
          res.data.teaches.batch.start_year +
            "-" +
            res.data.teaches.batch.end_year
        );
        //only date no time
        setValue("exam_date", moment(res.data.exam_date).format("YYYY-MM-DD"));
        setValue("exam_time", res.data.exam_time);
        //get marks for exam
        axios.get(`/api/marks/exam/${id}`).then((res) => {
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
        exam: x.exam,
        mark: x.mark,
        published: x.published,
      };
    });
    console.log(data);
    axios
      .post("/api/marks/marks", data)
      .then((res) => {
        notify("success");
      })
      .catch((err) => {
        console.log(err);
        notify("error");
      });
  };
  if (loading) return <Loading />;
  return (
    <Container>
      <Confirm
        title="Delete Exam"
        content="Are you sure you want to delete this exam?"
        success="Yes"
        fail="No"
        open={open}
        setOpen={setOpen}
        onSuccess={deleteExam}
      />
      <div className="header d-flex flex-row justify-content-between my-4 mx-auto">
        <Title title="Exam Details" />
        <div
          className="options d-flex flex-row justify-content-end px-3"
          style={{
            marginRight: "100px",
          }}
        >
          <div className="button mx-2">
            <UpdateButton
              onClick={() => {
                //   console.log("clicked");
              }}
            />
          </div>
          <div className="button mx-2">
            <DeleteButton
              onClick={() => {
                setOpen(true);
              }}
            />
          </div>
        </div>
      </div>
      <div className="body m-2">
        <form onSubmit={handleSubmit((data) => console.log(data))}>
          <div className="row">
            <div className="col-6">
              <Input
                name="exam_code"
                label="Exam Code"
                register={register}
                type="text"
                conditions={{ required: true, maxLength: 100 }}
                disabled={true}
              />
              <Input
                name="exam_date"
                label="Exam Date"
                register={register}
                type="text"
                conditions={{ required: true, maxLength: 100 }}
                disabled={true}
              />

              <Input
                name="course_name"
                label="Course Name"
                register={register}
                type="text"
                conditions={{ required: true, maxLength: 100 }}
                disabled={true}
              />
              <Input
                name="exam_duration"
                label="Exam Duration"
                register={register}
                type="Number"
                conditions={{ required: true, maxLength: 100 }}
                disabled={true}
              />
              <Input
                name="exam_type"
                label="Exam Type"
                register={register}
                type="text"
                conditions={{ required: true, maxLength: 100 }}
                disabled={true}
              />
              <Input
                name="subject_name"
                label="Subject Name"
                register={register}
                type="text"
                conditions={{ required: true, maxLength: 100 }}
                disabled={true}
              />
            </div>
            <div className="col-6">
              <Input
                name="teacher_name"
                label="Teacher Name"
                register={register}
                type="text"
                conditions={{ required: true, maxLength: 100 }}
                disabled={true}
              />
              <Input
                name="exam_time"
                label="Exam Time"
                register={register}
                type="text"
                conditions={{ required: true, maxLength: 100 }}
                disabled={true}
              />

              <Input
                name="batch_name"
                label="Batch Name"
                register={register}
                type="text"
                conditions={{ required: true, maxLength: 100 }}
                disabled={true}
              />
              <Input
                name="subject_code"
                label="Subject Code"
                register={register}
                type="text"
                conditions={{ required: true, maxLength: 100 }}
                disabled={true}
              />
              <Input
                name="total_marks"
                label="Total Marks"
                register={register}
                type="text"
                conditions={{ required: true, maxLength: 100 }}
                disabled={true}
              />
            </div>
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
                    <td>Marks</td>
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
                            <input
                              type="number"
                              className="form-control w-25  "
                              name="marks"
                              value={student.mark}
                              max={examData.total_marks}
                              onChange={(event) => {
                                //update a value in the array and then set the array
                                var temp = [...students];
                                temp[indx].mark = event.target.value;
                                setStudents(temp);
                              }}
                            />
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
