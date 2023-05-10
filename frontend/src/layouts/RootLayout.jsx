import { Outlet } from "react-router";
import Header from "../components/Home/Header";
import Footer from "../components/Home/Footer";

const RootLayout = () => {
  return (
    <div style={{ height: "100%", width: "100%", background: "white" }}>
      <Header />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
