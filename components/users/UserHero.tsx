import Image from "next/image";

import useUser from "@/hooks/useUser";

import Avatar from "../Avatar";

interface UserHeroProps {
  userId: string;
}

const UserHero: React.FC<UserHeroProps> = ({ userId }) => {
  const { data: fetchedUser } = useUser(userId);

  return (
    <div className="bg-sky-500 h-36 md:h-44 relative">
      {fetchedUser?.coverImage && (
        <Image
          src={fetchedUser?.coverImage}
          fill
          alt="Cover Image"
          style={{ objectFit: "cover" }}
        />
      )}
      <div className="absolute max-sm:-bottom-14 -bottom-16 left-4">
        <Avatar userId={userId} isLarge hasBorder />
      </div>
    </div>
  );
};

export default UserHero;
