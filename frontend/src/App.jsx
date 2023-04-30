//css
import "./App.css";

//bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

//packages
import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import axios from "axios";
import { useAuthContext } from "./hooks/useAuthContext";
import { Outlet } from "react-router";
import Loading from "./components/Loading/Loading";

function App() {
  const { user, dispatch } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const auth = useAuthContext();

  useEffect(() => {
    console.log("app");
    const verify = async () => {
      console.log("verify");
      await axios
        .get("/api/auth/verify")
        .then((res) => {
          console.log("login aa dispatch");
          console.log(res.data.userType);
          dispatch({
            type: "LOGIN",
            payload: res.data.user,
            userType: res.data.userType,
          });
          return;
        })
        .catch((err) => {
          console.log(err);
          dispatch({ type: "LOGOUT" });
        });

      console.log("root");
      setLoading(false);
    };
    verify();
  }, []);
  if (loading) return <Loading />;
  else {
    return <Outlet />;
  }
}

export default App;
