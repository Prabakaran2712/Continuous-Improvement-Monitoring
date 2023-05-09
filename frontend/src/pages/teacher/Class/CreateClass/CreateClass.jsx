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
import Select from "../../../../components/forms/Select";
import { useAuthContext } from "../../../../hooks/useAuthContext";

const CreateClass = () => {
  const { register, handleSubmit } = useForm();
  const [classDate, setClassDate] = useState();
  const [classTime, setClassTime] = useState();
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
        message: `New Class has been created`,
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
        message: `Error while creating  Class`,
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
    data.date = classDate.$d;
    //get only time from examTime
    const time12 = classTime.$d.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    data.time = time12;

    //send data to backend
    axios
      .post("/api/classes", data)
      .then((res) => {
        //create attendance for each student
        var students = res.data.teaches.students;
        students = students.map((x) => {
          return {
            student: x._id,
            class: res.data._id,
            present: false,
          };
        });
        console.log(students);
        axios.post("/api/attendances/add", students).then((res) => {
          notify("success");
        });
      })
      .catch((err) => {
        console.log(err);
        notify("error");
      });
  };
  return (
    <Container>
      <div className="  w-100 mx-auto my-5 ">
        <Title title="Create Class" />
        <div className="form-body w-75 mx-2  my-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-6">
                <Input
                  name="topic"
                  label="Topic"
                  register={register}
                  type="text"
                  conditions={{ required: true, maxLength: 100 }}
                />

                <DateComponent
                  value={classDate}
                  onChange={setClassDate}
                  label={"Class Date"}
                />
                <TimeComponent
                  value={classTime}
                  onChange={setClassTime}
                  label={"Class Time"}
                />
              </div>
              <div className="col-6">
                <Input
                  name="duration"
                  label="Class Duration"
                  register={register}
                  type="Number"
                  conditions={{ required: true, maxLength: 100 }}
                />

                <Select
                  name="teaches"
                  label="Class"
                  register={register}
                  options={teachesOption}
                  values={teachesValue}
                />
                <Input
                  name="unit"
                  label="Unit"
                  register={register}
                  type="number"
                />
              </div>
            </div>
            <div className="row">
              <div className="w-50 text-center my-4 mx-auto">
                <Submit name="Create" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default CreateClass;
