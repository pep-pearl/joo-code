import {
  ApiError,
  isApiErrorResponse,
} from "../api-error";
import { getAccessToken } from "./storage";
import type { AuthMode, QueryParams, TokenStorage } from "./types";

/**
 * 요청 URL 생성
 * @param apiBaseUrl API 기본 URL
 * @param path API 경로
 * @param params 쿼리 파라미터
 * @returns 요청 URL
 */
export const createUrl = (apiBaseUrl: string, path: string, params?: QueryParams) => {
  const baseUrl = apiBaseUrl.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  const url = new URL(`${baseUrl}${normalizedPath}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach((item) => {
            url.searchParams.append(key, String(item));
          });
          return;
        }

        url.searchParams.set(key, String(value));
      }
    });
  }

  return url.toString();
};

/**
 * 두 패스가 동일한지 확인
 * @param pathA 패스 A
 * @param pathB 패스 B
 * @returns 동일한 패스인지 여부
 */
export const isSamePath = (pathA: string, pathB: string) => {
  const normalize = (path: string) =>
    path.startsWith("/") ? path : `/${path}`;
  return normalize(pathA) === normalize(pathB);
};

/**
 * JSON 컨텐츠인지 확인
 * @param response Response
 * @returns boolean
 */
export const isJsonContent = (response: Response) => {
  return response.headers.get("content-type")?.includes("application/json");
};

/**
 * 응답 바디 파싱
 * @param response Response
 * @returns Promise<unknown>
 */
export const parseResponseBody = async (response: Response) => {
  if (response.status === 204) {
    return null;
  }

  if (isJsonContent(response)) {
    return response.json();
  }

  const text = await response.text();
  return text || null;
};

/**
 * 요청 바디 생성
 * @param body API 요청 바디
 * @returns string | FormData | undefined
 */
export const createRequestBody = <TBody>(body: TBody | undefined) => {
  if (body === undefined || body === null) {
    return undefined;
  }

  if (body instanceof FormData) {
    return body;
  }

  return JSON.stringify(body);
};

/**
 * 헤더 생성
 * @param options API 요청 바디, 헤더, 인증 여부, 인증 방식, access token key, token storage
 * @returns Headers
 */
export const createHeaders = <TBody>({
  accessTokenKey,
  authMode,
  auth,
  body,
  headers,
  tokenStorage,
}: {
  body?: TBody;
  headers?: HeadersInit;
  auth: boolean;
  authMode: AuthMode;
  accessTokenKey: string;
  tokenStorage?: TokenStorage;
}) => {
  const result = new Headers(headers);

  if (!(body instanceof FormData)) {
    result.set("Content-Type", "application/json");
  }

  result.set("Accept", "application/json");

  if (auth && authMode === "localStorage") {
    const accessToken = getAccessToken(accessTokenKey, tokenStorage);

    if (accessToken) {
      result.set("Authorization", `Bearer ${accessToken}`);
    }
  }

  return result;
};

/**
 * API 에러 생성
 * @param options HTTP 상태 코드, 폴백 메시지, 파싱된 응답 바디
 * @returns ApiError 인스턴스
 */
export const createApiError = ({
  status,
  fallbackMessage,
  parsedBody,
}: {
  status: number;
  fallbackMessage: string;
  parsedBody: unknown;
}) => {
  if (isApiErrorResponse(parsedBody)) {
    return new ApiError({
      status,
      code: parsedBody.error.code,
      message: parsedBody.error.message,
      details: parsedBody.error.details ?? [],
      meta: parsedBody.meta,
      body: parsedBody,
    });
  }

  return new ApiError({
    status,
    code: `HTTP_${status}`,
    message: fallbackMessage,
    body: parsedBody,
  });
};
