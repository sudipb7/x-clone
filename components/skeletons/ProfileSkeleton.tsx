const ProfileSkeleton = () => {
  return (
    <div className="w-full">
      <div className="w-full h-36 md:h-44 relative skeleton">
        <div className="absolute max-sm:-bottom-14 -bottom-16 left-4">
          <div
            className="
              skeleton rounded-full h-24 w-24 
              sm:h-28 sm:w-28 md:h-32 md:w-32
            "
          ></div>
        </div>
      </div>

      <div className="p-4 pb-4">
        <div className="flex justify-end">
          <div className="h-8 w-20 rounded-full skeleton"></div>
        </div>
        <div className="w-1/3 h-5 rounded-md skeleton mt-4 md:mt-7"></div>
        <div className="w-[90%] h-6 rounded-md skeleton mt-1.5"></div>
        <div className="w-[90%] h-6 rounded-md skeleton mt-1.5"></div>
        <div className="w-1/3 h-4 rounded-md skeleton mt-1.5"></div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
