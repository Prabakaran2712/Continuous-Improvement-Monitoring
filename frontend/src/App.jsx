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

function App() {
  const { user, dispatch } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const auth = useAuthContext();

  useEffect(() => {
    console.log("app");
    const verify = async () => {
      console.log("verify");
      await axios
        .get("/api/teachers/verify")
        .then((res) => {
          console.log("login aa dispatch");
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
      if (localStorage.getItem("token")) {
        const token = localStorage.getItem("token");
        await axios
          .post("/api/auth/verify", { token })
          .then((data) => {
            dispatch({
              type: "LOGIN",
              payload: data.data.user,
              userType: data.data.userType,
            });
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            dispatch({
              type: "LOGOUT",
            });
            setLoading(false);
          });
      } else {
        // dispatch({
        //   type: "LOGOUT",
        // });
        setLoading(false);
      }
    };
    verify();
  }, []);
  if (loading) return <div>Loading</div>;
  else {
    return <Outlet />;
  }
}

export default App;
