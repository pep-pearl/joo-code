import { useState, type FormEvent } from "react";
import {
  clamp,
  getLoadMoreState,
  getRangeLabel,
  type UsePaginationReturn,
} from "../react";
import { PageControl, PageList } from "./Pagination.parts";
import {
  cardButtonClassName,
  controlButtonVariants,
  paginationNavVariants,
  pillButtonClassName,
  visuallyHiddenClassName,
} from "./Pagination.styles";
import type { KrdsPaginationTemplate } from "./Pagination.types";
import { cn } from "./utils";

export function NumberedPagination({
  template,
  pagination,
  ariaLabel,
  ariaDescribedBy,
  summary,
  totalCount,
  pageSize,
  pageSizeOptions,
  onPageSizeChange,
}: {
  template: KrdsPaginationTemplate;
  pagination: UsePaginationReturn;
  ariaLabel: string;
  ariaDescribedBy?: string;
  summary?: string;
  totalCount?: number;
  pageSize: number;
  pageSizeOptions: number[];
  onPageSizeChange?: (pageSize: number) => void;
}) {
  const {
    current,
    max,
    pageItems,
    goToPage,
    getPageAttrs,
    firstAttrs,
    prevAttrs,
    nextAttrs,
    lastAttrs,
  } = pagination;
  const [jumpValue, setJumpValue] = useState(String(current));
  const [message, setMessage] = useState("");

  const isBoundary = template === "krds-friendly-numbered-boundary";
  const isJump = template === "krds-friendly-numbered-with-jump";
  const isMobile = template === "krds-friendly-mobile-stack";
  const isSummary = template === "krds-friendly-numbered-with-summary";
  const isPageSize = template === "krds-friendly-numbered-with-page-size";
  const isIconOnly = template === "krds-friendly-icon-control";
  const isLarge = template === "krds-friendly-touch-large";
  const isCompact = isIconOnly || isPageSize;

  const summaryId = isSummary ? "pagination-summary" : undefined;
  const summaryText =
    summary ??
    `총 ${(totalCount ?? max).toLocaleString()}건 · ${current.toLocaleString()} / ${max.toLocaleString()}페이지 · 페이지당 ${pageSize.toLocaleString()}개`;

  const handleJumpSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextPage = Number(jumpValue);

    if (!Number.isInteger(nextPage) || nextPage < 1 || nextPage > max) {
      setMessage(`1부터 ${max.toLocaleString()} 사이의 숫자를 입력하세요.`);
      return;
    }

    setMessage(`${nextPage.toLocaleString()}페이지로 이동합니다.`);
    goToPage(nextPage);
  };

  const list = (
    <PageList
      items={pageItems}
      current={current}
      getPageAttrs={getPageAttrs}
      compact={isCompact}
    />
  );

  const nav = (
    <nav
      className={paginationNavVariants({ stack: isMobile })}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy ?? summaryId}
    >
      {isBoundary || isIconOnly ? (
        <PageControl
          {...firstAttrs}
          className={isCompact ? "px-2" : undefined}
        >
          {isIconOnly ? "«" : "« 처음"}
        </PageControl>
      ) : null}

      {isMobile ? (
        <div className="flex w-full max-w-[26.25rem] items-center justify-center gap-2">
          <PageControl {...prevAttrs} className="flex-1">
            ‹ 이전
          </PageControl>
          <PageControl {...nextAttrs} className="flex-1">
            다음 ›
          </PageControl>
        </div>
      ) : (
        <PageControl
          {...prevAttrs}
          className={isCompact ? "px-2" : undefined}
        >
          {isIconOnly ? "‹" : isLarge ? "이전" : "‹ 이전"}
        </PageControl>
      )}

      {list}

      {!isMobile ? (
        <PageControl
          {...nextAttrs}
          className={isCompact ? "px-2" : undefined}
        >
          {isIconOnly ? "›" : isLarge ? "다음" : "다음 ›"}
        </PageControl>
      ) : null}

      {isBoundary || isIconOnly ? (
        <PageControl
          {...lastAttrs}
          className={isCompact ? "px-2" : undefined}
        >
          {isIconOnly ? "»" : "마지막 »"}
        </PageControl>
      ) : null}

      {isJump ? (
        <form
          className="ml-2 inline-flex flex-wrap items-center justify-center gap-1.5"
          onSubmit={handleJumpSubmit}
        >
          <label>
            <span className={visuallyHiddenClassName}>이동할 페이지 번호</span>
            <input
              className={cn(
                "h-10 w-[4.5rem] rounded-[var(--pagination-radius-sm)] border border-[color:var(--pagination-line-strong)]",
                "bg-[var(--pagination-surface)] px-2.5 text-center font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring-color)]",
              )}
              type="number"
              min={1}
              max={max}
              value={jumpValue}
              inputMode="numeric"
              onChange={(event) => setJumpValue(event.currentTarget.value)}
            />
          </label>
          <span className="text-[color:var(--pagination-muted)]">
            / {max.toLocaleString()}
          </span>
          <PageControl type="submit">이동</PageControl>
          <span
            className="min-w-28 text-[color:var(--pagination-muted)]"
            role="status"
            aria-live="polite"
          >
            {message}
          </span>
        </form>
      ) : null}
    </nav>
  );

  if (isSummary) {
    return (
      <div className="grid justify-items-center gap-2">
        <p
          id={summaryId}
          className="m-0 font-bold text-[color:var(--pagination-muted)]"
        >
          {summaryText}
        </p>
        {nav}
      </div>
    );
  }

  if (isPageSize) {
    return (
      <div className="flex flex-wrap items-center justify-between gap-4">
        <label className="inline-flex items-center gap-2 font-bold text-[color:var(--pagination-muted)]">
          페이지당 표시
          <select
            className="h-9 rounded-[var(--pagination-radius-sm)] border border-[color:var(--pagination-line-strong)] bg-[var(--pagination-surface)] px-2"
            aria-label="페이지당 표시할 항목 수"
            value={pageSize}
            onChange={(event) =>
              onPageSizeChange?.(Number(event.currentTarget.value))
            }
          >
            {pageSizeOptions.map((option) => (
              <option key={option} value={option}>
                {option}개
              </option>
            ))}
          </select>
        </label>
        {nav}
      </div>
    );
  }

  return nav;
}

