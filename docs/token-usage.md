# Design Tokens 사용 가이드

> 개발자용 | 작성: CTO | 날짜: 2026-03-22

---

## 1. 개요

손밀리 디자인 시스템의 Design Tokens는 브랜드 일관성을 유지하고 개발 효율을 높이기 위한 단일 진실 공급원(Single Source of Truth)입니다.

---

## 2. 빌드 & 설치

### 2.1 의존성 설치
```bash
cd shared-memory/projects/design-system
npm install
```

### 2.2 토큰 빌드
```bash
npm run build:tokens
```

### 2.3 자동 감시 (개발 모드)
```bash
npm run watch:tokens
```

---

## 3. React Native 프로젝트 통합

### 3.1 테마 적용
```typescript
// App.tsx
import { PaperProvider } from 'react-native-paper';
import theme from '@sonmily/design-system/build/react-native/theme';

export default function App() {
  return (
    <PaperProvider theme={theme}>
      {/* Your app */}
    </PaperProvider>
  );
}
```

### 3.2 개별 토큰 사용
```typescript
// 색상
import { customColors } from '@sonmily/design-system/build/react-native/theme';

const MyComponent = () => (
  <View style={{ backgroundColor: customColors.colorPrimaryDefault }}>
    <Text>안녕하세요</Text>
  </View>
);

// 타이포그래피
import { customTypography } from '@sonmily/design-system/build/react-native/theme';

const fontSize = customTypography.typographyFontSizeBody; // 16
```

### 3.3 간격 사용
```typescript
import { customSpacing } from '@sonmily/design-system/build/react-native/theme';

const touchArea = {
  width: customSpacing.spacingTouchMin, // 48
  height: customSpacing.spacingTouchMin, // 48
};
```

---

## 4. 토큰 구조

### 4.1 색상 (color/)
- `primary.default` - 주요 파랑 (#1565C0)
- `secondary.default` - 보조 청록 (#00695C)
- `warning.default` - 경고 호박색 (#E65100)
- `success` - 성공 초록 (#2E7D32)
- `error` - 오류 빨강 (#C62828)
- `neutral.dark` - 본문 텍스트 (#212121)
- `neutral.mid` - 보조 텍스트 (#616161)
- `background` - 기본 배경 (#FAFAFA)
- `surface` - 카드 배경 (#FFFFFF)

### 4.2 타이포그래피 (typography/)
**폰트 크기** (fontSize)
- `display`: 32px - 메인 타이틀
- `heading1`: 28px - 페이지 제목
- `heading2`: 24px - 섹션 제목
- `heading3`: 20px - 서브 섹션
- `bodyLarge`: 18px - 중요 본문 (시니어 권장)
- `body`: 16px - 일반 본문 (**최소값**)
- `caption`: 14px - 부가 정보
- `button`: 16px - 버튼 레이블

**폰트 무게** (fontWeight)
- `regular`: 400
- `semibold`: 600
- `bold`: 700

**줄간격** (lineHeight)
- `tight`: 1.0 (버튼)
- `normal`: 1.3 (헤더)
- `relaxed`: 1.4 (서브 헤더)
- `loose`: 1.6 (본문)

**폰트 패밀리** (fontFamily)
- `primary`: Noto Sans KR
- `fallback`: Apple SD Gothic Neo, Malgun Gothic, sans-serif

### 4.3 간격 (spacing/)
- `touch.min`: 48px - 최소 터치 영역
- `touch.recommended`: 56px - 권장 터치 영역
- `section`: 24px - 섹션 간 여백
- `screen`: 16px - 화면 좌우 패딩
- `gap`: 8px - 버튼 간 최소 간격
- `input.height`: 56px - 입력 필드 높이
- `list.itemHeight`: 64px - 리스트 항목 높이

### 4.4 아이콘 (icon/)
- `size.default`: 24px - 기본 아이콘
- `size.senior`: 32px - 시니어 모드 강조

---

## 5. Figma Tokens 동기화

### 5.1 Figma → 코드 (Export)
1. Figma Tokens 플러그인 열기
2. `build/figma/tokens.json` 내보내기
3. `tokens/brand.json`에 병합
4. `npm run build:tokens` 실행

### 5.2 코드 → Figma (Import)
1. `tokens/brand.json` 수정
2. `npm run build:tokens` 실행
3. `build/figma/tokens.json` Figma로 가져오기

---

## 6. 베스트 프랙티스

### 6.1 DO ✅
- 토큰 값만 사용 (하드코딩 금지)
- 시니어 UX: 터치 영역 최소 48px
- 폰트 크기 최소 16px (본문)
- WCAG AA 대비 준수

### 6.2 DON'T ❌
- 직접 색상 코드 사용 (`#1565C0` 대신 `colorPrimaryDefault`)
- 14px 미만 폰트 사용
- 아이콘 단독 버튼 (레이블 필수)
- 색상만으로 정보 전달

---

## 7. 문제 해결

### 7.1 빌드 실패
```bash
# 캐시 클리어 후 재빌드
npm run clean
npm install
npm run build:tokens
```

### 7.2 타입 에러
```bash
# TypeScript 타입 재생성
rm -rf build/
npm run build:tokens
```

### 7.3 토큰 변경 반영 안 됨
- 개발 서버 재시작
- Metro bundler 캐시 클리어: `npx react-native start --reset-cache`

---

## 8. 다음 단계

- [ ] Button 컴포넌트 구현
- [ ] Typography 컴포넌트 구현
- [ ] Input 컴포넌트 구현
- [ ] Storybook 통합

---

*변경 이력은 CHANGELOG.md 참조*
