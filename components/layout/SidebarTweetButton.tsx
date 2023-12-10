import { useCallback } from "react";
import { FaFeather } from "react-icons/fa";

import useLoginModal from "@/hooks/useLoginModal";

const SidebarTweetButton = () => {
  const loginModal = useLoginModal();

  const onClick = useCallback(() => {
    loginModal.onOpen();
  }, [loginModal]);

  return (
    <div className="w-full" onClick={onClick}>
      <div
        className="
          mt-2 rounded-full p-4
          flex items-center justify-center
          bg-sky-500 lg:hidden
          hover:bg-opacity-80 cursor-pointer
        "
      >
        <FaFeather size={24} color="white" />
      </div>
      <div
        className="
          w-full mt-2 p-3 rounded-full
          hidden lg:block bg-sky-500
          cursor-pointer hover:bg-opacity-90
        "
      >
        <p
          className="
            text-center font-semibold text-white text-lg
            hidden lg:block
          "
        >
          Tweet
        </p>
      </div>
    </div>
  );
};

export default SidebarTweetButton;
