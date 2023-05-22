import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { Store } from "react-notifications-component";
import axios from "axios";
import { useAuthContext } from "../../../hooks/useAuthContext";

const TeacherLogin = () => {
  const { register, handleSubmit } = useForm();
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const auth = useAuthContext();

  useEffect(() => {
    console.log(auth);
    if (
      auth.isAuthenticated == true &&
      (auth.userType == "teacher" || auth.userType == "admin")
    ) {
      navigate("/teacher/dashboard");
    }
  }, [auth]);
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
      .post("/api/teachers/login", data)
      .then((res) => {
        console.log("ut" + res.data.userType);
        dispatch({
          type: "LOGIN",
          payload: res.data.user,
          userType: res.data.userType,
        });
        notify("success");
        console.log("redirect");
        navigate("/teacher");
      })
      .catch((err) => {
        dispatch({ type: "LOGOUT" });
        notify("error");
        console.log(err);
      });
  };

  return (
    <div className="card  w-50 mx-auto m-5 p-5">
      <div className="option-pane card-title d-flex flex-row justify-content-center ">
        <div className="display-6">Staff Login </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group mx-5 my-3">
          <label className="my-3 ">Email address</label>
          <input
            type="email"
            className="form-control"
            {...register("email", { required: true, maxLength: 100 })}
          />
        </div>
        <div className="form-group mx-5 my-3">
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
          <NavLink to={"/auth/teacher/signup"}>Signup</NavLink>
        </div>
      </form>
    </div>
  );
};

export default TeacherLogin;
