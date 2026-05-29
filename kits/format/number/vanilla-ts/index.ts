/**
 * @packageDocumentation
 * 숫자 표시와 변환에 자주 쓰는 순수 TypeScript 유틸리티입니다.
 */

/**
 * 숫자 또는 숫자 형태의 문자열에 3자리 단위 콤마를 추가합니다.
 *
 * - `ko-KR` locale을 기준으로 숫자를 표시합니다.
 * - 숫자로 변환할 수 없는 값은 원본 값을 문자열로 반환합니다.
 *
 * @param value - 표시할 숫자 또는 숫자 형태의 문자열입니다.
 * @returns 콤마가 포함된 문자열입니다. 변환할 수 없는 값은 원본 문자열을 반환합니다.
 *
 * @example
 * ```ts
 * formatCommaNumber(1234567); // "1,234,567"
 * formatCommaNumber("1000"); // "1,000"
 * formatCommaNumber("abc"); // "abc"
 * ```
 */
export function formatCommaNumber(value: number | string): string {
  const num = Number(value);

  if (isNaN(num)) return String(value);
  return num.toLocaleString("ko-KR");
}

/**
 * 천원 단위 금액을 억 단위 문자열로 변환합니다.
 *
 * - 입력값의 콤마는 제거한 뒤 숫자로 변환합니다.
 * - 숫자로 변환할 수 없는 값은 `"0"`을 반환합니다.
 * - `100,000`천원을 1억으로 계산합니다.
 *
 * @param value - 변환할 값입니다. 숫자 또는 콤마가 포함된 숫자 문자열을 사용할 수 있습니다.
 * @param digits - 표시할 소수 자릿수입니다. 기본값은 `2`입니다.
 * @returns 억 단위로 변환된 `ko-KR` 형식 문자열입니다.
 *
 * @example
 * ```ts
 * formatThousandToEok(100000); // "1.00"
 * formatThousandToEok("2550600", 1); // "25.5"
 * formatThousandToEok("invalid"); // "0"
 * ```
 */
export function formatThousandToEok(
  value: number | string,
  digits = 2
): string {
  let num = Number(String(value).replace(/,/g, ""));
  if (isNaN(num)) return "0";

  const eok = num / 100000;
  const formattedNum = Number(eok.toFixed(digits));

  return formattedNum.toLocaleString("ko-KR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

/**
 * 로마 숫자 문자열을 아라비아 숫자로 변환합니다.
 *
 * - 일반 알파벳 로마 숫자와 일부 Unicode 로마 숫자를 처리합니다.
 * - `IV`, `IX`처럼 작은 값이 큰 값 앞에 오는 감산 표기법을 처리합니다.
 * - 매칭되는 문자가 없으면 해당 문자는 `0`으로 계산됩니다.
 *
 * @param roman - 변환할 로마 숫자 문자열입니다.
 * @returns 변환된 아라비아 숫자입니다.
 *
 * @example
 * ```ts
 * romanToNumber("XII"); // 12
 * romanToNumber("IV"); // 4
 * romanToNumber("Ⅵ"); // 6
 * ```
 */
export function romanToNumber(roman: string): number {
  const map: Record<string, number> = {
    Ⅰ: 1,
    Ⅱ: 2,
    Ⅲ: 3,
    Ⅳ: 4,
    Ⅴ: 5,
    Ⅵ: 6,
    Ⅶ: 7,
    Ⅷ: 8,
    Ⅸ: 9,
    Ⅹ: 10,
    Ⅺ: 11,
    Ⅻ: 12,
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  const normalized = roman
    .replace(/[ⅰⅱⅲⅳⅴⅵⅶⅷⅸⅹⅺⅻ]/g, (c) =>
      String.fromCharCode(c.charCodeAt(0) - 0x2170 + 73)
    )
    .toUpperCase();

  let result = 0;
  let prev = 0;

  for (let i = normalized.length - 1; i >= 0; i--) {
    const value = map[normalized[i]] ?? 0;
    if (value < prev) {
      result -= value;
    } else {
      result += value;
    }
    prev = value;
  }
  return result;
}
