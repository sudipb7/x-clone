const RightSidebar = () => {
  return (
    <div
      className="
        sticky top-0 right-0 
        flex flex-col items-center justify-start
        p-3 lg:p-4 h-screen 
        w-60 lg:w-[300px] xl:w-[340px]
        max-md:hidden border-l
      "
    >
      <div
        className="
          flex flex-col items-start justify-center
          w-full bg-[#F7F9F9] rounded-2xl p-4
        "
      >
        <h2 className="font-semibold text-xl">Who to follow</h2>
        {/* TODO: Fetch Users and show here */}
      </div>
    </div>
  );
};

export default RightSidebar;