export function LoadMorePagination({
  template,
  page,
  total,
  totalCount,
  visibleCount,
  pageSize,
  onLoadMore,
}: {
  template: KrdsPaginationTemplate;
  page: number;
  total: number;
  totalCount?: number;
  visibleCount?: number;
  pageSize: number;
  onLoadMore?: () => void;
}) {
  const {
    totalCount: resolvedTotalCount,
    visibleCount: resolvedVisibleCount,
    done,
    progress,
  } = getLoadMoreState({
    page,
    total,
    totalCount,
    visibleCount,
    pageSize,
  });

  if (template === "service-commerce-load-more-progress") {
    return (
      <div className="grid justify-items-center gap-2.5">
        <p className="m-0 font-bold text-[color:var(--pagination-muted)]">
          {resolvedTotalCount.toLocaleString()}개 중{" "}
          {resolvedVisibleCount.toLocaleString()}개 상품을 봤어요
        </p>
        <div
          className="h-2 w-full max-w-[21.25rem] overflow-hidden rounded-full bg-slate-200"
          aria-hidden="true"
        >
          <span
            className="block h-full rounded-full bg-[var(--pagination-inverse)]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <button
          className={cn(
            "min-h-11 rounded-full border-0 bg-[var(--pagination-inverse)] px-5 font-black text-[color:var(--pagination-inverse-fg)]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring-color)] disabled:cursor-not-allowed disabled:opacity-45",
          )}
          type="button"
          disabled={done}
          onClick={onLoadMore}
        >
          {done ? "모든 상품을 확인했습니다" : "상품 더 보기"}
        </button>
      </div>
    );
  }

  if (template === "service-infinite-scroll-fallback") {
    return (
      <div
        className="grid justify-items-center gap-2 rounded-[var(--pagination-radius-lg)] border border-dashed border-[color:var(--pagination-line-strong)] bg-[var(--pagination-surface-soft)] p-6"
        role="region"
        aria-label="피드 추가 로딩"
      >
        <span
          className="h-7 w-7 animate-spin rounded-full border-3 border-slate-300 border-t-slate-950"
          aria-hidden="true"
        />
        <p className="m-0 text-[color:var(--pagination-muted)]">
          스크롤하면 더 불러옵니다
        </p>
        <PageControl pill disabled={done} onClick={onLoadMore}>
          수동으로 더 보기
        </PageControl>
      </div>
    );
  }

  return (
    <div className="grid justify-items-center gap-4">
      <button
        className={controlButtonVariants({ pill: false })}
        type="button"
        disabled={done}
        onClick={onLoadMore}
      >
        {done ? "모든 항목을 확인했습니다" : "더보기"}
        <span className="ml-2 font-semibold text-[color:var(--pagination-muted)]">
          {resolvedVisibleCount.toLocaleString()} /{" "}
          {resolvedTotalCount.toLocaleString()}
        </span>
      </button>
    </div>
  );
}

