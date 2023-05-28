import React from "react";
import Container from "../../../components/Container/Container";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../../../hooks/useAuthContext";

export default function StudentProfile() {
  const auth = useAuthContext();
  const [userData, setUserData] = useState({
    roll_number: "",
    name: "",
    email: "",
    phone: "",
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
    if (auth.isAuthenticated == false || auth.userType != "student") {
      navigate("/student/login");
    }
    axios.get(`/api/students/${auth.user._id}`).then((res) => {
      console.log("--", res.data);
      res.data.password = "";
      setUserData(res.data);
    });
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`/api/students/${auth.user._id}`, userData)
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
          <h1 className="card-title">Student Profile</h1>
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
                Roll number
              </label>
              <input
                disabled={isdisabled}
                type="text"
                className="form-control"
                id="staff_id"
                value={userData.roll_number}
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
                id="phone"
                onChange={handleinputChange}
                value={userData.phone}
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
