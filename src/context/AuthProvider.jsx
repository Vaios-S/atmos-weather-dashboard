import { initialAuthState, authReducer } from "../state/authReducer";
import { createContext, useReducer, useEffect, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);

  useEffect(() => {
    const atmosUsers = localStorage.getItem("atmosUsers");
    const atmosCurrentUser = localStorage.getItem("atmosCurrentUser");
    dispatch({
      type: "LOAD_AUTH_STATE",
      payload: {
        users: atmosUsers ? JSON.parse(atmosUsers) : [],
        currentUser: atmosCurrentUser ? JSON.parse(atmosCurrentUser) : null,
      },
    });
    setIsAuthLoaded(true);
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
    <AuthContext.Provider value={{ state, dispatch, isAuthLoaded }}>
      {children}
    </AuthContext.Provider>
  );
}
