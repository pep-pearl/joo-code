import { describe, expect, it, vi } from "vitest";
import { createDeferred } from "./create-deferred";

describe("createDeferred", () => {
  it("외부에서 전달한 값으로 Promise를 한 번만 완료한다", async () => {
    const deferred = createDeferred<string>();
    const resolved = vi.fn();
    void deferred.promise.then(resolved);

    expect(deferred.settled).toBe(false);
    expect(deferred.resolve("first")).toBe(true);
    expect(deferred.resolve("second")).toBe(false);
    expect(deferred.settled).toBe(true);

    await expect(deferred.promise).resolves.toBe("first");
    expect(resolved).toHaveBeenCalledOnce();
  });
});
