# Typography Component

> 손밀리 디자인 시스템 | BOKHAUS 시니어 UX 최적화 | Noto Sans KR

---

## 사용법

### 기본 사용
```tsx
import { Typography } from '@sonmily/design-system/components/Typography';

<Typography>안녕하세요</Typography>
```

### 변형 (Variants)
```tsx
// Display - 메인 타이틀 (32px)
<Typography variant="display">메인 타이틀</Typography>

// Headings
<Typography variant="heading1">페이지 제목</Typography>
<Typography variant="heading2">섹션 제목</Typography>
<Typography variant="heading3">서브 섹션</Typography>

// Body (시니어 권장: bodyLarge)
<Typography variant="bodyLarge">중요 본문 (18px)</Typography>
<Typography variant="body">일반 본문 (16px)</Typography>

// Caption - 부가 정보
<Typography variant="caption">부가 설명</Typography>

// Button - 버튼 레이블
<Typography variant="button">버튼 텍스트</Typography>
```

### 색상 (Colors)
```tsx
<Typography color="primary">주요 텍스트 (#212121)</Typography>
<Typography color="secondary">보조 텍스트 (#616161)</Typography>
<Typography color="disabled">비활성 텍스트</Typography>
<Typography color="error">오류 메시지</Typography>
<Typography color="success">성공 메시지</Typography>
<Typography color="warning">경고 메시지</Typography>
```

### 폰트 무게 (Weight)
```tsx
<Typography weight="regular">일반 (400)</Typography>
<Typography weight="semibold">중간 (600)</Typography>
<Typography weight="bold">굵게 (700)</Typography>
```

### 정렬 (Alignment)
```tsx
<Typography align="left">왼쪽 정렬</Typography>
<Typography align="center">중앙 정렬</Typography>
<Typography align="right">오른쪽 정렬</Typography>
<Typography align="justify">양쪽 정렬</Typography>
```

### 조합 예제
```tsx
<Typography 
  variant="heading2" 
  color="primary" 
  weight="bold" 
  align="center"
>
  중앙 정렬 제목
</Typography>
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `TypographyVariant` | `'body'` | 타이포그래피 변형 |
| `color` | `TypographyColor` | `'primary'` | 텍스트 색상 |
| `weight` | `'regular' \| 'semibold' \| 'bold'` | - | 폰트 무게 (기본값은 variant별 상이) |
| `lineHeight` | `number` | - | 줄간격 오버라이드 |
| `align` | `'left' \| 'center' \| 'right' \| 'justify'` | `'left'` | 정렬 |
| `children` | `ReactNode` | - | 텍스트 내용 |

**추가 Props**: React Native [`TextProps`](https://reactnative.dev/docs/text#props) 모두 지원

### TypographyVariant
```ts
type TypographyVariant = 
  | 'display'      // 32px, bold, 메인 타이틀
  | 'heading1'     // 28px, bold, 페이지 제목
  | 'heading2'     // 24px, semibold, 섹션 제목
  | 'heading3'     // 20px, semibold, 서브 섹션
  | 'bodyLarge'    // 18px, regular, 중요 본문 (시니어 권장)
  | 'body'         // 16px, regular, 일반 본문 (최소값)
  | 'caption'      // 14px, regular, 부가 정보
  | 'button';      // 16px, semibold, 버튼 레이블
```

### TypographyColor
```ts
type TypographyColor = 
  | 'primary'      // #212121
  | 'secondary'    // #616161
  | 'disabled'     // #9E9E9E
  | 'error'        // #C62828
  | 'success'      // #2E7D32
  | 'warning';     // #E65100
```

---

## 접근성

### WCAG 2.1 AA 준수
- **최소 폰트 크기**: 16px (body variant)
- **대비**: 모든 색상 대비 4.5:1 이상
- **줄간격**: 1.5~1.6배 (가독성 최적화)
- **스크린 리더**: `accessibilityRole="text"` 자동 설정

### 시니어 UX 권장사항
- 본문: `bodyLarge` (18px) 사용 권장
- 색상: `primary` 또는 `secondary` (고대비)
- 14px 미만 폰트 사용 금지

---

## 디자인 토큰

| 변형 | 크기 | 무게 | 줄간격 | 용도 |
|------|------|------|--------|------|
| Display | 32px | 700 | 1.3 | 메인 타이틀 |
| Heading 1 | 28px | 700 | 1.3 | 페이지 제목 |
| Heading 2 | 24px | 600 | 1.4 | 섹션 제목 |
| Heading 3 | 20px | 600 | 1.4 | 서브 섹션 |
| Body Large | 18px | 400 | 1.6 | 중요 본문 (시니어) |
| Body | 16px | 400 | 1.6 | 일반 본문 (최소) |
| Caption | 14px | 400 | 1.5 | 부가 정보 |
| Button | 16px | 600 | 1.0 | 버튼 레이블 |

---

## 폰트 설정

### Expo 프로젝트
```bash
npx expo install expo-font @expo-google-fonts/noto-sans-kr
```

```tsx
// App.tsx
import { useFonts, NotoSansKR_400Regular, NotoSansKR_600SemiBold, NotoSansKR_700Bold } from '@expo-google-fonts/noto-sans-kr';

export default function App() {
  let [fontsLoaded] = useFonts({
    NotoSansKR_400Regular,
    NotoSansKR_600SemiBold,
    NotoSansKR_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return <YourApp />;
}
```

### React Native CLI 프로젝트
```js
// react-native.config.js
module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./assets/fonts/'],
};
```

폰트 파일을 `assets/fonts/` 디렉토리에 추가 후:
```bash
npx react-native link
```

---

## 예제

### BOKHAUS 건강 체크 화면
```tsx
import { Typography } from '@sonmily/design-system/components/Typography';

export default function HealthCheckScreen() {
  return (
    <View style={styles.container}>
      <Typography variant="heading1">건강 체크</Typography>
      <Typography variant="bodyLarge" color="secondary">
        오늘의 건강 상태를 기록해주세요
      </Typography>
      
      <View style={styles.section}>
        <Typography variant="heading3">혈압</Typography>
        <Typography variant="body">120/80 mmHg</Typography>
        <Typography variant="caption" color="success">
          정상 범위입니다
        </Typography>
      </View>
    </View>
  );
}
```

---

## 베스트 프랙티스

### DO ✅
- 시니어 대상: `bodyLarge` (18px) 사용
- 색상 대비 검증 (WCAG AA 이상)
- 줄간격 1.5배 이상 유지
- Noto Sans KR 폰트 사용 (한글 최적화)

### DON'T ❌
- 14px 미만 폰트 사용 금지
- 색상만으로 의미 전달 (아이콘/텍스트 병행)
- 과도한 weight 오버라이드 (variant 기본값 존중)
- 긴 텍스트에 `caption` 사용

---

## 테스트

```bash
npm test -- Typography.test.tsx
```

---

## 체인지로그

### v0.1.0 (2026-03-22)
- 초기 구현
- 8가지 변형 (Display ~ Button)
- 6가지 색상 (Primary ~ Warning)
- 3가지 폰트 무게 (Regular/Semibold/Bold)
- Noto Sans KR 지원
- WCAG AA 접근성 준수

---

*작성: CTO | 검토: CPO*
