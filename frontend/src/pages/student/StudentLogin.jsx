import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Store } from "react-notifications-component";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";

const StudentLogin = () => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const { user, dispatch } = useAuthContext();

  //navigate
  const navigate = useNavigate();
  const auth = useAuthContext();

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

  useEffect(() => {
    if (auth.isAuthenticated == true && auth.userType == "student") {
      navigate("/student");
    }
  }, [user]);

  const onSubmit = (data) => {
    axios
      .post("/api/students/login", data)
      .then((data) => {
        localStorage.setItem("token", data.data.token);
        dispatch({
          type: "LOGIN",
          payload: data.data.user,
          userType: "student",
        });
        console.log(user);
        notify("success");
        navigate("/student/dashboard");
      })
      .catch((err) => {
        setError(err.response.data.message);
        dispatch({ type: "LOGOUT" });
        notify("error");
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card  w-50 mx-auto m-5 p-5">
      <div className="option-pane card-title d-flex flex-row justify-content-center ">
        <div className="display-6">Student Login </div>
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
        {error && (
          <div className="alert alert-danger mx-auto mt-3 text-center w-75">
            {error}
          </div>
        )}
        <div className="form-group text-center mx-5 my-3">
          <span>Not Having an account </span>
          <NavLink to="/auth/student/signup">Student</NavLink>
        </div>
      </form>
    </div>
  );
};
export default StudentLogin;
