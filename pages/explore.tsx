import useUsers from "@/hooks/useUsers";

import Meta from "@/components/Meta";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import UserCard from "@/components/users/UserCard";
import UserCardSkeleton from "@/components/skeletons/UserCardSkeleton";

const Explore = () => {
  const { data: fetchedUsers = [], isLoading } = useUsers();

  return (
    <>
      <Meta title="Explore | X" />
      <Header label="Explore" showBackArrow />
      <div className="flex flex-col gap-4 p-4">
        <SearchBar />
        <div
          className="
            w-full flex flex-col 
            gap-3 lg:gap-4 p-4
            rounded-xl bg-[#F7F9F9]
          "
        >
          <h4 className="text-lg font-semibold">Recommended for you</h4>
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <UserCardSkeleton key={i} />
              ))
            : fetchedUsers.map((user: Record<string, any>) => (
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
      </div>
    </>
  );
};

export default Explore;
