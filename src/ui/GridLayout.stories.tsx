import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { GridLayout } from "./GridLayout";

const meta = {
  title: "Layout/GridLayout",
  component: GridLayout,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  argTypes: {
    col: {
      control: {
        type: "number",
        min: 1,
        max: 12,
      },
      description: "Grid의 열 개수",
    },
    rowHeight: {
      control: "text",
      description: "자동 생성되는 행의 기본 높이",
    },
    dense: {
      control: "boolean",
      description: "빈 공간을 뒤쪽 아이템으로 채울지 여부",
    },
  },
  args: {
    col: 3,
    rowHeight: 120,
    dense: false,
    className: "gap-3",
  },
} satisfies Meta<typeof GridLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

const itemClassName =
  "flex items-center justify-center rounded-lg border border-slate-300 bg-slate-100 p-4 text-sm font-medium text-slate-700";

export const Default: Story = {
  render: (args) => (
    <GridLayout {...args}>
      <GridLayout.Item className={itemClassName}>Item 1</GridLayout.Item>
      <GridLayout.Item className={itemClassName}>Item 2</GridLayout.Item>
      <GridLayout.Item className={itemClassName}>Item 3</GridLayout.Item>
      <GridLayout.Item className={itemClassName}>Item 4</GridLayout.Item>
      <GridLayout.Item className={itemClassName}>Item 5</GridLayout.Item>
      <GridLayout.Item className={itemClassName}>Item 6</GridLayout.Item>
    </GridLayout>
  ),
};

export const WithColumnSpan: Story = {
  render: (args) => (
    <GridLayout {...args}>
      <GridLayout.Item colSpan={2} className={`${itemClassName} bg-blue-100`}>
        colSpan = 2
      </GridLayout.Item>

      <GridLayout.Item className={itemClassName}>Item 2</GridLayout.Item>
      <GridLayout.Item className={itemClassName}>Item 3</GridLayout.Item>

      <GridLayout.Item colSpan={3} className={`${itemClassName} bg-green-100`}>
        colSpan = 3
      </GridLayout.Item>
    </GridLayout>
  ),
};

export const WithRowSpan: Story = {
  render: (args) => (
    <GridLayout {...args}>
      <GridLayout.Item rowSpan={2} className={`${itemClassName} bg-red-100`}>
        rowSpan = 2
      </GridLayout.Item>

      <GridLayout.Item className={itemClassName}>Item 2</GridLayout.Item>
      <GridLayout.Item className={itemClassName}>Item 3</GridLayout.Item>
      <GridLayout.Item className={itemClassName}>Item 4</GridLayout.Item>
      <GridLayout.Item className={itemClassName}>Item 5</GridLayout.Item>
    </GridLayout>
  ),
};

export const CompoundSpans: Story = {
  render: (args) => (
    <GridLayout {...args}>
      <GridLayout.Item colSpan={2} className={`${itemClassName} bg-blue-100`}>
        colSpan = 2
      </GridLayout.Item>

      <GridLayout.Item rowSpan={2} className={`${itemClassName} bg-red-100`}>
        rowSpan = 2
      </GridLayout.Item>

      <GridLayout.Item className={itemClassName}>Item 3</GridLayout.Item>
      <GridLayout.Item className={itemClassName}>Item 4</GridLayout.Item>
    </GridLayout>
  ),
};

export const ColumnAndRowSpan: Story = {
  render: (args) => (
    <GridLayout {...args}>
      <GridLayout.Item
        colSpan={2}
        rowSpan={2}
        className={`${itemClassName} bg-purple-100`}
      >
        colSpan = 2
        <br />
        rowSpan = 2
      </GridLayout.Item>

      <GridLayout.Item className={itemClassName}>Item 2</GridLayout.Item>
      <GridLayout.Item className={itemClassName}>Item 3</GridLayout.Item>
      <GridLayout.Item className={itemClassName}>Item 4</GridLayout.Item>
      <GridLayout.Item className={itemClassName}>Item 5</GridLayout.Item>
    </GridLayout>
  ),
};

export const Dense: Story = {
  args: {
    col: 4,
    dense: true,
  },
  render: (args) => (
    <GridLayout {...args}>
      <GridLayout.Item colSpan={3} className={`${itemClassName} bg-blue-100`}>
        colSpan = 3
      </GridLayout.Item>

      <GridLayout.Item colSpan={2} className={`${itemClassName} bg-green-100`}>
        colSpan = 2
      </GridLayout.Item>

      <GridLayout.Item className={itemClassName}>Item 3</GridLayout.Item>
      <GridLayout.Item className={itemClassName}>Item 4</GridLayout.Item>
      <GridLayout.Item className={itemClassName}>Item 5</GridLayout.Item>
    </GridLayout>
  ),
};

