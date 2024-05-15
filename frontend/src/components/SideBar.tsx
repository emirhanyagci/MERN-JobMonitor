import { Button } from "./ui/button";

export default function SideBar() {
  return (
    <aside className="h-screen p-8 space-y-5 border-r hidden md:block">
      <header className="tracking-widest text-2xl whitespace-nowrap">
        Job Monitor
      </header>
      <div className="flex flex-col gap-2 ">
        <Button className="text-base">Jobs</Button>
        <Button className="text-base">Users</Button>
      </div>
    </aside>
  );
}
