import usePosts from "@/hooks/usePosts";

import PostItem from "./PostItem";
import PostSkeleton from "../skeletons/PostSkeleton";

interface PostFeedProps {
  userId?: string;
}

const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
  const { data: posts = [], isLoading } = usePosts(userId);

  return (
    <>
      {isLoading
        ? Array.from({ length: 5 }).map((_, i) => <PostSkeleton key={i} />)
        : posts.map((post: Record<string, any>) => (
            <PostItem 
              key={post.id} 
              userId={userId} 
              data={post} 
            />
          ))}
    </>
  );
};

export default PostFeed;
