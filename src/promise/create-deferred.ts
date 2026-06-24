export interface Deferred<T> {
  readonly promise: Promise<T>;
  readonly settled: boolean;
  resolve(value: T): boolean;
}

/**
 * 외부 이벤트가 값을 결정하는 one-shot Promise를 만듭니다.
 * 첫 resolve만 반영되며 이후 호출은 false를 반환합니다.
 */
export function createDeferred<T>(): Deferred<T> {
  let settled = false;
  let resolvePromise!: (value: T) => void;

  const promise = new Promise<T>((resolve) => {
    resolvePromise = resolve;
  });

  return {
    promise,
    get settled() {
      return settled;
    },
    resolve(value) {
      if (settled) return false;

      settled = true;
      resolvePromise(value);
      return true;
    },
  };
}
