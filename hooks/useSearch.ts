import fetcher from "@/libs/fetcher";
import useSWR from "swr";

const useSearch = (value: string) => {
  const url = value ? `/api/search?query=${value}` : null;

  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useSearch;