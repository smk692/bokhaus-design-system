# Modal/Dialog Component

> 손밀리 디자인 시스템 | BOKHAUS 시니어 UX 최적화

---

## 사용법

### Alert (정보 전달)
```tsx
import { Modal } from '@sonmily/design-system';

<Modal
  visible={visible}
  onDismiss={() => setVisible(false)}
  variant="alert"
  title="복약 알림"
  content="오전 8시 약을 아직 복용하지 않으셨습니다."
  confirmLabel="확인"
  onConfirm={() => setVisible(false)}
/>
```

### Confirm (확인/취소)
```tsx
<Modal
  visible={visible}
  onDismiss={() => setVisible(false)}
  variant="confirm"
  title="기록 삭제"
  content="이 기록을 삭제하시겠습니까?"
  confirmLabel="삭제"
  cancelLabel="취소"
  onConfirm={() => { handleDelete(); setVisible(false); }}
/>
```

### Custom (자유 구성)
```tsx
<Modal
  visible={visible}
  onDismiss={() => setVisible(false)}
  variant="custom"
  title="연락처 선택"
  content={<ContactList />}
  actions={[
    { label: '취소', variant: 'text', onPress: () => setVisible(false) },
    { label: '선택', variant: 'filled', onPress: handleSelect },
  ]}
/>
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `visible` | `boolean` | - | **필수** 표시 여부 |
| `onDismiss` | `() => void` | - | **필수** 닫기 핸들러 |
| `variant` | `'alert' \| 'confirm' \| 'custom'` | `'alert'` | 모달 타입 |
| `title` | `string` | - | 제목 |
| `content` | `ReactNode \| string` | - | 본문 |
| `confirmLabel` | `string` | `'확인'` | 확인 버튼 레이블 |
| `onConfirm` | `() => void` | - | 확인 핸들러 |
| `cancelLabel` | `string` | `'취소'` | 취소 버튼 레이블 |
| `onCancel` | `() => void` | - | 취소 핸들러 |
| `actions` | `ModalAction[]` | - | 커스텀 액션 (variant="custom") |
| `dismissable` | `boolean` | `false` | 배경 클릭으로 닫기 |

---

## 디자인 사양

- **Border Radius**: 16px (카드보다 더 둥글게)
- **버튼 크기**: Large (56px) — 시니어 UX
- **배경 클릭 닫기**: 기본 `false` — 실수 방지
- **본문 스크롤**: 긴 내용 자동 스크롤

---

## 접근성 (WCAG 2.1 AA)

- 배경 클릭 닫기 기본 `false` (시니어 실수 방지)
- 버튼 크기 56px (Large)
- 명확한 한국어 레이블 기본값 ("확인", "취소")
- 제목 heading2 스타일 (24px, Bold)

---

*작성: CPO | Phase 4*
