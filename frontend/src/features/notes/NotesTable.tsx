import { Button } from "@/components/ui/button";
import { columns, Note } from "./columns";
import { DataTable } from "@/components/DataTable";
import { useNavigate } from "react-router-dom";
import { useGetNotesQuery } from "./noteApi";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import useAuth from "../auth/useAuth";

// async function getData(): Promise<Payment[]> {
//   return [
//     {
//       id: "728ed52f",
//       amount: 100,
//       status: "pending",
//       email: "m@example.com",
//     },
//     {
//       id: "728ed52f",
//       amount: 200,
//       status: "pending",
//       email: "m@example.com",
//     },
//     {
//       id: "728ed52f",
//       amount: 300,
//       status: "success",
//       email: "m@example.com",
//     },
//   ];
// }

export default function NotesTable() {
  const {
    data: notes,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetNotesQuery({
    pollingInterval: 15000,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });
  const { username, isAdmin, isManager } = useAuth();
  const navigate = useNavigate();

  // if (notes?.length) {
  //   parsedNotes = notes.map((note: Note) => {
  //     const readableDate = new Date(note.createdAt).toLocaleDateString("en-US");
  //     return { ...note, createdAt: readableDate };
  //   });
  // }

  if (isLoading) {
    return (
      <div className="flex justify-center py-5">
        <LoadingSpinner className="w-14 h-14" />
      </div>
    );
  }
  if (isError) {
    let errorMessage = "Something went wrong";
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
  let filteredNotes = notes;
  if (!isAdmin && !isManager) {
    filteredNotes = notes.filter((note: Note) => {
      return username === note.user.username;
    });
  }
  return (
    <div className="container mx-auto py-10 space-y-3">
      <div className="flex justify-end">
        <Button
          onClick={() => navigate("edit-note", { state: { isEditing: false } })}
        >
          Add Note
        </Button>
      </div>
      <DataTable columns={columns} data={filteredNotes} />
    </div>
  );
}
