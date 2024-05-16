import { Badge } from "@/components/ui/badge";
import { Roles } from "./columns";
export default function RoleOptions({
  roles,
  setRoles,
}: {
  roles: Roles[];
  setRoles: (roles: Roles[]) => void;
}) {
  function onRoleSwitchHandler(role: Roles) {
    if (!roles.includes(role)) {
      setRoles([...roles, role]);
    } else {
      const updatedRoles = roles.filter((r) => r !== role);
      setRoles(updatedRoles);
    }
  }
  return (
    <>
      <Badge
        onClick={() => {
          onRoleSwitchHandler("Employee");
        }}
        variant={roles.includes("Employee") ? "default" : "secondary"}
        className="cursor-pointer"
      >
        Employee
      </Badge>
      <Badge
        onClick={() => {
          onRoleSwitchHandler("Manager");
        }}
        variant={roles.includes("Manager") ? "default" : "secondary"}
        className="cursor-pointer"
      >
        Manager
      </Badge>
      <Badge
        onClick={() => {
          onRoleSwitchHandler("Admin");
        }}
        variant={roles.includes("Admin") ? "default" : "secondary"}
        className="cursor-pointer"
      >
        Admin
      </Badge>
    </>
  );
}
