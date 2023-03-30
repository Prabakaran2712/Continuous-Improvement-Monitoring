//packages
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { AuthContextProvider } from "./context/AuthContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//pages
import Home from "./pages/Home";
import RootLayout from "./layouts/RootLayout";
import StudentRegister from "./pages/student/StudentRegister";

//bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

//layouts
import StudentLayout from "./layouts/StudentLayout/StudentLayout";
import AdminLayout from "./layouts/AdminLayout";
import TeacherLayout from "./layouts/TeacherLayout/TeacherLayout";
import TestLayout from "./layouts/TestLayout/TestLayout";

//pages
import Dashboard from "./pages/teacher/Dashboard";
import Marks from "./pages/teacher/Marks";
import Attendance from "./pages/teacher/Attendance";
import Notifications from "./pages/teacher/Notifications";
import TeacherSignup from "./pages/teacher/teacherSignup/TeacherSignup";
import Courses from "./pages/admin/Courses/Courses";
import UpdateCourses from "./pages/admin/Courses/UpdateCourses";
import AddCourses from "./pages/admin/Courses/AddCourses/AddCourses";
import TeacherLogin from "./pages/teacher/teacherLogin/TeacherLogin";
import CreateClass from "./pages/teacher/CreateClass/CreateClass";
import Class from "./pages/teacher/Class/Class";
import StudentDasboard from "./pages/student/StudentDasboard/StudentDasboard";
import StudentLogin from "./pages/student/StudentLogin";
import About from "./pages/about/About";
import AdminLogin from "./pages/admin/AdminLogin";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <RootLayout />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "auth",
            children: [
              {
                path: "student",
                children: [
                  {
                    path: "signin",
                    element: <StudentLogin />,
                  },
                  {
                    path: "signup",
                    element: <StudentRegister />,
                  },
                  {
                    path: "dashboard",
                    element: <StudentRegister />,
                  },
                  {
                    path: "marks",
                    element: <StudentRegister />,
                  },
                ],
              },
              {
                path: "teacher",
                children: [
                  {
                    path: "signin",
                    element: <TeacherLogin />,
                  },
                  {
                    path: "signup",
                    element: <TeacherSignup />,
                  },
                ],
              },
              {
                path: "admin",
                children: [
                  {
                    path: "signin",
                    element: <AdminLogin />,
                  },
                  {
                    path: "signup",
                    element: <StudentRegister />,
                  },
                ],
              },
            ],
          },
          {
            path: "about",
            element: <About />,
          },
        ],
        errorElement: <Home />,
      },
      {
        path: "/test",
        element: <TestLayout />,
        children: [
          {
            path: "Dashboard",
            element: <StudentDasboard />,
          },
        ],
      },
      {
        path: "/student",
        element: <StudentLayout />,
        children: [
          {
            path: "dashboard",
            element: <StudentDasboard />,
          },
        ],
      },
      {
        path: "/admin",
        element: <AdminLayout />,
      },
      {
        path: "teacher",
        element: <TeacherLayout />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "marks",
            element: <Marks />,
          },
          {
            path: "attendance",
            element: <Attendance />,
          },
          {
            path: "notifications",
            element: <Notifications />,
          },
          {
            path: "class",
            children: [
              {
                path: "",
                element: <Class />,
              },
              {
                path: "create",
                element: <CreateClass />,
              },
              {
                path: "update",
                element: <CreateClass />,
              },
              {
                path: "delete",
                element: <CreateClass />,
              },
            ],
          },
          {
            path: "course",
            children: [
              {
                path: "",
                element: <Courses />,
              },
              {
                path: "add",
                element: <AddCourses />,
              },
              {
                path: "update:id",
                element: <UpdateCourses />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ReactNotifications />
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);
