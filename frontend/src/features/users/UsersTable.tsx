import { Button } from "@/components/ui/button";
import { columns, User } from "./columns";
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
    error,
    isSuccess,
  } = useGetUsersQuery(undefined, {
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
    let errorMessage = "Somethink went wrong";
    console.log(error);

    if (
      "status" in error &&
      (error.status === 400 || error.status === 401 || error.status === 403)
    ) {
      errorMessage = (error as { data: { message: string } }).data.message;
    }
    return <ErrorMessage message={errorMessage} />;
  }

  if (!isSuccess) {
    return <ErrorMessage message="Something went wrong" />;
  }

  return (
    <div className="container mx-auto py-10 space-y-3">
      <div className="flex justify-end">
        <Button
          onClick={() => navigate("edit-user", { state: { isEditing: false } })}
        >
          Add User
        </Button>
      </div>
      <DataTable columns={columns} data={users as User[]} />
    </div>
  );
}
