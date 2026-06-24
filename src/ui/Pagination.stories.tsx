import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import {
  Pagination,
  type KrdsPaginationTemplate,
  type PaginationProps,
} from "./Pagination";

const krdsTemplates: KrdsPaginationTemplate[] = [
  "krds-friendly-numbered-basic",
  "krds-friendly-numbered-boundary",
  "krds-friendly-numbered-edge-start",
  "krds-friendly-numbered-edge-end",
  "krds-friendly-numbered-with-jump",
  "krds-friendly-load-more-basic",
  "krds-friendly-mobile-stack",
  "krds-friendly-numbered-with-summary",
  "krds-friendly-numbered-with-page-size",
  "krds-friendly-icon-control",
  "krds-friendly-touch-large",
];

const serviceTemplates: KrdsPaginationTemplate[] = [
  "service-simple-prev-next",
  "service-mobile-counter-pill",
  "service-commerce-load-more-progress",
  "service-infinite-scroll-fallback",
  "service-carousel-dot",
  "service-carousel-thumbnail",
  "service-cursor-older-newer",
  "service-timeline-load-previous",
  "service-table-footer",
  "service-select-page",
  "service-sticky-bottom-bar",
  "service-chip-numbered",
  "service-step-progress",
  "service-index-korean-initial",
  "service-date-navigator",
  "service-section-load-more",
  "service-season-selector",
];

const templates: KrdsPaginationTemplate[] = [...krdsTemplates, ...serviceTemplates];

const templateLabels = {
  "krds-friendly-numbered-basic": "01. 표준 숫자 링크 + 말줄임",
  "krds-friendly-numbered-boundary": "02. 처음/마지막 버튼 명시형",
  "krds-friendly-numbered-edge-start": "03. 첫 페이지 edge state",
  "krds-friendly-numbered-edge-end": "04. 마지막 페이지 edge state",
  "krds-friendly-numbered-with-jump": "05. 직접 이동 결합형",
  "krds-friendly-load-more-basic": "06. 목록 확장형 Load more",
  "krds-friendly-mobile-stack": "07. 모바일 세로 배치형",
  "krds-friendly-numbered-with-summary": "08. 검색 결과 요약 + 페이지네이션",
  "krds-friendly-numbered-with-page-size": "09. 페이지당 표시 개수 선택 결합형",
  "krds-friendly-icon-control": "10. 아이콘 전용 컨트롤형",
  "krds-friendly-touch-large": "11. 큰 터치 타깃형",
  "service-simple-prev-next": "12. 이전/다음만 있는 블로그형",
  "service-mobile-counter-pill": "13. 모바일 Page x/y 캡슐형",
  "service-commerce-load-more-progress": "14. 커머스 Load more + 진행률",
  "service-infinite-scroll-fallback": "15. 무한 스크롤 백업 버튼형",
  "service-carousel-dot": "16. 캐러셀 도트형",
  "service-carousel-thumbnail": "17. 썸네일 도트형",
  "service-cursor-older-newer": "18. 커서 기반 Older/Newer",
  "service-timeline-load-previous": "19. 채팅/타임라인 이전 메시지 불러오기",
  "service-table-footer": "20. Material table footer형",
  "service-select-page": "21. 드롭다운 페이지 선택형",
  "service-sticky-bottom-bar": "22. Sticky bottom pagination",
  "service-chip-numbered": "23. 라운드 칩 숫자형",
  "service-step-progress": "24. 단계형 Step pagination",
  "service-index-korean-initial": "25. 알파벳/초성 인덱스형",
  "service-date-navigator": "26. 날짜 단위 페이지네이션",
  "service-section-load-more": "27. 섹션별 더보기 카드형",
  "service-season-selector": "28. 게임/랭킹 시즌 페이지네이션",
} satisfies Record<KrdsPaginationTemplate, string>;

