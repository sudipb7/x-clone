import axios from "axios";
import { toast } from "react-hot-toast";
import { useMemo, useCallback } from "react";

import { useModal } from "./use-modal-store";
import useCurrentUser from "./useCurrentUser";
import usePosts from "./usePosts";
import useUser from "./useUser";

const useVerify = (userId: string) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(userId);
  const { mutate: mutatePosts } = usePosts();
  const { mutate: mutateUserPosts } = usePosts(userId);

  const { onOpen } = useModal();

  const isVerified = useMemo(() => {
    return currentUser?.verified;
  }, [currentUser?.verified]);

  const toggleVerification = useCallback(async () => {
    if (!currentUser) {
      return onOpen("login");
    }

    try {
      let request;

      if (isVerified) {
        request = () => axios.delete("/api/verify");
      } else {
        request = () => axios.post("/api/verify");
      }

      await request();

      if (!isVerified) {
        toast.success("Thanks for subscribing");
      }

      mutateCurrentUser();
      mutateFetchedUser();
      mutatePosts();
      mutateUserPosts();
    } catch (error) {
      toast.error("Something went wrong");
    }
  }, [
    currentUser,
    isVerified,
    onOpen,
    mutatePosts,
    mutateUserPosts,
    mutateFetchedUser,
    mutateCurrentUser,
  ]);

  return {
    isVerified,
    toggleVerification,
  };
};

export default useVerify;