export const WithStartPosition: Story = {
  args: {
    col: 4,
  },
  render: (args) => (
    <GridLayout {...args}>
      <GridLayout.Item
        colStart={2}
        colSpan={2}
        className={`${itemClassName} bg-orange-100`}
      >
        colStart = 2, colSpan = 2
      </GridLayout.Item>

      <GridLayout.Item colStart={1} rowStart={2} className={itemClassName}>
        colStart = 1, rowStart = 2
      </GridLayout.Item>

      <GridLayout.Item
        colStart={4}
        rowStart={2}
        rowSpan={2}
        className={`${itemClassName} bg-pink-100`}
      >
        colStart = 4, rowSpan = 2
      </GridLayout.Item>
    </GridLayout>
  ),
};

export const DashboardExample: Story = {
  args: {
    col: 4,
    rowHeight: 100,
    className: "gap-4",
  },
  render: (args) => (
    <GridLayout {...args}>
      <GridLayout.Item
        colSpan={3}
        className="rounded-xl border bg-white p-5 shadow-sm"
      >
        <strong className="block text-lg">매출 현황</strong>
        <span className="text-sm text-slate-500">
          이번 달 매출 데이터를 표시합니다.
        </span>
      </GridLayout.Item>

      <GridLayout.Item
        rowSpan={2}
        className="rounded-xl border bg-slate-900 p-5 text-white shadow-sm"
      >
        <strong className="block text-lg">사용자</strong>
        <span className="mt-2 block text-3xl font-bold">12,480</span>
      </GridLayout.Item>

      <GridLayout.Item
        colSpan={2}
        className="rounded-xl border bg-white p-5 shadow-sm"
      >
        <strong className="block">방문자</strong>
        <span className="mt-2 block text-2xl font-bold">38,290</span>
      </GridLayout.Item>

      <GridLayout.Item className="rounded-xl border bg-white p-5 shadow-sm">
        <strong className="block">전환율</strong>
        <span className="mt-2 block text-2xl font-bold">4.8%</span>
      </GridLayout.Item>
    </GridLayout>
  ),
};
const navigationItems = [
  { id: "overview", label: "Overview" },
  { id: "analytics", label: "Analytics" },
  { id: "projects", label: "Projects" },
  { id: "team", label: "Team" },
] as const;

const activities = [
  {
    name: "김민준",
    action: "새 프로젝트를 생성했습니다.",
    time: "5분 전",
    initials: "김",
  },
  {
    name: "박서연",
    action: "디자인 검토를 요청했습니다.",
    time: "24분 전",
    initials: "박",
  },
  {
    name: "이도윤",
    action: "배포를 완료했습니다.",
    time: "1시간 전",
    initials: "이",
  },
];

function NavigationIcon({
  type,
}: {
  type: (typeof navigationItems)[number]["id"];
}) {
  const paths = {
    overview: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </>
    ),
    analytics: (
      <>
        <path d="M4 19V9" />
        <path d="M10 19V5" />
        <path d="M16 19v-7" />
        <path d="M22 19H2" />
      </>
    ),
    projects: (
      <>
        <path d="M3 7h7l2 2h9v10H3z" />
        <path d="M3 7V5h7l2 2" />
      </>
    ),
    team: (
      <>
        <circle cx="9" cy="8" r="3" />
        <circle cx="17" cy="9" r="2.5" />
        <path d="M3 20c0-4 2.5-6 6-6s6 2 6 6" />
        <path d="M15 15c3.5 0 6 1.5 6 5" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[type]}
    </svg>
  );
}

