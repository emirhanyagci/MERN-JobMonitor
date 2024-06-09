import { Badge } from "@/components/ui/badge";
import { Role, RoleEnum } from "@/constants/roles";
export default function RoleOptions({
  roles,
  setRoles,
}: {
  roles: Role[];
  setRoles: (roles: Role[]) => void;
}) {
  function onRoleSwitchHandler(role: Role) {
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
          onRoleSwitchHandler(RoleEnum.Employee);
        }}
        variant={roles.includes(RoleEnum.Employee) ? "default" : "secondary"}
        className="cursor-pointer"
      >
        Employee
      </Badge>
      <Badge
        onClick={() => {
          onRoleSwitchHandler(RoleEnum.Manager);
        }}
        variant={roles.includes(RoleEnum.Manager) ? "default" : "secondary"}
        className="cursor-pointer"
      >
        Manager
      </Badge>
      <Badge
        onClick={() => {
          onRoleSwitchHandler(RoleEnum.Admin);
        }}
        variant={roles.includes(RoleEnum.Admin) ? "default" : "secondary"}
        className="cursor-pointer"
      >
        Admin
      </Badge>
    </>
  );
}
