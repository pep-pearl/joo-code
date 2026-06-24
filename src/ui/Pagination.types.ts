import type { CSSProperties } from "react";

export type KrdsPaginationTemplate =
  | "krds-friendly-numbered-basic"
  | "krds-friendly-numbered-boundary"
  | "krds-friendly-numbered-edge-start"
  | "krds-friendly-numbered-edge-end"
  | "krds-friendly-numbered-with-jump"
  | "krds-friendly-load-more-basic"
  | "krds-friendly-mobile-stack"
  | "krds-friendly-numbered-with-summary"
  | "krds-friendly-numbered-with-page-size"
  | "krds-friendly-icon-control"
  | "krds-friendly-touch-large"
  | "service-simple-prev-next"
  | "service-mobile-counter-pill"
  | "service-commerce-load-more-progress"
  | "service-infinite-scroll-fallback"
  | "service-carousel-dot"
  | "service-carousel-thumbnail"
  | "service-cursor-older-newer"
  | "service-timeline-load-previous"
  | "service-table-footer"
  | "service-select-page"
  | "service-sticky-bottom-bar"
  | "service-chip-numbered"
  | "service-step-progress"
  | "service-index-korean-initial"
  | "service-date-navigator"
  | "service-section-load-more"
  | "service-season-selector";

export type PaginationCssVars = {
  "--pagination-surface"?: string;
  "--pagination-surface-soft"?: string;
  "--pagination-fg"?: string;
  "--pagination-muted"?: string;
  "--pagination-line"?: string;
  "--pagination-line-strong"?: string;
  "--pagination-primary"?: string;
  "--pagination-primary-weak"?: string;
  "--pagination-inverse"?: string;
  "--pagination-inverse-fg"?: string;
  "--pagination-radius-sm"?: string;
  "--pagination-radius-md"?: string;
  "--pagination-radius-lg"?: string;
  "--pagination-control-size"?: string;
  "--pagination-font-size"?: string;
  "--pagination-progress"?: string;
};

export type PaginationProps = {
  /**
   * KRDS 템플릿 또는 서비스형 템플릿 이름입니다.
   */
  template?: KrdsPaginationTemplate;

  /**
   * 현재 페이지입니다. 1부터 시작합니다.
   */
  page: number;

  /**
   * 전체 페이지 수입니다. Load more 계열에서는 totalCount가 없을 때 전체 항목 수처럼 보조 사용됩니다.
   */
  total: number;

  /**
   * 숫자 페이지 버튼 노출 개수입니다. 기본값은 템플릿별로 3~7 사이를 사용합니다.
   */
  size?: number;

  /**
   * 페이지 변경 콜백입니다.
   */
  onChange?: (page: number) => void;

  ariaLabel?: string;
  ariaDescribedBy?: string;
  className?: string;
  style?: CSSProperties & PaginationCssVars;

  /** summary / table / load-more 보조 데이터 */
  totalCount?: number;
  visibleCount?: number;
  pageSize?: number;
  pageSizeOptions?: number[];
  onPageSizeChange?: (pageSize: number) => void;
  onLoadMore?: () => void;
  summary?: string;

  /** 서비스형 템플릿에 쓰는 보조 문구/목록 */
  labels?: string[];
  stepLabels?: string[];
  date?: string;
  onDateChange?: (date: string) => void;
  currentLabel?: string;
  previousLabel?: string;
  nextLabel?: string;
  sectionHref?: string;
};
