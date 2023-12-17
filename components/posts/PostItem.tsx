import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { AiOutlineHeart, AiOutlineMessage, AiFillHeart } from "react-icons/ai";
import { RiVerifiedBadgeFill } from "react-icons/ri";

import useLike from "@/hooks/useLike";
import useBookmark from "@/hooks/useBookmark";
import useLoginModal from "@/hooks/useLoginModal";
import useCurrentUser from "@/hooks/useCurrentUser";

import Avatar from "../Avatar";
import usePost from "@/hooks/usePost";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";

interface PostItemProps {
  data: Record<string, any>;
  userId?: string;
}

const PostItem: React.FC<PostItemProps> = ({ data, userId }) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();
  const { data: parentPost } = usePost(data?.parentId);
  const { hasLiked, toggleLike } = useLike({
    postId: data?.id,
    userId,
    parentId: data?.parentId,
  });
  const { isBookmarked, toggleBookmark } = useBookmark({
    postId: data?.id,
    userId,
    parentId: data?.parentId,
  });

  const goToUser = useCallback(
    (event: any) => {
      event.stopPropagation();
      router.push(`/profile/${data.user.id}`);
    },
    [router, data?.user?.id]
  );

  const goToParentPost = useCallback(
    (event: any) => {
      event.stopPropagation();
      router.push(`/posts/${parentPost.id}`);
    },
    [router, parentPost?.id]
  );

  const goToPost = useCallback(() => {
    router.push(`/posts/${data?.id}`);
  }, [router, data?.id]);

  const onLike = useCallback(
    (event: any) => {
      event.stopPropagation();
      if (!currentUser) {
        return loginModal.onOpen();
      }

      toggleLike();
    },
    [loginModal, toggleLike, currentUser]
  );

  const onBookmark = useCallback(
    (event: any) => {
      event.stopPropagation();
      if (!currentUser) {
        return loginModal.onOpen();
      }

      toggleBookmark();
    },
    [loginModal, toggleBookmark, currentUser]
  );

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data?.createdAt]);

  const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart;

  const BookmarkIcon = isBookmarked ? IoBookmark : IoBookmarkOutline;

  return (
    <div
      onClick={goToPost}
      className="
        border-b
        p-4 max-sm:p-3
        cursor-pointer
        hover:bg-gray-100/30
      "
    >
      <div className="flex flex-row items-start gap-3">
        <Avatar userId={data?.user?.id} />
        <div className="flex-1">
          <div className="flex flex-row items-center gap-1.5">
            <p
              onClick={goToUser}
              className="
                font-semibold cursor-pointer hover:underline 
                flex flex-row items-center gap-1
              "
            >
              {data?.user?.name}
              {data?.user?.verified && (
                <RiVerifiedBadgeFill color="#0EA5E9" size={16} />
              )}
            </p>
            <span
              onClick={goToUser}
              className="text-zinc-500 cursor-pointer hover:underline"
            >
              @{data?.user?.username}
            </span>
            <span className="text-zinc-400 text-sm">{createdAt}</span>
          </div>
          {parentPost && (
            <div className="text-zinc-600 text-sm">
              Replying to{" "}
              <span
                onClick={goToParentPost}
                className="text-sky-500 hover:underline"
              >
                @{parentPost?.user?.username}
              </span>
            </div>
          )}
          <div className="mt-0.5 max-sm:text-sm">{data?.body}</div>
          <div className="flex flex-row items-center mt-2 gap-10">
            <div
              className="
                flex 
                flex-row 
                items-center 
                text-neutral-500 
                gap-2 
                cursor-pointer 
                transition 
                hover:text-sky-500
              "
            >
              <AiOutlineMessage size={18} />
              <p className="max-sm:text-sm">{data?.replies?.length || 0}</p>
            </div>
            <div
              onClick={onLike}
              className="
                flex 
                flex-row 
                items-center 
                text-neutral-500 
                gap-2 
                cursor-pointer 
                transition 
                hover:text-red-500
              "
            >
              <LikeIcon size={18} color={hasLiked ? "#F91880" : ""} />
              <p className="max-sm:text-sm">{data?.likedIds?.length || 0}</p>
            </div>
            <div
              onClick={onBookmark}
              className="
                flex 
                flex-row 
                items-center 
                text-neutral-500 
                gap-2 
                cursor-pointer 
                transition 
                hover:text-sky-500
              "
            >
              <BookmarkIcon size={18} color={isBookmarked ? "#0EA5E9" : ""} />
              <p className="max-sm:text-sm">
                {data?.bookmarkedIds?.length || 0}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