function AppShellDemo({
  args,
}: {
  args: React.ComponentProps<typeof GridLayout>;
}) {
  const [menuOpen, setMenuOpen] = useState(true);

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen((open) => !open);

  return (
    <GridLayout
      {...args}
      col={1}
      className={["min-h-screen bg-slate-100", args.className]
        .filter(Boolean)
        .join(" ")}
      gridTemplateColumns="minmax(0, 1fr)"
    >
      {/* Mobile backdrop */}
      {menuOpen && (
        <button
          type="button"
          aria-label="사이드바 닫기"
          onClick={closeMenu}
          className="fixed inset-0 z-40 bg-slate-950/45 backdrop-blur-[1px] md:hidden"
        />
      )}

      {/* Fixed sidebar */}
      <GridLayout.Item
        id="app-shell-sidebar"
        as="aside"
        className={[
          "fixed inset-y-0 left-0 z-50 flex w-60 flex-col",
          "overflow-hidden bg-slate-950 text-slate-300 shadow-2xl",
          "transition-transform duration-300 ease-out",
          menuOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-white/10 px-5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-indigo-500 font-bold text-white shadow-lg shadow-indigo-950/30">
              M
            </div>

            <div className="min-w-0 leading-tight">
              <strong className="block truncate text-sm text-white">
                MH Workspace
              </strong>
              <span className="text-xs text-slate-500">Admin Console</span>
            </div>
          </div>

          <button
            type="button"
            aria-label="사이드바 닫기"
            onClick={closeMenu}
            className="grid size-9 shrink-0 place-items-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-white"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12" />
              <path d="M18 6 6 18" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          <p className="px-3 pb-2 pt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600">
            Workspace
          </p>

          {navigationItems.map((item, index) => {
            const selected = index === 0;

            return (
              <button
                key={item.id}
                type="button"
                aria-current={selected ? "page" : undefined}
                className={[
                  "flex h-11 w-full items-center gap-3 rounded-xl px-3",
                  "text-sm font-medium transition",
                  selected
                    ? "bg-indigo-500 text-white shadow-lg shadow-indigo-950/30"
                    : "text-slate-400 hover:bg-white/5 hover:text-white",
                ].join(" ")}
              >
                <NavigationIcon type={item.id} />
                <span className="truncate">{item.label}</span>

                {item.id === "projects" && (
                  <span className="ml-auto rounded-full bg-white/10 px-2 py-0.5 text-[10px]">
                    12
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-3">
          <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
            <div className="grid size-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-indigo-400 to-violet-600 text-xs font-bold text-white">
              MH
            </div>

            <div className="min-w-0 flex-1">
              <strong className="block truncate text-sm text-white">
                Minho Kim
              </strong>
              <span className="block truncate text-xs text-slate-500">
                minho@example.com
              </span>
            </div>

            <button
              type="button"
              aria-label="사용자 메뉴"
              className="grid size-8 place-items-center rounded-lg text-slate-500 hover:bg-white/10 hover:text-white"
            >
              •••
            </button>
          </div>
        </div>
      </GridLayout.Item>

      {/* Fixed header */}
      <GridLayout.Item
        as="header"
        className={[
          "fixed right-0 top-0 z-30 flex h-[72px] min-w-0 items-center",
          "justify-between gap-4 border-b border-slate-200 bg-white/90 px-4",
          "shadow-sm backdrop-blur-xl sm:px-6",
          "transition-[left] duration-300 ease-out",
          menuOpen ? "left-0 md:left-60" : "left-0",
        ].join(" ")}
      >
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <button
            type="button"
            aria-label={menuOpen ? "사이드바 닫기" : "사이드바 열기"}
            aria-controls="app-shell-sidebar"
            aria-expanded={menuOpen}
            onClick={toggleMenu}
            className="grid size-10 shrink-0 place-items-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-slate-950"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M4 7h16" />
              <path d="M4 12h16" />
              <path d="M4 17h16" />
            </svg>
          </button>

          <div className="relative hidden w-full max-w-md sm:block">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-4-4" />
            </svg>

            <input
              aria-label="검색"
              placeholder="프로젝트, 사용자 검색..."
              className={[
                "h-10 w-full rounded-xl border border-slate-200 bg-slate-50",
                "pl-10 pr-4 text-sm outline-none transition",
                "placeholder:text-slate-400",
                "focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100",
              ].join(" ")}
            />

            <kbd className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] text-slate-400 lg:block">
              ⌘ K
            </kbd>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            aria-label="검색"
            className="grid size-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:bg-slate-50 sm:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-4-4" />
            </svg>
          </button>

          <button
            type="button"
            aria-label="알림"
            className="relative grid size-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:bg-slate-50 hover:text-slate-900"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
              <path d="M10 21h4" />
            </svg>

            <span className="absolute right-2 top-2 size-2 rounded-full bg-rose-500 ring-2 ring-white" />
          </button>

          <button
            type="button"
            className="hidden rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 sm:block"
          >
            새 프로젝트
          </button>

          <button
            type="button"
            aria-label="새 프로젝트"
            className="grid size-10 place-items-center rounded-xl bg-slate-950 text-lg font-medium text-white sm:hidden"
          >
            +
          </button>
        </div>
      </GridLayout.Item>

      {/* Main */}
      <GridLayout.Item
        as="main"
        className={[
          "min-h-screen min-w-0 pt-[72px]",
          "transition-[padding] duration-300 ease-out",
          menuOpen ? "md:pl-60" : "pl-0",
        ].join(" ")}
      >
        <div className="min-h-[calc(100vh-72px)] p-3 sm:p-5">
          <div className="mx-auto max-w-[1500px]">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="mb-1 text-sm font-medium text-indigo-600">
                  Overview
                </p>

                <h1 className="text-2xl font-bold tracking-tight text-slate-950">
                  안녕하세요, Minho님
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  오늘의 서비스 현황을 확인해 보세요.
                </p>
              </div>

              <button
                type="button"
                className="hidden rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 shadow-sm hover:bg-slate-50 sm:block"
              >
                최근 30일
              </button>
            </div>

            <GridLayout col={4} rowHeight={132} className="gap-4">
              {[
                {
                  label: "총 매출",
                  value: "₩48.2M",
                  change: "+12.5%",
                  accent: "bg-indigo-500",
                },
                {
                  label: "활성 사용자",
                  value: "12,480",
                  change: "+8.2%",
                  accent: "bg-emerald-500",
                },
                {
                  label: "신규 주문",
                  value: "1,429",
                  change: "+5.7%",
                  accent: "bg-amber-500",
                },
                {
                  label: "전환율",
                  value: "4.82%",
                  change: "+0.8%",
                  accent: "bg-rose-500",
                },
              ].map((metric) => (
                <GridLayout.Item
                  key={metric.label}
                  className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <span
                    className={`absolute inset-y-5 left-0 w-1 rounded-r-full ${metric.accent}`}
                  />

                  <p className="text-sm font-medium text-slate-500">
                    {metric.label}
                  </p>

                  <div className="mt-3 flex items-end justify-between gap-3">
                    <strong className="text-2xl font-bold tracking-tight text-slate-950">
                      {metric.value}
                    </strong>

                    <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-600">
                      {metric.change}
                    </span>
                  </div>

                  <p className="mt-2 text-xs text-slate-400">지난달 대비</p>
                </GridLayout.Item>
              ))}

              <GridLayout.Item
                colSpan={3}
                rowSpan={2}
                className="flex min-h-0 flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="font-semibold text-slate-900">매출 추이</h2>
                    <p className="mt-1 text-sm text-slate-500">
                      최근 7개월간 월별 매출
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="size-2 rounded-full bg-indigo-500" />
                    Revenue
                  </div>
                </div>

                <div className="mt-5 min-h-0 flex-1">
                  <svg
                    viewBox="0 0 700 220"
                    preserveAspectRatio="none"
                    className="h-full w-full overflow-visible"
                  >
                    {[40, 90, 140, 190].map((y) => (
                      <line
                        key={y}
                        x1="0"
                        x2="700"
                        y1={y}
                        y2={y}
                        stroke="currentColor"
                        className="text-slate-100"
                      />
                    ))}

                    <defs>
                      <linearGradient
                        id="app-shell-revenue-area"
                        x1="0"
                        x2="0"
                        y1="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#6366f1"
                          stopOpacity="0.25"
                        />
                        <stop
                          offset="100%"
                          stopColor="#6366f1"
                          stopOpacity="0"
                        />
                      </linearGradient>
                    </defs>

                    <path
                      d="M0 180 C70 160 95 170 145 130 S240 150 290 105 S390 125 435 75 S535 100 580 55 S660 65 700 25 L700 220 L0 220 Z"
                      fill="url(#app-shell-revenue-area)"
                    />

                    <path
                      d="M0 180 C70 160 95 170 145 130 S240 150 290 105 S390 125 435 75 S535 100 580 55 S660 65 700 25"
                      fill="none"
                      stroke="#6366f1"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <div className="mt-3 flex justify-between text-xs text-slate-400">
                  {["12월", "1월", "2월", "3월", "4월", "5월", "6월"].map(
                    (month) => (
                      <span key={month}>{month}</span>
                    ),
                  )}
                </div>
              </GridLayout.Item>

              <GridLayout.Item
                rowSpan={2}
                className="min-h-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-semibold text-slate-900">최근 활동</h2>
                    <p className="mt-1 text-sm text-slate-500">팀 업데이트</p>
                  </div>

                  <button
                    type="button"
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                  >
                    전체 보기
                  </button>
                </div>

                <div className="mt-5 space-y-5">
                  {activities.map((activity) => (
                    <div key={activity.name} className="flex gap-3">
                      <div className="grid size-9 shrink-0 place-items-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">
                        {activity.initials}
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm leading-5 text-slate-600">
                          <strong className="font-semibold text-slate-900">
                            {activity.name}
                          </strong>
                          님이 {activity.action}
                        </p>

                        <span className="mt-1 block text-xs text-slate-400">
                          {activity.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </GridLayout.Item>
            </GridLayout>
          </div>
        </div>
      </GridLayout.Item>
    </GridLayout>
  );
}

export const AppShellExample: Story = {
  args: {
    col: 2,
  },
  render: (args) => <AppShellDemo args={args} />,
};
