import { Button } from "./ui/button";

export default function SideBar() {
  return (
    <aside className="h-screen p-8 space-y-5">
      <header className="tracking-widest text-2xl whitespace-nowrap">
        Job Monitor
      </header>
      <div className="flex flex-col gap-2">
        <Button variant="secondary">Jobs</Button>
        <Button variant="secondary">Users</Button>
      </div>
    </aside>
  );
}
