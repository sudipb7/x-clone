import { useRouter } from "next/router";
import useUser from "@/hooks/useUser";

import Header from "@/components/Header";
import UserHero from "@/components/users/UserHero";
import UserBio from "@/components/users/UserBio";
import Meta from "@/components/Meta";

const ProfilePage = () => {
  const router = useRouter();
  const { userId } = router.query;

  const { data: fetchedUser, isLoading } = useUser(userId as string);

  return (
    <>
      <Meta title={`${fetchedUser?.name} (@${fetchedUser?.username}) | X`} />
      <Header
        label={fetchedUser?.name}
        secLabel={`${fetchedUser?.posts?.length || 0} posts`}
        showBackArrow
      />
      <UserHero userId={userId as string} />
      <UserBio userId={userId as string} />
    </>
  );
};

export default ProfilePage;
