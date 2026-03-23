# Avatar Component

> 손밀리 디자인 시스템 | BOKHAUS 시니어 UX 최적화

Fallback 순서: **이미지 → 이니셜 → 아이콘**

---

## 사용법

```tsx
import { Avatar } from '@sonmily/design-system';

// 이미지
<Avatar uri="https://..." size="large" />

// 이니셜 (한국어 지원)
<Avatar name="홍길동" size="large" />

// 기본 아이콘
<Avatar icon="account" size="medium" />

// 온라인 상태 (보호자 앱)
<Avatar name="김어르신" size="xlarge" showStatus isOnline />
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `uri` | `string` | - | 이미지 URL (1순위) |
| `name` | `string` | - | 이름 → 이니셜 (2순위) |
| `icon` | `string` | `'account'` | 아이콘 이름 (3순위) |
| `size` | `'small'\|'medium'\|'large'\|'xlarge'` | `'medium'` | 크기 |
| `backgroundColor` | `string` | primary | 이니셜/아이콘 배경색 |
| `showStatus` | `boolean` | `false` | 온라인 상태 뱃지 |
| `isOnline` | `boolean` | `false` | 온라인 여부 |

## 크기

| Size | px | 사용처 |
|------|----|--------|
| small | 32 | 목록 내 소형 |
| medium | 48 | 기본 |
| large | 64 | 카드 내 |
| xlarge | 80 | 시니어 앱 프로필 (큰 화면) |

---

*작성: CPO | Phase 4*
