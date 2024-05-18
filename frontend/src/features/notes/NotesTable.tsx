import { Button } from "@/components/ui/button";
import { columns } from "./columns";
import { DataTable } from "@/components/DataTable";
import { useNavigate } from "react-router-dom";
import { useGetNotesQuery } from "./noteApi";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";

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
  } = useGetNotesQuery({
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
          onClick={() => navigate("add-note", { state: { isEditing: false } })}
        >
          Add Note
        </Button>
      </div>
      <DataTable columns={columns} data={notes} />
    </div>
  );
}
