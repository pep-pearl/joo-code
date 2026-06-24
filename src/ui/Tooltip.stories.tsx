import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tooltip } from "./Tooltip";

const meta = {
  title: "UI/Tooltip",
  component: Tooltip,
  subcomponents: {
    Trigger: Tooltip.Trigger,
    Content: Tooltip.Content,
  },
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "hover 또는 click으로 열 수 있는 compound Tooltip입니다. Trigger가 상호작용을 담당하고 Content는 document.body portal에 렌더링됩니다.",
      },
    },
  },
  argTypes: {
    type: {
      control: "radio",
      options: ["hover", "click"],
      description: "Tooltip을 여는 사용자 상호작용 방식입니다.",
      table: {
        category: "Behavior",
        type: { summary: '"hover" | "click"' },
        defaultValue: { summary: "hover" },
      },
    },
    keepOpenOnContentHover: {
      control: "boolean",
      description: "hover형 Tooltip에서 Content로 포인터가 이동해도 열린 상태를 유지합니다.",
      table: {
        category: "Behavior",
        defaultValue: { summary: "false" },
      },
    },
    positionAnchor: {
      control: "radio",
      options: ["trigger", "pointer"],
      description: "Content 위치를 Trigger 요소 또는 포인터 좌표를 기준으로 계산합니다.",
      table: {
        category: "Position",
        type: { summary: '"trigger" | "pointer"' },
        defaultValue: { summary: "trigger" },
      },
    },
    children: {
      control: false,
      description: "Tooltip.Trigger와 Tooltip.Content를 배치합니다.",
      table: {
        category: "Content",
        type: { summary: "React.ReactNode" },
      },
    },
    className: {
      control: false,
      description: "Tooltip wrapper에 추가할 className입니다.",
      table: { category: "HTML attributes" },
    },
  },
  args: {
    type: "hover",
    keepOpenOnContentHover: false,
    positionAnchor: "trigger",
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => (
    <div className="p-10">
      <Tooltip {...args}>
        <Tooltip.Trigger>
          <span className="text-sm font-medium text-slate-700 underline cursor-pointer">
            마우스를 올려보세요
          </span>
        </Tooltip.Trigger>
        <Tooltip.Content>
          <p>마우스 호버 시 툴팁 내용이 나옵니다.</p>
        </Tooltip.Content>
      </Tooltip>
    </div>
  ),
};

export const Click: Story = {
  args: {
    type: "click",
  },
  render: (args) => (
    <div className="p-10">
      <Tooltip {...args}>
        <Tooltip.Trigger className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
          클릭해서 열기
        </Tooltip.Trigger>
        <Tooltip.Content>
          <p>트리거를 클릭하면 툴팁이 열리고, 바깥을 클릭하면 닫힙니다.</p>
        </Tooltip.Content>
      </Tooltip>
    </div>
  ),
};

export const PointerAnchor: Story = {
  args: {
    positionAnchor: "pointer",
  },
  render: (args) => (
    <div className="p-10">
      <Tooltip {...args}>
        <Tooltip.Trigger className="rounded-md border border-dashed border-slate-300 px-8 py-6 text-sm text-slate-700">
          이 영역 안에서 마우스를 올려보세요
        </Tooltip.Trigger>
        <Tooltip.Content>
          <p>마우스 포인터 위치를 기준으로 툴팁이 표시됩니다.</p>
        </Tooltip.Content>
      </Tooltip>
    </div>
  ),
};

export const KeepOpenOnContentHover: Story = {
  args: {
    keepOpenOnContentHover: true,
  },
  render: (args) => (
    <div className="p-10">
      <Tooltip {...args}>
        <Tooltip.Trigger>
          <span className="text-sm font-medium text-slate-700 underline cursor-pointer">
            툴팁 내용 위로 이동해보세요
          </span>
        </Tooltip.Trigger>
        <Tooltip.Content className="max-w-56">
          <div className="space-y-1">
            <p>툴팁 콘텐츠에 마우스를 올려도 바로 닫히지 않습니다.</p>
            <button
              type="button"
              className="rounded bg-white/10 px-2 py-1 text-xs text-white hover:bg-white/20"
            >
              액션 버튼
            </button>
          </div>
        </Tooltip.Content>
      </Tooltip>
    </div>
  ),
};
