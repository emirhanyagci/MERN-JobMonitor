import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import useAuth from "@/features/auth/useAuth";

export default function SideBar() {
  const { username, status, isManager, isAdmin } = useAuth();
  return (
    <aside className="p-8 max-w-80 space-y-5 border-r hidden flex-col justify-between md:flex">
      <div className="space-y-2">
        <header className="tracking-widest text-2xl whitespace-nowrap">
          Job Monitor
        </header>
        <div className="flex flex-col gap-2 ">
          <Button variant="secondary" className="text-base" asChild>
            <Link to="notes">Jobs</Link>
          </Button>
          {(isManager || isAdmin) && (
            <Button variant="secondary" className="text-base" asChild>
              <Link to="users">Users</Link>
            </Button>
          )}
        </div>
      </div>
      <footer className="">
        <div className="text-ring font-semibold grid grid-cols-4 break-words">
          <span className="col-span-2">User:</span>
          <span className="col-span-2"> {username}</span>
        </div>
        <div className="text-ring font-semibold grid grid-cols-4 break-words">
          <span className="col-span-2">Status:</span>
          <span className="col-span-2"> {status}</span>
        </div>
      </footer>
    </aside>
  );
}
