import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "@/features/auth/authApi";
import { useEffect } from "react";
import { LoadingSpinner } from "./LoadingSpinner";
export default function NavBar() {
  const navigate = useNavigate();
  const [logout, { isLoading, isSuccess, isError }] = useLogoutMutation();

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess]);
  return (
    <nav className="w-full p-3 flex justify-between border-b md:justify-end">
      <Sheet>
        <SheetTrigger className="md:hidden">
          <Menu />
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle asChild>
              <header className="tracking-widest text-2xl whitespace-nowrap">
                Job Monitor
              </header>
            </SheetTitle>
            <SheetDescription asChild>
              <div className="flex flex-col gap-2 ">
                <Button variant="secondary" className="text-lg" asChild>
                  <Link to="notes">Jobs</Link>
                </Button>
                <Button variant="ghost" className="text-lg " asChild>
                  <Link to="users">Users</Link>
                </Button>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <Button onClick={logout} variant="ghost" className="text-md">
        {isLoading ? <LoadingSpinner /> : isError ? "Failed" : <LogOut />}
      </Button>
    </nav>
  );
}
