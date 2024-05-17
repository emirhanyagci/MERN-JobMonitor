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
import { useLocation, useNavigate } from "react-router-dom";
import UserOptions from "./UserOptions";
import { Switch } from "@/components/ui/switch";

export default function EditNote() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const isEditing = state.isEditing;
  const note = state.note || null;

  function openChangeHandler(open: boolean) {
    open ? null : navigate("..");
  }
  return (
    <Dialog defaultOpen={true} onOpenChange={openChangeHandler}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit" : "Add"} Note</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Add new note here. Click save when you're done."
              : "Edit not here. Click save when you're done."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <UserOptions currentUser={!isEditing ? undefined : note.user} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              defaultValue={isEditing ? note.title : "Title of note"}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="text" className="text-right">
              Text
            </Label>
            <Input
              id="text"
              defaultValue={isEditing ? note.text : "Text of note.."}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="active" className="text-right">
              Active
            </Label>
            <Switch
              id="active"
              defaultChecked={isEditing ? note.completed : false}
              disabled={!isEditing}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
