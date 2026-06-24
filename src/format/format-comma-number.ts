/**
 * 숫자 또는 숫자 형태 문자열에 3자리 단위 구분 기호를 추가합니다.
 * 숫자로 변환할 수 없는 값은 원본 문자열을 반환합니다.
 */
export function formatCommaNumber(value: number | string): string {
  const number = Number(value);

  if (Number.isNaN(number)) {
    return String(value);
  }

  return number.toLocaleString("ko-KR");
}
