import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const logout = () => {
    console.log("logout");
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return { logout };
};

export { useLogout };
