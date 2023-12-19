import { useCallback } from "react";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

import useLogoutModal from "@/hooks/modals/useLogoutModal";

import Modal from "../Modal";
import Button from "../Button";

const LogoutModal = () => {
  const router = useRouter();
  const logoutModal = useLogoutModal();

  const onSubmit = useCallback(async () => {
    await signOut();
    router.push("/");
  }, [router]);

  const bodyContent = (
    <p className="font-light">You can always log back in at any time.</p>
  );

  const footerContent = (
    <Button
      variant="outline"
      size="large"
      label="Cancel"
      onClick={logoutModal.onClose}
      fullWidth
      rounded
    />
  );

  return (
    <Modal
      size="sm"
      title="Logout of X?"
      actionLabel="Log out"
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
      isOpen={logoutModal.isOpen}
      onClose={logoutModal.onClose}
      showLogo
    />
  );
};

export default LogoutModal;
