# Archive Structure Redesign Design

## 목적

`joo-code`는 배포용 라이브러리보다 개인 실무용 코드 아카이브에 가깝게 운영한다.
주요 목표는 자주 쓰는 로직과 패턴을 기능 단위로 정리해, 다른 프로젝트에서 폴더째 복사해서 바로 사용할 수 있게 만드는 것이다.

현재 구조는 `shared/ts`, `shared/js`, `frontend/react-ts`처럼 기술 또는 패키지 기준이 먼저 드러난다.
앞으로는 사용자가 실제로 찾는 방식에 맞춰 문제와 기능을 먼저 배치하고, 각 기능 안에서 실행 환경을 나눈다.

## 결정 사항

- 1차 목적은 복붙용 실무 아카이브다.
- 학습, 실험, 샘플 프로젝트 수집은 주요 목적이 아니다.
- 분류 기준은 문제/기능 우선, 환경별 구현은 내부 분기다.
- 복붙 단위는 폴더 하나다.
- 유닛 구성은 등급형으로 운영한다.
- 최종적으로는 전면 재설계를 허용하지만, 실행은 작은 단계로 나눈다.
- 내부 로직 동작은 유지한다.
- 더 나은 이름이 있으면 파일명, 폴더명, export 이름은 변경할 수 있다.
- 이름 변경은 `docs/migration.md`에 old -> new 형식으로 추적한다.

## 비목표

- 함수 내부 구현을 개선하거나 동작을 바꾸지 않는다.
- 학습용 예제나 실험 코드를 중심 구조에 섞지 않는다.
- 모든 유닛에 같은 파일 템플릿을 강제하지 않는다.
- TypeDoc 문서만으로 사용법을 해결하려고 하지 않는다.
- 첫 단계에서 모든 파일을 한 번에 이동하지 않는다.

## 추천 구조

```txt
.
├─ kits/
│  ├─ format/
│  │  └─ number/
│  │     ├─ README.md
│  │     ├─ vanilla-ts/
│  │     │  └─ index.ts
│  │     └─ vanilla-js/
│  ├─ api/
│  │  └─ http-client/
│  │     ├─ README.md
│  │     ├─ vanilla-ts/
│  │     └─ react/
│  ├─ browser/
│  │  └─ viewport/
│  │     ├─ README.md
│  │     └─ vanilla-ts/
│  ├─ routing/
│  │  └─ react-router/
│  │     ├─ README.md
│  │     └─ react/
│  └─ react/
│     ├─ hooks/
│     └─ types/
├─ docs/
│  ├─ archive-map.md
│  ├─ unit-grades.md
│  └─ migration.md
├─ playground/
├─ rules/
├─ README.md
├─ AI_INDEX.md
└─ typedoc.json
```

## 구조 원칙

### 기능을 먼저 찾는다

최상위 아카이브 구조는 `kits/<domain>/<unit>/` 형태를 사용한다.
예를 들어 숫자 포맷은 `kits/format/number/`, HTTP 클라이언트는 `kits/api/http-client/`, 브라우저 viewport 유틸은 `kits/browser/viewport/`에 둔다.

### 환경은 유닛 내부에서 나눈다

같은 문제를 여러 환경에서 해결할 수 있으면 유닛 내부에 환경 폴더를 둔다.
초기 환경 이름은 다음을 사용한다.

- `vanilla-ts`: React, Node, 브라우저 프레임워크에 직접 묶이지 않는 TypeScript 구현
- `vanilla-js`: JavaScript 구현
- `react`: React 전용 hook, pattern, type
- `react-router`: React Router 전용 구현이 독립 유닛으로 필요할 때 사용

추후 React Native, Electron, Flutter를 추가할 때도 같은 방식으로 확장한다.

### 폴더 하나가 복붙 단위다

각 유닛 폴더는 다른 프로젝트로 그대로 복사할 수 있어야 한다.
유닛 README에는 최소한 다음 정보를 적는다.

- 무엇을 해결하는지
- 어떤 환경에서 쓰는지
- 복사해야 하는 폴더 또는 파일
- 외부 의존성
- 최소 사용 예시
- 기존 경로에서 옮겨온 경우 old -> new 정보

## 유닛 등급

### Small

작은 순수 함수 또는 단일 hook에 사용한다.

필수 구성:

```txt
README.md
<runtime>/index.ts
```

선택 구성:

```txt
example.ts
```

