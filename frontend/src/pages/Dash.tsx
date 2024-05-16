import NotesTable from "@/features/notes/NotesTable";
import { Outlet } from "react-router-dom";
export default function Dash() {
  return (
    <main>
      <NotesTable />
      <Outlet />
    </main>
  );
}
