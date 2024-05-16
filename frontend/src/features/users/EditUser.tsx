import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Roles } from "./columns";

import RoleOptions from "./RoleOptions";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
export default function EditUser() {
  const [roles, setRoles] = useState<Roles[]>([]);
  const navigate = useNavigate();
  const { state } = useLocation();

  const isEditing = state.isEditing;
  const user = state.user || null;
  console.log(user);

  function openChangeHandler(open: boolean) {
    open ? null : navigate("..");
  }

  return (
    <Dialog defaultOpen={true} onOpenChange={openChangeHandler}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit User" : "Add User"}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Make changes to user here. Click save when you're done."
              : "Add a new user. Click the save button when you are done."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue="emirhanyac"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Roles</Label>
            <div className="flex gap-3">
              <RoleOptions roles={roles} setRoles={setRoles} />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="active" className="text-right">
              Active
            </Label>
            <Switch id="active" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">
            {isEditing ? "Save changes" : "Add User"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
