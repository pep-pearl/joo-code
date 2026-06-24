/**
 * 실제 viewport 높이의 1%를 CSS 변수 `--vh`에 저장합니다.
 * SSR 환경에서는 아무 작업도 하지 않는 cleanup 함수를 반환합니다.
 */
export function initViewportHeight(): () => void {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const updateViewportHeight = () => {
    const viewportHeight = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${viewportHeight}px`);
  };

  updateViewportHeight();
  window.addEventListener("resize", updateViewportHeight);

  return () => window.removeEventListener("resize", updateViewportHeight);
}
