# 개발자 온보딩 Quick Start

> @sonmily/design-system v0.4.0 | 처음 사용하는 개발자를 위한 가이드
> 작성: CPO | 2026-03-23

---

## 이 가이드를 읽으면

✅ 5분 안에 첫 화면에 디자인 시스템 컴포넌트 적용 가능
✅ 시니어 UX 기준을 코드로 구현하는 방법 이해
✅ 흔한 실수를 미리 알고 피할 수 있음

---

## Step 1. 설치 (2분)

```bash
npm install @sonmily/design-system
npm install react-native-paper react-native-safe-area-context
```

iOS라면:
```bash
cd ios && pod install && cd ..
```

---

## Step 2. 앱 래핑 (1분)

`App.tsx` (또는 `_layout.tsx`)에서 Provider 추가:

```tsx
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <YourApp />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
```

> 💡 이 두 줄이 없으면 컴포넌트가 제대로 렌더링되지 않습니다.

---

## Step 3. 첫 번째 화면 (2분)

```tsx
import { View, StyleSheet } from 'react-native';
import { Button, Typography, Input, Toast } from '@sonmily/design-system';
import { useState } from 'react';

export default function FirstScreen() {
  const [name, setName] = useState('');
  const [saved, setSaved] = useState(false);

  return (
    <View style={styles.container}>
      {/* 제목 */}
      <Typography variant="heading1">처음 시작하기</Typography>

      {/* 입력 */}
      <Input
        label="이름"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      {/* 버튼 — 항상 large! */}
      <Button
        variant="filled"
        size="large"
        fullWidth
        onPress={() => setSaved(true)}
        disabled={!name}
      >
        저장
      </Button>

      {/* 피드백 */}
      <Toast
        type="success"
        visible={saved}
        message="저장되었습니다"
        onDismiss={() => setSaved(false)}
        duration={3000}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 16 },
  input: { marginTop: 8 },
});
```

---

## 자주 쓰는 패턴

### 목록 화면

```tsx
import { List, ListItem } from '@sonmily/design-system';

<List
  data={items}
  sectionTitle="목록"
  emptyText="항목이 없습니다"
  renderItem={(item) => (
    <ListItem
      title={item.name}
      subtitle={item.date}
      leftIcon="check-circle"
      showChevron
      onPress={() => goToDetail(item.id)}
    />
  )}
/>
```

### 삭제 확인 다이얼로그

```tsx
import { Modal } from '@sonmily/design-system';

<Modal
  visible={showDelete}
  onDismiss={() => setShowDelete(false)}
  variant="confirm"
  title="삭제 확인"
  content="이 항목을 삭제하시겠습니까?"
  confirmLabel="삭제"
  cancelLabel="취소"
  onConfirm={handleDelete}
/>
```

### 설정 화면 Switch

```tsx
import { Switch } from '@sonmily/design-system';

<Switch
  label="알림"
  description="앱 알림을 받습니다"
  value={notif}
  onValueChange={setNotif}
/>
```

---

## ⚠️ 흔한 실수 TOP 5

### 1. Provider 빠뜨리기
```tsx
// ❌ Provider 없음 → 컴포넌트 오류
<Button>저장</Button>

// ✅ App.tsx에 PaperProvider + SafeAreaProvider 추가
```

### 2. 버튼 작게 쓰기
```tsx
// ❌ 시니어 손가락이 닿지 않음
<Button size="medium">저장</Button>

// ✅ 항상 large
<Button size="large">저장</Button>
```

### 3. label 없는 Input
```tsx
// ❌ 빈 화면에서 무슨 칸인지 모름
<Input placeholder="이름 입력" value={v} onChangeText={setV} />

// ✅ label 항상 표시
<Input label="이름" placeholder="홍길동" value={v} onChangeText={setV} />
```

### 4. Toast duration 너무 짧게
```tsx
// ❌ 어르신이 읽기 전에 사라짐
<Toast message="저장됨" duration={1000} ... />

// ✅ 최소 3초
<Toast message="저장되었습니다" duration={3000} ... />
```

### 5. Modal dismissable 켜기
```tsx
// ❌ 배경 터치로 실수로 닫힘
<Modal dismissable={true} ... />

// ✅ 기본값 false 유지 (명시 불필요)
<Modal variant="confirm" ... />
```

---

## 컴포넌트 전체 목록

| 컴포넌트 | import | 주요 용도 |
|---------|--------|---------|
| Button | `Button` | CTA, 액션 |
| Typography | `Typography` | 텍스트 전반 |
| Input | `Input` | 텍스트 입력 |
| Card | `Card` | 콘텐츠 카드 |
| Toast | `Toast` | 피드백 메시지 |
| Modal | `Modal` | 알림, 확인 |
| List | `List, ListItem` | 목록 |
| Avatar | `Avatar` | 프로필 |
| Badge | `Badge` | 알림 수, 상태 |
| Checkbox | `Checkbox` | 선택 항목 |
| RadioGroup | `RadioGroup` | 단일 선택 |
| Switch | `Switch` | 켜짐/꺼짐 |

```tsx
// 한 번에 import
import {
  Button, Typography, Input, Card, Toast,
  Modal, List, ListItem, Avatar, Badge,
  Checkbox, RadioGroup, Switch
} from '@sonmily/design-system';
```

---

## 더 알아보기

- 접근성 체크리스트: `docs/accessibility-checklist.md`
- BOKHAUS 통합 가이드: `docs/bokhaus-integration-guide.md`
- 한국어 UX 라이팅: `docs/ux-writing-guide.md`
- Storybook (URL 추후 공유): CTO 구축 중

---

*작성: CPO | Phase 5 문서화*
