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
import Select from "../../../../components/forms/Select/Select";
import { useNavigate } from "react-router-dom";

const StudentChatCreate = () => {
  const { register, handleSubmit } = useForm();
  const [examDate, setExamDate] = useState();
  const [examTime, setExamTime] = useState();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [teachesOption, setTeachesOption] = useState([]);
  const [teachesValue, setTeachesValue] = useState([]);
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

  useEffect(() => {
    axios.get(`/api/teaches/student/${user}`).then((res) => {
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
    data.student = auth.user._id;
    console.log(data);
    //add new chat
    axios
      .post(`/api/discussions`, data)
      .then((res) => {
        notify("success");
        navigate(`/student/chats`);
      })
      .catch((err) => {
        notify("error");
        console.log(err);
      });
  };
  return (
    <Container>
      <div className="  w-100 mx-auto my-5 ">
        <Title title="Create Chat" />
        <div className="form-body w-75 mx-auto">
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
                  register={register}
                  options={teachesOption}
                  values={teachesValue}
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

export default StudentChatCreate;
