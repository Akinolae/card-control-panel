import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "./Context";

const ProtectedRoute = ({ ...props }) => {
  const context = useContext(AppContext);

  const data = context ? context[0] : null;
  if (!data?.isSignedIn) {
    return <Navigate to={"/login"} replace />;
  }
  return props.children;
};

export default ProtectedRoute;
