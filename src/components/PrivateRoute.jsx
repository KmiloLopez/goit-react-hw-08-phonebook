import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ component: Component, redirectTo = "/" }) => {
  const { isLoggedIn, isLoading } = useSelector((state) => state.auth);
  const shouldRedirect = !isLoggedIn && !isLoading;

  return shouldRedirect ? <Navigate to={redirectTo} /> : Component;
};
