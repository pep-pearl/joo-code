# project-zip

현재 프로젝트를 공유용 ZIP으로 만드는 **Node.js 단일 파일 도구**입니다.
Linux, macOS, Windows에서 같은 명령을 사용하며 별도 ZIP 프로그램이나 PowerShell이 필요하지 않습니다.

## joo-code에서 사용

프로젝트 루트에서 실행합니다.

```bash
pnpm zip
```

기본 결과는 프로젝트 폴더의 한 단계 위에 생성됩니다.

```txt
../joo-code.zip
```

출력 위치를 직접 정할 수도 있습니다.

```bash
pnpm zip -- --output ./backup/joo-code.zip
```

## 다른 프로젝트에 복사해서 사용

`zip-project.mjs` 파일 하나를 원하는 프로젝트에 복사한 뒤, 그 프로젝트 루트에서 실행합니다.

```bash
node ./zip-project.mjs
```

다른 디렉터리를 압축하려면 다음처럼 지정합니다.

```bash
node ./zip-project.mjs --source ../my-project --output ../my-project.zip
```

## 기본 제외 항목

- `.git`, `node_modules`, `.pnpm-store`
- `dist`, `coverage`, `.next`, `.turbo`, `.cache`, `.vite`
- `storybook-static`
- `.superpowers`, `temp`, `api-slot-kit`
- `*.zip`, `*.log`
- `.env`, `.env.*` (`.env.example`은 포함)

스크립트 상단의 `EXCLUDED_DIRECTORIES`와 `isExcluded`를 수정하면 개인 규칙을 추가할 수 있습니다.
