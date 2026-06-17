# format

숫자 표시와 변환에 사용하는 순수 함수입니다. 외부 의존성이 없습니다.

| 함수 | 용도 | 파일 |
| --- | --- | --- |
| `formatCommaNumber` | 숫자에 천 단위 콤마 추가 | `formatCommaNumber.ts` |
| `formatThousandToEok` | 천원 단위를 억원 단위로 변환 | `formatThousandToEok.ts` |
| `romanToNumber` | 로마 숫자를 일반 숫자로 변환 | `romanToNumber.ts` |

## 복사

함수 하나만 필요하면 해당 파일 하나를 복사합니다. 여러 개를 함께 쓸 때는 이 폴더 전체를 복사하고 `index.ts`에서 가져옵니다.

```ts
import { formatCommaNumber, romanToNumber } from "./format";

formatCommaNumber(1234567); // "1,234,567"
romanToNumber("Ⅳ"); // 4
```
