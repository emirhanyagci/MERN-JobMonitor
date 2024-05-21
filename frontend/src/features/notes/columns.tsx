import { ColumnDef } from "@tanstack/react-table";

import NoteActions from "./NoteActions";
import { User } from "../users/columns";
export type Note = {
  _id: string;
  user: User;
  title: string;
  text: string;
  completed: boolean;
  createdAt: string;
};

export const columns: ColumnDef<Note>[] = [
  {
    accessorKey: "completed",
    header: "Status",
    cell: ({ row }) => {
      const { completed } = row.original;

      return (
        <span className="tracking-wider">
          {completed ? "Completed" : "Pending"}
        </span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const data = row.original;
      const readableDate = new Date(data.createdAt).toLocaleDateString("en-US");
      return <span className="tracking-wider">{readableDate}</span>;
    },
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "user.username",
    header: "Owner",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const note = row.original;
      return <NoteActions note={note} />;
    },
  },
];
