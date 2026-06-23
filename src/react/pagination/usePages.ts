import { useMemo } from "react";

export function usePages({
  max,
  offset,
  current,
}: {
  max: number;
  offset: number;
  current: number;
}) {
  return useMemo(() => {
    if (max <= 0) return [];

    // offset이 전체 페이지 이상이면 전부 노출
    if (offset >= max) return Array.from({ length: max }, (_, i) => i + 1);

    // 좌/우 분배: 홀수 → 균등, 짝수 → 왼쪽을 한 칸 더
    const left = Math.floor(offset / 2);
    const right = offset % 2 === 0 ? left - 1 : left;

    let start = current - left;
    start = Math.max(1, Math.min(start, max - offset + 1));

    const end = Math.min(max, start + offset - 1);

    if (offset % 2 === 0 && current + right > end && start > 1) {
      const shift = Math.min(current + right - end, start - 1);
      start -= shift;
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [current, max, offset]);
}
