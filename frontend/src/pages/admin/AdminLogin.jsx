import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
const AdminLogin = () => {
  const { register, handleSubmit } = useForm();
  const [successMessage, setSuccessMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const onSubmit = (data) => {
    console.log(data);
    axios
      .post("/api/admin/login", data)
      .then((data) => {
        if (data.status === 200) {
          setSuccessMessage("Successfully Logged in");
          setErrorMessage("");
        }
      })
      .catch((err) => {
        setSuccessMessage("");
        setErrorMessage("Invalid Credentials");
      });
  };

  return (
    <div className="card  w-50 mx-auto m-5 p-5">
      <div className="option-pane card-title d-flex flex-row justify-content-center ">
        <div className="display-6">Sign in (Admin) </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group mx-5 my-3">
          <label className="my-3 ">Username</label>
          <input
            type="text"
            className="form-control"
            {...register("username", { required: true, maxLength: 100 })}
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
        {errorMessage && (
          <div className="alert alert-danger text-center" role="alert">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="alert alert-success text-center" role="alert">
            {successMessage}
          </div>
        )}
        <div className="form-group text-center mx-5 my-3">
          <span>Not Having an account </span>
          <NavLink to={"auth/student/signup"}>Signup</NavLink>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
