import { ColumnDef } from "@tanstack/react-table";
import UserActions from "./UserActions";

export type Roles = "Employee" | "Manager" | "Admin";
export type User = {
  _id: string;
  username: string;
  roles: Roles[];
  active: boolean;
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
      return <UserActions user={user} />;
    },
  },
];
