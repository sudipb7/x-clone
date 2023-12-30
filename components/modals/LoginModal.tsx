import { useState, useCallback } from "react";
import { signIn } from "next-auth/react";

import { useModal } from "@/hooks/use-modal-store";

import Input from "../Input";
import Modal from "../Modal";

const LoginModal = () => {
  const { type, isOpen, onOpen, onClose } = useModal();

  const isLoginModalOpen = isOpen && type === "login";

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }

    onClose();
    onOpen("register");
  }, [isLoading, onOpen, onClose]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await signIn("credentials", {
        email,
        password,
      });

      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [onClose, email, password]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
      />
      <Input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={isLoading}
      />
    </div>
  );

  const footerContent = (
    <div className="text-zinc-600 text-center mt-3 text-sm">
      <p>
        First time using X?{" "}
        <span
          onClick={onToggle}
          className="cursor-pointer text-sky-500 hover:underline transition"
        >
          Create an account
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      size="lg"
      disabled={isLoading}
      isOpen={isLoginModalOpen}
      title="Sign in to X"
      actionLabel="Sign in"
      onClose={onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
      showCloseButton
      showLogo
    />
  );
};

export default LoginModal;
