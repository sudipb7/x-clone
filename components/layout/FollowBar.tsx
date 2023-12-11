import { useMemo } from "react";
import { useRouter } from "next/router";
import { RiVerifiedBadgeFill } from "react-icons/ri";

import useUsers from "@/hooks/useUsers";
import useCurrentUser from "@/hooks/useCurrentUser";

import Avatar from "../Avatar";
import Button from "../Button";

const FollowBar = () => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedUsers = [] } = useUsers();
  const router = useRouter();

  const users = useMemo(() => {
    if (!currentUser) {
      return fetchedUsers;
    }

    let filteredUsers = fetchedUsers.filter(
      (user: Record<string, any>) => user.id !== currentUser.id
    );
    return filteredUsers;
  }, [fetchedUsers, currentUser]);

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
      <div
        className="
          flex flex-col items-start
          justify-center w-full gap-3
        "
      >
        {users.map((user: Record<any, string>) => (
          <div
            key={user.id}
            className="w-full px-2 flex flex-row justify-between items-center"
          >
            <div
              onClick={() => router.push(`/profile/${user.id}`)}
              className="flex flex-row gap-3 items-center"
            >
              <Avatar userId={user.id} />
              <div className="flex flex-col cursor-pointer">
                <p 
                  className="
                    flex items-center gap-0.5
                    font-medium text-sm hover:underline
                  "
                >
                  {user.name}
                  {user.verified && <RiVerifiedBadgeFill color="blue" size={14} />}
                </p>
                <span className="font-light text-xs">
                  @{user.username}
                </span>
              </div>
            </div>
            <Button 
              rounded 
              label="Follow" 
              size="small" 
              onClick={() => {}} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FollowBar;
