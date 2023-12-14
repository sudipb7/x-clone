import { useMemo } from "react";
import PostItem from "./PostItem";

interface CommentFeedProps {
  replies: Record<string, any>[];
}

const CommentFeed: React.FC<CommentFeedProps> = ({ replies }) => {
  const comments = useMemo(() => {
    let list = [...replies];
    list.map((item) => (item["isComment"] = true));

    return list;
  }, [replies]);

  return (
    <>
      {comments?.map((comment: Record<string, any>) => (
        <PostItem key={comment.id} data={comment} />
      ))}
    </>
  );
};

export default CommentFeed;
