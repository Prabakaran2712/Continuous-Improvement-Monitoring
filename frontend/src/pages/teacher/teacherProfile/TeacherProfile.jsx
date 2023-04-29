import React from "react";
import Container from "../../../components/Container/Container";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../../../hooks/useAuthContext";

export default function TeacherProfile() {
  const auth = useAuthContext();
  const [userData, setUserData] = useState({});

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
  }, [auth]);

  return (
    <Container>
      <div class="card">
        <div class="card-body">
          <h1 class="card-title">Teacher Profile</h1>
          <hr />
          <form>
            <div class="mb-3">
              <label for="name" class="form-label">
                Name
              </label>
              <input
                type="text"
                class="form-control"
                id="name"
                value={userData.name}
                disabled
              />
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">
                Email
              </label>
              <input
                type="email"
                class="form-control"
                id="email"
                value={userData.email}
                disabled
              />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">
                Password
              </label>
              <input
                type="password"
                class="form-control"
                id="password"
                value={userData.password}
                disabled
              />
            </div>
            <div class="mb-3">
              <label for="staffid" class="form-label">
                Staff ID
              </label>
              <input
                type="text"
                class="form-control"
                id="staffid"
                value={userData.staff_id}
                disabled
              />
            </div>
            <div class="mb-3">
              <label for="address" class="form-label">
                Address
              </label>
              <textarea class="form-control" id="address" disabled>
                {userData.address}
              </textarea>
            </div>
            <div class="mb-3">
              <label for="phone" class="form-label">
                Phone Number
              </label>
              <input
                type="tel"
                class="form-control"
                id="phone"
                value={userData.phone_number}
                disabled
              />
            </div>
            <div class="mb-3">
              <label for="courses" class="form-label">
                Courses
              </label>
              <ul class="list-group" id="courses">
                {userData?.courses?.length == 0 && (
                  <li class="list-group-item">No courses assigned</li>
                )}
                {userData?.courses?.map((course) => {
                  return <li class="list-group-item">{course}</li>;
                })}
              </ul>
            </div>
            <div class="mb-3">
              <label for="department" class="form-label">
                Department
              </label>
              <input
                type="text"
                class="form-control"
                id="department"
                value={userData?.department?.dept_name}
                disabled
              />
            </div>
            <div class="mb-3">
              <label for="departmentCode" class="form-label">
                Department Code
              </label>
              <input
                type="text"
                class="form-control"
                id="departmentCode"
                value={userData?.department?.dept_code}
                disabled
              />
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
}
