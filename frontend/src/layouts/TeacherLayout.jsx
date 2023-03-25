import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SideBar from "../components/forms/Sidebar";
const TeacherLayout = () => {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <SideBar />
      <Outlet />
    </div>
  );
};

export default TeacherLayout;
