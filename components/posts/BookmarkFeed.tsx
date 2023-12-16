import useBookmarks from "@/hooks/useBookmarks";

import PostItem from "./PostItem";

interface BookmarkProps {
  userId: string;
}

const BookmarkFeed: React.FC<BookmarkProps> = ({ userId }) => {
  const { data: fetchedBookmarks = [] } = useBookmarks();

  return (
    <>
      {fetchedBookmarks.map((bookmarkedPost: Record<string, any>) => (
        <PostItem
          key={bookmarkedPost.id}
          userId={userId}
          data={bookmarkedPost}
        />
      ))}
    </>
  );
};

export default BookmarkFeed;
