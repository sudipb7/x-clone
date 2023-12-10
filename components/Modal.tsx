import { useCallback } from "react";
import { AiOutlineClose } from "react-icons/ai";

import Button from "./Button";
import Image from "next/image";

interface ModalProps {
  title?: string;
  actionLabel: string;
  isOpen?: boolean;
  disabled?: boolean;
  showCloseButton?: boolean;
  showLogo?: boolean;
  size: "lg" | "sm";
  body?: React.ReactElement;
  footer?: React.ReactElement;
  onClose: () => void;
  onSubmit: () => void;
}

const Modal: React.FC<ModalProps> = ({
  title,
  actionLabel,
  isOpen,
  disabled,
  body,
  footer,
  onClose,
  onSubmit,
  size = "sm",
  showCloseButton,
  showLogo,
}) => {
  const modalSize = {
    sm: "w-[350px] h-auto",
    lg: "w-full sm:max-w-[456px]",
  };

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    onClose();
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [disabled, onSubmit]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="
      flex justify-center items-center
      overflow-x-hidden overflow-y-auto
      fixed inset-0 z-50 rounded-xl
      outline-none focus:outline-none
      bg-white/50 backdrop-blur-2xl
     "
    >
      <div className={`relative mx-auto border rounded-xl ${modalSize[size]}`}>
        {/* Content */}
        <div
          className="
            h-full w-full lg:h-auto p-6
            relative flex flex-col gap-3
            outline-none focus:outline-none
            border-0 shadow-lg
          "
        >
          {/* Header */}
          <div className="flex flex-col items-center justify-center">
            {showCloseButton ? (
              <div
                onClick={handleClose}
                className="absolute left-4 top-4 p-2 hover:bg-gray-100 rounded-full cursor-pointer"
              >
                <AiOutlineClose size={18} />
              </div>
            ) : null}
            {showLogo ? (
              <Image
                src="/logo.svg"
                width={28}
                height={28}
                className="object-cover mb-4 mx-auto"
                alt="Logo"
              />
            ) : null}
            <h3 className="text-2xl font-semibold">
              {title}
            </h3>
          </div>
          {/* Body */}
          <div className="relative flex-auto mt-3">
            {body}
          </div>
          {/* Footer */}
          <div className="flex flex-col items-center justify-center gap-2 mt-3">
            <Button
              rounded
              fullWidth
              size="large"
              label={actionLabel}
              disabled={disabled}
              onClick={handleSubmit}
            />
            {footer}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
