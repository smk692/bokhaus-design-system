# Toast Component

> 손밀리 디자인 시스템 | BOKHAUS 시니어 UX 최적화

**Note**: React Native Paper의 `Snackbar`를 감싼 컴포넌트입니다.

---

## 사용법

### 기본 사용
```tsx
import { Toast } from '@sonmily/design-system/components/Toast';
import { useState } from 'react';

const [visible, setVisible] = useState(false);

<Toast 
  visible={visible}
  message="저장되었습니다"
  onDismiss={() => setVisible(false)}
/>
```

### 타입별 Toast
```tsx
// Success (성공)
<Toast 
  type="success"
  visible={visible}
  message="저장되었습니다"
  onDismiss={() => setVisible(false)}
/>

// Error (오류)
<Toast 
  type="error"
  visible={visible}
  message="오류가 발생했습니다"
  onDismiss={() => setVisible(false)}
/>

// Warning (경고)
<Toast 
  type="warning"
  visible={visible}
  message="주의가 필요합니다"
  onDismiss={() => setVisible(false)}
/>

// Info (정보 - 기본)
<Toast 
  type="info"
  visible={visible}
  message="새로운 알림이 있습니다"
  onDismiss={() => setVisible(false)}
/>
```

### 액션 버튼 포함
```tsx
<Toast 
  type="info"
  visible={visible}
  message="삭제되었습니다"
  onDismiss={() => setVisible(false)}
  actionLabel="실행 취소"
  onActionPress={() => {
    // 실행 취소 로직
    setVisible(false);
  }}
/>
```

### 표시 시간 조정
```tsx
<Toast 
  visible={visible}
  message="5초 동안 표시됩니다"
  onDismiss={() => setVisible(false)}
  duration={5000}
/>
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'success' \| 'error' \| 'warning' \| 'info'` | `'info'` | Toast 타입 |
| `message` | `string` | - | **필수** - 메시지 텍스트 |
| `visible` | `boolean` | - | **필수** - 표시 여부 |
| `onDismiss` | `() => void` | - | **필수** - 닫기 핸들러 |
| `duration` | `number` | `3000` | 표시 시간 (ms, 최소 3초) |
| `actionLabel` | `string` | - | 액션 버튼 레이블 (선택) |
| `onActionPress` | `() => void` | - | 액션 버튼 핸들러 |

