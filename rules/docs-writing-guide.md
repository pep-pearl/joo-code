# Docs Writing Guide

이 문서는 `joo-code`의 API 문서를 일관된 형식으로 작성하기 위한 규칙입니다.

`joo-code`의 API 문서는 TypeDoc과 `typedoc-plugin-markdown`으로 생성됩니다. 따라서 API 문서를 수정할 때는 `docs/*.md`를 직접 고치기보다, 소스 코드의 JSDoc을 먼저 수정하는 방식을 기본으로 합니다.

## Documentation Source of Truth

API 설명의 기준은 소스 파일의 JSDoc입니다.

```text
source JSDoc -> yarn docs -> docs/*.md
```

수동으로 관리하는 문서:

- `README.md`
- `AGENTS.md`
- `rules/docs-writing-guide.md`
- 기타 명시적인 가이드 문서

생성물로 취급하는 문서:

- `docs/modules.md`
- `docs/frontend/**`
- `docs/shared/**`

생성 문서에서 문제가 보이면 먼저 소스 JSDoc 포맷을 확인합니다.

## TypeDoc Context

현재 문서 생성 흐름은 다음 기준을 따릅니다.

```json
{
  "entryPointStrategy": "expand",
  "entryPoints": ["shared/js", "shared/ts", "frontend/react-ts"],
  "out": "docs",
  "plugin": ["typedoc-plugin-markdown"],
  "outputFileStrategy": "modules",
  "entryFileName": "README.md"
}
```

문서 생성 명령:

```bash
yarn docs
```

## Writing Flow

1. 공개 API인지 확인합니다.
2. 해당 파일이 TypeDoc `entryPoints` 범위에 포함되는지 확인합니다.
3. 파일 상단에 필요한 경우 `@packageDocumentation`을 작성합니다.
4. export 대상마다 JSDoc을 작성합니다.
5. `@param`, `@returns`, `@example`이 Markdown에서 올바르게 분리되도록 작성합니다.
6. `yarn docs`로 생성 문서를 갱신합니다.
7. 생성 결과에서 깨진 목록, 잘못된 태그, 예제 코드 블록을 확인합니다.

## Package Documentation Template

파일 또는 모듈 단위 설명은 `@packageDocumentation`을 사용합니다.

```ts
/**
 * @packageDocumentation
 * 숫자와 관련된 데이터를 적합한 형식의 문자열로 변환하는 유틸리티 모음입니다.
 *
 * - 한국어 서비스에서 자주 사용하는 숫자 포맷을 제공합니다.
 * - 숫자 또는 숫자 형태의 문자열 입력을 다룹니다.
 */
```

작성 기준:

- 첫 문장은 모듈의 책임을 설명합니다.
- 목록에는 대표 기능이나 사용 맥락을 적습니다.
- 내부 구현 세부사항보다 사용자가 알아야 할 범위를 우선합니다.

## Function Documentation Template

````ts
/**
 * 함수가 제공하는 동작을 한 문장으로 설명합니다.
 *
 * - 중요한 동작 규칙을 설명합니다.
 * - 기본값, 단위, fallback 처리를 설명합니다.
 * - 사용하면 좋은 상황을 설명합니다.
 *
 * @param value - 파라미터의 의미와 허용되는 입력을 설명합니다.
 * @param options - 옵션 객체의 의미를 설명합니다.
 * @returns 반환값의 의미와 실패 또는 예외적 입력의 반환 규칙을 설명합니다.
 *
 * @example
 * ```ts
 * const result = utility("input");
 * ```
 */
export function utility(value: string, options?: Options): string {
  return value;
}
````

## Generic Documentation Template

제네릭 타입이 있는 경우 `@template`을 사용합니다.

```ts
/**
 * 입력 값을 지연 처리한 뒤 마지막 값을 반환합니다.
 *
 * @template T - 지연 처리할 값의 타입입니다.
 * @param value - 디바운싱을 적용할 원본 값입니다.
 * @param delay - 지연 시간입니다. 단위는 밀리초이며 기본값은 250입니다.
 * @returns 지연 시간이 지난 뒤 마지막으로 반영된 값입니다.
 */
export function useDebouncedValue<T>(value: T, delay = 250): T {
  return value;
}
```

