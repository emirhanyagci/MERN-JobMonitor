import { ColumnDef } from "@tanstack/react-table";

import NoteActions from "./NoteActions";
export type Note = {
  id: string;
  status: "pending" | "processing" | "success" | "failed";
  created: string;
  title: string;
  owner: string;
};

export const columns: ColumnDef<Note>[] = [
  {
    accessorKey: "status",
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
