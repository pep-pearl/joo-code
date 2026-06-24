// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { DialogDemo } from "./dialog-overview.stories";
import { useConfirmAlertDialogStore, useDialogStore } from "./stores";

describe("Dialog stories", () => {
  afterEach(() => {
    cleanup();
    useConfirmAlertDialogStore.getState().close();
    useDialogStore.getState().forceClose();
  });

  it("Docs에서 story를 렌더링해도 dialog를 자동으로 열지 않는다", () => {
    render(<DialogDemo kind="custom" />);

    expect(screen.queryByRole("heading", { name: "직접 입력해 확인" })).toBeNull();
    expect(screen.getByRole("button", { name: "Custom body" })).toBeVisible();
  });

  it("사용자가 연 custom body를 닫기 버튼으로 닫는다", async () => {
    render(<DialogDemo kind="custom" />);

    fireEvent.click(screen.getByRole("button", { name: "Custom body" }));
    expect(screen.getByRole("heading", { name: "직접 입력해 확인" })).toBeVisible();

    fireEvent.click(screen.getByRole("button", { name: "닫기" }));

    await waitFor(() => {
      expect(screen.queryByRole("heading", { name: "직접 입력해 확인" })).toBeNull();
    });
  });
});
