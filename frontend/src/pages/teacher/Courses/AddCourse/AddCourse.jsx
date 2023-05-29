import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Store } from "react-notifications-component";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Loading from "../../../../components/Loading/Loading";
import Container from "../../../../components/Container/Container";
import Title from "../../../../components/forms/Title/Title";
import Input from "../../../../components/forms/Input/Input";
import Select from "../../../../components/forms/Select/Select";
import Submit from "../../../../components/forms/Submit/Submit";
import { useAuthContext } from "../../../../hooks/useAuthContext";

const AddCourse = () => {
  const { register, handleSubmit } = useForm();
  //error
  const [error, setError] = useState(null);
  //loading
  const [loading, setLoading] = useState(true);
  //navigation
  const navigate = useNavigate();

  //user details neeeds to be changed after authentication
  const auth = useAuthContext();
  const user = auth.user._id;

  //toast notification
  const notify = (option) => {
    if (option == "success") {
      Store.addNotification({
        title: "Success!",
        message: `New course has been added to your profile successfully`,
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
        message: `Error while adding  course`,
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

  //batches
  const [batch, setBatch] = useState([]);
  const [batchValue, setBatchValue] = useState([]);
  const [batchName, setBatchName] = useState([]);

  //courses
  const [course, setCourse] = useState([]);
  const [courseValue, setCourseValue] = useState([]);
  const [courseName, setCourseName] = useState([]);

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

  useEffect(() => {
    const loadData = () => {
      axios
        .get("/api/batches")
        .then((res) => {
          const batch = res.data;
          const start_year = batch.map(selectProps("start_year"));
          const end_year = batch.map(selectProps("end_year"));
          const batchName = start_year.map((start, index) => {
            return start + "-" + end_year[index];
          });
          const batchValue = batch.map(selectProps("_id"));
          setBatch(batch);
          setBatchName(batchName);
          setBatchValue(batchValue);
          axios.get("/api/courses").then((res) => {
            const course = res.data;
            const courseName = course.map(selectProps("name"));
            const courseValue = course.map(selectProps("_id"));
            setCourse(course);
            setCourseName(courseName);
            setCourseValue(courseValue);
            setLoading(false);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    loadData();
  }, []);

  const onSubmit = (data) => {
    data.teacher = user;
    axios
      .post("/api/teaches", data)
      .then((res) => {
        notify("success");
        navigate("/teacher/courses");
      })
      .catch((err) => {
        console.log(err);
        notify("error");
      });
  };

  if (loading) return <Loading />;
  else
    return (
      <div className="  w-100  m-2 ">
        <div className="option-pane">
          <Title title="Add a New course"></Title>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Select
            options={batchName}
            values={batchValue}
            label={"Batch"}
            name="batch"
            register={register}
          />

          <Select
            options={courseName}
            values={courseValue}
            label={"Course"}
            name="course"
            register={register}
          />
          <Select
            options={[1, 2, 3, 4, 5, 6, 7, 8]}
            values={[1, 2, 3, 4, 5, 6, 7, 8]}
            label={"Semester"}
            name="semester"
            register={register}
          />

          <div className="mx-auto my-5 text-center w-50">
            <Submit name={"Add"} />
          </div>
        </form>
      </div>
    );
};

export default AddCourse;
