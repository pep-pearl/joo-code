# AI Index

## Purpose

This file is a navigation map for AI agents.

Use this file to decide which files to read before opening large parts of the repository.

This file is not a full architecture document.
This file is not a task prompt.
This file should stay short, factual, and useful for choosing the minimum relevant files.

## Project Summary

이 프로젝트는 Meerkat 웹 플랫폼 (도로 상태 및 포트홀 탐지, 관리 시스템)을 위한 프론트엔드 코드베이스입니다.
React Router 기반의 라우팅과 OpenLayers 기반의 GIS 맵 렌더링 기능을 포함합니다.
차량에 장착된 AI 모델 단말기를 통해 수집된 도로 파손(포트홀 등) 상태를 조회하고 분석하며, 장비 및 사용자를 관리하는 기능을 제공합니다.
코드베이스는 Feature-Sliced Design(FSD) 원칙을 반영한 아키텍처(`app`, `pages`, `features`, `entities`, `shared`, `widgets`)를 사용합니다.

## How To Use This Index

1. If exact files are provided, start from those files.
2. If the task is page-related, map route to page through `src/app/router/appRoutes.tsx`.
3. Read the matching page directory under `src/pages/<page>/`.
4. Follow imports downward from page to feature to entity to shared.
5. Do not scan all of `src/` by default.
6. Check file-level `@ai-*` comments before opening full files when available.

## Main Entry Points

| Path                                  | Purpose                                  | When to read                                                    |
| ------------------------------------- | ---------------------------------------- | --------------------------------------------------------------- |
| `src/main.tsx`                        | 애플리케이션 최상위 진입점               | 초기 구동 로직, 전역 프로바이더 수정 시                         |
| `src/app/router/appRoutes.tsx`        | 전체 라우트 트리 및 페이지 컴포넌트 매핑 | 라우트 추가/수정, 특정 URL에 해당하는 페이지 컴포넌트를 찾을 때 |
| `src/app/router/AppRouteProvider.tsx` | React Router 인스턴스 제공               | 라우터 설정(Provider) 변경 시                                   |
| `src/shared/store/appStore.ts`        | 글로벌 상태 (Zustand)                    | 사이드바, 선택된 고객사, 토스트 상태 수정/참조 시               |

## Directory Map

| Directory      | Purpose                                                | Key files                                |
| -------------- | ------------------------------------------------------ | ---------------------------------------- |
| `src/app`      | 애플리케이션 초기화, 전역 설정, 라우팅 정의            | `router/appRoutes.tsx`                   |
| `src/pages`    | URL 라우트에 매핑되는 화면 단위 컴포넌트 모음          | 각 도메인별 폴더 (예: `potholes/status`) |
| `src/features` | 특정 비즈니스 로직을 수행하는 기능 모듈                | (현재 비어있거나 구성 중)                |
| `src/entities` | 도메인 핵심 비즈니스 모델, 순수 로직                   | `map/index.ts` 등                        |
| `src/widgets`  | 여러 feature나 entity를 조합한 독립적 UI 덩어리        | (구성 중)                                |
| `src/shared`   | 전역적으로 재사용되는 UI 컴포넌트, 유틸, 훅, 스토어 등 | `store/appStore.ts`, `ol-map/`, `ui/`    |

## FSD Layer Guide

| Layer      | Role                                 | Reading rule                                                      |
| ---------- | ------------------------------------ | ----------------------------------------------------------------- |
| `app`      | 앱의 껍데기 및 전역 컨텍스트         | 라우팅 및 프로바이더 수정 외엔 잘 읽지 않음                       |
| `pages`    | 라우트 진입점                        | UI 흐름 추적의 시작점. 내부 구현보다 import를 훑기 위해 먼저 읽음 |
| `widgets`  | 재사용 가능한 큰 단위의 화면 조각    | page가 import하는 widget만 확인                                   |
| `features` | 구체적인 유저 액션, 폼, 인터랙션     | page/widget에 엮인 feature만 확인                                 |
| `entities` | 도메인 데이터 구조 및 순수 조작 로직 | 도메인 모델, 공통 처리가 필요할 때 확인                           |
| `shared`   | 범용 컴포넌트 및 유틸                | 직접 import된 파일만 확인                                         |

## Domain Map

| Domain            | Related files                                                | Notes                                  |
| ----------------- | ------------------------------------------------------------ | -------------------------------------- |
| **Routing**       | `src/app/router/*`                                           | URL 경로 구조와 페이지 매핑            |
| **Map/GIS**       | `src/entities/map/*`, `src/shared/ol-map/*`                  | OpenLayers 기반 렌더링, 레이어, 스타일 |
| **Potholes/Road** | `src/pages/potholes/*`, `src/pages/road-condition-surveys/*` | 포트홀 탐지 상태 및 도로 상태 현황 UI  |
| **Equipment/AI**  | `src/pages/equipment/*`                                      | 장비, 단말, AI 모델 배포 관리          |
| **Auth/System**   | `src/pages/login/`, `src/pages/system/*`                     | 로그인, 고객사/사용자 관리, 정책 설정  |
| **State**         | `src/shared/store/appStore.ts`                               | 전역 앱 상태                           |

