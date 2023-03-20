import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
const StudentRegister = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    // alert(JSON.stringify(data));
    axios
      .post("http://localhost:3000/api/students", data)
      .then((data) => {
        alert("Student Registered Successfully");
      })
      .catch((err) => {
        alert("Error in registering student");
      });
  };
  const [deptList, setdeptList] = useState([]);
  useEffect(() => {
    return () => {
      axios
        .get("http://localhost:3000/api/departments")
        .then((data) => {
          console.log(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
  }, []);

  return (
    <div className="card  w-50 mx-auto m-5 p-5">
      <div className="option-pane card-title d-flex flex-row justify-content-center ">
        <div className="display-6">Sign up (Student) </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group mx-5 my-3">
          <label className="my-3 ">Name</label>
          <input
            type="text"
            className="form-control "
            {...register("name", { required: true, maxLength: 100 })}
          />
        </div>
        <div className="form-group mx-5 my-3">
          <label className="my-3 ">Roll Number</label>
          <input
            type="text"
            className="form-control "
            {...register("roll_number", { required: true, maxLength: 100 })}
          />
        </div>
        <div className="form-group mx-5 my-3">
          <label className="my-3 ">Phone Number</label>
          <input
            type="text"
            className="form-control "
            {...register("phone", { required: true, maxLength: 100 })}
          />
        </div>
        {/* department */}
        {/* batch */}
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
            value="Register"
          />
        </div>
        <div className="form-group text-center mx-5 my-3">
          <span>Already Having an account </span>
          <NavLink to={"auth/student/signin"}>Signin</NavLink>
        </div>
      </form>
    </div>
  );
};

export default StudentRegister;
