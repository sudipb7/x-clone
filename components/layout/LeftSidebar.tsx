import Image from "next/image";
import Link from "next/link";

import { BsBell, BsBellFill } from "react-icons/bs";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import { FaUser, FaRegUser } from "react-icons/fa6";
import { GoHome, GoHomeFill } from "react-icons/go";

import SidebarItem from "./SidebarItem";
import SidebarTweetButton from "./SidebarTweetButton";

const LeftSidebar = () => {
  const currentUser = { id: 12 };

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
      href: `/users/${currentUser?.id}`,
      icon: FaRegUser,
      activeIcon: FaUser,
      auth: true,
    },
  ];

  return (
    <div
      className="
        max-sm:hidden p-3 z-20 border-r
        w-fit h-screen lg:w-[300px] xl:w-[340px] 
        flex items-start justify-center
        sticky top-0 left-0
      "
    >
      <div
        className="
          mx-auto gap-2
          flex flex-col justify-center  
          max-md:items-center items-start
        "
      >
        <Link
          href="/"
          className="my-3 p-4 lg:ml-2 rounded-full hover:bg-gray-100"
        >
          <Image
            src="/logo.svg"
            alt=""
            width={24}
            height={24}
            className="object-cover"
          />
        </Link>

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

        <SidebarTweetButton />
      </div>
    </div>
  );
};

export default LeftSidebar;