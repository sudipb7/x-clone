import EditModal from "./modals/EditModal";
import LoginModal from "./modals/LoginModal";
import LogoutModal from "./modals/LogoutModal";
import PostModal from "./modals/PostModal";
import RegisterModal from "./modals/RegisterModal";
import VerifyModal from "./modals/VerifyModal";

export const ModalProvider = () => {
  return (
    <>
      <RegisterModal />
      <LoginModal />
      <PostModal />
      <VerifyModal />
      <EditModal />
      <LogoutModal />
    </>
  );
};
