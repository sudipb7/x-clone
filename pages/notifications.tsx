import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { IoMdTrash } from "react-icons/io";

import useCurrentUser from "@/hooks/useCurrentUser";
import useNotifications from "@/hooks/useNotifications";

import Header from "@/components/Header";
import Meta from "@/components/Meta";
import NotificationsFeed from "@/components/NotificationsFeed";

const Notifications = () => {
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateNotifications } = useNotifications(currentUser?.id);

  const onDelete = useCallback(async () => {
    try {
      await axios.delete(`/api/notifications/${currentUser?.id}`);
      mutateNotifications();
      toast.success("Notifications cleared");
    } catch (error) {
      toast.error("Something went wrong");
    }
  }, [mutateNotifications, currentUser?.id]);

  useEffect(() => {
    if (!currentUser?.id) {
      router.replace("/");
    }
  }, [currentUser?.id, router]);

  return (
    <>
      <Meta title="Notifications | X" />
      <Header label="Notifications" showBackArrow />
      <NotificationsFeed />
      <div
        onClick={onDelete}
        className="
          absolute bottom-5 right-5
        bg-red-500 hover:opacity-90 cursor-pointer
          rounded-full p-3 
        "
      >
        <IoMdTrash size={20} color="white" />
      </div>
    </>
  );
};

export default Notifications;
