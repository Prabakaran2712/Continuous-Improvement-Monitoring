import { useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("/api/students/logout")
      .then((res) => {
        dispatch({ type: "LOGOUT" });
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <div>Logging out...</div>;
};

export default Logout;
