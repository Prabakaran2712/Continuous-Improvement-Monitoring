import { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Store } from "react-notifications-component";
import axios from "axios";

const StudentAuth = () => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState();

  //navigate
  const navigate = useNavigate();

  //notifications
  const notify = (option) => {
    if (option == "success") {
      Store.addNotification({
        title: "Success!",
        message: `Successfully Logged in! 😇`,
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
        message: `Invalid Creditionsals😢`,
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

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3000/api/students/login", data)
      .then((data) => {
        console.log(res);
        notify("success");
        navigate("/student/dashboard");
      })
      .catch((err) => {
        console.log(err);
        notify("error");
      });
  };

  return (
    <div className="card  w-50 mx-auto m-5 p-5">
      <div className="option-pane card-title d-flex flex-row justify-content-center ">
        <div className="display-6">Sign in (Student) </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group mx-5 my-3">
          <label className="my-3 ">Email address</label>
          <input
            type="email"
            className="form-control "
            {...register("email", { required: true, maxLength: 100 })}
          />
        </div>
        <div className="form-group mx-5 my-3 ">
          <label className="my-3">Password</label>
          <input
            type={"password"}
            className="form-control"
            {...register("password", { required: true })}
          />
        </div>
        <div className="form-group text-center mx-5 my-3">
          <input
            type="submit"
            className="btn btn-outline-dark  form-control w-25 my-3"
            value="login"
          />
        </div>

        <div className="form-group text-center mx-5 my-3">
          <span>Not Having an account </span>
          <NavLink to="/auth/student/signup">Student</NavLink>
        </div>
      </form>
    </div>
  );
};

export default StudentAuth;
