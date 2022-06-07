import { Navigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";

const Protected = ({ children }) => {
  const [user] = useLocalStorage("user", null);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
export default Protected;
