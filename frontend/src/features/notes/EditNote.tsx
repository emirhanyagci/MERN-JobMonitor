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
import { useAddNoteMutation, useUpdateNoteMutation } from "./noteApi";
import { useEffect, useState } from "react";

export default function EditNote() {
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [completed, setCompleted] = useState(false);
  const [addNote] = useAddNoteMutation();
  const [updateNote] = useUpdateNoteMutation();
  const navigate = useNavigate();
  const { state } = useLocation();
  const isEditing = state.isEditing;
  const note = state.note || null;

  useEffect(() => {
    if (!isEditing) return;
    setUserId(note.user._id);
    setTitle(note.title);
    setText(note.text);
    setCompleted(note.completed);
  }, []);
  function openChangeHandler(open: boolean) {
    open ? null : navigate("..");
  }
  function saveHandler() {
    console.log(userId, title, text, completed);

    if (isEditing) {
      updateNote({ id: note._id, user: userId, title, text, completed })
        .then(() => {
          navigate("..");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      addNote({ userId, title, text })
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
          <DialogTitle>{isEditing ? "Edit" : "Add"} Note</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Add new note here. Click save when you're done."
              : "Edit not here. Click save when you're done."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <UserOptions
              setUserId={setUserId}
              currentUser={!isEditing ? undefined : note.user}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              id="title"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="text" className="text-right">
              Text
            </Label>
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              id="text"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="active" className="text-right">
              Active
            </Label>
            <Switch
              checked={completed}
              onCheckedChange={() => setCompleted((a) => !a)}
              id="active"
              disabled={!isEditing}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={saveHandler} type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
