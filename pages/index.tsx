import Form from "@/components/Form";
import Header from "@/components/Header";
import Meta from "@/components/Meta";
import PostFeed from "@/components/posts/PostFeed";

const Home = () => {
  return (
    <>
      <Meta title="Home | X" />
      <Header label="Home" />
      <Form placeholder="What's happening?!" />
      <PostFeed />
    </>
  );
};

export default Home;
