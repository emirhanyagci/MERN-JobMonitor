import { ColumnDef } from "@tanstack/react-table";

import NoteActions from "./NoteActions";
import { User } from "../users/columns";
export type Note = {
  _id: string;
  user: User;
  title: string;
  text: string;
  completed: boolean;
  created: string;
};

export const columns: ColumnDef<Note>[] = [
  {
    accessorKey: "completed",
    header: "Status",
  },
  {
    accessorKey: "created",
    header: "Created",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "owner",
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
