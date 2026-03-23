# BOKHAUS 통합 가이드

> @sonmily/design-system v0.4.0 | 작성: CPO | 2026-03-23

---

## 1. 설치

```bash
cd your-bokhaus-project

npm install @sonmily/design-system
npm install react-native-paper react-native-safe-area-context
```

### iOS 추가 설정
```bash
cd ios && pod install
```

---

## 2. 앱 진입점 설정 (App.tsx)

```tsx
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <AppNavigator />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
```

---

## 3. 시니어 앱 핵심 컴포넌트 적용

### 3-1. 버튼 (모든 CTA)

```tsx
import { Button } from '@sonmily/design-system';

// ✅ 시니어 앱 표준
<Button variant="filled" size="large" fullWidth onPress={handleSave}>
  저장
</Button>

// ✅ 보조 액션
<Button variant="outlined" size="large" onPress={handleCancel}>
  취소
</Button>

// ❌ 금지 — 너무 작음
<Button size="small">저장</Button>
```

### 3-2. 텍스트 (본문 최소 18px)

```tsx
import { Typography } from '@sonmily/design-system';

// ✅ 화면 제목
<Typography variant="heading1">건강 기록</Typography>

// ✅ 기본 본문 (시니어 권장)
<Typography variant="bodyLarge">오늘의 혈압을 입력해 주세요.</Typography>

// ✅ 설명 텍스트
<Typography variant="body" color="secondary">마지막 측정: 오전 8:02</Typography>

// ❌ 금지 — 너무 작음
<Typography variant="caption">중요 정보</Typography>  {/* 14px */}
```

### 3-3. 입력 폼

```tsx
import { Input } from '@sonmily/design-system';

// ✅ 기본 입력
<Input
  label="이름"
  value={name}
  onChangeText={setName}
/>

// ✅ 에러 표시
<Input
  label="혈압 (수축기)"
  value={systolic}
  onChangeText={setSystolic}
  keyboardType="numeric"
  error={!!error}
  errorText="올바른 숫자를 입력해 주세요 (예: 120)"
/>

// ✅ 비밀번호
<Input
  label="비밀번호"
  value={password}
  onChangeText={setPassword}
  secureTextEntry
/>
```

### 3-4. 알림 메시지 (Toast)

```tsx
import { Toast } from '@sonmily/design-system';
import { useState } from 'react';

function HealthScreen() {
  const [toast, setToast] = useState<{ visible: boolean; type: 'success' | 'error'; message: string }>({
    visible: false, type: 'success', message: ''
  });

  const handleSave = async () => {
    try {
      await saveData();
      setToast({ visible: true, type: 'success', message: '건강 기록이 저장되었습니다' });
    } catch {
      setToast({ visible: true, type: 'error', message: '저장에 실패했습니다. 다시 시도해 주세요.' });
    }
  };

  return (
    <>
      {/* ... */}
      <Toast
        type={toast.type}
        visible={toast.visible}
        message={toast.message}
        onDismiss={() => setToast(prev => ({ ...prev, visible: false }))}
        duration={3000}  // 시니어 UX: 최소 3초
      />
    </>
  );
}
```

### 3-5. 중요 알림 (Modal)

```tsx
import { Modal } from '@sonmily/design-system';

// ✅ 복약 알림
<Modal
  visible={medicationAlert}
  onDismiss={() => setMedicationAlert(false)}
  variant="alert"
  title="복약 시간"
  content="오전 8시 약을 아직 복용하지 않으셨습니다."
  confirmLabel="확인했어요"
  onConfirm={() => setMedicationAlert(false)}
/>

// ✅ 위험 액션 확인
<Modal
  visible={deleteConfirm}
  onDismiss={() => setDeleteConfirm(false)}
  variant="confirm"
  title="기록 삭제"
  content="이 건강 기록을 삭제하시겠습니까? 삭제된 기록은 복구할 수 없습니다."
  confirmLabel="삭제"
  cancelLabel="취소"
  onConfirm={handleDelete}
/>
```

### 3-6. 목록 화면

```tsx
import { List, ListItem } from '@sonmily/design-system';

<List
  data={healthRecords}
  sectionTitle="이번 주 기록"
  emptyText="아직 기록이 없습니다"
  renderItem={(record) => (
    <ListItem
      title={record.title}
      subtitle={`${record.date} · ${record.value}`}
      leftIcon={record.icon}
      showChevron
      onPress={() => navigate('detail', { id: record.id })}
    />
  )}
/>
```

### 3-7. 설정 화면 (Switch)

```tsx
import { Switch } from '@sonmily/design-system';

<Switch
  label="복약 알림"
  description="매일 오전 8시"
  value={medicationAlert}
  onValueChange={setMedicationAlert}
/>

<Switch
  label="혈압 측정 알림"
  description="매일 오전 7시 30분"
  value={bpAlert}
  onValueChange={setBpAlert}
/>
```

---

## 4. 화면별 권장 컴포넌트 조합

### 메인 홈 화면
- `Typography(heading1)` — 인사말
- `List + ListItem` — 오늘의 기록
- `Badge(count)` — 알림 수
- `Button(large)` — 기록 추가 버튼

### 건강 기록 입력
- `Typography(heading2)` — 섹션 제목
- `Input` — 수치 입력
- `Button(large, fullWidth)` — 저장
- `Toast` — 저장 완료 피드백

### 복약 관리
- `List + ListItem` — 약 목록
- `Checkbox` — 복약 완료 체크
- `Modal(alert)` — 복약 시간 알림

### 보호자 앱 — 어르신 목록
- `Avatar(xlarge)` — 프로필 사진
- `Badge(dot)` — 온라인 상태
- `List + ListItem` — 최근 활동

### 설정
- `Switch` — 알림 토글
- `RadioGroup` — 언어/테마 선택
- `Modal(confirm)` — 로그아웃 확인

---

## 5. 시니어 UX 절대 규칙

| 항목 | 규칙 |
|------|------|
| 버튼 크기 | 반드시 `size="large"` (56px) |
| 본문 폰트 | 최소 `bodyLarge` (18px) |
| Toast 시간 | 최소 `duration={3000}` |
| Modal 닫기 | `dismissable={false}` 유지 |
| 에러 메시지 | 해결 방법 포함 |
| 레이블 | 항상 표시 (placeholder만 금지) |
| 색상 대비 | WCAG AA (4.5:1 이상) |

---

*작성: CPO | Phase 5 문서화*
