import useSWR from "swr";

import fetcher from "@/libs/fetcher";

const useReplies = (parentId?: string) => {
  const url = parentId ? `/api/replies?parentId=${parentId}` : null;
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    isLoading,
    error,
    mutate,
  };
};

export default useReplies;
