import { useRouter } from "next/router";

import usePost from "@/hooks/usePost";

import Form from "@/components/Form";
import Header from "@/components/Header";
import PostItem from "@/components/posts/PostItem";
import CommentFeed from "@/components/posts/CommentFeed";

const PostView = () => {
  const router = useRouter();
  const { postId } = router.query;

  const { data: fetchedPost } = usePost(postId as string);

  return (
    <>
      <Header showBackArrow label="Tweet" />
      <PostItem data={fetchedPost} />
      <Form
        postId={postId as string}
        isComment
        placeholder="Tweet your reply"
      />
      <CommentFeed replies={fetchedPost?.replies} />
    </>
  );
};

export default PostView;
