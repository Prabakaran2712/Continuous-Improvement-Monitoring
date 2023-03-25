import { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, Link } from "react-router-dom";
const TeacherSignup = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (e, data) => {
    e.preventDefault();
    console.log(data);
  };
  return (
    <div className="card  w-75 mx-auto m-5 p-5 shadow rounded">
      <div className="option-pane card-title d-flex flex-row justify-content-center ">
        <div className="display-6">Sign up (Teacher) </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col">
            <div className="form-group mx-5 my-3">
              <label className="my-3 ">Name</label>
              <input
                type="text"
                className="form-control "
                {...register("name", { required: true, maxLength: 100 })}
              />
            </div>
            <div className="form-group mx-5 my-3 ">
              <label className="my-3">Email</label>
              <input
                type="email"
                className="form-control"
                {...register("email", { required: true })}
              />
            </div>
            <div className="form-group  mx-5 my-3">
              <label className="my-3">Password</label>
              <input
                type="password"
                className="form-control"
                {...register("password", { required: true })}
              />
            </div>

            <div className="form-group  mx-5 my-3">
              <label className="my-3">Confirm Password</label>
              <input
                type="password"
                className="form-control "
                {...register("cpassword", { required: true })}
              />
            </div>
            <div className="form-group  mx-5 my-3">
              <label className="my-3">Staff Id</label>
              <input
                type="text"
                className="form-control "
                {...register("staff_id", { required: true })}
              />
            </div>
            <div className="form-group  mx-5 my-3">
              <label className="my-3">City</label>
              <input
                type="text"
                className="  form-control "
                {...register("city", { required: true })}
              />
            </div>
            <div className="form-group  mx-5 my-3">
              <label className="my-3">State</label>
              <input
                type="text"
                className=" form-control "
                {...register("state", { required: true })}
              />
            </div>
            <div className="form-group  mx-5 my-3">
              <label className="my-3">Country</label>
              <input
                type="text"
                className="  form-control "
                {...register("country", { required: true })}
              />
            </div>
          </div>
          <div className="col">
            <div className="form-group  mx-5 my-3">
              <label className="my-3">Pincode</label>
              <input
                type="text"
                className="form-control "
                {...register("pincode", { required: true })}
              />
            </div>
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
            <div className="form-group  mx-5 my-3">
              <label className="my-3">Courses</label>
              <input
                type="text"
                className="form-control "
                {...register("courses", { required: true })}
              />
            </div>
            <div className="form-group  mx-5 my-3">
              <label className="my-3">Department</label>
              <input
                type="text"
                className="form-control "
                {...register("department", { required: true })}
              />
            </div>
          </div>
        </div>
        <div className="form-group  mx-5 my-3">
          <input type="submit" className="form-control " value={"Register"} />
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
