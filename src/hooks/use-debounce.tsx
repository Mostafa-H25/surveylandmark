import { useEffect, useState } from "react";

export const useDebounce = (dependable: string) => {
  const [debouncedValue, setDebouncedValue] = useState<string | undefined>("");
  useEffect(() => {
    if (dependable === debouncedValue) return;

    const timeout = setTimeout(() => {
      setDebouncedValue(dependable);
    }, 500);
    return () => clearTimeout(timeout);
  }, [dependable]);

  return debouncedValue;
};
