export function usePaginationButtonsAttrs({
  max,
  current,
  onChange,
}: {
  max: number;
  current: number;
  onChange: (page: number) => void;
}): {
  firstAttrs: Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "type" | "children" | "className"
  >;
  prevAttrs: Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "type" | "children" | "className"
  >;
  nextAttrs: Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "type" | "children" | "className"
  >;
  lastAttrs: Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "type" | "children" | "className"
  >;
} {
  return {
    firstAttrs: {
      "aria-label": "첫 페이지로 이동",
      disabled: current - 1 <= 0,
      onClick: () => {
        if (current - 1 <= 0) return;
        onChange(1);
      },
    },
    prevAttrs: {
      "aria-label": "이전 페이지로 이동",
      disabled: current - 1 <= 0,
      onClick: () => {
        if (current - 1 <= 0) return;
        onChange(current - 1);
      },
    },
    nextAttrs: {
      "aria-label": "다음 페이지로 이동",
      disabled: max < current + 1,
      onClick: () => {
        if (max < current + 1) return;
        onChange(current + 1);
      },
    },
    lastAttrs: {
      "aria-label": "마지막 페이지로 이동",
      disabled: current === max,
      onClick: () => {
        if (current === max) return;
        onChange(max);
      },
    },
  };
}
