import { Outlet } from "react-router";
import SideBar from "../../components/forms/Sidebar/Sidebar";
import { useLogout } from "../../hooks/useLogout";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "axios";
//styles
import styles from "./StudentLayout.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faHouse,
  faList,
  faPen,
  faBars,
  faSignOut,
  faSignOutAlt,
  faChartLine,
  faUser,
  faMessage,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Dropdown from "../../components/Dropdown/Dropdown";

const StudentLayout = () => {
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const auth = useAuthContext();
  //navigate
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    console.log(auth);
    if (!auth.isAuthenticated || auth.userType !== "student") {
      console.log("redirecting");
      navigate("/auth/student/signin");
    }
    setLoading(false);
  }, []);

  const options = [
    {
      name: "Dashboard",
      link: "/student/dashboard",
      icon: <FontAwesomeIcon icon={faHouse} />,
    },
    {
      name: "Marks",
      link: "/student/marks",
      icon: <FontAwesomeIcon icon={faPen} />,
    },
    {
      name: "Attendance",
      link: "/student/attendance",
      icon: <FontAwesomeIcon icon={faList} />,
    },
    {
      name: "Notifications",
      link: "/student/notifications",
      icon: <FontAwesomeIcon icon={faBell} />,
    },
    {
      name: "Chats",
      link: "/student/chats",
      icon: <FontAwesomeIcon icon={faMessage} />,
    },
    {
      name: "Grades",
      link: "/student/grades",
      icon: <FontAwesomeIcon icon={faPen} />,
    },
    {
      name: "Your Courses",
      link: "/student/courses",
      icon: <FontAwesomeIcon icon={faGraduationCap} />,
    },
    {
      name: "Logout",
      type: "button",
      action: () => {
        logout();
      },
      icon: <FontAwesomeIcon icon={faSignOutAlt} />,
    },
  ];

  const logout = () => {
    console.log("logout");
    axios
      .get("/api/students/logout")
      .then((res) => {
        dispatch({ type: "LOGOUT" });
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (loading || !auth.isAuthenticated) {
    return <div>Loading...</div>;
  } else {
    const profile = {
      name: auth.user.name,
      role: auth.userType,
      items: [
        {
          name: "Profile",
          link: "/student/profile",
          icon: <FontAwesomeIcon icon={faUser} />,
        },
        {
          name: "Logout",
          link: "/student/logout",
          icon: <FontAwesomeIcon icon={faSignOutAlt} />,
        },
      ],
    };
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
                      <Link to={option.link}>
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
      </div>
    );
  }
};
export default StudentLayout;
