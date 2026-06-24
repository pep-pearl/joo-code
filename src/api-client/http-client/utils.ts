import { ApiError, isApiErrorResponse } from "../api-error";
import { getAccessToken } from "./storage";
import type {
  ApiClientErrorContext,
  AuthMode,
  QueryParams,
  TokenStorage,
} from "./types";

/**
 * 요청 URL 생성
 */
export const createUrl = (
  apiBaseUrl: string,
  path: string,
  params?: QueryParams,
) => {
  const normalizedBase = apiBaseUrl.replace(/\/+$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const origin = globalThis.window?.location?.origin ?? "http://localhost";

  const url = new URL(`${normalizedBase}${normalizedPath}`, origin);

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
 */
export const isSamePath = (pathA: string, pathB: string) => {
  const normalize = (path: string) =>
    path.startsWith("/") ? path : `/${path}`;
  return normalize(pathA) === normalize(pathB);
};

/**
 * JSON 컨텐츠인지 확인
 */
export const isJsonContent = (response: Response) => {
  return response.headers.get("content-type")?.includes("application/json");
};

/**
 * 응답 바디 파싱
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

  if (auth) {
    if (authMode === "localStorage") {
      const accessToken = getAccessToken(accessTokenKey, tokenStorage);
      if (accessToken) {
        result.set("Authorization", `Bearer ${accessToken}`);
      }
    } else if (authMode === "cookie") {
      result.set("X-Auth-Mode", "cookie");
    }
  }

  return result;
};

/**
 * 기본 ApiError 생성기. ApiClientConfig.createError로 교체할 수 있다.
 */
export const createDefaultApiError = ({
  status,
  fallbackMessage,
  parsedBody,
  code,
}: ApiClientErrorContext): ApiError => {
  if (isApiErrorResponse(parsedBody)) {
    return new ApiError({
      status,
      code: parsedBody.error.code,
      message: parsedBody.error.message,
      details:
        "details" in parsedBody.error && Array.isArray(parsedBody.error.details)
          ? parsedBody.error.details
          : [],
      meta: parsedBody.meta,
      body: parsedBody,
    });
  }

  return new ApiError({
    status,
    code: code ?? `HTTP_${status}`,
    message: fallbackMessage,
    body: parsedBody,
  });
};

export const toError = (error: unknown): Error => {
  if (error instanceof Error) {
    return error;
  }

  const normalized = new Error(
    typeof error === "string" ? error : "Unknown error",
  ) as Error & { cause?: unknown };
  normalized.cause = error;
  return normalized;
};

export const createAbortError = (message = "The operation was aborted.") =>
  new DOMException(message, "AbortError");

export const createTimeoutError = (message = "The operation timed out.") =>
  new DOMException(message, "TimeoutError");

/**
 * 한 번의 fetch 시도에 사용할 AbortController를 만든다.
 * 각 시도가 끝나면 cleanup을 반드시 호출해야 한다.
 */
export const createAbortScope = ({
  signal,
  timeout,
  timeoutMessage,
}: {
  signal?: AbortSignal | null;
  timeout?: number;
  timeoutMessage?: string;
}) => {
  const controller = new AbortController();
  let timeoutId: ReturnType<typeof globalThis.setTimeout> | undefined;

  const abortFromOuterSignal = () => {
    controller.abort(signal?.reason ?? createAbortError());
  };

  if (signal?.aborted) {
    abortFromOuterSignal();
  } else {
    signal?.addEventListener("abort", abortFromOuterSignal, { once: true });
  }

  if (timeout !== undefined && Number.isFinite(timeout)) {
    timeoutId = globalThis.setTimeout(() => {
      controller.abort(createTimeoutError(timeoutMessage));
    }, Math.max(0, timeout));
  }

  return {
    signal: controller.signal,
    cleanup: () => {
      if (timeoutId !== undefined) {
        globalThis.clearTimeout(timeoutId);
      }
      signal?.removeEventListener("abort", abortFromOuterSignal);
    },
  };
};

/**
 * 공유 Promise 자체는 취소하지 않고 현재 호출자의 대기만 취소한다.
 */
export const waitForPromise = <T>(
  promise: Promise<T>,
  {
    signal,
    timeout,
    timeoutMessage,
  }: {
    signal?: AbortSignal | null;
    timeout?: number;
    timeoutMessage?: string;
  } = {},
): Promise<T> => {
  if (!signal && timeout === undefined) {
    return promise;
  }

  if (signal?.aborted) {
    return Promise.reject(signal.reason ?? createAbortError());
  }

  return new Promise<T>((resolve, reject) => {
    let settled = false;
    let timeoutId: ReturnType<typeof globalThis.setTimeout> | undefined;

    const cleanup = () => {
      if (timeoutId !== undefined) {
        globalThis.clearTimeout(timeoutId);
      }
      signal?.removeEventListener("abort", onAbort);
    };

    const settle = (callback: () => void) => {
      if (settled) {
        return;
      }
      settled = true;
      cleanup();
      callback();
    };

    const onAbort = () => {
      settle(() => reject(signal?.reason ?? createAbortError()));
    };

    signal?.addEventListener("abort", onAbort, { once: true });

    if (signal?.aborted) {
      onAbort();
      return;
    }

    if (timeout !== undefined && Number.isFinite(timeout)) {
      timeoutId = globalThis.setTimeout(() => {
        settle(() => reject(createTimeoutError(timeoutMessage)));
      }, Math.max(0, timeout));
    }

    promise.then(
      (value) => settle(() => resolve(value)),
      (error: unknown) => settle(() => reject(error)),
    );
  });
};
