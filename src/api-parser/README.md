# api-parser

`Response`에서 API 응답 형식에 맞는 데이터를 꺼내는 작은 parser 모음입니다.

| 함수 | 용도 | 파일 | 의존성 |
| --- | --- | --- | --- |
| `parseDownloadResponse` | 다운로드 응답의 `Blob`과 파일명 추출 | `parse-download-response.ts` | Fetch API |

## 다운로드 응답 파싱

`parseDownloadResponse`는 응답 body를 `Blob`으로 읽고 `Content-Disposition`의 기본 `filename` 값을 함께 반환합니다.

```ts
import { parseDownloadResponse } from "./api-parser";

const response = await fetch("/api/reports/monthly");

if (!response.ok) {
  throw new Error(`다운로드 실패: ${response.status}`);
}

const { blob, filename } = await parseDownloadResponse(response);
const url = URL.createObjectURL(blob);
const anchor = document.createElement("a");

anchor.href = url;
anchor.download = filename;
anchor.click();
URL.revokeObjectURL(url);
```

## 반환값

```ts
interface ParseDownloadResponse {
  blob: Blob;
  filename: string;
}
```

- `blob`: `response.blob()`으로 읽은 다운로드 데이터입니다.
- `filename`: `Content-Disposition`의 quoted 또는 unquoted `filename`입니다.
- 파일명이 없으면 `download`를 반환합니다.

## 주의사항

- 함수 호출 후 response body는 소비된 상태입니다.
- 현재 구현은 기본 `filename` 형식을 대상으로 합니다. RFC 5987의 `filename*`, 문자 인코딩, percent decoding이 필요한 API는 별도 처리가 필요합니다.
- HTTP 오류를 자동으로 검사하지 않으므로 호출 전에 `response.ok`를 확인합니다.
