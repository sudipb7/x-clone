import { useCallback, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { FaXTwitter } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";

import { useModal } from "@/hooks/use-modal-store";
import useCurrentUser from "@/hooks/useCurrentUser";

import Avatar from "../Avatar";

const UserDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: currentUser } = useCurrentUser();
  const { onOpen } = useModal();

  const toggleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const onClick = useCallback(
    (action: "verfify" | "logout") => {
      if (action === "verfify") {
        onOpen("verify");
      } else {
        onOpen("logout");
      }
      toggleIsOpen();
    },
    [onOpen]
  );

  return (
    <div className="relative">
      <div
        onClick={toggleIsOpen}
        className="
          p-2.5 rounded-full transition
          cursor-pointer hover:bg-gray-100
        "
      >
        <BiDotsVerticalRounded size={18} />
      </div>
      {isOpen && (
        <div
          className="
            absolute top-[100%] right-2
            flex flex-col border
            gap-1 w-56 p-1 transition-all
            rounded-md shadow-md bg-white
          "
        >
          <div className="px-2 py-1.5 flex items-center gap-3">
            <Avatar userId={currentUser?.id} />
            <div>
              <h3 className="text-sm font-medium">{currentUser?.name}</h3>
              <p className="text-[10px] text-zinc-600">
                @{currentUser?.username}
              </p>
            </div>
          </div>
          <hr />
          <button
            type="button"
            onClick={() => onClick("verfify")}
            className="
              rounded hover:bg-gray-100 
              text-sm px-2 py-1.5 transition
              flex items-center gap-2
            "
          >
            <FaXTwitter size={16} /> Premium
          </button>
          <hr />
          <button
            type="button"
            onClick={() => onClick("logout")}
            className="
              rounded hover:bg-gray-100 
              text-sm px-2 py-1.5 transition
              flex items-center gap-2
            "
          >
            <IoIosLogOut size={16} /> Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
