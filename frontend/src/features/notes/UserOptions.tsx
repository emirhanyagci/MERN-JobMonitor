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
import { useGetUsersQuery } from "../users/userApi";
import { LoadingSpinner } from "@/components/LoadingSpinner";
export default function UserOptions({
  currentUser,
  setUserId,
}: {
  currentUser: User | undefined;
  setUserId: (id: string) => void;
}) {
  const { data: users, isSuccess, isLoading, isError } = useGetUsersQuery();
  let mappedUsers;
  let filteredUsers = [] as User[];
  if (users?.length) {
    filteredUsers = users.filter((user) => user.active);
  }

  if (isSuccess) {
    mappedUsers = filteredUsers.map(({ _id, username }) => {
      return { id: _id, username };
    });
  }
  if (isError) {
    // handle this case
  }
  function selectHandler(selected: string) {
    setUserId(selected);
  }
  if (isLoading) {
    return (
      <>
        <Label htmlFor="username" className="text-right text-sm">
          Username
        </Label>
        <LoadingSpinner />
      </>
    );
  }
  return (
    <>
      <Label htmlFor="username" className="text-right text-sm">
        Username
      </Label>
      <Select
        onValueChange={selectHandler}
        defaultValue={currentUser ? currentUser._id : ""}
      >
        <SelectTrigger className="col-span-3 ">
          <SelectValue placeholder="Select a user" />
        </SelectTrigger>
        <SelectContent className="col-span-3">
          <SelectGroup>
            {mappedUsers?.map((user) => (
              <SelectItem key={user.id} value={user.id}>
                {user.username}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
// className="col-span-3"
