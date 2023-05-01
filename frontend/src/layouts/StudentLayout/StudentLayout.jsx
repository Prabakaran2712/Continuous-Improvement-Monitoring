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
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const StudentLayout = () => {
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const auth = useAuthContext();
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
      name: "Grades",
      link: "/student/grades",
      icon: <FontAwesomeIcon icon={faPen} />,
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

  //navigate
  const navigate = useNavigate();

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

  useEffect(() => {
    setLoading(true);
    console.log(auth);
    if (!auth.isAuthenticated || auth.userType !== "student") {
      console.log("redirecting");
      navigate("/auth/student/signin");
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
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
              Dashboard
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
};

export default StudentLayout;
