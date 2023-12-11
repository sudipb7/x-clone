import Image from "next/image";
import { useCallback } from "react";
import { useRouter } from "next/router";

import useUser from "@/hooks/useUser";

interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ userId, isLarge, hasBorder }) => {
  const { data: fetchedUser } = useUser(userId);
  const router = useRouter();

  const onClick = useCallback(
    (event: any) => {
      event.stopPropagation();

      const url = `/profile/${userId}`;

      router.push(url);
    },
    [router, userId]
  );

  return (
    <div
      className={`
        ${hasBorder ? "border-4 border-white" : ""}
        ${isLarge ? "h-32 w-32" : "h-10 w-10"}
        relative rounded-full
        hover:brightness-105
        cursor-pointer
      `}
    >
      <Image
        fill
        style={{
          objectFit: "cover",
          borderRadius: "100%",
        }}
        alt="Avatar"
        onClick={onClick}
        src={fetchedUser?.profileImage || "/placeholder.png"}
      />
    </div>
  );
};

export default Avatar;
