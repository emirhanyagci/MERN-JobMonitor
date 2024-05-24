import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";
import { jwtDecode } from "jwt-decode";
interface decodedToken {
  exp: number;
  iat: number;
  roles: ("Manager" | "Admin" | "Employee")[];
  username: string;
}
const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  let isAdmin = false;
  let isManager = false;
  let status = "Employee";
  if (token) {
    const decoded: decodedToken = jwtDecode(token);
    const { username, roles } = decoded;
    isAdmin = roles.includes("Admin");
    isManager = roles.includes("Manager");

    if (isManager) status = "Manager";
    if (isAdmin) status = "Admin";
    return { username, roles, isAdmin, isManager, status };
  }
  // if we don't have a token this object gonna return
  return { username: "", roles: [], isAdmin, isManager, status };
};

export default useAuth;