function getTemplateArgs(template: KrdsPaginationTemplate): Partial<PaginationProps> {
  switch (template) {
    case "krds-friendly-numbered-edge-start":
      return { page: 1, total: 18, totalCount: 180 };
    case "krds-friendly-numbered-edge-end":
      return { page: 46, total: 46, totalCount: 460 };
    case "krds-friendly-numbered-with-jump":
      return { page: 99, total: 480, totalCount: 4800, size: 3 };
    case "krds-friendly-load-more-basic":
      return { page: 1, total: 24, visibleCount: 8, totalCount: 24, pageSize: 8 };
    case "krds-friendly-mobile-stack":
      return { page: 8, total: 120, size: 3 };
    case "krds-friendly-numbered-with-summary":
      return { page: 8, total: 120, totalCount: 1196, pageSize: 10 };
    case "krds-friendly-numbered-with-page-size":
      return { page: 2, total: 40, totalCount: 400, pageSize: 10, size: 2 };
    case "krds-friendly-icon-control":
      return { page: 5, total: 12, size: 3 };
    case "krds-friendly-touch-large":
      return { page: 2, total: 5, size: 5 };
    case "service-mobile-counter-pill":
      return { page: 8, total: 24 };
    case "service-commerce-load-more-progress":
      return { page: 1, total: 48, visibleCount: 24, totalCount: 48, pageSize: 24 };
    case "service-carousel-dot":
      return { page: 2, total: 4 };
    case "service-carousel-thumbnail":
      return { page: 2, total: 4 };
    case "service-cursor-older-newer":
      return { page: 2, total: 5, currentLabel: "2026.06.24 12:30 이후" };
    case "service-table-footer":
      return { page: 3, total: 244, totalCount: 2431, pageSize: 10 };
    case "service-select-page":
      return { page: 3, total: 80 };
    case "service-sticky-bottom-bar":
      return { page: 3, total: 12 };
    case "service-step-progress":
      return { page: 2, total: 4, stepLabels: ["약관", "정보 입력", "인증", "완료"] };
    case "service-index-korean-initial":
      return { page: 1, total: 15 };
    case "service-date-navigator":
      return { page: 1, total: 365, date: "2026-06-24" };
    case "service-section-load-more":
      return { page: 1, total: 6, visibleCount: 3, totalCount: 6 };
    case "service-season-selector":
      return { page: 13, total: 20 };
    default:
      return { page: 8, total: 120, totalCount: 1196, pageSize: 10 };
  }
}

function ControlledPagination(args: PaginationProps) {
  const [page, setPage] = useState(args.page);
  const [pageSize, setPageSize] = useState(args.pageSize ?? 10);
  const [visibleCount, setVisibleCount] = useState(args.visibleCount ?? args.pageSize ?? 10);
  const [date, setDate] = useState(args.date ?? "2026-06-24");

  return (
    <Pagination
      {...args}
      page={page}
      pageSize={pageSize}
      visibleCount={visibleCount}
      date={date}
      onChange={setPage}
      onPageSizeChange={(nextPageSize) => {
        setPageSize(nextPageSize);
        setPage(1);
      }}
      onLoadMore={() => {
        setVisibleCount((current) =>
          Math.min(current + pageSize, args.totalCount ?? args.total),
        );
      }}
      onDateChange={setDate}
    />
  );
}

