import { useRouter } from "next/router";

import usePost from "@/hooks/usePost";

import Form from "@/components/Form";
import Header from "@/components/Header";
import PostItem from "@/components/posts/PostItem";
import ReplyFeed from "@/components/posts/ReplyFeed";
import Meta from "@/components/Meta";

const PostView = () => {
  const router = useRouter();
  const { postId } = router.query;

  const { data: fetchedPost } = usePost(postId as string);

  return (
    <>
      <Meta title={`${fetchedPost?.user?.name} on X: "${fetchedPost?.body}"`} />
      <Header showBackArrow label="Tweet" />
      <PostItem data={fetchedPost} />
      <Form
        postId={postId as string}
        isComment
        placeholder="Tweet your reply"
      />
      <ReplyFeed postId={postId as string} />
    </>
  );
};

export default PostView;
