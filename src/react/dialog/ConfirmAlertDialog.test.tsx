// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { Dialog } from "@headlessui/react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ConfirmAlertDialog from "./ConfirmAlertDialog";

describe("ConfirmAlertDialog", () => {
  it("기본 confirm UI에서 취소와 확인 동작을 제공한다", () => {
    const close = vi.fn();
    const onCancel = vi.fn();
    const onOk = vi.fn();

    render(
      <Dialog open onClose={close}>
        <ConfirmAlertDialog
          props={{
            type: "confirm",
            title: "변경사항 저장",
            description: "입력한 내용을 저장할까요?",
            close,
            onCancel,
            onOk,
          }}
        />
      </Dialog>,
    );

    expect(screen.getByRole("heading", { name: "변경사항 저장" })).toBeVisible();
    expect(screen.getByText("입력한 내용을 저장할까요?")).toBeVisible();

    fireEvent.click(screen.getByRole("button", { name: "취소" }));
    expect(onCancel).toHaveBeenCalledOnce();

    fireEvent.click(screen.getByRole("button", { name: "확인" }));
    expect(onOk).toHaveBeenCalledOnce();
  });

  it("패널 닫기 버튼에 접근 가능한 이름을 제공한다", () => {
    const close = vi.fn();

    render(
      <Dialog open onClose={close}>
        <ConfirmAlertDialog
          props={{
            type: "alert",
            title: "알림",
            close,
          }}
        />
      </Dialog>,
    );

    fireEvent.click(screen.getByRole("button", { name: "닫기" }));
    expect(close).toHaveBeenCalledOnce();
  });
});