const meta = {
  title: "Navigation/Pagination",
  component: Pagination,
  tags: ["autodocs"],

  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "KRDS 친화형 페이지네이션과 실서비스에서 자주 쓰이는 변형 UI를 한 컴포넌트에서 선택할 수 있습니다. page/total/onChange를 기본으로 받고, size는 노출할 숫자 버튼 개수입니다.",
      },
    },
  },

  args: {
    template: "krds-friendly-numbered-basic",
    page: 8,
    total: 120,
    size: 5,
    totalCount: 1196,
    pageSize: 10,
  },

  argTypes: {
    template: {
      control: {
        type: "select",
      },
      options: templates,
      description: "표시할 페이지네이션 템플릿입니다.",
      table: {
        category: "Appearance",
        type: {
          summary: "KrdsPaginationTemplate",
        },
        defaultValue: {
          summary: "krds-friendly-numbered-basic",
        },
      },
    },
    page: {
      control: {
        type: "number",
        min: 1,
      },
      description: "현재 페이지입니다. 1부터 시작합니다.",
      table: {
        category: "State",
      },
    },
    total: {
      control: {
        type: "number",
        min: 1,
      },
      description: "전체 페이지 수입니다.",
      table: {
        category: "State",
      },
    },
    size: {
      control: {
        type: "number",
        min: 1,
        max: 10,
      },
      description: "노출할 숫자 페이지 버튼 개수입니다.",
      table: {
        category: "Layout",
      },
    },
    totalCount: {
      control: {
        type: "number",
        min: 0,
      },
      description: "전체 항목 수입니다. summary/table/load-more 템플릿에서 사용합니다.",
      table: {
        category: "Data",
      },
    },
    visibleCount: {
      control: {
        type: "number",
        min: 0,
      },
      description: "현재 노출된 항목 수입니다. load-more 계열에서 사용합니다.",
      table: {
        category: "Data",
      },
    },
    pageSize: {
      control: {
        type: "number",
        min: 1,
      },
      description: "페이지당 항목 수입니다.",
      table: {
        category: "Data",
      },
    },
    ariaLabel: {
      control: "text",
      description: "페이지네이션 nav의 접근성 이름입니다.",
      table: {
        category: "Accessibility",
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
    onChange: {
      control: false,
      table: {
        category: "Events",
      },
    },
    onLoadMore: {
      control: false,
      table: {
        category: "Events",
      },
    },
    onPageSizeChange: {
      control: false,
      table: {
        category: "Events",
      },
    },
  },
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => <ControlledPagination {...args} />,
};

export const KrdsFriendly: Story = {
  render: () => (
    <div className="grid w-[min(52rem,calc(100vw-2rem))] gap-4">
      {krdsTemplates.map((template) => (
        <section
          key={template}
          className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div>
            <strong className="block text-sm text-slate-900">
              {templateLabels[template]}
            </strong>
            <span className="text-xs text-slate-500">{template}</span>
          </div>
          <ControlledPagination
            template={template}
            {...getTemplateArgs(template)}
            page={getTemplateArgs(template).page ?? 1}
            total={getTemplateArgs(template).total ?? 1}
          />
        </section>
      ))}
    </div>
  ),

  parameters: {
    controls: {
      disable: true,
    },
  },
};

export const ServiceVariations: Story = {
  render: () => (
    <div className="grid w-[min(52rem,calc(100vw-2rem))] gap-4">
      {serviceTemplates.map((template) => (
        <section
          key={template}
          className="grid gap-3 rounded-2xl border border-amber-200 bg-white p-5 shadow-sm"
        >
          <div>
            <strong className="block text-sm text-slate-900">
              {templateLabels[template]}
            </strong>
            <span className="text-xs text-slate-500">{template}</span>
          </div>
          <ControlledPagination
            template={template}
            {...getTemplateArgs(template)}
            page={getTemplateArgs(template).page ?? 1}
            total={getTemplateArgs(template).total ?? 1}
          />
        </section>
      ))}
    </div>
  ),

  parameters: {
    controls: {
      disable: true,
    },
  },
};

export const EdgeStates: Story = {
  render: () => (
    <div className="grid gap-5">
      <ControlledPagination
        template="krds-friendly-numbered-edge-start"
        page={1}
        total={18}
        size={5}
      />
      <ControlledPagination
        template="krds-friendly-numbered-edge-end"
        page={46}
        total={46}
        size={5}
      />
    </div>
  ),

  parameters: {
    controls: {
      disable: true,
    },
  },
};
