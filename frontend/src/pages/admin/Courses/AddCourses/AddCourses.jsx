import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Store } from "react-notifications-component";

//form elements
import Input from "../../../../components/forms/Input/Input";
import Select from "../../../../components/forms/Select/Select";
import Title from "../../../../components/forms/Title/Title";
import Submit from "../../../../components/forms/Submit/Submit";

const AddCourses = () => {
  const { register, handleSubmit } = useForm();
  //error
  const [error, setError] = useState(null);
  //loading
  const [loading, setLoading] = useState(true);
  //navigation
  const navigate = useNavigate();
  //toast notification
  const notify = (option) => {
    if (option == "success") {
      Store.addNotification({
        title: "Success!",
        message: `New course has been created successfully`,
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
        message: `Error while creating new course`,
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

  const [department, setDepartment] = useState([]);
  const [departmentNames, setDepartmentNames] = useState([]);
  const [departmentValues, setDepartmentValues] = useState([]);

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
    const loadData = async () => {
      await axios
        .get("/api/departments")
        .then((res) => {
          console.log(res.data);
          setDepartment(res.data);
          setDepartmentNames(res.data.map(selectProps("dept_name")));
          setDepartmentValues(res.data.map(selectProps("_id")));
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    loadData();
  }, []);

  const onSubmit = (data) => {
    console.log(data);
    axios
      .post("/api/courses", data)
      .then((res) => {
        notify("success");
        navigate("/teacher/course");
      })
      .catch((err) => {
        notify("error");
        console.log(err.response.data.message);
      });
  };

  if (loading)
    return (
      <div className="  w-50 mx-2  my-5 ">
        <div className="option-pane">
          <Title title="Loading"></Title>
        </div>
      </div>
    );
  else
    return (
      <div className="col-10 h-100 overflow-scroll">
        <div className="  w-50 mx-auto my-5  ">
          <div className="option-pane">
            <Title title="Add a New course"></Title>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              register={register}
              name="name"
              label="Course Name"
              type="text"
              conditions={{ required: true, maxLength: 100 }}
            />
            <Input
              register={register}
              name="subject_code"
              label="Subject Code"
              type="text"
              conditions={{ required: true, maxLength: 100 }}
            />
            <Input
              register={register}
              name="credits"
              label="Credits"
              type="number"
              conditions={{ required: true, maxLength: 100 }}
            />

            <Select
              options={departmentNames}
              values={departmentValues}
              label={"Department"}
              name="department"
              register={register}
              attr="dept_name"
            />
            <div className="mx-auto my-5 text-center">
              <Submit name={"Add"} />
            </div>
          </form>
        </div>
      </div>
    );
};

export default AddCourses;
