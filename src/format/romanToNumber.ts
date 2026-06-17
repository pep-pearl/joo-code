const ROMAN_NUMBER_MAP: Readonly<Record<string, number>> = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
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
};

/** 일반 로마 숫자와 유니코드 로마 숫자를 아라비아 숫자로 변환합니다. */
export function romanToNumber(roman: string): number {
  const normalized = roman.trim().toUpperCase();
  let result = 0;
  let previous = 0;

  for (let index = normalized.length - 1; index >= 0; index -= 1) {
    const current = ROMAN_NUMBER_MAP[normalized[index]] ?? 0;
    result += current < previous ? -current : current;
    previous = current;
  }

  return result;
}
