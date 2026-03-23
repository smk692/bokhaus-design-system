# Storybook 스토리 작성 가이드

> @sonmily/design-system | 작성: CPO | 2026-03-23
> CTO 구축 시 이 문서를 참조하여 스토리 구성

---

## 목적

- 컴포넌트의 모든 상태를 시각적으로 확인
- 디자이너/기획자가 코드 없이 컴포넌트 검토
- 접근성 자동 검사 (a11y addon)

---

## 스토리 작성 원칙

### 1. 실제 BOKHAUS 데이터로 예시 작성
```tsx
// ❌ 의미 없는 더미 데이터
title: "Lorem ipsum"

// ✅ 실제 서비스 데이터
title: "혈압 측정"
subtitle: "오전 8:02 · 120/80 mmHg"
```

### 2. 모든 variant/상태 커버
```tsx
// 각 컴포넌트당 필수 스토리:
export const Default = ...       // 기본 상태
export const AllVariants = ...   // 모든 변형
export const SeniorMode = ...    // 시니어 UX 권장 설정
export const ErrorState = ...    // 에러 상태
export const DisabledState = ... // 비활성 상태
export const BokhasExample = ... // 실제 BOKHAUS 사용 예시
```

### 3. 시니어 모드 스토리 필수
```tsx
// 모든 컴포넌트에 시니어 권장 설정 스토리 포함
export const SeniorRecommended = () => (
  <Button size="large" variant="filled">저장</Button>
);
SeniorRecommended.storyName = '시니어 UX 권장 ⭐';
```

---

## 컴포넌트별 필수 스토리 목록

### Button
- `Default` — filled, medium
- `AllSizes` — medium vs large 비교
- `AllVariants` — filled / outlined / text
- `FullWidth` — 전체 너비
- `Disabled` — 비활성
- `WithIcon` — 아이콘 포함
- `SeniorRecommended` — large, fullWidth ⭐

### Typography
- `AllVariants` — 8가지 변형 비교
- `AllColors` — 6가지 색상
- `SeniorBodyText` — bodyLarge 18px ⭐
- `Hierarchy` — heading1 + bodyLarge + caption

### Input
- `Default` — 기본 입력
- `WithHelperText` — 도움말
- `ErrorState` — 에러 상태
- `Disabled` — 비활성
- `PasswordInput` — 비밀번호
- `NumericInput` — 숫자 입력 (혈압 등)
- `Required` — 필수 항목

### Card
- `Default` — 기본 카드
- `WithHeader` — 헤더 포함
- `Touchable` — 터치 가능
- `ElevationLevels` — 3단계 비교
- `HealthRecordCard` — BOKHAUS 건강 기록 ⭐

### Toast
- `AllTypes` — 4가지 타입
- `WithAction` — 실행 취소 버튼
- `LongMessage` — 긴 메시지 (duration 조정)
- `SeniorDuration` — 3초 표시 ⭐

### Modal
- `Alert` — 정보 전달
- `Confirm` — 확인/취소
- `Custom` — 자유 구성
- `MedicationAlert` — BOKHAUS 복약 알림 ⭐
- `DeleteConfirm` — 삭제 확인 ⭐

### List / ListItem
- `Default` — 기본 목록
- `WithIcons` — 아이콘 포함
- `WithChevron` — 탐색 목록
- `WithRightElement` — 오른쪽 요소
- `EmptyState` — 빈 목록
- `HealthRecordList` — BOKHAUS 건강 기록 목록 ⭐

### Avatar
- `Sizes` — 4가지 크기 비교
- `FallbackOrder` — 이미지→이니셜→아이콘
- `WithStatus` — 온라인 상태
- `KoreanInitials` — 한국어 이니셜 ⭐

### Badge
- `AllTypes` — count/dot/label
- `AllColors` — 5가지 색상
- `OverflowCount` — 99+ 처리
- `OnIcon` — 아이콘 오버레이
- `NotificationBadge` — 알림 뱃지 ⭐

### Form
- `CheckboxGroup` — 동의 화면
- `RadioGroupVertical` — 세로 배치
- `RadioGroupHorizontal` — 가로 배치
- `SwitchSettings` — 설정 화면
- `FormWithError` — 에러 상태
- `AllDisabled` — 비활성 상태

---

## Storybook 설정 요구사항 (CTO)

### 필수 Addon
```bash
# 접근성 검사 (필수)
npm install @storybook/addon-a11y

# 인터랙션 (선택)
npm install @storybook/addon-interactions
```

### .storybook/main.js
```js
module.exports = {
  stories: ['../components/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',  // 접근성 검사
  ],
};
```

### 글로벌 데코레이터 (PaperProvider 필수)
```tsx
// .storybook/preview.tsx
import { Provider as PaperProvider } from 'react-native-paper';

export const decorators = [
  (Story) => (
    <PaperProvider>
      <Story />
    </PaperProvider>
  ),
];
```

---

## 배포 설정 (GitHub Pages 권장)

```yaml
# .github/workflows/storybook.yml
name: Deploy Storybook
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm ci
      - run: npm run build-storybook
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: storybook-static
```

---

## 완료 기준

- [ ] 컴포넌트 10종 × 평균 5개 스토리 = 50개 스토리
- [ ] a11y addon: 모든 스토리 0 에러
- [ ] GitHub Pages 배포 URL 공유
- [ ] README.md에 Storybook 링크 추가

---

*작성: CPO | Phase 5 문서화 | CTO 구현 예정*
