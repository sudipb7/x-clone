import { useModal } from "@/hooks/use-modal-store";

import Form from "../Form";
import Modal from "../Modal";

const PostModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === "post";

  const bodyContent = (
    <Form
      postId={data?.postId}
      isComment={data?.isComment}
      placeholder="What's happening?!"
      isModal={data?.isModal}
      rows={5}
    />
  );

  return (
    <Modal
      size="lg"
      onClose={onClose}
      isOpen={isModalOpen}
      showCloseButton
      hideActionBtn
      title="Create a Post"
      body={bodyContent}
    />
  );
};

export default PostModal;
