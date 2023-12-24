import axios from "axios";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useState, useCallback } from "react";

import { useModal } from "@/hooks/use-modal-store";

import Input from "../Input";
import Modal from "../Modal";

const RegisterModal = () => {
  const { type, isOpen, onOpen, onClose } = useModal();

  const isRegisterModalOpen = isOpen && type === "register";

  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }

    onClose();
    onOpen("login");
  }, [isLoading, onOpen, onClose]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.post("/api/register", {
        name,
        username,
        email,
        password,
      });

      toast.success("Account created");

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
  }, [onClose, name, email, username, password]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}
      />
      <Input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        disabled={isLoading}
      />
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
        Already have an account?{" "}
        <span
          onClick={onToggle}
          className="cursor-pointer text-sky-500 hover:underline"
        >
          Sign in
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      size="lg"
      disabled={isLoading}
      isOpen={isRegisterModalOpen}
      title="Create an account"
      actionLabel="Continue"
      onClose={onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
      showCloseButton
      showLogo
    />
  );
};

export default RegisterModal;