export function SimplePrevNext({
  current,
  max,
  onPageChange,
  previousLabel,
  nextLabel,
}: {
  current: number;
  max: number;
  onPageChange: (page: number) => void;
  previousLabel?: string;
  nextLabel?: string;
}) {
  return (
    <nav
      className="grid grid-cols-1 gap-3 sm:grid-cols-2"
      aria-label="이전/다음 페이지 이동"
    >
      <button
        className={cardButtonClassName}
        type="button"
        disabled={current <= 1}
        onClick={() => onPageChange(current - 1)}
      >
        <span className="text-sm text-[color:var(--pagination-muted)]">
          ‹ 이전
        </span>
        <strong className="mt-1">{previousLabel ?? "최근 글 보기"}</strong>
      </button>
      <button
        className={cn(cardButtonClassName, "items-end text-right")}
        type="button"
        disabled={current >= max}
        onClick={() => onPageChange(current + 1)}
      >
        <span className="text-sm text-[color:var(--pagination-muted)]">
          다음 ›
        </span>
        <strong className="mt-1">{nextLabel ?? "오래된 글 보기"}</strong>
      </button>
    </nav>
  );
}

export function CounterPagination({
  current,
  max,
  onPageChange,
  sticky = false,
}: {
  current: number;
  max: number;
  onPageChange: (page: number) => void;
  sticky?: boolean;
}) {
  return (
    <nav
      className={cn(
        sticky
          ? paginationNavVariants({ sticky: true })
          : "mx-auto grid max-w-80 grid-cols-[3rem_1fr_3rem] items-center gap-2 rounded-full bg-slate-950 p-2 text-white",
      )}
      aria-label="페이지 이동"
    >
      <button
        className={
          sticky
            ? controlButtonVariants({ inverse: true, pill: true })
            : pillButtonClassName
        }
        type="button"
        aria-label="이전 페이지로 이동"
        disabled={current <= 1}
        onClick={() => onPageChange(current - 1)}
      >
        ‹{sticky ? " 이전" : ""}
      </button>
      <span className="text-center font-black" aria-live="polite">
        {current.toLocaleString()} / {max.toLocaleString()}
      </span>
      <button
        className={
          sticky
            ? controlButtonVariants({ inverse: true, pill: true })
            : pillButtonClassName
        }
        type="button"
        aria-label="다음 페이지로 이동"
        disabled={current >= max}
        onClick={() => onPageChange(current + 1)}
      >
        {sticky ? "다음 " : ""}›
      </button>
    </nav>
  );
}

