import { useMemo } from "react";
import { format } from "date-fns";
import { BiCalendar } from "react-icons/bi";

import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";

import Button from "../Button";
import { SlLocationPin } from "react-icons/sl";
import { BsBriefcase } from "react-icons/bs";

interface UserBioProps {
  userId: string;
}

const UserBio: React.FC<UserBioProps> = ({ userId }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedUser } = useUser(userId);

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
            onClick={() => {}}
            label="Edit Profile"
          />
        ) : (
          <Button variant="primary" rounded onClick={() => {}} label="Follow" />
        )}
      </div>
      <div className="mt-6 px-4">
        <div className="flex flex-col">
          <p className="text-xl font-semibold">{fetchedUser?.name}</p>
          <p className="text-base text-zinc-600">@{fetchedUser?.username}</p>
        </div>
        <div className="flex flex-col mt-3">
          <p>{fetchedUser?.bio}</p>
          <div className="flex items-center flex-wrap gap-2.5 mt-2">
            {fetchedUser?.location && (
              <div className="flex flex-row items-center gap-1 text-zinc-500">
                <SlLocationPin size={16} />
                <p className="text-sm">{fetchedUser?.location}</p>
              </div>
            )}
            {fetchedUser?.profession && (
              <div className="flex flex-row items-center gap-1 text-zinc-500">
                <BsBriefcase size={16} />
                <p className="text-sm">{fetchedUser?.profession}</p>
              </div>
            )}
            <div className="flex flex-row items-center gap-1 text-zinc-500">
              <BiCalendar size={16} />
              <p className="text-sm">Joined {createdAt}</p>
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
