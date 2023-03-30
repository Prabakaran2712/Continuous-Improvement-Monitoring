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
    const verify = async () => {
      console.log("root");
      if (localStorage.getItem("token")) {
        const token = localStorage.getItem("token");
        await axios
          .post("http://localhost:3000/api/auth/verify", { token })
          .then((data) => {
            dispatch({
              type: "LOGIN",
              payload: data.data.user,
              userType: data.data.userType,
            });
            setLoading(false);
          })
          .catch((err) => {
            dispatch({
              type: "LOGOUT",
            });
            setLoading(false);
          });
      } else {
        dispatch({
          type: "LOGOUT",
        });
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
