import { Outlet } from "react-router";
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
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";

//styles
import styles from "./TeacherLayout.module.css";
const TeacherLayout = () => {
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
            link: "/Logout",
            icon: <FontAwesomeIcon icon={faRightFromBracket} size="sm" />,
          },
        ]}
      />

      <Outlet />
    </div>
  );
};

export default TeacherLayout;
