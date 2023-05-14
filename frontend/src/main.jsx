//packages
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { AuthContextProvider } from "./context/AuthContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

//pages
import Home from "./pages/Home/Home";
import RootLayout from "./layouts/RootLayout";
import StudentRegister from "./pages/student/StudentRegister";

//bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

//layouts
import StudentLayout from "./layouts/StudentLayout/StudentLayout";
import TeacherLayout from "./layouts/TeacherLayout/TeacherLayout";

//pages
import Dashboard from "./pages/teacher/Dashboard/Dashboard";
import Marks from "./pages/teacher/Marks";
import Attendance from "./pages/teacher/Attendance";
import Notifications from "./pages/teacher/Notifications";
import TeacherSignup from "./pages/teacher/teacherSignup/TeacherSignup";
import TeacherProfile from "./pages/teacher/teacherProfile/TeacherProfile";
import Courses from "./pages/admin/Courses/Courses";
import UpdateCourses from "./pages/admin/Courses/UpdateCourses";
import AddCourses from "./pages/admin/Courses/AddCourses/AddCourses";
import TeacherLogin from "./pages/teacher/teacherLogin/TeacherLogin";
import CreateClass from "./pages/teacher/Class/CreateClass/CreateClass";
import ViewClass from "./pages/teacher/Class/ViewClass/ViewClass";
import StudentDasboard from "./pages/student/StudentDasboard/StudentDasboard";
import StudentLogin from "./pages/student/StudentLogin";
import About from "./pages/about/About";
import TeacherCourses from "./pages/teacher/Courses/CourseList/CourseList";
import ViewCourse from "./pages/teacher/Courses/ViewCourse/ViewCourse";
import AddCourse from "./pages/teacher/Courses/AddCourse/AddCourse";
import ViewStudentCourses from "./pages/student/Courses/ViewStudentCourses";
import CreateExam from "./pages/teacher/Exam/CreateExam/CreateExam";
import ViewExam from "./pages/teacher/Exam/ViewExam/ViewExam";
import ExamDetails from "./pages/teacher/Exam/ExamDetails/ExamDetails";
import ClassDetails from "./pages/teacher/Class/ClassDetails/ClassDetails";
import ViewStudents from "./pages/teacher/ViewStudents/ViewStudents";
import StudentDetails from "./pages/teacher/StudentDetails/StudentDetails";
import SubjectMarkAnalytics from "./pages/teacher/SubjectMarkAnalytics/SubjectMarkAnalytics";
import Grade from "./pages/teacher/Grade/Grade";
import ViewGrade from "./pages/student/ViewGrade/ViewGrade";
import ViewStudentMarks from "./pages/student/ViewStudentMarks/ViewStudentMarks";
import ViewChats from "./pages/student/ViewChats/ViewChats";
import Logout from "./pages/Logout/Logout";
import Chat from "./pages/student/Chat/Chat";
import ViewChatsTeacher from "./pages/teacher/ViewChats/ViewChats";
import CourseDetails from "./pages/student/CourseDetails/CourseDetails";
import CreateChat from "./pages/Chat/CreateChat/CreateChat";
import ViewStudentAttendance from "./pages/student/ViewStudentAttendance/ViewStudentAttendance";
import AttendanceDetails from "./pages/student/AttendanceDetails/AttendanceDetails";
import UpdateExam from "./pages/teacher/Exam/UpdateExam/UpdateExam";
import TeacherCourseDetails from "./pages/teacher/Courses/CourseDetails/CourseDetails";
import SubjectAttendanceAnalytics from "./pages/teacher/Courses/SubjectAttendanceAnalytics/SubjectAttendanceAnalytics";
import SubjectClasses from "./pages/teacher/Class/SubjectClasses/SubjectClasses";

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
        path: "student",
        element: <StudentLayout />,
        children: [
          {
            path: "dashboard",
            element: <StudentDasboard />,
          },
          {
            path: "courses",
            element: <ViewStudentCourses />,
          },
          {
            path: "course/:id",
            element: <CourseDetails />,
          },

          {
            path: "grades",
            element: <ViewGrade />,
          },
          {
            path: "marks",
            element: <ViewStudentMarks />,
          },
          {
            path: "createChat",
            element: <CreateChat />,
          },
          {
            path: "chats",
            element: <ViewChats />,
          },
          {
            path: "attendance",
            element: <ViewStudentAttendance />,
          },
          {
            path: "attendance/:id",
            element: <AttendanceDetails />,
          },
          {
            path: "chat/:id",
            element: <Chat />,
          },

          {
            path: "logout",
            element: <Logout />,
          },
        ],
      },

      {
        path: "teacher",
        element: <TeacherLayout />,
        children: [
          {
            path: "profile",
            element: <TeacherProfile />,
          },

          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "marks",
            children: [
              {
                path: "subject/:id",
                element: <SubjectMarkAnalytics />,
              },
            ],
          },
          {
            path: "exams",
            children: [
              {
                path: "",
                element: <ViewExam />,
              },
              {
                path: ":id",
                element: <ExamDetails />,
              },
              {
                path: "create",
                element: <CreateExam />,
              },
              {
                path: "update/:id",
                element: <UpdateExam />,
              },
            ],
          },
          {
            path: "grades/:id",
            element: <Grade />,
          },
          {
            path: "subject/:id",
            element: <SubjectMarkAnalytics />,
          },
          {
            path: "student/:id",
            element: <StudentDetails />,
          },
          {
            path: "students",
            element: <ViewStudents />,
          },
          {
            path: "createExam",
            element: <CreateExam />,
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
            path: "courses",
            children: [
              { path: "", element: <TeacherCourses /> },
              {
                path: "add",
                element: <AddCourse />,
              },
              {
                path: ":id",
                element: <TeacherCourseDetails />,
              },
              {
                path: "view/:id",
                element: <ViewCourse />,
              },
            ],
          },
          {
            path: "chats",
            element: <ViewChatsTeacher />,
          },
          {
            path: "chat/:id",
            element: <Chat />,
          },

          //view course on id

          {
            path: "class",
            children: [
              {
                path: "",
                element: <ViewClass />,
              },
              {
                path: ":id",
                element: <ClassDetails />,
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
              {
                path: "subject/:id",
                element: <SubjectClasses />,
              },
            ],
          },
          {
            path: "attendance",
            children: [
              {
                path: "subject/:id",
                element: <SubjectAttendanceAnalytics />,
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
          {
            path: "logout",
            element: <Logout />,
          },
          {
            path: "createChat",
            element: <CreateChat />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ReactNotifications />
      <RouterProvider router={router} />
    </LocalizationProvider>
  </AuthContextProvider>
);
