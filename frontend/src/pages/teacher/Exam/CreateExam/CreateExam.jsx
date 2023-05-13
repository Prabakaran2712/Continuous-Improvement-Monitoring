import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Store } from "react-notifications-component";
import Container from "../../../../components/Container/Container";
import Title from "../../../../components/forms/Title/Title";
import DateComponent from "../../../../components/forms/Date/DateComponent";
import Input from "../../../../components/forms/Input/Input";
import Submit from "../../../../components/forms/Submit/Submit";
import TimeComponent from "../../../../components/forms/Time/TimeComponent";
import Select from "../../../../components/forms/Select/Select";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import Styles from "./CreateExam.module.css";
import Loading from "../../../../components/Loading/Loading";

const CreateExam = () => {
  const { register, handleSubmit } = useForm();
  const [examDate, setExamDate] = useState();
  const [examTime, setExamTime] = useState();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [teachesOption, setTeachesOption] = useState([]);
  const [teachesValue, setTeachesValue] = useState([]);
  const auth = useAuthContext();

  const user = auth.user._id;
  //function to select properties from an object
  function selectProps(...props) {
    return function (obj) {
      const newObj = [];
      props.forEach((name) => {
        newObj.push(obj[name]);
      });

      return newObj;
    };
  }

  //toast notification
  const notify = (option) => {
    if (option == "success") {
      Store.addNotification({
        title: "Success!",
        message: `New Exam has been created`,
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
        message: `Error while creating  Exam`,
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
    axios.get(`/api/teaches/staff/${user}`).then((res) => {
      setUserData(res.data);
      //get course Details
      const courseDetails = res.data.map(selectProps("course"));
      //get course name form course details
      const courseName = courseDetails.map((x) => {
        return x[0].name;
      });

      //get subject code from course details
      const subjectCode = courseDetails.map((x) => {
        return x[0].subject_code;
      });

      //get batch details
      const batchDetails = res.data.map(selectProps("batch"));
      //get batch name from batch details
      const batchName = batchDetails.map((x) => {
        return x[0].start_year + "-" + x[0].end_year;
      });

      //concatenate course name and subject code and batch name
      const teachesOption = courseName.map((x, index) => {
        return subjectCode[index] + "-" + x + " " + batchName[index];
      });

      //set teaches option as value
      setTeachesOption(teachesOption);

      //set teaches id as value
      setTeachesValue(res.data.map(selectProps("_id")));

      setLoading(false);
    });
  }, []);
  const onSubmit = (data) => {
    data.exam_date = examDate.$d;
    //get only time from examTime
    const time12 = examTime.$d.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    data.exam_time = time12;

    //send data to backend
    axios
      .post("/api/exams", data)
      .then((res) => {
        //create mark for each student
        console.log(res.data.teaches.students);
        var marksData = [];
        for (let i = 0; i < res.data.teaches.students.length; i++) {
          const markData = {
            student: res.data.teaches.students[i]._id,
            exam: res.data._id,
          };
          marksData.push(markData);
        }
        console.log(marksData);
        axios
          .post("/api/marks/marks", marksData)
          .then((res) => {
            console.log(res);
            notify("success");
          })
          .catch((err) => {
            console.log(err);
            notify("error");
          });
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
    <Container>
      <div className="  w-100 mx-auto my-2 ">
        <div className="mx-5">
          <Title title="Create Exam" />
        </div>
        <div className={`${Styles.formBody}`}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-lg-6 col-md-12">
                <Input
                  name="exam_code"
                  label="Exam Code"
                  register={register}
                  type="text"
                  conditions={{ required: true, maxLength: 100 }}
                />

                <DateComponent
                  value={examDate}
                  onChange={setExamDate}
                  label={"Exam Date"}
                />
                <TimeComponent
                  value={examTime}
                  onChange={setExamTime}
                  label={"Exam Time"}
                />

                <Input
                  name="exam_duration"
                  label="Exam Duration"
                  register={register}
                  type="Number"
                  conditions={{ required: true, maxLength: 100 }}
                />
              </div>
              <div className="col-lg-6 col-md-12">
                <Select
                  name="exam_type"
                  label="Exam Type"
                  register={register}
                  options={["Assessment-1", "Assessment-2", "End-Semester"]}
                  values={["Assessment-1", "Assessment-2", "End-Semester"]}
                />
                <Select
                  name="teaches"
                  label="Class"
                  register={register}
                  options={teachesOption}
                  values={teachesValue}
                />
                <Input
                  name="total_marks"
                  label="Total Marks"
                  register={register}
                  type="Number"
                  conditions={{ required: true }}
                />
              </div>
            </div>
            <div className="row my-5 justify-content-end   ">
              <div className=" mx-auto text-center">
                <Submit name="Create" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default CreateExam;
