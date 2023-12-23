import { useCallback } from "react";
import { BsFeather } from "react-icons/bs";

import useLoginModal from "@/hooks/modals/useLoginModal";
import usePostModal from "@/hooks/modals/usePostModal";
import useCurrentUser from "@/hooks/useCurrentUser";

const FloatingButton = () => {
  const { data: currentUser } = useCurrentUser();
  const postModal = usePostModal();
  const loginModal = useLoginModal();

  const onClick = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    return postModal.onOpen();
  }, [currentUser, postModal, loginModal]);

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
