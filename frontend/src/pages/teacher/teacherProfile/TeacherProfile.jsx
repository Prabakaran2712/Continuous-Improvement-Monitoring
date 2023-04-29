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
      setUserData(res.data);
    });
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`/api/teachers/${auth.user.staff_id}`, userData)
      .then((res) => {
        console.log(res.data);
        setUserData(res.data);
        setisdisabled(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <div class="card">
        <div class="card-body">
          <h1 class="card-title">Teacher Profile</h1>
          <hr />
          <form onSubmit={handleUpdate}>
            <div class="mb-3">
              <label for="name" class="form-label">
                Name
              </label>
              <input
                disabled={isdisabled}
                type="text"
                class="form-control"
                id="name"
                value={userData.name}
                onChange={handleinputChange}
              />
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">
                Email
              </label>
              <input
                disabled={isdisabled}
                type="email"
                class="form-control"
                id="email"
                value={userData.email}
                onChange={handleinputChange}
              />
            </div>
            <div class="mb-3">
              <label for="staffid" class="form-label">
                Staff ID
              </label>
              <input
                disabled={isdisabled}
                type="text"
                class="form-control"
                id="staff_id"
                value={userData.staff_id}
                onChange={handleinputChange}
              />
            </div>
            <div class="mb-3">
              <label for="address" class="form-label">
                Address
              </label>
              <textarea
                disabled={isdisabled}
                class="form-control"
                id="address"
                onChange={handleinputChange}
              >
                {userData?.address}
              </textarea>
            </div>
            <div class="mb-3">
              <label for="phone" class="form-label">
                Phone Number
              </label>
              <input
                disabled={isdisabled}
                type="tel"
                class="form-control"
                id="phone_number"
                onChange={handleinputChange}
                value={userData.phone_number}
              />
            </div>

            <div class="mb-3">
              <label for="department" class="form-label">
                Department
              </label>
              <input
                disabled={isdisabled}
                type="text"
                class="form-control"
                id="dept_name"
                value={userData?.department?.dept_name}
              />
            </div>
            <div class="mb-3">
              <label for="departmentCode" class="form-label">
                Department Code
              </label>
              <input
                disabled={isdisabled}
                type="text"
                class="form-control"
                id="dept_code"
                value={userData?.department?.dept_code}
              />
            </div>
            <div class="mb-3">
              <button
                class="btn btn-secondary m-2 w-25"
                type="button"
                onClick={handleEdit}
              >
                Edit
              </button>
              <button class="btn btn-primary w-25 m-2" type="submit">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
}
