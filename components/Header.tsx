import { useRouter } from "next/router";
import { useCallback } from "react";
import { BiArrowBack } from "react-icons/bi";

interface HeaderProps {
  label: string;
  secLabel?: string;
  showBackArrow?: boolean;
}

const Header: React.FC<HeaderProps> = ({ label, secLabel, showBackArrow }) => {
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div
      className="
        sticky top-0 left-0 
        bg-white bg-opacity-20 backdrop-blur-2xl 
        border-b p-3.5
      "
    >
      <div className="flex flex-row items-center gap-6">
        {showBackArrow && (
          <BiArrowBack
            onClick={handleBack}
            size={20}
            className="
              cursor-pointer
              hover:opacity-70
              transition
            "
          />
        )}
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold">{label}</h1>
          {secLabel ? (
            <h4 className="text-xs font-light text-black/70">{secLabel}</h4>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Header;
