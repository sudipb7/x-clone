import fetcher from "@/libs/fetcher";
import useSWR from "swr";

const useFriends = (variant: "followers" | "followings", userId: string) => {
  const url = userId ? `/api/${variant}?userId=${userId}` : null;
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useFriends;
