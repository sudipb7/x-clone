import axios from "axios";
import { toast } from "react-hot-toast";
import { useCallback, useState } from "react";

import useCurrentUser from "@/hooks/useCurrentUser";
import usePosts from "@/hooks/usePosts";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";

import Button from "./Button";
import Avatar from "./Avatar";

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

const Form: React.FC<FormProps> = ({ placeholder, isComment, postId }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts();

  const [body, setBody] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      await axios.post("/api/posts", { body });
      toast.success("Tweet created");
      setBody("");
      mutatePosts();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [body, mutatePosts]);

  return (
    <div className="border-b px-5 py-2">
      {currentUser ? (
        <div className="flex flex-row gap-4">
          <div>
            <Avatar userId={currentUser?.id} />
          </div>
          <div className="flex-1">
            <textarea
              rows={3}
              disabled={isLoading}
              onChange={(e) => setBody(e.target.value)}
              value={body}
              placeholder={placeholder}
              className="
                disabled:opacity-80
                peer
                resize-none
                mt-1
                w-full
                ring-0
                outline-none
                placeholder-neutral-500
               "
            ></textarea>
            <hr
              className="
                opacity-0
                peer-focus:opacity-100
                h-[1px]
                w-full
                border-sky-500
              "
            />
            <div className="mt-2 flex flex-row justify-end">
              <Button
                disabled={isLoading || !body}
                onClick={onSubmit}
                label="Tweet"
                size="small"
                rounded
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-3">
          <h1
            className="
            text-2xl
            text-center
            mb-4
            font-bold
          "
          >
            Welcome to Twitter
          </h1>
          <div
            className="
            flex 
            flex-row 
            items-center 
            justify-center 
            gap-4
          "
          >
            <Button
              label="Login"
              onClick={loginModal.onOpen}
              disabled={isLoading}
              rounded
            />
            <Button
              variant="secondary"
              label="Register"
              onClick={registerModal.onOpen}
              disabled={isLoading}
              rounded
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
