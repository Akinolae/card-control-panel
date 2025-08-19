import { isUserSignedIn } from "./services/auth";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ ...props }) => {
  if (!isUserSignedIn()) {
    return <Navigate to={"/login"} replace />;
  }
  return props.children;
};

export default ProtectedRoute;
