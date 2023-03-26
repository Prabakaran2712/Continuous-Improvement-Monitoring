import { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
const TeacherLogin = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <div className="card  w-50 mx-auto m-5 p-5">
      <div className="option-pane card-title d-flex flex-row justify-content-center ">
        <div className="display-6">Sign in (Teacher) </div>
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
