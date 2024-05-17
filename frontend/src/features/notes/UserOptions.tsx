import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@radix-ui/react-label";
import { User } from "../users/columns";
export default function UserOptions({
  currentUser,
}: {
  currentUser: User | undefined;
}) {
  return (
    <>
      <Label htmlFor="username" className="text-right">
        Username
      </Label>

      <Select defaultValue="emirhanid">
        <SelectTrigger className="col-span-3 ">
          <SelectValue placeholder="Select a user" />
        </SelectTrigger>
        <SelectContent className="col-span-3">
          <SelectGroup>
            <SelectItem value="emirhanid">Emirhan</SelectItem>
            <SelectItem value="banana">Kadir</SelectItem>
            <SelectItem value="blueberry">Alp</SelectItem>
            <SelectItem value="grapes">Burak</SelectItem>
            <SelectItem value="pineapple">Yac</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
// className="col-span-3"
