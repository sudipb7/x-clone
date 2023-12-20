import useBookmarks from "@/hooks/useBookmarks";

import PostItem from "./PostItem";
import PostSkeleton from "../skeletons/PostSkeleton";

interface BookmarkProps {
  userId: string;
}

const BookmarkFeed: React.FC<BookmarkProps> = ({ userId }) => {
  const { data: fetchedBookmarks = [], isLoading } = useBookmarks();

  return (
    <>
      {isLoading
        ? Array.from({ length: 5 }).map((_, i) => <PostSkeleton key={i} />)
        : fetchedBookmarks.map((bookmarkedPost: Record<string, any>) => (
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
