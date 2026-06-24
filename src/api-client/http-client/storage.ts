import type {
  AuthTokenPayload,
  ResolvedApiClientConfig,
  TokenStorage,
} from "./types";

export const hasWindow = () => typeof window !== "undefined";

export const getDefaultTokenStorage = (): TokenStorage | undefined => {
  if (!hasWindow()) {
    return undefined;
  }

  return window.localStorage;
};

// token storage ========================================================

/**
 * Access Token Key
 * @default "access_token"
 */
export const DEFAULT_ACCESS_TOKEN_KEY = "access_token";

/**
 * Refresh Token Key
 * @default "refresh_token"
 */
export const DEFAULT_REFRESH_TOKEN_KEY = "refresh_token";

/**
 * Access Token 가져오기
 * @param key Access Token Key
 * @returns Access Token
 */
export const getAccessToken = (
  key: string,
  storage = getDefaultTokenStorage(),
) => {
  if (!storage) {
    return null;
  }

  return storage.getItem(key);
};

export const setAccessToken = (
  key: string,
  token: string,
  storage = getDefaultTokenStorage(),
) => {
  if (!storage) {
    return;
  }

  storage.setItem(key, token);
};

export const getRefreshToken = (
  key: string,
  storage = getDefaultTokenStorage(),
) => {
  if (!storage) {
    return null;
  }

  return storage.getItem(key);
};

export const setRefreshToken = (
  key: string,
  token: string,
  storage = getDefaultTokenStorage(),
) => {
  if (!storage) {
    return;
  }

  storage.setItem(key, token);
};

export const clearStoredTokens = (config: Pick<
  ResolvedApiClientConfig<Error>,
  "accessTokenKey" | "refreshTokenKey" | "tokenStorage"
>) => {
  const storage = config.tokenStorage ?? getDefaultTokenStorage();

  if (!storage) {
    return;
  }

  storage.removeItem(config.accessTokenKey);
  storage.removeItem(config.refreshTokenKey);
};

/**
 * 로그인 성공 시 localStorage mode에서 토큰을 넣고,
 * 로그아웃/세션 만료 시 토큰을 빼기 위한 helper.
 */
export const createAuthTokenStorage = ({
  accessTokenKey = DEFAULT_ACCESS_TOKEN_KEY,
  refreshTokenKey = DEFAULT_REFRESH_TOKEN_KEY,
  storage,
}: {
  accessTokenKey?: string;
  refreshTokenKey?: string;
  storage?: TokenStorage;
} = {}) => {
  const getStorage = () => storage ?? getDefaultTokenStorage();

  return {
    getAccessToken: () => getAccessToken(accessTokenKey, getStorage()),
    getRefreshToken: () => getRefreshToken(refreshTokenKey, getStorage()),

    setTokens: ({
      access_token,
      refresh_token,
    }: Pick<AuthTokenPayload, "access_token" | "refresh_token">) => {
      const currentStorage = getStorage();

      if (access_token) {
        setAccessToken(accessTokenKey, access_token, currentStorage);
      }

      if (refresh_token) {
        setRefreshToken(refreshTokenKey, refresh_token, currentStorage);
      }
    },

    clear: () => {
      const currentStorage = getStorage();

      if (!currentStorage) {
        return;
      }

      currentStorage.removeItem(accessTokenKey);
      currentStorage.removeItem(refreshTokenKey);
    },
  };
};

// refresh lock storage =================================================

/**
 * refresh lock storage default key
 */
const DEFAULT_REFRESH_LOCK_KEY = "refresh_lock";

/**
 * refresh lock storage default ttl
 */
const DEFAULT_REFRESH_LOCK_TTL = 15_000; // 15s

/**
 * refresh lock storage를 생성
 * @param lockKey refresh lock key
 * @param lockTtl refresh lock ttl
 * @returns refresh lock storage
 */
export const createRefreshLockStorage = ({
  lockKey = DEFAULT_REFRESH_LOCK_KEY,
  lockTtl = DEFAULT_REFRESH_LOCK_TTL,
} = {}) => {
  const setRefreshLock = () => {
    if (!hasWindow()) {
      return;
    }
    const payload = { ts: Date.now(), ttl: lockTtl };
    window.localStorage.setItem(lockKey, JSON.stringify(payload));
  };

  const clearRefreshLock = () => {
    if (!hasWindow()) {
      return;
    }
    window.localStorage.removeItem(lockKey);
  };

  const isRefreshLocked = () => {
    if (!hasWindow()) {
      return false;
    }

    try {
      const raw = window.localStorage.getItem(lockKey);
      if (!raw) return false;
      const { ts, ttl } = JSON.parse(raw);
      return Date.now() - ts < ttl;
    } catch {
      return false;
    }
  };

  return {
    setRefreshLock,
    clearRefreshLock,
    isRefreshLocked,
  };
};

// ======================================================================
