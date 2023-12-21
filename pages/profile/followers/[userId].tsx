import { useRouter } from "next/router";

import useFriends from "@/hooks/useFriends";
import { useEffect, useState } from "react";
import useUser from "@/hooks/useUser";
import Meta from "@/components/Meta";
import Header from "@/components/Header";
import UserCard from "@/components/users/UserCard";
import UserCardSkeleton from "@/components/skeletons/UserCardSkeleton";
import MiniNav from "@/components/MiniNav";

const Followers = () => {
  const router = useRouter();
  const { userId } = router.query;
  const [title, setTitle] = useState("Followers | X");
  const { data: fetchedUser, isLoading: isUserLoading } = useUser(
    userId as string
  );
  const { data: fetchedFollowers = [], isLoading: isUsersLoading } = useFriends(
    "followers",
    userId as string
  );

  useEffect(() => {
    if (fetchedUser?.name) {
      setTitle(
        `People following ${fetchedUser?.name} (@${fetchedUser?.username}) | X`
      );
    }
  }, [fetchedUser?.name, fetchedUser?.username]);

  return (
    <>
      <Meta title={title} />
      <Header
        showBackArrow
        label={isUserLoading ? "Followers" : fetchedUser?.name}
        secLabel={isUserLoading ? "" : `@${fetchedUser?.username}`}
      />
      <MiniNav />
      {isUsersLoading ? (
        Array.from({ length: 5 }).map((_, i) => <UserCardSkeleton key={i} />)
      ) : fetchedFollowers.length > 0 ? (
        <div className="w-full flex flex-col gap-3 lg:gap-4 p-3">
          {fetchedFollowers.map((user: Record<string, any>) => (
            <UserCard
              key={user.id}
              id={user.id}
              name={user.name}
              username={user.username}
              verified={user.verified}
              bio={user.bio}
              btnSize="lg"
              showBio
            />
          ))}
        </div>
      ) : (
        <div className="px-4 py-8 flex flex-col items-center gap-2">
          <h4 className="text-xl sm:text-2xl font-semibold">
            @{fetchedUser?.username} isn’t followed by anyone
          </h4>
          <p className="font-light text-sm">
            Once they get followed by accounts, they’ll show up here.
          </p>
        </div>
      )}
    </>
  );
};

export default Followers;