### Medium

여러 타입, 옵션, 환경 조건이 있는 유틸에 사용한다.

필수 구성:

```txt
README.md
<runtime>/index.ts
<runtime>/types.ts
```

선택 구성:

```txt
examples/
tests/
deps.md
```

### Large

API client처럼 파일이 여러 개이고 의존 관계가 있는 복합 로직에 사용한다.

필수 구성:

```txt
README.md
deps.md
<runtime>/
examples/
```

권장 구성:

```txt
tests/
MIGRATION.md
```

## 문서 구조

`README.md`는 이 저장소가 복붙용 실무 아카이브임을 설명한다.

`AI_INDEX.md`는 현재처럼 다른 앱 구조를 설명하지 않고, 아카이브 탐색 지도 역할만 한다.

`docs/archive-map.md`는 전체 유닛 목록과 사용 상황별 진입점을 관리한다.

`docs/unit-grades.md`는 Small, Medium, Large 기준과 필수 파일 규칙을 관리한다.

`docs/migration.md`는 기존 경로에서 새 경로로 이동한 내역과 이름 변경을 관리한다.

TypeDoc 생성 문서는 보조 자료로 둔다. 복붙 경험의 중심은 각 유닛의 `README.md`다.

## 현재 파일 이동표 초안

| Current | Target | Grade | Notes |
| --- | --- | --- | --- |
| `shared/ts/format/number.ts` | `kits/format/number/vanilla-ts/index.ts` | Small | 첫 실행 대상 |
| `shared/ts/format/index.ts` | `kits/format/number/vanilla-ts/index.ts` 또는 상위 barrel | Small | 실제 이동 시 export 방식 결정 |
| `shared/ts/dom/viewport.ts` | `kits/browser/viewport/vanilla-ts/index.ts` | Small | 브라우저 전용 유틸 |
| `shared/ts/api-client/**` | `kits/api/http-client/vanilla-ts/**` | Large | 내부 파일명은 2단계에서 재검토 |
| `frontend/react-ts/src/pures/hooks/useDebouncedValue.ts` | `kits/react/hooks/use-debounced-value/react/index.ts` | Small | React hook 유닛 |
| `frontend/react-ts/src/patterns/react-router/hooks/useCurrentRoute.ts` | `kits/routing/react-router/current-route/react/index.ts` | Small | React Router 전용 hook |
| `frontend/react-ts/src/types/**` | `kits/react/types/react/**` 또는 `kits/types/react/**` | Medium | 타입 분류 기준 추가 결정 필요 |
| `shared/js/**` | 각 기능 유닛의 `vanilla-js/` | Small or Medium | 파일별 기능 기준으로 이동 |
| `frontend/react-ts/README.md` | 각 React 유닛 README로 흡수 | Small | 빈 README는 제거 후보 |
| `playground/pg-vite-react-ts/README.md` | playground 목적 문서로 재작성 | Small | 실행 대상은 아님 |

## 첫 실행 대상

첫 실행은 `format/number`로 한다.

이유:

- 파일 수가 적다.
- 외부 의존성이 거의 없을 가능성이 높다.
- 새 유닛 README, 이동표, export 규칙을 검증하기 좋다.
- 실패해도 영향 범위가 작다.

첫 실행의 완료 기준:

- `kits/format/number/README.md`를 만든다.
- `shared/ts/format/number.ts`를 `kits/format/number/vanilla-ts/index.ts`로 이동한다.
- 필요한 export 경로를 정리한다.
- `docs/migration.md`에 old -> new를 기록한다.
- `README.md`, `AI_INDEX.md`, `typedoc.json`의 방향을 새 구조에 맞춘다.
- 타입 체크 또는 가능한 최소 검증을 실행한다.

## 검증 전략

구조 변경은 단계별로 검증한다.

1. 이동 전 현재 파일 목록을 확인한다.
2. 한 유닛만 이동한다.
3. import/export 경로를 정리한다.
4. `yarn docs` 또는 TypeScript 검증을 실행한다.
5. 문서에서 새 경로와 이동표가 일치하는지 확인한다.

## 1단계 산출물

이번 1단계는 다음 산출물을 확정하면 완료된다.

- 새 구조 청사진
- 유닛 등급 규칙
- 전체 이동표 초안
- 첫 실행 대상
- 첫 실행 완료 기준

이후 단계는 `format/number`부터 실제 이동을 시작한다.
