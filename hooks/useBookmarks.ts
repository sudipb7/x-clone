import useSWR from "swr";

import fetcher from "@/libs/fetcher";

const useBookmarks = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/bookmark", fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useBookmarks;
