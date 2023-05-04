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
  faSignOutAlt,
  faChartLine,
  faBars,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Link } from "react-router-dom";

//styles
import "./TeacherLayout.css";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import Dropdown from "../../components/Dropdown/Dropdown";

const TeacherLayout = () => {
  const [loading, setLoading] = useState(true);
  const { dispatch } = useAuthContext();
  const [title, setTitle] = useState("Dashboard");
  const auth = useAuthContext();
  const profile = {
    name: auth.user.name,
    role: auth.userType,
    items: [
      {
        name: "Profile",
        link: "/teacher/profile",
        icon: <FontAwesomeIcon icon={faUser} />,
      },
      {
        name: "Logout",
        link: "/teacher/logout",
        icon: <FontAwesomeIcon icon={faSignOutAlt} />,
      },
    ],
  };
  const options = [
    {
      name: "Dashboard",
      link: "/teacher/dashboard",
      icon: <FontAwesomeIcon icon={faHouse} size="sm" />,
      title: "Dashboard",
    },
    {
      name: "Marks",
      link: "/teacher/marks",
      icon: <FontAwesomeIcon icon={faStar} size="sm" />,
      title: "Marks",
    },
    {
      name: "Exams",
      link: "/teacher/exams",
      icon: <FontAwesomeIcon icon={faPen} size="sm" />,
      title: "Exams",
    },
    {
      name: "Classes",
      link: "/teacher/class",
      icon: <FontAwesomeIcon icon={faSchool} size="sm" />,
      title: "Classes",
    },
    {
      name: "Attendance",
      link: "/teacher/attendance",
      icon: <FontAwesomeIcon icon={faBook} size="sm" />,
      title: "Attendance",
    },
    {
      name: "Notifications",
      link: "/teacher/notifications",
      icon: <FontAwesomeIcon icon={faEnvelope} size="sm" />,
      title: "Notifications",
    },
    {
      name: "Chats",
      link: "/teacher/chats",
      icon: <FontAwesomeIcon icon={faMessage} size="sm" />,
      title: "Chats",
    },
    {
      name: "Students",
      link: "/teacher/students",
      icon: <FontAwesomeIcon icon={faPerson} size="sm" />,
      title: "Students",
    },
    {
      name: "Courses",
      link: "/teacher/courses",
      icon: <FontAwesomeIcon icon={faEnvelope} size="sm" />,
      title: "Courses",
    },
    {
      name: "Profile",
      link: "/teacher/profile",
      icon: <FontAwesomeIcon icon={faUser} size="sm" />,
      title: "Profile",
    },
    {
      name: "logout",
      link: "/teacher/logout",
      icon: <FontAwesomeIcon icon={faSignOutAlt} size="sm" />,
    },
  ];
  const admin = [...options];
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
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    console.log(auth);
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
    return <Loading />;
  }
  if (auth.userType === "teacher") {
    return (
      <div style={{ height: "100%", width: "100%" }} className={`row m-0 g-0 `}>
        <div>
          <input type="checkbox" id="nav-toggle" />
          <div className="sidebar">
            <div className="sidebar-brand">
              <h2>
                <FontAwesomeIcon icon={faChartLine} size="sm" />
                <span> CIM</span>
              </h2>
            </div>
            <div className="sidebar-menu">
              <ul>
                {options.map((option) => {
                  return (
                    <li key={Math.random()}>
                      <Link to={option.link} onClick={setTitle(option.title)}>
                        {option.icon}
                        <span>{option.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="main-content">
            <header>
              <h2>
                <label htmlFor="nav-toggle" className="toggleIcon">
                  <FontAwesomeIcon icon={faBars} size="sm" />
                </label>
              </h2>

              <div className="user-wrapper">
                <img
                  src="https://i.scdn.co/image/ab6761610000e5eb81a1d05f4ee442f176e929cb"
                  width="40px"
                  height="40px"
                  alt=""
                />
                <div>
                  <h4>{auth.user.name}</h4>
                  <small>{auth.userType}</small>
                </div>
              </div>
            </header>
            <main>
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    );
  }
  if (auth.userType === "admin") {
    return (
      <div style={{ height: "100%", width: "100%" }}>
        <input type="checkbox" id="nav-toggle" />
        <div className="sidebar">
          <div className="sidebar-brand">
            <h2>
              <FontAwesomeIcon icon={faChartLine} size="sm" />
              <span> CIM</span>
            </h2>
          </div>
          <div className="sidebar-menu">
            <ul>
              {options.map((option) => {
                return (
                  <li key={Math.random()}>
                    <Link
                      to={option.link}
                      onClick={() => {
                        setTitle(option.title);
                      }}
                    >
                      {option.icon}
                      <span>{option.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="main-content">
          <header>
            <h2>
              <label htmlFor="nav-toggle" className="toggleIcon">
                <FontAwesomeIcon icon={faBars} size="sm" />
              </label>
            </h2>

            <div className="user-wrapper">
              <Dropdown option={profile} />
            </div>
          </header>
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    );
  }
};

export default TeacherLayout;