export function DotPagination({
  current,
  max,
  onPageChange,
  thumbnail = false,
}: {
  current: number;
  max: number;
  onPageChange: (page: number) => void;
  thumbnail?: boolean;
}) {
  return (
    <nav
      className="flex flex-wrap items-center justify-center gap-2"
      aria-label={thumbnail ? "상품 이미지 페이지" : "배너 페이지"}
    >
      {Array.from({ length: max }, (_, index) => index + 1).map((item) => {
        const active = item === current;
        return (
          <button
            key={item}
            className={
              thumbnail
                ? cn(
                    "h-14 w-14 rounded-[0.875rem] border-2 bg-white p-1 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring-color)]",
                    active ? "border-slate-950" : "border-transparent",
                  )
                : cn(
                    "h-2.5 rounded-full border-0 bg-slate-400 p-0 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring-color)]",
                    active ? "w-7 bg-slate-950" : "w-2.5",
                  )
            }
            type="button"
            aria-label={
              thumbnail ? `${item}번 이미지로 이동` : `${item}번 배너로 이동`
            }
            aria-current={active ? "true" : undefined}
            onClick={() => onPageChange(item)}
          >
            {thumbnail ? (
              <span
                className="block h-full w-full rounded-[0.625rem] bg-gradient-to-br from-slate-200 to-indigo-300"
                aria-hidden="true"
              />
            ) : null}
          </button>
        );
      })}
    </nav>
  );
}

export function CursorPagination({
  current,
  max,
  onPageChange,
  currentLabel,
}: {
  current: number;
  max: number;
  onPageChange: (page: number) => void;
  currentLabel?: string;
}) {
  return (
    <nav
      className="flex flex-wrap items-center justify-between gap-3"
      aria-label="커서 기반 페이지 이동"
    >
      <button
        className={cn(
          cardButtonClassName,
          "min-h-12 flex-none flex-row items-center px-3.5 py-0",
        )}
        type="button"
        disabled={current <= 1}
        onClick={() => onPageChange(current - 1)}
      >
        ← Newer
      </button>
      <span className="rounded-[var(--pagination-radius-md)] border border-[color:var(--pagination-line)] bg-[var(--pagination-surface-soft)] px-3.5 py-3 font-bold text-[color:var(--pagination-muted)]">
        {currentLabel ?? `${current.toLocaleString()}페이지 기준`}
      </span>
      <button
        className={cn(
          cardButtonClassName,
          "min-h-12 flex-none flex-row items-center px-3.5 py-0",
        )}
        type="button"
        disabled={current >= max}
        onClick={() => onPageChange(current + 1)}
      >
        Older →
      </button>
    </nav>
  );
}

export function TimelineLoadPrevious({
  onLoadMore,
}: {
  onLoadMore?: () => void;
}) {
  return (
    <div
      className="flex flex-wrap items-center justify-center gap-3 rounded-[var(--pagination-radius-lg)] bg-slate-100 p-3.5"
      role="region"
      aria-label="이전 메시지 불러오기"
    >
      <PageControl pill onClick={onLoadMore}>
        이전 메시지 30개 불러오기
      </PageControl>
      <span className="font-bold text-[color:var(--pagination-muted)]">
        오늘
      </span>
    </div>
  );
}

