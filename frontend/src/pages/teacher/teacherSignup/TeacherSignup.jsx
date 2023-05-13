import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Store } from "react-notifications-component";

//form elements
import Input from "../../../components/forms/Input/Input";
import Select from "../../../components/forms/Select/Select";
const TeacherSignup = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  //getting data for department and course
  const [department, setDepartment] = useState([]);
  const [courses, setCourses] = useState([]);
  const [departmentNames, setDepartmentNames] = useState([]);
  const [departmentValues, setDepartmentValues] = useState([]);
  const [courseNames, setCourseNames] = useState([]);
  const [courseValues, setCourseValues] = useState([]);

  //notifications
  const notify = (option) => {
    if (option == "success") {
      Store.addNotification({
        title: "Success!",
        message: `Welcome aboard! 😇`,
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
        message: `Error while Registering 😢`,
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
    const loadData = async () => {
      await axios
        .get("/api/departments")
        .then((res) => {
          setDepartment(res.data);
          setDepartmentNames(res.data.map(selectProps("dept_name")));
          setDepartmentValues(res.data.map(selectProps("_id")));
        })
        .catch((err) => {
          console.log(err);
        });
      await axios
        .get("/api/courses")
        .then((res) => {
          setCourses(res.data);
          setCourseNames(res.data.map(selectProps("subject_code")));
          setCourseValues(res.data.map(selectProps("_id")));
        })
        .catch((err) => {
          console.log(err);
        });
    };
    loadData();
  }, []);
  function selectProps(...props) {
    return function (obj) {
      const newObj = [];
      props.forEach((name) => {
        newObj.push(obj[name]);
      });

      return newObj;
    };
  }

  const onSubmit = (data) => {
    axios
      .post("/api/teachers", data)
      .then((res) => {
        console.log(res);
        navigate("/teacher/dashboard");
        notify("success");
      })
      .catch((err) => {
        notify("error");
        console.log(err);
      });
  };
  return (
    <div className="card  w-75 mx-auto m-5 p-5 shadow rounded">
      <div className="option-pane card-title d-flex flex-row justify-content-center ">
        <div className="display-6">Sign up (Teacher) </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col">
            <Input
              register={register}
              name="name"
              label="Name"
              type="text"
              conditions={{ required: true, maxLength: 100 }}
            ></Input>
            <Input
              register={register}
              name="email"
              label="Email"
              type="email"
              conditions={{ required: true, maxLength: 100 }}
            ></Input>

            <Input
              register={register}
              name="password"
              label="Password"
              type="password"
              conditions={{ required: true, maxLength: 100 }}
            ></Input>
            <Input
              register={register}
              name="cpassword"
              label="Confirm Password"
              type="password"
              conditions={{ required: true, maxLength: 100 }}
            ></Input>
            <Input
              register={register}
              name="staff_id"
              label="Staff Id"
              type="text"
              conditions={{ required: true, maxLength: 100 }}
            ></Input>
            <Input
              register={register}
              name="city"
              label="City"
              type="text"
              conditions={{ required: true, maxLength: 100 }}
            ></Input>

            <Input
              register={register}
              name="state"
              label="State"
              type="text"
              conditions={{ required: true, maxLength: 100 }}
            ></Input>
            <Input
              register={register}
              name="country"
              label="Country"
              type="text"
              conditions={{ required: true, maxLength: 100 }}
            ></Input>
          </div>
          <div className="col">
            <Input
              register={register}
              name="pincode"
              label="Pincode"
              type="text"
              conditions={{ required: true, maxLength: 100 }}
            ></Input>
            <Input
              register={register}
              name="address_line_1"
              label="Address Line-1"
              type="text"
              conditions={{ required: true, maxLength: 100 }}
            ></Input>

            <div className="form-group  mx-5 my-3">
              <label className="my-3">Address Line-1</label>
              <input
                type="text"
                className="  form-control "
                {...register("address_line_1", { required: true })}
              />
            </div>
            <div className="form-group  mx-5 my-3">
              <label className="my-3">Address Line-2</label>
              <input
                type="text"
                className="form-control "
                {...register("address_line_2", { required: true })}
              />
            </div>
            <div className="form-group  mx-5 my-3">
              <label className="my-3">Phone Number</label>
              <input
                type="text"
                className="form-control "
                {...register("phone_number", { required: true })}
              />
            </div>
            <Select
              options={departmentNames}
              values={departmentValues}
              label={"Department"}
              name="department"
              register={register}
              attr="dept_name"
            />
            <Select
              options={courseNames}
              values={courseValues}
              label={"Courses"}
              name="courses"
              register={register}
              attr="subject_code"
            />
          </div>
        </div>
        <div className="form-group  mx-5 my-3 text-center">
          <input
            type="submit"
            className="form-control btn btn-outline-dark w-50 shadow"
            value={"Register"}
          />
        </div>

        <div className="form-group text-center">
          <span>Already a having an account </span>
          <NavLink to="/auth/teacher/signin">Signin</NavLink>
        </div>
      </form>
    </div>
  );
};

export default TeacherSignup;
