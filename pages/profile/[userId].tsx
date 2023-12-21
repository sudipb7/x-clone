import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import useUser from "@/hooks/useUser";

import Header from "@/components/Header";
import UserHero from "@/components/users/UserHero";
import UserBio from "@/components/users/UserBio";
import Meta from "@/components/Meta";
import PostFeed from "@/components/posts/PostFeed";
import ProfileSkeleton from "@/components/skeletons/ProfileSkeleton";

const ProfilePage = () => {
  const router = useRouter();
  const { userId } = router.query;
  const [title, setTitle] = useState("Profile | X");
  const { data: fetchedUser, isLoading } = useUser(userId as string);

  useEffect(() => {
    if (fetchedUser?.name) {
      setTitle(`${fetchedUser?.name} (@${fetchedUser?.username}) | X`);
    }
  }, [fetchedUser?.name, fetchedUser?.username]);

  return (
    <>
      <Meta title={title} />
      <Header
        label={fetchedUser?.name}
        secLabel={`${fetchedUser?.posts?.length || 0} posts`}
        showBackArrow
        showDropdown
      />
      {isLoading ? (
        <ProfileSkeleton />
      ) : (
        <>
          <UserHero userId={userId as string} />
          <UserBio userId={userId as string} />{" "}
        </>
      )}
      <PostFeed userId={userId as string} />
    </>
  );
};

export default ProfilePage;
