import useCurrentUser from "@/hooks/useCurrentUser";

import Header from "@/components/Header";
import Meta from "@/components/Meta";
import BookmarkFeed from "@/components/posts/BookmarkFeed";

const Bookmarks = () => {
  const { data: currentUser } = useCurrentUser();

  return (
    <>
      <Meta title="Bookmarks | X" />
      <Header
        showBackArrow
        label="Bookmarks"
        secLabel={`@${currentUser?.username}`}
      />
      <BookmarkFeed userId={currentUser?.id} />
    </>
  );
};

export default Bookmarks;
