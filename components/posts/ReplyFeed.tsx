import useReplies from "@/hooks/useReplies";
import useCurrentUser from "@/hooks/useCurrentUser";

import PostItem from "./PostItem";

interface ReplyFeedProps {
  postId: string;
}

const ReplyFeed: React.FC<ReplyFeedProps> = ({ postId }) => {
  const { data: fetchedReplies = [] } = useReplies(postId);
  const { data: currentUser } = useCurrentUser();

  return (
    <>
      {fetchedReplies?.map((reply: Record<string, any>) => (
        <PostItem 
          key={reply.id} 
          data={reply} 
          userId={currentUser?.id} 
        />
      ))}
    </>
  );
};

export default ReplyFeed;
