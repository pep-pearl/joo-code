import { useEffect, useState } from "react";
import {
  apiMap,
  formatCommaNumber,
  formatThousandToEok,
  initViewportHeight,
  romanToNumber,
  useDebouncedValue,
  usePages,
  usePaginationButtonsAttrs,
} from "../../src";

export function App() {
  const [amount, setAmount] = useState("100000");
  const [roman, setRoman] = useState("XIV");
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSearchText = useDebouncedValue(searchText, 500);
  const maxPage = 12;
  const pages = usePages({ max: maxPage, offset: 5, current: currentPage });
  const { firstAttrs, prevAttrs, nextAttrs, lastAttrs } =
    usePaginationButtonsAttrs({
      max: maxPage,
      current: currentPage,
      onChange: setCurrentPage,
    });

  const postUpdateEndpoint = apiMap.posts[":postId"].update;
  const postUpdatePath = postUpdateEndpoint.path.replace(":postId", "42");

  useEffect(() => initViewportHeight(), []);

  return (
    <main className="page-shell">
      <header className="hero">
        <p className="eyebrow">PERSONAL CODE ARCHIVE</p>
        <h1>joo-code playground</h1>
        <p>
          <code>src/index.ts</code>에서 공개한 코드를 실제로 import해서 확인하는 공간입니다.
          아래 값을 바꾸거나 <code>playground/src/App.tsx</code>를 편집해 새 코드를 시험하세요.
        </p>
      </header>

      <section className="card-grid" aria-label="코드 실행 예제">
        <article className="card">
          <h2>숫자 포맷</h2>
          <label htmlFor="amount">천원 단위 금액</label>
          <input
            id="amount"
            inputMode="numeric"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
          <dl>
            <div>
              <dt>formatCommaNumber</dt>
              <dd>{formatCommaNumber(amount)}</dd>
            </div>
            <div>
              <dt>formatThousandToEok</dt>
              <dd>{formatThousandToEok(amount)}억원</dd>
            </div>
          </dl>
        </article>

        <article className="card">
          <h2>로마 숫자</h2>
          <label htmlFor="roman">로마 숫자</label>
          <input
            id="roman"
            value={roman}
            onChange={(event) => setRoman(event.target.value)}
          />
          <p className="result">
            변환 결과 <strong>{romanToNumber(roman)}</strong>
          </p>
        </article>

        <article className="card">
          <h2>Debounce Hook</h2>
          <label htmlFor="search">입력 후 500ms 뒤 반영</label>
          <input
            id="search"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="빠르게 입력해 보세요"
          />
          <dl>
            <div>
              <dt>현재 값</dt>
              <dd>{searchText || "-"}</dd>
            </div>
            <div>
              <dt>지연된 값</dt>
              <dd>{debouncedSearchText || "-"}</dd>
            </div>
          </dl>
        </article>

        <article className="card">
          <h2>Viewport 높이</h2>
          <p>
            <code>initViewportHeight</code>가 계산한 CSS 변수 <code>--vh</code>를 사용합니다.
          </p>
          <div className="viewport-sample">
            <span>calc(var(--vh) × 18)</span>
          </div>
        </article>

        <article className="card">
          <h2>Pagination Hooks</h2>
          <p>
            현재 페이지 주변 번호와 이동 버튼 속성을 두 훅으로 구성합니다.
          </p>
          <nav className="pagination" aria-label="페이지 이동 예제">
            <button type="button" {...firstAttrs}>
              처음
            </button>
            <button type="button" {...prevAttrs}>
              이전
            </button>
            {pages.map((page) => (
              <button
                key={page}
                type="button"
                aria-current={page === currentPage ? "page" : undefined}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <button type="button" {...nextAttrs}>
              다음
            </button>
            <button type="button" {...lastAttrs}>
              마지막
            </button>
          </nav>
          <p className="result">
            현재 페이지 <strong>{currentPage}</strong> / {maxPage}
          </p>
        </article>

        <article className="card">
          <h2>API Tree</h2>
          <p>
            선언된 API 트리에서 요청 메서드와 경로를 타입 안전하게 조회합니다.
          </p>
          <dl>
            <div>
              <dt>로그인</dt>
              <dd>
                {apiMap.auth.user.login.method} {apiMap.auth.user.login.path}
              </dd>
            </div>
            <div>
              <dt>게시글 목록</dt>
              <dd>
                {apiMap.posts._.method} {apiMap.posts._.path}
              </dd>
            </div>
            <div>
              <dt>42번 게시글 수정</dt>
              <dd>
                {postUpdateEndpoint.method} {postUpdatePath}
              </dd>
            </div>
          </dl>
        </article>
      </section>
    </main>
  );
}
