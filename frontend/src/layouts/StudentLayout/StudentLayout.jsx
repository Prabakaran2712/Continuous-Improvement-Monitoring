import { Outlet } from "react-router";
import SideBar from "../../components/forms/Sidebar/Sidebar";
import { useLogout } from "../../hooks/useLogout";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

//styles
import styles from "./StudentLayout.module.css";

const StudentLayout = () => {
  const { logout } = useLogout();
  const [loading, setLoading] = useState(false);
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

  if (loading) {
    return <div>Loading...</div>;
  }
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
};

export default StudentLayout;
