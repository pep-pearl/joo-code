# ui

React 화면에서 재사용하는 UI 컴포넌트와 공통 타입·스타일 유틸입니다. Tailwind CSS 클래스와 CSS 변수를 함께 사용합니다.

이 폴더는 컴포넌트, `types.ts`, `utils.ts`, `global.css`가 함께 동작하므로 **필요한 컴포넌트와 공통 파일을 같이 복사**합니다.

| 항목 | 용도 | 파일 | 의존성 |
| --- | --- | --- | --- |
| `Button` | 사용자 액션 실행 | `Button.tsx` | React, Headless UI, CVA |
| `Badge` | 상태·분류·짧은 정보 표시 | `Badge.tsx` | React, CVA |
| `PolymorphicProps` | `as` prop을 지원하는 컴포넌트 타입 | `types.ts` | React |
| `cn` | 조건부 class와 Tailwind class 병합 | `utils.ts` | clsx, tailwind-merge |
| 공통 스타일 | Tailwind CSS 불러오기 | `global.css` | Tailwind CSS |

## 기본 사용

앱의 전역 진입점에서 스타일을 한 번 불러옵니다.

```ts
import "./ui/global.css";
```

컴포넌트 파일에서 필요한 항목을 가져옵니다.

```tsx
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";

export function Actions() {
  return (
    <div className="flex items-center gap-2">
      <Badge intent="success">저장됨</Badge>
      <Button intent="primary" onClick={() => console.log("clicked")}>
        확인
      </Button>
    </div>
  );
}
```

## 옵션

| prop | `Button` | `Badge` | 기본값 |
| --- | --- | --- | --- |
| `intent` | `primary`, `success`, `danger`, `warning`, `ghost` | `info`, `warning`, `error`, `success`, `primary`, `ghost` | `primary` |
| `variant` | `outline`, `plain`, `solid` | `outline`, `plain`, `solid` | `solid` |
| `size` | `xs`, `sm`, `md`, `lg`, `xl` | `xs`, `sm`, `md`, `lg`, `xl` | `md` |
| `radius` | `xs`, `sm`, `md`, `lg`, `xl`, `full` | `xs`, `sm`, `md`, `lg`, `xl`, `full` | `md` |
| `fullWidth` | 전체 너비 사용 | 전체 너비 사용 | `false` |

`Badge`는 `as` prop으로 렌더링할 요소를 바꿀 수 있습니다.

```tsx
<Badge as="span">텍스트 배지</Badge>
<Badge as="a" href="/notices">공지 보기</Badge>
```

색상이나 크기를 일부 바꿀 때는 컴포넌트가 사용하는 CSS 변수를 `style`로 덮어씁니다.

```tsx
<Button
  style={{
    "--button-bg": "#111827",
    "--button-bg-hover": "#374151",
    "--button-fg": "#f9fafb",
  }}
>
  사용자 정의 버튼
</Button>
```

## Storybook에서 확인

```bash
npm run storybook
```

브라우저에서 `http://localhost:6006`을 열면 각 컴포넌트의 intent, variant, size, radius, 전체 너비와 사용자 정의 스타일을 확인할 수 있습니다. 스토리 파일의 `autodocs` 설정으로 props 문서도 함께 생성됩니다.

정적 Storybook 빌드를 확인하려면 다음 명령을 실행합니다.

```bash
npm run build-storybook
```

빌드 결과는 `storybook-static`에 생성됩니다.