**추가 Props**: React Native Paper [`SnackbarProps`](https://callstack.github.io/react-native-paper/docs/components/Snackbar/) 지원

---

## 디자인 사양

### 타입별 색상 & 아이콘

| Type | 배경색 | 아이콘 | 용도 |
|------|--------|--------|------|
| **success** | `#2E7D32` (Green) | ✓ | 성공 메시지 |
| **error** | `#C62828` (Red) | ✕ | 오류 메시지 |
| **warning** | `#E65100` (Amber) | ⚠ | 경고 메시지 |
| **info** | `#1565C0` (Blue) | ℹ | 정보 메시지 |

**CPO 요구사항**: 아이콘 + 텍스트 병행 필수

### 레이아웃
- **위치**: 화면 하단 고정 (bottom: 16px)
- **Safe Area**: bottom safe area 고려
- **최소 높이**: 56px (시니어 UX)
- **Border Radius**: 8px
- **표시 시간**: 최소 3000ms (3초) - CPO 요구사항

---

## 접근성

### WCAG 2.1 AA 준수
- **아이콘 + 텍스트**: 시각적 + 텍스트 정보 병행 (CPO 요구사항)
- **표시 시간**: 최소 3초 (시니어 읽기 속도 고려, CPO 요구사항)
- **대비**: 모든 타입 흰색 텍스트 + 고대비 배경
- **위치**: 화면 하단 고정 (일관성)

### 시니어 UX 권장사항
- 짧은 메시지 (1-2문장)
- 명확한 액션 버튼 레이블
- 긴 메시지: duration 5초 이상
- 중요한 오류: modal 사용 고려

---

## 디자인 토큰

| 토큰 | 값 | 용도 |
|------|-----|------|
| `color.success` | #2E7D32 | Success 배경 |
| `color.error` | #C62828 | Error 배경 |
| `color.warning.default` | #E65100 | Warning 배경 |
| `color.primary.default` | #1565C0 | Info 배경 |
| `duration.min` | 3000ms | 최소 표시 시간 (시니어) |

---

## 예제

### BOKHAUS 건강 기록 저장
```tsx
import { Toast, Button } from '@sonmily/design-system';

export default function HealthForm() {
  const [toastVisible, setToastVisible] = useState(false);

  const handleSave = async () => {
    // 저장 로직
    await saveHealthData();
    setToastVisible(true);
  };

  return (
    <View>
      <Button onPress={handleSave}>저장</Button>
      
      <Toast 
        type="success"
        visible={toastVisible}
        message="건강 기록이 저장되었습니다"
        onDismiss={() => setToastVisible(false)}
        duration={3000}
      />
    </View>
  );
}
```

### BOKHAUS 복약 알림
```tsx
export default function MedicineReminder() {
  const [toastVisible, setToastVisible] = useState(false);

  return (
    <>
      <Button onPress={() => setToastVisible(true)}>알림 테스트</Button>
      
      <Toast 
        type="warning"
        visible={toastVisible}
        message="오전 8시 약 복용 시간입니다"
        onDismiss={() => setToastVisible(false)}
        actionLabel="확인"
        onActionPress={() => {
          // 복약 완료 처리
          markMedicineAsTaken();
          setToastVisible(false);
        }}
        duration={5000}
      />
    </>
  );
}
```

### BOKHAUS 오류 처리
```tsx
export default function LoginForm() {
  const [errorToast, setErrorToast] = useState(false);

  const handleLogin = async () => {
    try {
      await login();
    } catch (error) {
      setErrorToast(true);
    }
  };

  return (
    <>
      <Button onPress={handleLogin}>로그인</Button>
      
      <Toast 
        type="error"
        visible={errorToast}
        message="이메일 또는 비밀번호가 올바르지 않습니다"
        onDismiss={() => setErrorToast(false)}
        duration={4000}
      />
    </>
  );
}
```

---

## 베스트 프랙티스

### DO ✅
- 짧고 명확한 메시지 작성
- 타입에 맞는 메시지 (success → "저장됨", error → "오류 발생")
- 시니어 대상: duration 3초 이상
- 액션 버튼: 구체적 레이블 ("실행 취소", "다시 시도")

### DON'T ❌
- 긴 메시지 (3줄 이상)
- 중요한 정보만 Toast로 표시 (Modal 고려)
- 연속 Toast 중복 표시
- 애매한 메시지 ("작업 완료", "오류" 등 모호한 표현)

---

## Toast vs Modal

### Toast 사용 케이스
- ✅ 간단한 성공/오류 메시지
- ✅ 백그라운드 작업 완료 알림
- ✅ 실행 취소 기능 제공
- ✅ 비차단적 알림

### Modal 사용 케이스
- ❌ 중요한 오류 (복구 필요)
- ❌ 사용자 확인 필수
- ❌ 긴 메시지 (3줄 이상)
- ❌ 복잡한 액션 (여러 버튼)

---

## 테스트

```bash
npm test -- Toast.test.tsx
```

---

## 체인지로그

### v0.1.0 (2026-03-22)
- 초기 구현
- 4가지 타입 (success/error/warning/info)
- 아이콘 + 텍스트 병행 (CPO 요구사항)
- 최소 3초 표시 시간 (시니어 UX, CPO 요구사항)
- 화면 하단 고정 (bottom safe area)
- 액션 버튼 지원
- WCAG AA 접근성 준수

---

*작성: CTO | 검토: CPO*
