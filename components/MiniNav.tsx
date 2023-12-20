import Link from "next/link";
import { useRouter } from "next/router";

const MiniNav = () => {
  const router = useRouter();
  const { userId } = router.query;

  return (
    <div className="w-full flex items-center border-b">
      <Link
        href={`/profile/followers/${userId}`}
        className={`
          text-center font-semibold 
          max-sm:p-3 p-3.5 w-1/2 border-r
          ${
            router.pathname.includes("/followers")
              ? "bg-gray-100"
              : "hover:bg-gray-50"
          }
        `}
      >
        Followers
      </Link>
      <Link
        href={`/profile/followings/${userId}`}
        className={`
          text-center font-semibold 
          max-sm:p-3 p-3.5 w-1/2 border-l
          ${
            router.pathname.includes("/followings")
              ? "bg-gray-100"
              : "hover:bg-gray-50"
          }
        `}
      >
        Followings
      </Link>
    </div>
  );
};

export default MiniNav;
