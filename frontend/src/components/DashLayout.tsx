import { Outlet } from "react-router-dom";
import NavBar from "@/components/NavBar";
import SideBar from "./SideBar";
export default function DashLayout() {
  return (
    <div className="flex">
      <SideBar />
      <div className="w-full">
        <NavBar />
        <Outlet />
      </div>
    </div>
  );
}
