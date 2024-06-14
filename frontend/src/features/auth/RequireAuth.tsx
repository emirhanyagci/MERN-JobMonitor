import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth";
import { Role } from "@/constants/roles";

export default function RequireAuth({
  allowedRoles,
}: {
  allowedRoles: Role[];
}) {
  const { roles } = useAuth();

  const haveAccess = allowedRoles.some((role: Role) => {
    return roles.includes(role as never);
  });
  if (haveAccess) return <Outlet />;
  <Navigate to="/" replace />;
}
