# joo-code

자주 쓰는 TypeScript와 React 코드를 **빠르게 찾고, 직접 실행해 보고, 필요한 파일만 복사하기 위한 개인 코드 모음집**입니다.

패키지 배포나 큰 문서 사이트보다 다음 네 가지를 우선합니다.

1. 함수 이름과 파일 이름이 같아 바로 찾을 수 있다.
2. 실제 구현은 `src` 한 곳에만 존재한다.
3. `index.ts`는 구현하지 않고 공개할 항목만 export한다.
4. playground에서 public API를 실제로 실행해 본다.

## 바로 찾기

| 필요할 때 | 코드 | 복사 단위 | 의존성 |
| --- | --- | --- | --- |
| 숫자에 콤마 표시 | [`formatCommaNumber`](src/format/formatCommaNumber.ts) | 파일 1개 | 없음 |
| 천원 금액을 억원으로 표시 | [`formatThousandToEok`](src/format/formatThousandToEok.ts) | 파일 1개 | 없음 |
| 로마 숫자 변환 | [`romanToNumber`](src/format/romanToNumber.ts) | 파일 1개 | 없음 |
| 모바일 viewport 높이 보정 | [`initViewportHeight`](src/browser/initViewportHeight.ts) | 파일 1개 | 브라우저 DOM |
| React 값 debounce | [`useDebouncedValue`](src/react/useDebouncedValue.ts) | 파일 1개 | React |
| 현재 React Router 경로 조회 | [`useCurrentRoute`](src/react-router/useCurrentRoute.ts) | 폴더 또는 파일 | React Router |
| 인증·refresh 포함 API 요청 | [`api-client`](src/api-client/README.md) | 폴더 전체 | 없음 |
| API 경로와 메서드 트리 관리 | [`api-tree`](src/api-tree/README.md) | 폴더 전체 | 없음 |
| CSS Grid 레이아웃 구성 | [`GridLayout`](src/ui/GridLayout.tsx) | 파일과 공통 타입 | React, Tailwind CSS |
| 재사용 UI 컴포넌트 | [`ui`](src/ui/README.md) | 컴포넌트와 공통 파일 | React, Tailwind CSS |
| UI 컴포넌트 시각 확인 | [Storybook](.storybook/main.ts) | 저장소 내부 사용 | Storybook |
| 브라우저에서 코드 실행 확인 | [`playground`](playground/README.md) | 저장소 내부 사용 | Vite, React |
| 공유용 프로젝트 ZIP 생성 | [`project-zip`](tools/project-zip/README.md) | 스크립트 1개 | Node.js |

## 구조

```txt
joo-code/
├─ src/
│  ├─ format/         # 순수 포맷 함수
│  ├─ browser/        # 브라우저 DOM 유틸
│  ├─ react/          # React만 사용하는 코드
│  ├─ react-router/   # React Router 의존 코드
│  ├─ api-client/     # 여러 파일이 함께 동작하는 복합 모듈
│  ├─ api-tree/       # API 경로와 HTTP 메서드 선언 트리
│  ├─ ui/             # 재사용 UI 컴포넌트와 Storybook 스토리
│  └─ index.ts        # 전체 public API
├─ .storybook/        # UI 컴포넌트 문서와 시각 확인 설정
├─ playground/        # src의 public API를 직접 실행하는 Vite 앱
├─ tools/             # 다른 프로젝트에도 복사 가능한 작업 도구
├─ package.json
└─ README.md
```

각 폴더의 `index.ts`는 public API 역할만 합니다.

```ts
export * from "./formatCommaNumber";
export * from "./romanToNumber";
```

## 처음 실행

```bash
npm install
npm run check
npm run playground
```

`npm run playground`를 실행하면 브라우저에서 숫자 포맷, 로마 숫자, debounce hook, viewport 높이 코드를 직접 확인할 수 있습니다.

## 코드를 사용하는 두 가지 방법

### 1. 다른 프로젝트에 복사

루트 표에서 파일을 찾은 뒤 필요한 파일만 복사합니다.

```ts
// 복사한 프로젝트 내부
import { formatCommaNumber } from "./utils/formatCommaNumber";

formatCommaNumber(1234567);
```

작은 함수는 파일 하나만 복사하고, 내부 파일끼리 의존하는 `api-client` 같은 코드는 폴더 전체를 복사합니다.

### 2. joo-code 내부에서 직접 실행

playground에서는 루트 public API를 그대로 import합니다.

```ts
import {
  formatCommaNumber,
  romanToNumber,
  useDebouncedValue,
} from "../../src";
```

따라서 playground가 정상 빌드되면 개별 구현뿐 아니라 각 폴더의 `index.ts`와 루트 `src/index.ts` export도 함께 확인됩니다.

## 프로젝트 ZIP 만들기

Linux, macOS, Windows에서 같은 npm 명령을 사용합니다.

```bash
npm run zip
```

기본적으로 현재 프로젝트의 한 단계 위에 `joo-code.zip`이 생성됩니다. `node_modules`, 빌드 결과물, Git 데이터, `.env` 파일은 제외됩니다.

출력 경로를 바꾸려면 npm 인자를 전달합니다.

```bash
npm run zip -- --output ./backup/joo-code.zip
```

ZIP 도구 자체도 [`zip-project.mjs`](tools/project-zip/zip-project.mjs) 한 파일만 다른 프로젝트에 복사해 사용할 수 있습니다.

## 자주 쓰는 명령어

| 명령어 | 역할 |
| --- | --- |
| `npm run check` | `src`와 playground TypeScript 검사 |
| `npm run playground` | playground 개발 서버 실행 |
| `npm run playground:build` | playground 프로덕션 빌드 검사 |
| `npm run storybook` | UI 컴포넌트 Storybook 개발 서버 실행 |
| `npm run build-storybook` | 정적 Storybook 빌드 검사 |
| `npm run zip` | 현재 프로젝트 공유용 ZIP 생성 |

## 새 코드 추가 규칙

1. 가장 가까운 주제 폴더를 고른다.
2. 공개 함수 하나당 같은 이름의 파일 하나를 만든다.
3. 같은 폴더의 `index.ts`에 export를 추가한다.
4. 루트의 **바로 찾기** 표에 한 줄 추가한다.
5. 함수 동작은 playground에, UI 컴포넌트 상태는 Storybook에 작은 예제를 추가한다.

여러 파일이 반드시 함께 움직이는 코드만 별도 폴더로 묶습니다. 파일이 두세 개라는 이유만으로 새 패키지나 workspace를 만들지 않습니다.

## 유지 기준

| 관점 | 기준 |
| --- | --- |
| 코드를 찾는 미래의 나 | README 표와 파일명만 보고 빠르게 위치를 찾는다. |
| 복사하는 나 | 복사 단위와 외부 의존성을 바로 알 수 있다. |
| 시험하는 나 | 별도 앱을 만들지 않고 playground에서 실행한다. |
| 수정하는 나 | 같은 구현을 여러 경로에서 중복 관리하지 않는다. |
| 공유하는 나 | `npm run zip` 한 번으로 불필요한 파일을 제외한 압축본을 만든다. |
