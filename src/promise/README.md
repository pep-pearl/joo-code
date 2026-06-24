# promise

UI나 프레임워크에 의존하지 않는 Promise 제어 유틸리티입니다.

| 함수 | 용도 | 파일 | 의존성 |
| --- | --- | --- | --- |
| `createDeferred` | 외부 이벤트가 한 번만 완료할 Promise 생성 | `create-deferred.ts` | 없음 |

```ts
const deferred = createDeferred<boolean>();

button.addEventListener("click", () => deferred.resolve(true));
closeButton.addEventListener("click", () => deferred.resolve(false));

const result = await deferred.promise;
```

`resolve(value)`는 처음 호출될 때 `true`, 이미 완료된 뒤에는 `false`를 반환합니다. `settled`로 완료 여부를 확인할 수 있습니다.

`react/dialog`의 confirm과 alert도 이 유틸리티를 사용해 중복 완료를 방지합니다.
