import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
const RootLayout = () => {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Header />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
