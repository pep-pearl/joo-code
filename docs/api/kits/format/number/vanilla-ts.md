[**Joo Code Archive API**](../../../README.md)

***

[Joo Code Archive API](../../../modules.md) / kits/format/number/vanilla-ts

# kits/format/number/vanilla-ts

숫자 표시와 변환에 자주 쓰는 순수 TypeScript 유틸리티입니다.

## Functions

### formatCommaNumber()

> **formatCommaNumber**(`value`): `string`

Defined in: kits/format/number/vanilla-ts/index.ts:22

숫자 또는 숫자 형태의 문자열에 3자리 단위 콤마를 추가합니다.

- `ko-KR` locale을 기준으로 숫자를 표시합니다.
- 숫자로 변환할 수 없는 값은 원본 값을 문자열로 반환합니다.

#### Parameters

##### value

표시할 숫자 또는 숫자 형태의 문자열입니다.

`string` | `number`

#### Returns

`string`

콤마가 포함된 문자열입니다. 변환할 수 없는 값은 원본 문자열을 반환합니다.

#### Example

```ts
formatCommaNumber(1234567); // "1,234,567"
formatCommaNumber("1000"); // "1,000"
formatCommaNumber("abc"); // "abc"
```

***

### formatThousandToEok()

> **formatThousandToEok**(`value`, `digits`): `string`

Defined in: kits/format/number/vanilla-ts/index.ts:47

천원 단위 금액을 억 단위 문자열로 변환합니다.

- 입력값의 콤마는 제거한 뒤 숫자로 변환합니다.
- 숫자로 변환할 수 없는 값은 `"0"`을 반환합니다.
- `100,000`천원을 1억으로 계산합니다.

#### Parameters

##### value

변환할 값입니다. 숫자 또는 콤마가 포함된 숫자 문자열을 사용할 수 있습니다.

`string` | `number`

##### digits

`number` = `2`

표시할 소수 자릿수입니다. 기본값은 `2`입니다.

#### Returns

`string`

억 단위로 변환된 `ko-KR` 형식 문자열입니다.

#### Example

```ts
formatThousandToEok(100000); // "1.00"
formatThousandToEok("2550600", 1); // "25.5"
formatThousandToEok("invalid"); // "0"
```

***

### romanToNumber()

> **romanToNumber**(`roman`): `number`

Defined in: kits/format/number/vanilla-ts/index.ts:80

로마 숫자 문자열을 아라비아 숫자로 변환합니다.

- 일반 알파벳 로마 숫자와 일부 Unicode 로마 숫자를 처리합니다.
- `IV`, `IX`처럼 작은 값이 큰 값 앞에 오는 감산 표기법을 처리합니다.
- 매칭되는 문자가 없으면 해당 문자는 `0`으로 계산됩니다.

#### Parameters

##### roman

`string`

변환할 로마 숫자 문자열입니다.

#### Returns

`number`

변환된 아라비아 숫자입니다.

#### Example

```ts
romanToNumber("XII"); // 12
romanToNumber("IV"); // 4
romanToNumber("Ⅵ"); // 6
```