export function TableFooterPagination({
  current,
  max,
  totalCount,
  pageSize,
  pageSizeOptions,
  onPageChange,
  onPageSizeChange,
}: {
  current: number;
  max: number;
  totalCount: number;
  pageSize: number;
  pageSizeOptions: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}) {
  return (
    <nav
      className="flex flex-wrap items-center justify-end gap-3 text-[color:var(--pagination-muted)]"
      aria-label="테이블 페이지 이동"
    >
      <label className="inline-flex items-center gap-2 font-bold">
        Rows per page
        <select
          className="h-9 rounded-[var(--pagination-radius-sm)] border border-[color:var(--pagination-line-strong)] bg-[var(--pagination-surface)] px-2"
          aria-label="페이지당 행 수"
          value={pageSize}
          onChange={(event) =>
            onPageSizeChange?.(Number(event.currentTarget.value))
          }
        >
          {pageSizeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
      <span>{getRangeLabel({ page: current, totalCount, pageSize })}</span>
      <PageControl
        aria-label="이전 페이지로 이동"
        disabled={current <= 1}
        onClick={() => onPageChange(current - 1)}
      >
        ‹
      </PageControl>
      <PageControl
        aria-label="다음 페이지로 이동"
        disabled={current >= max}
        onClick={() => onPageChange(current + 1)}
      >
        ›
      </PageControl>
    </nav>
  );
}

export function SelectPagePagination({
  current,
  max,
  onPageChange,
}: {
  current: number;
  max: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <form
      className="flex flex-wrap items-center justify-center gap-3"
      aria-label="페이지 선택"
    >
      <PageControl
        aria-label="이전 페이지로 이동"
        disabled={current <= 1}
        onClick={() => onPageChange(current - 1)}
      >
        ‹
      </PageControl>
      <label className="inline-flex items-center gap-2 font-bold">
        페이지
        <select
          className="h-9 rounded-[var(--pagination-radius-sm)] border border-[color:var(--pagination-line-strong)] bg-[var(--pagination-surface)] px-2"
          aria-label="이동할 페이지"
          value={current}
          onChange={(event) => onPageChange(Number(event.currentTarget.value))}
        >
          {Array.from({ length: max }, (_, index) => index + 1).map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
      <span>/ {max.toLocaleString()}</span>
      <PageControl
        aria-label="다음 페이지로 이동"
        disabled={current >= max}
        onClick={() => onPageChange(current + 1)}
      >
        ›
      </PageControl>
    </form>
  );
}

export function ChipPagination({
  pages,
  current,
  max,
  onPageChange,
}: {
  pages: number[];
  current: number;
  max: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <nav
      className="flex flex-wrap items-center justify-center gap-2"
      aria-label="칩 페이지네이션"
    >
      <PageControl
        pill
        aria-label="이전 페이지로 이동"
        disabled={current <= 1}
        onClick={() => onPageChange(current - 1)}
      >
        ‹
      </PageControl>
      {pages.map((item) =>
        item === current ? (
          <span
            key={item}
            className={controlButtonVariants({ active: true, pill: true })}
            aria-current="page"
          >
            {item}
          </span>
        ) : (
          <PageControl
            key={item}
            pill
            aria-label={`${item}페이지로 이동`}
            onClick={() => onPageChange(item)}
          >
            {item}
          </PageControl>
        ),
      )}
      <PageControl
        pill
        aria-label="다음 페이지로 이동"
        disabled={current >= max}
        onClick={() => onPageChange(current + 1)}
      >
        ›
      </PageControl>
    </nav>
  );
}

export function StepPagination({
  current,
  labels,
}: {
  current: number;
  labels: string[];
}) {
  return (
    <ol
      className="m-0 grid list-none grid-cols-2 gap-x-2 gap-y-5 p-0 sm:grid-cols-4"
      aria-label="단계 진행 상태"
    >
      {labels.map((label, index) => {
        const step = index + 1;
        const isCurrent = step === current;
        const isDone = step < current;

        return (
          <li
            key={label}
            className="grid justify-items-center gap-2 font-bold text-[color:var(--pagination-muted)]"
            aria-current={isCurrent ? "step" : undefined}
          >
            <span
              className={cn(
                "inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-slate-900",
                isDone && "bg-emerald-100",
                isCurrent &&
                  "scale-110 bg-[var(--pagination-inverse)] text-[color:var(--pagination-inverse-fg)]",
              )}
            >
              {step}
            </span>
            {label}
          </li>
        );
      })}
    </ol>
  );
}

export function IndexPagination({
  labels,
  current,
  onPageChange,
}: {
  labels: string[];
  current: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <nav
      className="flex flex-wrap items-center justify-center gap-2"
      aria-label="초성 인덱스"
    >
      {labels.map((label, index) => {
        const page = index + 1;
        const active = page === current;

        return active ? (
          <span
            key={label}
            className={controlButtonVariants({ active: true, pill: true })}
            aria-current="page"
          >
            {label}
          </span>
        ) : (
          <PageControl
            key={label}
            pill
            aria-label={`${label} 인덱스로 이동`}
            onClick={() => onPageChange(page)}
          >
            {label}
          </PageControl>
        );
      })}
    </nav>
  );
}

export function DatePagination({
  current,
  date,
  onPageChange,
  onDateChange,
}: {
  current: number;
  date?: string;
  onPageChange: (page: number) => void;
  onDateChange?: (date: string) => void;
}) {
  return (
    <nav
      className="flex flex-wrap items-center justify-center gap-2"
      aria-label="날짜별 목록 이동"
    >
      <PageControl pill onClick={() => onPageChange(current - 1)}>
        ‹ 전날
      </PageControl>
      <input
        className="min-h-10 rounded-[var(--pagination-radius-sm)] border border-[color:var(--pagination-line-strong)] bg-[var(--pagination-surface)] px-3 font-bold"
        type="date"
        value={date ?? ""}
        aria-label="조회 날짜"
        onChange={(event) => onDateChange?.(event.currentTarget.value)}
      />
      <PageControl pill onClick={() => onPageChange(current + 1)}>
        다음날 ›
      </PageControl>
    </nav>
  );
}

export function SectionMorePagination({
  visibleCount,
  totalCount,
  sectionHref,
  onLoadMore,
}: {
  visibleCount: number;
  totalCount: number;
  sectionHref?: string;
  onLoadMore?: () => void;
}) {
  const label = `이번 주 인기 혜택 ${totalCount.toLocaleString()}개 중 ${visibleCount.toLocaleString()}개 표시`;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-[var(--pagination-radius-lg)] border border-[color:var(--pagination-line)] bg-gradient-to-br from-white to-indigo-50 p-4">
      <span className="font-bold text-[color:var(--pagination-muted)]">
        {label}
      </span>
      {sectionHref ? (
        <a
          className="rounded-[var(--pagination-radius-md)] bg-[var(--pagination-inverse)] px-3.5 py-3 font-bold text-[color:var(--pagination-inverse-fg)]"
          href={sectionHref}
        >
          전체 보기 →
        </a>
      ) : (
        <button
          className="rounded-[var(--pagination-radius-md)] bg-[var(--pagination-inverse)] px-3.5 py-3 font-bold text-[color:var(--pagination-inverse-fg)]"
          type="button"
          onClick={onLoadMore}
        >
          전체 보기 →
        </button>
      )}
    </div>
  );
}

export function SeasonPagination({
  current,
  max,
  onPageChange,
  previousLabel,
  nextLabel,
  currentLabel,
}: {
  current: number;
  max: number;
  onPageChange: (page: number) => void;
  previousLabel?: string;
  nextLabel?: string;
  currentLabel?: string;
}) {
  return (
    <nav
      className="flex flex-wrap items-center justify-center gap-2"
      aria-label="시즌 이동"
    >
      <PageControl
        pill
        disabled={current <= 1}
        onClick={() => onPageChange(current - 1)}
      >
        ‹ {previousLabel ?? `시즌 ${current - 1}`}
      </PageControl>
      <strong className="inline-flex min-h-11 items-center rounded-full bg-[var(--pagination-inverse)] px-5 text-[color:var(--pagination-inverse-fg)]">
        {currentLabel ?? `시즌 ${current}`}
      </strong>
      <PageControl
        pill
        disabled={current >= max}
        onClick={() => onPageChange(current + 1)}
      >
        {nextLabel ?? `시즌 ${current + 1}`} ›
      </PageControl>
    </nav>
  );
}

export function renderPaginationTemplate({
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
}: {
  template: KrdsPaginationTemplate;
  pagination: UsePaginationReturn;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  total: number;
  totalCount?: number;
  visibleCount?: number;
  pageSize: number;
  pageSizeOptions: number[];
  onPageSizeChange?: (pageSize: number) => void;
  onLoadMore?: () => void;
  summary?: string;
  labels?: string[];
  stepLabels?: string[];
  date?: string;
  onDateChange?: (date: string) => void;
  currentLabel?: string;
  previousLabel?: string;
  nextLabel?: string;
  sectionHref?: string;
}) {
  const { current, max, pages, goToPage } = pagination;
  const pageCountForDots = max;

  if (
    template === "krds-friendly-load-more-basic" ||
    template === "service-commerce-load-more-progress" ||
    template === "service-infinite-scroll-fallback"
  ) {
    return (
      <LoadMorePagination
        template={template}
        page={current}
        total={totalCount ?? total}
        totalCount={totalCount}
        visibleCount={visibleCount}
        pageSize={pageSize}
        onLoadMore={onLoadMore}
      />
    );
  }

  if (template === "service-simple-prev-next") {
    return (
      <SimplePrevNext
        current={current}
        max={max}
        onPageChange={goToPage}
        previousLabel={previousLabel}
        nextLabel={nextLabel}
      />
    );
  }

  if (
    template === "service-mobile-counter-pill" ||
    template === "service-sticky-bottom-bar"
  ) {
    return (
      <CounterPagination
        current={current}
        max={max}
        onPageChange={goToPage}
        sticky={template === "service-sticky-bottom-bar"}
      />
    );
  }

  if (
    template === "service-carousel-dot" ||
    template === "service-carousel-thumbnail"
  ) {
    return (
      <DotPagination
        current={clamp(current, 1, pageCountForDots)}
        max={pageCountForDots}
        onPageChange={goToPage}
        thumbnail={template === "service-carousel-thumbnail"}
      />
    );
  }

  if (template === "service-cursor-older-newer") {
    return (
      <CursorPagination
        current={current}
        max={max}
        onPageChange={goToPage}
        currentLabel={currentLabel}
      />
    );
  }

  if (template === "service-timeline-load-previous") {
    return <TimelineLoadPrevious onLoadMore={onLoadMore} />;
  }

  if (template === "service-table-footer") {
    const resolvedTotalCount = Math.max(totalCount ?? max * pageSize, 0);
    const resolvedMax = Math.max(1, Math.ceil(resolvedTotalCount / pageSize));

    return (
      <TableFooterPagination
        current={clamp(current, 1, resolvedMax)}
        max={resolvedMax}
        totalCount={resolvedTotalCount}
        pageSize={pageSize}
        pageSizeOptions={pageSizeOptions}
        onPageChange={goToPage}
        onPageSizeChange={onPageSizeChange}
      />
    );
  }

  if (template === "service-select-page") {
    return (
      <SelectPagePagination
        current={current}
        max={max}
        onPageChange={goToPage}
      />
    );
  }

  if (template === "service-chip-numbered") {
    return (
      <ChipPagination
        pages={pages}
        current={current}
        max={max}
        onPageChange={goToPage}
      />
    );
  }

  if (template === "service-step-progress") {
    const resolvedLabels = stepLabels ?? labels ?? ["약관", "정보 입력", "인증", "완료"];

    return (
      <StepPagination
        current={clamp(current, 1, resolvedLabels.length)}
        labels={resolvedLabels}
      />
    );
  }

  if (template === "service-index-korean-initial") {
    const resolvedLabels = labels ?? [
      "전체",
      "ㄱ",
      "ㄴ",
      "ㄷ",
      "ㄹ",
      "ㅁ",
      "ㅂ",
      "ㅅ",
      "ㅇ",
      "ㅈ",
      "ㅊ",
      "ㅋ",
      "ㅌ",
      "ㅍ",
      "ㅎ",
    ];

    return (
      <IndexPagination
        labels={resolvedLabels}
        current={clamp(current, 1, resolvedLabels.length)}
        onPageChange={goToPage}
      />
    );
  }

  if (template === "service-date-navigator") {
    return (
      <DatePagination
        current={current}
        date={date}
        onPageChange={goToPage}
        onDateChange={onDateChange}
      />
    );
  }

  if (template === "service-section-load-more") {
    return (
      <SectionMorePagination
        visibleCount={visibleCount ?? pageSize}
        totalCount={totalCount ?? total}
        sectionHref={sectionHref}
        onLoadMore={onLoadMore}
      />
    );
  }

  if (template === "service-season-selector") {
    return (
      <SeasonPagination
        current={current}
        max={max}
        onPageChange={goToPage}
        previousLabel={previousLabel}
        nextLabel={nextLabel}
        currentLabel={currentLabel}
      />
    );
  }

  return (
    <NumberedPagination
      template={template}
      pagination={pagination}
      ariaLabel={ariaLabel ?? "목록 페이지네이션"}
      ariaDescribedBy={ariaDescribedBy}
      summary={summary}
      totalCount={totalCount}
      pageSize={pageSize}
      pageSizeOptions={pageSizeOptions}
      onPageSizeChange={onPageSizeChange}
    />
  );
}
