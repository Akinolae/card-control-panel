import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ ...props }) => {
  const user = localStorage.getItem("user");
  const userData = user ? JSON.parse(user ?? "") : null;

  if (!userData || !userData.isSignedIn) {
    return <Navigate to={"/login"} replace />;
  }
  return props.children;
};

export default ProtectedRoute;
