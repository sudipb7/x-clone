import Form from "@/components/Form";
import Header from "@/components/Header";
import Meta from "@/components/Meta";
import PostFeed from "@/components/posts/PostFeed";

const Home = () => {
  return (
    <>
      <Meta title="Home | X" />
      <Header label="Home" />
      <div className="max-sm:hidden">
        <Form placeholder="What's happening?!" />
      </div>
      <PostFeed />
    </>
  );
};

export default Home;
