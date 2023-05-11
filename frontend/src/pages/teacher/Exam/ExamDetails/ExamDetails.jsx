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
import Table from "../../../../components/Table/Table";

//styles
import Styles from "./ExamDetails.module.css";

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
  const [totalMarks, setTotalMarks] = useState(100);

  const deleteExam = () => {
    axios
      .delete(`/api/exams/${id}`)
      .then((res) => {
        navigate("/teacher/exams");
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
        setTotalMarks(res.data.total_marks);

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
        setValue("exam_date", moment(res.data.exam_date).format("YYYY-MM-DD"));
        setValue("exam_time", res.data.exam_time);

        //get marks for exam
        axios.get(`/api/marks/exam/${id}`).then((res) => {
          //sort students by roll number
          var sorted = res.data.sort((a, b) => {
            return a.student.roll_number - b.student.roll_number;
          });
          setStudents(sorted);
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
      <div
        className={`header d-flex flex-row justify-content-between my-4 mx-md-5`}
      >
        <Title title="Exam Details" />
        <div
          className={`d-flex flex-row justify-content-end px-3 align-items-center ${Styles.options}}`}
        >
          <div className="button mx-2">
            <UpdateButton
              onClick={() => {
                navigate(`/teacher/exams/update/${id}`);
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
      <div className="body m-1 m-sm-2">
        <form onSubmit={handleSubmit((data) => console.log(data))}>
          <div className="row">
            <div className="col-md-6 col-12">
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
            <div className="col-md-6 col-12">
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
            <div className="table-responsive p-md-5">
              <div className="header mb-4">
                <Title title="Students" />
              </div>
              <div className={`${Styles.table}`}>
                <Table
                  thead={["#", "Roll Number", "Name", "Marks", "Published"]}
                  tbody={students.map((x, indx) => {
                    return [
                      x.student.roll_number,
                      x.student.name,
                      <input
                        type="number"
                        className="form-control w-50  mx-auto"
                        name="marks"
                        value={x.mark}
                        max={totalMarks}
                        onChange={(event) => {
                          //update a value in the array and then set the array
                          var temp = [...students];
                          temp[indx].mark = event.target.value;
                          setStudents(temp);
                        }}
                      />,

                      <Switch
                        color="default"
                        checked={x.published}
                        onChange={(event) => {
                          //update a value in the array and then set the array
                          var temp = [...students];
                          temp[indx].published = event.target.checked;
                          setStudents(temp);
                        }}
                      />,
                      () => {
                        console.log;
                      },
                    ];
                  })}
                  tooltip={false}
                  hover={false}
                />
              </div>

              <div className="mx-auto my-5 p-2 text-center">
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
        </form>
      </div>
    </Container>
  );
};

export default ExamDetails;
