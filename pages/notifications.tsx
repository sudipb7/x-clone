import axios from "axios";
import { toast } from "react-hot-toast";
import { useCallback } from "react";
import { NextPageContext } from "next";
import { getServerSession } from "next-auth/next";
import { IoMdTrash } from "react-icons/io";

import useCurrentUser from "@/hooks/useCurrentUser";
import useNotifications from "@/hooks/useNotifications";
import { authOptions } from "./api/auth/[...nextauth]";

import Header from "@/components/Header";
import Meta from "@/components/Meta";
import NotificationsFeed from "@/components/NotificationsFeed";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

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
      session: {
        ...session,
        user: {
          ...session?.user,
          ...(session?.user?.image === undefined && { image: null }),
        },
      },
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
