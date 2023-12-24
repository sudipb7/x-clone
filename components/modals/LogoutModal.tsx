import { useCallback } from "react";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

import { useModal } from "@/hooks/use-modal-store";

import Modal from "../Modal";
import Button from "../Button";

const LogoutModal = () => {
  const router = useRouter();
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "logout";

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
      onClick={onClose}
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
      isOpen={isModalOpen}
      onClose={onClose}
      showLogo
    />
  );
};

export default LogoutModal;
