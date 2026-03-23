# Form Components

> Checkbox · RadioGroup · Switch — 손밀리 디자인 시스템 | BOKHAUS 시니어 UX 최적화

---

## Checkbox

```tsx
import { Checkbox } from '@sonmily/design-system';

<Checkbox
  label="이용약관 동의 (필수)"
  checked={agreed}
  onChange={setAgreed}
  error={!agreed}
  errorText="필수 동의 항목입니다"
/>
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | **필수** 레이블 |
| `checked` | `boolean` | - | **필수** 선택 여부 |
| `onChange` | `(v: boolean) => void` | - | **필수** 변경 핸들러 |
| `disabled` | `boolean` | `false` | 비활성 |
| `error` | `boolean` | `false` | 에러 상태 |
| `errorText` | `string` | - | 에러 메시지 |

---

## RadioGroup

```tsx
import { RadioGroup } from '@sonmily/design-system';

<RadioGroup
  label="알림 주기"
  options={[
    { label: '매일', value: 'daily' },
    { label: '주간', value: 'weekly' },
  ]}
  value={selected}
  onChange={setSelected}
/>
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `RadioOption[]` | - | **필수** 선택지 배열 |
| `value` | `string` | - | **필수** 현재 선택값 |
| `onChange` | `(v: string) => void` | - | **필수** 변경 핸들러 |
| `label` | `string` | - | 그룹 레이블 |
| `horizontal` | `boolean` | `false` | 가로 배치 |
| `error` | `boolean` | `false` | 에러 상태 |
| `errorText` | `string` | - | 에러 메시지 |

---

## Switch

```tsx
import { Switch } from '@sonmily/design-system';

<Switch
  label="복약 알림"
  description="매일 오전 8시"
  value={enabled}
  onValueChange={setEnabled}
/>
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | **필수** 레이블 |
| `value` | `boolean` | - | **필수** 켜짐/꺼짐 |
| `onValueChange` | `(v: boolean) => void` | - | **필수** 변경 핸들러 |
| `description` | `string` | - | 보조 설명 |
| `disabled` | `boolean` | `false` | 비활성 |

---

## 접근성 (WCAG 2.1 AA)

- 터치 영역: Checkbox/Radio 최소 48px, Switch 56px
- 레이블 필수 (아이콘만 사용 금지)
- disabled 시 이벤트 차단
- accessibilityRole/accessibilityState 적용

---

*작성: CPO | Phase 4*
