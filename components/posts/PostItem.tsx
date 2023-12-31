import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { MouseEventHandler, useCallback, useMemo, useState } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { AiOutlineHeart, AiOutlineMessage, AiFillHeart } from "react-icons/ai";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import { LuCopy, LuCheck } from "react-icons/lu";

import { useModal } from "@/hooks/use-modal-store";
import useLike from "@/hooks/useLike";
import useBookmark from "@/hooks/useBookmark";
import useCurrentUser from "@/hooks/useCurrentUser";
import usePost from "@/hooks/usePost";

import Avatar from "../Avatar";

interface PostItemProps {
  data: Record<string, any>;
  userId?: string;
}

const PostItem: React.FC<PostItemProps> = ({ data, userId }) => {
  const router = useRouter();
  const { onOpen } = useModal();
  const [copied, setCopied] = useState(false);

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
        return onOpen("login");
      }

      toggleLike();
    },
    [onOpen, toggleLike, currentUser]
  );

  const onReply = useCallback(
    (event: any) => {
      event.stopPropagation();
      if (!currentUser) {
        return onOpen("login");
      }

      if (router.pathname.includes("/posts")) {
        if (router.query?.postId !== data?.id) {
          return onOpen("post", {
            isComment: true,
            postId: data?.id,
            isModal: true,
          });
        }
        return;
      }

      return onOpen("post", {
        isComment: true,
        postId: data?.id,
        isModal: true,
      });
    },
    [onOpen, currentUser, data?.id, router.pathname, router.query?.postId]
  );

  const onBookmark = useCallback(
    (event: any) => {
      event.stopPropagation();
      if (!currentUser) {
        return onOpen("login");
      }

      toggleBookmark();
    },
    [onOpen, toggleBookmark, currentUser]
  );

  const onCopy = useCallback(
    (event: any) => {
      event.stopPropagation();

      const host = typeof window !== "undefined" && window.location.origin ? window.location.origin : "";
      navigator.clipboard.writeText(`${host}/posts/${data.id}`);

      setCopied(true);
      toast.success("Link copied");

      setTimeout(() => {
        setCopied(false);
      }, 1000);
    }, 
    [data?.id]
  );

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    let arr = formatDistanceToNowStrict(new Date(data.createdAt)).split(" ");
    return `${arr[0]}${arr[1].slice(0, 1)}`;
  }, [data?.createdAt]);

  const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart;

  const BookmarkIcon = isBookmarked ? IoBookmark : IoBookmarkOutline;

  return (
    <div
      onClick={goToPost}
      className="
        border-b transition-all
        p-4 max-sm:p-3
        cursor-pointer
        hover:bg-gray-100/30
      "
    >
      <div className="flex flex-row items-start gap-3">
        <Avatar userId={data?.user?.id} />
        <div className="flex-1">
          <div className="flex flex-row items-center gap-1 md:gap-1.5">
            <p
              onClick={goToUser}
              className="
                font-semibold cursor-pointer hover:underline 
                flex flex-row items-center gap-1 max-sm:text-sm transition
              "
            >
              {data?.user?.name}
              {data?.user?.verified && (
                <RiVerifiedBadgeFill color="#0EA5E9" size={16} />
              )}
            </p>
            <span
              onClick={goToUser}
              className="max-sm:text-sm text-zinc-500 cursor-pointer hover:underline transition"
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
          <div className="mt-1 max-sm:text-sm">{data?.body}</div>
          <div className="flex flex-row items-center justify-between mt-2 pr-10">
            <div
              onClick={onReply}
              className="
                flex 
                flex-row 
                items-center 
                text-zinc-700 
                gap-2 
                cursor-pointer 
                transition 
                hover:text-sky-500
              "
            >
              <AiOutlineMessage size={16} />
              <p className="max-sm:text-xs text-sm">
                {data?.replies?.length || 0}
              </p>
            </div>
            <div
              onClick={onLike}
              className="
                flex 
                flex-row 
                items-center 
                text-zinc-700 
                gap-2 
                cursor-pointer 
                transition 
                hover:text-red-500
              "
            >
              <LikeIcon size={16} color={hasLiked ? "#F91880" : ""} />
              <p className="max-sm:text-xs text-sm">
                {data?.likedIds?.length || 0}
              </p>
            </div>
            <div
              onClick={onBookmark}
              className="
                flex 
                flex-row 
                items-center 
                text-zinc-700 
                gap-2 
                cursor-pointer 
                transition 
                hover:text-sky-500
              "
            >
              <BookmarkIcon size={16} color={isBookmarked ? "#0EA5E9" : ""} />
              <p className="max-sm:text-xs text-sm">
                {data?.bookmarkedIds?.length || 0}
              </p>
            </div>
            <div
              onClick={onCopy}
              className="text-zinc-700 hover:text-green-500 transition"
            >
              {copied ? <LuCheck size={16} /> : <LuCopy size={16} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
