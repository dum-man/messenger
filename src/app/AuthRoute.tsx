import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

interface AuthRouteProps {
  children: React.ReactNode;
}

const AuthRoute = ({ children }: AuthRouteProps) => {
  const [, loading] = useAuthState(auth);

  if (loading) {
    return null;
  }

  return <>{children}</>;
};

export default AuthRoute;
