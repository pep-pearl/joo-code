import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useState } from "react";
import { Button } from "../../ui/Button";
import DialogProvider from "./DialogProvider";
import DialogPanel from "./panel";
import {
  useConfirmAlertDialogStore,
  useDialogStore,
} from "./stores";

declare module "./index" {
  interface AppDialogPropMap {
    "storybook-profile": { name: string };
  }
}

function ProfileDialog({ name, close }: { name: string; close: () => void }) {
  return (
    <DialogPanel>
      <DialogPanel.Title>프로필 편집</DialogPanel.Title>
      <DialogPanel.Description>
        {name}님의 기본 정보를 수정하는 일반 다이얼로그 예제입니다.
      </DialogPanel.Description>
      <div className="mt-2 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
        등록된 컴포넌트는 <code>dialogMap</code>의 key로 열립니다.
      </div>
      <div className="mt-6 flex justify-end gap-2">
        <Button intent="ghost" variant="outline" size="sm" onClick={close}>
          취소
        </Button>
        <Button size="sm" onClick={close}>
          저장
        </Button>
      </div>
    </DialogPanel>
  );
}

const dialogMap = { "storybook-profile": ProfileDialog };

type DemoKind = "controls" | "confirm" | "alert" | "custom" | "general";

export function DialogDemo({ kind = "controls" }: { kind?: DemoKind }) {
  const [result, setResult] = useState<string>("아직 실행하지 않음");

  const openConfirm = async () => {
    const confirmed = await useConfirmAlertDialogStore.getState().confirm({
      title: "변경사항을 저장할까요?",
      description: "저장하지 않고 닫으면 입력한 내용이 사라집니다.",
    });
    setResult(`confirm: ${confirmed}`);
  };

  const openAlert = async () => {
    const confirmed = await useConfirmAlertDialogStore.getState().alert({
      title: "저장이 완료되었습니다",
      description: "변경한 내용을 정상적으로 반영했습니다.",
    });
    setResult(`alert: ${confirmed}`);
  };

  const openCustom = () => {
    useConfirmAlertDialogStore.getState().confirm({
      title: "직접 입력해 확인",
      description: "customBody에서 원하는 검증 UI를 구성할 수 있습니다.",
      customBody: (ok, cancel) => (
        <div className="mt-2 space-y-4">
          <input
            aria-label="확인 문구"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            placeholder="DELETE 입력"
          />
          <div className="flex justify-end gap-2">
            <Button intent="ghost" variant="outline" size="sm" onClick={cancel}>
              취소
            </Button>
            <Button intent="danger" size="sm" onClick={ok}>
              삭제
            </Button>
          </div>
        </div>
      ),
    });
  };

  const openGeneral = () => {
    useDialogStore.getState().open("storybook-profile", { name: "홍길동" });
  };

  useEffect(() => {
    return () => {
      useConfirmAlertDialogStore.getState().dismiss();
      useDialogStore.getState().forceClose();
    };
  }, []);

  return (
    <div className="min-h-72 min-w-[min(48rem,90vw)] rounded-2xl bg-slate-100 p-8">
      <div className="flex flex-wrap gap-2">
        {(kind === "controls" || kind === "confirm") && (
          <Button onClick={() => void openConfirm()}>Confirm 열기</Button>
        )}
        {(kind === "controls" || kind === "alert") && (
          <Button intent="success" onClick={() => void openAlert()}>
            Alert 열기
          </Button>
        )}
        {(kind === "controls" || kind === "custom") && (
          <Button intent="danger" variant="outline" onClick={openCustom}>
            Custom body
          </Button>
        )}
        {(kind === "controls" || kind === "general") && (
          <Button intent="ghost" variant="outline" onClick={openGeneral}>
            일반 Dialog
          </Button>
        )}
      </div>
      <p className="mt-5 text-sm text-slate-600">최근 결과: {result}</p>
      <DialogProvider dialogMap={dialogMap} fallback={null} />
    </div>
  );
}

const meta = {
  title: "React/Dialog",
  component: DialogDemo,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Zustand store로 일반 dialog와 confirm/alert를 열고, Headless UI로 focus와 dismiss 동작을 처리합니다.",
      },
    },
  },
  argTypes: {
    kind: {
      control: "select",
      options: ["controls", "confirm", "alert", "custom", "general"],
      description: "스토리가 처음 표시할 dialog 상태입니다.",
      table: { defaultValue: { summary: "controls" } },
    },
  },
} satisfies Meta<typeof DialogDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { args: { kind: "controls" } };
export const Confirm: Story = {
  args: { kind: "confirm" },
  parameters: { docs: { disable: true } },
};
export const Alert: Story = {
  args: { kind: "alert" },
  parameters: { docs: { disable: true } },
};
export const CustomBody: Story = {
  args: { kind: "custom" },
  parameters: { docs: { disable: true } },
};
export const GeneralDialog: Story = {
  args: { kind: "general" },
  parameters: { docs: { disable: true } },
};