## Type Documentation Template

````ts
/**
 * 특정 도메인 값을 구분하기 위한 branded type입니다.
 *
 * @template T - 실제 값의 타입입니다.
 * @template BrandName - 값을 구분하는 브랜드 이름입니다.
 *
 * @example
 * ```ts
 * type UserId = Brand<string, "UserId">;
 * ```
 */
export type Brand<T, BrandName extends string> = T & {
  readonly __brand: BrandName;
};
````

## JSDoc Formatting Rules

### Use a summary sentence first

Bad:

```ts
/**
 * value를 받아 처리합니다.
 */
```

Good:

```ts
/**
 * 숫자 또는 숫자 형태의 문자열을 한국어 숫자 포맷으로 변환합니다.
 */
```

### Use `-` for lists

Bad:

```ts
/**
 * 설명입니다.
 * * 첫 번째 규칙
 * * 두 번째 규칙
 */
```

Good:

```ts
/**
 * 설명입니다.
 *
 * - 첫 번째 규칙
 * - 두 번째 규칙
 */
```

### Do not prefix JSDoc tags with list markers

Bad:

```ts
/**
 * 값을 변환합니다.
 * * @param value - 변환할 값
 * * @returns 변환된 값
 */
```

Good:

```ts
/**
 * 값을 변환합니다.
 *
 * @param value - 변환할 값입니다.
 * @returns 변환된 값입니다.
 */
```

### Separate description, tags, and examples with blank lines

Good:

````ts
/**
 * 값을 포맷팅합니다.
 *
 * - 숫자로 변환할 수 없는 값은 원본 문자열로 반환합니다.
 *
 * @param value - 포맷팅할 값입니다.
 * @returns 포맷팅된 문자열입니다.
 *
 * @example
 * ```ts
 * formatCommaNumber(1234567); // "1,234,567"
 * ```
 */
````

## Directory-Specific Guidance

### `shared/js`

- JavaScript 런타임에서 사용할 수 있는 범위를 설명합니다.
- 타입 안정성보다 입력값 처리와 반환 규칙을 명확히 적습니다.
- 브라우저 또는 Node.js 전제가 있으면 반드시 작성합니다.

### `shared/ts`

- 타입 안정성과 입력/출력 계약을 중심으로 작성합니다.
- 포맷터는 로케일, 단위, 소수점 처리, fallback을 설명합니다.
- DOM 유틸은 브라우저 환경 전제를 설명합니다.

### `frontend/react-ts/src/pures`

- 외부 라이브러리 의존이 없거나 최소화된 React 로직을 설명합니다.
- 훅은 상태 변화, 반환값, dependency 변화에 따른 동작을 설명합니다.
- 예제는 `tsx` 코드 블록을 사용합니다.

### `frontend/react-ts/src/patterns`

- React Router 등 외부 라이브러리 의존성을 설명합니다.
- 사용 전제 조건과 적합한 상황을 작성합니다.
- 라우팅, 상태, 브라우저 API와 관련된 주의사항을 함께 적습니다.

### `frontend/react-ts/src/types`

- 타입이 해결하는 문제를 먼저 설명합니다.
- `@template`으로 타입 파라미터의 의미를 작성합니다.
- 가능한 경우 실제 타입 선언 예제를 포함합니다.

## Example Guidelines

### Formatter or converter

````ts
/**
 * 숫자에 3자리 단위로 콤마를 추가합니다.
 *
 * - 한국(ko-KR) 로케일 기준으로 포맷팅합니다.
 * - 숫자로 변환할 수 없는 값은 원본 값을 문자열로 반환합니다.
 *
 * @param value - 포맷팅할 숫자 또는 숫자 형태의 문자열입니다.
 * @returns 콤마가 포함된 문자열입니다.
 *
 * @example
 * ```ts
 * formatCommaNumber(1234567); // "1,234,567"
 * formatCommaNumber("1000"); // "1,000"
 * formatCommaNumber("abc"); // "abc"
 * ```
 */
