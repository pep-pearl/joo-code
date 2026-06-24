import type { ButtonHTMLAttributes } from "react";

export type PaginationItem = number | "ellipsis";

export type PaginationButtonAttrs = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "type" | "children" | "className"
>;

export function normalizePositiveInteger(value: number, fallback = 1) {
  if (!Number.isFinite(value)) return fallback;
  const normalized = Math.floor(value);
  return normalized > 0 ? normalized : fallback;
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function toPaginationItems(
  pages: number[],
  max: number,
): PaginationItem[] {
  if (max <= 0 || pages.length === 0) return [];

  const items: PaginationItem[] = [];
  const firstVisible = pages[0];
  const lastVisible = pages[pages.length - 1];

  if (firstVisible > 1) {
    items.push(1);
    if (firstVisible > 2) items.push("ellipsis");
  }

  items.push(...pages);

  if (lastVisible < max) {
    if (lastVisible < max - 1) items.push("ellipsis");
    items.push(max);
  }

  return items;
}

export function getRangeLabel({
  page,
  totalCount,
  pageSize,
}: {
  page: number;
  totalCount: number;
  pageSize: number;
}) {
  if (totalCount <= 0) return "0 of 0";

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalCount);

  return `${start.toLocaleString()}–${end.toLocaleString()} of ${totalCount.toLocaleString()}`;
}

export function getLoadMoreState({
  page,
  total,
  totalCount,
  visibleCount,
  pageSize,
}: {
  page: number;
  total: number;
  totalCount?: number;
  visibleCount?: number;
  pageSize: number;
}) {
  const resolvedTotalCount = normalizePositiveInteger(totalCount ?? total, 0);
  const resolvedVisibleCount = clamp(
    normalizePositiveInteger(visibleCount ?? page * pageSize, 0),
    0,
    resolvedTotalCount,
  );
  const done =
    resolvedTotalCount <= 0 || resolvedVisibleCount >= resolvedTotalCount;
  const progress =
    resolvedTotalCount > 0
      ? (resolvedVisibleCount / resolvedTotalCount) * 100
      : 0;

  return {
    totalCount: resolvedTotalCount,
    visibleCount: resolvedVisibleCount,
    done,
    progress,
  };
}
