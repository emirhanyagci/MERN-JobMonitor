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
import useAuth from "@/features/auth/useAuth";
export default function NavBar() {
  const navigate = useNavigate();
  const { username, status, isManager, isAdmin } = useAuth();
  const [logout, { isLoading, isSuccess, isError }] = useLogoutMutation();

  useEffect(() => {
    console.log(isSuccess);

    if (isSuccess) navigate("/");
  }, [isSuccess]);
  return (
    <nav className="w-full p-3 flex justify-between border-b md:justify-end">
      <Sheet>
        <SheetTrigger className="md:hidden">
          <Menu />
        </SheetTrigger>
        <SheetContent className="flex flex-col justify-between" side="left">
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
                {(isManager || isAdmin) && (
                  <Button variant="ghost" className="text-lg " asChild>
                    <Link to="users">Users</Link>
                  </Button>
                )}
              </div>
            </SheetDescription>
          </SheetHeader>
          <footer className="flex flex-col">
            <div className="text-ring font-semibold grid grid-cols-4 break-words">
              <span className="col-span-1">User:</span>
              <span className="col-span-3"> {username}</span>
            </div>
            <div className="text-ring font-semibold grid grid-cols-4 break-words">
              <span className="col-span-1">Status:</span>
              <span className="col-span-3"> {status}</span>
            </div>
          </footer>
        </SheetContent>
      </Sheet>
      <Button onClick={logout} variant="ghost" className="text-md">
        {isLoading ? <LoadingSpinner /> : isError ? "Failed" : <LogOut />}
      </Button>
    </nav>
  );
}
