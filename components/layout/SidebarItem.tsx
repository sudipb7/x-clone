import { useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import { IconType } from "react-icons";

import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";

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
  const loginModal = useLoginModal();
  const router = useRouter();

  const isActive = useMemo(() => {
    if (!href) {
      return null;
    } else if (router.pathname === href) {
      return router.pathname === href;
    }
  }, [router.pathname, href]);

  const handleClick = useCallback(() => {
    if (onClick) {
      return onClick();
    }

    if (auth && !currentUser) {
      loginModal.onOpen();
    } else if (href) {
      router.push(href);
    }
  }, [router, onClick, href, currentUser, auth, loginModal]);

  return (
    <div
      onClick={handleClick}
      className={`
        flex items-center justify-start 
        gap-3 p-4 lg:px-6 lg:py-3
        cursor-pointer rounded-full
        hover:bg-gray-100
        ${isActive ? "font-semibold text-black" : "text-black/80"}
      `}
    >
      {isActive && ActiveIcon ? <ActiveIcon size={25} /> : <Icon size={25} />}
      <p className="max-lg:hidden mr-2 text-lg">{label}</p>
    </div>
  );
};

export default SidebarItem;
