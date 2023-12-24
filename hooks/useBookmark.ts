import axios from "axios";
import { toast } from "react-hot-toast";
import { useMemo, useCallback } from "react";

import { useModal } from "./use-modal-store";
import useCurrentUser from "./useCurrentUser";
import usePost from "./usePost";
import usePosts from "./usePosts";
import useReplies from "./useReplies";
import useBookmarks from "./useBookmarks";

const useBookmark = ({
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
  const { mutate: mutateFetchedReplies } = useReplies(parentId);
  const { mutate: mutateFetchedBookmarks } = useBookmarks();

  const { onOpen } = useModal();

  const isBookmarked = useMemo(() => {
    const list = fetchedPost?.bookmarkedIds || [];

    return list.includes(currentUser?.id);
  }, [fetchedPost?.bookmarkedIds, currentUser?.id]);

  const toggleBookmark = useCallback(async () => {
    if (!currentUser) {
      return onOpen("login");
    }

    try {
      let request;

      if (isBookmarked) {
        request = () => axios.delete("/api/bookmark", { data: { postId } });
      } else {
        request = () => axios.post("/api/bookmark", { postId });
      }

      await request();

      if (!isBookmarked) {
        toast.success("Post added to your bookmarks");
      }
      mutateFetchedPost();
      mutateFetchedPosts();
      mutateFetchedBookmarks();
      if (parentId) {
        mutateFetchedReplies();
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }, [
    currentUser,
    isBookmarked,
    postId,
    mutateFetchedPost,
    mutateFetchedPosts,
    onOpen,
    parentId,
    mutateFetchedReplies,
    mutateFetchedBookmarks,
  ]);

  return {
    isBookmarked,
    toggleBookmark,
  };
};

export default useBookmark;
