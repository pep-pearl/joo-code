import type { RouteObject } from "react-router";

export interface RouteMeta {
  title?: string;
  menuTitle?: string;
  hidden?: boolean;
  menuId?: string;
}

/** React Router의 RouteObject에 프로젝트용 meta를 더한 편의 타입입니다. */
export type RouteObjectWithMeta = Omit<RouteObject, "children"> & {
  meta?: RouteMeta;
  children?: RouteObjectWithMeta[];
};
