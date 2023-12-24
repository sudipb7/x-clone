import axios from "axios";
import { toast } from "react-hot-toast";
import { useMemo, useCallback } from "react";

import useCurrentUser from "./useCurrentUser";
import { useModal } from "./use-modal-store";
import useUser from "./useUser";

const useFollow = (userId: string) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(userId);

  const { onOpen } = useModal();

  const isFollowing = useMemo(() => {
    const list = currentUser?.followingIds || [];

    return list.includes(userId);
  }, [userId, currentUser?.followingIds]);

  const toggleFollow = useCallback(async () => {
    if (!currentUser) {
      return onOpen("login");
    }

    try {
      let request;

      if (isFollowing) {
        request = () => axios.delete("/api/follow", { params: { userId } });
      } else {
        request = () => axios.post("/api/follow", { userId });
      }

      await request();

      mutateCurrentUser();
      mutateFetchedUser();
    } catch (error) {
      toast.error("Something went wrong");
    }
  }, [
    currentUser,
    isFollowing,
    userId,
    mutateCurrentUser,
    mutateFetchedUser,
    onOpen,
  ]);

  return {
    isFollowing,
    toggleFollow,
  };
};

export default useFollow;
