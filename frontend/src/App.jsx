import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

//pages
import Home from "./pages/Home";
import RootLayout from "./layouts/RootLayout";
import StudentRegister from "./pages/student/StudentRegister";

//bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import StudentLogin from "./pages/student/StudentLogin";
import About from "./pages/about/About";
import AdminLogin from "./pages/admin/AdminLogin";
import TeacherLogin from "./pages/teacher/TeacherLogin";

function App() {
  const router = createBrowserRouter([
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
                  element: <StudentRegister />,
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
  ]);
  return <RouterProvider router={router} />;
}

export default App;
