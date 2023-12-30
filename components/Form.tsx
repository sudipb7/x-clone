import axios from "axios";
import { toast } from "react-hot-toast";
import { useCallback, useState } from "react";

import useCurrentUser from "@/hooks/useCurrentUser";
import usePosts from "@/hooks/usePosts";
import usePost from "@/hooks/usePost";
import useReplies from "@/hooks/useReplies";
import { useModal } from "@/hooks/use-modal-store";

import Button from "./Button";
import Avatar from "./Avatar";
import FormSkeleton from "./skeletons/FormSkeleton";
import { useRouter } from "next/router";

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  isModal?: boolean;
  postId?: string;
  rows?: number;
}

const Form: React.FC<FormProps> = ({
  placeholder,
  isComment,
  isModal,
  postId,
  rows,
}) => {
  const { onOpen, onClose } = useModal();
  const router = useRouter();

  const { data: currentUser, isLoading: isFetching } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts();
  const { mutate: mutatePost, data: parentPost } = usePost(postId as string);
  const { mutate: mutateReplies } = useReplies(postId as string);

  const [body, setBody] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const goToParentPost = useCallback(
    (event: any) => {
      event.stopPropagation();
      router.push(`/posts/${parentPost.id}`);
    },
    [router, parentPost?.id]
  );

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      const url = isComment ? `/api/comment?postId=${postId}` : "/api/posts";
      await axios.post(url, { body });
      toast.success("Tweet created");
      setBody("");
      onClose();
      mutatePosts();
      mutatePost();
      if (isComment) {
        mutateReplies();
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [
    body,
    mutatePosts,
    mutatePost,
    isComment,
    postId,
    mutateReplies,
    onClose,
  ]);

  return isFetching ? (
    <FormSkeleton />
  ) : (
    <div className="border-b p-3 md:px-4">
      {currentUser ? (
        <>
          {parentPost && isModal && (
            <div className="text-zinc-600 text-sm mb-3 px-1 cursor-pointer">
              Replying to{" "}
              <span
                onClick={goToParentPost}
                className="text-sky-500 hover:underline transition"
              >
                @{parentPost?.user?.username}
              </span>
            </div>
          )}
          <div className="flex flex-row gap-4">
            <div>
              <Avatar userId={currentUser?.id} />
            </div>
            <div className="flex-1">
              <textarea
                rows={rows || 3}
                disabled={isLoading}
                onChange={(e) => setBody(e.target.value)}
                value={body}
                placeholder={placeholder}
                className="
                  disabled:opacity-80
                  peer
                  resize-y
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
                  h-[1px] w-full
                  transition duration-200
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
        </>
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
              onClick={() => onOpen("login")}
              disabled={isLoading}
              rounded
            />
            <Button
              variant="secondary"
              label="Register"
              onClick={() => onOpen("register")}
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
