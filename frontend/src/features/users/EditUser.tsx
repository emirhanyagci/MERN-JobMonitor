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
import { Role } from "@/constants/roles";

import RoleOptions from "./RoleOptions";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAddNewUserMutation, useUpdateUserMutation } from "./userApi";
export default function EditUser() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [active, setActive] = useState(true);
  const [addUser] = useAddNewUserMutation();
  const [updatedUser] = useUpdateUserMutation();
  const navigate = useNavigate();
  const { state } = useLocation();

  const isEditing = state.isEditing;
  const user = state.user || null;

  useEffect(() => {
    if (!isEditing) return;
    setRoles([...user.roles]);
    setActive(user.active);
    setUsername(user.username);
  }, []);

  function openChangeHandler(open: boolean) {
    open ? null : navigate("..");
  }
  function saveHandler() {
    if (isEditing) {
      updatedUser({ id: user._id, roles, username, active, password })
        .then(() => {
          navigate("..");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      addUser({ username, password, roles })
        .then(() => {
          navigate("..");
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              id="username"
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              id="password"
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
            <Switch
              checked={active}
              onCheckedChange={() => setActive((a) => !a)}
              id="active"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={saveHandler}>
            {isEditing ? "Save changes" : "Save user"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
