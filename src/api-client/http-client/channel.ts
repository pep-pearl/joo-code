const AUTH_CHANNEL = "auth-channel";

const TOKEN_UPDATED = "token-updated";
const REFRESH_START = "refresh-start";
const REFRESH_END = "refresh-end";

type AuthChannelMessage = {
  at?: number;
  type: typeof TOKEN_UPDATED | typeof REFRESH_START | typeof REFRESH_END;
};

const hasWindow = () => typeof window !== "undefined";

const isAuthChannelMessage = (value: unknown): value is AuthChannelMessage => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const type = (value as Partial<AuthChannelMessage>).type;
  return type === TOKEN_UPDATED || type === REFRESH_START || type === REFRESH_END;
};

export class AuthChannel {
  private channel: BroadcastChannel | null = null;
  private lastTokenSignalAt = 0;
  private lastRefreshStartAt = 0;

  constructor() {
    if (!hasWindow()) {
      throw new Error("BroadcastChannel is not supported in this environment.");
    }

    this.channel = new BroadcastChannel(AUTH_CHANNEL);
    this.channel.onmessage = (ev) => {
      const msg = ev?.data;

      if (!isAuthChannelMessage(msg)) {
        return;
      }

      if (msg.type === TOKEN_UPDATED) {
        this.lastTokenSignalAt = Math.max(
          this.lastTokenSignalAt,
          msg.at ?? Date.now(),
        );
      }

      if (msg.type === REFRESH_START) {
        this.lastRefreshStartAt = Math.max(
          this.lastRefreshStartAt,
          msg.at ?? Date.now(),
        );
      }

      if (msg.type === REFRESH_END) {
        this.clearRefreshLock();
      }
    };
  }

  getTokenUpdated() {
    return this.lastTokenSignalAt;
  }

  getRefreshStart() {
    return this.lastRefreshStartAt;
  }

  clearRefreshLock() {
    this.lastRefreshStartAt = 0;
  }

  private postMessage(data: Pick<AuthChannelMessage, "type">) {
    this.channel?.postMessage({ at: Date.now(), ...data });
  }

  postTokenUpdated() {
    this.postMessage({ type: TOKEN_UPDATED });
  }

  postRefreshStart() {
    this.postMessage({ type: REFRESH_START });
  }

  postRefreshEnd() {
    this.postMessage({ type: REFRESH_END });
  }

  close() {
    this.channel?.close();
    this.channel = null;
  }
}
