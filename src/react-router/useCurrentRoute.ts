import { matchRoutes, type RouteObject, useLocation } from "react-router";

/** 현재 location과 일치하는 라우트 계층과 마지막 라우트를 반환합니다. */
export function useCurrentRoute(routes: RouteObject | RouteObject[]) {
  const routeList = Array.isArray(routes) ? routes : [routes];
  const location = useLocation();
  const matches = matchRoutes(routeList, location);

  return {
    tree: matches?.map(({ route }) => route),
    route: matches?.at(-1)?.route ?? null,
  };
}
