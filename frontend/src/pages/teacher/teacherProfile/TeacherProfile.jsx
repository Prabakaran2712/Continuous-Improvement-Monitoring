import React from "react";
import Container from "../../../components/Container/Container";
import { useState } from "react";

export default function TeacherProfile() {
  const [userData, setUserData] = useState({
    name: "Kee Pauk",
    email: "keelpauk@gmail.com",
    password: "password",
    staffID: "123456",
    department: "CSE",
    courses: ["CSE 101", "CSE 102", "CSE 103", "CSE 104", "CSE 105"],
    phone: "1234567890",
    address: "Kathmandu, Nepal",
  });
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
                readonly
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
                readonly
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
                readonly
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
                value={userData.staffID}
                readonly
              />
            </div>
            <div class="mb-3">
              <label for="address" class="form-label">
                Address
              </label>
              <textarea class="form-control" id="address" readonly>
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
                value={userData.phone}
                readonly
              />
            </div>
            <div class="mb-3">
              <label for="courses" class="form-label">
                Courses
              </label>
              <ul class="list-group" id="courses">
                {userData.courses.map((course) => {
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
                value={userData.department}
                readonly
              />
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
}
