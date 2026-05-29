/**
 * @packageDocumentation
 * 값 변경을 지연 반영하는 React debounce hook입니다.
 */

import { useEffect, useRef, useState } from "react";

/**
 * 지정한 시간 동안 값 변경이 멈춘 뒤 마지막 값을 반환합니다.
 *
 * - 검색어 입력처럼 값이 빠르게 바뀌는 상황에서 사용합니다.
 * - 불필요한 렌더링 후속 처리나 API 호출 빈도를 줄일 때 적합합니다.
 * - `delay`가 바뀌면 기존 타이머를 정리하고 새 지연 시간을 적용합니다.
 *
 * @template T - 지연 반영할 값의 타입입니다.
 * @param value - debounce를 적용할 원본 값입니다.
 * @param delay - 지연 시간입니다. 단위는 밀리초이며 기본값은 `250`입니다.
 * @returns 지연 시간이 지난 뒤 반영된 마지막 값입니다.
 *
 * @example
 * ```tsx
 * const [searchTerm, setSearchTerm] = useState("");
 * const debouncedSearchTerm = useDebouncedValue(searchTerm, 500);
 *
 * useEffect(() => {
 *   fetchData(debouncedSearchTerm);
 * }, [debouncedSearchTerm]);
 * ```
 */
export function useDebouncedValue<T>(value: T, delay = 250) {
  const [debounced, setDebounced] = useState(value);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (timer.current) window.clearTimeout(timer.current);

    timer.current = window.setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [value, delay]);

  return debounced;
}
