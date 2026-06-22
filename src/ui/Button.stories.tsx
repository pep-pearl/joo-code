import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Button,
  type ButtonIntent,
  type ButtonRadius,
  type ButtonSize,
  type ButtonVariant,
} from "./Button";

const intents: ButtonIntent[] = [
  "primary",
  "success",
  "danger",
  "warning",
  "ghost",
];

const variants: ButtonVariant[] = ["outline", "plain", "solid"];

const sizes: ButtonSize[] = ["xs", "sm", "md", "lg", "xl"];

const radii: ButtonRadius[] = ["xs", "sm", "md", "lg", "xl", "full"];

const intentLabels = {
  primary: "기본",
  success: "성공",
  danger: "위험",
  warning: "경고",
  ghost: "고스트",
} satisfies Record<ButtonIntent, string>;

const meta = {
  title: "Buttons/Button",
  component: Button,
  tags: ["autodocs"],

  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "사용자 액션을 실행하는 Button 컴포넌트입니다. intent, variant, size, radius와 전체 너비 설정을 지원합니다.",
      },
    },
  },

  args: {
    children: "Button",
    intent: "primary",
    variant: "solid",
    size: "md",
    radius: "md",
    fullWidth: false,
    disabled: false,
  },

  argTypes: {
    children: {
      control: "text",
      description: "Button 내부에 표시할 콘텐츠입니다.",
      table: {
        category: "Content",
        type: {
          summary: "React.ReactNode",
        },
      },
    },

    intent: {
      control: {
        type: "select",
      },
      options: intents,
      description: "Button의 의미와 색상 체계를 지정합니다.",
      table: {
        category: "Appearance",
        type: {
          summary: "ButtonIntent",
        },
        defaultValue: {
          summary: "primary",
        },
      },
    },

    variant: {
      control: {
        type: "inline-radio",
      },
      options: variants,
      description: "Button의 표현 방식을 지정합니다.",
      table: {
        category: "Appearance",
        type: {
          summary: "ButtonVariant",
        },
        defaultValue: {
          summary: "solid",
        },
      },
    },

    size: {
      control: {
        type: "select",
      },
      options: sizes,
      description: "Button의 높이, 여백 및 글자 크기를 지정합니다.",
      table: {
        category: "Appearance",
        type: {
          summary: "ButtonSize",
        },
        defaultValue: {
          summary: "md",
        },
      },
    },

    radius: {
      control: {
        type: "select",
      },
      options: radii,
      description: "Button의 모서리 둥글기를 지정합니다.",
      table: {
        category: "Appearance",
        type: {
          summary: "ButtonRadius",
        },
        defaultValue: {
          summary: "md",
        },
      },
    },

    fullWidth: {
      control: "boolean",
      description: "부모 요소의 전체 너비를 차지할지 지정합니다.",
      table: {
        category: "Layout",
        defaultValue: {
          summary: "false",
        },
      },
    },

    disabled: {
      control: "boolean",
      description: "Button을 비활성화합니다.",
      table: {
        category: "State",
        defaultValue: {
          summary: "false",
        },
      },
    },

    className: {
      control: false,
      table: {
        category: "HTML attributes",
      },
    },

    style: {
      control: false,
      table: {
        category: "HTML attributes",
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Intents: Story = {
  args: {
    variant: "solid",
  },

  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {intents.map((intent) => (
        <Button {...args} key={intent} intent={intent} fullWidth={false}>
          {intentLabels[intent]}
        </Button>
      ))}
    </div>
  ),

  parameters: {
    controls: {
      exclude: ["intent", "children", "fullWidth"],
    },
  },
};

export const Variants: Story = {
  args: {
    intent: "primary",
  },

  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {variants.map((variant) => (
        <Button {...args} key={variant} variant={variant} fullWidth={false}>
          {variant}
        </Button>
      ))}
    </div>
  ),

  parameters: {
    controls: {
      exclude: ["variant", "children", "fullWidth"],
    },
  },
};

export const IntentAndVariantMatrix: Story = {
  render: (args) => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `auto repeat(${intents.length}, minmax(6rem, auto))`,
        alignItems: "center",
        gap: "0.75rem",
      }}
    >
      <div />

      {intents.map((intent) => (
        <strong key={intent} style={{ textAlign: "center" }}>
          {intent}
        </strong>
      ))}

      {variants.map((variant) => (
        <div key={variant} style={{ display: "contents" }}>
          <strong>{variant}</strong>

          {intents.map((intent) => (
            <Button
              {...args}
              key={`${variant}-${intent}`}
              intent={intent}
              variant={variant}
              fullWidth={false}
            >
              Button
            </Button>
          ))}
        </div>
      ))}
    </div>
  ),

  parameters: {
    layout: "padded",
    controls: {
      exclude: ["intent", "variant", "children", "fullWidth"],
    },
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {sizes.map((size) => (
        <Button {...args} key={size} size={size} fullWidth={false}>
          {size.toUpperCase()}
        </Button>
      ))}
    </div>
  ),

  parameters: {
    controls: {
      exclude: ["size", "children", "fullWidth"],
    },
  },
};

export const Radii: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {radii.map((radius) => (
        <Button {...args} key={radius} radius={radius} fullWidth={false}>
          {radius}
        </Button>
      ))}
    </div>
  ),

  parameters: {
    controls: {
      exclude: ["radius", "children", "fullWidth"],
    },
  },
};

export const FullWidth: Story = {
  args: {
    children: "Full-width button",
    fullWidth: true,
  },

  decorators: [
    (Story) => (
      <div style={{ width: "24rem", maxWidth: "100%" }}>
        <Story />
      </div>
    ),
  ],

  parameters: {
    layout: "centered",
  },
};

export const Disabled: Story = {
  args: {
    children: "비활성 버튼",
    disabled: true,
  },
};

export const CustomStyle: Story = {
  args: {
    children: "Custom button",
    style: {
      "--button-bg": "#111827",
      "--button-bg-hover": "#374151",
      "--button-fg": "#f9fafb",
      "--button-border-color": "#111827",
      "--button-border-color-hover": "#374151",
    },
  },

  parameters: {
    controls: {
      exclude: ["style"],
    },
  },
};
