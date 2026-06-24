import { useCallback, useMemo } from "react";
import { usePages } from "./usePages";
import { usePaginationButtonsAttrs } from "./usePaginationButtonsAttrs";
import {
  clamp,
  normalizePositiveInteger,
  toPaginationItems,
  type PaginationButtonAttrs,
  type PaginationItem,
} from "./paginationUtils";

export type UsePaginationParams = {
  /** 전체 페이지 수입니다. */
  max: number;
  /** 현재 페이지입니다. 1부터 시작합니다. */
  current: number;
  /** 한 번에 노출할 숫자 페이지 버튼 개수입니다. */
  offset: number;
  /** 보정된 페이지가 현재 페이지와 다를 때만 호출됩니다. */
  onChange?: (page: number) => void;
};

export type UsePaginationReturn = {
  max: number;
  current: number;
  offset: number;
  pages: number[];
  pageItems: PaginationItem[];
  isFirst: boolean;
  isLast: boolean;
  canPrevious: boolean;
  canNext: boolean;
  goToPage: (page: number) => void;
  getPageAttrs: (page: number) => PaginationButtonAttrs;
} & ReturnType<typeof usePaginationButtonsAttrs>;

export function usePagination({
  max,
  current,
  offset,
  onChange,
}: UsePaginationParams): UsePaginationReturn {
  const resolvedMax = normalizePositiveInteger(max, 1);
  const resolvedCurrent = clamp(
    normalizePositiveInteger(current, 1),
    1,
    resolvedMax,
  );
  const resolvedOffset = normalizePositiveInteger(offset, 1);

  const pages = usePages({
    max: resolvedMax,
    offset: resolvedOffset,
    current: resolvedCurrent,
  });

  const goToPage = useCallback(
    (nextPage: number) => {
      const resolvedPage = clamp(
        normalizePositiveInteger(nextPage, resolvedCurrent),
        1,
        resolvedMax,
      );

      if (resolvedPage === resolvedCurrent) return;
      onChange?.(resolvedPage);
    },
    [onChange, resolvedCurrent, resolvedMax],
  );

  const buttonAttrs = usePaginationButtonsAttrs({
    max: resolvedMax,
    current: resolvedCurrent,
    onChange: goToPage,
  });

  const pageItems = useMemo(
    () => toPaginationItems(pages, resolvedMax),
    [pages, resolvedMax],
  );

  const getPageAttrs = useCallback(
    (page: number): PaginationButtonAttrs => ({
      "aria-label":
        page === resolvedMax
          ? `마지막 페이지, ${page}`
          : `${page}페이지로 이동`,
      "aria-current": page === resolvedCurrent ? "page" : undefined,
      disabled: page === resolvedCurrent,
      onClick: () => goToPage(page),
    }),
    [goToPage, resolvedCurrent, resolvedMax],
  );

  return {
    max: resolvedMax,
    current: resolvedCurrent,
    offset: resolvedOffset,
    pages,
    pageItems,
    isFirst: resolvedCurrent <= 1,
    isLast: resolvedCurrent >= resolvedMax,
    canPrevious: resolvedCurrent > 1,
    canNext: resolvedCurrent < resolvedMax,
    goToPage,
    getPageAttrs,
    ...buttonAttrs,
  };
}
