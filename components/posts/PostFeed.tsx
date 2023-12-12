import usePosts from "@/hooks/usePosts";

import PostItem from "./PostItem";

interface PostFeedProps {
  userId?: string;
}

const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
  const { data: posts = [] } = usePosts(userId);

  return (
    <>
      {posts.map((post: Record<string, any>) => (
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