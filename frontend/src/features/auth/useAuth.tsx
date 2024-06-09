import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";
import { jwtDecode } from "jwt-decode";
import { Role, RoleEnum } from "@/constants/roles";
interface decodedToken {
  exp: number;
  iat: number;
  roles: Role;
  username: string;
}
const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  let isAdmin = false;
  let isManager = false;
  let status = RoleEnum.Employee;
  if (token) {
    const decoded: decodedToken = jwtDecode(token);
    const { username, roles } = decoded;
    isAdmin = roles.includes(RoleEnum.Admin);
    isManager = roles.includes(RoleEnum.Manager);

    if (isManager) status = RoleEnum.Manager;
    if (isAdmin) status = RoleEnum.Admin;
    return { username, roles, isAdmin, isManager, status };
  }
  // if we don't have a token this object gonna return
  return { username: "", roles: [], isAdmin, isManager, status };
};

export default useAuth;
