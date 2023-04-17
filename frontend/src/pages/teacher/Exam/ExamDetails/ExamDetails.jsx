import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import DateComponent from "../../../../components/forms/Date/DateComponent";
import TimeComponent from "../../../../components/forms/Time/TimeComponent";
import { useForm } from "react-hook-form";
import Container from "../../../../components/Container/Container";
import Title from "../../../../components/forms/Title/Title";
import Input from "../../../../components/forms/Input/Input";
import Button from "../../../../components/forms/Button/Button";

const ExamDetails = () => {
  const [examData, setExamData] = useState();
  const [examDate, setExamDate] = useState();
  const [examTime, setExamTime] = useState();
  const { id } = useParams();
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    //set default values to form fields
    axios
      .get(`http://localhost:3000/api/exams/${id}`)
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
        console.log(res.data.exam_date.toLocaleString());
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container>
      <div className="header">
        <Title title="Exam Details" />
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
              <div className="form-group mx-5 my-4 py-5  text-center ">
                <button className="btn btn-outline-success btn-lg">
                  Marks
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
