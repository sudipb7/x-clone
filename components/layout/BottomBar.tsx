import { BsBell, BsBellFill } from "react-icons/bs";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import { FaUser, FaRegUser } from "react-icons/fa6";
import { GoHome, GoHomeFill } from "react-icons/go";

import useCurrentUser from "@/hooks/useCurrentUser";
import SidebarItem from "./SidebarItem";

const BottomBar = () => {
  const { data: currentUser } = useCurrentUser();

  const items = [
    {
      label: "Home",
      href: "/",
      icon: GoHome,
      activeIcon: GoHomeFill,
    },
    {
      label: "Notifications",
      href: "/notifications",
      icon: BsBell,
      activeIcon: BsBellFill,
      auth: true,
      alert: false,
    },
    {
      label: "Bookmarks",
      href: "/bookmarks",
      icon: IoBookmarkOutline,
      activeIcon: IoBookmark,
      auth: true,
    },
    {
      label: "Profile",
      href: `/profile/${currentUser?.id}`,
      icon: FaRegUser,
      activeIcon: FaUser,
      auth: true,
    },
  ];

  return (
    <div
      className="
      fixed bottom-0 left-0 
      w-full z-20 p-2 sm:hidden
      flex items-center justify-evenly
      bg-white border-t
      "
    >
      {items.map((item) => (
        <SidebarItem
          key={item.label}
          label={item.label}
          href={item.href}
          auth={item.auth}
          icon={item.icon}
          activeIcon={item.activeIcon}
          alert={item.alert}
        />
      ))}
    </div>
  );
};

export default BottomBar;
