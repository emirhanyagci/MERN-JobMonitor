import { Button } from "./ui/button";

export default function NavBar() {
  return (
    <nav className="w-full p-3 flex justify-end">
      <Button variant="ghost" className="text-md">
        Logout
      </Button>
    </nav>
  );
}
