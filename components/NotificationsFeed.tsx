import { useEffect } from "react";
import { useRouter } from "next/router";

import useCurrentUser from "@/hooks/useCurrentUser";
import useNotifications from "@/hooks/useNotifications";
import Image from "next/image";

const NotificationsFeed = () => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: fetchedNotifications = [], isLoading } = useNotifications(
    currentUser?.id
  );
  const router = useRouter();

  useEffect(() => {
    mutateCurrentUser();
  }, [mutateCurrentUser]);

  if (!isLoading && fetchedNotifications.length === 0) {
    return (
      <div className="text-zinc-600 text-center p-6 text-lg">
        No notifications to show
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {isLoading
        ? Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="p-3 w-full flex items-center gap-3">
              <div className="w-10 h-10 rounded-full skeleton"></div>
              <div className="flex-1">
                <div className="rounded-md h-10 w-full skeleton"></div>
              </div>
            </div>
          ))
        : fetchedNotifications.map((notification: Record<string, any>) => (
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
