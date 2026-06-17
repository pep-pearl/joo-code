# playground

`src/index.ts`의 public API를 실제 브라우저에서 import해 확인하는 작은 Vite 앱입니다.
별도 workspace나 별도 `package.json`을 사용하지 않습니다.

```bash
npm install
npm run playground
```

프로덕션 빌드까지 확인하려면 다음을 실행합니다.

```bash
npm run playground:build
```

새 코드를 시험할 때는 `playground/src/App.tsx`에 예제를 추가합니다. 검증이 끝난 구현은 `src`에 두고, playground에는 사용 예제만 남깁니다.
