import { useMemo } from "react";

import useUsers from "@/hooks/useUsers";
import useCurrentUser from "@/hooks/useCurrentUser";

import UserCard from "../users/UserCard";
import UserCardSkeleton from "../skeletons/UserCardSkeleton";

const FollowBar = () => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedUsers = [], isLoading } = useUsers();

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
        w-full bg-[#F7F9F9] rounded-2xl p-4 max-lg:hidden
      "
    >
      <h2 className="font-semibold text-xl mb-2">Who to follow</h2>
      <div
        className="
          flex flex-col items-start
          justify-center w-full gap-3
        "
      >
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <UserCardSkeleton key={i} />
            ))
          : users.map((user: Record<string, any>) => (
              <UserCard
                key={user.id}
                id={user.id}
                name={user.name}
                username={user.username}
                verified={user.verified as boolean}
              />
            ))}
      </div>
    </div>
  );
};

export default FollowBar;
