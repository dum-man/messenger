import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

interface AuthRouteProps {
  children: React.ReactNode;
}

const AuthRoute = ({ children }: AuthRouteProps) => {
  const [currentUser, loading] = useAuthState(auth);

  if (loading) {
    return null;
  }

  if (currentUser) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default AuthRoute;
