import { useRouter } from "next/router";

import useFollow from "@/hooks/useFollow";

import Avatar from "./Avatar";
import Button from "./Button";
import { RiVerifiedBadgeFill } from "react-icons/ri";

interface UserCardProps {
  id: string;
  name: string;
  username: string;
  verified?: boolean;
}

const UserCard: React.FC<UserCardProps> = ({
  id,
  name,
  username,
  verified,
}) => {
  const router = useRouter();
  const { isFollowing, toggleFollow } = useFollow(id);

  return (
    <div className="w-full px-2 flex flex-row justify-between items-center">
      <div
        onClick={() => router.push(`/profile/${id}`)}
        className="flex flex-row gap-3 items-center"
      >
        <Avatar userId={id} />
        <div className="flex flex-col cursor-pointer">
          <p
            className="
              flex items-center gap-0.5
              font-medium text-sm hover:underline
            "
          >
            {name}
            {verified && <RiVerifiedBadgeFill color="blue" size={14} />}
          </p>
          <span className="font-light text-xs">@{username}</span>
        </div>
      </div>
      <Button
        rounded
        size="small"
        label={isFollowing ? "Unfollow" : "Follow"}
        variant={isFollowing ? "outline" : "primary"}
        onClick={toggleFollow}
      />
    </div>
  );
};

export default UserCard;
