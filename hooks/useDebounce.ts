import { useEffect, useState } from "react";

const useDebounce = (value: string, delay: number = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const debounce = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(debounce);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
