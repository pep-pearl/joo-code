# Docs Writing Guide

`joo-code`의 문서는 두 종류로 관리합니다.

- 수동 문서: `README.md`, `AI_INDEX.md`, `docs/archive-map.md`, `docs/migration.md`, `docs/unit-grades.md`, `rules/*.md`
- 생성 문서: `docs/api/**`

생성 문서는 TypeDoc과 `typedoc-plugin-markdown`으로 만듭니다. 생성 결과를 직접 고치기보다 source JSDoc과 kit README를 먼저 수정합니다.

## Documentation Source Of Truth

API 설명의 기준은 source JSDoc입니다.

```txt
source JSDoc -> typedoc -> docs/api/**
```

복붙 사용법의 기준은 각 kit의 `README.md`입니다.

```txt
kits/<domain>/<unit>/README.md
```

## TypeDoc Context

현재 TypeDoc 설정은 다음 흐름을 사용합니다.

```json
{
  "entryPointStrategy": "expand",
  "entryPoints": ["shared/js", "shared/ts", "frontend/react-ts", "kits"],
  "out": "docs/api",
  "plugin": ["typedoc-plugin-markdown"],
  "outputFileStrategy": "modules",
  "entryFileName": "README.md"
}
```

문서 생성 명령:

```powershell
yarn.cmd docs
```

Yarn 실행이 현재 환경에서 설치 상태 문제로 실패하면 다음 명령을 사용합니다.

```powershell
.\node_modules\.bin\typedoc.cmd
```

## Writing Flow

1. 공개 API인지 확인합니다.
2. API 동작, fallback, 기본값, 지원하지 않는 입력을 source JSDoc에 적습니다.
3. 복붙 단위 설명은 kit README에 적습니다.
4. 기존 경로가 바뀌면 `docs/migration.md`에 old -> new를 기록합니다.
5. 새 kit이 생기면 `docs/archive-map.md`에 추가합니다.
6. TypeDoc을 실행해 `docs/api/**`를 갱신합니다.

## JSDoc Rules

첫 문장은 API가 하는 일을 구체적으로 설명합니다.

좋음:

```ts
/**
 * 숫자 또는 숫자 형태의 문자열을 한국어 숫자 형식으로 변환합니다.
 */
```

피함:

```ts
/**
 * 값을 처리합니다.
 */
```

목록은 `-`를 사용합니다.

```ts
/**
 * 숫자를 표시용 문자열로 변환합니다.
 *
 * - 숫자로 변환할 수 없는 값은 원본 값을 문자열로 반환합니다.
 * - `ko-KR` locale을 기준으로 콤마를 추가합니다.
 */
```

JSDoc tag 앞에는 목록 기호를 붙이지 않습니다.

```ts
/**
 * 값을 변환합니다.
 *
 * @param value - 변환할 값입니다.
 * @returns 변환된 문자열입니다.
 */
```

예제는 복사 가능한 최소 코드로 작성합니다.

````ts
/**
 * 숫자에 3자리 단위 콤마를 추가합니다.
 *
 * @example
 * ```ts
 * formatCommaNumber(1234567); // "1,234,567"
 * ```
 */
````

## Kit README Rules

각 kit README에는 다음 내용을 적습니다.

- 무엇을 해결하는지
- 어떤 runtime 폴더를 제공하는지
- 복사해야 하는 폴더 또는 파일
- export 목록
- 외부 의존성
- 기존 경로에서 옮긴 경우 migration 정보

작은 kit도 README는 유지합니다. 이 저장소의 1차 사용 경험은 패키지 설치가 아니라 복붙이기 때문입니다.

## Generated Docs Rules

`docs/api/**`는 생성 결과입니다.

- 직접 수정하지 않습니다.
- 깨진 설명이 보이면 source JSDoc을 수정합니다.
- 생성 결과에 새 kit이 빠지면 `typedoc.json`의 `entryPoints`를 확인합니다.
- 수동 문서는 `docs/api/` 아래에 두지 않습니다.

## Review Checklist

문서 또는 공개 API 변경 후 확인합니다.

- [ ] source JSDoc이 실제 동작과 일치합니다.
- [ ] kit README가 복사 범위와 의존성을 설명합니다.
- [ ] `docs/archive-map.md`에 새 kit이 반영됐습니다.
- [ ] `docs/migration.md`에 이동 내역이 반영됐습니다.
- [ ] `typedoc.json`이 새 source 경로를 포함합니다.
- [ ] `docs/api/**`가 TypeDoc으로 갱신됐습니다.
- [ ] root `README.md`와 `AI_INDEX.md` 링크가 현재 구조와 일치합니다.
