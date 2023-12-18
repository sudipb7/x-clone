import axios from "axios";
import { toast } from "react-hot-toast";
import { useCallback } from "react";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { IoMdTrash } from "react-icons/io";

import useCurrentUser from "@/hooks/useCurrentUser";
import useNotifications from "@/hooks/useNotifications";

import Header from "@/components/Header";
import Meta from "@/components/Meta";
import NotificationsFeed from "@/components/NotificationsFeed";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

const Notifications = () => {
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
