import { Button } from "@/components/ui/button";
import { Note, columns } from "./columns";
import { DataTable } from "@/components/DataTable";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const data: Note[] = [
    {
      id: "728ed52f",
      user: {
        id: "728ed52f",
        username: "pending",
        roles: ["Employee", "Manager"],
        active: true,
      },
      title: "m@example.com",
      text: "blabla",
      completed: true,
      created: "12 Agust",
    },
  ];

  return (
    <div className="container mx-auto py-10 space-y-3">
      <div className="flex justify-end">
        <Button
          onClick={() => navigate("add-note", { state: { isEditing: false } })}
        >
          Add Note
        </Button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
