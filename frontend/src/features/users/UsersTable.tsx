import { Button } from "@/components/ui/button";
import { columns } from "./columns";
import { DataTable } from "@/components/DataTable";
import { useNavigate } from "react-router-dom";
import { useGetUsersQuery } from "./userApi";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";

export default function NotesTable() {
  const {
    data: users,
    isLoading,
    isError,
  } = useGetUsersQuery({
    pollingInterval: 15000,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex justify-center py-5">
        <LoadingSpinner className="w-14 h-14" />
      </div>
    );
  }
  if (isError) {
    return <ErrorMessage message="Somethink went wrong" />;
  }
  return (
    <div className="container mx-auto py-10 space-y-3">
      <div className="flex justify-end">
        <Button
          onClick={() => navigate("add-user", { state: { isEditing: false } })}
        >
          Add User
        </Button>
      </div>
      <DataTable columns={columns} data={users} />
    </div>
  );
}
