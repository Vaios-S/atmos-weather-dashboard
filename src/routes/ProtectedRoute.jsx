import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { state } = useAuth();

  if (!state.currentUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
