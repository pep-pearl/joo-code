/**
 * 천원 단위 금액을 억원 단위 문자열로 변환합니다.
 * 예: 100,000천원 -> 1.00억원
 */
export function formatThousandToEok(
  value: number | string,
  digits = 2,
): string {
  const number = Number(String(value).replaceAll(",", ""));

  if (Number.isNaN(number)) {
    return "0";
  }

  const eok = Number((number / 100_000).toFixed(digits));

  return eok.toLocaleString("ko-KR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}
