import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children, requireAuth = true }) => {
  const { currentUser } = useAuth();

  if (requireAuth && !currentUser) {
    return <Navigate to="/signin" replace />;
  } else if (!requireAuth && currentUser) {
    return <Navigate to="/conversation" replace />;
  }

  return children;
};

export default ProtectedRoute;
