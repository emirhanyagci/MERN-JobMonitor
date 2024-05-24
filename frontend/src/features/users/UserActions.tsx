import { MoreHorizontal } from "lucide-react";
import { User } from "./columns";
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
import { useDeleteUserMutation } from "./userApi";
import { useToast } from "@/components/ui/use-toast";
export default function UserActions({ user }: { user: User }) {
  const navigate = useNavigate();
  const [deleteUser] = useDeleteUserMutation();
  const { toast } = useToast();

  function deleteHandler() {
    deleteUser({ id: user._id })
      .unwrap()
      .catch((err) => {
        if (err.data.code === "USER_ASSIGNED_JOB") {
          toast({
            title: "User cannot be deleted",
            description:
              "The user is assigned to a job and cannot be deleted until the job is completed or removed",
          });
        }
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
            navigate("edit-user", { state: { user, isEditing: true } })
          }
        >
          Edit User
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={deleteHandler}>Delete User</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
