import FollowBar from "./FollowBar";

const RightSidebar = () => {
  return (
    <div
      className="
        sticky top-0 right-0 
        flex flex-col items-center justify-start
        p-3 lg:p-4 h-screen 
        w-14 lg:w-[320px] xl:w-[340px]
        max-md:hidden border-l
      "
    >
      <FollowBar />
    </div>
  );
};

export default RightSidebar;
