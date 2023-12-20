import useReplies from "@/hooks/useReplies";
import useCurrentUser from "@/hooks/useCurrentUser";

import PostItem from "./PostItem";
import PostSkeleton from "../skeletons/PostSkeleton";

interface ReplyFeedProps {
  postId: string;
}

const ReplyFeed: React.FC<ReplyFeedProps> = ({ postId }) => {
  const { data: fetchedReplies = [], isLoading } = useReplies(postId);
  const { data: currentUser } = useCurrentUser();

  return (
    <>
      {isLoading
        ? Array.from({ length: 3 }).map((_, i) => <PostSkeleton key={i} />)
        : fetchedReplies?.map((reply: Record<string, any>) => (
            <PostItem key={reply.id} data={reply} userId={currentUser?.id} />
          ))}
    </>
  );
};

export default ReplyFeed;
