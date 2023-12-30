import { useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import { IconType } from "react-icons";
import { BsDot } from "react-icons/bs";

import useCurrentUser from "@/hooks/useCurrentUser";
import { useModal } from "@/hooks/use-modal-store";

interface SidebarItemProps {
  label: string;
  href?: string;
  icon: IconType;
  activeIcon?: IconType;
  onClick?: () => void;
  auth?: boolean;
  alert?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  href,
  icon: Icon,
  activeIcon: ActiveIcon,
  onClick,
  auth,
  alert,
}) => {
  const { data: currentUser } = useCurrentUser();
  const { onOpen } = useModal();
  const router = useRouter();

  const isActive = useMemo(() => {
    if (!href) {
      return null;
    } 

    if (href === "/") {
      return router.pathname === href;
    }

    return router.pathname.includes(href.split("/")[1]);
  }, [router.pathname, href]);

  const handleClick = useCallback(() => {
    if (onClick) {
      return onClick();
    }

    if (auth && !currentUser) {
      onOpen("login");
    } else if (href) {
      router.push(href);
    }
  }, [router, onClick, href, currentUser, auth, onOpen]);

  return (
    <div
      onClick={handleClick}
      className={`
        flex items-center justify-start 
        gap-3 p-2.5 sm:p-4 lg:px-6 lg:py-3
        cursor-pointer rounded-full
        hover:bg-gray-100 relative transition-all
        ${isActive ? "font-semibold text-black" : "text-black/80"}
      `}
    >
      {isActive && ActiveIcon ? (
        <span>
          <ActiveIcon className="max-sm:hidden" size={25} />
          <ActiveIcon className="sm:hidden" size={20} />
        </span>
      ) : (
        <span>
          <Icon className="max-sm:hidden" size={25} />
          <Icon className="sm:hidden" size={20} />
        </span>
      )}
      {alert ? (
        <BsDot 
          className="text-sky-500 absolute -top-4 left-0" 
          size={70} 
        />
      ) : null}
      <p className="max-lg:hidden mr-2 text-lg">{label}</p>
    </div>
  );
};

export default SidebarItem;
