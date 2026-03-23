# Badge Component

> 손밀리 디자인 시스템 | BOKHAUS 알림 · 상태 표시

---

## 사용법

```tsx
import { Badge } from '@sonmily/design-system';

// 아이콘 위 알림 수
<Badge count={3}>
  <Icon source="bell-outline" size={28} />
</Badge>

// 99 초과 시 자동으로 "99+"
<Badge count={150}>...</Badge>

// 읽지 않은 상태 (점)
<Badge variant="dot">
  <Icon source="chat-outline" size={28} />
</Badge>

// 상태 태그
<Badge variant="label" label="긴급" color="error" />
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'count'\|'dot'\|'label'` | `'count'` | 뱃지 타입 |
| `count` | `number` | - | 숫자 (count 타입) |
| `maxCount` | `number` | `99` | 최대 표시 숫자 |
| `label` | `string` | - | 레이블 텍스트 |
| `color` | `'error'\|'primary'\|'success'\|'warning'\|'neutral'` | `'error'` | 색상 |
| `visible` | `boolean` | - | 강제 표시 여부 |
| `children` | `ReactNode` | - | 오버레이 대상 |

---

*작성: CPO | Phase 4*
