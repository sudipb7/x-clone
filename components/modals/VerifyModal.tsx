import { toast } from "react-hot-toast";
import { useCallback, useState } from "react";

import useVerify from "@/hooks/useVerify";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useModal } from "@/hooks/use-modal-store";

import Modal from "../Modal";

const VerifyModal = () => {
  const { data: currentUser } = useCurrentUser();
  const { isVerified, toggleVerification } = useVerify(currentUser?.id);
  const { isOpen, type, onClose } = useModal();

  const isModalOpen = isOpen && type === "verify";

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = useCallback(() => {
    try {
      setIsLoading(true);
      toggleVerification();
      onClose();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [toggleVerification, onClose]);

  const bodyContent = (
    <div className="w-full flex justify-center items-center">
      <h3 className="text-lg text-center">
        {isVerified ? "Already verified" : "Get verified for $0"}
      </h3>
    </div>
  );

  return (
    <Modal
      size="sm"
      title="Premium"
      actionLabel={isVerified ? "Unsubscribe" : "Subscribe"}
      disabled={isLoading}
      onSubmit={onSubmit}
      body={bodyContent}
      isOpen={isModalOpen}
      onClose={onClose}
      showCloseButton
      showLogo
    />
  );
};

export default VerifyModal;
