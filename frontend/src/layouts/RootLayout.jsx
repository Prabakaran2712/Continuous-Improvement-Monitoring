import { Outlet } from "react-router";
import Header from "../components/Home/Header";
import Footer from "../components/Home/Footer";

const RootLayout = () => {
  return (
    <div style={{ width: "100%", background: "white" }} className="pb-3">
      <Header />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
