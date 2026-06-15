import { initialAuthState, authReducer } from "../state/authReducer";
import { createContext, useReducer, useEffect, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);

  useEffect(() => {
    const atmosUsers = localStorage.getItem("atmosUsers");
    const atmosCurrentUser = localStorage.getItem("atmosCurrentUser");
    if (atmosUsers) {
      dispatch({
        type: "LOAD_AUTH_STATE",
        payload: {
          users: JSON.parse(atmosUsers),
          currentUser: JSON.parse(atmosCurrentUser),
        },
      });
      setIsAuthLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isAuthLoaded) return;
    localStorage.setItem("atmosUsers", JSON.stringify(state.users));
  }, [state.users, isAuthLoaded]);

  useEffect(() => {
    if (!isAuthLoaded) return;
    if (state.currentUser) {
      localStorage.setItem(
        "atmosCurrentUser",
        JSON.stringify(state.currentUser),
      );
    } else {
      localStorage.removeItem("atmosCurrentUser");
    }
  }, [state.currentUser, isAuthLoaded]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
