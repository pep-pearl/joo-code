/**
 * @packageDocumentation
 * 모바일 브라우저 viewport 높이 보정을 위한 DOM 유틸리티입니다.
 */

/**
 * 실제 viewport 높이를 계산해 CSS 변수 `--vh`에 설정합니다.
 *
 * - 모바일 브라우저 주소창 때문에 `100vh`가 실제 화면보다 커지는 문제를 줄일 때 사용합니다.
 * - 브라우저 환경이 아니면 아무 작업도 하지 않는 cleanup 함수를 반환합니다.
 * - 호출 즉시 `--vh`를 설정하고, 이후 `resize` 이벤트마다 값을 다시 계산합니다.
 *
 * @returns 등록한 `resize` 이벤트를 제거하는 cleanup 함수입니다.
 *
 * @example
 * ```ts
 * const cleanup = initViewportHeight();
 *
 * // 앱 종료나 effect cleanup 시점에 호출합니다.
 * cleanup();
 * ```
 *
 * @example
 * ```css
 * .container {
 *   height: 100vh;
 *   height: calc(var(--vh, 1vh) * 100);
 * }
 * ```
 */
export const initViewportHeight = (): (() => void) => {
  if (typeof window === "undefined") return () => {};

  const setVh = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  setVh();
  window.addEventListener("resize", setVh);

  return () => window.removeEventListener("resize", setVh);
};
