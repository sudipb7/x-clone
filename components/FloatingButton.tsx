import { useCallback } from "react";
import { BsFeather } from "react-icons/bs";

import { useModal } from "@/hooks/use-modal-store";
import useCurrentUser from "@/hooks/useCurrentUser";

const FloatingButton = () => {
  const { data: currentUser } = useCurrentUser();
  const { onOpen } = useModal();

  const onClick = useCallback(() => {
    if (!currentUser) {
      return onOpen("login");
    }

    return onOpen("post");
  }, [currentUser, onOpen]);

  return (
    <div
      onClick={onClick}
      className="
        flex sm:hidden items-center justify-center
        p-3 rounded-full 
        bg-sky-500 hover:bg-sky-500/90
        fixed bottom-20 right-8 z-30 
        border border-sky-500
      "
    >
      <BsFeather size={20} color="white" />
    </div>
  );
};

export default FloatingButton;
