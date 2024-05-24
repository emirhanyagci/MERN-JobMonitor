import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Note } from "./columns";
import { useDeleteNoteMutation } from "./noteApi";
import useAuth from "../auth/useAuth";
export default function NoteActions({ note }: { note: Note }) {
  const navigate = useNavigate();
  const { isAdmin, isManager } = useAuth();
  const [deleteNote] = useDeleteNoteMutation();
  function deleteHandler() {
    deleteNote({ id: note._id }).catch((err) => {
      console.log(err);
    });
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>

        <DropdownMenuItem
          onClick={() =>
            navigate("edit-note", { state: { note, isEditing: true } })
          }
        >
          Edit Note
        </DropdownMenuItem>

        {(isAdmin || isManager) && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={deleteHandler}>
              Delete Note
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
