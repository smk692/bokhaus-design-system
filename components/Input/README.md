# Input Component

> 손밀리 디자인 시스템 | BOKHAUS 시니어 UX 최적화

---

## 사용법

### 기본 사용
```tsx
import { Input } from '@sonmily/design-system/components/Input';

<Input label="이름" />
```

### 플레이스홀더
```tsx
<Input 
  label="이메일" 
  placeholder="example@email.com"
/>
```

### 필수 항목
```tsx
<Input 
  label="비밀번호" 
  required
  secureTextEntry
/>
// → "비밀번호 *" 레이블 표시
```

### Helper 텍스트
```tsx
<Input 
  label="전화번호" 
  helperText="하이픈(-) 없이 숫자만 입력하세요"
/>
```

### 에러 상태
```tsx
<Input 
  label="이메일" 
  value={email}
  errorText="유효한 이메일 주소가 아닙니다"
/>
// → 빨간 테두리 + 에러 아이콘 + 에러 메시지
```

### 비활성 상태
```tsx
<Input 
  label="이름" 
  value="홍길동"
  disabled
/>
```

### 여러 줄 입력
```tsx
<Input 
  label="메모" 
  multiline
  numberOfLines={4}
/>
```

### 제어 컴포넌트 (Controlled)
```tsx
const [value, setValue] = useState('');

<Input 
  label="이름" 
  value={value}
  onChangeText={setValue}
/>
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | **필수** - 항상 상단 표시 |
| `placeholder` | `string` | - | 플레이스홀더 (선택) |
| `helperText` | `string` | - | 도움말 텍스트 |
| `errorText` | `string` | - | 에러 메시지 (helperText 대체) |
| `required` | `boolean` | `false` | 필수 항목 (`*` 표시) |
| `disabled` | `boolean` | `false` | 비활성 상태 |
| `value` | `string` | - | 입력값 (제어 컴포넌트) |
| `onChangeText` | `(text: string) => void` | - | 변경 핸들러 |
| `multiline` | `boolean` | `false` | 여러 줄 입력 |
| `numberOfLines` | `number` | - | 줄 수 (multiline 시) |
| `secureTextEntry` | `boolean` | `false` | 비밀번호 입력 |
| `keyboardType` | `KeyboardType` | `'default'` | 키보드 유형 |

**추가 Props**: React Native Paper [`TextInputProps`](https://callstack.github.io/react-native-paper/docs/components/TextInput/) 모두 지원

---

## 접근성

### WCAG 2.1 AA 준수
- **레이블**: 항상 표시 (플레이스홀더 단독 사용 금지)
- **최소 높이**: 56px (터치 영역 확보)
- **대비**: 레이블/텍스트 대비 4.5:1 이상
- **에러 상태**: 시각적(색상+테두리) + 텍스트 정보 병행

### 시니어 UX 권장사항
- 레이블 명확히: "이름", "전화번호" 등 구체적
- Helper 텍스트 활용: 입력 형식 안내
- 에러 메시지 친절하게: "유효하지 않음" → "올바른 형식: 010-0000-0000"
- 자동 완성 지원: `autoComplete` prop 활용

### 스크린 리더
- `label`: `accessibilityLabel` 자동 매핑
- `required`: "필수 항목입니다" 음성 안내
- `errorText`: 에러 발생 시 즉시 안내

---

## 디자인 토큰

| 토큰 | 값 | 용도 |
|------|-----|------|
| `spacing.inputHeight` | 56px | 최소 높이 (CPO 요구사항) |
| `typography.fontSize.body` | 16px | 레이블 & 입력 텍스트 |
| `typography.fontWeight.semibold` | 600 | 레이블 폰트 무게 |
| `color.surface` | #FFFFFF | 입력 필드 배경 |
| `color.neutral.mid` | #616161 | 기본 테두리 |
| `color.primary.default` | #1565C0 | 포커스 테두리 |
| `color.error` | #C62828 | 에러 테두리 & 텍스트 |

---

## 예제

### BOKHAUS 로그인 폼
```tsx
import { Input } from '@sonmily/design-system/components/Input';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (text: string) => {
    setEmail(text);
    if (text && !text.includes('@')) {
      setEmailError('유효한 이메일 주소가 아닙니다');
    } else {
      setEmailError('');
    }
  };

  return (
    <View style={styles.form}>
      <Input 
        label="이메일" 
        placeholder="example@email.com"
        required
        value={email}
        onChangeText={validateEmail}
        errorText={emailError}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <Input 
        label="비밀번호" 
        placeholder="8자 이상"
        required
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        helperText="영문, 숫자, 특수문자 조합 8자 이상"
      />
      
      <Button onPress={handleLogin}>로그인</Button>
    </View>
  );
}
```

### BOKHAUS 건강 기록 폼
```tsx
export default function HealthFormScreen() {
  const [bloodPressure, setBloodPressure] = useState('');
  const [bloodSugar, setBloodSugar] = useState('');

  return (
    <View style={styles.form}>
      <Input 
        label="혈압" 
        placeholder="120/80"
        required
        value={bloodPressure}
        onChangeText={setBloodPressure}
        helperText="수축기/이완기 혈압을 입력하세요"
        keyboardType="numeric"
      />
      
      <Input 
        label="혈당" 
        placeholder="95"
        required
        value={bloodSugar}
        onChangeText={setBloodSugar}
        helperText="공복 혈당을 입력하세요 (단위: mg/dL)"
        keyboardType="numeric"
      />
    </View>
  );
}
```

---

## 베스트 프랙티스

### DO ✅
- 레이블 항상 표시 (필수)
- Helper 텍스트로 입력 형식 안내
- 에러 메시지 구체적으로 작성
- `keyboardType` 적절히 설정
- `autoComplete` 활용 (자동 완성)
- 필수 항목에 `required` prop 사용

### DON'T ❌
- 플레이스홀더만 사용 (레이블 생략 금지)
- "올바르지 않음" 같은 모호한 에러 메시지
- 56px 미만 높이 (터치 영역 부족)
- 색상만으로 에러 표시 (텍스트 병행 필수)

---

## 유효성 검사 패턴

### 이메일
```tsx
const validateEmail = (text: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(text);
};

const [email, setEmail] = useState('');
const [error, setError] = useState('');

<Input 
  label="이메일"
  value={email}
  onChangeText={(text) => {
    setEmail(text);
    if (text && !validateEmail(text)) {
      setError('유효한 이메일 주소가 아닙니다');
    } else {
      setError('');
    }
  }}
  errorText={error}
/>
```

### 전화번호 (한국)
```tsx
const formatPhoneNumber = (text: string) => {
  const cleaned = text.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3,4})(\d{4})$/);
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  }
  return text;
};

<Input 
  label="전화번호"
  value={phone}
  onChangeText={(text) => setPhone(formatPhoneNumber(text))}
  keyboardType="phone-pad"
/>
```

---

## 테스트

```bash
npm test -- Input.test.tsx
```

---

## 체인지로그

### v0.1.0 (2026-03-22)
- 초기 구현
- 레이블 항상 표시 (CPO 요구사항)
- 최소 높이 56px
- 에러 상태: 텍스트 + 아이콘 병행
- Helper 텍스트 지원
- 필수 항목 표시 (`*`)
- WCAG AA 접근성 준수

---

*작성: CTO | 검토: CPO*
