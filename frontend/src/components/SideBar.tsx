import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export default function SideBar() {
  return (
    <aside className="h-screen p-8 space-y-5 border-r hidden md:block">
      <header className="tracking-widest text-2xl whitespace-nowrap">
        Job Monitor
      </header>
      <div className="flex flex-col gap-2 ">
        <Button variant="secondary" className="text-base" asChild>
          <Link to="/dash">Jobs</Link>
        </Button>
        <Button variant="secondary" className="text-base" asChild>
          <Link to="users">Users</Link>
        </Button>
      </div>
    </aside>
  );
}
