import type { CSSProperties } from "react";
import { usePagination } from "../react";
import { renderPaginationTemplate } from "./Pagination.templates";
import type { PaginationCssVars, PaginationProps } from "./Pagination.types";
import {
  compactPaginationVars,
  defaultPaginationVars,
  getDefaultOffset,
  rootVariants,
  touchPaginationVars,
} from "./Pagination.styles";
import { cn } from "./utils";

export type { KrdsPaginationTemplate, PaginationCssVars, PaginationProps } from "./Pagination.types";

export function Pagination({
  template = "krds-friendly-numbered-basic",
  page,
  total,
  size,
  onChange,
  ariaLabel,
  ariaDescribedBy,
  className,
  style,
  totalCount,
  visibleCount,
  pageSize = 10,
  pageSizeOptions = [10, 20, 50],
  onPageSizeChange,
  onLoadMore,
  summary,
  labels,
  stepLabels,
  date,
  onDateChange,
  currentLabel,
  previousLabel,
  nextLabel,
  sectionHref,
}: PaginationProps) {
  const pagination = usePagination({
    max: total,
    current: page,
    offset: size ?? getDefaultOffset(template),
    onChange,
  });

  const resolvedStyle: CSSProperties & PaginationCssVars = {
    ...defaultPaginationVars,
    ...(template === "krds-friendly-touch-large" ? touchPaginationVars : {}),
    ...(template === "krds-friendly-icon-control" ||
    template === "krds-friendly-numbered-with-page-size"
      ? compactPaginationVars
      : {}),
    ...style,
  };

  return (
    <div
      className={cn(rootVariants({ template }), className)}
      style={resolvedStyle}
    >
      {renderPaginationTemplate({
        template,
        pagination,
        ariaLabel,
        ariaDescribedBy,
        total,
        totalCount,
        visibleCount,
        pageSize,
        pageSizeOptions,
        onPageSizeChange,
        onLoadMore,
        summary,
        labels,
        stepLabels,
        date,
        onDateChange,
        currentLabel,
        previousLabel,
        nextLabel,
        sectionHref,
      })}
    </div>
  );
}