````

### React hook

````ts
/**
 * 연속적으로 변경되는 값을 지연시킨 뒤 마지막 값만 반환합니다.
 *
 * - 검색어 입력처럼 짧은 시간에 값이 자주 바뀌는 상황에 사용합니다.
 * - 불필요한 API 호출을 줄이는 데 적합합니다.
 *
 * @template T - 지연 처리할 값의 타입입니다.
 * @param value - 디바운싱을 적용할 원본 값입니다.
 * @param delay - 지연 시간입니다. 단위는 밀리초이며 기본값은 250입니다.
 * @returns 지연 시간이 지난 뒤 마지막으로 반영된 값입니다.
 *
 * @example
 * ```tsx
 * const [searchTerm, setSearchTerm] = useState("");
 * const debouncedSearchTerm = useDebouncedValue(searchTerm, 500);
 *
 * useEffect(() => {
 *   fetchData(debouncedSearchTerm);
 * }, [debouncedSearchTerm]);
 * ```
 */
````

### DOM utility

````ts
/**
 * 현재 브라우저 viewport의 너비와 높이를 반환합니다.
 *
 * - 브라우저 환경에서만 사용할 수 있습니다.
 * - `window.innerWidth`와 `window.innerHeight`를 기준으로 계산합니다.
 *
 * @returns viewport 너비와 높이입니다.
 *
 * @example
 * ```ts
 * const viewport = getViewportSize();
 * ```
 */
````

## Markdown Output Expectations

TypeDoc 생성 결과는 대략 다음 구조가 됩니다.

````md
# shared/ts/format/number

숫자와 관련된 데이터를 적합한 형식의 문자열로 변환하는 유틸리티 모음입니다.

## Functions

### formatCommaNumber()

> **formatCommaNumber**(`value`): `string`

숫자에 3자리 단위로 콤마를 추가합니다.

#### Parameters

##### value

포맷팅할 숫자 또는 숫자 형태의 문자열입니다.

#### Returns

`string`

콤마가 포함된 문자열입니다.

#### Example

```ts
formatCommaNumber(1234567); // "1,234,567"
```
````

생성 결과에서 아래 문제가 보이면 소스 JSDoc을 수정합니다.

- `* @param`이 본문에 그대로 출력됨
- 목록이 `*` 문자로 깨짐
- `@example`이 Example 섹션으로 분리되지 않음
- 코드 블록 언어가 빠짐
- 반환 설명이 비어 있음

## Wording Rules

Prefer concrete behavior.

Good:

```ts
/**
 * 숫자로 변환할 수 없는 값은 원본 값을 문자열로 반환합니다.
 */
```

Avoid:

```ts
/**
 * 모든 값을 완벽하게 처리합니다.
 */
```

Good:

```ts
/**
 * 지연 시간의 단위는 밀리초이며 기본값은 250입니다.
 */
```

Avoid:

```ts
/**
 * 적절한 시간 뒤에 처리합니다.
 */
```

## Documentation Review Checklist

Before finishing a documentation change, check:

- [ ] 공개 API에 JSDoc이 있다.
- [ ] 파일 단위 설명이 필요한 경우 `@packageDocumentation`이 있다.
- [ ] 첫 문장이 API 목적을 설명한다.
- [ ] 모든 파라미터에 `@param` 설명이 있다.
- [ ] 반환값에 `@returns` 설명이 있다.
- [ ] 제네릭 타입에 `@template` 설명이 있다.
- [ ] 기본값과 단위가 문서화되어 있다.
- [ ] 실패 입력 또는 fallback 처리 방식이 문서화되어 있다.
- [ ] 예제 코드가 복사 가능한 최소 단위다.
- [ ] 예제 코드 블록 언어가 `ts` 또는 `tsx`다.
- [ ] `* * @param` 같은 깨진 태그가 없다.
- [ ] `yarn docs` 생성 결과를 확인했다.
