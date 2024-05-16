import { ColumnDef } from "@tanstack/react-table";
import TableActions from "./TableActions";

type Roles = "Employee" | "Manager" | "Admin";
export type User = {
  id: string;
  username: string;
  roles: Roles[];
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "roles",
    header: "roles",
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original;
      console.log(user.id);

      return <TableActions user={user} />;
    },
  },
];
