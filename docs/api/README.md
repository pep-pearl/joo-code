**Joo Code Archive API**

***

# joo-code

실무에서 자주 쓰는 로직과 패턴을 폴더 단위로 복사해 쓰기 위한 개인 코드 아카이브입니다.

이 저장소의 중심은 배포용 패키지가 아니라 **copy-ready kit**입니다. 필요한 문제를 먼저 찾고, 해당 kit 폴더를 다른 프로젝트로 가져가는 흐름을 기준으로 관리합니다.

## Structure

```txt
.
├─ kits/          # 복붙 단위 유닛
├─ docs/          # 아카이브 지도, 이동 내역, 운영 규칙
├─ shared/        # 기존 호환 export 영역
├─ frontend/      # 기존 React 관련 호환 영역
├─ playground/    # 필요한 경우 동작 확인용 샌드박스
└─ rules/         # 에이전트와 문서 작업 규칙
```

## First Kit

| Kit | Use when | Copy path |
| --- | --- | --- |
| [`format/number`](_media/README.md) | 숫자 포맷과 변환 유틸이 필요할 때 | `kits/format/number/` |

## How To Use

1. [`docs/archive-map.md`](_media/archive-map.md)에서 필요한 문제 영역을 찾습니다.
2. 각 kit의 `README.md`에서 복사 범위와 의존성을 확인합니다.
3. 필요한 폴더를 프로젝트로 복사합니다.

기존 경로에서 새 위치를 찾는 경우 [`docs/migration.md`](_media/migration.md)를 확인합니다.

## Unit Rules

kit은 Small, Medium, Large 등급으로 관리합니다.

- Small: 작은 순수 함수, 단일 hook, 단일 타입 유틸
- Medium: 여러 타입과 옵션이 있는 유틸
- Large: 내부 파일과 의존 관계가 있는 복합 로직

자세한 기준은 [`docs/unit-grades.md`](_media/unit-grades.md)를 확인합니다.

## Compatibility

기존 `shared/*`, `frontend/*` 경로는 한 번에 제거하지 않습니다. 새 kit으로 옮긴 뒤 기존 경로는 필요한 동안 re-export로 유지합니다.

## API Docs

TypeDoc 문서는 보조 자료이며 [`docs/api`](_media/README-1.md)에 생성됩니다.

```powershell
yarn.cmd docs
```

환경에서 Yarn 실행이 막히면 로컬 TypeDoc 바이너리를 사용할 수 있습니다.

```powershell
.\node_modules\.bin\typedoc.cmd
```
