import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Badge,
  type BadgeIntent,
  type BadgeRadius,
  type BadgeSize,
  type BadgeVariant,
} from "./Badge";

const intents: BadgeIntent[] = [
  "info",
  "warning",
  "error",
  "success",
  "primary",
  "ghost",
];

const variants: BadgeVariant[] = ["outline", "plain", "solid"];

const sizes: BadgeSize[] = ["xs", "sm", "md", "lg", "xl"];

const radii: BadgeRadius[] = ["xs", "sm", "md", "lg", "xl", "full"];

const meta = {
  title: "Misc/Badge",
  component: Badge,
  tags: ["autodocs"],

  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "상태, 분류 또는 짧은 정보를 표시하는 Badge 컴포넌트입니다. intent, variant, size, radius와 polymorphic 렌더링을 지원합니다.",
      },
    },
  },

  args: {
    children: "Badge",
    intent: "primary",
    variant: "solid",
    size: "md",
    radius: "md",
    fullWidth: false,
  },

  argTypes: {
    children: {
      control: "text",
      description: "Badge 내부에 표시할 콘텐츠입니다.",
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
      description: "Badge의 의미와 색상 체계를 지정합니다.",
      table: {
        category: "Appearance",
        type: {
          summary: "BadgeIntent",
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
      description: "Badge의 표현 방식을 지정합니다.",
      table: {
        category: "Appearance",
        type: {
          summary: "BadgeVariant",
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
      description: "Badge의 높이, 여백 및 글자 크기를 지정합니다.",
      table: {
        category: "Appearance",
        type: {
          summary: "BadgeSize",
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
      description: "Badge의 모서리 둥글기를 지정합니다.",
      table: {
        category: "Appearance",
        type: {
          summary: "BadgeRadius",
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

    as: {
      control: false,
      description: "Badge가 렌더링될 HTML 요소 또는 React 컴포넌트입니다.",
      table: {
        category: "Polymorphic",
        type: {
          summary: "React.ElementType",
        },
        defaultValue: {
          summary: "div",
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
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Intents: Story = {
  args: {
    variant: "solid",
  },

  render: (args) => (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "0.75rem",
      }}
    >
      {intents.map((intent) => (
        <Badge {...args} key={intent} intent={intent} fullWidth={false}>
          {intent}
        </Badge>
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
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "0.75rem",
      }}
    >
      {variants.map((variant) => (
        <Badge {...args} key={variant} variant={variant} fullWidth={false}>
          {variant}
        </Badge>
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
            <Badge
              {...args}
              key={`${variant}-${intent}`}
              intent={intent}
              variant={variant}
              fullWidth={false}
            >
              Badge
            </Badge>
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
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "0.75rem",
      }}
    >
      {sizes.map((size) => (
        <Badge {...args} key={size} size={size} fullWidth={false}>
          {size}
        </Badge>
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
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "0.75rem",
      }}
    >
      {radii.map((radius) => (
        <Badge {...args} key={radius} radius={radius} fullWidth={false}>
          {radius}
        </Badge>
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
    children: "Full-width badge",
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

export const PolymorphicElements: Story = {
  render: (args) => (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "0.75rem",
      }}
    >
      <Badge {...args} as="div">
        div
      </Badge>

      <Badge {...args} as="span">
        span
      </Badge>

      <Badge {...args} as="button" type="button">
        button
      </Badge>

      <Badge {...args} as="a" href="#badge-polymorphic-example">
        anchor
      </Badge>
    </div>
  ),

  parameters: {
    controls: {
      exclude: ["as", "children", "fullWidth"],
    },
  },
};

export const CustomStyle: Story = {
  args: {
    children: "Custom badge",
    style: {
      "--badge-bg": "#111827",
      "--badge-fg": "#f9fafb",
      "--badge-border-color": "#111827",
    } as React.CSSProperties,
  },

  parameters: {
    controls: {
      exclude: ["style"],
    },
  },
};
