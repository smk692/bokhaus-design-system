# List / ListItem Component

> 손밀리 디자인 시스템 | BOKHAUS 시니어 UX 최적화

---

## 사용법

### 기본 ListItem
```tsx
import { ListItem } from '@sonmily/design-system';

<ListItem
  title="혈압 측정"
  subtitle="오전 8:02 · 120/80 mmHg"
  leftIcon="heart-pulse"
  showChevron
  onPress={() => navigate('detail')}
/>
```

### List (컨테이너)
```tsx
import { List, ListItem } from '@sonmily/design-system';

<List
  data={records}
  sectionTitle="오늘의 기록"
  renderItem={(item) => (
    <ListItem title={item.title} subtitle={item.subtitle} leftIcon={item.icon} showChevron />
  )}
  emptyText="아직 기록이 없습니다"
/>
```

---

## Props — ListItem

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | **필수** 메인 텍스트 |
| `subtitle` | `string` | - | 보조 텍스트 |
| `leftIcon` | `string` | - | Material 아이콘 이름 |
| `leftElement` | `ReactNode` | - | 커스텀 좌측 요소 |
| `rightElement` | `ReactNode` | - | 커스텀 우측 요소 |
| `showChevron` | `boolean` | `false` | 우측 화살표 |
| `onPress` | `() => void` | - | 터치 핸들러 |
| `showDivider` | `boolean` | `true` | 구분선 |
| `disabled` | `boolean` | `false` | 비활성 |

---

## 디자인 사양

- **행 높이**: 최소 72px (시니어 UX — 손가락이 굵어도 편하게)
- **아이콘**: 24px (Material Community Icons)
- **폰트**: bodyLarge (18px) — 작은 글씨 지양
- **구분선**: 들여쓰기 (아이콘 너비 기준)

---

## 접근성 (WCAG 2.1 AA)

- 최소 행 높이 72px (터치 타겟 보장)
- disabled 시 onPress 완전 차단
- 빈 목록 안내 텍스트 필수

---

*작성: CPO | Phase 4*
