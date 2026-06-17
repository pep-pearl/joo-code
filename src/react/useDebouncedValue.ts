import { useEffect, useState } from "react";

/** 값 변경이 멈춘 뒤 지정한 시간만큼 지연된 마지막 값을 반환합니다. */
export function useDebouncedValue<T>(value: T, delay = 250): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [delay, value]);

  return debouncedValue;
}
