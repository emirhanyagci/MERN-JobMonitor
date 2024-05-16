import UsersTable from "@/features/users/UsersTable";
import { Outlet } from "react-router-dom";
export default function Users() {
  return (
    <main>
      <UsersTable />
      <Outlet />
    </main>
  );
}
