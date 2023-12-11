import { useRouter } from "next/router";

import useUsers from "@/hooks/useUsers";

import Avatar from "../Avatar";
import Button from "../Button";

const FollowBar = () => {
  const { data: users = [] } = useUsers();
  const router = useRouter();

  if (users.length === 0) {
    return null;
  }

  return (
    <div
      className="
        flex flex-col items-start justify-center
        w-full bg-[#F7F9F9] rounded-2xl p-4
      "
    >
      <h2 className="font-semibold text-xl mb-2">Who to follow</h2>
      <div className="w-full flex flex-col items-start justify-center gap-3">
        {users.map((user: Record<any, string>) => (
          <div
            key={user.id}
            className="w-full px-2 flex flex-row justify-between items-center"
          >
            <div
              onClick={() => router.push(`profile/${user.id}`)}
              className="flex flex-row gap-3 items-center"
            >
              <Avatar userId={user.id} />
              <div className="flex flex-col cursor-pointer">
                <p className="font-medium text-sm hover:underline">
                  {user.name}
                </p>
                <span className="font-light text-xs">@{user.username}</span>
              </div>
            </div>
            <Button label="Follow" size="small" onClick={() => {}} rounded />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FollowBar;
