# Button Component

> 손밀리 디자인 시스템 | BOKHAUS 시니어 UX 최적화

---

## 사용법

### 기본 버튼 (Filled)
```tsx
import { Button } from '@sonmily/design-system/components/Button';

<Button onPress={() => console.log('Pressed')}>
  확인
</Button>
```

### 변형 (Variants)
```tsx
// Filled (기본 - 주요 액션)
<Button variant="filled">주요 버튼</Button>

// Outlined (보조 액션)
<Button variant="outlined">보조 버튼</Button>

// Text (최소 사용)
<Button variant="text">텍스트 버튼</Button>
```

### 크기 (Size)
```tsx
// Large: 56×56px (시니어 모드 권장)
<Button size="large">큰 버튼</Button>

// Medium: 48×48px (기본, 최소 터치 영역)
<Button size="medium">일반 버튼</Button>
```

### 전체 너비
```tsx
<Button fullWidth>전체 너비 버튼</Button>
```

### 비활성 상태
```tsx
<Button disabled>비활성 버튼</Button>
```

### 아이콘 버튼
```tsx
<Button icon="camera">사진 촬영</Button>
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'filled' \| 'outlined' \| 'text'` | `'filled'` | 버튼 변형 |
| `size` | `'medium' \| 'large'` | `'medium'` | 버튼 크기 (48px / 56px) |
| `fullWidth` | `boolean` | `false` | 전체 너비 버튼 |
| `disabled` | `boolean` | `false` | 비활성 상태 (opacity 40%) |
| `icon` | `string` | - | Material Design 아이콘 이름 |
| `onPress` | `() => void` | - | 클릭 핸들러 |
| `children` | `ReactNode` | - | 버튼 레이블 (필수) |

**추가 Props**: React Native Paper [`ButtonProps`](https://callstack.github.io/react-native-paper/docs/components/Button/) 모두 지원

---

## 접근성

### WCAG 2.1 AA 준수
- **터치 영역**: 최소 48×48px (권장 56×56px)
- **대비**: Primary 색상 대비 4.5:1 이상
- **레이블**: 항상 텍스트 레이블 포함 (아이콘 단독 금지)
- **상태**: 비활성 상태 명확히 구분 (투명도 40%)

### 스크린 리더
- `accessibilityLabel`: 기본 `children` 텍스트 사용
- `accessibilityRole`: `button` 자동 설정
- `accessibilityState`: `disabled` 상태 전달

---

## 디자인 토큰

| 토큰 | 값 | 용도 |
|------|-----|------|
| `spacing.touch.min` | 48px | 최소 터치 영역 |
| `spacing.touch.recommended` | 56px | 권장 터치 영역 (시니어) |
| `typography.fontSize.button` | 16px | 버튼 폰트 크기 |
| `typography.fontWeight.semibold` | 600 | 버튼 폰트 무게 |
| `color.primary.default` | #1565C0 | Filled 버튼 배경 |
| `color.surface` | #FFFFFF | Outlined 버튼 배경 |

---

## 예제

### BOKHAUS 로그인 화면
```tsx
import { Button } from '@sonmily/design-system/components/Button';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Button 
        variant="filled" 
        size="large"
        fullWidth
        onPress={handleLogin}
      >
        로그인
      </Button>
      
      <Button 
        variant="outlined" 
        size="large"
        fullWidth
        onPress={handleSignup}
        style={{ marginTop: 16 }}
      >
        회원가입
      </Button>
      
      <Button 
        variant="text"
        onPress={handleForgotPassword}
        style={{ marginTop: 8 }}
      >
        비밀번호 찾기
      </Button>
    </View>
  );
}
```

---

## 베스트 프랙티스

### DO ✅
- 주요 액션: Filled 버튼 사용
- 시니어 대상: `size="large"` 사용
- 레이블 명확히: "확인", "다음", "저장" 등 구체적 동사
- 전체 너비: 모바일 화면에서 `fullWidth` 권장
- 비활성 상태: 명확한 시각적 피드백 (opacity 40%)

### DON'T ❌
- 아이콘만 있는 버튼 (레이블 필수)
- 한 화면에 Filled 버튼 2개 이상 (주요 액션 모호)
- 14px 미만 폰트 크기
- 색상만으로 상태 구분 (텍스트/아이콘 병행)

---

## 테스트

```bash
npm test -- Button.test.tsx
```

---

## 체인지로그

### v0.1.0 (2026-03-22)
- 초기 구현
- Filled, Outlined, Text 변형 지원
- 시니어 모드 (56×56px)
- 전체 너비 옵션
- WCAG AA 접근성 준수

---

*작성: CTO | 검토: CPO*
