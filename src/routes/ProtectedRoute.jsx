import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loader from "../components/ui/Loader";

export default function ProtectedRoute({ children }) {
  const { state, isAuthLoaded } = useAuth();

  if (!isAuthLoaded) {
    return <Loader />;
  }
  if (!state.currentUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
