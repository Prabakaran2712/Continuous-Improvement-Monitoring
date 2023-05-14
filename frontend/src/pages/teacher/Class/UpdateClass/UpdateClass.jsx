//importing libraries
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import axios from "axios";
import { Store } from "react-notifications-component";

//importing components
import Container from "../../../../components/Container/Container";
import Title from "../../../../components/forms/Title/Title";
import DateComponent from "../../../../components/forms/Date/DateComponent";
import Input from "../../../../components/forms/Input/Input";
import Submit from "../../../../components/forms/Submit/Submit";
import TimeComponent from "../../../../components/forms/Time/TimeComponent";
import Select from "../../../../components/forms/Select/Select";
import Loading from "../../../../components/Loading/Loading";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";

const UpdateClass = () => {
  const { register, handleSubmit, setValue } = useForm();
  const [classDate, setClassDate] = useState();
  const [classTime, setClassTime] = useState();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [teachesOption, setTeachesOption] = useState([]);
  const [teachesValue, setTeachesValue] = useState([]);
  const auth = useAuthContext();
  const user = auth.user._id;

  const { id } = useParams();
  const navigate = useNavigate();

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
        message: `Class has been modified successfully`,
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
        message: `Error while modifying Class`,
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
      console.log(teachesOption);
      axios
        .get(`/api/classes/${id}`)
        .then((res) => {
          console.log(res.data);
          setValue("topic", res.data.topic);
          setValue("duration", res.data.duration);
          setValue("unit", res.data.unit);
          setValue("teaches", res.data.teaches._id);

          setClassTime(moment(res.data.time, "hh:mm a"));
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, []);
  const onSubmit = (data) => {
    data.date = classDate.$d;
    //get only time from examTime
    data.time = classTime.format("hh:mm A");

    //send data to backend
    axios
      .put(`/api/classes/${id}`, data)
      .then((res) => {
        notify("success");
        navigate("/teacher/class/" + id);
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
      <div className="  w-100 mx-auto my-lg-4  my-sm-3 ">
        <div className="header mx-5">
          <Title title="Create Class" />
        </div>
        <div className="form-body w-lg-75  mx-lg-5 my-lg-3 my-sm-2">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-lg-6 col-md-12">
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
              <div className="col-lg-6 col-md-12">
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
                <Submit name="Update" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default UpdateClass;
