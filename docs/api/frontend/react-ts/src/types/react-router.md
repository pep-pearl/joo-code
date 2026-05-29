[**Joo Code Archive API**](../../../../README.md)

***

[Joo Code Archive API](../../../../modules.md) / frontend/react-ts/src/types/react-router

# frontend/react-ts/src/types/react-router

react-router 라이브러리 확장 정의(declare)합니다.

## Routing

### RouteMeta

Defined in: frontend/react-ts/src/types/react-router.d.ts:11

라우트별 커스텀 메타데이터 인터페이스

#### Properties

##### hidden?

> `optional` **hidden**: `boolean`

Defined in: frontend/react-ts/src/types/react-router.d.ts:17

메뉴 목록에서 숨김 처리 여부 (true일 경우 렌더링 제외)

##### menuId?

> `optional` **menuId**: `string`

Defined in: frontend/react-ts/src/types/react-router.d.ts:19

권한 제어나 메뉴 매핑에 사용되는 고유 ID

##### menuTitle?

> `optional` **menuTitle**: `string`

Defined in: frontend/react-ts/src/types/react-router.d.ts:15

네비게이션 메뉴나 Breadcrumb에 표시될 이름

##### title?

> `optional` **title**: `string`

Defined in: frontend/react-ts/src/types/react-router.d.ts:13

브라우저 탭에 표시될 페이지 타이틀
