import { useMemo } from "react";
import { useRouter } from "next/router";
import { RiVerifiedBadgeFill } from "react-icons/ri";

import useFollow from "@/hooks/useFollow";
import useCurrentUser from "@/hooks/useCurrentUser";

import Avatar from "../Avatar";
import Button from "../Button";

interface UserCardProps {
  id: string;
  name: string;
  username: string;
  verified?: boolean;
  bio?: boolean;
  btnSize?: "lg" | "sm";
  showBio?: boolean;
  hideBtn?: boolean;
}

const UserCard: React.FC<UserCardProps> = ({
  id,
  name,
  username,
  verified,
  bio,
  showBio,
  hideBtn,
  btnSize = "sm",
}) => {
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();
  const { isFollowing, toggleFollow } = useFollow(id);

  const isLoggedInUser = useMemo(() => {
    if (!currentUser?.id) return false;
    return currentUser?.id === id;
  }, [currentUser?.id, id]);

  return (
    <div className="w-full px-2 flex flex-row justify-between items-start">
      <div
        onClick={() => router.push(`/profile/${id}`)}
        className="flex flex-row gap-3 items-start"
      >
        <Avatar userId={id} />
        <div className="flex flex-col cursor-pointer">
          <p
            className="
              flex items-center gap-0.5 transition
              font-medium text-sm hover:underline
            "
          >
            {name}
            {verified && <RiVerifiedBadgeFill color="#0EA5E9" size={14} />}
          </p>
          <span className="text-xs">@{username}</span>
          {showBio && bio ? (
            <span className="text-xs sm:text-sm mt-0.5">{bio}</span>
          ) : null}
        </div>
      </div>
      {!hideBtn && !isLoggedInUser ? (
        <Button
          rounded
          size={btnSize === "lg" ? "default" : "small"}
          label={isFollowing ? "Unfollow" : "Follow"}
          variant={isFollowing ? "outline" : "primary"}
          onClick={toggleFollow}
        />
      ) : null}
    </div>
  );
};

export default UserCard;
