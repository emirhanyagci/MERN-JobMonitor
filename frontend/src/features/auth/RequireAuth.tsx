import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth";
import { Roles } from "../users/columns";

export default function RequireAuth({
  allowedRoles,
}: {
  allowedRoles: Roles[];
}) {
  const { roles } = useAuth();

  const haveAccess = allowedRoles.some((role: Roles) => {
    return roles.includes(role);
  });
  if (haveAccess) return <Outlet />;
  <Navigate to="/" replace />;
}
