import { useMemo } from "react";
import { format } from "date-fns";
import { BiCalendar } from "react-icons/bi";
import { SlLocationPin } from "react-icons/sl";
import { BsBriefcase } from "react-icons/bs";
import { RiVerifiedBadgeFill } from "react-icons/ri";

import useFollow from "@/hooks/useFollow";
import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/modals/useEditModal";
import useUser from "@/hooks/useUser";

import Button from "../Button";

interface UserBioProps {
  userId: string;
}

const UserBio: React.FC<UserBioProps> = ({ userId }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedUser } = useUser(userId);
  const { toggleFollow, isFollowing } = useFollow(userId);
  const editModal = useEditModal();

  const createdAt = useMemo(() => {
    if (!fetchedUser?.createdAt) {
      return null;
    }

    return format(new Date(fetchedUser.createdAt), "MMMM yyyy");
  }, [fetchedUser?.createdAt]);

  return (
    <div className="border-b pb-4">
      <div className="flex justify-end p-2">
        {currentUser?.id === userId ? (
          <Button
            variant="outline"
            rounded
            onClick={editModal.onOpen}
            label="Edit Profile"
          />
        ) : (
          <Button
            variant={isFollowing ? "secondary" : "primary"}
            rounded
            onClick={toggleFollow}
            label={isFollowing ? "Unfollow" : "Follow"}
          />
        )}
      </div>
      <div className="max-sm:mt-2.5 mt-4 px-4">
        <div className="flex flex-col">
          <p className="sm:text-lg md:text-xl font-semibold flex items-center gap-1">
            {fetchedUser?.name}
            {fetchedUser?.verified && (
              <RiVerifiedBadgeFill color="#0EA5E9" size={16} />
            )}
          </p>
          <p className="text-xs sm:text-base text-zinc-600">
            @{fetchedUser?.username}
          </p>
        </div>
        <div className="flex flex-col mt-1.5 lg:mt-2.5 max-sm:text-sm">
          <p>{fetchedUser?.bio}</p>
          <div className="flex items-center flex-wrap gap-1.5 md:gap-2 lg:gap-2.5 mt-2">
            {fetchedUser?.location && (
              <div className="flex flex-row items-center gap-1 text-zinc-500">
                <SlLocationPin size={15} />
                <p className="text-xs md:text-sm">{fetchedUser?.location}</p>
              </div>
            )}
            {fetchedUser?.profession && (
              <div className="flex flex-row items-center gap-1 text-zinc-500">
                <BsBriefcase size={15} />
                <p className="text-xs md:text-sm">{fetchedUser?.profession}</p>
              </div>
            )}
            <div className="flex flex-row items-center gap-1 text-zinc-500">
              <BiCalendar size={15} />
              <p className="text-xs md:text-sm">Joined {createdAt}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center text-sm mt-3 gap-6">
          <div className="flex flex-row items-center gap-1">
            <p>{fetchedUser?.followingIds?.length}</p>
            <p className="text-zinc-500">Followings</p>
          </div>
          <div className="flex flex-row items-center gap-1">
            <p>{fetchedUser?.followersCount || 0}</p>
            <p className="text-zinc-500">Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBio;
