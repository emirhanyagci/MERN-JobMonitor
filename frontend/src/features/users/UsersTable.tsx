import { Button } from "@/components/ui/button";
import { User, columns } from "./columns";
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
  const data: User[] = [
    {
      id: "728ed52f",
      username: "pending",
      roles: ["Employee", "Manager"],
    },
  ];

  return (
    <div className="container mx-auto py-10 space-y-3">
      <div className="flex justify-end">
        <Button
          onClick={() => navigate("add-user", { state: { isEditing: false } })}
        >
          Add User
        </Button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
