import { useRouter } from "next/router";
import { useCallback } from "react";
import { BiArrowBack } from "react-icons/bi";
import UserDropdown from "./users/UserDropdown";
import useCurrentUser from "@/hooks/useCurrentUser";

interface HeaderProps {
  label: string;
  secLabel?: string;
  showBackArrow?: boolean;
  showDropdown?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  label,
  secLabel,
  showBackArrow,
  showDropdown,
}) => {
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div
      className={`
        sticky top-0 left-0 
        bg-white bg-opacity-20 backdrop-blur-2xl 
        border-b px-3 py-1.5 z-10
        ${
          currentUser && showDropdown ? "flex justify-between items-center" : ""
        }
      `}
    >
      <div className="flex flex-row items-center gap-5">
        {showBackArrow && (
          <div className="p-2.5 rounded-full hover:bg-gray-100 cursor-pointer">
            <BiArrowBack onClick={handleBack} size={20} />
          </div>
        )}
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold">{label}</h1>
          {secLabel ? (
            <h4 className="text-xs font-light text-black/70">{secLabel}</h4>
          ) : null}
        </div>
      </div>
      {currentUser && showDropdown ? <UserDropdown /> : null}
    </div>
  );
};

export default Header;
