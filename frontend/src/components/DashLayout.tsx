import { Outlet } from "react-router-dom";
import NavBar from "@/components/NavBar";
import SideBar from "./SideBar";

export default function DashLayout() {
  return (
    <div className="h-svh flex">
      <SideBar />
      <div className="h-full w-full">
        <NavBar />
        <div className="h-full overflow-auto ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
