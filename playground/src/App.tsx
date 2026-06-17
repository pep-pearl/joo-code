import { useEffect, useState } from "react";
import {
  formatCommaNumber,
  formatThousandToEok,
  initViewportHeight,
  romanToNumber,
  useDebouncedValue,
} from "../../src";

export function App() {
  const [amount, setAmount] = useState("100000");
  const [roman, setRoman] = useState("XIV");
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebouncedValue(searchText, 500);

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
      </section>
    </main>
  );
}
