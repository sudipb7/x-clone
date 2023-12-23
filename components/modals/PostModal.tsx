import { useState } from "react";

import usePostModal from "@/hooks/modals/usePostModal";

import Form from "../Form";
import Modal from "../Modal";

const PostModal = () => {
  const postModal = usePostModal();
  const [isLoading, setIsLoading] = useState(false);

  const bodyContent = <Form placeholder="What's happening?!" rows={6} />;

  return (
    <Modal
      size="lg"
      onClose={postModal.onClose}
      isOpen={postModal.isOpen}
      disabled={isLoading}
      showCloseButton
      hideActionBtn
      title="Create a Post"
      body={bodyContent}
    />
  );
};

export default PostModal;
