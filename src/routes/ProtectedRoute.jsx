import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { state, isAuthLoaded } = useAuth();

  if (!isAuthLoaded) {
    return <p>Loading...</p>;
  }
  if (!state.currentUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
