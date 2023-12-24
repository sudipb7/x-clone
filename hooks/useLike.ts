import axios from "axios";
import { toast } from "react-hot-toast";
import { useMemo, useCallback } from "react";

import { useModal } from "./use-modal-store";
import useCurrentUser from "./useCurrentUser";
import usePost from "./usePost";
import usePosts from "./usePosts";
import useReplies from "./useReplies";

const useLike = ({
  postId,
  userId,
  parentId,
}: {
  postId: string;
  userId?: string;
  parentId?: string;
}) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
  const { mutate: mutateFetchedPosts } = usePosts(userId);
  const { mutate: mutateReplies } = useReplies(parentId);

  const { onOpen } = useModal();

  const hasLiked = useMemo(() => {
    const list = fetchedPost?.likedIds || [];

    return list.includes(currentUser?.id);
  }, [fetchedPost?.likedIds, currentUser?.id]);

  const toggleLike = useCallback(async () => {
    if (!currentUser) {
      return onOpen("login");
    }

    try {
      let request;

      if (hasLiked) {
        request = () => axios.delete("/api/like", { data: { postId } });
      } else {
        request = () => axios.post("/api/like", { postId });
      }

      await request();
      mutateFetchedPost();
      mutateFetchedPosts();
      if (parentId) {
        mutateReplies();
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }, [
    currentUser,
    hasLiked,
    postId,
    mutateFetchedPost,
    mutateFetchedPosts,
    onOpen,
    parentId,
    mutateReplies,
  ]);

  return {
    hasLiked,
    toggleLike,
  };
};

export default useLike;
