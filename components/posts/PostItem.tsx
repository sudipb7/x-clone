import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { AiOutlineHeart, AiOutlineMessage, AiFillHeart } from "react-icons/ai";

import useLike from "@/hooks/useLike";
import useLoginModal from "@/hooks/useLoginModal";
import useCurrentUser from "@/hooks/useCurrentUser";

import Avatar from "../Avatar";

interface PostItemProps {
  data: Record<string, any>;
  userId?: string;
}

const PostItem: React.FC<PostItemProps> = ({ data, userId }) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();
  const { hasLiked, toggleLike } = useLike({ postId: data?.id, userId });

  const goToUser = useCallback(
    (event: any) => {
      event.stopPropagation();
      router.push(`/profile/${data.user.id}`);
    },
    [router, data?.user?.id]
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

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data?.createdAt]);

  const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart;

  return (
    <div
      onClick={goToPost}
      className="
        border-b
        p-4
        cursor-pointer
        hover:bg-gray-100/50
      "
    >
      <div className="flex flex-row items-start gap-3">
        <Avatar userId={data?.user?.id} />
        <div className="flex-1">
          <div className="flex flex-row items-center gap-2">
            <p
              onClick={goToUser}
              className="font-semibold cursor-pointer hover:underline"
            >
              {data?.user?.name}
            </p>
            <span
              onClick={goToUser}
              className="text-zinc-500 cursor-pointer hover:underline"
            >
              @{data?.user?.username}
            </span>
            <span className="text-zinc-400 text-sm">{createdAt}</span>
          </div>
          <div className="mt-1">{data?.body}</div>
          <div className="flex flex-row items-center mt-3 gap-10">
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
              <AiOutlineMessage size={20} />
              <p>{data?.replies?.length || 0}</p>
            </div>
            <div
              onClick={data.isComment ? goToPost : toggleLike}
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
              <LikeIcon size={20} color={hasLiked ? "red" : ""} />
              <p>{data?.likedIds?.length || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
