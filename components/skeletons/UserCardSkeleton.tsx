const UserCardSkeleton = () => {
  return (
    <div className="w-full p-2 flex items-center justify-between">
      <div className="flex items-center gap-3 flex-1">
        <div className="h-10 w-10 rounded-full skeleton"></div>
        <div className="flex-1">
          <div className="h-4 w-1/2 rounded-md skeleton"></div>
          <div className="h-3 w-1/2 rounded-md mt-1 skeleton"></div>
        </div>
      </div>
      <div className="h-7 w-[5rem] rounded-full skeleton"></div>
    </div>
  );
};

export default UserCardSkeleton;
