import { createContext, useReducer } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      console.log("Login dispatched");
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        userType: action.userType,
      };

    case "LOGOUT":
      console.log("logout dispatched");
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        userType: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    userType: null,
  });

  //print values in auth context
  // /console.log(state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
