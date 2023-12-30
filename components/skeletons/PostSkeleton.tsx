const PostSkeleton = () => {
  return (
    <div className="w-full p-3">
      <div className="flex flex-row items-start gap-3">
        <div className="h-10 w-10 rounded-full skeleton"></div>
        <div className="flex-1">
          <div className="skeleton rounded-md max-sm:w-4/5 lg:w-1/2 h-7"></div>
          <div className="skeleton rounded-md w-full h-16 my-2"></div>
          <div className="skeleton rounded-md w-full h-5"></div>
        </div>
      </div>
    </div>
  );
};

export default PostSkeleton;
