import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Store } from "react-notifications-component";
import Container from "../../../../components/Container/Container";
import Title from "../../../../components/forms/Title/Title";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import Input from "../../../../components/forms/Input/Input";
import DateComponent from "../../../../components/forms/Date/DateComponent";
import Submit from "../../../../components/forms/Submit/Submit";
import TimeComponent from "../../../../components/forms/Time/TimeComponent";
import Select from "../../../../components/Select/Select";
import { useNavigate } from "react-router-dom";
import Loading from "../../../../components/Loading/Loading";
import Styles from "./TeacherChatCreate.module.css";

const TeacherChatCreate = () => {
  const { register, handleSubmit } = useForm();
  const [examDate, setExamDate] = useState();
  const [examTime, setExamTime] = useState();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [teachesOption, setTeachesOption] = useState([]);
  const [teachesValue, setTeachesValue] = useState([]);
  const [studentOptions, setStudentOptions] = useState([]);
  const [studentValues, setStudentValues] = useState([]);
  const [student, setStudent] = useState();
  const [teaches, setTeaches] = useState();
  const auth = useAuthContext();
  const navigate = useNavigate();
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
        message: `New Chat has been created`,
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
        message: `Error while creating  Chat`,
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

  //function to update student list when teacher changes
  const handleTeachesChange = (e) => {
    const index = teachesValue.indexOf(e.target.value);
    setStudentOptions(userData[index].students.map(selectProps("name")));
    setStudentValues(userData[index].students.map(selectProps("_id")));
    setTeaches(e.target.value);
    console.log(e.target.value);
  };

  useEffect(() => {
    axios.get(`/api/teaches/staff/${user}`).then((res) => {
      console.log(res.data);
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

      const teachesValue = courseName.map((x, index) => {
        return res.data[index]._id;
      });

      //set teaches option as value
      setTeachesOption(teachesOption);

      //set teaches id as value
      setTeachesValue(teachesValue);

      //set first value for student options
      if (res.data.length > 0) {
        setStudentOptions(res.data[0].students.map(selectProps("name")));
        setStudentValues(res.data[0].students.map(selectProps("_id")));
        setTeaches(res.data[0]._id);

        if (res.data[0].students.length > 0) {
          setStudent(res.data[0].students[0]._id);
        }
      }
      console.log(res.data[0].students.map(selectProps("name")));
      console.log(res.data[0].students.map(selectProps("_id")));

      setLoading(false);
    });
  }, []);
  const onSubmit = (data) => {
    data.student = student;
    data.teaches = teaches;
    console.log(data);

    axios
      .post(`/api/discussions`, data)
      .then((res) => {
        notify("success");
        navigate(`/teacher/discussions`);
      })
      .catch((err) => {
        notify("error");
        console.log(err);
      });
  };
  if (loading) return <Loading />;
  return (
    <Container>
      <div className="  ">
        <div className={`${Styles.title} mx-5`}>
          <Title title="Create Discussion" />
        </div>
        <div className={`${Styles.form}`}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col">
                <Input
                  name="title"
                  label="Tile"
                  register={register}
                  type="text"
                  conditions={{ required: true, maxLength: 100 }}
                />

                <Select
                  name="teaches"
                  label="Course"
                  options={teachesOption}
                  values={teachesValue}
                  onChange={handleTeachesChange}
                />
                <Select
                  name="student"
                  label="Student"
                  options={studentOptions}
                  values={studentValues}
                  onChange={(e) => {
                    setStudent(e.target.value);
                    console.log(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="w-50 mx-auto text-center my-5 ">
              <Submit name="Create" />
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default TeacherChatCreate;
