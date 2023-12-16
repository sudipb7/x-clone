import { useEffect } from "react";
import { useRouter } from "next/router";

import useCurrentUser from "@/hooks/useCurrentUser";
import useNotifications from "@/hooks/useNotifications";
import Image from "next/image";

const NotificationsFeed = () => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: fetchedNotifications = [] } = useNotifications(currentUser?.id);
  const router = useRouter();

  useEffect(() => {
    mutateCurrentUser();
  }, [mutateCurrentUser]);

  if (fetchedNotifications.length === 0) {
    return (
      <div className="text-zinc-600 text-center p-6 text-lg">
        No notifications to show
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {fetchedNotifications.map((notification: Record<string, any>) => (
        <div
          key={notification.id}
          onClick={() => router.push(notification.redirectUrl)}
          className="
            flex flex-row items-center 
            py-4 px-6 gap-4 border-b
            cursor-pointer hover:bg-gray-100/30
          "
        >
          <Image src="/logo.svg" alt="X Logo" width={24} height={24} />
          <p className="max-sm:text-sm">{notification.body}</p>
        </div>
      ))}
    </div>
  );
};

export default NotificationsFeed;
