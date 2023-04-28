import { Outlet } from "react-router";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SideBar from "../../components/forms/Sidebar/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faEnvelope,
  faEnvelopesBulk,
  faHouse,
  faUser,
  faPen,
  faRightFromBracket,
  faSchool,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "../../hooks/useAuthContext";

//styles
import styles from "./TeacherLayout.module.css";
import axios from "axios";

const TeacherLayout = () => {
  const [loading, setLoading] = useState(true);
  const { dispatch } = useAuthContext();
  const logout = () => {
    console.log("logout");
    axios
      .get("/api/teachers/logout")
      .then((res) => {
        dispatch({ type: "LOGOUT" });
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const auth = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    if (
      auth.isAuthenticated === false ||
      (auth.userType !== "teacher" && auth.userType !== "admin")
    ) {
      console.log("not authenticated");
      navigate("/auth/teacher/signin");
    }

    console.log("teacher layout");
    console.log(auth);

    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (auth.userType === "teacher") {
    return (
      <div
        style={{ height: "100%", width: "100%" }}
        className={`row m-0 g-0 ${styles.bg}`}
      >
        <SideBar
          elements={[
            {
              name: "Dashboard",
              link: "/teacher/dashboard",
              icon: <FontAwesomeIcon icon={faHouse} size="sm" />,
            },
            {
              name: "Marks",
              link: "/teacher/marks",
              icon: <FontAwesomeIcon icon={faStar} size="sm" />,
            },
            {
              name: "Exams",
              link: "/teacher/exams",
              icon: <FontAwesomeIcon icon={faPen} size="sm" />,
            },
            {
              name: "Classes",
              link: "/teacher/class",
              icon: <FontAwesomeIcon icon={faSchool} size="sm" />,
            },
            {
              name: "Attendance",
              link: "/teacher/attendance",
              icon: <FontAwesomeIcon icon={faBook} size="sm" />,
            },
            {
              name: "Notifications",
              link: "/teacher/notifications",
              icon: <FontAwesomeIcon icon={faEnvelope} size="sm" />,
            },
            {
              name: "Students",
              link: "/teacher/students",
              icon: <FontAwesomeIcon icon={faPerson} size="sm" />,
            },
            {
              name: "Courses",
              link: "/teacher/courses",
              icon: <FontAwesomeIcon icon={faEnvelope} size="sm" />,
            },
            {
              name: "Profile",
              link: "/teacher/profile",
              icon: <FontAwesomeIcon icon={faUser} size="sm" />,
            },
            {
              name: "Logout",
              type: "button",
              action: () => {
                logout();
              },
              icon: <i className="fas fa-bell"></i>,
            },
          ]}
        />

        <Outlet />
      </div>
    );
  }
  if (auth.userType === "admin") {
    return (
      <div
        style={{ height: "100%", width: "100%" }}
        className={`row m-0 g-0 ${styles.bg}`}
      >
        <SideBar
          elements={[
            {
              name: "Dashboard",
              link: "/teacher/dashboard",
              icon: <FontAwesomeIcon icon={faHouse} size="sm" />,
            },
            {
              name: "Marks",
              link: "/teacher/marks",
              icon: <FontAwesomeIcon icon={faStar} size="sm" />,
            },
            {
              name: "Exams",
              link: "/teacher/exams",
              icon: <FontAwesomeIcon icon={faPen} size="sm" />,
            },
            {
              name: "Classes",
              link: "/teacher/class",
              icon: <FontAwesomeIcon icon={faSchool} size="sm" />,
            },
            {
              name: "Attendance",
              link: "/teacher/attendance",
              icon: <FontAwesomeIcon icon={faBook} size="sm" />,
            },
            {
              name: "Notifications",
              link: "/teacher/notifications",
              icon: <FontAwesomeIcon icon={faEnvelope} size="sm" />,
            },
            {
              name: "Students",
              link: "/teacher/students",
              icon: <FontAwesomeIcon icon={faPerson} size="sm" />,
            },
            {
              name: "Courses",
              link: "/teacher/courses",
              icon: <FontAwesomeIcon icon={faEnvelope} size="sm" />,
            },
            {
              name: "Profile",
              link: "/teacher/profile",
              icon: <FontAwesomeIcon icon={faUser} size="sm" />,
            },
            {
              name: "Logout",
              type: "button",
              action: () => {
                logout();
              },
              icon: <i className="fas fa-bell"></i>,
            },
          ]}
        />

        <Outlet />
      </div>
    );
  }
};

export default TeacherLayout;
