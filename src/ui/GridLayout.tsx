import {
  forwardRef,
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
  type ReactElement,
} from "react";
import type { PolymorphicProps, PolymorphicRef } from "./types";

type GridLayoutProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * 그리드 열 개수
   * @default 1
   */
  col?: number;

  /**
   * grid-template-columns 값
   * 지정하지 않으면 col 개수만큼 1fr 적용
   * 예: "200px 1fr", "repeat(3, minmax(0, 1fr))"
   */
  gridTemplateColumns?: CSSProperties["gridTemplateColumns"];
  /**
   * grid-template-rows 값
   * 지정하지 않으면 rowHeight에 따라 자동으로 생성
   */
  gridTemplateRows?: CSSProperties["gridTemplateRows"];

  /**
   * 각 행의 기본 높이
   * 예: 100, "120px", "minmax(100px, auto)"
   */
  rowHeight?: number | string;

  /**
   * 빈 공간이 생겼을 때 뒤의 요소를 채워 넣을지 여부
   * @default false
   */
  dense?: boolean;
};

type GridLayoutItemProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * 차지할 열 개수
   * @default 1
   */
  colSpan?: number;

  /**
   * 차지할 행 개수
   * @default 1
   */
  rowSpan?: number;

  /**
   * 특정 열에서 시작
   */
  colStart?: number;

  /**
   * 특정 행에서 시작
   */
  rowStart?: number;
};

function joinClassNames(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

const GridLayoutRoot = forwardRef<HTMLDivElement, GridLayoutProps>(
  (
    {
      col = 1,
      rowHeight,
      dense = false,
      className,
      style,
      children,
      gridTemplateColumns,
      gridTemplateRows,
      ...props
    },
    ref,
  ) => {
    const gridStyle: CSSProperties = {
      gridTemplateColumns:
        gridTemplateColumns ?? `repeat(${col}, minmax(0, 1fr))`,
      gridTemplateRows: gridTemplateRows,
      gridAutoRows: gridTemplateRows
        ? undefined
        : typeof rowHeight === "number"
          ? `${rowHeight}px`
          : rowHeight,
      gridAutoFlow: dense ? "row dense" : "row",
      ...style,
    };
    return (
      <div
        ref={ref}
        className={joinClassNames("grid", className)}
        style={gridStyle}
        {...props}
      >
        {children}
      </div>
    );
  },
);

GridLayoutRoot.displayName = "GridLayout";
type GridLayoutItemComponent = (<T extends ElementType = "div">(
  props: PolymorphicProps<T, GridLayoutItemProps> & {
    ref?: PolymorphicRef<T>;
  },
) => ReactElement | null) & {
  displayName?: string;
};

const GridLayoutItemInner = <T extends ElementType = "div">(
  {
    as,
    colSpan = 1,
    rowSpan = 1,
    colStart,
    rowStart,
    className,
    style,
    children,
    ...props
  }: PolymorphicProps<T, GridLayoutItemProps>,
  ref: PolymorphicRef<T>,
) => {
  const Component = as ?? "div";

  const itemStyle: CSSProperties = {
    gridColumn: colStart
      ? `${colStart} / span ${colSpan}`
      : `span ${colSpan} / span ${colSpan}`,
    gridRow: rowStart
      ? `${rowStart} / span ${rowSpan}`
      : `span ${rowSpan} / span ${rowSpan}`,
    ...style,
  };

  return (
    <Component ref={ref} className={className} style={itemStyle} {...props}>
      {children}
    </Component>
  );
};

export const GridLayoutItem = forwardRef(
  GridLayoutItemInner as never,
) as unknown as GridLayoutItemComponent;

GridLayoutItem.displayName = "GridLayout.Item";

type GridLayoutCompoundComponent = typeof GridLayoutRoot & {
  Item: typeof GridLayoutItem;
};

export const GridLayout = GridLayoutRoot as GridLayoutCompoundComponent;

GridLayout.Item = GridLayoutItem;
