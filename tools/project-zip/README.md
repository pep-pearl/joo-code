# project-zip

현재 프로젝트를 공유용 ZIP으로 만드는 도구입니다.

기본은 **Node.js 단일 파일 스크립트**를 사용합니다. Linux, macOS, Windows에서 같은 명령을 사용할 수 있으며, 별도 ZIP 프로그램이나 PowerShell이 필요하지 않습니다.

Windows 환경에서 PowerShell 방식이 필요할 경우를 위해 `zip:windows` 스크립트도 함께 사용할 수 있습니다.

## package.json 스크립트 추가

프로젝트의 `package.json`에 다음 스크립트를 추가합니다.

```json
{
  "scripts": {
    "zip": "node ./tools/project-zip/zip-project.mjs",
    "zip:windows": "powershell -NoProfile -ExecutionPolicy Bypass -File ./tools/project-zip/zip-project.ps1"
  }
}
```

## joo-code에서 사용

프로젝트 루트에서 실행합니다.

```bash
pnpm zip
```

기본 결과는 프로젝트 폴더의 한 단계 위에 생성됩니다.

```txt
../joo-code.zip
```

출력 파일명은 현재 프로젝트 폴더명을 기준으로 자동 생성됩니다.

예를 들어 프로젝트 폴더명이 `joo-code`라면 다음 파일이 만들어집니다.

```txt
joo-code.zip
```

출력 위치를 직접 정할 수도 있습니다.

```bash
pnpm zip -- --output ./backup/joo-code.zip
```

## Windows PowerShell 스크립트로 실행

PowerShell 버전을 사용하려면 다음 명령을 실행합니다.

```bash
pnpm zip:windows
```

PowerShell 스크립트도 기본적으로 현재 프로젝트 폴더명을 사용해 ZIP 파일을 만듭니다.

예를 들어 현재 프로젝트 폴더명이 `joo-code`라면 기본 결과는 다음 위치에 생성됩니다.

```txt
../joo-code.zip
```

## 다른 프로젝트에 복사해서 사용

다른 프로젝트에서도 사용할 수 있도록 다음 파일들을 원하는 프로젝트에 복사합니다.

```txt
tools/project-zip/zip-project.mjs
tools/project-zip/zip-project.ps1
```

그 다음 `package.json`에 스크립트를 추가합니다.

```json
{
  "scripts": {
    "zip": "node ./tools/project-zip/zip-project.mjs",
    "zip:windows": "powershell -NoProfile -ExecutionPolicy Bypass -File ./tools/project-zip/zip-project.ps1"
  }
}
```

이후 프로젝트 루트에서 실행합니다.

```bash
pnpm zip
```

Node.js 스크립트를 직접 실행할 수도 있습니다.

```bash
node ./tools/project-zip/zip-project.mjs
```

다른 디렉터리를 압축하려면 다음처럼 지정합니다.

```bash
node ./tools/project-zip/zip-project.mjs --source ../my-project --output ../my-project.zip
```

## 기본 제외 항목

ZIP 생성 시 다음 항목은 기본적으로 제외됩니다.

- `.git`, `node_modules`, `.pnpm-store`
- `dist`, `coverage`, `.next`, `.turbo`, `.cache`, `.vite`
- `storybook-static`
- `.superpowers`, `temp`, `api-slot-kit`
- `*.zip`, `*.log`
- `.env`, `.env.*` (`.env.example`은 포함)

Node.js 스크립트는 상단의 `EXCLUDED_DIRECTORIES`와 `isExcluded`를 수정하면 개인 규칙을 추가할 수 있습니다.

PowerShell 스크립트는 상단의 `$excludedDirectories`와 `Test-IsExcluded`를 수정하면 개인 규칙을 추가할 수 있습니다.
