import { Outlet } from "react-router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SideBar from "../../components/forms/Sidebar/Sidebar";

//styles
import styles from "./StudentLayout.module.css";

const StudentLayout = () => {
  return (
    <div
      style={{ height: "100%", width: "100%" }}
      className={`row m-0 ${styles.bg}`}
    >
      <SideBar
        elements={[
          {
            name: "Dashboard",
            link: "/student/dashboard",
            icon: <i className="fas fa-home"></i>,
          },
          {
            name: "Marks",
            link: "/student/marks",
            icon: <i className="fas fa-clipboard-list"></i>,
          },
          {
            name: "Attendance",
            link: "/student/attendance",
            icon: <i className="fas fa-calendar-alt"></i>,
          },
          {
            name: "Notifications",
            link: "/student/notifications",
            icon: <i className="fas fa-bell"></i>,
          },
        ]}
      />

      <Outlet />
    </div>
  );
};

export default StudentLayout;
