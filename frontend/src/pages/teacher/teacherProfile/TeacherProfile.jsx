import React from "react";
import Container from "../../../components/Container/Container";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../../../hooks/useAuthContext";

export default function TeacherProfile() {
  const auth = useAuthContext();
  const [userData, setUserData] = useState({
    staff_id: "",
    name: "",
    email: "",
    phone_number: "",
    address: "",
    department: {
      _id: "",
      dept_name: "",
      dept_code: "",
    },
    courses: [],
  });

  const [isdisabled, setisdisabled] = useState(true);

  const handleEdit = () => {
    setisdisabled(!isdisabled);
  };

  const handleinputChange = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
    console.log(userData);
  };

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  useEffect(() => {
    console.log(auth);
    if (
      auth.isAuthenticated == false ||
      (auth.userType != "teacher" && auth.userType != "admin")
    ) {
      navigate("/teacher/login");
    }
    axios.get(`/api/teachers/${auth.user.staff_id}`).then((res) => {
      console.log("--", res.data);
      res.data.password = "";
      setUserData(res.data);
    });
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`/api/teachers/${auth.user.staff_id}`, userData)
      .then((res) => {
        console.log(res.data);
        res.data.password = "";
        setUserData(res.data);
        setisdisabled(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <div className="card">
        <div className="card-body">
          <h1 className="card-title">Teacher Profile</h1>
          <hr />
          <form onSubmit={handleUpdate}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                disabled={isdisabled}
                type="text"
                className="form-control"
                id="name"
                value={userData.name}
                onChange={handleinputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                disabled={isdisabled}
                type="email"
                className="form-control"
                id="email"
                value={userData.email}
                onChange={handleinputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="staffid" className="form-label">
                Staff ID
              </label>
              <input
                disabled={isdisabled}
                type="text"
                className="form-control"
                id="staff_id"
                value={userData.staff_id}
                onChange={handleinputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <textarea
                disabled={isdisabled}
                className="form-control"
                id="address"
                onChange={handleinputChange}
              >
                {userData?.address}
              </textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone Number
              </label>
              <input
                disabled={isdisabled}
                type="tel"
                className="form-control"
                id="phone_number"
                onChange={handleinputChange}
                value={userData.phone_number}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="department" className="form-label">
                Department
              </label>
              <input
                disabled={isdisabled}
                type="text"
                className="form-control"
                id="dept_name"
                value={userData?.department?.dept_name}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="departmentCode" className="form-label">
                Department Code
              </label>
              <input
                disabled={isdisabled}
                type="text"
                className="form-control"
                id="dept_code"
                value={userData?.department?.dept_code}
                onChange={handleinputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                disabled={isdisabled}
                type="text"
                className="form-control"
                id="password"
                value={userData?.password}
                onChange={handleinputChange}
              />
            </div>
            <div className="mb-3">
              <button
                className="btn btn-secondary m-2 w-25"
                type="button"
                onClick={handleEdit}
              >
                Edit
              </button>
              <button className="btn btn-primary w-25 m-2" type="submit">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
}