## Important Flows

### Flow: Route to Page Resolution

1. `src/main.tsx` 구동
2. `src/app/router/AppRouteProvider.tsx`에서 라우터 주입
3. `src/app/router/appRoutes.tsx`에서 URL에 맞는 페이지(예: `<PotholeStatusPage />`) 렌더링
4. 수정 시 주의점: 새로운 페이지를 추가할 경우, `appRoutes.tsx`의 올바른 Guard/Layout 계층에 추가해야 함.

### Flow: GIS / Map Base Rendering

1. `src/entities/map/createMap.ts`에서 기본 Map 인스턴스 생성
2. `src/entities/map/createBaseLayer.ts`에서 타일 배경 레이어 추가
3. `src/entities/map/createVectorLayer.ts`에서 도메인 피처(포트홀, 단말기 등) 마커 렌더링
4. 뷰포트나 레이어 타입 확장이 필요한 경우 `src/entities/map/types.ts`를 함께 참조

## State Management

- **Global Store**: `src/shared/store/appStore.ts` (Zustand 기반)
  - 사이드바 접힘 상태(`sidebarCollapsed`), 전역 선택된 고객사(`selectedCustomerId`), 토스트 알림(`toasts`) 관리.

## API / Data Fetching

- API 클라이언트 공통 로직은 `shared/ts/api-client`에 있다.
- 공개 진입점은 `shared/ts/api-client/index.ts`이며, `shared/ts/index.ts`에서 함께 re-export한다.
- HTTP 요청 factory는 `shared/ts/api-client/http-client/client.ts`의 `createApiClient`에서 시작한다.
- 요청 실행, timeout, 인증 헤더, 401 refresh retry 흐름은 `shared/ts/api-client/http-client/request.ts`와 `shared/ts/api-client/http-client/refresh.ts`를 함께 확인한다.
- API 에러 envelope와 UI helper는 `shared/ts/api-client/api-error/error.ts`, 공통 응답 타입은 `shared/ts/api-client/types.ts`를 확인한다.

## UI Structure

- 전역 레이아웃 구조는 `src/app/router/appRoutes.tsx` 내부에서 `<RootLayout>`, `<AuthLayout>`, `<ProtectedAppGuard>` 등으로 감싸짐.
- 상세 페이지, 등록 모달, Drawer UI는 보통 `src/pages/<domain>/<action>-drawer` 또는 `<action>-modal` 형태로 페이지(route) 분리됨.

## Known Page Reading Hints

| Task                         | Start here                     | Then read                               |
| ---------------------------- | ------------------------------ | --------------------------------------- |
| 페이지 경로 확인 및 수정     | `src/app/router/appRoutes.tsx` | 관련 `src/pages/*` 디렉터리             |
| 전역 상태(토스트, 메뉴) 변경 | `src/shared/store/appStore.ts` | 이를 사용하는 UI 컴포넌트               |
| 지도 렌더링 엔진 변경        | `src/entities/map/index.ts`    | 관련된 `createMap`, `createVectorLayer` |

## Naming / Architecture Conventions

- 폴더와 파일명은 kebab-case, 컴포넌트는 PascalCase 적용.
- 페이지 진입점 폴더명은 도메인 복수형(예: `potholes`), 상세는 내부 폴더나 파일로 분리.
- 타입 정의는 `types.ts`로 분리하여 한곳에 모으는 패턴 지향 (예: `map/types.ts`).

## File-Level AI Header Convention

TypeScript 파일 상단에 AI 내비게이션 주석이 작성되어 있습니다.
예시:

```ts
/**
 * @ai-purpose 앱 전체 라우트 구조와 화면(Page) 컴포넌트 매핑을 정의한다.
 * @ai-entry true
 * @ai-domain routing, page
 */
```

파일을 전체 읽기 전에 이 주석을 확인하여 목적에 부합하는 파일인지 먼저 판별하세요.

## External Rules

| Rule file                            | When to use                                           |
| ------------------------------------ | ----------------------------------------------------- |
| `rules/context-navigation.md`        | 최소한의 파일만 읽고 AI_INDEX.md를 활용해 탐색할 때   |
| `rules/ai-navigation-maintenance.md` | 코드 수정 후 AI_INDEX.md나 @ai- 주석 갱신이 필요할 때 |

## External Prompts

`docs/prompts/` 아래 파일은 task prompt이며, 사용자가 명시적으로 참조할 때만 읽는다.

## For Future AI Agents

- 프로젝트 구조 파악 시 전체 디렉터리를 스캔하지 말고, `AI_INDEX.md`와 `src/app/router/appRoutes.tsx`를 통해 진입점을 찾으세요.
- FSD 구조(Feature-Sliced Design)를 따르므로 의존성은 `pages -> widgets -> features -> entities -> shared` 방향을 존중하세요.
- 도메인 로직이나 타입을 탐색할 때는 `entities` 내의 도메인 폴더를 먼저 확인하세요.

## Maintenance Notes

- 새로운 레이아웃 Guard, 페이지 폴더 단위가 추가되거나, 새로운 전역 상태(store) 및 API Client 설정이 추가되면 이 파일을 갱신해야 합니다.
