import { useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import { IconType } from "react-icons";

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
  const currentUser = "username";
  const router = useRouter();

  const isActive = useMemo(() => {
    if (!href) {
      return null;
    }
    return router.pathname === href;
  }, [router.pathname, href]);

  const handleClick = useCallback(() => {
    if (onClick) {
      return onClick();
    }

    if (auth && !currentUser) {
      // TODO: Open Login Modal
    } else if (href) {
      router.push(href);
    }
  }, [router, onClick, href, currentUser, auth]);

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
